<script>
	import { onMount, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import { auth, db } from '$lib/firebase';
	import { collection, query, where, orderBy, onSnapshot, getDocs } from 'firebase/firestore';
	import { onAuthStateChanged } from 'firebase/auth';

	import AppsIcon from '$lib/components/icons/AppsIcon.svelte';
	import RestaurantIcon from '$lib/components/icons/RestaurantIcon.svelte';
	import ConstructIcon from '$lib/components/icons/ConstructIcon.svelte';
	import StorefrontIcon from '$lib/components/icons/StorefrontIcon.svelte';
	import FitnessIcon from '$lib/components/icons/FitnessIcon.svelte';
	import CarIcon from '$lib/components/icons/CarIcon.svelte';
	import BriefcaseIcon from '$lib/components/icons/BriefcaseIcon.svelte';
	import StarIcon from '$lib/components/icons/StarIcon.svelte';
	import GiftIcon from '$lib/components/icons/GiftIcon.svelte';
	import ChevronRightIcon from '$lib/components/icons/ChevronRightIcon.svelte';
	import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
	import BusinessOutlineIcon from '$lib/components/icons/BusinessOutlineIcon.svelte';

	let sponsors = [];
	let loading = true;
	let selectedSector = 'all';
	let userHasSponsor = false;
	let authUnsubscribe;
	let sponsorsUnsubscribe;

	const sectors = [
		{ id: 'all', label: 'Tous', icon: AppsIcon },
		{ id: 'food', label: 'Restauration', icon: RestaurantIcon },
		{ id: 'services', label: 'Services', icon: ConstructIcon },
		{ id: 'retail', label: 'Commerces', icon: StorefrontIcon },
		{ id: 'wellness', label: 'Bien-être', icon: FitnessIcon },
		{ id: 'auto', label: 'Auto', icon: CarIcon },
		{ id: 'professional', label: 'Pro', icon: BriefcaseIcon }
	];

	onMount(() => {
		const q = query(
			collection(db, 'Sponsors'),
			where('status', '==', 'approved'),
			where('currentPlan.isActive', '==', true),
			orderBy('currentPlan.type', 'desc')
		);

		sponsorsUnsubscribe = onSnapshot(
			q,
			(snapshot) => {
				sponsors = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
				loading = false;
			},
			(error) => {
				console.error('Error fetching sponsors:', error);
				loading = false;
			}
		);

		authUnsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				try {
					const sq = query(collection(db, 'Sponsors'), where('userId', '==', user.uid));
					const snapshot = await getDocs(sq);
					userHasSponsor = !snapshot.empty;
				} catch (error) {
					userHasSponsor = false;
				}
			} else {
				userHasSponsor = false;
			}
		});
	});

	onDestroy(() => {
		if (sponsorsUnsubscribe) sponsorsUnsubscribe();
		if (authUnsubscribe) authUnsubscribe();
	});

	$: filteredSponsors =
		selectedSector === 'all' ? sponsors : sponsors.filter((s) => s.sector === selectedSector);

	function handleCommerceButton() {
		if (userHasSponsor) {
			window.location.href = '/espace-commercant';
		} else {
			window.location.href = '/espace-commercant/rejoindre';
		}
	}
</script>

<svelte:head>
	<title>Le Carnet (Offres locales) - Le Poilu</title>
</svelte:head>

<div class="carnet-page">
	<!-- Header Area Premium -->
	<header class="carnet-header">
		<div class="header-bg-glow"></div>

		<div class="carnet-header-container">
			<div class="header-flex">
				<div class="header-titles">
					<a href="/" class="btn-back" aria-label="Retour à l'accueil">
						<div class="icon-rotate">
							<ChevronRightIcon />
						</div>
					</a>

					<div>
						<h1 class="header-title">
							La Grotte du Poilu
							<span class="badge-annuaire">Annuaire</span>
						</h1>
						<p class="header-subtitle">DÉCOUVREZ VOS COMMERCES & OFFRES LOCALES</p>
					</div>
				</div>

				<div class="header-icon-desktop">
					<div class="icon-circle">
						<StorefrontIcon />
					</div>
				</div>
			</div>
		</div>
	</header>

	<!-- Categories Filter (Horizontal Scroll) -->
	<div class="filter-bar">
		<div class="filter-container">
			<div class="filter-scroll">
				{#each sectors as sector}
					<button
						on:click={() => (selectedSector = sector.id)}
						class="filter-btn {selectedSector === sector.id ? 'active' : ''}"
					>
						<span class="filter-icon"><svelte:component this={sector.icon} /></span>
						<span class="filter-label">{sector.label}</span>
					</button>
				{/each}
			</div>
		</div>
	</div>

	<!-- Main Content List -->
	<main class="carnet-main">
		{#if loading}
			<div class="loading-state">
				<div class="spinner"></div>
				<p>Recherche de pépites locales...</p>
			</div>
		{:else if filteredSponsors.length === 0}
			<div class="empty-state" in:fade>
				<div class="empty-icon">
					<SearchIcon />
				</div>
				<h3>Aucune adresse trouvée</h3>
				<p>Il n'y a pas encore de commerçant dans cette catégorie.</p>
			</div>
		{:else}
			<div class="sponsors-grid" in:fade>
				{#each filteredSponsors as sponsor (sponsor.id)}
					{@const isPremium = sponsor.currentPlan?.type === 'premium'}
					{@const hasOffer = sponsor.specialOffer && sponsor.specialOffer.isActive}

					<a href={`/carnet/${sponsor.id}`} class="sponsor-card">
						<!-- Image Container -->
						<div class="card-image-box">
							{#if isPremium}
								<div class="badge-premium">
									<div class="icon-small"><StarIcon /></div>
									Premium
								</div>
							{/if}

							{#if hasOffer}
								<div class="badge-offer">
									<div class="icon-small"><GiftIcon /></div>
									OFFRE INCLUSE
								</div>
							{/if}

							{#if sponsor.images && sponsor.images.length > 0}
								<img
									src={sponsor.images[0]}
									alt={`Vue de ${sponsor.businessName}`}
									class="card-img"
									loading="lazy"
								/>
								<div class="img-gradient-overlay"></div>
							{:else}
								<div class="card-no-img">
									<div class="icon-large"><BusinessOutlineIcon /></div>
								</div>
							{/if}
						</div>

						<!-- Card Body -->
						<div class="card-body">
							<div class="card-content">
								<span class="card-category">
									{sponsor.category || 'Non classé'}
								</span>
								<h2 class="card-title">
									{sponsor.businessName}
								</h2>
								<div class="card-location">
									<div class="icon-tiny"><AppsIcon /></div>
									{sponsor.city} <span class="dot">•</span>
									{sponsor.postalCode}
								</div>
							</div>

							<div class="card-action">
								<span class="action-text">Voir la fiche</span>
								<div class="action-btn">
									<div class="icon-chevron"><ChevronRightIcon /></div>
								</div>
							</div>
						</div>

						<!-- Card Footer (Offer Snippet) -->
						{#if hasOffer}
							<div class="card-offer-footer">
								<div class="offer-icon-box">
									<div class="icon-small"><GiftIcon /></div>
								</div>
								<p class="offer-text truncate">
									{sponsor.specialOffer.title}
								</p>
							</div>
						{/if}
					</a>
				{/each}
			</div>
		{/if}
	</main>

	<!-- Floating Action Button for Merchants -->
	<div class="floating-cta-container">
		<button on:click={handleCommerceButton} class="floating-cta-btn">
			<div class="cta-icon"><StorefrontIcon /></div>
			<span class="cta-text">{userHasSponsor ? 'Mon Espace' : 'Espace Pro'}</span>
		</button>
	</div>
</div>

<style>
	/* Layout Base */
	.carnet-page {
		min-height: 100vh;
		background-color: var(--lightBg);
		display: flex;
		flex-direction: column;
		position: relative;
	}

	/* Header */
	.carnet-header {
		background-color: var(--background);
		border-bottom: 1px solid var(--borderColor);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
		position: sticky;
		top: 0;
		z-index: 10;
		overflow: hidden;
	}

	.header-bg-glow {
		position: absolute;
		top: -50px;
		right: -50px;
		width: 250px;
		height: 250px;
		border-radius: 50%;
		background-color: rgba(255, 183, 158, 0.15); /* var(--primary) with opacity */
		filter: blur(40px);
		pointer-events: none;
	}

	.carnet-header-container {
		max-width: var(--desktop);
		margin: 0 auto;
		padding: var(--spacing-md) var(--spacing-sm);
		position: relative;
	}

	.header-flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.header-titles {
		display: flex;
		align-items: center;
		gap: 20px;
	}

	.btn-back {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: var(--lightBg);
		border: 1px solid var(--borderColor);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text);
		text-decoration: none;
		transition: background-color var(--transition-fast);
		flex-shrink: 0;
	}

	.btn-back:hover {
		background-color: #eaeaea;
	}

	.icon-rotate {
		width: 20px;
		height: 20px;
		transform: rotate(180deg);
		display: flex;
	}

	.icon-rotate :global(svg) {
		width: 20px;
		height: 20px;
	}

	.header-title {
		font-family: var(--FFTitle);
		font-size: clamp(1.5rem, 4vw, 2.2rem);
		font-weight: 800;
		color: var(--textDark);
		display: flex;
		align-items: center;
		gap: 10px;
		flex-wrap: wrap;
	}

	.badge-annuaire {
		display: inline-flex;
		background-color: rgba(255, 183, 158, 0.15);
		color: var(--accent);
		font-size: 0.65rem;
		text-transform: uppercase;
		font-weight: 700;
		padding: 2px 8px;
		border-radius: 4px;
	}

	.header-subtitle {
		font-size: 0.85rem;
		color: #666;
		font-weight: 500;
		letter-spacing: 0.05em;
		margin-top: 5px;
	}

	.header-icon-desktop {
		display: none;
	}

	.icon-circle {
		width: 48px;
		height: 48px;
		background-color: rgba(255, 183, 158, 0.15);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--primary);
	}

	.icon-circle > :global(svg) {
		width: 24px;
		height: 24px;
	}

	@media (min-width: 768px) {
		.header-icon-desktop {
			display: block;
		}
	}

	/* Filter Bar */
	.filter-bar {
		background-color: var(--background);
		border-bottom: 1px solid var(--borderColor);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
		position: relative;
		z-index: 0;
	}

	.filter-container {
		max-width: var(--desktop);
		margin: 0 auto;
		padding: 0 var(--spacing-sm);
	}

	.filter-scroll {
		display: flex;
		overflow-x: auto;
		padding: 15px 0 20px 0;
		gap: 12px;
		scrollbar-width: none; /* Firefox */
		-ms-overflow-style: none; /* IE and Edge */
	}

	.filter-scroll::-webkit-scrollbar {
		display: none; /* Chrome, Safari and Opera */
	}

	.filter-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		white-space: nowrap;
		padding: 10px 20px;
		border-radius: 50px;
		border: 1px solid #e5e7eb;
		background-color: var(--background);
		color: #4b5563;
		cursor: pointer;
		transition: all var(--transition-normal);
		flex-shrink: 0;
		font-family: var(--FFBody);
	}

	.filter-btn:hover {
		border-color: rgba(255, 183, 158, 0.5);
		background-color: rgba(255, 183, 158, 0.05);
		color: var(--primary);
	}

	.filter-btn.active {
		background-color: var(--primary);
		border-color: var(--primary);
		color: white;
		box-shadow: 0 4px 6px -1px rgba(255, 183, 158, 0.4);
		transform: scale(1.05);
	}

	.filter-icon {
		width: 16px;
		height: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.filter-icon :global(svg) {
		width: 16px;
		height: 16px;
	}

	.filter-label {
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 0.025em;
	}

	/* Main Area */
	.carnet-main {
		flex: 1;
		max-width: var(--desktop);
		width: 100%;
		margin: 0 auto;
		padding: var(--spacing-lg) var(--spacing-sm) 120px var(--spacing-sm);
	}

	.loading-state,
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 80px 20px;
		text-align: center;
	}

	.spinner {
		border: 3px solid #f3f3f3;
		border-top: 3px solid var(--primary);
		border-radius: 50%;
		width: 40px;
		height: 40px;
		animation: spin 1s linear infinite;
		margin-bottom: 20px;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.empty-icon {
		background-color: #f3f4f6;
		padding: 24px;
		border-radius: 50%;
		margin-bottom: 24px;
		color: #9ca3af;
		width: 80px;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.empty-icon :global(svg) {
		width: 48px;
		height: 48px;
	}

	.empty-state h3 {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--textDark);
		margin-bottom: 8px;
	}

	.empty-state p {
		color: #6b7280;
		max-width: 300px;
	}

	/* Grid & Cards */
	.sponsors-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 24px;
	}

	@media (min-width: 640px) {
		.sponsors-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (min-width: 1024px) {
		.sponsors-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	@media (min-width: 1280px) {
		.sponsors-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.sponsor-card {
		display: flex;
		flex-direction: column;
		background-color: var(--background);
		border-radius: var(--radius-lg);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		transition: all var(--transition-normal);
		border: 1px solid #f3f4f6;
		overflow: hidden;
		text-decoration: none;
		height: 100%;
	}

	.sponsor-card:hover {
		box-shadow: var(--shadow);
		border-color: rgba(255, 183, 158, 0.3);
		transform: translateY(-5px);
	}

	.card-image-box {
		height: 190px;
		background-color: #f3f4f6;
		position: relative;
		overflow: hidden;
		flex-shrink: 0;
	}

	.badge-premium {
		position: absolute;
		top: 12px;
		left: 12px;
		background-color: rgba(17, 24, 39, 0.9);
		backdrop-filter: blur(4px);
		color: #facc15;
		font-weight: 700;
		font-size: 0.625rem;
		padding: 6px 10px;
		border-radius: 6px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		display: flex;
		align-items: center;
		gap: 6px;
		z-index: 2;
		border: 1px solid rgba(250, 204, 21, 0.2);
	}

	.badge-offer {
		position: absolute;
		bottom: 12px;
		right: 12px;
		background-color: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(8px);
		color: var(--primary);
		font-weight: 800;
		font-size: 0.625rem;
		padding: 8px 12px;
		border-radius: 8px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		display: flex;
		align-items: center;
		gap: 6px;
		z-index: 2;
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
		transition: transform var(--transition-normal);
	}

	.sponsor-card:hover .badge-offer {
		transform: scale(1.05);
	}

	.icon-small {
		width: 14px;
		height: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.icon-small :global(svg) {
		width: 14px;
		height: 14px;
	}
	.badge-premium .icon-small :global(svg) {
		fill: #facc15;
	}

	.card-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.7s ease;
	}

	.sponsor-card:hover .card-img {
		transform: scale(1.1);
	}

	.img-gradient-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent 50%);
		opacity: 0.6;
		pointer-events: none;
	}

	.card-no-img {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #f9fafb;
		border-bottom: 1px solid #f3f4f6;
	}

	.icon-large {
		width: 64px;
		height: 64px;
		color: #e5e7eb;
	}
	.icon-large :global(svg) {
		width: 64px;
		height: 64px;
	}

	.card-body {
		padding: 24px;
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.card-content {
		flex: 1;
	}

	.card-category {
		display: inline-block;
		padding: 4px 10px;
		background-color: rgba(255, 183, 158, 0.1);
		color: var(--accent);
		font-size: 0.625rem;
		font-weight: 700;
		border-radius: 50px;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: 12px;
	}

	.card-title {
		font-size: 1.25rem;
		font-weight: 800;
		color: var(--textDark);
		margin-bottom: 8px;
		line-height: 1.2;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		transition: color var(--transition-normal);
	}

	.sponsor-card:hover .card-title {
		color: var(--primary);
	}

	.card-location {
		font-size: 0.875rem;
		color: #6b7280;
		display: flex;
		align-items: center;
		gap: 6px;
		margin-bottom: 16px;
	}

	.icon-tiny {
		width: 16px;
		height: 16px;
		opacity: 0.5;
	}
	.icon-tiny :global(svg) {
		width: 16px;
		height: 16px;
	}

	.dot {
		color: #d1d5db;
		margin: 0 4px;
	}

	.card-action {
		padding-top: 16px;
		border-top: 1px solid #f3f4f6;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: auto;
	}

	.action-text {
		font-size: 0.875rem;
		font-weight: 600;
		color: #9ca3af;
		transition: color var(--transition-normal);
	}

	.sponsor-card:hover .action-text {
		color: #374151;
	}

	.action-btn {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background-color: #f9fafb;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
	}

	.sponsor-card:hover .action-btn {
		background-color: var(--primary);
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	}

	.icon-chevron {
		width: 16px;
		height: 16px;
		color: #9ca3af;
		transition: color var(--transition-normal);
		transform: translateX(1px);
	}

	.sponsor-card:hover .icon-chevron {
		color: white;
	}

	.card-offer-footer {
		background: linear-gradient(to right, #f0fdf4, #ecfdf5);
		border-top: 1px solid rgba(209, 250, 229, 0.5);
		padding: 14px 24px;
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.offer-icon-box {
		background-color: #d1fae5;
		padding: 6px;
		border-radius: 6px;
		color: #059669;
		flex-shrink: 0;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	}

	.offer-text {
		font-size: 0.875rem;
		font-weight: 700;
		color: #065f46;
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.truncate {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* Floating CTA */
	.floating-cta-container {
		position: fixed;
		bottom: 32px;
		left: 0;
		right: 0;
		z-index: 20;
		pointer-events: none;
		display: flex;
		justify-content: center;
	}

	.floating-cta-btn {
		pointer-events: auto;
		box-shadow:
			0 20px 25px -5px rgba(0, 0, 0, 0.1),
			0 10px 10px -5px rgba(0, 0, 0, 0.04);
		background-color: #111827;
		color: white;
		padding: 14px 24px;
		border-radius: 50px;
		display: flex;
		align-items: center;
		gap: 10px;
		transition: all var(--transition-normal);
		border: none;
		cursor: pointer;
	}

	.floating-cta-btn:hover {
		background-color: #000000;
		transform: scale(1.05);
	}

	.floating-cta-btn:active {
		transform: scale(0.95);
	}

	.cta-icon {
		width: 20px;
		height: 20px;
		color: rgba(255, 255, 255, 0.8);
		transition: color var(--transition-normal);
	}

	.cta-icon :global(svg) {
		width: 20px;
		height: 20px;
	}

	.floating-cta-btn:hover .cta-icon {
		color: white;
	}

	.cta-text {
		font-weight: 700;
		letter-spacing: 0.025em;
	}
</style>
