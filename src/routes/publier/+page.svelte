<script>
	import { page } from '$app/stores';
	import { fade, fly, slide } from 'svelte/transition';
	import { onMount } from 'svelte';

	let plan = 'free';

	// Reactive statement to get plan from URL
	$: plan = $page.url.searchParams.get('plan') || 'free';

	// Form data
	let ad = {
		title: '',
		description: '',
		location: '', // Lieu
		municipality: '', // Communes
		category: '',
		date: '',
		time: '',
		// Paid fields
		image: null,
		ticketingUrl: '',
		advertiserUrl: '',
		customStartTime: '',
		customEndTime: ''
	};

	const communes = [
		'Aveize',
		'Bibost',
		'Bessenay',
		'Brignais',
		'Brindas',
		'Brussieu',
		'Bully',
		'Chaponost',
		'Charbonnières-les-Bains',
		'Chazelles-sur-Lyon',
		'Chaussan',
		'Chevinay',
		'Coise',
		'Craponne',
		'Courzieu',
		'Duerne',
		'Éveux',
		'Fleurieux-sur-l’Arbresle',
		'Francheville',
		'Grézieu-la-Varenne',
		'Grézieu-le-Marché',
		"L'Arbresle",
		'Larajasse',
		'Lentilly',
		'Longessaigne',
		"Marcy-l'Étoile",
		'Messimy',
		'Meys',
		'Mornant',
		'Montromant',
		'Montrottier',
		'Orliénas',
		'Pollionnay',
		'Pomeys',
		'Riverie',
		'Rontalon',
		'Sainte-Catherine',
		'Sainte-Consorce',
		"Sainte-Foy-l'Argentière",
		'Saint-André-la-Côte',
		'Saint-Bel',
		'Saint-Didier-sous-Riverie',
		'Saint-Genis-les-Ollières',
		'Saint-Germain-Nuelles',
		'Saint-Julien-sur-Bibost',
		"Saint-Laurent-d'Agny",
		'Saint-Laurent-de-Chamousset',
		'Saint-Martin-en-Haut',
		'Saint-Pierre-la-Palud',
		'Saint-Symphorien-sur-Coise',
		'Soucieu-en-Jarrest',
		'Sourcieux-les-Mines',
		'Taluyers',
		'Thurins',
		'Vaugneray',
		'Villechenève',
		'Vourles',
		'Yzeron',
		'Autre'
	];

	let horaires = [
		'Toute la journée',
		'08h00 - 12h00',
		'09h00 - 18h00',
		'10h00 - 19h00',
		'14h00 - 18h00',
		'18h00 - 22h00',
		'19h00 - 23h00',
		'20h00 - 00h00',
		'Personnalisé'
	];

	let categories = [
		'Atelier',
		'Bal',
		'Brocante',
		'Ciné-débat',
		'Cinéma',
		'Cirque',
		'Conférence',
		'Concert',
		'Conte',
		'Comédie',
		'Culture et loisir',
		'Danse',
		'Démonstration',
		'Exposition',
		'Festival',
		'Foire',
		'Gastronomie',
		'Humour',
		'Jeu / Animation',
		'Jeune public',
		'Marché',
		'Marché artisanal',
		'Marché de Noël',
		'Portes ouvertes',
		'Randonnée',
		'Rencontre',
		'Repas / Soirée',
		'Spectacle',
		'Sport',
		'Stage',
		'Soirée',
		'Théâtre',
		'Visite guidée',
		'Vide maison'
	];

	function handleImageUpload(e) {
		if (e.target.files && e.target.files[0]) {
			ad.image = e.target.files[0];
		}
	}

	import { initFirebase } from '$lib/firebase';
	import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
	import { signInAnonymously } from 'firebase/auth';

	let loading = false;
	let error = null;
	let auth, db; // Local instances

	onMount(() => {
		const firebase = initFirebase();
		if (firebase) {
			auth = firebase.auth;
			db = firebase.db;
		} else {
			error = 'Erreur de configuration Firebase. Vérifiez la console.';
		}
	});

	async function handleSubmit() {
		loading = true;
		error = null;

		if (!auth || !db) {
			error = 'Firebase non initialisé. Vérifiez vos clés API.';
			loading = false;
			return;
		}

		try {
			// 1. Ensure user is authenticated (Anonymous or real)
			let user = auth.currentUser;
			if (!user) {
				const userCred = await signInAnonymously(auth);
				user = userCred.user;
			}

			// 2. Prepare Ad Data for Firestore
			const adData = {
				titre: ad.title,
				description: ad.description,
				lieu: ad.location,
				ville: ad.municipality,
				catégorie: ad.category,
				date: ad.date,
				horaire:
					ad.time === 'Personnalisé' ? `${ad.customStartTime} - ${ad.customEndTime}` : ad.time,
				contact: user.email || 'guest@lepoilu.fr', // Fallback email
				userId: user.uid,
				status: 'pending',
				paid: false,
				createdAt: serverTimestamp(),
				tier: plan === 'free' ? 'free' : 'single',
				lienBilletterie: ad.ticketingUrl,
				lienAnnonceur: ad.advertiserUrl,
				image: '' // Placeholder
			};

			// 3. Create Document in Firestore 'Submissions'
			const docRef = await addDoc(collection(db, 'Submissions'), adData);
			const submissionId = docRef.id;

			// 4. If Plan is FREE, we stop here (or redirect to success)
			if (plan === 'free') {
				// Free ads don't need payment
				if ($page.data.from_app) {
					window.location.href = '/succes?from_app=true&type=free';
				} else {
					alert('Annonce envoyée pour validation !');
					window.location.href = '/';
				}
				return;
			}

			// 5. If PAID, proceed to Stripe Checkout with submissionId
			const response = await fetch('/api/checkout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					type: 'ad',
					planId: plan,
					submissionId: submissionId, // CRITICAL: Link payment to doc
					data: {
						// Pass minimal info if needed for Stripe metadata display
						title: ad.title
					}
				})
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || 'Erreur lors de la création de la session');
			}

			if (result.url) {
				window.location.href = result.url;
			}
		} catch (err) {
			console.error('Erreur:', err);
			error = err.message;
			if (error.includes('Missing or insufficient permissions')) {
				error = 'Erreur de permission. Vérifiez que vous êtes connecté.';
			}
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Publier une annonce - Le Poilu</title>
</svelte:head>

<div class="page-container">
	<div class="content-wrapper">
		<header class="header-section" in:fly={{ y: -20, duration: 800 }}>
			<h1 class="title-responsive">
				Publier une annonce <span class="highlight">{plan === 'free' ? 'Gratuite' : 'Premium'}</span
				>
			</h1>
			<p class="subtitle-responsive">
				{#if plan === 'free'}
					Partagez votre annonce avec la communauté.
				{:else}
					Boostez votre visibilité avec une annonce Pro.
				{/if}
			</p>
		</header>

		<form
			class="form-card shadow-lg"
			on:submit|preventDefault={handleSubmit}
			in:fade={{ duration: 600, delay: 200 }}
		>
			<!-- Common Fields -->
			<div class="form-group">
				<label for="title">Titre de l'annonce *</label>
				<input
					type="text"
					id="title"
					bind:value={ad.title}
					placeholder="Ex: Concert Jazz, Vide-grenier..."
					required
				/>
			</div>

			<div class="form-group">
				<label for="description">Description</label>
				<textarea
					id="description"
					bind:value={ad.description}
					rows="5"
					placeholder="Détails de votre annonce..."
				></textarea>
			</div>

			<div class="grid-2">
				<div class="form-group">
					<label for="location">Lieu (Nom de la salle, Parc...) </label>
					<input
						type="text"
						id="location"
						bind:value={ad.location}
						placeholder="Ex: Salle des fêtes"
					/>
				</div>
				<div class="form-group">
					<label for="municipality">Commune *</label>
					<select id="municipality" bind:value={ad.municipality} required>
						<option value="" disabled selected>Choisir...</option>
						{#each communes as commune}
							<option value={commune}>{commune}</option>
						{/each}
					</select>
				</div>
			</div>

			<div class="grid-2">
				<div class="form-group">
					<label for="category">Catégorie *</label>
					<select id="category" bind:value={ad.category} required>
						<option value="" disabled selected>Choisir...</option>
						{#each categories as cat}
							<option value={cat}>{cat}</option>
						{/each}
					</select>
				</div>
				<!-- Date & Time placeholders, better implementation would use date picker -->
				<div class="form-group">
					<label for="date">Date *</label>
					<input type="date" id="date" bind:value={ad.date} required />
				</div>
			</div>

			<div class="form-group">
				<label for="time">Horaire</label>
				<select id="time" bind:value={ad.time}>
					<option value="" disabled selected>Choisir...</option>
					{#each horaires as horaire}
						<option value={horaire}>{horaire}</option>
					{/each}
				</select>
				{#if ad.time === 'Personnalisé'}
					<div class="custom-time-group" transition:slide>
						<div class="time-input">
							<label for="startTime">Début</label>
							<input type="time" id="startTime" bind:value={ad.customStartTime} required />
						</div>
						<div class="time-input">
							<label for="endTime">Fin</label>
							<input type="time" id="endTime" bind:value={ad.customEndTime} required />
						</div>
					</div>
				{/if}
			</div>

			<!-- Paid Only Fields -->
			{#if plan !== 'free'}
				<div class="premium-fields" in:fly={{ y: 20, duration: 400 }}>
					<div class="premium-banner">
						<i class="fa-solid fa-star"></i> Options Premium
					</div>

					<div class="form-group">
						<label for="image">Image de couverture</label>
						<div class="upload-area">
							<input type="file" id="image" on:change={handleImageUpload} accept="image/*" />
							<div class="upload-placeholder">
								<i class="fa-solid fa-cloud-arrow-up"></i>
								<span>{ad.image ? ad.image.name : 'Cliquez ou glissez votre image'}</span>
							</div>
						</div>
					</div>

					<div class="grid-2">
						<div class="form-group">
							<label for="ticketing">Lien vers la billetterie</label>
							<div class="url-input-group">
								<span class="url-prefix">https://</span>
								<input
									type="text"
									id="ticketing"
									bind:value={ad.ticketingUrl}
									placeholder="vos-billets.com"
								/>
							</div>
						</div>
						<div class="form-group">
							<label for="advertiser">Lien vers l'annonceur</label>
							<div class="url-input-group">
								<span class="url-prefix">https://</span>
								<input
									type="text"
									id="advertiser"
									bind:value={ad.advertiserUrl}
									placeholder="votre-site.com"
								/>
							</div>
						</div>
					</div>
				</div>
			{/if}

			{#if plan === 'free'}
				<div class="free-plan-note">
					<i class="fa-solid fa-image"></i>
					<span>Votre annonce sera accompagnée du logo du Poilu.</span>
				</div>
			{/if}

			<p class="disclaimer-text">
				<i class="fa-solid fa-circle-info"></i> Vérifiez bien vos informations avant de valider. Une
				fois soumise, votre annonce sera relue par notre équipe de modération avant d'être publiée.
			</p>

			<div class="actions">
				<a href="/Tarifs" class="btn btn-secondary">Retour</a>
				<button type="submit" class="btn btn-primary" disabled={loading}>
					{#if loading}
						<i class="fa-solid fa-spinner fa-spin"></i> Traitement...
					{:else}
						{#if plan === 'free'}
							Publier gratuitement
						{:else}
							Payer et Publier
						{/if}
						<i class="fa-solid fa-arrow-right"></i>
					{/if}
				</button>
			</div>
			{#if error}
				<p class="error-text">{error}</p>
			{/if}
		</form>
	</div>
</div>

<style>
	/* .page-container {
		min-height: 100vh;
		padding-bottom: var(--spacing-xl);
		background: var(--lightBg);
	} */

	.content-wrapper {
		padding-top: var(--spacing-lg);
		max-width: 800px;
		margin: 0 auto;
		padding-left: var(--spacing-md);
		padding-right: var(--spacing-md);
	}

	.header-section {
		text-align: center;
		margin-bottom: var(--spacing-md);
	}

	.header-section h1 {
		color: var(--text);
		font-weight: 700;
		margin-bottom: var(--spacing-xs);
	}

	.highlight {
		color: var(--cta);
	}

	.header-section p {
		color: var(--secondary);
	}

	.form-card {
		background: white;
		border-radius: var(--radius-lg);
		padding: var(--spacing-lg);
		border: 1px solid var(--border);
		box-shadow: var(--shadow);
	}

	.form-group {
		margin-bottom: var(--spacing-md);
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
		color: var(--text);
	}

	input,
	select,
	textarea {
		width: 100%;
		padding: 12px 16px;
		border: 2px solid var(--border);
		border-radius: var(--radius-sm);
		font-family: var(--FFBody);
		font-size: 1rem;
		transition: all var(--transition-fast);
		background: #fafafa;
	}

	input:focus,
	select:focus,
	textarea:focus {
		outline: none;
		border-color: var(--cta);
		box-shadow: 0 0 0 4px var(--ctaFade);
		background: white;
	}

	/* Premium Section */
	.premium-fields {
		background: #fff5f2;
		padding: var(--spacing-md);
		border-radius: var(--radius-md);
		border: 1px dashed var(--cta);
		margin-bottom: var(--spacing-md);
		position: relative;
	}

	.premium-banner {
		color: var(--cta);
		font-weight: 700;
		margin-bottom: var(--spacing-md);
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.upload-area {
		position: relative;
		border: 2px dashed var(--border);
		border-radius: var(--radius-md);
		padding: var(--spacing-lg);
		text-align: center;
		transition: all var(--transition-fast);
		background: white;
		cursor: pointer;
	}

	.upload-area:hover {
		border-color: var(--cta);
	}

	.upload-area input {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
	}

	.upload-placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		color: var(--secondary);
	}

	.upload-placeholder i {
		font-size: 2rem;
		color: var(--cta);
	}

	/* Actions */
	.actions {
		display: flex;
		justify-content: flex-end;
		gap: var(--spacing-sm);
		margin-top: var(--spacing-lg);
		padding-top: var(--spacing-md);
		border-top: 1px solid var(--border);
	}

	.btn {
		padding: 12px 24px;
		border-radius: 50px;
		font-weight: 600;
		cursor: pointer;
		transition: all var(--transition-fast);
		border: none;
		display: flex;
		align-items: center;
		gap: 8px;
		font-family: var(--FFBody);
		text-decoration: none;
		font-size: 1rem;
	}

	.btn-primary {
		background: var(--cta);
		color: var(--ctaText);
	}

	.btn-primary:hover {
		background: var(--ctaHover);
		transform: translateY(-2px);
		box-shadow: 0 5px 15px var(--ctaFade);
	}

	.btn-secondary {
		background: transparent;
		color: var(--text);
		border: 2px solid var(--border);
	}

	.btn-secondary:hover {
		background: var(--lightBg);
	}

	@media (max-width: 768px) {
		.actions {
			flex-direction: column-reverse;
		}

		.btn {
			width: 100%;
			justify-content: center;
		}
	}

	.custom-time-group {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-sm);
		margin-top: var(--spacing-sm);
		padding: var(--spacing-sm);
		background: var(--lightBg);
		border-radius: var(--radius-sm);
		border: 1px solid var(--border);
	}

	.time-input label {
		font-size: 0.9rem;
		margin-bottom: 0.2rem;
		color: var(--secondary);
	}

	/* URL Input Group Styling */
	.url-input-group {
		display: flex;
		align-items: center;
		border: 2px solid var(--border);
		border-radius: var(--radius-sm);
		background: #fafafa;
		transition: all var(--transition-fast);
		overflow: hidden;
	}

	.url-input-group:focus-within {
		border-color: var(--cta);
		box-shadow: 0 0 0 4px var(--ctaFade);
		background: white;
	}

	.url-prefix {
		padding: 12px 12px 12px 16px;
		color: var(--secondary);
		font-weight: 600;
		background: rgba(0, 0, 0, 0.05);
		border-right: 1px solid var(--border);
		font-family: var(--FFBody);
		flex-shrink: 0;
	}

	.url-input-group input {
		border: none;
		border-radius: 0;
		box-shadow: none !important;
		background: transparent;
		padding-left: 12px;
		height: 100%;
	}

	.url-input-group input:focus {
		outline: none;
		background: transparent;
	}

	.disclaimer-text {
		font-size: 0.9rem;
		color: var(--secondary);
		background: #fff8e1;
		padding: 1rem;
		border-radius: var(--radius-sm);
		border-left: 4px solid #ffc107;
		margin-top: var(--spacing-lg);
		display: flex;
		gap: 10px;
		align-items: center;
	}

	.disclaimer-text i {
		color: #ffc107;
		font-size: 1.1rem;
	}

	.free-plan-note {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 1rem;
		background: #e6f7ff;
		border-left: 4px solid #1890ff;
		border-radius: var(--radius-sm);
		color: var(--text);
		margin-top: var(--spacing-md);
		font-family: var(--FFBody);
	}

	.free-plan-note i {
		color: #1890ff;
		font-size: 1.2rem;
	}

	.error-text {
		color: #ef4444;
		text-align: center;
		margin-top: 10px;
		font-weight: 600;
	}
</style>
