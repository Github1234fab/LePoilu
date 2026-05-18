<script>
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { auth, db, storage } from '$lib/firebase';
	import { collection, query, orderBy, getDocs, addDoc, Timestamp, updateDoc, doc } from 'firebase/firestore';
	import { onAuthStateChanged } from 'firebase/auth';
	import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

	// Icons
	import EyeIcon from '$lib/Components/icons/EyeIcon.svelte';
	import GiftIcon from '$lib/Components/icons/GiftIcon.svelte';
	import StatsChartIcon from '$lib/Components/icons/StatsChartIcon.svelte';
	import PricetagIcon from '$lib/Components/icons/PricetagIcon.svelte';
	import StarIcon from '$lib/Components/icons/StarIcon.svelte';
	import CheckCircleIcon from '$lib/Components/icons/CheckCircleIcon.svelte';
	import ArrowForwardIcon from '$lib/Components/icons/ArrowForwardIcon.svelte';
	import ShieldCheckmarkIcon from '$lib/Components/icons/ShieldCheckmarkIcon.svelte';
	import LockClosedIcon from '$lib/Components/icons/LockClosedIcon.svelte';
	import CloseCircleIcon from '$lib/Components/icons/CloseCircleIcon.svelte';
	import ReceiptIcon from '$lib/Components/icons/ReceiptIcon.svelte';
	import MailIcon from '$lib/Components/icons/MailIcon.svelte';
	import ChevronRightIcon from '$lib/Components/icons/ChevronRightIcon.svelte';
	import GlobeOutlineIcon from '$lib/Components/icons/GlobeOutlineIcon.svelte';
	import AlertCircleIcon from '$lib/Components/icons/AlertCircleIcon.svelte';
	import ImageIcon from '$lib/Components/icons/ImageIcon.svelte';


	let user = null;
	let loading = true;
	let isProcessing = false;
	let errorMsg = '';

	// Step 1: select plan
	let plans = [];
	let selectedPlan = null;

	// Step 2: checkout form
	let businessName = '';
	let ownerName = '';
	let email = '';
	let phone = '';
	let address = '';
	let postalCode = '';
	let city = '';
	let category = '';
	let description = '';
	let siret = '';
	let promoOffer = '';
	let openingHours = '';
	let website1 = '';
	let website2 = '';
	let website3 = '';
	let website4 = '';
	let photos = [];
	let uploadProgress = '';

	function isLuhnValid(val) {
		const clean = val.replace(/\s+/g, '');
		if (clean.length !== 14 || isNaN(clean)) return false;
		let bal = 0;
		let total = 0;
		for (let i = 13; i >= 0; i--) {
			let step = clean.charCodeAt(i) - 48;
			if (bal === 1) {
				step *= 2;
				if (step > 9) step -= 9;
			}
			total += step;
			bal = 1 - bal;
		}
		return total % 10 === 0;
	}

	function handlePhotos(e) {
		if (e.target.files) {
			photos = Array.from(e.target.files).slice(0, 7);
		}
	}

	async function uploadImages(files, sponsorId) {
		if (!storage) return [];
		const uploadedUrls = [];
		for (let i = 0; i < files.length; i++) {
			try {
				const file = files[i];
				const filename = `${Date.now()}_${i}_${file.name}`;
				const storageRef = ref(storage, `sponsors/${sponsorId}/${filename}`);
				uploadProgress = `Photo ${i + 1}/${files.length}...`;
				await uploadBytes(storageRef, file);
				const url = await getDownloadURL(storageRef);
				uploadedUrls.push(url);
			} catch (err) {
				console.error('Upload error:', err);
			}
		}
		uploadProgress = '';
		return uploadedUrls;
	}

	const categories = [
		'Restaurant',
		'Café & Bar',
		'Boulangerie-Pâtisserie',
		'Traiteur',
		'Épicerie fine',
		'Plombier',
		'Électricien',
		'Peintre',
		'Menuisier',
		'Jardinier',
		'Mode & Vêtements',
		'Décoration',
		'Librairie',
		'Fleuriste',
		'Quincaillerie',
		'Coiffeur',
		'Esthéticienne',
		'Massage',
		'Salle de sport',
		'Garage',
		'Carrossier',
		'Avocat',
		'Comptable',
		'Agence immobilière'
	];

	onMount(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			user = currentUser;
			if (!user) {
				// Not strictly requiring auth conceptually until checkout, but doing it here
				window.location.href = '/compte?redirect=/espace-commercant/rejoindre';
			} else {
				fetchPlans();
			}
		});
		return () => unsubscribe();
	});

	async function fetchPlans() {
		try {
			const q = query(collection(db, 'SponsorPlans'), orderBy('order', 'asc'));
			const snapshot = await getDocs(q);

			plans = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data()
			}));

			// Pre-select plan if in URL
			const urlParams = new URLSearchParams(window.location.search);
			const planParam = urlParams.get('plan');
			if (planParam && plans.length > 0) {
				const targetId = planParam === 'premium' ? 'visibility-monthly' : 'essential-monthly';
				const foundPlan = plans.find((p) => p.planId === targetId);
				if (foundPlan) selectedPlan = foundPlan;
			}
		} catch (error) {
			console.error('Error fetching plans:', error);
			errorMsg = "Impossible de récupérer les formules d'abonnement.";
		} finally {
			loading = false;
		}
	}

	function selectPlan(plan) {
		selectedPlan = plan;
		// Autofill email if user available
		if (user && user.email) {
			email = user.email;
		}
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function goBackToPlans() {
		selectedPlan = null;
		errorMsg = '';
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function togglePlanInForm(type) {
		// Trouver le plan par prix pour être plus robuste que par ID technique
		const foundPlan = plans.find((p) => {
			if (type === 'premium') return p.price > 30;
			return p.price < 30;
		});
		
		if (foundPlan) {
			selectedPlan = foundPlan;
			// Vider la description si on repasse en basic
			if (type === 'basic') description = '';
		}
	}

	function handlePlanSelection(plan) {
		const isPremium = plan.planId === 'visibility-monthly';
		const planType = isPremium ? 'premium' : 'basic';
		goto(`/carnet/rejoindre/inscription?plan=${planType}`);
	}

	const getCategorySection = (cat) => {
		const foodCategories = [
			'Boulangerie-Pâtisserie',
			'Traiteur',
			'Épicerie fine'
		];
		const restaurantCategories = [
			'Restaurant',
			'Café & Bar'
		];
		const servicesCategories = ['Plombier', 'Électricien', 'Peintre', 'Menuisier', 'Jardinier'];
		const retailCategories = [
			'Mode & Vêtements',
			'Décoration',
			'Librairie',
			'Fleuriste',
			'Quincaillerie'
		];
		const wellnessCategories = ['Coiffeur', 'Esthéticienne', 'Massage', 'Salle de sport'];
		const autoCategories = ['Garage', 'Carrossier'];
		const professionalCategories = ['Avocat', 'Comptable', 'Agence immobilière'];

		if (foodCategories.includes(cat)) return 'food';
		if (restaurantCategories.includes(cat)) return 'restaurant';
		if (servicesCategories.includes(cat)) return 'services';
		if (retailCategories.includes(cat)) return 'retail';
		if (wellnessCategories.includes(cat)) return 'wellness';
		if (autoCategories.includes(cat)) return 'auto';
		if (professionalCategories.includes(cat)) return 'professional';
		return 'services';
	};

	function validateForm() {
		if (!businessName.trim()) return 'Le nom du commerce est requis.';
		if (!ownerName.trim()) return 'Votre nom est requis.';
		if (!email.trim() || !email.includes('@')) return "L'email est invalide.";
		if (!phone.trim()) return 'Le téléphone est requis.';
		if (!address.trim()) return "L'adresse est requise.";
		if (!postalCode.trim()) return 'Le code postal est requis.';
		if (!city.trim()) return 'La ville est requise.';
		if (!category) return 'Veuillez sélectionner une catégorie.';
		return null;
	}

	async function handleSubmit() {
		errorMsg = '';
		const validationError = validateForm();
		if (validationError) {
			errorMsg = validationError;
			return;
		}

		if (!isLuhnValid(siret)) {
			errorMsg = 'Le numéro SIRET est invalide.';
			return;
		}

		if (!user) {
			errorMsg = 'Vous devez être connecté pour continuer.';
			return;
		}

		if (!selectedPlan || !selectedPlan.stripePriceId) {
			errorMsg = 'Le plan sélectionné est invalide.';
			return;
		}

		isProcessing = true;

		try {
			const now = new Date();
			const isPremium = selectedPlan.planId === 'visibility-monthly';

			// 1. Create Sponsor doc
			const sponsorData = {
				businessName: businessName.trim(),
				ownerName: ownerName.trim(),
				email: email.trim().toLowerCase(),
				phone: phone.trim(),
				address: address.trim(),
				postalCode: postalCode.trim(),
				city: city.trim(),
				siret: siret.trim(),
				category: category,
				sector: getCategorySection(category),
				description: description.trim(),
				promoOffer: promoOffer.trim(),
				openingHours: openingHours.trim(),
				website: website1.trim(),
				socials: {
					facebook: website2.trim(),
					instagram: website3.trim(),
					other: website4.trim()
				},
				currentPlan: {
					planId: selectedPlan.planId,
					type: isPremium ? 'premium' : 'basic',
					isActive: false,
					startDate: null,
					renewalDate: null
				},
				stats: { views: 0, clicks: 0, offersShown: 0 },
				images: [],
				status: 'pending',
				createdAt: Timestamp.fromDate(now),
				userId: user.uid
			};

			const docRef = await addDoc(collection(db, 'Sponsors'), sponsorData);
			const sponsorDocId = docRef.id;

			// 2. Upload Photos if Premium
			if (isPremium && photos.length > 0) {
				const imageUrls = await uploadImages(photos, sponsorDocId);
				if (imageUrls.length > 0) {
					await updateDoc(doc(db, 'Sponsors', sponsorDocId), {
						images: imageUrls,
						image: imageUrls[0]
					});
				}
			}

			// 3. Call local API Checkout
			const response = await fetch('/api/checkout', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					type: 'sponsor',
					planId: isPremium ? 'premium' : 'basic',
					submissionId: sponsorDocId,
					data: {
						companyName: businessName.trim(),
						contactName: ownerName.trim(),
						email: email.trim(),
						phone: phone.trim(),
						address: address.trim(),
						zip: postalCode.trim(),
						city: city.trim(),
						category: category,
						description: description.trim(),
						promoOffer: promoOffer.trim(),
						openingHours: openingHours.trim(),
						website1: website1.trim(),
						website2: website2.trim(),
						userId: user.uid
					}
				})
			});

			const result = await response.json();
			if (result.url) {
				window.location.href = result.url;
			} else {
				throw new Error(result.error || "Erreur lors de l'initialisation du paiement.");
			}
		} catch (err) {
			console.error('Error:', err);
			errorMsg = err.message;
		} finally {
			isProcessing = false;
		}
	}
</script>

<svelte:head>
	<title>{selectedPlan ? 'Finalise ton inscription' : 'Rejoins Le Carnet'} - Le Poilu</title>
</svelte:head>

<div class="page-container">
	<main class="main-content">
		{#if loading}
			<div class="loader-container">
				<div class="spinner"></div>
				<p>Chargement des formules d'abonnement...</p>
			</div>
		{:else if !selectedPlan}
			<!-- STEP 1: SELECT PLAN -->
			<div in:fade>

				<!-- Header -->
				<div class="banner-header">
					<h1>Crée ta vitrine sur Le Poilu</h1>
					<p>
						Gagne en visibilité auprès de milliers d'utilisateurs locaux de l'ouest Lyonnais et
						propulse ton commerce.
					</p>
				</div>

				<!-- Benefits -->
				<div class="section-container">
					<h2 class="section-title">Pourquoi créer ta vitrine sur Le Poilu?</h2>

					<div class="benefits-grid">
						<div class="benefit-card">
							<div class="benefit-icon">
								<EyeIcon class="h-6 w-6" />
							</div>
							<div class="benefit-content">
								<h3>Visibilité locale ciblée</h3>
								<p>
									Touchez directement les habitants de la région qui cherchent activement tes
									services.
								</p>
							</div>
						</div>

						<div class="benefit-card">
							<div class="benefit-icon">
								<GiftIcon class="h-6 w-6" />
							</div>
							<div class="benefit-content">
								<h3>Offres exclusives</h3>
								<p>
									Propose des réductions ou avantages aux utilisateurs de l'app pour les fidéliser.
								</p>
							</div>
						</div>

						<div class="benefit-card">
							<div class="benefit-icon">
								<StatsChartIcon class="h-6 w-6" />
							</div>
							<div class="benefit-content">
								<h3>Statistiques en direct</h3>
								<p>
									Suis tes vues de profil, les clics et l'engagement global des utilisateurs.
								</p>
							</div>
						</div>

						<div class="benefit-card">
							<div class="benefit-icon">
								<PricetagIcon class="h-6 w-6" />
							</div>
							<div class="benefit-content">
								<h3>Kit vitrine inclus</h3>
								<p>
									Reçois un autocollant et une belle affiche Le Poilu pour ton établissement
									physique.
								</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Plans -->
				<div class="section-container">
					<h2 class="section-title">Nos formules d'abonnement</h2>

					<div class="pricing-grid">
						{#each plans as plan}
							{@const isPremium = plan.planId === 'visibility-monthly'}
							<div class="plan-card" class:premium={isPremium}>
								{#if isPremium}
									<div class="premium-badge">
										<StarIcon class="h-3 w-3 fill-yellow-400" />
										Recommandé
									</div>
								{/if}

								<div class="plan-info">
									<h3 class:premium-text={isPremium}>
										{plan.name}
									</h3>
									<p class="plan-desc">{plan.description}</p>

									<div class="price-container">
										<span class="price-amount">{plan.price.toFixed(2)}€</span>
										<span class="price-period">/mois</span>
									</div>

									<div class="features-list">
										{#each plan.included || [] as feature}
											<div class="feature-item">
												<CheckCircleIcon class={`feature-check ${isPremium ? 'premium-check' : ''}`} />
												<span>{feature}</span>
											</div>
										{/each}
									</div>
								</div>

								<button
									on:click={() => handlePlanSelection(plan)}
									class="plan-button"
									class:premium-btn={isPremium}
								>
									Choisir {plan.shortName || plan.name}
									<ArrowForwardIcon class="h-5 w-5" />
								</button>
							</div>
						{/each}
					</div>
				</div>

				<!-- Guarantees -->
				<div class="guarantee-banner">
					<h2><span>🛡️</span> Nos garanties professionnelles</h2>

					<div class="guarantee-grid">
						<div class="guarantee-item">
							<LockClosedIcon class="guarantee-icon" />
							<p>Paiement 100% sécurisé via Stripe</p>
						</div>
						<div class="guarantee-item">
							<CloseCircleIcon class="guarantee-icon" />
							<p>Sans engagement de durée</p>
						</div>
						<div class="guarantee-item">
							<ShieldCheckmarkIcon class="guarantee-icon" />
							<p>Modération qualité assurée</p>
						</div>
						<div class="guarantee-item">
							<ReceiptIcon class="guarantee-icon" />
							<p>Factures par e-mail automatiques</p>
						</div>
					</div>
				</div>

				<!-- Contact -->
				<div class="contact-footer">
					<h3>Une question avant de te lancer ?</h3>
					<p>Notre équipe est là pour t'accompagner dans la numérisation de ton commerce.</p>
					<a href="/Contact" class="contact-button">
						<MailIcon class="h-5 w-5" />
						Nous contacter
					</a>
				</div>
			</div>
		{:else}
			<!-- STEP 2: CHECKOUT FORM -->
			<div in:slide>
				<button on:click={goBackToPlans} class="back-link">
					<ChevronRightIcon class="h-4 w-4 mr-1 rotate-180" />
					Modifier mon abonnement
				</button>

				<div class="checkout-layout">
					<!-- Left: Form -->
					<div class="checkout-form-container">
						{#if errorMsg}
							<div class="alert-error">
								<AlertCircleIcon class="alert-icon" />
								<p>{errorMsg}</p>
							</div>
						{/if}

						<div class="form-card">
							<div class="form-header-inline">
								<h2 class="form-title">Informations du commerce</h2>
								<div class="plan-toggle">
									<button 
										class="toggle-opt" 
										class:active={selectedPlan.price < 30}
										on:click={() => togglePlanInForm('basic')}
									>
										Essentiel
									</button>
									<button 
										class="toggle-opt" 
										class:active={selectedPlan.price > 30}
										on:click={() => togglePlanInForm('premium')}
									>
										Premium
									</button>
								</div>
							</div>

							<div class="form-fields">
								<div class="form-row">
									<div class="form-group">
										<label for="businessName">Nom du commerce <span>*</span></label>
										<input id="businessName" type="text" bind:value={businessName} placeholder="Ex: La Belle Époque" />
									</div>
									<div class="form-group">
										<label for="ownerName">Nom du gérant <span>*</span></label>
										<input id="ownerName" type="text" bind:value={ownerName} placeholder="Ex: Jean Dupont" />
									</div>
								</div>

								<div class="form-row">
									<div class="form-group">
										<label for="email">Email public <span>*</span></label>
										<input id="email" type="email" bind:value={email} placeholder="contact@commerce.fr" />
									</div>
									<div class="form-group">
										<label for="phone">Téléphone public <span>*</span></label>
										<input id="phone" type="tel" bind:value={phone} placeholder="04 78 00 00 00" />
									</div>
								</div>

								<div class="form-group">
									<label for="address">Adresse postale <span>*</span></label>
									<input id="address" type="text" bind:value={address} placeholder="12 rue de la République" />
								</div>

								<div class="form-row">
									<div class="form-group">
										<label for="siret">Numéro SIRET (14 chiffres) <span>*</span></label>
										<input id="siret" type="text" bind:value={siret} placeholder="12345678901234" maxlength="14" />
									</div>
									<div class="form-group">
										<label for="category">Catégorie <span>*</span></label>
										<select id="category" bind:value={category} class="select-field">
											<option value="">Choisir une catégorie...</option>
											{#each categories as cat}
												<option value={cat}>{cat}</option>
											{/each}
										</select>
									</div>
								</div>

								<div class="form-row">
									<div class="form-group">
										<label for="postalCode">Code Postal <span>*</span></label>
										<input id="postalCode" type="text" bind:value={postalCode} placeholder="69002" maxlength="5" />
									</div>
									<div class="form-group">
										<label for="city">Ville <span>*</span></label>
										<input id="city" type="text" bind:value={city} placeholder="Lyon" />
									</div>
								</div>

								<div class="form-group">
									<span class="label-text">Catégorie <span>*</span></span>
									<div class="categories-list">
										{#each categories as cat}
											<button
												on:click={() => (category = cat)}
												class="category-chip"
												class:active={category === cat}
											>
												{cat}
											</button>
										{/each}
									</div>
								</div>

								{#if selectedPlan.planId === 'visibility-monthly'}
									<div class="premium-fields-section" transition:slide>
										<h3 class="section-subtitle-form">Options Premium</h3>
										
										<div class="form-group">
											<label for="description">Présentation de ton établissement</label>
											<textarea id="description" bind:value={description} rows="3" placeholder="Décris ta boutique, tes spécialités..."></textarea>
										</div>

										<div class="form-group">
											<label for="promo">Ton offre promotionnelle (Exclusive Le Poilu)</label>
											<textarea id="promo" bind:value={promoOffer} rows="2" placeholder="Ex: -10% sur toute la boutique..."></textarea>
										</div>

										<div class="form-group">
											<label for="hours">Horaires d'ouverture</label>
											<textarea id="hours" bind:value={openingHours} rows="3" placeholder="Lundi: 9h-12h, 14h-18h..."></textarea>
										</div>

										<div class="form-row">
											<div class="form-group">
												<label for="web1">Site internet</label>
												<input id="web1" type="url" bind:value={website1} placeholder="https://..." />
											</div>
											<div class="form-group">
												<label for="web2">Lien Facebook</label>
												<input id="web2" type="url" bind:value={website2} placeholder="https://facebook.com/..." />
											</div>
										</div>

										<div class="form-group">
											<label for="photos">Photos de ta vitrine (Max 7)</label>
											<div class="photo-upload-box">
												<input type="file" id="photos" multiple accept="image/*" on:change={handlePhotos} />
												<div class="upload-placeholder">
													<ImageIcon class="h-8 w-8" />
													<span>{photos.length > 0 ? `${photos.length} photo(s) sélectionnée(s)` : "Ajouter des photos"}</span>
												</div>
											</div>
											{#if uploadProgress}
												<p class="upload-status">{uploadProgress}</p>
											{/if}
										</div>
									</div>
								{:else}
									<div class="disabled-info-box">
										<div class="info-header">
											<StarIcon class="h-5 w-5 text-yellow-500" />
											<h4>Boostez votre vitrine !</h4>
										</div>
										<p>L'offre Essentiel est limitée aux informations de base. Passez en <strong>Premium</strong> pour débloquer la description, les offres, les horaires et les photos.</p>
										<button class="upgrade-link" on:click={() => togglePlanInForm('premium')}>Découvrir l'offre Premium</button>
									</div>
								{/if}
							</div>
						</div>
					</div>

					<!-- Right: Sticky Order Summary -->
					<aside class="sidebar">
						<div class="summary-card">
							<h3 class="summary-title">
								<PricetagIcon class="h-5 w-5" />
								Récapitulatif
							</h3>

							<div class="summary-details">
								<div class="summary-row">
									<span class="label">Formule</span>
									<span class="value">{selectedPlan.name}</span>
								</div>
								<div class="summary-row">
									<span>Période</span>
									<span>{selectedPlan.duration || 30} jours</span>
								</div>
								<div class="summary-total">
									<span class="total-label">Total à payer</span>
									<span class="total-amount">{selectedPlan.price.toFixed(2)}€</span>
								</div>
							</div>

							<div class="trust-badges">
								<div class="trust-badge">
									<GlobeOutlineIcon class="trust-icon" />
									<p>Tu seras redirigé vers Stripe pour un paiement sécurisé 3D Secure.</p>
								</div>
								<div class="trust-badge">
									<ShieldCheckmarkIcon class="trust-icon" />
									<p>Ta fiche sera modérée et publiée sous 24-48h.</p>
								</div>
							</div>

							<button on:click={handleSubmit} disabled={isProcessing} class="pay-button">
								{#if isProcessing}
									<div class="spinner-small"></div>
									<span>Redirection...</span>
								{:else}
									<LockClosedIcon class="h-5 w-5" />
									Payer {selectedPlan.price.toFixed(2)}€
								{/if}
							</button>
							<p class="terms-text">
								En cliquant sur "Payer", tu acceptes nos CGV et notre politique de confidentialité.
							</p>
						</div>
					</aside>
				</div>
			</div>
		{/if}
	</main>
</div>

<style>
	.page-container {
		min-height: 100vh;
		background-color: var(--lightBg, #f9fafb);
		padding-bottom: 5rem;
		padding-top: 1.5rem;
	}

	.main-content {
		max-width: 900px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		font-size: 0.875rem;
		font-weight: 500;
		color: #6b7280;
		text-decoration: none;
		margin-bottom: 1.5rem;
		transition: color 0.2s;
	}

	.back-link:hover {
		color: #111827;
	}

	.banner-header {
		background-color: #fff8f0;
		padding: 2rem;
		border-radius: 1rem;
		border: 1px solid #ffe8d6;
		margin-bottom: 2.5rem;
		text-align: center;
	}

	.banner-header h1 {
		font-size: 2rem;
		font-weight: 700;
		color: #111827;
		margin-bottom: 0.75rem;
	}

	.banner-header p {
		font-size: 1.125rem;
		color: #4b5563;
		max-width: 600px;
		margin: 0 auto;
	}

	.section-container {
		margin-bottom: 3.5rem;
	}

	.section-title {
		font-size: 1.5rem;
		font-weight: 700;
		text-align: center;
		color: #111827;
		margin-bottom: 2rem;
	}

	.benefits-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	@media (min-width: 640px) {
		.benefits-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.benefit-card {
		background-color: white;
		padding: 1.5rem;
		border-radius: 0.75rem;
		border: 1px solid #f3f4f6;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
		display: flex;
		align-items: flex-start;
		gap: 1rem;
	}

	.benefit-icon {
		background-color: #fff7ed;
		color: #f97316;
		padding: 0.75rem;
		border-radius: 50%;
		display: flex;
	}

	.benefit-content h3 {
		font-size: 1.125rem;
		font-weight: 700;
		color: #111827;
		margin-bottom: 0.25rem;
	}

	.benefit-content p {
		color: #4b5563;
		font-size: 0.95rem;
	}

	.pricing-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		max-width: 800px;
		margin: 0 auto;
	}

	@media (min-width: 1024px) {
		.pricing-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.plan-card {
		position: relative;
		background-color: white;
		border-radius: 1rem;
		padding: 2rem;
		border: 2px solid #e5e7eb;
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.plan-card.premium {
		border-color: #f97316;
	}

	.premium-badge {
		position: absolute;
		top: -1rem;
		right: 1.5rem;
		background-color: #111827;
		color: #facc15;
		font-weight: 700;
		font-size: 0.75rem;
		padding: 0.375rem 1rem;
		border-radius: 9999px;
		text-transform: uppercase;
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.plan-info {
		flex: 1;
		margin-bottom: 1.5rem;
	}

	.plan-info h3 {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
		color: #111827;
	}

	.premium-text {
		color: #f97316;
	}

	.plan-desc {
		color: #4b5563;
		margin-bottom: 1.5rem;
	}

	.price-container {
		display: flex;
		align-items: baseline;
		gap: 0.25rem;
		margin-bottom: 2rem;
	}

	.price-amount {
		font-size: 2.25rem;
		font-weight: 700;
		color: #111827;
	}

	.price-period {
		color: #6b7280;
		font-weight: 500;
	}

	.features-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.feature-item {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
	}

	:global(.feature-check) {
		height: 1.25rem;
		width: 1.25rem;
		flex-shrink: 0;
		color: #22c55e;
	}

	:global(.premium-check) {
		color: #f97316;
	}

	.plan-button {
		text-decoration: none;
		width: 100%;
		padding: 1rem;
		border-radius: 0.75rem;
		font-weight: 700;
		font-size: 1.125rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		cursor: pointer;
		border: none;
		background-color: #f3f4f6;
		color: #111827;
	}

	.premium-btn {
		background-color: #f97316;
		color: white;
	}

	.guarantee-banner {
		background-color: #f0fdf4;
		border-radius: 1rem;
		padding: 2rem;
		margin-bottom: 3rem;
		border: 1px solid #dcfce7;
	}

	.guarantee-banner h2 {
		font-size: 1.25rem;
		font-weight: 700;
		text-align: center;
		color: #111827;
		margin-bottom: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	.guarantee-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	@media (min-width: 640px) {
		.guarantee-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 768px) {
		.guarantee-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.guarantee-item {
		text-align: center;
	}

	:global(.guarantee-icon) {
		height: 2rem;
		width: 2rem;
		color: #16a34a;
		margin: 0 auto 0.5rem;
	}

	.guarantee-item p {
		font-size: 0.875rem;
		font-weight: 500;
		color: #14532d;
	}

	.contact-footer {
		text-align: center;
	}

	.contact-footer h3 {
		font-size: 1.125rem;
		font-weight: 700;
		color: #111827;
		margin-bottom: 0.5rem;
	}

	.contact-footer p {
		color: #4b5563;
		margin-bottom: 1.5rem;
	}

	.contact-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		border: 2px solid #d1d5db;
		color: #374151;
		font-weight: 700;
		padding: 0.75rem 1.5rem;
		border-radius: 0.75rem;
		text-decoration: none;
	}

	.checkout-layout {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-items: flex-start;
	}

	@media (min-width: 1024px) {
		.checkout-layout {
			flex-direction: row;
		}
	}

	.checkout-form-container {
		flex: 1;
		width: 100%;
	}

	.alert-error {
		background-color: #fef2f2;
		border-left: 4px solid #ef4444;
		padding: 1rem;
		border-radius: 0.375rem;
		margin-bottom: 1.5rem;
		display: flex;
		gap: 0.75rem;
	}

	:global(.alert-icon) {
		height: 1.25rem;
		width: 1.25rem;
		color: #ef4444;
	}

	.form-card {
		background-color: white;
		border-radius: 1rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		border: 1px solid #f3f4f6;
		padding: 1.5rem;
	}

	.form-title {
		font-size: 1.25rem;
		font-weight: 800;
		color: var(--text);
		margin-bottom: 0;
	}

	.form-header-inline {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.plan-toggle {
		display: flex;
		background: #f3f4f6;
		padding: 4px;
		border-radius: 9999px;
		border: 1px solid #e5e7eb;
	}

	.toggle-opt {
		padding: 6px 16px;
		border-radius: 9999px;
		border: none;
		background: transparent;
		font-size: 0.875rem;
		font-weight: 700;
		color: #6b7280;
		cursor: pointer;
		transition: all 0.2s;
	}

	.toggle-opt.active {
		background: white;
		color: var(--accent);
		box-shadow: 0 2px 4px rgba(0,0,0,0.05);
	}


	.premium-fields-section {
		margin-top: 2rem;
		padding-top: 2rem;
		border-top: 1px solid #e5e7eb;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.section-subtitle-form {
		font-size: 1rem;
		font-weight: 700;
		color: var(--accent);
		margin-bottom: 0.5rem;
		text-transform: uppercase;
		letter-spacing: 0.025em;
	}

	.select-field {
		width: 100%;
		padding: 0.75rem;
		border-radius: 0.5rem;
		border: 1px solid #d1d5db;
		background-color: white;
		font-family: inherit;
		font-size: 0.875rem;
		cursor: pointer;
	}

	.photo-upload-box {
		position: relative;
		border: 2px dashed #d1d5db;
		border-radius: 0.75rem;
		padding: 2rem;
		text-align: center;
		background-color: #f9fafb;
		cursor: pointer;
		transition: all 0.2s;
	}

	.photo-upload-box:hover {
		border-color: var(--accent);
		background-color: #fff7ed;
	}

	.photo-upload-box input {
		position: absolute;
		inset: 0;
		opacity: 0;
		cursor: pointer;
	}

	.upload-placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		color: #6b7280;
	}

	.upload-status {
		font-size: 0.875rem;
		color: var(--accent);
		margin-top: 0.5rem;
		font-weight: 500;
	}

	.disabled-info-box {
		margin-top: 2rem;
		background-color: #fefce8;
		border: 1px solid #fef08a;
		border-radius: 0.75rem;
		padding: 1.5rem;
	}

	.info-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.info-header h4 {
		font-size: 1rem;
		font-weight: 700;
		color: #854d0e;
	}

	.disabled-info-box p {
		font-size: 0.875rem;
		color: #713f12;
		line-height: 1.5;
		margin-bottom: 1rem;
	}

	.upgrade-link {
		background: none;
		border: none;
		color: var(--accent);
		font-weight: 700;
		font-size: 0.875rem;
		padding: 0;
		cursor: pointer;
		text-decoration: underline;
	}


	.form-fields {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
	}

	@media (min-width: 768px) {
		.form-row {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-group label, .label-text {
		font-size: 0.875rem;
		font-weight: 700;
		color: #374151;
	}

	input, textarea {
		width: 100%;
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;
		border: 1px solid #d1d5db;
		font-size: 1rem;
	}

	.categories-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.category-chip {
		padding: 0.5rem 1rem;
		border-radius: 9999px;
		font-size: 0.875rem;
		font-weight: 500;
		border: 1px solid #d1d5db;
		background-color: white;
		cursor: pointer;
	}

	.category-chip.active {
		background-color: #f97316;
		border-color: #f97316;
		color: white;
	}

	.sidebar {
		width: 100%;
	}

	@media (min-width: 1024px) {
		.sidebar {
			width: 24rem;
			position: sticky;
			top: 2rem;
		}
	}

	.summary-card {
		background-color: #fff8f0;
		border: 1px solid #ffe8d6;
		border-radius: 1rem;
		padding: 1.5rem;
	}

	.summary-title {
		font-size: 1.125rem;
		font-weight: 700;
		color: #111827;
		margin-bottom: 1rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		border-bottom: 1px solid #ffe8d6;
		padding-bottom: 1rem;
	}

	.summary-row {
		display: flex;
		justify-content: space-between;
		color: #374151;
		margin-bottom: 0.75rem;
	}

	.summary-total {
		border-top: 1px solid #ffe8d6;
		padding-top: 0.75rem;
		margin-top: 0.75rem;
		display: flex;
		justify-content: space-between;
	}

	.total-amount {
		font-size: 1.5rem;
		font-weight: 700;
		color: #f97316;
	}

	.trust-badges {
		background-color: #f0fdf4;
		border-radius: 0.75rem;
		padding: 1rem;
		margin: 1.5rem 0;
		border: 1px solid #dcfce7;
	}

	.trust-badge {
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
		font-size: 0.75rem;
		color: #14532d;
	}

	.pay-button {
		width: 100%;
		padding: 1rem;
		border-radius: 0.75rem;
		font-weight: 700;
		font-size: 1.125rem;
		color: white;
		background-color: #22c55e;
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	.terms-text {
		text-align: center;
		font-size: 0.75rem;
		color: #6b7280;
		margin-top: 1rem;
	}

	.spinner {
		width: 2.5rem;
		height: 2.5rem;
		border: 2px solid #e5e7eb;
		border-bottom-color: #f97316;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin-bottom: 1rem;
	}

	.spinner-small {
		width: 1.25rem;
		height: 1.25rem;
		border: 2px solid white;
		border-bottom-color: transparent;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}
</style>
