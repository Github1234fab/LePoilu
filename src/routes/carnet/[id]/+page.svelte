<script>
	import { page } from '$app/stores';
	import { onMount, onDestroy } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { db, auth } from '$lib/firebase';
	import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
	import { onAuthStateChanged } from 'firebase/auth';
	import { getFavoriteSponsors } from '$lib/favorites';
	import FavoriteHeart from '$lib/Components/FavoriteHeart.svelte';

	import ChevronRightIcon from '$lib/Components/icons/ChevronRightIcon.svelte';
	import StarIcon from '$lib/Components/icons/StarIcon.svelte';
	import GiftIcon from '$lib/Components/icons/GiftIcon.svelte';
	import CheckCircleIcon from '$lib/Components/icons/CheckCircleIcon.svelte';
	import LocationOutlineIcon from '$lib/Components/icons/LocationOutlineIcon.svelte';
	import LocationIcon from '$lib/Components/icons/LocationIcon.svelte';
	import TimeOutlineIcon from '$lib/Components/icons/TimeOutlineIcon.svelte';
	import MapOutlineIcon from '$lib/Components/icons/MapOutlineIcon.svelte';
	import CallIcon from '$lib/Components/icons/CallIcon.svelte';
	import NavigateIcon from '$lib/Components/icons/NavigateIcon.svelte';
	import MailIcon from '$lib/Components/icons/MailIcon.svelte';
	import GlobeOutlineIcon from '$lib/Components/icons/GlobeOutlineIcon.svelte';
	import ImageOutlineIcon from '$lib/Components/icons/ImageOutlineIcon.svelte';
	import LogoFacebookIcon from '$lib/Components/icons/LogoFacebookIcon.svelte';
	import LogoInstagramIcon from '$lib/Components/icons/LogoInstagramIcon.svelte';
	import AppsIcon from '$lib/Components/icons/AppsIcon.svelte';
	import InformationCircleIcon from '$lib/Components/icons/InformationCircleIcon.svelte';

	let sponsorId = $page.params.id;
	let sponsor = null;
	let loading = true;
	let offerShown = false;
	let favoriteSponsors = [];
	let user = null;

	// Lightbox state
	let lightboxImage = null;

	onMount(async () => {
		try {
			const docRef = doc(db, 'Sponsors', sponsorId);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				sponsor = { id: docSnap.id, ...docSnap.data() };

				// Increment views
				updateDoc(docRef, {
					'stats.views': increment(1),
					'stats.lastViewDate': new Date()
				}).catch((err) => console.error('Could not increment views:', err));
			} else {
				window.location.href = '/carnet';
			}

			// Listen for auth to get favorites
			onAuthStateChanged(auth, async (u) => {
				user = u;
				if (user) {
					favoriteSponsors = await getFavoriteSponsors(user.uid);
				} else {
					favoriteSponsors = [];
				}
			});
		} catch (error) {
			console.error('Error fetching sponsor details:', error);
		} finally {
			loading = false;
		}
	});

	$: isPremium = sponsor?.currentPlan?.type === 'premium';
	$: hasOffer = sponsor?.specialOffer?.isActive;

	async function trackClick() {
		if (!sponsor) return;
		try {
			await updateDoc(doc(db, 'Sponsors', sponsor.id), {
				'stats.clicks': increment(1)
			});
		} catch (error) {
			console.error('Error tracking click:', error);
		}
	}

	async function showOffer() {
		if (offerShown) return;
		offerShown = true;

		try {
			await updateDoc(doc(db, 'Sponsors', sponsor.id), {
				'stats.offersShown': increment(1)
			});
		} catch (error) {
			console.error('Error tracking offer shown:', error);
		}
	}
</script>

<svelte:head>
	<title>{sponsor ? sponsor.businessName : 'Chargement...'} - Le Poilu</title>
</svelte:head>

<div class="vitrine-container">
	{#if loading}
		<div class="loading-full">
			<div class="spinner-large"></div>
			<p>Chargement de l'univers de {sponsor?.businessName || 'ton commerce'}...</p>
		</div>
	{:else if sponsor}
		<!-- Floating Back & Share -->
		<nav class="vitrine-nav">
			<a href="/carnet" class="nav-round-btn" aria-label="Retour au carnet">
				<ChevronRightIcon />
			</a>
			
			<div class="nav-actions">
				<FavoriteHeart 
					sponsorId={sponsorId} 
					isFavorite={favoriteSponsors.includes(sponsorId)} 
				/>
			</div>
		</nav>

		<!-- Hero Section -->
		<section class="vitrine-hero">
			{#if isPremium && sponsor.images && sponsor.images.length > 0}
				<div class="hero-image-wrapper">
					<img
						src={sponsor.images[0]}
						alt={sponsor.businessName}
						class="hero-parallax"
					/>
					<div class="hero-overlay-gradient"></div>
				</div>
			{:else}
				<div class="hero-image-wrapper">
					<img
						src="/Poilu-village.png"
						alt="Le Poilu"
						class="hero-parallax"
					/>
					<div class="hero-overlay-gradient"></div>
				</div>
			{/if}

			<!-- Floating Brand Card -->
			<div class="brand-card-container">
				<div class="brand-card" in:fade={{ delay: 200 }}>
					<span class="brand-category">{sponsor.category || 'Commerce Local'}</span>
					<h1 class="brand-name">{sponsor.businessName}</h1>
					<div class="brand-meta">
						<div class="meta-item">
							<LocationIcon />
							<span>{sponsor.city}</span>
						</div>
						{#if isPremium}
							<div class="premium-shield" title="Membre vérifié">
								<StarIcon />
								<span>PRO VÉRIFIÉ</span>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</section>

		<main class="vitrine-content">
			{#if sponsor.isModel}
				<div class="demo-banner" in:slide>
					<InformationCircleIcon />
					<p>Ceci est un modèle de démonstration pour ton futur espace.</p>
				</div>
			{/if}

			<!-- Special Offer Spotlight -->
			{#if isPremium && hasOffer}
				<section class="offer-spotlight" in:fade={{ delay: 400 }}>
					<div class="offer-card-premium {offerShown ? 'is-active' : ''}">
						<div class="offer-card-inner">
							<div class="offer-badge-ribbon">BON PLAN</div>
							<div class="offer-main">
								<div class="gift-icon-container">
									<GiftIcon />
								</div>
								<div class="offer-text">
									<h2 class="offer-title">{sponsor.specialOffer.title}</h2>
									<p class="offer-description">{sponsor.specialOffer.description}</p>
								</div>
							</div>
							
							{#if sponsor.specialOffer.conditions}
								<p class="offer-footer-terms">*{sponsor.specialOffer.conditions}</p>
							{/if}

							<button 
								on:click={showOffer} 
								class="btn-activate-offer"
								disabled={offerShown}
							>
								{#if offerShown}
									<CheckCircleIcon />
									<span>OFFRE ACTIVÉE</span>
								{:else}
									<span>DÉCOUVRIR L'OFFRE</span>
								{/if}
							</button>

							{#if offerShown}
								<p class="activation-hint">Montrez cet écran au commerçant pour valider l'offre.</p>
							{/if}
						</div>
					</div>
				</section>
			{/if}

			<!-- Story Section -->
			{#if isPremium && sponsor.description}
				<section class="story-section">
					<div class="section-header-pro">
						<span class="section-subtitle">À propos</span>
						<h2 class="section-title-pro">Notre Histoire</h2>
					</div>
					<div class="story-text-container">
						<p class="story-text">{sponsor.description}</p>
					</div>
				</section>
			{/if}

			<!-- Visual Portfolio -->
			{#if isPremium && sponsor.images && sponsor.images.length > 1}
				<section class="portfolio-section">
					<div class="section-header-pro">
						<span class="section-subtitle">Galerie</span>
						<h2 class="section-title-pro">En images</h2>
					</div>
					<div class="portfolio-grid">
						{#each sponsor.images.slice(1) as img, index}
							<button 
								class="portfolio-item-btn" 
								on:click={() => (lightboxImage = img)}
							>
								<img src={img} alt="Galerie" loading="lazy" />
								<div class="item-overlay">
									<div class="zoom-icon"><ImageOutlineIcon /></div>
								</div>
							</button>
						{/each}
					</div>
				</section>
			{/if}

			<!-- Info & Access -->
			<div class="access-grid">
				<!-- Practical Info -->
				<section class="info-card-pro">
					<div class="info-card-icon map"><LocationOutlineIcon /></div>
					<h3>Coordonnées</h3>
					<div class="info-card-links">
						<a
							href={`https://maps.google.com/?q=${encodeURIComponent(sponsor.address + ', ' + sponsor.postalCode + ' ' + sponsor.city)}`}
							target="_blank"
							on:click={trackClick}
							class="access-row"
						>
							<div class="access-details">
								<p class="access-label">Adresse</p>
								<p class="access-value">{sponsor.address}, {sponsor.postalCode} {sponsor.city}</p>
							</div>
							<ChevronRightIcon class="row-arrow" />
						</a>

						{#if isPremium && sponsor.website}
							<a
								href={sponsor.website.startsWith('http') ? sponsor.website : `https://${sponsor.website}`}
								target="_blank"
								on:click={trackClick}
								class="access-row"
							>
								<div class="access-details">
									<p class="access-label">Site Web</p>
									<p class="access-value truncate">{sponsor.website.replace(/^https?:\/\//, '')}</p>
								</div>
								<GlobeOutlineIcon class="row-icon-social" />
							</a>
						{/if}

						{#if isPremium && sponsor.email}
							<a href={`mailto:${sponsor.email}`} class="access-row">
								<div class="access-details">
									<p class="access-label">Email</p>
									<p class="access-value">{sponsor.email}</p>
								</div>
								<MailIcon class="row-icon-social" />
							</a>
						{/if}
					</div>
				</section>

				<!-- Hours & Social -->
				<div class="secondary-info-stack">
					{#if isPremium && sponsor.openingHours}
						<section class="info-card-pro">
							<div class="info-card-icon time"><TimeOutlineIcon /></div>
							<h3>Horaires</h3>
							<div class="hours-display">
								<p class="hours-content">{sponsor.openingHours}</p>
							</div>
						</section>
					{/if}

					{#if isPremium && sponsor.socialMedia && (sponsor.socialMedia.facebook || sponsor.socialMedia.instagram)}
						<section class="social-connect">
							{#if sponsor.socialMedia.facebook}
								<a href={sponsor.socialMedia.facebook} target="_blank" class="social-pill fb">
									<LogoFacebookIcon />
									<span>Facebook</span>
								</a>
							{/if}
							{#if sponsor.socialMedia.instagram}
								<a href={sponsor.socialMedia.instagram} target="_blank" class="social-pill ig">
									<LogoInstagramIcon />
									<span>Instagram</span>
								</a>
							{/if}
						</section>
					{/if}
				</div>
			</div>
		</main>

		<!-- Sticky Conversion Bar -->
		<div class="sticky-cta-bar">
			<div class="cta-inner">
				{#if isPremium && sponsor.phone}
					<a href={`tel:${sponsor.phone}`} on:click={trackClick} class="btn-cta-primary">
						<CallIcon />
						<span>Appeler</span>
					</a>
				{/if}
				<a
					href={`https://maps.google.com/?q=${encodeURIComponent(sponsor.address + ', ' + sponsor.postalCode + ' ' + sponsor.city)}`}
					target="_blank"
					on:click={trackClick}
					class="btn-cta-secondary"
				>
					<NavigateIcon />
					<span>Y aller</span>
				</a>
			</div>
		</div>

		<!-- Lightbox -->
		{#if lightboxImage}
			<div class="vitrine-lightbox" in:fade out:fade>
				<button class="lightbox-close-btn" on:click={() => (lightboxImage = null)}>
					<ChevronRightIcon class="close-icon" />
				</button>
				<div class="lightbox-content">
					<img src={lightboxImage} alt="Fullscreen" />
				</div>
			</div>
		{/if}
	{/if}
</div>

<style>
	.vitrine-container {
		min-height: 100vh;
		background: #fdfcfb;
		color: var(--text);
		font-family: 'Poppins', sans-serif;
		padding-bottom: 100px;
	}

	/* Loading & State */
	.loading-full {
		position: fixed;
		inset: 0;
		background: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.spinner-large {
		width: 50px;
		height: 50px;
		border: 4px solid #f3f3f3;
		border-top: 4px solid var(--cta);
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin-bottom: 1.5rem;
	}
	@keyframes spin { 100% { transform: rotate(360deg); } }

	/* Navigation */
	.vitrine-nav {
		position: absolute;
		top: 1.5rem;
		left: 1.5rem;
		right: 1.5rem;
		z-index: 100;
		display: flex;
		justify-content: space-between;
		pointer-events: none;
	}

	.nav-round-btn {
		width: 48px;
		height: 48px;
		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(10px);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		text-decoration: none;
		pointer-events: auto;
		transition: all 0.2s;
	}

	.nav-round-btn:hover { background: rgba(0, 0, 0, 0.5); transform: scale(1.1); }
	:global(.nav-round-btn svg) { transform: rotate(180deg); width: 24px; height: 24px; }

	.nav-actions {
		pointer-events: auto;
	}

	/* Hero */
	.vitrine-hero {
		height: 60vh;
		position: relative;
		overflow: hidden;
		background: #1a1a1a;
	}

	.hero-image-wrapper { width: 100%; height: 100%; position: relative; }
	.hero-parallax { width: 100%; height: 100%; object-fit: cover; }
	.hero-overlay-gradient {
		position: absolute;
		inset: 0;
		background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%);
	}

	/* .hero-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba(255,255,255,0.2);
	} */
	:global(.hero-placeholder svg) { width: 4rem; height: 4rem; }

	/* Brand Card */
	.brand-card-container {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 0 1.5rem;
		transform: translateY(30%);
		z-index: 10;
	}

	.brand-card {
		max-width: 800px;
		margin: 0 auto;
		background: white;
		padding: 2.5rem;
		border-radius: 32px;
		box-shadow: 0 20px 40px rgba(0,0,0,0.08);
		text-align: center;
		border: 1px solid rgba(255,255,255,0.8);
	}

	.brand-category {
		display: inline-block;
		font-size: 0.75rem;
		font-weight: 900;
		color: var(--cta);
		text-transform: uppercase;
		letter-spacing: 0.15em;
		background: #fff5f2;
		padding: 0.5rem 1.25rem;
		border-radius: 50px;
		margin-bottom: 1rem;
	}

	.brand-name {
		font-size: 2.75rem;
		font-weight: 900;
		color: var(--text);
		margin: 0 0 1rem;
		line-height: 1.1;
	}

	.brand-meta {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--secondary);
		font-weight: 600;
		font-size: 0.95rem;
	}
	:global(.meta-item svg) { width: 1.1rem; height: 1.1rem; color: var(--cta); }

	.premium-shield {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		background: #fdf2f2;
		color: #be123c;
		padding: 0.4rem 0.8rem;
		border-radius: 12px;
		font-size: 0.75rem;
		font-weight: 800;
	}
	:global(.premium-shield svg) { width: 0.9rem; height: 0.9rem; }

	/* Main Content */
	.vitrine-content {
		max-width: 1000px;
		margin: 8rem auto 0;
		padding: 0 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 5rem;
	}

	.demo-banner {
		background: #eff6ff;
		color: #1e40af;
		padding: 1rem 1.5rem;
		border-radius: 16px;
		display: flex;
		align-items: center;
		gap: 1rem;
		font-weight: 600;
		font-size: 0.9rem;
	}
	:global(.demo-banner svg) { width: 1.5rem; height: 1.5rem; flex-shrink: 0; }

	/* Offer Spotlight */
	.offer-spotlight { width: 100%; }

	.offer-card-premium {
		background: linear-gradient(135deg, #db2777 0%, #9d174d 100%);
		padding: 4px;
		border-radius: 32px;
		box-shadow: 0 25px 50px -12px rgba(219, 39, 119, 0.4);
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
	}

	.offer-card-premium::before {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at top right, rgba(255,255,255,0.2), transparent);
		pointer-events: none;
	}

	.offer-card-inner {
		background: #fff1f2;
		border-radius: 28px;
		padding: 2.5rem;
		position: relative;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.offer-badge-ribbon {
		position: absolute;
		top: 1.5rem;
		right: -2rem;
		background: #db2777;
		color: white;
		padding: 0.5rem 3rem;
		font-weight: 900;
		font-size: 0.75rem;
		transform: rotate(45deg);
		letter-spacing: 0.1em;
	}

	.offer-main {
		display: flex;
		gap: 2rem;
		align-items: center;
		margin-bottom: 2rem;
		width: 100%;
		text-align: left;
	}

	.gift-icon-container {
		width: 80px;
		height: 80px;
		background: white;
		border-radius: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #db2777;
		box-shadow: 0 10px 20px rgba(0,0,0,0.05);
		flex-shrink: 0;
	}
	:global(.gift-icon-container svg) { width: 2.5rem; height: 2.5rem; }

	.offer-text { flex: 1; }
	.offer-title { font-size: 1.75rem; font-weight: 900; color: #831843; margin: 0 0 0.5rem; }
	.offer-description { font-size: 1.1rem; color: #9d174d; line-height: 1.5; margin: 0; }

	.offer-footer-terms { font-size: 0.8rem; color: #9d174d; opacity: 0.6; font-style: italic; margin-bottom: 2rem; width: 100%; text-align: left; }

	.btn-activate-offer {
		width: 100%;
		background: #db2777;
		color: white;
		border: none;
		padding: 1.25rem;
		border-radius: 18px;
		font-size: 1.1rem;
		font-weight: 800;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		transition: all 0.2s;
	}
	.btn-activate-offer:hover:not(:disabled) { background: #be123c; transform: scale(1.02); }
	.btn-activate-offer:disabled { background: #10b981; cursor: default; }

	.activation-hint { margin-top: 1rem; color: #10b981; font-weight: 700; font-size: 0.9rem; }

	/* Section Commons */
	.section-header-pro { margin-bottom: 2.5rem; }
	.section-subtitle { font-size: 0.75rem; font-weight: 900; color: var(--cta); text-transform: uppercase; letter-spacing: 0.2em; display: block; margin-bottom: 0.5rem; }
	.section-title-pro { font-size: 2.25rem; font-weight: 900; color: var(--text); margin: 0; font-family: 'Poppins', sans-serif; }

	/* Story */
	.story-text { font-size: 1.25rem; line-height: 1.8; color: #4b5563; font-weight: 400; white-space: pre-line; }

	/* Portfolio */
	.portfolio-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1.5rem;
	}

	.portfolio-item-btn {
		aspect-ratio: 4/3;
		border-radius: 24px;
		overflow: hidden;
		border: none;
		padding: 0;
		cursor: pointer;
		position: relative;
	}

	.portfolio-item-btn img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
	.item-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s; }
	.portfolio-item-btn:hover img { transform: scale(1.1); }
	.portfolio-item-btn:hover .item-overlay { opacity: 1; }
	.zoom-icon { background: white; color: var(--cta); width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }

	/* Access Grid */
	.access-grid {
		display: grid;
		grid-template-columns: 1.2fr 0.8fr;
		gap: 2.5rem;
		margin-bottom: 3rem;
	}

	.info-card-pro {
		background: white;
		border-radius: 32px;
		padding: 2.5rem;
		border: 1px solid #f1f5f9;
		box-shadow: 0 4px 6px rgba(0,0,0,0.02);
	}

	.info-card-icon {
		width: 56px;
		height: 56px;
		border-radius: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1.5rem;
	}
	:global(.info-card-icon svg) { width: 1.75rem; height: 1.75rem; }

	.info-card-icon.map { background: #f0fdf4; color: #16a34a; }
	.info-card-icon.time { background: #fff7ed; color: #ea580c; }

	.info-card-pro h3 { font-size: 1.25rem; font-weight: 800; margin: 0 0 1.5rem; color: var(--text); }

	.info-card-links { display: flex; flex-direction: column; gap: 1rem; }

	.access-row {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		padding: 1.25rem;
		background: #f8fafc;
		border-radius: 20px;
		text-decoration: none;
		color: var(--text);
		transition: all 0.2s;
		border: 1px solid transparent;
	}
	.access-row:hover { background: white; border-color: #e2e8f0; transform: translateX(5px); }

	.access-label { font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 0.25rem; }
	.access-value { font-size: 0.95rem; font-weight: 700; color: #334155; }
	:global(.row-arrow) { color: #cbd5e1; width: 1.25rem; height: 1.25rem; margin-left: auto; }
	:global(.row-icon-social) { color: #3b82f6; width: 1.25rem; height: 1.25rem; margin-left: auto; }

	.hours-display { background: #fffcf0; padding: 1.5rem; border-radius: 20px; border: 1px solid #fef3c7; }
	.hours-content { font-size: 1rem; line-height: 1.9; color: #92400e; font-weight: 600; white-space: pre-line; text-align: center; }

	.secondary-info-stack { display: flex; flex-direction: column; gap: 1.5rem; }

	.social-connect { display: flex; flex-direction: column; gap: 1rem; }
	.social-pill {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 1.25rem;
		border-radius: 20px;
		text-decoration: none;
		font-weight: 800;
		color: white;
		transition: transform 0.2s;
	}
	.social-pill:hover { transform: scale(1.02); }
	.social-pill.fb { background: #1877f2; }
	.social-pill.ig { background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); }
	:global(.social-pill svg) { width: 1.5rem; height: 1.5rem; }

	/* Sticky Bar */
	.sticky-cta-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(20px);
		padding: 1.25rem 1.5rem calc(1.25rem + env(safe-area-inset-bottom));
		border-top: 1px solid #f1f5f9;
		z-index: 100;
		box-shadow: 0 -10px 25px rgba(0,0,0,0.05);
	}

	.cta-inner {
		max-width: var(--desktop);
		margin: 0 auto;
		display: flex;
		gap: 1rem;
	}

	.btn-cta-primary, .btn-cta-secondary {
		flex: 1;
		height: 60px;
		border-radius: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		font-weight: 800;
		font-size: 1rem;
		text-decoration: none;
		transition: all 0.2s;
	}

	.btn-cta-primary { background: var(--cta); color: white; box-shadow: 0 10px 15px rgba(217, 70, 122, 0.25); }
	.btn-cta-primary:hover { border-radius: 30px; filter: brightness(1.1); }
	
	.btn-cta-secondary { background: #f1f5f9; color: #334155; }
	.btn-cta-secondary:hover { background: #e2e8f0; border-radius: 30px; }

	/* Lightbox */
	.vitrine-lightbox {
		position: fixed;
		inset: 0;
		background: rgba(0,0,0,0.95);
		backdrop-filter: blur(10px);
		z-index: 2000;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.lightbox-close-btn {
		position: absolute;
		top: 2rem;
		right: 2rem;
		width: 48px;
		height: 48px;
		background: rgba(255,255,255,0.1);
		border-radius: 50%;
		border: none;
		color: white;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	:global(.close-icon) { width: 24px; height: 24px; }

	.lightbox-content { max-width: 90vw; max-height: 80vh; }
	.lightbox-content img { width: 100%; height: 100%; object-fit: contain; }

	@media (max-width: 800px) {
		.access-grid { grid-template-columns: 1fr; }
		.brand-name { font-size: 2rem; }
		.brand-card { padding: 1.5rem; }
		.vitrine-hero { height: 45vh; }
		.section-title-pro { font-size: 1.75rem; }
		.offer-main { flex-direction: column; text-align: center; }
		.offer-text { text-align: center; }
		.offer-footer-terms { text-align: center; }
	}
</style>
