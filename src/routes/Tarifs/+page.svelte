<script>
	import PoiluJumelles from '../../lib/assets/Poilu-jumelles.png';

	const pricing = [
		{
			name: 'Gratuit',
			price: '0€',
			details: ['1 annonce', 'Modération standard (< 24h)', 'Visible 30 jours'],
			icon: 'fa-solid fa-ticket',
			recommended: false
		},
		{
			name: 'À l\'unité',
			price: '4,99 €',
			details: ['1 annonce', 'Modération standard (< 24h)', 'Visible 30 jours', 'Photo ou visuel', "Liens vers l'annonceur et la billeterie"],
			icon: 'fa-solid fa-ticket',
			recommended: false
		},
		{
			name: 'Pack 10',
			price: '19,90 €',
			details: ['10 annonces', 'Modération prioritaire', 'Économisez 50%'],
			icon: 'fa-solid fa-layer-group',
			recommended: true
		},
		{
			name: 'Pro (mensuel)',
			price: '24,99 €',
			details: ['Annonces illimitées', 'Badge organisateur vérifié', 'Support prioritaire'],
			icon: 'fa-solid fa-crown',
			recommended: false
		}
	];
</script>

<svelte:head>
	<title>Publier un événement — Le Poilu</title>
	<meta
		name="description"
		content="Publiez votre événement local en 2 minutes. Paiement sécurisé, modération rapide, grande visibilité locale."
	/>
</svelte:head>

<main>
	<!-- Hero Section -->
	<section class="hero">
		<div class="hero-content">
			<h1 class="hero-title">Publier un événement</h1>
			<p class="hero-subtitle">
				Créez votre annonce, payez et elle sera mise en ligne après modération.<br>Offres de lancement disponibles.
			</p>
			<img class="poilu-jumelles" src={PoiluJumelles} alt="Personnage le poilu avec des jumelles" />
		</div>
	</section>

	<!-- Pricing Section -->
	<section class="pricing-section">
		<div class="section-header">
			<h2 class="section-title">Nos tarifs</h2>
			<p class="section-description">
				Choisissez la formule qui correspond le mieux à vos besoins
			</p>
		</div>

		<div class="pricing-grid">
			{#each pricing as tier}
				<article class="pricing-card" class:recommended={tier.recommended}>
					{#if tier.recommended}
						<div class="badge-recommended">Populaire</div>
					{/if}
					<div class="pricing-icon">
						<i class={tier.icon}></i>
					</div>
					<h3 class="pricing-name">{tier.name}</h3>
					<p class="pricing-price">{tier.price}</p>
					<ul class="pricing-details">
						{#each tier.details as detail}
							<li>{detail}</li>
						{/each}
					</ul>
					<a class="btn-pricing" href="/Telecharger">Commencer</a>
				</article>
			{/each}
		</div>
	</section>

	<!-- How It Works Section -->
	<section class="howto-section">
		<div class="howto-header">
			<h2 class="section-title">Comment ça marche ?</h2>
			<p class="section-description">Quatre étapes simples pour publier votre événement</p>
		</div>

		<div class="steps-grid">
			<div class="step-item">
				<div class="step-number">1</div>
				<h3 class="step-title">Créez votre événement</h3>
				<p class="step-description">Renseignez le titre, la date, le lieu, la description et ajoutez une image.</p>
			</div>

			<div class="step-item">
				<div class="step-number">2</div>
				<h3 class="step-title">Choisissez votre formule</h3>
				<p class="step-description">Sélectionnez l'offre qui correspond à vos besoins et payez en ligne de manière sécurisée.</p>
			</div>

			<div class="step-item">
				<div class="step-number">3</div>
				<h3 class="step-title">Modération rapide</h3>
				<p class="step-description">Notre équipe vérifie votre annonce en moins de 24h (ou en prioritaire avec le Pack 10).</p>
			</div>

			<div class="step-item">
				<div class="step-number">4</div>
				<h3 class="step-title">Publication en ligne</h3>
				<p class="step-description">Votre événement est publié et visible par tous les utilisateurs de l'application.</p>
			</div>
		</div>

		<a href="/Telecharger" class="btn-cta">Publier mon événement</a>
	</section>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
		padding: var(--spacing-xs);
		max-width: var(--desktop);
		margin: 0 auto;
	}

	/* Hero Section */
	.hero {
		background: linear-gradient(135deg, var(--ctaSecondary), #FF6101);
		border-radius: var(--radius-lg);
		height: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		margin-top: var(--spacing-md);
		margin-bottom: 50px;
		padding: var(--spacing-xl) var(--spacing-lg);
		box-shadow: var(--shadow);
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.hero-title {
		color: white;
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-family: var(--FFTitle);
		font-weight: 900;
		margin-bottom: var(--spacing-md);
		text-align: center;
	}

	.hero-subtitle {
		font-weight: 600;
		font-family: var(--FFTitle);
		text-align: center;
		font-size: clamp(1rem, 2.5vw, 1.3rem);
		color: white;
		max-width: 800px;
		line-height: clamp(1.4rem, 3vw, 1.8rem);
		margin-bottom: var(--spacing-lg);
	}

	.poilu-jumelles {
		height: clamp(250px, 40vw, 400px);
		width: auto;
		filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
	}

	/* Pricing Section */
	.pricing-section {
		background: linear-gradient(135deg, var(--background), #FF6101);
		border-radius: var(--radius-lg);
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-xl) var(--spacing-lg);
		box-shadow: var(--shadow);
		margin-bottom: 50px;
	}

	.section-header,
	.howto-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: var(--spacing-xl);
		text-align: center;
	}

	.section-title {
		font-weight: 900;
		font-family: var(--FFTitle);
		font-size: clamp(1.8rem, 4vw, 2.5rem);
		color: var(--textDark);
		margin-bottom: var(--spacing-sm);
	}

	.section-description {
		font-family: var(--FFTitle);
		color: var(--text);
		font-size: clamp(0.95rem, 2vw, 1.1rem);
		font-weight: 500;
		max-width: 800px;
		line-height: clamp(1.4rem, 2.5vw, 1.7rem);
	}

	/* Pricing Grid */
	.pricing-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--spacing-md);
		width: 100%;
		margin-bottom: var(--spacing-md);
	}

	.pricing-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		border-radius: var(--radius-md);
		padding: var(--spacing-lg) var(--spacing-md);
		gap: var(--spacing-md);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background-color: rgba(255, 255, 255, 0.9);
		border: 2px solid rgba(255, 97, 1, 0.2);
		box-shadow: var(--shadow3);
		transition: transform var(--transition-normal), box-shadow var(--transition-normal);
		text-align: center;
		position: relative;
	}

	.pricing-card.recommended {
		border: 2px solid #FF6101;
		transform: scale(1.05);
		background-color: rgba(255, 255, 255, 0.95);
	}

	.pricing-card:hover {
		transform: translateY(-5px);
		box-shadow: var(--shadow2);
	}

	.pricing-card.recommended:hover {
		transform: scale(1.05) translateY(-5px);
	}

	.badge-recommended {
		position: absolute;
		top: -15px;
		left: 50%;
		transform: translateX(-50%);
		background: linear-gradient(135deg, #FF6101, var(--ctaSecondary));
		color: white;
		padding: var(--spacing-xs) var(--spacing-md);
		border-radius: 20px;
		font-family: var(--FFTitle);
		font-weight: 700;
		font-size: clamp(0.75rem, 1.5vw, 0.85rem);
		box-shadow: var(--shadow3);
	}

	.pricing-icon {
		font-size: clamp(2rem, 4vw, 3rem);
		color: #FF6101;
		background: linear-gradient(135deg, rgba(255, 97, 1, 0.1), rgba(232, 132, 60, 0.1));
		width: clamp(80px, 12vw, 100px);
		height: clamp(80px, 12vw, 100px);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: var(--shadow3);
		margin-top: var(--spacing-xs);
	}

	.pricing-name {
		font-family: var(--FFTitle);
		font-weight: 700;
		font-size: clamp(1.2rem, 2.5vw, 1.5rem);
		color: var(--textDark);
		margin: 0;
	}

	.pricing-price {
		font-family: var(--FFTitle);
		font-weight: 900;
		font-size: clamp(1.8rem, 4vw, 2.5rem);
		color: #FF6101;
		margin: var(--spacing-xs) 0;
	}

	.pricing-details {
		list-style: none;
		padding: 0;
		margin: var(--spacing-md) 0;
		flex-grow: 1;
	}

	.pricing-details li {
		font-family: var(--FFTitle);
		color: #555;
		font-size: clamp(0.9rem, 1.8vw, 1rem);
		line-height: 2rem;
		position: relative;
		padding-left: 25px;
	}

	.pricing-details li:before {
		content: "✓";
		position: absolute;
		left: 0;
		color: #FF6101;
		font-weight: bold;
		font-size: clamp(1rem, 2vw, 1.2rem);
	}

	.btn-pricing {
		display: inline-block;
		padding: var(--spacing-sm) var(--spacing-lg);
		background: linear-gradient(135deg, #FF6101, var(--ctaSecondary));
		color: white;
		text-decoration: none;
		font-weight: 700;
		font-size: clamp(1rem, 2vw, 1.1rem);
		border-radius: var(--radius-md);
		transition: all var(--transition-normal);
		font-family: var(--FFTitle);
		text-align: center;
		box-shadow: var(--shadow3);
		border: 2px solid rgba(255, 255, 255, 0.4);
		width: 100%;
	}

	.btn-pricing:hover {
		transform: scale(1.05);
		box-shadow: var(--shadow2);
	}

	/* How It Works Section */
	.howto-section {
		background: linear-gradient(135deg, var(--ctaSecondary), #FF6101);
		border-radius: var(--radius-lg);
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-xl) var(--spacing-lg);
		box-shadow: var(--shadow);
	}

	.howto-header .section-title,
	.howto-header .section-description {
		color: white;
	}

	.steps-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--spacing-md);
		width: 100%;
		margin-bottom: var(--spacing-xl);
	}

	.step-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: var(--spacing-sm);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background-color: rgba(255, 255, 255, 0.15);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: var(--radius-md);
		padding: var(--spacing-md) var(--spacing-md);
		box-shadow: var(--shadow3);
		transition: transform var(--transition-normal), box-shadow var(--transition-normal);
	}

	.step-item:hover {
		transform: translateY(-5px);
		box-shadow: var(--shadow2);
	}

	.step-number {
		font-size: clamp(2rem, 4vw, 2.5rem);
		font-weight: 900;
		background: white;
		color: #FF6101;
		height: clamp(70px, 10vw, 80px);
		width: clamp(70px, 10vw, 80px);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: var(--shadow3);
		border: 2px solid rgba(255, 255, 255, 0.4);
		font-family: var(--FFTitle);
	}

	.step-title {
		font-family: var(--FFTitle);
		font-weight: 700;
		font-size: clamp(1rem, 2vw, 1.2rem);
		color: white;
		margin: 0;
	}

	.step-description {
		font-family: var(--FFTitle);
		color: white;
		font-size: clamp(0.85rem, 1.6vw, 0.95rem);
		line-height: clamp(1.3rem, 2.5vw, 1.5rem);
		opacity: 0.95;
		margin: 0;
	}

	/* CTA Button */
	.btn-cta {
		display: inline-block;
		padding: var(--spacing-md) var(--spacing-xl);
		background: white;
		color: #FF6101;
		text-decoration: none;
		font-weight: 700;
		font-size: clamp(1rem, 2.5vw, 1.2rem);
		border-radius: var(--radius-md);
		transition: all var(--transition-normal);
		font-family: var(--FFTitle);
		text-align: center;
		box-shadow: var(--shadow);
		border: 2px solid rgba(255, 255, 255, 0.4);
		margin-bottom: 50px;
	}

	.btn-cta:hover {
		transform: scale(1.05);
		box-shadow: var(--shadow2);
	}

	/* === MEDIA QUERIES RESPONSIVE === */

	/* Tablet */
	@media (max-width: 1024px) {
		.pricing-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: var(--spacing-md);
		}

		.steps-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	/* Mobile */
	@media (max-width: 768px) {
		main {
			padding: var(--spacing-xs);
			gap: var(--spacing-md);
		}

		.hero {
			padding: var(--spacing-lg) var(--spacing-md);
			margin-top: var(--spacing-md);
		}

		.pricing-section,
		.howto-section {
			padding: var(--spacing-lg) var(--spacing-md);
		}

		.pricing-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-lg);
		}

		.pricing-card.recommended {
			transform: scale(1);
		}

		.pricing-card.recommended:hover {
			transform: translateY(-5px);
		}

		.steps-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-md);
		}

		.btn-cta {
			max-width: 100%;
		}

		.btn-pricing {
			max-width: 100%;
		}
	}

	/* Mobile Small */
	@media (max-width: 480px) {
		main {
			gap: var(--spacing-xl);
		}

		.hero {
			padding: var(--spacing-lg) var(--spacing-md);
			margin-bottom: var(--spacing-xl);
		}

		.pricing-section,
		.howto-section {
			padding: var(--spacing-xl) var(--spacing-md);
			margin-bottom: var(--spacing-xl);
		}

		.pricing-grid {
			gap: var(--spacing-xl);
		}

		.pricing-card {
			padding: var(--spacing-xl) var(--spacing-md);
			gap: var(--spacing-lg);
		}

		.steps-grid {
			gap: var(--spacing-lg);
		}

		.step-item {
			padding: var(--spacing-lg) var(--spacing-md);
			gap: var(--spacing-md);
		}

		.section-header,
		.howto-header {
			margin-bottom: var(--spacing-xl);
		}

		.poilu-jumelles {
			height: 150px;
			width: auto;
			filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
		}
	}
</style>
