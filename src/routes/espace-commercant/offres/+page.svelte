<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { auth, db } from '$lib/firebase';
	import { collection, query, where, getDocs, doc, updateDoc, Timestamp } from 'firebase/firestore';
	import { onAuthStateChanged } from 'firebase/auth';

	// Icons
	import GiftIcon from '$lib/Components/icons/GiftIcon.svelte';
	import InformationCircleIcon from '$lib/Components/icons/InformationCircleIcon.svelte';
	import CalendarIcon from '$lib/Components/icons/CalendarIcon.svelte';
	import EyeIcon from '$lib/Components/icons/EyeIcon.svelte';
	import EyeOffIcon from '$lib/Components/icons/EyeOffIcon.svelte';
	import CheckCircleIcon from '$lib/Components/icons/CheckCircleIcon.svelte';
	import TrashIcon from '$lib/Components/icons/TrashIcon.svelte';
	import ChevronRightIcon from '$lib/Components/icons/ChevronRightIcon.svelte';
	import AlertCircleIcon from '$lib/Components/icons/AlertCircleIcon.svelte';

	let user = null;
	let sponsor = null;
	let loading = true;
	let isSaving = false;
	let errorMsg = '';
	let successMsg = '';

	// FormData
	let title = '';
	let description = '';
	let conditions = '';
	let isActive = true;
	let hasValidityDate = false;
	let validUntil = '';

	onMount(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			user = currentUser;
			if (user) {
				fetchSponsorData(user.uid);
			} else {
				window.location.href = '/compte?redirect=/espace-commercant/offres';
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
				// If no sponsor profile exists, redirect to dashboard which handles the empty state
				window.location.href = '/espace-commercant';
				return;
			}

			sponsor = {
				id: snapshot.docs[0].id,
				...snapshot.docs[0].data()
			};

			const existingOffer = sponsor.specialOffer;
			if (existingOffer) {
				title = existingOffer.title || '';
				description = existingOffer.description || '';
				conditions = existingOffer.conditions || '';
				isActive = existingOffer.isActive !== undefined ? existingOffer.isActive : true;

				if (existingOffer.validUntil) {
					hasValidityDate = true;
					// Format timestamp to YYYY-MM-DD for HTML input
					const date = new Date(existingOffer.validUntil.seconds * 1000);
					validUntil = date.toISOString().split('T')[0];
				}
			}
		} catch (error) {
			console.error('Error fetching sponsor data:', error);
			errorMsg = 'Impossible de charger vos données.';
		} finally {
			loading = false;
		}
	}

	async function handleSave() {
		errorMsg = '';
		successMsg = '';

		if (!title.trim()) {
			errorMsg = "Le titre de l'offre est requis.";
			return;
		}
		if (!description.trim()) {
			errorMsg = "La description de l'offre est requise.";
			return;
		}

		isSaving = true;

		try {
			const offerData = {
				title: title.trim(),
				description: description.trim(),
				conditions: conditions.trim() || '',
				isActive: isActive
			};

			if (hasValidityDate && validUntil) {
				offerData.validUntil = Timestamp.fromDate(new Date(validUntil));
			} else {
				offerData.validUntil = null;
			}

			await updateDoc(doc(db, 'Sponsors', sponsor.id), {
				specialOffer: offerData,
				updatedAt: Timestamp.now()
			});

			successMsg = isActive
				? 'Votre offre spéciale a été publiée avec succès !'
				: 'Votre offre a été enregistrée, mais reste masquée pour le moment.';

			// Update local state to reflect changes in preview
			sponsor.specialOffer = offerData;

			// Clear success message after 4s
			setTimeout(() => {
				successMsg = '';
			}, 4000);
		} catch (error) {
			console.error('Error saving offer:', error);
			errorMsg = "Impossible d'enregistrer l'offre. Veuillez réessayer.";
		} finally {
			isSaving = false;
		}
	}

	async function handleDelete() {
		if (!confirm('Êtes-vous sûr de vouloir supprimer votre offre spéciale ?')) return;

		isSaving = true;
		try {
			await updateDoc(doc(db, 'Sponsors', sponsor.id), {
				specialOffer: null,
				updatedAt: Timestamp.now()
			});

			// Reset form
			title = '';
			description = '';
			conditions = '';
			isActive = true;
			hasValidityDate = false;
			validUntil = '';
			sponsor.specialOffer = null;

			successMsg = 'Offre supprimée avec succès.';
			setTimeout(() => {
				successMsg = '';
			}, 4000);
		} catch (error) {
			console.error('Error deleting offer:', error);
			errorMsg = "Impossible de supprimer l'offre.";
		} finally {
			isSaving = false;
		}
	}
</script>

<svelte:head>
	<title>Gérer mon offre - Le Poilu</title>
</svelte:head>

<div class="edit-page-container">
	<main class="edit-main-content">
		<!-- Navigation / Back Button -->
		<a href="/compte" class="back-link">
			<div class="icon-back"><ChevronRightIcon /></div>
			<span>Retour à mon compte</span>
		</a>

		<header class="edit-header">
			<h1>Gérer mon offre exclusive</h1>
			<p>
				Proposez un avantage spécial aux utilisateurs du Poilu pour attirer de nouveaux clients.
			</p>
		</header>

		{#if loading}
			<div class="loading-state">
				<div class="spinner"></div>
				<p>Chargement de votre offre...</p>
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

				<!-- Info Banner -->
				<div class="info-note-pro">
					<div class="note-icon-pro"><InformationCircleIcon /></div>
					<p>
						L'offre spéciale apparaîtra sur votre fiche dans <strong>Le Carnet</strong>. Les
						utilisateurs devront montrer l'application pour en profiter.
					</p>
				</div>

				<div class="form-grid-layout">
					<!-- Left: Content Form -->
					<div class="form-column">
						<section class="form-card">
							<div class="card-title">
								<span class="emoji">🎁</span>
								<h2>Détails de l'avantage</h2>
							</div>

							<div class="input-field">
								<label for="title">Titre de l'offre <span>*</span></label>
								<input
									type="text"
									id="title"
									bind:value={title}
									maxlength="50"
									placeholder="Ex: Café offert, 10% de réduction..."
								/>
								<div class="field-footer">
									<span class="counter">{title.length}/50</span>
								</div>
							</div>

							<div class="input-field">
								<label for="description">Description détaillée <span>*</span></label>
								<textarea
									id="description"
									bind:value={description}
									maxlength="150"
									rows="3"
									placeholder="Ex: Pour 2 pizzas achetées, avec le menu du jour..."
								></textarea>
								<div class="field-footer">
									<span class="counter">{description.length}/150</span>
								</div>
							</div>

							<div class="input-field">
								<label for="conditions">Conditions (Optionnel)</label>
								<textarea
									id="conditions"
									bind:value={conditions}
									maxlength="100"
									rows="2"
									placeholder="Ex: Hors promotions en cours..."
								></textarea>
								<div class="field-footer">
									<span class="counter">{conditions.length}/100</span>
								</div>
							</div>
						</section>

						<section class="form-card">
							<div class="card-title">
								<span class="emoji">⚙️</span>
								<h2>Paramètres</h2>
							</div>

							<div class="settings-list">
								<div class="setting-item">
									<div class="setting-text">
										<h3>Date de validité</h3>
										<p>Ajouter une date limite d'expiration</p>
									</div>
									<label class="switch">
										<input type="checkbox" bind:checked={hasValidityDate} />
										<span class="slider"></span>
									</label>
								</div>
								
								{#if hasValidityDate}
									<div class="input-field date-input" in:slide>
										<div class="date-wrapper">
											<CalendarIcon class="date-icon" />
											<input
												type="date"
												bind:value={validUntil}
												min={new Date().toISOString().split('T')[0]}
											/>
										</div>
									</div>
								{/if}

								<div class="setting-item">
									<div class="setting-text">
										<h3>Visibilité publique</h3>
										<p>{isActive ? "L'offre est visible" : "L'offre est masquée"}</p>
									</div>
									<label class="switch">
										<input type="checkbox" bind:checked={isActive} />
										<span class="slider"></span>
									</label>
								</div>
							</div>
						</section>
					</div>

					<!-- Right: Live Preview -->
					<div class="preview-column">
						<div class="preview-sticky">
							<div class="preview-header">
								<span class="emoji">👁️</span>
								<h3>Aperçu en direct</h3>
							</div>

							<div class="offer-preview-card {isActive ? '' : 'is-hidden'}">
								<div class="preview-gift-icon">
									<GiftIcon />
								</div>
								<div class="preview-content">
									<span class="preview-label">BON PLAN</span>
									<h4 class="preview-title">{title || "Titre de l'offre"}</h4>
									<p class="preview-desc">
										{description || "Description complète de l'avantage proposé à la tribu du Poilu..."}
									</p>
									
									{#if conditions}
										<p class="preview-conditions"><span>Cond:</span> {conditions}</p>
									{/if}

									{#if hasValidityDate && validUntil}
										<p class="preview-date">
											<CalendarIcon />
											Valable jusqu'au {new Date(validUntil).toLocaleDateString('fr-FR')}
										</p>
									{/if}

									{#if !isActive}
										<div class="preview-status-badge hidden">
											<EyeOffIcon />
											OFFRE MASQUÉE
										</div>
									{/if}
								</div>
								
								{#if !isActive}
									<div class="preview-overlay">
										<EyeOffIcon />
										<span>MASQUÉE</span>
									</div>
								{/if}
							</div>
						</div>
					</div>
				</div>

				<footer class="form-submit-footer-pro">
					<button on:click={handleSave} disabled={isSaving} class="btn-save {isSaving ? 'loading' : ''}">
						{#if isSaving}
							<div class="spinner-small"></div>
							<span>Publication...</span>
						{:else}
							<CheckCircleIcon />
							<span>Publier mon offre</span>
						{/if}
					</button>

					{#if sponsor.specialOffer}
						<button
							on:click={handleDelete}
							disabled={isSaving}
							class="btn-delete"
						>
							<TrashIcon />
							Supprimer l'offre
						</button>
					{/if}
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
		max-width: 1000px;
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

	.back-link:hover { color: var(--cta); }
	.icon-back { transform: rotate(180deg); display: flex; width: 1rem; height: 1rem; }

	/* Header */
	.edit-header { margin-bottom: 2.5rem; }
	.edit-header h1 { font-size: 2.25rem; font-weight: 900; color: var(--text); margin: 0 0 0.5rem; }
	.edit-header p { color: var(--secondary); font-size: 1.1rem; }

	/* Form State */
	.loading-state { display: flex; flex-direction: column; align-items: center; padding: 4rem 0; color: var(--secondary); }
	.spinner { border: 3px solid #f3f3f3; border-top: 3px solid var(--cta); border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin-bottom: 1rem; }
	@keyframes spin { 100% { transform: rotate(360deg); } }

	/* Info Note */
	.info-note-pro {
		background: #eff6ff;
		padding: 1.25rem 1.5rem;
		border-radius: 20px;
		display: flex;
		gap: 1rem;
		margin-bottom: 2.5rem;
		border: 1px solid #dbeafe;
	}

	.note-icon-pro { color: #3b82f6; width: 1.5rem; flex-shrink: 0; margin-top: 2px; }
	:global(.note-icon-pro svg) { width: 1.5rem; height: 1.5rem; }
	.info-note-pro p { font-size: 0.95rem; color: #1e40af; line-height: 1.6; margin: 0; }

	/* Layout Grid */
	.form-grid-layout {
		display: grid;
		grid-template-columns: 1fr 380px;
		gap: 2.5rem;
		align-items: start;
	}

	.form-column { display: flex; flex-direction: column; gap: 2rem; }

	/* Form Cards */
	.form-card {
		background: white;
		border-radius: 24px;
		padding: 2rem;
		border: 1px solid #edf2f7;
		box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
	}

	.card-title { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 2rem; }
	.card-title .emoji { font-size: 1.5rem; }
	.card-title h2 { font-size: 1.25rem; font-weight: 800; color: var(--text); margin: 0; }

	/* Inputs */
	.input-field { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
	.input-field label { font-size: 0.9rem; font-weight: 700; color: var(--text); }
	.input-field label span { color: #ef4444; }

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

	input:focus, textarea:focus { outline: none; border-color: var(--cta); box-shadow: 0 0 0 4px rgba(217, 70, 122, 0.08); }

	.field-footer { display: flex; justify-content: flex-end; margin-top: 0.25rem; }
	.field-footer .counter { font-size: 0.75rem; font-weight: 700; color: #94a3b8; }

	/* Settings List */
	.settings-list { display: flex; flex-direction: column; gap: 1rem; }
	
	.setting-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 0;
	}

	.setting-text h3 { font-size: 1rem; font-weight: 800; color: var(--text); margin: 0; }
	.setting-text p { font-size: 0.85rem; color: var(--secondary); margin: 2px 0 0; }

	/* Switch Slider */
	.switch { position: relative; display: inline-block; width: 50px; height: 28px; }
	.switch input { opacity: 0; width: 0; height: 0; }
	.slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #e2e8f0; transition: .4s; border-radius: 28px; }
	.slider:before { position: absolute; content: ""; height: 20px; width: 20px; left: 4px; bottom: 4px; background-color: white; transition: .4s; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
	input:checked + .slider { background-color: #10b981; }
	input:checked + .slider:before { transform: translateX(22px); }

	.date-input { margin-top: 0.5rem; }
	.date-wrapper { position: relative; display: flex; align-items: center; }
	.date-icon { position: absolute; left: 1rem; color: var(--secondary); width: 1.25rem; }
	.date-input input { padding-left: 3rem; }

	/* Preview Column */
	.preview-sticky { position: sticky; top: 2rem; }
	.preview-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; color: var(--secondary); }
	.preview-header h3 { font-size: 0.9rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; margin: 0; }

	/* Offer Card Preview */
	.offer-preview-card {
		background: #fdf2f8;
		border: 2px solid #fbcfe8;
		border-radius: 24px;
		padding: 2.25rem;
		display: flex;
		gap: 1.5rem;
		position: relative;
		overflow: hidden;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.offer-preview-card::before {
		content: '';
		position: absolute;
		top: -50%;
		right: -50%;
		width: 100%;
		height: 100%;
		background: radial-gradient(circle, rgba(217, 70, 122, 0.05) 0%, transparent 70%);
		pointer-events: none;
	}

	.offer-preview-card.is-hidden { opacity: 0.7; filter: grayscale(0.5); }

	.preview-gift-icon {
		width: 54px;
		height: 54px;
		background: white;
		border-radius: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #db2777;
		flex-shrink: 0;
		box-shadow: 0 8px 20px rgba(219, 39, 119, 0.15);
	}

	:global(.preview-gift-icon svg) { width: 1.75rem; height: 1.75rem; }

	.preview-content { flex: 1; display: flex; flex-direction: column; }
	
	.preview-label { font-size: 0.7rem; font-weight: 900; color: #db2777; letter-spacing: 0.2em; margin-bottom: 0.5rem; }
	.preview-title { font-size: 1.4rem; font-weight: 900; color: #831843; margin: 0 0 0.75rem; line-height: 1.2; }
	.preview-desc { font-size: 0.95rem; color: #9d174d; line-height: 1.5; margin: 0 0 1.25rem; }
	
	.preview-conditions { font-size: 0.8rem; color: #be185d; font-style: italic; margin: 0 0 1rem; opacity: 0.8; }
	.preview-conditions span { font-weight: 800; font-style: normal; }

	.preview-date { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; font-weight: 800; color: #db2777; margin-top: auto; }
	:global(.preview-date svg) { width: 1rem; height: 1rem; }

	.preview-overlay {
		position: absolute;
		inset: 0;
		background: rgba(255, 255, 255, 0.7);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		backdrop-filter: blur(2px);
		color: #4b5563;
		font-weight: 900;
		font-size: 1rem;
	}
	:global(.preview-overlay svg) { width: 2.5rem; height: 2.5rem; opacity: 0.3; }

	/* Footer Actions */
	.form-submit-footer-pro { padding-top: 3rem; display: flex; flex-direction: column; gap: 1rem; }

	.btn-save {
		width: 100%;
		background: #10b981;
		color: white;
		border: none;
		padding: 1.25rem;
		border-radius: 20px;
		font-size: 1.2rem;
		font-weight: 800;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		box-shadow: 0 10px 20px rgba(16, 185, 129, 0.25);
		transition: all 0.2s;
	}

	.btn-save:hover { transform: translateY(-3px); filter: brightness(1.05); box-shadow: 0 15px 30px rgba(16, 185, 129, 0.3); }
	.btn-save:active { transform: translateY(-1px); }
	.btn-save:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

	.btn-delete {
		background: none;
		border: none;
		color: #f43f5e;
		font-weight: 700;
		font-size: 0.9rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		cursor: pointer;
		padding: 1rem;
		border-radius: 15px;
		transition: background 0.2s;
	}
	.btn-delete:hover { background: #fff1f2; }
	:global(.btn-delete svg) { width: 1.1rem; height: 1.1rem; }

	/* Spinner */
	.spinner-small { width: 1.5rem; height: 1.5rem; border: 3px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.8s linear infinite; }

	/* Alerts */
	.alert { padding: 1.25rem; border-radius: 16px; display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; font-weight: 600; }
	.alert.error { background: #fee2e2; color: #991b1b; }
	.alert.success { background: #f0fdf4; color: #166534; }
	.alert-icon { width: 1.5rem; flex-shrink: 0; }
	:global(.alert-icon svg) { width: 1.5rem; height: 1.5rem; }

	@media (max-width: 900px) {
		.form-grid-layout { grid-template-columns: 1fr; }
		.preview-sticky { position: static; margin-bottom: 2rem; order: -1; }
	}

	@media (max-width: 600px) {
		.edit-header h1 { font-size: 1.75rem; }
		.offer-preview-card { padding: 1.5rem; }
	}
</style>
