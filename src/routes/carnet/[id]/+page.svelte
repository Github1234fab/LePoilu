<script>
	import { page } from '$app/stores';
	import { onMount, onDestroy } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { db } from '$lib/firebase';
	import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';

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

	let sponsorId = $page.params.id;
	let sponsor = null;
	let loading = true;
	let offerShown = false;

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

<div class="sponsor-page pb-safe">
	{#if loading}
		<div class="loading-state h-60vh">
			<div class="spinner"></div>
			<p>Chargement de la fiche...</p>
		</div>
	{:else if sponsor}
		<!-- Floating Back Button -->
		<a href="/carnet" class="floating-back-btn" aria-label="Retour au carnet">
			<div class="icon-rotate"><ChevronRightIcon /></div>
		</a>

		<!-- Hero Banner Premium -->
		<div class="hero-banner">
			{#if sponsor.images && sponsor.images.length > 0}
				<button
					class="hero-img-btn group"
					on:click={() => (lightboxImage = sponsor.images[0])}
					aria-label="Agrandir l'image"
				>
					<img
						src={sponsor.images[0]}
						alt={`Couverture de ${sponsor.businessName}`}
						class="hero-img"
					/>
					<div class="hero-gradient-overlay"></div>
				</button>
			{:else}
				<div class="hero-no-img">
					<div class="icon-xl mb-4"><ImageOutlineIcon /></div>
					<span>Aucune photo couverture</span>
				</div>
			{/if}

			<!-- Decorative shape divider -->
			<div class="hero-divider"></div>
		</div>

		<main class="sponsor-main">
			<!-- Floating Main Info Card -->
			<div class="main-info-card group">
				<!-- Decorative bg elements -->
				<div class="card-glow"></div>

				<div class="main-info-header z-10">
					<div class="main-info-title-box">
						<span class="category-badge">
							{sponsor.category || 'Non classé'}
						</span>
						<h1 class="main-title">
							{sponsor.businessName}
						</h1>
					</div>
					{#if isPremium}
						<div class="premium-badge">
							<div class="icon-small"><StarIcon /></div>
							Premium
						</div>
					{/if}
				</div>

				<div class="meta-info-box z-10">
					<div class="meta-pill">
						<div class="icon-small text-primary"><LocationOutlineIcon /></div>
						<span>{sponsor.city} <span class="dot">•</span> {sponsor.postalCode}</span>
					</div>
					{#if sponsor.sector}
						<div class="meta-pill">
							<div class="icon-small text-gray"><AppsIcon /></div>
							<span class="capitalize">{sponsor.sector}</span>
						</div>
					{/if}
				</div>
			</div>

			<div class="sponsor-sections">
				<!-- Special Offer Banner -->
				{#if hasOffer}
					<div class="offer-banner">
						<!-- Decorative bg -->
						<div class="offer-glow-1"></div>
						<div class="offer-glow-2"></div>

						<div class="offer-content z-10">
							<div class="offer-label">
								<span>OFFRE LE POILU</span>
							</div>

							<h2 class="offer-title">{sponsor.specialOffer.title}</h2>
							<p class="offer-desc">
								{sponsor.specialOffer.description}
							</p>

							<button on:click={showOffer} class="offer-btn {offerShown ? 'offer-btn-active' : ''}">
								{#if offerShown}
									<div class="icon-medium"><CheckCircleIcon /></div>
									<span>Offre activée, montrez cet écran !</span>
								{:else}
									<div class="icon-medium"><GiftIcon /></div>
									<span>Profiter de l'offre</span>
								{/if}
							</button>
							{#if !offerShown}
								<p class="offer-hint">À présenter en caisse ou lors de la commande</p>
							{/if}
						</div>
					</div>
				{/if}

				<!-- About Description -->
				{#if sponsor.description}
					<section class="content-section">
						<!-- Quote watermark decorative -->
						<div class="quote-watermark">"</div>

						<h3 class="section-title z-10">
							<div class="title-line"></div>
							Le mot du commerçant
						</h3>
						<p class="description-text z-10">{sponsor.description}</p>
					</section>
				{/if}

				<!-- Additional Photos Gallery -->
				{#if sponsor.images && sponsor.images.length > 1}
					<section>
						<h3 class="gallery-title">Photos</h3>
						<div class="gallery-scroll no-scrollbar">
							{#each sponsor.images.slice(1) as img, index}
								<button
									class="gallery-item-btn"
									on:click={() => (lightboxImage = img)}
									aria-label={`Agrandir la photo ${index + 2}`}
								>
									<img src={img} alt="Visuel du commerce" class="gallery-img" loading="lazy" />
								</button>
							{/each}
						</div>
					</section>
				{/if}

				<div class="info-grid">
					<!-- Practical Info -->
					<section class="content-section flex-col">
						<h3 class="section-title">
							<div class="title-icon-box">
								<MapOutlineIcon />
							</div>
							Coordonnées
						</h3>

						<div class="contact-links">
							<!-- Address -->
							<a
								href={`https://maps.google.com/?q=${encodeURIComponent(sponsor.address + ', ' + sponsor.postalCode + ' ' + sponsor.city)}`}
								target="_blank"
								on:click={trackClick}
								class="contact-link-row group"
							>
								<div class="contact-icon bg-gray">
									<LocationIcon />
								</div>
								<div class="contact-text">
									<p class="contact-label">Adresse</p>
									<p class="contact-val">
										{sponsor.address}<br />{sponsor.postalCode}
										{sponsor.city}
									</p>
								</div>
								<div class="arrow-right"><ChevronRightIcon /></div>
							</a>

							<!-- Website -->
							{#if sponsor.website && typeof sponsor.website === 'string'}
								<a
									href={sponsor.website.startsWith('http')
										? sponsor.website
										: `https://${sponsor.website}`}
									target="_blank"
									on:click={trackClick}
									class="contact-link-row group"
								>
									<div class="contact-icon bg-blue">
										<GlobeOutlineIcon />
									</div>
									<div class="contact-text">
										<p class="contact-label">Site Web</p>
										<p class="contact-val truncate">
											{sponsor.website.replace(/^https?:\/\//, '')}
										</p>
									</div>
									<div class="arrow-right"><ChevronRightIcon /></div>
								</a>
							{/if}

							<!-- Email -->
							{#if sponsor.email}
								<a
									href={`mailto:${sponsor.email}`}
									on:click={trackClick}
									class="contact-link-row group"
								>
									<div class="contact-icon bg-pink">
										<MailIcon />
									</div>
									<div class="contact-text">
										<p class="contact-label">Email</p>
										<p class="contact-val truncate">{sponsor.email}</p>
									</div>
									<div class="arrow-right"><ChevronRightIcon /></div>
								</a>
							{/if}
						</div>
					</section>

					<div class="info-col">
						<!-- Opening Hours -->
						{#if sponsor.openingHours}
							<section class="content-section flex-col flex-1">
								<h3 class="section-title">
									<div class="title-icon-box">
										<TimeOutlineIcon />
									</div>
									Horaires d'ouverture
								</h3>
								<div class="hours-box">
									<p class="hours-text">
										{sponsor.openingHours}
									</p>
								</div>
							</section>
						{/if}

						<!-- Social Media -->
						{#if sponsor.socialMedia && (sponsor.socialMedia.facebook || sponsor.socialMedia.instagram)}
							<section class="social-links">
								{#if sponsor.socialMedia.facebook}
									<a
										href={sponsor.socialMedia.facebook}
										target="_blank"
										on:click={trackClick}
										class="social-btn facebook"
										aria-label="Facebook (Nouvel onglet)"
									>
										<LogoFacebookIcon />
									</a>
								{/if}
								{#if sponsor.socialMedia.instagram}
									<a
										href={sponsor.socialMedia.instagram}
										target="_blank"
										on:click={trackClick}
										class="social-btn instagram"
										aria-label="Instagram (Nouvel onglet)"
									>
										<LogoInstagramIcon />
									</a>
								{/if}
							</section>
						{/if}
					</div>
				</div>
			</div>
		</main>

		<!-- Bottom Fixed Actions (Go / Call) -->
		<div class="action-bar-bottom pb-safe">
			<div class="action-bar-container">
				{#if sponsor.phone && typeof sponsor.phone === 'string'}
					<a
						href={`tel:${sponsor.phone.replace(/\s/g, '')}`}
						on:click={trackClick}
						class="btn-call"
					>
						<div class="icon-medium fill-white"><CallIcon /></div>
						Appeler
					</a>
				{/if}
				{#if sponsor.address && sponsor.city}
					<a
						href={`https://maps.google.com/?q=${encodeURIComponent(sponsor.address + ', ' + sponsor.postalCode + ' ' + sponsor.city)}`}
						target="_blank"
						on:click={trackClick}
						class={sponsor.phone ? 'btn-go' : 'btn-call'}
					>
						<div class={`icon-medium ${!sponsor.phone ? 'fill-white' : ''}`}><NavigateIcon /></div>
						Y aller
					</a>
				{/if}
			</div>
		</div>

		<!-- Fullscreen Image Lightbox -->
		{#if lightboxImage}
			<div class="lightbox" in:fade out:fade>
				<button
					class="lightbox-close"
					on:click={() => (lightboxImage = null)}
					aria-label="Fermer la vue plein écran"
				>
					<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						></path></svg
					>
				</button>
				<img src={lightboxImage} alt="Agrandissement" class="lightbox-img" />
			</div>
		{/if}
	{/if}
</div>

<style>
	/* Utilities */
	.pb-safe {
		padding-bottom: calc(1rem + env(safe-area-inset-bottom));
	}
	.z-10 {
		position: relative;
		z-index: 10;
	}
	.truncate {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.capitalize {
		text-transform: capitalize;
	}
	.dot {
		color: #d1d5db;
		margin: 0 4px;
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
	.icon-medium {
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.icon-medium :global(svg) {
		width: 20px;
		height: 20px;
	}
	.icon-xl {
		width: 80px;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 50%;
		padding: 20px;
	}
	.icon-xl :global(svg) {
		width: 40px;
		height: 40px;
	}

	.text-primary {
		color: var(--primary);
	}
	.text-gray {
		color: #9ca3af;
	}
	.fill-white :global(svg) {
		fill: white;
		border: none;
	}

	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
	.no-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	/* Base Layout */
	.sponsor-page {
		min-height: 100vh;
		background-color: var(--lightBg);
		padding-bottom: 112px;
		position: relative;
	}

	.h-60vh {
		min-height: 60vh;
	}

	.loading-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.spinner {
		border: 3px solid #f3f3f3;
		border-top: 3px solid var(--primary);
		border-radius: 50%;
		width: 40px;
		height: 40px;
		animation: spin 1s linear infinite;
		margin-bottom: 16px;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.floating-back-btn {
		position: absolute;
		top: 24px;
		left: 16px;
		z-index: 30;
		background-color: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(8px);
		padding: 12px;
		border-radius: 50%;
		color: white;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background-color 0.2s;
	}

	.floating-back-btn:hover {
		background-color: rgba(0, 0, 0, 0.6);
	}

	.icon-rotate {
		transform: rotate(180deg);
		display: flex;
	}
	.icon-rotate :global(svg) {
		width: 24px;
		height: 24px;
	}

	@media (min-width: 640px) {
		.floating-back-btn {
			left: 24px;
		}
	}
	@media (min-width: 1024px) {
		.floating-back-btn {
			left: 32px;
		}
	}

	/* Hero Banner */
	.hero-banner {
		height: 288px;
		background-color: #111827;
		position: relative;
		width: 100%;
		overflow: hidden;
	}

	@media (min-width: 640px) {
		.hero-banner {
			height: 384px;
		}
	}
	@media (min-width: 768px) {
		.hero-banner {
			height: 450px;
		}
	}

	.hero-img-btn {
		width: 100%;
		height: 100%;
		cursor: zoom-in;
		border: none;
		padding: 0;
		background: none;
		position: relative;
		overflow: hidden;
	}

	.hero-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.7s ease;
	}

	.hero-img-btn:hover .hero-img {
		transform: scale(1.05);
	}

	.hero-gradient-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, #111827, rgba(17, 24, 39, 0.4), transparent);
		opacity: 0.8;
	}

	.hero-no-img {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: linear-gradient(to bottom, #1f2937, #111827);
		opacity: 0.4;
		color: rgba(255, 255, 255, 0.6);
		font-weight: 500;
	}

	.hero-divider {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 64px;
		background-color: var(--lightBg);
		clip-path: polygon(0 100%, 100% 100%, 100% 0, 0 100%);
	}

	/* Main Content Area */
	.sponsor-main {
		max-width: var(--desktop);
		width: 100%;
		margin: -128px auto 0;
		padding: 0 var(--spacing-sm) var(--spacing-sm);
		position: relative;
		z-index: 10;
	}

	/* Info Card */
	.main-info-card {
		background-color: var(--background);
		border-radius: var(--radius-lg);
		box-shadow:
			0 20px 25px -5px rgba(0, 0, 0, 0.1),
			0 10px 10px -5px rgba(0, 0, 0, 0.04);
		padding: 24px;
		margin-bottom: 32px;
		border: 1px solid white;
		position: relative;
		overflow: hidden;
		transition: border-color var(--transition-normal);
	}

	.main-info-card:hover {
		border-color: rgba(255, 183, 158, 0.2);
	}

	@media (min-width: 640px) {
		.main-info-card {
			padding: 40px;
		}
	}

	.card-glow {
		position: absolute;
		top: -96px;
		right: -96px;
		width: 192px;
		height: 192px;
		background-color: rgba(255, 183, 158, 0.1);
		border-radius: 50%;
		filter: blur(40px);
		padding: 40px;
	}
	.main-info-title-box {
		flex: 1;
		width: 100%;
	}

	.category-badge {
		display: inline-block;
		padding: 4px 12px;
		background-color: rgba(255, 183, 158, 0.1);
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--primary);
		border-radius: 50px;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: 12px;
	}

	.main-title {
		font-size: clamp(2.25rem, 5vw, 3rem);
		font-weight: 800;
		color: var(--textDark);
		font-family: var(--FFTitle);
		line-height: 1.1;
		margin-bottom: 8px;
		letter-spacing: -0.025em;
	}

	.premium-badge {
		background: linear-gradient(to top right, #facc15, #fde047);
		color: #713f12;
		display: flex;
		align-items: center;
		padding: 6px 12px;
		border-radius: 12px;
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		gap: 6px;
		box-shadow: 0 4px 6px -1px rgba(250, 204, 21, 0.2);
		cursor: default;
		transition: transform var(--transition-normal);
		flex-shrink: 0;
		height: fit-content;
		width: fit-content;
	}

	.premium-badge:hover {
		transform: scale(1.05);
	}

	.premium-badge :global(svg) {
		fill: #713f12;
		border: none;
	}

	.meta-info-box {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 12px;
		margin-top: 8px;
	}

	.meta-pill {
		display: flex;
		align-items: center;
		gap: 6px;
		background-color: var(--lightBg);
		padding: 6px 12px;
		border-radius: 8px;
		border: 1px solid var(--borderColor);
		font-size: 0.875rem;
		font-weight: 600;
		color: #6b7280;
	}

	.meta-pill .text-primary {
		color: var(--primary);
	}
	.meta-pill .text-gray {
		color: #9ca3af;
	}

	/* Content Sections */
	.sponsor-sections {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	.content-section {
		background-color: var(--background);
		border-radius: var(--radius-lg);
		padding: 24px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
		border: 1px solid var(--borderColor);
		position: relative;
		overflow: hidden;
	}

	@media (min-width: 640px) {
		.content-section {
			padding: 40px;
		}
	}

	.flex-col {
		display: flex;
		flex-direction: column;
	}
	.flex-1 {
		flex: 1;
	}

	/* Quote section */
	.quote-watermark {
		position: absolute;
		top: -16px;
		left: -8px;
		font-size: 120px;
		font-family: serif;
		color: var(--lightBg);
		line-height: 1;
		user-select: none;
		pointer-events: none;
	}

	.section-title {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--textDark);
		margin-bottom: 24px;
		font-family: var(--FFTitle);
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.title-line {
		width: 6px;
		height: 24px;
		background-color: var(--primary);
		border-radius: 50px;
	}

	.description-text {
		color: #4b5563;
		line-height: 1.625;
		white-space: pre-line;
		font-size: 1.125rem;
		font-weight: 500;
	}

	/* Offer Banner */
	.offer-banner {
		background: linear-gradient(to bottom right, #fefce8, #fef9c3);
		border: 1px solid #fef08a;
		border-radius: var(--radius-lg);
		padding: 24px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
		position: relative;
		overflow: hidden;
	}

	@media (min-width: 640px) {
		.offer-banner {
			padding: 32px;
		}
	}

	.offer-glow-1 {
		position: absolute;
		top: -40px;
		right: -40px;
		width: 160px;
		height: 160px;
		background-color: rgba(255, 255, 255, 0.4);
		border-radius: 50%;
		filter: blur(24px);
		pointer-events: none;
	}

	.offer-glow-2 {
		position: absolute;
		bottom: -40px;
		left: -40px;
		width: 128px;
		height: 128px;
		background-color: rgba(254, 215, 170, 0.3);
		border-radius: 50%;
		filter: blur(20px);
		pointer-events: none;
	}

	.offer-content {
		text-align: center;
	}

	.offer-label {
		display: inline-flex;
		background-color: #111827;
		padding: 6px 16px;
		border-radius: 8px;
		margin-bottom: 24px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	}

	.offer-label span {
		color: #facc15;
		font-weight: 700;
		font-size: 0.75rem;
		letter-spacing: 0.15em;
	}

	.offer-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: #111827;
		margin-bottom: 8px;
	}

	.offer-desc {
		color: #374151;
		line-height: 1.625;
		margin-bottom: 32px;
		max-width: 36rem;
		margin-left: auto;
		margin-right: auto;
	}

	.offer-btn {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 16px 32px;
		border-radius: 50px;
		font-weight: 700;
		font-size: 1.125rem;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
		transition: all var(--transition-normal);
		border: none;
		background-color: #111827;
		color: white;
		cursor: pointer;
	}

	.offer-btn:not(.offer-btn-active):hover {
		background-color: #000;
		transform: scale(1.05);
	}

	.offer-btn:not(.offer-btn-active):active {
		transform: scale(0.95);
	}

	.offer-btn-active {
		background-color: #d1fae5;
		color: #065f46;
		border: 2px solid #a7f3d0;
		cursor: default;
	}

	.offer-hint {
		font-size: 0.75rem;
		color: #6b7280;
		margin-top: 16px;
		font-style: italic;
	}

	/* Gallery */
	.gallery-title {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--textDark);
		margin-bottom: 16px;
		margin-left: 8px;
		font-family: var(--FFTitle);
	}

	.gallery-scroll {
		display: flex;
		overflow-x: auto;
		gap: 16px;
		padding: 0 8px 16px;
		scroll-snap-type: x mandatory;
	}

	.gallery-item-btn {
		width: 192px;
		height: 192px;
		flex-shrink: 0;
		border-radius: 16px;
		overflow: hidden;
		scroll-snap-align: center;
		border: none;
		padding: 0;
		background: none;
		cursor: pointer;
	}

	.gallery-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease;
	}

	.gallery-item-btn:hover .gallery-img {
		transform: scale(1.05);
	}

	/* Grid For Info */
	.info-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 32px;
	}

	@media (min-width: 1024px) {
		.info-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.title-icon-box {
		padding: 8px;
		background-color: rgba(255, 183, 158, 0.1);
		border-radius: 12px;
		color: var(--primary);
	}

	.title-icon-box :global(svg) {
		width: 20px;
		height: 20px;
	}

	.contact-links {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.contact-link-row {
		display: flex;
		align-items: flex-start;
		gap: 16px;
		padding: 12px;
		margin: 0 -12px;
		border-radius: 12px;
		transition: background-color var(--transition-fast);
		text-decoration: none;
	}

	.contact-link-row:hover {
		background-color: var(--lightBg);
	}

	.contact-icon {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		transition: background-color var(--transition-fast);
	}

	.contact-icon :global(svg) {
		width: 20px;
		height: 20px;
	}

	.bg-gray {
		background-color: #f3f4f6;
		color: var(--primary);
	}
	.contact-link-row:hover .bg-gray {
		background-color: rgba(255, 183, 158, 0.1);
	}

	.bg-blue {
		background-color: #eff6ff;
		color: #3b82f6;
	}
	.contact-link-row:hover .bg-blue {
		background-color: #dbeafe;
	}

	.bg-pink {
		background-color: #fdf2f8;
		color: #ec4899;
	}
	.contact-link-row:hover .bg-pink {
		background-color: #fce7f3;
	}

	.contact-text {
		flex: 1;
		margin-top: 2px;
	}

	.contact-label {
		font-size: 0.75rem;
		font-weight: 700;
		color: #6b7280;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: 4px;
	}

	.contact-val {
		color: var(--textDark);
		font-weight: 600;
	}

	.arrow-right {
		margin-top: 8px;
		color: #d1d5db;
		transition: color var(--transition-fast);
	}

	.arrow-right :global(svg) {
		width: 20px;
		height: 20px;
	}

	.contact-link-row:hover .arrow-right {
		color: var(--primary);
	}

	/* Info Col */
	.info-col {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.hours-box {
		background-color: var(--lightBg);
		border-radius: 16px;
		padding: 20px;
		border: 1px solid var(--borderColor);
		flex: 1;
		min-height: 100px;
		display: flex;
		align-items: center;
	}

	@media (min-width: 640px) {
		.hours-box {
			padding: 24px;
		}
	}

	.hours-text {
		color: #4b5563;
		line-height: 2;
		font-weight: 500;
		white-space: pre-line;
		text-align: center;
		width: 100%;
	}

	/* Social Links */
	.social-links {
		display: flex;
		padding: 8px 4px;
		gap: 16px;
		justify-content: center;
	}

	@media (min-width: 768px) {
		.social-links {
			justify-content: flex-start;
		}
	}

	.social-btn {
		background-color: white;
		padding: 16px;
		border-radius: 16px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
		border: 1px solid var(--borderColor);
		transition: all var(--transition-fast);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.social-btn :global(svg) {
		width: 28px;
		height: 28px;
	}

	.social-btn:hover {
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
		transform: translateY(-4px);
	}

	.facebook {
		color: #1877f2;
	}
	.instagram {
		color: #e4405f;
	}

	/* Action Bar Bottom */
	.action-bar-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 20;
		background-color: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(12px);
		border-top: 1px solid #e5e7eb;
		padding: 16px 16px;
		box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.05);
	}

	.action-bar-container {
		max-width: var(--desktop);
		margin: 0 auto;
		display: flex;
		gap: 16px;
	}

	.btn-call,
	.btn-go {
		flex: 1;
		border-radius: 16px;
		padding: 16px 0;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		font-weight: 700;
		text-decoration: none;
		transition: background-color var(--transition-fast);
	}

	.btn-call {
		background-color: var(--primary);
		color: white;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	}

	.btn-call:hover {
		background-color: var(--accent);
	}

	.btn-go {
		background-color: #f3f4f6;
		color: #111827;
	}

	.btn-go:hover {
		background-color: #e5e7eb;
	}

	/* Lightbox */
	.lightbox {
		position: fixed;
		inset: 0;
		z-index: 50;
		background-color: rgba(0, 0, 0, 0.95);
		display: flex;
		align-items: center;
		justify-content: center;
		backdrop-filter: blur(4px);
	}

	.lightbox-close {
		position: absolute;
		top: 24px;
		right: 24px;
		padding: 12px;
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 50%;
		border: none;
		color: white;
		cursor: pointer;
		transition: background-color var(--transition-fast);
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.lightbox-close:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}
	.lightbox-close svg {
		width: 24px;
		height: 24px;
	}

	.lightbox-img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		padding: 16px;
		user-select: none;
	}
</style>
