<script>
	import PoiluJumelles from '../../lib/assets/Poilu-jumelles.png';

	const pricing = [
		{
			name: 'À l\'unité',
			price: '4,99 €',
			details: ['1 annonce', 'Modération standard (< 24h)', 'Visible 30 jours'],
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
		gap: 40px;
		padding: 10px;
		max-width: 1200px;
		margin: 0 auto;
	}

	/* Hero Section */
	.hero {
		background: linear-gradient(135deg, var(--ctaSecondary), #FF6101);
		border-radius: 18px;
		height: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		margin-top: 30px;
		padding: 60px 40px;
		box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.293);
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
		font-size: 3.5rem;
		font-family: var(--FFTitle);
		font-weight: 900;
		margin-bottom: 20px;
		text-align: center;
	}

	.hero-subtitle {
		font-weight: 600;
		font-family: var(--FFTitle);
		text-align: center;
		font-size: 1.3rem;
		color: white;
		max-width: 800px;
		line-height: 1.8rem;
		margin-bottom: 40px;
	}

	.poilu-jumelles {
		height: 400px;
		width: auto;
		filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
	}

	/* Pricing Section */
	.pricing-section {
		background: linear-gradient(135deg, var(--background), #FF6101);
		border-radius: 18px;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 60px 40px;
		box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.293);
	}

	.section-header,
	.howto-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: 50px;
		text-align: center;
	}

	.section-title {
		font-weight: 900;
		font-family: var(--FFTitle);
		font-size: 2.5rem;
		color: #2b2b2b;
		margin-bottom: 15px;
	}

	.section-description {
		font-family: var(--FFTitle);
		color: #333;
		font-size: 1.1rem;
		font-weight: 500;
		max-width: 800px;
		line-height: 1.7rem;
	}

	/* Pricing Grid */
	.pricing-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		width: 100%;
		margin-bottom: 20px;
	}

	.pricing-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		border-radius: 16px;
		padding: 40px 30px;
		gap: 20px;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background-color: rgba(255, 255, 255, 0.9);
		border: 2px solid rgba(255, 97, 1, 0.2);
		box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
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
		box-shadow: 0 12px 40px 0 rgba(255, 97, 1, 0.3);
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
		padding: 8px 20px;
		border-radius: 20px;
		font-family: var(--FFTitle);
		font-weight: 700;
		font-size: 0.85rem;
		box-shadow: 0 4px 12px rgba(255, 97, 1, 0.4);
	}

	.pricing-icon {
		font-size: 3rem;
		color: #FF6101;
		background: linear-gradient(135deg, rgba(255, 97, 1, 0.1), rgba(232, 132, 60, 0.1));
		width: 100px;
		height: 100px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 16px rgba(255, 97, 1, 0.2);
		margin-top: 10px;
	}

	.pricing-name {
		font-family: var(--FFTitle);
		font-weight: 700;
		font-size: 1.5rem;
		color: #2b2b2b;
		margin: 0;
	}

	.pricing-price {
		font-family: var(--FFTitle);
		font-weight: 900;
		font-size: 2.5rem;
		color: #FF6101;
		margin: 10px 0;
	}

	.pricing-details {
		list-style: none;
		padding: 0;
		margin: 20px 0;
		flex-grow: 1;
	}

	.pricing-details li {
		font-family: var(--FFTitle);
		color: #555;
		font-size: 1rem;
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
		font-size: 1.2rem;
	}

	.btn-pricing {
		display: inline-block;
		padding: 14px 35px;
		background: linear-gradient(135deg, #FF6101, var(--ctaSecondary));
		color: white;
		text-decoration: none;
		font-weight: 700;
		font-size: 1.1rem;
		border-radius: 12px;
		transition: all 0.3s ease;
		font-family: var(--FFTitle);
		text-align: center;
		box-shadow: 0 6px 20px rgba(255, 97, 1, 0.3);
		border: 2px solid rgba(255, 255, 255, 0.4);
		width: 100%;
	}

	.btn-pricing:hover {
		transform: scale(1.05);
		box-shadow: 0 8px 28px rgba(255, 97, 1, 0.4);
	}

	/* How It Works Section */
	.howto-section {
		background: linear-gradient(135deg, var(--ctaSecondary), #FF6101);
		border-radius: 18px;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 60px 40px;
		box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.293);
	}

	.howto-header .section-title,
	.howto-header .section-description {
		color: white;
	}

	.steps-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 2rem;
		width: 100%;
		margin-bottom: 50px;
	}

	.step-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 15px;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background-color: rgba(255, 255, 255, 0.15);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 16px;
		padding: 30px 20px;
		box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.step-item:hover {
		transform: translateY(-5px);
		box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.25);
	}

	.step-number {
		font-size: 2.5rem;
		font-weight: 900;
		background: white;
		color: #FF6101;
		height: 80px;
		width: 80px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
		border: 2px solid rgba(255, 255, 255, 0.4);
		font-family: var(--FFTitle);
	}

	.step-title {
		font-family: var(--FFTitle);
		font-weight: 700;
		font-size: 1.2rem;
		color: white;
		margin: 0;
	}

	.step-description {
		font-family: var(--FFTitle);
		color: white;
		font-size: 0.95rem;
		line-height: 1.5rem;
		opacity: 0.95;
		margin: 0;
	}

	/* CTA Button */
	.btn-cta {
		display: inline-block;
		padding: 18px 50px;
		background: white;
		color: #FF6101;
		text-decoration: none;
		font-weight: 700;
		font-size: 1.2rem;
		border-radius: 12px;
		transition: all 0.3s ease;
		font-family: var(--FFTitle);
		text-align: center;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
		border: 2px solid rgba(255, 255, 255, 0.4);
	}

	.btn-cta:hover {
		transform: scale(1.05);
		box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
	}

	/* Responsive Design */
	@media (max-width: 900px) {
		main {
			padding: 10px;
			gap: 30px;
		}

		.hero {
			padding: 40px 20px;
			margin-top: 20px;
		}

		.hero-title {
			font-size: 2.5rem;
		}

		.hero-subtitle {
			font-size: 1.1rem;
			line-height: 1.6rem;
		}

		.poilu-jumelles {
			height: 250px;
		}

		.pricing-section,
		.howto-section {
			padding: 40px 20px;
		}

		.section-title {
			font-size: 2rem;
		}

		.section-description {
			font-size: 1rem;
			line-height: 1.5rem;
		}

		.pricing-grid {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}

		.pricing-card.recommended {
			transform: scale(1);
		}

		.pricing-card.recommended:hover {
			transform: translateY(-5px);
		}

		.steps-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.btn-cta {
			padding: 16px 40px;
			font-size: 1.1rem;
		}
	}

	@media (min-width: 901px) and (max-width: 1200px) {
		.pricing-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.steps-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
