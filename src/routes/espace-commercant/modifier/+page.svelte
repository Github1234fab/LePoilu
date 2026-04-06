<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { auth, db } from '$lib/firebase';
	import { collection, query, where, getDocs, doc, updateDoc, Timestamp } from 'firebase/firestore';
	import { onAuthStateChanged } from 'firebase/auth';

	// Icons
	import InformationCircleIcon from '$lib/Components/icons/InformationCircleIcon.svelte';
	import CheckCircleIcon from '$lib/Components/icons/CheckCircleIcon.svelte';
	import AlertCircleIcon from '$lib/Components/icons/AlertCircleIcon.svelte';
	import ChevronRightIcon from '$lib/Components/icons/ChevronRightIcon.svelte';
	import CopyIcon from '$lib/Components/icons/CopyIcon.svelte';
	import EditIcon from '$lib/Components/icons/EditIcon.svelte';

	let user = null;
	let sponsor = null;
	let loading = true;
	let isSaving = false;
	let errorMsg = '';
	let successMsg = '';

	// Form data
	let businessName = '';
	let category = '';
	let address = '';
	let city = '';
	let postalCode = '';

	let description = '';
	let phone = '';
	let email = '';
	let website = '';

	// Horaires
	let hasHours = false;
	let monday = '9h-18h';
	let tuesday = '9h-18h';
	let wednesday = '9h-18h';
	let thursday = '9h-18h';
	let friday = '9h-18h';
	let saturday = '9h-14h';
	let sunday = 'Fermé';

	$: isPremium = sponsor?.currentPlan?.type === 'premium';

	onMount(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			user = currentUser;
			if (user) {
				fetchSponsorData(user.uid);
			} else {
				window.location.href = '/compte?redirect=/espace-commercant/modifier';
			}
		});
		return () => unsubscribe();
	});

	async function fetchSponsorData(uid) {
		try {
			loading = true;
			const q = query(collection(db, 'Sponsors'), where('userId', '==', uid));
			const snapshot = await getDocs(q);

			if (snapshot.empty) {
				window.location.href = '/espace-commercant';
				return;
			}

			sponsor = {
				id: snapshot.docs[0].id,
				...snapshot.docs[0].data()
			};

			// Fixed fields
			businessName = sponsor.businessName || '';
			category = sponsor.category || '';
			address = sponsor.address || '';
			city = sponsor.city || '';
			postalCode = sponsor.postalCode || '';

			// Editable fields
			description = sponsor.description || '';
			phone = sponsor.phone || '';
			email = sponsor.email || '';
			website = sponsor.website || '';

			// Hours
			if (sponsor.openingHours) {
				hasHours = true;
				monday = sponsor.openingHours.monday || '9h-18h';
				tuesday = sponsor.openingHours.tuesday || '9h-18h';
				wednesday = sponsor.openingHours.wednesday || '9h-18h';
				thursday = sponsor.openingHours.thursday || '9h-18h';
				friday = sponsor.openingHours.friday || '9h-18h';
				saturday = sponsor.openingHours.saturday || '9h-14h';
				sunday = sponsor.openingHours.sunday || 'Fermé';
			} else {
				hasHours = false;
			}
		} catch (error) {
			console.error('Error fetching sponsor:', error);
			errorMsg = 'Impossible de charger vos données.';
		} finally {
			loading = false;
		}
	}

	async function handleSave() {
		errorMsg = '';
		successMsg = '';

		// Validation
		if (!description.trim()) {
			errorMsg = 'La description est requise.';
			return;
		}
		if (!phone.trim()) {
			errorMsg = 'Le téléphone est requis.';
			return;
		}
		if (!email.trim() || !email.includes('@')) {
			errorMsg = 'Email invalide.';
			return;
		}
		if (isPremium && website.trim() && !website.startsWith('http')) {
			errorMsg = 'Le site web doit commencer par http:// ou https://';
			return;
		}

		isSaving = true;

		try {
			const updateData = {
				description: description.trim(),
				phone: phone.trim(),
				email: email.trim().toLowerCase(),
				updatedAt: Timestamp.now()
			};

			if (isPremium) {
				updateData.website = website.trim() || null;
			}

			if (hasHours) {
				updateData.openingHours = {
					monday: monday.trim(),
					tuesday: tuesday.trim(),
					wednesday: wednesday.trim(),
					thursday: thursday.trim(),
					friday: friday.trim(),
					saturday: saturday.trim(),
					sunday: sunday.trim()
				};
			} else {
				updateData.openingHours = null;
			}

			await updateDoc(doc(db, 'Sponsors', sponsor.id), updateData);

			successMsg = 'Vos modifications ont été enregistrées avec succès.';
			setTimeout(() => {
				successMsg = '';
			}, 4000);
		} catch (error) {
			console.error('Error saving profile:', error);
			errorMsg = 'Impossible de sauvegarder. Veuillez réessayer.';
		} finally {
			isSaving = false;
		}
	}

	function copyToAllFields() {
		tuesday = monday;
		wednesday = monday;
		thursday = monday;
		friday = monday;
	}
</script>

<svelte:head>
	<title>Modifier mes informations - Le Poilu</title>
</svelte:head>

<div class="edit-page-container">
	<main class="edit-main-content">
		<!-- Navigation / Back Button -->
		<a href="/compte" class="back-link">
			<div class="icon-back"><ChevronRightIcon /></div>
			<span>Retour à mon compte</span>
		</a>

		<header class="edit-header">
			<h1>Modifier ma fiche</h1>
			<p>
				Mettez à jour les informations de votre vitrine visible par les utilisateurs du Poilu.
			</p>
		</header>

		{#if loading}
			<div class="loading-state">
				<div class="spinner"></div>
				<p>Chargement de vos données...</p>
			</div>
		{:else if sponsor}
			<div class="edit-form-wrapper" in:fade>
				<!-- Alerts -->
				{#if errorMsg}
					<div class="alert error" in:slide>
						<div class="alert-icon"><AlertCircleIcon /></div>
						<p>{errorMsg}</p>
					</div>
				{/if}

				{#if successMsg}
					<div class="alert success" in:slide>
						<div class="alert-icon"><CheckCircleIcon /></div>
						<p>{successMsg}</p>
					</div>
				{/if}

				<!-- Section: Fixed Info -->
				<section class="form-card">
					<div class="card-title">
						<span class="emoji">📍</span>
						<h2>Informations fixes</h2>
					</div>

					<div class="info-note">
						<div class="note-icon"><InformationCircleIcon /></div>
						<p>
							Le nom, l'adresse et la catégorie ne peuvent être modifiés directement. 
							<a href="/contact">Contactez-nous</a> si besoin.
						</p>
					</div>

					<div class="fixed-grid">
						<div class="fixed-item">
							<label>NOM DU COMMERCE</label>
							<p>{businessName}</p>
						</div>
						<div class="fixed-item">
							<label>CATÉGORIE</label>
							<p>{category}</p>
						</div>
						<div class="fixed-item full-width">
							<label>ADRESSE</label>
							<p>{address}, {postalCode} {city}</p>
						</div>
					</div>
				</section>

				<!-- Section: Description -->
				<section class="form-card">
					<div class="card-title">
						<span class="emoji">📝</span>
						<h2>Présentation</h2>
					</div>

					<div class="input-field">
						<label for="description">Décrivez votre activité <span>*</span></label>
						<textarea
							id="description"
							bind:value={description}
							maxlength="300"
							rows="5"
							placeholder="Vos spécialités, l'aspect unique de votre commerce..."
						></textarea>
						<div class="field-footer">
							<span class="hint">💡 Soyez concis et percutant</span>
							<span class="counter {description.length > 280 ? 'warning' : ''}">{description.length}/300</span>
						</div>
					</div>
				</section>

				<!-- Section: Contact -->
				<section class="form-card">
					<div class="card-title">
						<span class="emoji">📞</span>
						<h2>Coordonnées</h2>
					</div>

					<div class="inputs-grid">
						<div class="input-field">
							<label for="phone">Téléphone <span>*</span></label>
							<input type="tel" id="phone" bind:value={phone} placeholder="06 12 34 56 78" />
						</div>
						<div class="input-field">
							<label for="email">Email public <span>*</span></label>
							<input type="email" id="email" bind:value={email} placeholder="contact@votre-commerce.fr" />
						</div>
						<div class="input-field full-width">
							<label for="website">
								Site Web
								{#if !isPremium}<span class="premium-badge-text">PREMIUM</span>{/if}
							</label>
							<input
								type="url"
								id="website"
								bind:value={website}
								disabled={!isPremium}
								placeholder="https://votre-site.fr"
							/>
							{#if !isPremium}
								<p class="field-info">L'ajout d'un site web est réservé aux abonnés Premium.</p>
							{/if}
						</div>
					</div>
				</section>

				<!-- Section: Hours -->
				<section class="form-card">
					<div class="card-header-flex">
						<div class="card-title">
							<span class="emoji">🕐</span>
							<h2>Horaires</h2>
						</div>
						<button on:click={() => (hasHours = !hasHours)} class="btn-toggle">
							{hasHours ? 'Masquer' : 'Définir les horaires'}
						</button>
					</div>

					{#if hasHours}
						<div class="hours-container" in:slide>
							<p class="hours-hint">Indiquez vos tranches horaires (ex: 9h-12h / 14h-18h).</p>
							
							<div class="hours-grid">
								<div class="day-row">
									<label for="monday">Lundi</label>
									<div class="day-input-group">
										<input id="monday" type="text" bind:value={monday} placeholder="Fermé" />
										<button on:click={copyToAllFields} title="Appliquer à toute la semaine" class="btn-copy">
											<CopyIcon />
										</button>
									</div>
								</div>
								<div class="day-row">
									<label for="tuesday">Mardi</label>
									<input id="tuesday" type="text" bind:value={tuesday} placeholder="9h-18h" />
								</div>
								<div class="day-row">
									<label for="wednesday">Mercredi</label>
									<input id="wednesday" type="text" bind:value={wednesday} placeholder="9h-18h" />
								</div>
								<div class="day-row">
									<label for="thursday">Jeudi</label>
									<input id="thursday" type="text" bind:value={thursday} placeholder="9h-18h" />
								</div>
								<div class="day-row">
									<label for="friday">Vendredi</label>
									<input id="friday" type="text" bind:value={friday} placeholder="9h-18h" />
								</div>
								<div class="day-row">
									<label for="saturday">Samedi</label>
									<input id="saturday" type="text" bind:value={saturday} placeholder="9h-14h" />
								</div>
								<div class="day-row">
									<label for="sunday">Dimanche</label>
									<input id="sunday" type="text" bind:value={sunday} placeholder="Fermé" />
								</div>
							</div>
						</div>
					{/if}
				</section>

				<footer class="form-submit-footer">
					<button on:click={handleSave} disabled={isSaving} class="btn-save {isSaving ? 'loading' : ''}">
						{#if isSaving}
							<div class="spinner-small"></div>
							<span>Enregistrement...</span>
						{:else}
							<EditIcon />
							<span>Enregistrer les modifications</span>
						{/if}
					</button>
				</footer>
			</div>
		{/if}
	</main>
</div>

<style>
	.edit-page-container {
		min-height: 100vh;
		background: #f9fafb;
		padding: 2rem 0 5rem;
		font-family: 'Poppins', sans-serif;
	}

	.edit-main-content {
		max-width: 800px;
		margin: 0 auto;
		padding: 0 1.25rem;
	}

	/* Navigation */
	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
		color: var(--secondary);
		font-size: 0.9rem;
		font-weight: 600;
		margin-bottom: 2rem;
		transition: color 0.2s;
	}

	.back-link:hover {
		color: var(--cta);
	}

	.icon-back {
		transform: rotate(180deg);
		display: flex;
		width: 1rem;
		height: 1rem;
	}

	/* Header */
	.edit-header {
		margin-bottom: 2.5rem;
	}

	.edit-header h1 {
		font-size: 2.25rem;
		font-weight: 900;
		color: var(--text);
		margin: 0 0 0.5rem;
	}

	.edit-header p {
		color: var(--secondary);
		font-size: 1.1rem;
	}

	/* Form State */
	.loading-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 4rem 0;
		color: var(--secondary);
	}

	.spinner {
		border: 3px solid #f3f3f3;
		border-top: 3px solid var(--cta);
		border-radius: 50%;
		width: 40px;
		height: 40px;
		animation: spin 1s linear infinite;
		margin-bottom: 1rem;
	}

	@keyframes spin { 100% { transform: rotate(360deg); } }

	/* Form Elements */
	.edit-form-wrapper {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.form-card {
		background: white;
		border-radius: 24px;
		padding: 2rem;
		border: 1px solid #edf2f7;
		box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.01);
	}

	.card-header-flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
	}

	.card-title {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.form-card .card-header-flex .card-title {
		margin-bottom: 0;
	}

	.card-title .emoji { font-size: 1.5rem; }
	.card-title h2 { font-size: 1.25rem; font-weight: 800; color: var(--text); margin: 0; }

	.info-note {
		background: #f0f7ff;
		padding: 1rem 1.25rem;
		border-radius: 16px;
		display: flex;
		gap: 0.75rem;
		margin-bottom: 2rem;
		border: 1px solid #e0effe;
	}

	.note-icon { color: #3b82f6; width: 1.25rem; flex-shrink: 0; margin-top: 2px; }
	:global(.note-icon svg) { width: 1.25rem; height: 1.25rem; }

	.info-note p { font-size: 0.9rem; color: #1e40af; line-height: 1.5; }
	.info-note a { color: #1e40af; font-weight: 800; border-bottom: 1.5px solid #1e40af; text-decoration: none; }

	/* Fixed Grid */
	.fixed-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.fixed-item {
		background: #f8fafc;
		padding: 1rem 1.25rem;
		border-radius: 16px;
		border: 1px solid #f1f5f9;
	}

	.fixed-item.full-width { grid-column: span 2; }

	.fixed-item label {
		font-size: 0.7rem;
		font-weight: 800;
		color: #94a3b8;
		letter-spacing: 0.1em;
		display: block;
		margin-bottom: 0.25rem;
	}

	.fixed-item p { font-weight: 600; color: #334155; font-size: 1rem; }

	/* Inputs */
	.input-field {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.input-field.full-width { grid-column: span 2; }

	.input-field label {
		font-size: 0.9rem;
		font-weight: 700;
		color: var(--text);
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.input-field label span { color: #ef4444; }

	.premium-badge-text {
		background: #fef9c3;
		color: #854d0e;
		font-size: 0.65rem;
		font-weight: 900;
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
		margin-left: 0.5rem;
	}

	input, textarea {
		width: 100%;
		background: white;
		border: 2px solid #e2e8f0;
		padding: 0.875rem 1.25rem;
		border-radius: 12px;
		font-family: inherit;
		font-size: 1rem;
		color: var(--text);
		transition: all 0.2s;
	}

	input:focus, textarea:focus {
		outline: none;
		border-color: var(--cta);
		box-shadow: 0 0 0 4px rgba(217, 70, 122, 0.08);
	}

	input:disabled { background: #f1f5f9; cursor: not-allowed; border-color: #e2e8f0; }

	.field-footer {
		display: flex;
		justify-content: space-between;
		margin-top: 0.5rem;
	}

	.field-footer .hint { font-size: 0.8rem; color: var(--secondary); font-style: italic; }
	.field-footer .counter { font-size: 0.8rem; font-weight: 600; color: #94a3b8; }
	.field-footer .counter.warning { color: #f97316; }

	.field-info { font-size: 0.8rem; color: var(--secondary); margin-top: 0.5rem; font-style: italic; }

	.inputs-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	/* Hours */
	.btn-toggle {
		background: #fff5f2;
		color: var(--cta);
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 10px;
		font-weight: 700;
		font-size: 0.85rem;
		cursor: pointer;
		transition: background 0.2s;
	}

	.btn-toggle:hover { background: #fbd5c6; }

	.hours-hint {
		font-size: 0.9rem;
		color: var(--secondary);
		margin-bottom: 1.5rem;
		background: #f8fafc;
		padding: 1rem;
		border-radius: 12px;
		border: 1px solid #f1f5f9;
	}

	.hours-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	.day-row {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.day-row label { font-size: 0.85rem; font-weight: 800; color: var(--text); }
	
	.day-input-group {
		position: relative;
		display: flex;
		align-items: center;
	}

	.btn-copy {
		position: absolute;
		right: 0.5rem;
		background: none;
		border: none;
		color: var(--cta);
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		border-radius: 8px;
	}

	.btn-copy:hover { background: #fff5f2; }
	:global(.btn-copy svg) { width: 1.1rem; height: 1.1rem; }

	/* Footer Actions */
	.form-submit-footer {
		padding-top: 1rem;
	}

	.btn-save {
		width: 100%;
		background: var(--cta);
		color: white;
		border: none;
		padding: 1.25rem;
		border-radius: 16px;
		font-size: 1.1rem;
		font-weight: 800;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		box-shadow: 0 10px 15px -3px rgba(217, 70, 122, 0.3);
		transition: all 0.2s;
	}

	.btn-save:hover { transform: translateY(-2px); filter: brightness(1.1); }
	.btn-save:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

	.spinner-small {
		width: 1.5rem;
		height: 1.5rem;
		border: 3px solid rgba(255,255,255,0.3);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	/* Alerts */
	.alert {
		padding: 1.25rem;
		border-radius: 16px;
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 2rem;
		font-weight: 600;
	}

	.alert.error { background: #fee2e2; color: #991b1b; }
	.alert.success { background: #f0fdf4; color: #166534; }

	.alert-icon { width: 1.5rem; flex-shrink: 0; }
	:global(.alert-icon svg) { width: 1.5rem; height: 1.5rem; }

	@media (max-width: 600px) {
		.fixed-grid, .inputs-grid, .hours-grid { grid-template-columns: 1fr; }
		.fixed-item.full-width, .input-field.full-width { grid-column: span 1; }
		.edit-header h1 { font-size: 1.75rem; }
	}
</style>
