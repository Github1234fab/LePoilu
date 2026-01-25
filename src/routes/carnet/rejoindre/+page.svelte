<script>
	import { fade, fly, slide } from 'svelte/transition';

	let step = 1;
	let selectedPlan = 'premium'; // 'basic' or 'premium'

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
				"Pas d'horaires"
			]
		},
		premium: {
			name: 'Premium',
			price: '49€',
			amount: '49,00 €',
			features: [
				'Fiche complète',
				'Photos & Horaires',
				'Lien site web & Tél',
				"Offre promotionnelle pour vos clients (sur présentation de l'app)",
				"Bouton d'appel",
				'Meilleure visibilité'
			]
		}
	};

	let form = {
		companyName: '',
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

	async function submitForm() {
		loading = true;
		error = null;

		try {
			// For photos, in a real app, you would upload them to Firebase Storage first
			// and get the URLs to send to the checkout endpoint.
			// For this MVP, we are skipping the actual file upload logic to keep it simple,
			// or passing dummy URLs if needed. The API expects the data structure.

			const response = await fetch('/api/checkout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					type: 'sponsor',
					planId: selectedPlan, // 'basic' or 'premium'
					data: {
						...form,
						// Photos are file objects, can't json stringify directly without upload.
						// We'll skip sending raw files to the checkout endpoint.
						photos: []
					}
				})
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || 'Une erreur est survenue');
			}

			if (result.url) {
				window.location.href = result.url;
			}
		} catch (err) {
			console.error('Erreur paiement:', err);
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
	<!-- Hero / Intro Section -->
	<div class="hero-split">
		<div class="hero-content">
			<h1 in:fly={{ y: 20, duration: 600 }}>
				Développez votre activité avec <span class="highlight">Le Poilu</span>
			</h1>
			<p in:fade={{ delay: 200 }}>
				Rejoignez notre carnet de bonnes adresses et connectez-vous avec des milliers d'utilisateurs
				locaux.
			</p>

			<div class="benefits-list" in:fade={{ delay: 400 }}>
				{#each benefits as benefit}
					<div class="benefit-item">
						<div class="benefit-icon">
							<i class="fa-solid {benefit.icon}"></i>
						</div>
						<div class="benefit-text">
							<h4>{benefit.title}</h4>
							<p>{benefit.desc}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Registration Form -->
		<div class="form-section">
			<div class="form-card" in:fly={{ y: 50, duration: 600, delay: 200 }}>
				<div class="form-header">
					<h2>Devenez Partenaire</h2>
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
					<div class="form-row">
						<div class="input-group">
							<label for="company">Nom de l'entreprise</label>
							<input type="text" id="company" bind:value={form.companyName} required />
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
									<input
										type="url"
										id="web1"
										bind:value={form.website1}
										placeholder="https://..."
									/>
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
									<input
										type="url"
										id="web4"
										bind:value={form.website4}
										placeholder="https://..."
									/>
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
							Rejoindre en Premium <i class="fa-solid fa-star"></i>
						{:else}
							Rejoindre l'Essentiel <i class="fa-solid fa-arrow-right"></i>
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
</div>

<style>
	.page-wrapper {
		min-height: 100vh;
		background: linear-gradient(135deg, #fff5f2 0%, #ffffff 100%);
		padding: var(--spacing-lg) 0;
	}

	.hero-split {
		max-width: var(--desktop);
		margin: 0 auto;
		padding: 0 var(--spacing-md);
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-xl);
		align-items: start;
	}

	.hero-content {
		padding-right: var(--spacing-lg);
		position: sticky;
		top: 100px;
	}

	.hero-content h1 {
		font-size: 3.5rem;
		line-height: 1.2;
		margin-bottom: var(--spacing-md);
		color: var(--text);
	}

	.highlight {
		color: var(--cta);
		position: relative;
		z-index: 1;
	}

	.highlight::after {
		content: '';
		position: absolute;
		bottom: 5px;
		left: 0;
		width: 100%;
		height: 15px;
		background: #fbd5c6;
		z-index: -1;
		opacity: 0.6;
		transform: rotate(-2deg);
	}

	.hero-content p {
		font-size: 1.2rem;
		color: var(--secondary);
		margin-bottom: var(--spacing-lg);
	}

	.benefits-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.benefit-item {
		display: flex;
		gap: var(--spacing-md);
		align-items: flex-start;
	}

	.benefit-icon {
		width: 50px;
		height: 50px;
		background: white;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		color: var(--cta);
		box-shadow: var(--shadow3);
		flex-shrink: 0;
	}

	.benefit-text h4 {
		margin-bottom: 5px;
		color: var(--text);
		font-size: 1.1rem;
	}

	.benefit-text p {
		font-size: 0.95rem;
		margin-bottom: 0;
		color: var(--secondary);
	}

	/* Form Section */
	.form-card {
		background: white;
		border-radius: var(--radius-lg);
		padding: var(--spacing-lg);
		box-shadow: var(--shadow);
		border: 1px solid white;
	}

	.form-header {
		text-align: center;
		margin-bottom: var(--spacing-md);
	}

	.form-header h2 {
		color: var(--text);
		margin-bottom: var(--spacing-md);
	}

	.toggle-container {
		display: inline-flex;
		background: var(--lightBg);
		padding: 5px;
		border-radius: 50px;
	}

	.toggle-btn {
		padding: 8px 16px;
		border-radius: 50px;
		border: none;
		background: transparent;
		cursor: pointer;
		font-family: var(--FFBody);
		font-weight: 500;
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
		padding: 10px 15px;
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
		padding: 10px 15px;
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

	@media (max-width: 1024px) {
		.hero-split {
			grid-template-columns: 1fr;
			text-align: center;
			gap: var(--spacing-lg);
		}

		.hero-content {
			padding-right: 0;
		}

		.benefits-list {
			align-items: flex-start;
			text-align: left;
			max-width: 500px;
			margin: 0 auto;
		}

		.highlight::after {
			left: 50%;
			transform: translateX(-50%) rotate(-2deg);
			width: 200px;
		}
	}

	/* Form Features List */
	.plan-features-list {
		list-style: none;
		margin-bottom: var(--spacing-lg);
		padding: 0 var(--spacing-md);
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
	}

	.error-text {
		color: #ef4444;
		text-align: center;
		margin-top: 10px;
		font-weight: 500;
	}
</style>
