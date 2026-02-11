<script>
	import { fade, fly, slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { initFirebase } from '$lib/firebase';
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	import { collection, addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
	import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

	let step = 1;
	let selectedPlan = 'premium'; // 'basic' or 'premium'
	let auth, db, storage;
	let fromApp = $page.url.searchParams.get('from_app') === 'true';

	onMount(() => {
		const firebase = initFirebase();
		if (firebase) {
			auth = firebase.auth;
			db = firebase.db;
			storage = firebase.storage;
		} else {
			error = 'Erreur de configuration Firebase.';
		}
	});

	const planDetails = {
		basic: {
			name: 'Essentiel',
			price: '19€',
			amount: '19,00 €',
			features: [
				'Nom du commerce',
				'Catégorie',
				'Adresse',
				"Pas d'offre promotionnelle pour vos clients (sur présentation de l'app)",
				'Pas de photos',
				'Pas de lien web',
				"Pas d'horaires",
				"Pas de bouton d'appel"
			]
		},
		premium: {
			name: 'Premium',
			price: '49€',
			amount: '49,00 €',
			features: [
				'Fiche complète',
				'Nom du commerce',
				'Catégorie',
				'Adresse',
				'Contact',
				'Photos',
				'Horaires',
				'Lien web',
				"Offre promotionnelle pour vos clients (sur présentation de l'app)",
				"Bouton d'appel",
				'Meilleure visibilité'
			]
		}
	};

	let form = {
		companyName: '',
		siret: '',
		category: '',
		contactName: '',
		email: '',
		phone: '',
		address: '',
		city: '',
		zip: '',
		description: '',
		promoOffer: '',
		website1: '',
		website2: '',
		website3: '',
		website4: '',
		openingHours: '',
		photos: []
	};

	function isLuhnValid(siret) {
		const cleanSiret = siret.replace(/\s+/g, '');
		if (cleanSiret.length !== 14 || isNaN(cleanSiret)) return false;

		let bal = 0;
		let total = 0;
		for (let i = 13; i >= 0; i--) {
			let step = cleanSiret.charCodeAt(i) - 48;
			if (bal === 1) {
				step *= 2;
				if (step > 9) step -= 9;
			}
			total += step;
			bal = 1 - bal;
		}
		return total % 10 === 0;
	}

	// ... merchantCategories and other constants remain the same ...
	const merchantCategories = [
		'Restaurant',
		'Cafe & Bar',
		'Boulangerie-Patisserie',
		'Traiteur',
		'Epicerie fine',
		'Plombier',
		'Electricien',
		'Peintre',
		'Menuisier',
		'Jardinier',
		'Mode & Vetements',
		'Decoration',
		'Librairie',
		'Fleuriste',
		'Quincaillerie',
		'Coiffeur',
		'Estheticienne',
		'Massage',
		'Salle de sport',
		'Garage',
		'Carrossier',
		'Avocat',
		'Comptable',
		'Agence immobiliere'
	];

	function handlePhotos(e) {
		if (e.target.files) {
			form.photos = Array.from(e.target.files).slice(0, 6);
		}
	}

	const benefits = [
		{
			icon: 'fa-eye',
			title: 'Visibilité locale',
			desc: 'Touchez les utilisateurs autour de votre commerce.'
		},
		{
			icon: 'fa-ticket',
			title: 'Offres exclusives',
			desc: 'Attirez de nouveaux clients avec des promos dédiées (Plan Premium).'
		},
		{
			icon: 'fa-store',
			title: 'Vitrine digitale',
			desc: "Votre présence sur l'application Le Poilu, avec un espace Pro."
		}
	];

	function togglePlan(plan) {
		selectedPlan = plan;
	}

	let loading = false;
	let error = null;
	let uploadProgress = null;

	async function uploadImages(files, sponsorId) {
		if (!storage) return [];
		const uploadedUrls = [];

		for (let i = 0; i < files.length; i++) {
			try {
				const file = files[i];
				const timestamp = Date.now();
				const filename = `${timestamp}_${i}_${file.name}`;
				const storageRef = ref(storage, `sponsors/${sponsorId}/${filename}`);

				uploadProgress = `Téléchargement photo ${i + 1}/${files.length}...`;
				await uploadBytes(storageRef, file);
				const url = await getDownloadURL(storageRef);
				uploadedUrls.push(url);
			} catch (err) {
				console.error('Erreur upload photo:', err);
				// Continue with other photos
			}
		}
		uploadProgress = null;
		return uploadedUrls;
	}

	async function submitForm() {
		loading = true;
		error = null;

		try {
			// 0. Validate SIRET
			if (!isLuhnValid(form.siret)) {
				throw new Error('Le numéro SIRET est invalide. Veuillez vérifier votre saisie.');
			}

			// 1. Authentification (Forced Permanent Account)
			let user = auth.currentUser;
			const googleProvider = new GoogleAuthProvider();

			if (!user || user.isAnonymous) {
				try {
					const result = await signInWithPopup(auth, googleProvider);
					user = result.user;
				} catch (authErr) {
					console.error('Auth Cancelled/Error', authErr);
					throw new Error('Connexion Google requise pour devenir sponsor.');
				}
			}

			// 2. Prepare Data for Firestore
			const sponsorData = {
				name: form.companyName,
				siret: form.siret,
				category: form.category,
				contactName: form.contactName,
				email: form.email || user.email,
				phone: form.phone,
				address: form.address,
				city: form.city,
				zip: form.zip,
				description: form.description,
				promoOffer: form.promoOffer,
				website: form.website1,
				socials: {
					facebook: form.website2,
					instagram: form.website3,
					other: form.website4
				},
				openingHours: form.openingHours,
				userId: user.uid,
				status: 'pending',
				createdAt: serverTimestamp(),

				// Plan Info matches what logic expects to manage subscription status
				currentPlan: {
					planId: selectedPlan === 'premium' ? 'visibility-monthly' : 'essential-monthly',
					name: planDetails[selectedPlan].name,
					isActive: false, // Will be set to true by Webhook
					startDate: null,
					renewalDate: null
				},
				image: '', // Main image placeholder
				images: [] // Array for photos
			};

			// 3. Create Document in Firestore 'Sponsors'
			const docRef = await addDoc(collection(db, 'Sponsors'), sponsorData);
			const sponsorId = docRef.id;

			// 3.5 Upload Photos if Premium
			if (selectedPlan === 'premium' && form.photos.length > 0) {
				const imageUrls = await uploadImages(form.photos, sponsorId);
				if (imageUrls.length > 0) {
					await updateDoc(doc(db, 'Sponsors', sponsorId), {
						images: imageUrls,
						image: imageUrls[0] // Set first image as main image
					});
				}
			}

			// 4. Call Checkout API
			const response = await fetch('/api/checkout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					type: 'sponsor',
					planId: selectedPlan,
					submissionId: sponsorId, // Used as client_reference_id & metadata.sponsorId
					fromApp: fromApp,
					data: {
						...form,
						userId: user.uid
					}
				})
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || 'Une erreur est survenue lors du paiement');
			}

			if (result.url) {
				window.location.href = result.url;
			}
		} catch (err) {
			console.error('Erreur:', err);
			error = err.message;
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Rejoindre le Carnet - Le Poilu</title>
</svelte:head>

<div class="page-wrapper">
	<div class="form-container-centered">
		<div class="form-header-centered">
			<h1>Finalisez votre inscription</h1>
			<p>Rejoignez le réseau des commerçants du Poilu en quelques clics.</p>
		</div>

		<div class="form-card">
			<div class="form-header">
				<h2>Votre Fiche Commerce</h2>
				<div class="toggle-container">
					<button
						class="toggle-btn {selectedPlan === 'basic' ? 'active' : ''}"
						on:click={() => togglePlan('basic')}>Essentiel</button
					>
					<button
						class="toggle-btn {selectedPlan === 'premium' ? 'active' : ''}"
						on:click={() => togglePlan('premium')}>Premium</button
					>
				</div>
			</div>

			<div class="price-display">
				<span class="amount">{planDetails[selectedPlan].price}</span><span class="period"
					>/mois</span
				>
			</div>

			<ul class="plan-features-list">
				{#each planDetails[selectedPlan].features as feature}
					<li>
						{#if feature.startsWith('Pas')}
							<i class="fa-solid fa-xmark text-danger"></i>
						{:else}
							<i class="fa-solid fa-check text-success"></i>
						{/if}
						{feature}
					</li>
				{/each}
			</ul>

			<form on:submit|preventDefault={submitForm}>
				<div class="form-row grid-2">
					<div class="input-group">
						<label for="company">Nom de l'entreprise</label>
						<input type="text" id="company" bind:value={form.companyName} required />
					</div>
					<div class="input-group">
						<label for="siret">Numéro SIRET (14 chiffres)</label>
						<input
							type="text"
							id="siret"
							bind:value={form.siret}
							required
							minlength="14"
							maxlength="14"
							placeholder="12345678900000"
							on:input={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
						/>
					</div>
				</div>

				<div class="form-row">
					<div class="input-group">
						<label for="category">Catégorie professionnelle</label>
						<select id="category" bind:value={form.category} required>
							<option value="" disabled selected>Choisir...</option>
							{#each merchantCategories as cat}
								<option value={cat}>{cat}</option>
							{/each}
						</select>
					</div>
				</div>

				<div class="form-row grid-2">
					<div class="input-group">
						<label for="contact">Votre nom</label>
						<input type="text" id="contact" bind:value={form.contactName} required />
					</div>
					<div class="input-group">
						<label for="phone">Téléphone</label>
						<input type="tel" id="phone" bind:value={form.phone} required />
					</div>
				</div>

				<div class="form-row">
					<div class="input-group">
						<label for="email">Email professionnel</label>
						<input type="email" id="email" bind:value={form.email} required />
					</div>
				</div>

				<div class="form-row grid-2">
					<div class="input-group">
						<label for="city">Ville</label>
						<input type="text" id="city" bind:value={form.city} required />
					</div>
					<div class="input-group">
						<label for="zip">Code Postal</label>
						<input type="text" id="zip" bind:value={form.zip} required />
					</div>
				</div>

				{#if selectedPlan === 'premium'}
					<div class="premium-section" transition:slide>
						<div class="premium-header">
							<i class="fa-solid fa-star"></i> Informations Premium
						</div>

						<div class="form-row">
							<div class="input-group">
								<label for="description">Description de votre activité</label>
								<textarea
									id="description"
									bind:value={form.description}
									rows="3"
									placeholder="Présentez votre activité..."
								></textarea>
							</div>
						</div>

						<div class="form-row">
							<div class="input-group">
								<label for="promo">Offre promotionnelle (Clients App)</label>
								<textarea
									id="promo"
									bind:value={form.promoOffer}
									rows="2"
									placeholder="Ex: -10% sur le menu du midi..."
								></textarea>
							</div>
						</div>

						<div class="form-row">
							<div class="input-group">
								<label for="hours">Horaires d'ouverture</label>
								<textarea
									id="hours"
									bind:value={form.openingHours}
									rows="3"
									placeholder="Lundi: 9h-18h..."
								></textarea>
							</div>
						</div>

						<div class="form-row">
							<div class="input-group">
								<label for="web1">Site internet (Principal)</label>
								<input type="url" id="web1" bind:value={form.website1} placeholder="https://..." />
							</div>
						</div>

						<div class="form-row">
							<div class="input-group">
								<label for="web2">Lien Facebook</label>
								<input
									type="url"
									id="web2"
									bind:value={form.website2}
									placeholder="https://facebook.com/..."
								/>
							</div>
						</div>

						<div class="form-row">
							<div class="input-group">
								<label for="web3">Lien Instagram</label>
								<input
									type="url"
									id="web3"
									bind:value={form.website3}
									placeholder="https://instagram.com/..."
								/>
							</div>
						</div>

						<div class="form-row">
							<div class="input-group">
								<label for="web4">Autre lien (TikTok, LinkedIn...)</label>
								<input type="url" id="web4" bind:value={form.website4} placeholder="https://..." />
							</div>
						</div>

						<div class="form-row">
							<div class="input-group">
								<label for="photos">Photos (Max 6)</label>
								<div class="file-upload">
									<input
										type="file"
										id="photos"
										multiple
										accept="image/*"
										on:change={handlePhotos}
									/>
									<div class="file-placeholder">
										<i class="fa-solid fa-camera"></i>
										<span
											>{form.photos.length > 0
												? `${form.photos.length} photo(s) sélectionnée(s)`
												: 'Ajouter des photos'}</span
										>
									</div>
								</div>
							</div>
						</div>
					</div>
				{/if}

				<div class="total-bar">
					<div class="total-text">Total à régler aujourd'hui</div>
					<div class="total-amount">{planDetails[selectedPlan].amount}</div>
				</div>

				<button
					type="submit"
					class="submit-btn"
					class:btn-premium={selectedPlan === 'premium'}
					disabled={loading}
				>
					{#if loading}
						<i class="fa-solid fa-spinner fa-spin"></i> Redirection vers le paiement...
					{:else if selectedPlan === 'premium'}
						Valider mon inscription <i class="fa-solid fa-check"></i>
					{:else}
						Rejoindre en Essentiel <i class="fa-solid fa-arrow-right"></i>
					{/if}
				</button>
				{#if error}
					<p class="error-text">{error}</p>
				{/if}
				<p class="disclaimer">Sans engagement. Annulable à tout moment.</p>
			</form>
		</div>
	</div>
</div>

<style>
	.page-wrapper {
		min-height: 100vh;
		background: #f8f9fa;
		padding: var(--spacing-xl) var(--spacing-md);
		display: flex;
		justify-content: center;
	}

	.form-container-centered {
		width: 100%;
		max-width: 600px;
	}

	.form-header-centered {
		text-align: center;
		margin-bottom: var(--spacing-lg);
	}

	.form-header-centered h1 {
		font-family: var(--FFTitle);
		font-size: 2rem;
		color: var(--text);
		margin-bottom: 10px;
	}

	.form-header-centered p {
		color: var(--secondary);
		font-size: 1.1rem;
	}

	/* Form Card */
	.form-card {
		background: white;
		border-radius: var(--radius-lg);
		padding: var(--spacing-lg);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
		border: 1px solid rgba(0, 0, 0, 0.05);
	}

	.form-header {
		text-align: center;
		margin-bottom: var(--spacing-md);
	}

	.form-header h2 {
		color: var(--text);
		margin-bottom: var(--spacing-md);
		font-size: 1.5rem;
	}

	.toggle-container {
		display: inline-flex;
		background: var(--lightBg);
		padding: 5px;
		border-radius: 50px;
	}

	.toggle-btn {
		padding: 8px 20px;
		border-radius: 50px;
		border: none;
		background: transparent;
		cursor: pointer;
		font-family: var(--FFBody);
		font-weight: 600;
		color: var(--secondary);
		transition: all var(--transition-fast);
		white-space: nowrap;
	}

	.toggle-btn.active {
		background: white;
		color: var(--cta);
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	}

	.price-display {
		text-align: center;
		margin-bottom: var(--spacing-lg);
		color: var(--text);
	}

	.price-display .amount {
		font-size: 3rem;
		font-weight: 700;
		color: var(--accent);
	}

	.price-display .period {
		font-size: 1.2rem;
		color: var(--secondary);
	}

	/* Inputs */
	.form-row {
		margin-bottom: var(--spacing-sm);
	}

	.grid-2 {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-sm);
	}

	.input-group label {
		display: block;
		font-size: 0.9rem;
		font-weight: 500;
		margin-bottom: 5px;
		color: var(--text);
	}

	.input-group input {
		width: 100%;
		padding: 12px;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		font-family: var(--FFBody);
		transition: all var(--transition-fast);
	}

	.input-group input:focus {
		outline: none;
		border-color: var(--cta);
		box-shadow: 0 0 0 3px var(--ctaFade);
	}

	/* Also style Select and Textarea like Inputs */
	.input-group select,
	.input-group textarea {
		width: 100%;
		padding: 12px;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		font-family: var(--FFBody);
		transition: all var(--transition-fast);
		background: white;
	}

	.input-group select:focus,
	.input-group textarea:focus {
		outline: none;
		border-color: var(--cta);
		box-shadow: 0 0 0 3px var(--ctaFade);
	}

	/* Premium Section Styling */
	.premium-section {
		background: #fff5f2;
		border: 1px dashed var(--cta);
		border-radius: var(--radius-md);
		padding: var(--spacing-md);
		margin-bottom: var(--spacing-md);
		margin-top: var(--spacing-md);
	}

	.premium-header {
		color: var(--cta);
		font-weight: 700;
		margin-bottom: var(--spacing-md);
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.file-upload {
		position: relative;
		border: 2px dashed var(--border);
		background: white;
		border-radius: var(--radius-sm);
		padding: 20px;
		text-align: center;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.file-upload:hover {
		border-color: var(--cta);
	}

	.file-upload input {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
	}

	.file-placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: var(--secondary);
		gap: 5px;
	}

	.total-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--spacing-md) 0;
		margin-top: var(--spacing-md);
		border-top: 1px solid var(--border);
		font-weight: 700;
	}

	.total-amount {
		font-size: 1.3rem;
		color: var(--text);
	}

	.submit-btn {
		width: 100%;
		padding: 15px;
		background: var(--cta);
		color: white;
		border: none;
		border-radius: var(--radius-md);
		font-size: 1.1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all var(--transition-fast);
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
	}

	.submit-btn:hover {
		background: var(--ctaHover);
		transform: translateY(-2px);
		box-shadow: 0 5px 15px var(--ctaFade);
	}

	.disclaimer {
		text-align: center;
		font-size: 0.8rem;
		margin-top: 10px;
		color: var(--secondary);
	}

	/* Form Features List */
	.plan-features-list {
		list-style: none;
		margin-bottom: var(--spacing-lg);
		padding: 0 var(--spacing-md);
		background: var(--lightBg);
		padding: 20px;
		border-radius: 8px;
	}

	.plan-features-list li {
		margin-bottom: 8px;
		color: var(--secondary);
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 0.95rem;
	}

	.text-success {
		color: #10b981;
	}
	.text-danger {
		color: #ef4444;
		opacity: 0.7;
	}

	.btn-premium {
		background: linear-gradient(135deg, var(--cta), #ff6101);
		box-shadow: 0 4px 15px rgba(255, 97, 1, 0.4);
	}

	@media (max-width: 480px) {
		.grid-2 {
			grid-template-columns: 1fr;
		}

		.price-display .amount {
			font-size: 2.5rem;
		}
	}

	.error-text {
		color: #ef4444;
		text-align: center;
		margin-top: 10px;
		font-weight: 500;
	}
</style>
