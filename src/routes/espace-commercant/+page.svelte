<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { auth, db } from '$lib/firebase';
	import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
	import { onAuthStateChanged } from 'firebase/auth';

	// Icons
	import StorefrontIcon from '$lib/Components/icons/StorefrontIcon.svelte';
	import TimeIcon from '$lib/Components/icons/TimeIcon.svelte';
	import CheckCircleIcon from '$lib/Components/icons/CheckCircleIcon.svelte';
	import CloseCircleIcon from '$lib/Components/icons/CloseCircleIcon.svelte';
	import AlertCircleIcon from '$lib/Components/icons/AlertCircleIcon.svelte';
	import PauseCircleIcon from '$lib/Components/icons/PauseCircleIcon.svelte';
	import StarIcon from '$lib/Components/icons/StarIcon.svelte';
	import EyeIcon from '$lib/Components/icons/EyeIcon.svelte';
	import CursorClickIcon from '$lib/Components/icons/CursorClickIcon.svelte';
	import GiftIcon from '$lib/Components/icons/GiftIcon.svelte';
	import EditIcon from '$lib/Components/icons/EditIcon.svelte';
	import ImageIcon from '$lib/Components/icons/ImageIcon.svelte';
	import MailIcon from '$lib/Components/icons/MailIcon.svelte';
	import ChevronRightIcon from '$lib/Components/icons/ChevronRightIcon.svelte';
	import StatsChartIcon from '$lib/Components/icons/StatsChartIcon.svelte';
	import PricetagIcon from '$lib/Components/icons/PricetagIcon.svelte';
	import ArrowForwardIcon from '$lib/Components/icons/ArrowForwardIcon.svelte';
	import ShieldCheckmarkIcon from '$lib/Components/icons/ShieldCheckmarkIcon.svelte';
	import LockClosedIcon from '$lib/Components/icons/LockClosedIcon.svelte';
	import ReceiptIcon from '$lib/Components/icons/ReceiptIcon.svelte';

	let user = null;
	let sponsor = null;
	let loading = true;
	let loadingPlans = false;
	let errorMsg = '';
	let plans = [];

	onMount(() => {
		// New integrated UX: redirect to My Account for all things merchant
		window.location.href = '/compte';
		return;
	});

	async function fetchPlans() {
		try {
			loadingPlans = true;
			const q = query(collection(db, 'SponsorPlans'), orderBy('order', 'asc'));
			const snapshot = await getDocs(q);

			plans = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data()
			}));
		} catch (error) {
			console.error('Error fetching plans:', error);
		} finally {
			loadingPlans = false;
			loading = false;
		}
	}

	async function fetchSponsorData(uid) {
		try {
			loading = true;
			const q = query(collection(db, 'Sponsors'), where('userId', '==', uid));

			const snapshot = await getDocs(q);

			if (snapshot.empty) {
				sponsor = null;
				// Si connecté mais pas de sponsor : redirection vers la landing
				window.location.href = '/carnet/rejoindre';
			} else {
				sponsor = {
					id: snapshot.docs[0].id,
					...snapshot.docs[0].data()
				};
			}
		} catch (error) {
			console.error('[Espace Commercant] Erreur:', error);
			errorMsg = 'Impossible de charger tes données.';
		} finally {
			loading = false;
		}
	}

	function getStatusInfo(status) {
		switch (status) {
			case 'pending':
				return { label: 'En attente de modération' };
			case 'approved':
				return { label: 'Fiche active' };
			case 'rejected':
				return { label: 'Fiche rejetée' };
			case 'expired':
				return { label: 'Abonnement expiré' };
			case 'suspended':
				return { label: 'Fiche suspendue' };
			default:
				return { label: status || 'Inconnu' };
		}
	}

	$: statusInfo = sponsor ? getStatusInfo(sponsor.status) : null;
	$: isPremium = sponsor?.currentPlan?.type === 'premium';
	$: isActive = sponsor?.currentPlan?.isActive;
	$: isExpired = sponsor?.status === 'expired' || (sponsor && !isActive);
</script>

<svelte:head>
	<title>Mon Espace Commerçant - Le Poilu</title>
</svelte:head>

<div class="espace-layout">
	<header class="espace-header">
		<div class="header-content">
			<h1>Commerçant</h1>
			{#if user}
				<div class="user-email">{user.email}</div>
			{/if}
		</div>
	</header>

	<main class="espace-main">
		{#if loading}
			<div class="loading-state" in:fade>
				<div class="spinner"></div>
				<p>Chargement de votre espace...</p>
			</div>
		{:else if errorMsg}
			<div class="error-state" in:fade>
				<div class="error-icon-wrapper">
					<AlertCircleIcon class="alert-icon" />
				</div>
				<div class="error-content">
					<p>{errorMsg}</p>
					<button class="btn-retry" on:click={() => fetchSponsorData(user.uid)}> Réessayer </button>
				</div>
			</div>
		{:else if !sponsor}
			<!-- MARKETING LANDING (VANILLA CSS ONLY - NO TAILWIND) -->
			<div class="marketing-container" in:fade>
				<!-- Hero Section -->
				<header class="marketing-hero-card">
					<div class="hero-glow"></div>
					<h2 class="marketing-title">Booste ton CA avec Le Poilu</h2>
					<p class="marketing-subtitle">
						Ne sois pas juste "présent". Sois <span class="highlight">attractif</span> avec le concept 
						<strong>Gagnant-Gagnant</strong> des Bons Plans.
					</p>
				</header>

				<!-- Benefits Grid -->
				<section class="benefits-section">
					<div class="benefits-grid">
						<div class="benefit-item">
							<div class="benefit-icon-box">
								<GiftIcon />
							</div>
							<div class="benefit-content">
								<h3>Le concept "Gagnant-Gagnant"</h3>
								<p>Le client cherche un bon plan, tu cherches des clients. Une offre exclusive crée le déclic immédiat.</p>
							</div>
						</div>

						<div class="benefit-item">
							<div class="benefit-icon-box">
								<EyeIcon />
							</div>
							<div class="benefit-content">
								<h3>Visibilité Premium</h3>
								<p>Apparais en tête de liste et gère tes propres photos pour séduire les habitants.</p>
							</div>
						</div>

						<div class="benefit-item">
							<div class="benefit-icon-box">
								<StatsChartIcon />
							</div>
							<div class="benefit-content">
								<h3>Mesure ton succès</h3>
								<p>Suis en temps réel les vues et les clics générés par ta vitrine et tes offres.</p>
							</div>
						</div>

						<div class="benefit-item">
							<div class="benefit-icon-box">
								<PricetagIcon />
							</div>
							<div class="benefit-content">
								<h3>Le Badge "Bon Plan"</h3>
								<p>Les commerces avec une offre active reçoivent un badge spécial qui capte l'attention.</p>
							</div>
						</div>
					</div>
				</section>

				<!-- Pricing Plans -->
				<section class="pricing-section">
					<h2 class="section-title">Choisissez votre impact</h2>

					<div class="plans-container">
						<!-- Basic Plan -->
						<div class="plan-card basic">
							<div class="plan-header">
								<h3>Visibilité Simple</h3>
								<p class="plan-tagline">Pour être présent dans l'annuaire local.</p>
								<div class="plan-price-box">
									<span class="currency">19.90€</span>
									<span class="period">/mois</span>
								</div>
							</div>
							<ul class="plan-features-list">
								<li><CheckCircleIcon class="icon-v" /> Présence garantie sur le site</li>
								<li><CheckCircleIcon class="icon-v" /> Adresse & Téléphone</li>
								<li class="disabled">❌ Pas de description</li>
								<li class="disabled">❌ Pas de photos ni d'offres</li>
							</ul>
							<a href="/espace-commercant/rejoindre" class="btn-plan-select">Choisir Visibilité</a>
						</div>

						<!-- Premium Plan -->
						<div class="plan-card premium">
							<div class="recommended-badge">RECOMMANDÉ</div>
							<div class="plan-header">
								<h3 class="text-primary">Boost & Bons Plans</h3>
								<p class="plan-tagline">L'atout majeur pour attirer du monde en boutique.</p>
								<div class="plan-price-box text-primary">
									<span class="currency">39.90€</span>
									<span class="period">/mois</span>
								</div>
							</div>
							<ul class="plan-features-list">
								<li class="feature-highlight"><CheckCircleIcon class="icon-p" /> <strong>Gestion des OFFRES (Bons Plans)</strong></li>
								<li><CheckCircleIcon class="icon-p" /> Jusqu'à 7 photos</li>
								<li><CheckCircleIcon class="icon-p" /> Statistiques détaillées</li>
								<li><CheckCircleIcon class="icon-p" /> Kit vitrine offert</li>
							</ul>
							<a href="/espace-commercant/rejoindre" class="btn-plan-select btn-premium">Choisir Boost & Bons Plans</a>
						</div>
					</div>
				</section>

				<!-- Trust Bars -->
				<div class="trust-bar">
					<div class="trust-item">
						<LockClosedIcon /> <span>Paiement Stripe</span>
					</div>
					<div class="trust-item">
						<ShieldCheckmarkIcon /> <span>Sans engagement</span>
					</div>
					<div class="trust-item">
						<ReceiptIcon /> <span>Facturation auto</span>
					</div>
				</div>

				<!-- Footer Contact -->
				<footer class="marketing-footer">
					<h4>Une question avant de te lancer ?</h4>
					<p>Notre équipe est là pour t'accompagner.</p>
					<a href="/contact" class="btn-contact-outline">Nous contacter</a>
				</footer>
			</div>
		{:else}
			<div class="dashboard-content" in:fade>
				<header class="dashboard-hero">
					<div class="hero-glow"></div>
					<div class="hero-text">
						<h1>Ravi de te revoir,</h1>
						<h2 class="business-name-big">{sponsor.businessName}</h2>
						<p class="category-tag">{sponsor.category}</p>
					</div>
				</header>

				<section class="card profile-card">
					<div class="profile-header">
						<div class="profile-info">
							<h3>Statut de ta vitrine</h3>
							<p>Gère la visibilité de ton commerce</p>
						</div>
						{#if isPremium}
							<div class="premium-badge">
								<StarIcon class="star-icon" />
								<span>PREMIUM</span>
							</div>
						{/if}
					</div>

					<div class="status-banner {sponsor.status}">
						<span class="status-label">{statusInfo.label}</span>
					</div>

					{#if sponsor.status === 'pending'}
						<div class="status-message message-info">
							<p>
								Votre fiche est en cours de modération par notre équipe. Le Poilu valide chaque
								commerce pour garantir la qualité de l'annuaire. Vous recevrez un email sous 24h à
								48h.
							</p>
						</div>
					{:else if sponsor.status === 'rejected' && sponsor.rejectionReason}
						<div class="status-message message-error">
							<h4>Raison du refus :</h4>
							<p>{sponsor.rejectionReason}</p>
							<a href="/espace-commercant/modifier" class="btn-error">Modifier ma fiche</a>
						</div>
					{:else if isExpired}
						<div class="status-message message-error">
							<h4>Vitrine inactive</h4>
							<p>Votre fiche n'est plus visible par les utilisateurs dans Le Carnet.</p>
							<a href="/espace-commercant/renouveler" class="btn-error">Passer en Premium</a>
						</div>
					{/if}

					{#if sponsor.status === 'approved' && isActive}
						<div class="stats-section">
							<h3><span class="emoji-icon">📊</span> Vos performances</h3>
							<div class="stats-grid">
								<div class="stat-card">
									<div class="stat-icon-wrapper text-primary">
										<EyeIcon class="stat-icon" />
									</div>
									<span class="stat-value">{sponsor.stats?.views || 0}</span>
									<span class="stat-label">Vues</span>
								</div>
								<div class="stat-card">
									<div class="stat-icon-wrapper text-green">
										<CursorClickIcon class="stat-icon" />
									</div>
									<span class="stat-value">{sponsor.stats?.clicks || 0}</span>
									<span class="stat-label">Clics</span>
								</div>
								<div class="stat-card">
									<div class="stat-icon-wrapper text-orange">
										<GiftIcon class="stat-icon" />
									</div>
									<span class="stat-value">{sponsor.stats?.offersShown || 0}</span>
									<span class="stat-label">Offres vues</span>
								</div>
							</div>
							{#if sponsor.stats?.lastViewDate}
								<div class="stat-footer">
									Dernière vue le {new Date(
										sponsor.stats.lastViewDate?.seconds * 1000
									).toLocaleDateString('fr-FR')}
								</div>
							{/if}
						</div>
					{/if}
				</section>

				<section class="card actions-card">
					<h3><span class="emoji-icon">⚙️</span> Gérer ma vitrine</h3>
					<div class="actions-list">
						<a href="/espace-commercant/modifier" class="action-item">
							<div class="action-content">
								<div class="action-icon-wrapper icon-edit">
									<EditIcon class="action-icon" />
								</div>
								<div class="action-text">
									<h4>Modifier mes informations</h4>
									<p>Description, horaires, contact, adresse...</p>
								</div>
							</div>
							<ChevronRightIcon class="chevron-icon" />
						</a>

						<a href="/espace-commercant/offres" class="action-item">
							<div class="action-content">
								<div class="action-icon-wrapper icon-offer">
									<GiftIcon class="action-icon" />
								</div>
								<div class="action-text">
									<h4>Mon offre exclusive</h4>
									<p>
										{#if sponsor.specialOffer?.isActive}
											<span class="offer-active">Offre active :</span> {sponsor.specialOffer.title}
										{:else}
											Attirez plus de clients avec une réduction
										{/if}
									</p>
								</div>
							</div>
							<ChevronRightIcon class="chevron-icon" />
						</a>

						<a href="/espace-commercant/photos" class="action-item">
							<div class="action-content">
								<div class="action-icon-wrapper icon-photo">
									<ImageIcon class="action-icon" />
								</div>
								<div class="action-text">
									<h4>Mes photos</h4>
									<p>
										{#if isPremium}
											{sponsor.images?.length || 0} / 7 photos ajoutées
										{:else}
											<span class="text-warning">Réservé aux comptes Premium</span>
										{/if}
									</p>
								</div>
							</div>
							<ChevronRightIcon class="chevron-icon" />
						</a>

						{#if sponsor.status === 'approved' && isActive}
							<a href={`/carnet/${sponsor.id}`} target="_blank" class="action-item preview-item">
								<div class="action-content">
									<div class="action-icon-wrapper icon-preview">
										<EyeIcon class="action-icon" />
									</div>
									<div class="action-text">
										<h4>Voir ma fiche publique</h4>
										<p>Découvre comment les utilisateurs voient ta vitrine</p>
									</div>
								</div>
								<ChevronRightIcon class="chevron-icon" />
							</a>
						{/if}
					</div>
				</section>

				<section class="card support-card">
					<h3><span class="emoji-icon">❓</span> Besoin d'aide ?</h3>
					<p>
						Une question sur ton abonnement, tes statistiques ou besoin d'aide pour optimiser
						ta fiche ? Notre équipe est là pour toi.
					</p>
					<a href="/contact" class="btn-support">
						<MailIcon class="support-icon" />
						Contacter le support
					</a>
				</section>
			</div>
		{/if}
	</main>
</div>

<style>
	.espace-layout {
		/* Harmonization with global styles.css */
		--primary: #ffb79e;
		--accent: #af340c;
		--text: #073B4C;
		--bg: #f9fafb;
		--surface: #ffffff;
		--border: #e6d3bd;
		--shadow-premium: 0 10px 30px rgba(7, 59, 76, 0.1);
		--shadow-hover: 0 20px 40px rgba(7, 59, 76, 0.15);
		
		--radius-lg: 24px;
		--radius-md: 16px;
		--radius-sm: 10px;

		min-height: 100vh;
		background-color: var(--bg);
		padding-bottom: 5rem;
		font-family: 'Poppins', system-ui, sans-serif;
		color: var(--text);
	}

	h1,
	h2,
	h3,
	h4 {
		margin: 0;
		color: var(--color-text);
		font-family: 'Poppins', system-ui, sans-serif;
	}
	p {
		margin: 0;
		line-height: 1.5;
	}

	.espace-header {
		background-color: var(--surface);
		border-bottom: 1px solid var(--border);
		position: sticky;
		top: 0;
		z-index: 100;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
	}
	.header-content {
		max-width: 1000px;
		margin: 0 auto;
		padding: 1.25rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.espace-header h1 {
		font-size: 1.5rem;
		font-weight: 800;
		letter-spacing: -0.02em;
	}
	.user-email {
		font-size: 0.9rem;
		color: var(--textColor);
		opacity: 0.7;
		font-weight: 600;
		background: var(--lightBg);
		padding: 0.4rem 1rem;
		border-radius: 9999px;
	}

	.espace-main {
		max-width: 800px;
		margin: 1.5rem auto 0;
		padding: 0 1.5rem;
	}

	.marketing-container {
		display: flex;
		flex-direction: column;
		gap: 3rem;
		padding-bottom: 3rem;
		max-width: 1000px;
		margin: 0 auto;
	}

	.marketing-hero-card {
		text-align: center;
		padding: 4rem 2rem;
		background: #fff8f0;
		border-radius: var(--radius-lg);
		border: 1px solid #ffe8d6;
		position: relative;
		overflow: hidden;
		box-shadow: var(--shadow-sm);
	}

	.hero-glow {
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: radial-gradient(circle, rgba(255,183,158,0.1) 0%, rgba(255,255,255,0) 70%);
		pointer-events: none;
	}

	.marketing-title {
		font-size: clamp(2rem, 5vw, 2.75rem);
		font-weight: 900;
		color: var(--text);
		margin-bottom: 1.5rem;
		line-height: 1.1;
		position: relative;
	}

	.marketing-subtitle {
		font-size: 1.125rem;
		color: #4b5563;
		max-width: 600px;
		margin: 0 auto;
		line-height: 1.6;
		position: relative;
	}

	.highlight {
		color: var(--accent);
		font-weight: 800;
	}

	/* Benefits Grid */
	.benefits-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 1.5rem;
	}

	.benefit-item {
		background: white;
		padding: 1.5rem;
		border-radius: var(--radius-md);
		border: 1px solid var(--border);
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		transition: all 0.2s ease;
	}

	.benefit-item:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow3);
		border-color: var(--primary);
	}

	.benefit-icon-box {
		width: 3rem;
		height: 3rem;
		background: #fff8f0;
		color: var(--accent);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	:global(.benefit-icon-box svg) {
		width: 1.5rem;
		height: 1.5rem;
	}

	.benefit-content h3 {
		font-size: 1.05rem;
		font-weight: 700;
		margin-bottom: 0.4rem;
		color: var(--text);
	}

	.benefit-content p {
		font-size: 0.9rem;
		color: #6b7280;
		line-height: 1.5;
	}

	/* Pricing */
	.section-title {
		text-align: center;
		font-size: 1.75rem;
		font-weight: 800;
		margin-bottom: 2rem;
		color: var(--text);
	}

	.plans-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 2rem;
		max-width: 900px;
		margin: 0 auto;
	}

	.plan-card {
		background: white;
		border-radius: var(--radius-lg);
		padding: 2.5rem;
		border: 2px solid #e5e7eb;
		display: flex;
		flex-direction: column;
		position: relative;
		transition: all 0.3s ease;
	}

	.plan-card.premium {
		border-color: var(--accent);
		box-shadow: 0 20px 25px -5px rgba(175, 52, 12, 0.1);
	}

	.recommended-badge {
		position: absolute;
		top: -0.75rem;
		right: 2rem;
		background: var(--text);
		color: #facc15;
		font-size: 0.75rem;
		font-weight: 900;
		padding: 0.4rem 1rem;
		border-radius: 9999px;
		letter-spacing: 0.05em;
	}

	.plan-header h3 {
		font-size: 1.5rem;
		font-weight: 800;
		margin-bottom: 0.5rem;
	}

	.text-primary {
		color: var(--accent) !important;
	}

	.plan-tagline {
		font-size: 0.9rem;
		color: #6b7280;
		margin-bottom: 1.5rem;
	}

	.plan-price-box {
		margin-bottom: 2rem;
		display: flex;
		align-items: baseline;
		gap: 0.2rem;
	}

	.currency {
		font-size: 2.75rem;
		font-weight: 900;
	}

	.period {
		font-size: 1rem;
		opacity: 0.7;
	}

	.plan-features-list {
		list-style: none;
		padding: 0;
		margin: 0 0 2.5rem 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		flex-grow: 1;
	}

	.plan-features-list li {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		font-size: 0.95rem;
		color: #374151;
		line-height: 1.4;
	}

	.plan-features-list li.disabled {
		color: #9ca3af;
		font-style: italic;
	}

	.feature-highlight {
		color: var(--text) !important;
		font-weight: 600;
	}

	:global(.icon-v) { width: 1.25rem; height: 1.25rem; color: #10b981; flex-shrink: 0; }
	:global(.icon-p) { width: 1.25rem; height: 1.25rem; color: var(--accent); flex-shrink: 0; }

	.btn-plan-select {
		display: block;
		text-align: center;
		padding: 1.25rem;
		border-radius: var(--radius-md);
		background: #f3f4f6;
		color: var(--text);
		font-weight: 800;
		text-decoration: none;
		transition: all 0.2s;
	}

	.btn-premium {
		background: var(--accent);
		color: white;
		box-shadow: 0 4px 12px rgba(175, 52, 12, 0.3);
	}

	.btn-plan-select:hover {
		transform: translateY(-2px);
		filter: brightness(1.05);
	}

	/* Trust Bar */
	.trust-bar {
		display: flex;
		justify-content: center;
		gap: 3rem;
		flex-wrap: wrap;
		padding: 2rem;
		background: #f9fafb;
		border-radius: var(--radius-lg);
		border: 1px solid #f3f4f6;
	}

	.trust-item {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		color: #6b7280;
		font-size: 0.85rem;
		font-weight: 700;
	}

	:global(.trust-item svg) {
		width: 1.25rem;
		height: 1.25rem;
	}

	.marketing-footer {
		text-align: center;
		padding: 2rem 0;
	}

	.marketing-footer h4 {
		font-size: 1.25rem;
		margin-bottom: 0.5rem;
	}

	.marketing-footer p {
		color: #6b7280;
		margin-bottom: 2rem;
	}

	.btn-contact-outline {
		display: inline-block;
		padding: 0.8rem 2.5rem;
		border: 2px solid var(--border);
		border-radius: 9999px;
		color: var(--text);
		text-decoration: none;
		font-weight: 700;
		transition: all 0.2s;
	}

	.btn-contact-outline:hover {
		background: #f3f4f6;
		border-color: var(--text);
	}

	@media (max-width: 768px) {
		.marketing-container { padding: 0 1rem; }
		.plans-container { grid-template-columns: 1fr; }
		.trust-bar { gap: 1.5rem; justify-content: flex-start; }
	}

	.loading-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 4rem 1rem;
		text-align: center;
	}
	.spinner {
		width: 3rem;
		height: 3rem;
		border: 3px solid var(--border);
		border-bottom-color: var(--accent);
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin-bottom: 1rem;
	}
	@keyframes spin {
		to { transform: rotate(360deg); }
	}
	.loading-state p { color: #6b7280; font-weight: 500; }

	.error-state {
		background: #fef2f2;
		border-left: 4px solid #ef4444;
		padding: 1.5rem;
		border-radius: var(--radius-sm);
		margin-bottom: 2rem;
	}
	.error-content p { color: #b91c1c; font-weight: 600; }
	.btn-retry {
		background: none;
		border: none;
		color: #dc2626;
		text-decoration: underline;
		cursor: pointer;
		margin-top: 0.5rem;
	}

	.dashboard-content {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
		max-width: 900px;
		margin: 0 auto;
		padding-top: 2rem;
	}

	.dashboard-hero {
		background: var(--text);
		color: white;
		padding: 4rem 3rem;
		border-radius: var(--radius-lg);
		position: relative;
		overflow: hidden;
		box-shadow: var(--shadow-premium);
	}

	.dashboard-hero h1 {
		color: white;
		font-size: 1.25rem;
		opacity: 0.8;
		font-weight: 500;
		margin-bottom: 0.5rem;
	}

	.business-name-big {
		color: white;
		font-size: 3rem;
		font-weight: 900;
		letter-spacing: -0.03em;
		line-height: 1.1;
		margin-bottom: 1rem;
	}

	.category-tag {
		display: inline-block;
		background: rgba(255, 255, 255, 0.1);
		padding: 0.5rem 1.25rem;
		border-radius: 9999px;
		font-size: 0.85rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.card {
		background: var(--surface);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-premium);
		border: 1px solid var(--border);
		overflow: hidden;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.profile-card {
		border-color: var(--primary);
	}
	.profile-header {
		background: linear-gradient(135deg, #fffcf9 0%, #fff8f0 100%);
		padding: 2rem;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		border-bottom: 1px solid var(--border);
	}
	.profile-info h3 {
		font-size: 1.75rem;
		font-weight: 900;
		color: var(--text);
		margin-bottom: 0.4rem;
	}
	.profile-info p {
		color: var(--accent);
		font-weight: 700;
		text-transform: uppercase;
		font-size: 0.8rem;
		letter-spacing: 0.05em;
	}
	.premium-badge {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: var(--text);
		color: #facc15;
		padding: 0.5rem 1.25rem;
		border-radius: 9999px;
		font-size: 0.75rem;
		font-weight: 900;
		letter-spacing: 0.05em;
		box-shadow: 0 4px 12px rgba(0,0,0,0.1);
	}

	.status-banner {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 1.5rem;
		border-radius: var(--radius-md);
		margin: 2rem 2rem 0 2rem;
		background: var(--lightBg);
		font-weight: 700;
	}
	.status-banner.approved {
		background: #ecfdf5;
		color: #065f46;
		border: 1px solid #d1fae5;
	}
	.status-banner.pending {
		background: #fffbeb;
		color: #92400e;
		border: 1px solid #fef3c7;
	}
	.status-banner.rejected, .status-banner.expired {
		background: #fef2f2;
		color: #991b1b;
		border: 1px solid #fee2e2;
	}

	.status-message {
		margin: 1rem 2rem 2rem 2rem;
		padding: 1.25rem;
		border-radius: var(--radius-md);
		font-size: 0.95rem;
		line-height: 1.5;
	}
	.message-info {
		background: #eff6ff;
		border: 1px solid #dbeafe;
		color: #1e40af;
	}
	.message-error {
		background: #fff1f2;
		border: 1px solid #ffe4e6;
		color: #9f1239;
	}
	.btn-error {
		display: inline-block;
		margin-top: 1rem;
		background: #be123c;
		color: white;
		padding: 0.75rem 1.5rem;
		border-radius: 9999px;
		text-decoration: none;
		font-weight: 800;
		transition: all 0.2s;
	}
	.btn-error:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(190, 18, 60, 0.3);
	}

	.stats-section {
		padding: 2.5rem 2rem;
		border-top: 1px solid var(--border);
	}
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
		margin-top: 1.5rem;
	}
	.stat-card {
		background: var(--lightBg);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		transition: all 0.2s ease;
	}
	.stat-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 24px rgba(0,0,0,0.06);
		background: white;
		border-color: var(--primary);
	}
	.stat-icon-wrapper {
		width: 3.5rem;
		height: 3.5rem;
		background: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1rem;
		box-shadow: var(--shadow-premium);
	}
	.text-primary :global(.stat-icon) { color: var(--accent); }
	.text-green :global(.stat-icon) { color: #10b981; }
	.text-orange :global(.stat-icon) { color: var(--ctaSecondary); }
	
	:global(.stat-icon) {
		width: 1.75rem;
		height: 1.75rem;
	}

	.stat-value {
		font-size: 2rem;
		font-weight: 900;
		color: var(--text);
		margin-bottom: 0.2rem;
	}
	.stat-label {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--textColor);
		opacity: 0.6;
		font-weight: 800;
	}
	.stat-footer {
		text-align: center;
		margin-top: 2rem;
		font-size: 0.85rem;
		color: var(--textColor);
		opacity: 0.5;
		font-style: italic;
	}

	@media (max-width: 600px) {
		.stats-grid {
			grid-template-columns: 1fr;
		}
	}

	.actions-card {
		padding: 2.5rem 2rem;
	}
	.actions-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.25rem;
		margin-top: 1.5rem;
	}
	.action-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.5rem;
		background: white;
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		text-decoration: none;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}
	.action-item:hover {
		transform: translateY(-4px) scale(1.02);
		border-color: var(--primary);
		box-shadow: var(--shadow-hover);
	}
	.action-content {
		display: flex;
		align-items: center;
		gap: 1.25rem;
	}
	.action-icon-wrapper {
		width: 3rem;
		height: 3rem;
		background: var(--lightBg);
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s;
	}
	.action-item:hover .action-icon-wrapper {
		background: var(--text);
		color: white;
	}

	.icon-edit { color: var(--accent); }
	.icon-offer { color: #10b981; }
	.icon-photo { color: #3b82f6; }
	.icon-preview { color: var(--cta); }
	
	:global(.action-icon) {
		width: 1.5rem;
		height: 1.5rem;
	}

	.action-text h4 {
		font-size: 1.1rem;
		font-weight: 800;
		color: var(--text);
		margin-bottom: 0.1rem;
	}
	.action-text p {
		font-size: 0.85rem;
		color: var(--textColor);
		opacity: 0.6;
	}
	.offer-active {
		color: #10b981;
		font-weight: 800;
	}
	
	.preview-item {
		background: linear-gradient(135deg, #fffcf9 0%, #fff8f0 100%);
		border-color: var(--primary);
	}

	.support-card {
		padding: 2.5rem 2rem;
		text-align: center;
		background: var(--text);
		color: white;
		border: none;
	}
	.support-card h3 { color: white; justify-content: center; }
	.support-card p {
		font-size: 1rem;
		opacity: 0.8;
		margin-bottom: 2rem;
		max-width: 500px;
		margin-left: auto;
		margin-right: auto;
	}
	.btn-support {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 1rem 2.5rem;
		background: var(--primary);
		color: var(--text);
		border-radius: 9999px;
		font-weight: 900;
		text-decoration: none;
		transition: all 0.2s;
		border: none;
		width: auto;
	}
	.btn-support:hover {
		transform: scale(1.05);
		box-shadow: 0 10px 20px rgba(255, 183, 158, 0.4);
		background: white;
	}
</style>
