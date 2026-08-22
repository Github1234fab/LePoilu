<script>
	import PoiluJumelles from '../../lib/assets/Poilu-jumelles.png';
	import { auth } from '$lib/firebase';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';

	const pricing = [
		{
			name: 'Gratuit (Standard)',
			price: '0€',
			details: ['1 annonce', 'Modération standard (< 24h)', 'Visible 30 jours', 'Logo du Poilu'],
			icon: 'fa-solid  fa-hand-holding-dollar',
			recommended: false,
			link: '#',
			disabled: true
		},
		{
			name: "À l'unité (Premium)",
			price: '0€',
			oldPrice: '2,99 €',
			isFreePromo: true,
			details: [
				'1 annonce',
				'Modération standard (< 24h)',
				'Photo, visuel',
				"Liens vers l'annonceur",
				'Lien vers la billeterie'
			],
			icon: 'fa-solid fa-ticket',
			recommended: true, // Mark Premium as recommended now that standard is disabled
			link: '/publier?plan=premium',
			disabled: false
		},
		{
			name: 'Pack 10 (Premium)',
			price: '19,99 €',
			details: [
				'10 annonces Premium',
				'Sans limite de temps',
				'Modération prioritaire',
				'Économisez 50%'
			],
			icon: 'fa-solid fa-layer-group',
			recommended: false,
			link: '#',
			disabled: true
		},
		{
			name: 'Pro (mensuel)',
			price: '29,99 €',
			details: [
				'Annonces Premium illimitées',
				'Publication en masse via fichier',
				'Modération prioritaire',
				'Badge organisateur vérifié',
				'Support prioritaire'
			],
			icon: 'fa-solid fa-crown',
			recommended: false,
			link: '#',
			disabled: true
		}
	];

	async function handlePlanSelection(e, link) {
		e.preventDefault();
		const user = auth.currentUser;
		if (user) {
			goto(link);
		} else {
			const encodedLink = encodeURIComponent(link);
			goto(`/compte?redirect=${encodedLink}`);
		}
	}
</script>

<svelte:head>
	<title>Publication d'évènement — Le Poilu</title>
	<meta
		name="description"
		content="Fais rayonner tes événements sur l'application Le Poilu. Touche une audience locale qualifiée en quelques minutes."
	/>
</svelte:head>

<main>
	<!-- PREMIUM HERO SECTION -->
	<section class="publish-hero">
		<div class="hero-overlay"></div>
		<div class="hero-content">
			<div class="hero-text" in:fade>
				<span class="eyebrow">ORGANISE, PUBLIE, RAYONNE</span>
				<h1>Propulse ton événement au cœur de la vie locale.</h1>
				<p>
					Le Poilu regroupe des milliers d'utilisateurs passionnés par l'Ouest Lyonnais. 
					Publie ton évènement ici et apparais instantanément sur leur application mobile préférée, Le Poilu.
				</p>
				<div class="hero-actions">
					<a href="#plans" class="btn-primary">Voir les formules</a>
					<a href="#how" class="btn-secondary">Comment ça marche ?</a>
				</div>
			</div>
			<div class="hero-visual">
				<img class="poilu-jumelles" src={PoiluJumelles} alt="Illustration Le Poilu" />
			</div>
		</div>
	</section>

	<!-- STRATEGY SECTION: WEB TO APP -->
	<section id="how" class="strategy-section">
		<div class="strategy-container">
			<header class="section-header">
				<h2>Le pont entre toi et ton audience</h2>
				<p>Publier un évènement n'a jamais été aussi simple</p>
			</header>

			<div class="strategy-grid">
				<div class="strategy-item">
					<div class="step-num">1</div>
					<h3>Choisis ta formule</h3>
					<p>Remplis les détails de ton événement confortablement depuis ton ordinateur ou ton mobile.</p>
				</div>
				<div class="strategy-connector">
					<i class="fa-solid fa-arrow-right"></i>
				</div>
				<div class="strategy-item">
					<div class="step-num">2</div>
					<h3>Paiement Sécurisé</h3>
					<p>Pour les publications d'évènements payantes, le paiement s'effectue via Stripe, une plateforme 100% sécurisée.</p>
				</div>
				<div class="strategy-connector">
					<i class="fa-solid fa-arrow-right"></i>
				</div>
				<div class="strategy-item">
					<div class="step-num">3</div>
					<h3>Visibilité sur l'App</h3>
					<p>Une fois validée, ton annonce est visible par tous les utilisateurs de l'application Le Poilu.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- PRICING SECTION -->
	<section id="plans" class="pricing-section">
		<div class="section-header">
			<div class="promo-banner" style="background: linear-gradient(135deg, #FF9500 0%, #E67E00 100%); color: white; padding: 0.8rem 1.8rem; border-radius: 50px; display: inline-block; margin-bottom: 2rem; font-weight: 800; box-shadow: 0 10px 20px rgba(230, 126, 0, 0.2); letter-spacing: 0.5px;">
				🎉 OFFRE DE LANCEMENT : TOUS LES PLANS SONT 100% GRATUITS !
			</div>
			<h2 class="title-vibrant">Choisis ta formule de visibilité</h2>
			<p>Profitez de notre offre de lancement pour diffuser vos annonces premium gratuitement.</p>
		</div>

		<div class="pricing-grid">
			{#each pricing as tier}
				<article class="pricing-card" class:recommended={tier.recommended} class:disabled={tier.disabled}>
					{#if tier.recommended && !tier.disabled}
						<div class="badge-recommended">Le plus efficace</div>
					{/if}
					
					<div class="card-header">
						<div class="pricing-icon">
							<i class={tier.icon}></i>
						</div>
						<h3 class="pricing-name">{tier.name}</h3>
					</div>

					{#if tier.isFreePromo}
						<div class="price-box" style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 2rem;">
							<span class="promo-gratuit" style="font-size: 2.8rem; font-weight: 900; color: #10b981; text-transform: uppercase; letter-spacing: -1px; line-height: 1;">Gratuit</span>
							{#if tier.oldPrice}
								<span class="old-price" style="text-decoration: line-through; opacity: 0.6; font-size: 1.2rem; color: #ef4444; font-weight: 600; margin-top: 0.25rem;">au lieu de {tier.oldPrice}</span>
							{/if}
						</div>
					{:else}
						<div class="price-box" style="display: flex; align-items: baseline; justify-content: center; gap: 0.5rem;">
							{#if tier.oldPrice}
								<span class="old-price" style="text-decoration: line-through; opacity: 0.5; font-size: 1.3rem; color: #ef4444; font-weight: 600;">{tier.oldPrice}</span>
							{/if}
							<span class="currency">€</span>
							<span class="amount">{tier.price.replace(' €', '').replace('€', '')}</span>
							{#if tier.name.includes('mensuel')}
								<span class="period">/mois</span>
							{/if}
						</div>
					{/if}

					<ul class="pricing-details">
						{#each tier.details as detail}
							<li>
								<i class="fa-solid fa-check"></i>
								<span>{detail}</span>
							</li>
						{/each}
					</ul>

					<a
						class="btn-pricing"
						href={tier.link}
						on:click={(e) => {
							if (tier.disabled) {
								e.preventDefault();
								return;
							}
							handlePlanSelection(e, tier.link);
						}}
					>
						{#if tier.disabled}
							Bientôt disponible
						{:else}
							Choisir cette offre
						{/if}
					</a>
				</article>
			{/each}
		</div>

		<div class="pricing-footer">
			<p><i class="fa-solid fa-shield-halved"></i> Paiement 100% sécurisé via Stripe</p>
		</div>
	</section>
</main>

<style>
	main {
		background-color: #f8fafc;
		min-height: 100vh;
		padding-bottom: 5rem;
	}

	/* PREMIUM HERO */
	.publish-hero {
		position: relative;
		background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
		padding: 6rem 1.5rem 8rem;
		color: white;
		overflow: hidden;
		border-radius: 0 0 60px 60px;
	}

	.hero-overlay {
		position: absolute;
		top: 0; left: 0; right: 0; bottom: 0;
		background-image: radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 40%);
		pointer-events: none;
	}

	.hero-content {
		max-width: 1200px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1.2fr 0.8fr;
		gap: 4rem;
		align-items: center;
		position: relative;
		z-index: 2;
	}

	.eyebrow {
		display: block;
		color: #10b981;
		font-weight: 800;
		letter-spacing: 2px;
		font-size: 0.85rem;
		margin-bottom: 1.5rem;
	}

	.hero-text h1 {
		font-family: var(--FFTitle);
		font-size: clamp(2.2rem, 5vw, 3.8rem);
		font-weight: 900;
		line-height: 1.1;
		margin-bottom: 2rem;
	}

	.hero-text p {
		font-size: 1.25rem;
		opacity: 0.9;
		line-height: 1.6;
		margin-bottom: 3rem;
		max-width: 650px;
	}

	.hero-actions {
		display: flex;
		gap: 1.5rem;
	}

	.btn-primary {
		background: #10b981;
		color: white;
		padding: 1.25rem 2.5rem;
		border-radius: 50px;
		font-weight: 800;
		text-decoration: none;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.btn-secondary {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		color: white;
		padding: 1.25rem 2.5rem;
		border-radius: 50px;
		font-weight: 800;
		text-decoration: none;
		border: 1px solid rgba(255, 255, 255, 0.2);
		transition: background 0.2s;
	}

	.btn-primary:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3); }
	.btn-secondary:hover { background: rgba(255, 255, 255, 0.2); }

	.poilu-jumelles {
		width: 100%;
		height: auto;
		filter: drop-shadow(0 20px 40px rgba(0,0,0,0.5));
		animation: float 6s ease-in-out infinite;
	}

	@keyframes float {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-20px); }
	}

	/* STRATEGY SECTION */
	.strategy-section {
		padding: 6rem 1.5rem;
		max-width: 1200px;
		margin: -4rem auto 4rem;
		position: relative;
		z-index: 3;
	}

	.strategy-container {
		background: white;
		border-radius: 32px;
		padding: 4rem;
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
	}

	.section-header {
		text-align: center;
		margin-bottom: 4rem;
	}

	.section-header h2 {
		font-family: var(--FFTitle);
		font-size: 2.2rem;
		font-weight: 900;
		color: #1e293b;
		margin-bottom: 1rem;
	}

	.section-header p {
		color: #64748b;
		font-size: 1.1rem;
		font-weight: 600;
	}

	.strategy-grid {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 2rem;
	}

	.strategy-item {
		flex: 1;
		text-align: center;
	}

	.step-num {
		width: 50px;
		height: 50px;
		background: #f1f5f9;
		color: #10b981;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 1.5rem;
		font-weight: 900;
		font-size: 1.25rem;
	}

	.strategy-item h3 {
		font-family: var(--FFTitle);
		font-weight: 800;
		color: #1e293b;
		margin-bottom: 1rem;
	}

	.strategy-item p {
		color: #64748b;
		line-height: 1.6;
		font-size: 0.95rem;
	}

	.strategy-connector {
		padding-top: 1.5rem;
		color: #cbd5e1;
		font-size: 1.5rem;
	}

	/* PRICING SECTION */
	.pricing-section {
		padding: 4rem 1.5rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.title-vibrant {
		font-family: var(--FFTitle);
		font-size: 2.5rem;
		font-weight: 900;
		background: linear-gradient(135deg, #10b981 0%, #059669 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.pricing-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 2rem;
		margin-bottom: 4rem;
	}

	.pricing-card {
		background: white;
		border-radius: 24px;
		padding: 2.5rem;
		display: flex;
		flex-direction: column;
		border: 1px solid #e2e8f0;
		transition: all 0.3s;
		position: relative;
	}

	.pricing-card.recommended {
		border: 2px solid #10b981;
		transform: scale(1.05);
		box-shadow: 0 20px 40px rgba(16, 185, 129, 0.1);
	}

	.badge-recommended {
		position: absolute;
		top: -15px;
		left: 50%;
		transform: translateX(-50%);
		background: #10b981;
		color: white;
		padding: 0.4rem 1.2rem;
		border-radius: 50px;
		font-weight: 800;
		font-size: 0.75rem;
		text-transform: uppercase;
	}

	.card-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.pricing-icon {
		width: 50px;
		height: 50px;
		background: #f0fdf4;
		color: #10b981;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25rem;
	}

	.pricing-name {
		font-size: 1.2rem;
		font-weight: 800;
		color: #1e293b;
	}

	.price-box {
		margin-bottom: 2rem;
		display: flex;
		align-items: baseline;
	}

	.currency { font-size: 1.5rem; font-weight: 600; color: #64748b; margin-right: 2px; }
	.amount { font-size: 3rem; font-weight: 900; color: #1e293b; letter-spacing: -2px; }
	.period { color: #64748b; font-weight: 600; font-size: 1rem; margin-left: 4px; }

	.pricing-details {
		list-style: none;
		padding: 0;
		margin: 0 0 2.5rem;
		flex-grow: 1;
	}

	.pricing-details li {
		display: flex;
		gap: 0.75rem;
		margin-bottom: 1rem;
		color: #475569;
		font-size: 0.95rem;
	}

	.pricing-details li i {
		color: #10b981;
		padding-top: 4px;
	}

	.btn-pricing {
		background: #1e293b;
		color: white;
		text-align: center;
		padding: 1rem;
		border-radius: 12px;
		text-decoration: none;
		font-weight: 700;
		transition: background 0.2s;
	}

	.recommended .btn-pricing {
		background: #10b981;
	}

	.btn-pricing:hover {
		background: #0f172a;
	}

	.recommended .btn-pricing:hover {
		background: #059669;
	}

	.pricing-card.disabled {
		opacity: 0.6;
		pointer-events: none;
		border: 1px dashed #cbd5e1;
		box-shadow: none;
		background: #f1f5f9;
	}

	.pricing-card.disabled .btn-pricing {
		background: #94a3b8 !important;
		color: #ffffff !important;
		cursor: not-allowed;
	}

	.pricing-footer {
		text-align: center;
		color: #64748b;
		font-weight: 600;
		font-size: 0.9rem;
	}

	.pricing-footer i { color: #10b981; margin-right: 0.5rem; }

	/* MOBILE ADAPTATION */
	@media (max-width: 900px) {
		.hero-content { grid-template-columns: 1fr; text-align: center; gap: 2rem; }
		.hero-text p { margin: 0 auto 3rem; }
		.hero-actions { justify-content: center; flex-direction: column; }
		.hero-visual { max-width: 300px; margin: 0 auto; }
		
		.strategy-grid { flex-direction: column; align-items: center; }
		.strategy-connector { transform: rotate(90deg); padding: 0.5rem 0; }
		.strategy-container { padding: 2rem; }

		.pricing-card.recommended { transform: none; margin: 1rem 0; }
	}
</style>
