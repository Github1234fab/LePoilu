<script>
	import PoiluVillage from '../../lib/assets/Poilu-village.png';
	import PoiluFace from '../../lib/assets/LePoilu-face.png';
</script>

<svelte:head>
	<title>À propos — Le Poilu</title>
	<meta
		name="description"
		content="Le Poilu est une application locale pour découvrir et publier des événements près de chez toi."
	/>
</svelte:head>

<main>
	<!-- Hero Section -->
	<section class="hero">
		<div class="hero-content">
			<h1 class="hero-title">À propos du Poilu</h1>
			<p class="hero-subtitle">
				L'application qui connecte les habitants de l'Ouest Lyonnais aux événements et aux commerçants locaux.
			</p>
			<img class="poilu-face" src={PoiluFace} alt="Personnage le poilu de face" />
		</div>
	</section>

	<!-- Story Section -->
	<section class="story-section">
		<div class="story-content">
			<div class="story-text">
				<h2 class="section-title">Notre histoire</h2>
				<p class="section-description">
					Le Poilu est né d'une envie simple : rendre les sorties locales visibles en un seul média, accessibles à tous et aider les organisateurs à faire connaître leurs événements facilement.
				</p>
				<p class="section-description">
					Nous croyons que la vie locale est riche d'événements, de rencontres et d'activités qui méritent d'être mises en lumière. Notre mission est de créer un pont entre les habitants et leur territoire.
				</p>
			</div>
			<div class="story-image">
				<img src={PoiluVillage} alt="Le Poilu dans un village" />
			</div>
		</div>
	</section>

	<!-- Mission Section -->
	<section class="mission-section">
		<div class="mission-header">
			<h2 class="section-title">Notre mission</h2>
			<p class="section-subtitle">
				Connecter habitants, familles et passionnés à ce qui se passe près de chez eux
			</p>
		</div>

		<div class="mission-grid">
			<div class="mission-card">
				<div class="mission-icon">
					<i class="fa-solid fa-users"></i>
				</div>
				<h3 class="mission-title">Rassembler la communauté</h3>
				<p class="mission-description">
					Créer du lien entre les habitants de l'Ouest Lyonnais en facilitant l'accès aux événements locaux.
				</p>
			</div>

			<div class="mission-card">
				<div class="mission-icon">
					<i class="fa-solid fa-heart"></i>
				</div>
				<h3 class="mission-title">Soutenir l'écosystème local</h3>
				<p class="mission-description">
					Donner de la visibilité aux organisateurs, associations et commerçants de la région.
				</p>
			</div>

			<div class="mission-card">
				<div class="mission-icon">
					<i class="fa-solid fa-rocket"></i>
				</div>
				<h3 class="mission-title">Simplifier la découverte</h3>
				<p class="mission-description">
					Rendre la recherche d'activités aussi simple qu'un scroll, avec des filtres intelligents.
				</p>
			</div>
		</div>
	</section>

	<!-- Contact CTA Section -->
	<section class="contact-cta-section">
		<div class="cta-content">
			<h2 class="cta-title">Une question ? Un partenariat ?</h2>
			<p class="cta-description">
				Pour les partenariats, la presse ou toute autre demande, n'hésitez pas à nous contacter
			</p>
			<a href="/Contact" class="btn-cta">Nous contacter</a>
		</div>
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

	.poilu-face {
		height: clamp(250px, 40vw, 400px);
		width: auto;
		filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
	}

	/* Story Section */
	.story-section {
		background: linear-gradient(135deg, var(--background), #FF6101);
		border-radius: var(--radius-lg);
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-xl) var(--spacing-lg);
		box-shadow: var(--shadow);
	}

	.story-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-xl);
		align-items: center;
		width: 100%;
	}

	.story-text {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.section-title {
		font-weight: 900;
		font-family: var(--FFTitle);
		font-size: clamp(1.8rem, 4vw, 2.5rem);
		color: var(--textDark);
		margin-bottom: var(--spacing-xs);
	}

	.section-description {
		font-family: var(--FFTitle);
		color: var(--text);
		font-size: clamp(0.95rem, 2vw, 1.1rem);
		font-weight: 500;
		line-height: clamp(1.5rem, 3vw, 1.8rem);
		margin: 0;
	}

	.story-image {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.story-image img {
		width: 100%;
		max-width: 500px;
		height: auto;
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow2);
		filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.1));
	}

	/* Mission Section */
	.mission-section {
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

	.mission-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: var(--spacing-xl);
		text-align: center;
	}

	.mission-header .section-title {
		color: white;
	}

	.section-subtitle {
		font-family: var(--FFTitle);
		color: white;
		font-size: clamp(1rem, 2.5vw, 1.2rem);
		font-weight: 600;
		max-width: 800px;
		line-height: clamp(1.5rem, 3vw, 1.8rem);
		margin-top: var(--spacing-xs);
	}

	.mission-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--spacing-md);
		width: 100%;
	}

	.mission-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: var(--spacing-md);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background-color: rgba(255, 255, 255, 0.15);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: var(--radius-md);
		padding: var(--spacing-lg) var(--spacing-md);
		box-shadow: var(--shadow3);
		transition: transform var(--transition-normal), box-shadow var(--transition-normal);
	}

	.mission-card:hover {
		transform: translateY(-5px);
		box-shadow: var(--shadow2);
	}

	.mission-icon {
		font-size: clamp(2rem, 4vw, 3rem);
		color: white;
		background: rgba(255, 255, 255, 0.2);
		width: clamp(80px, 12vw, 100px);
		height: clamp(80px, 12vw, 100px);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: var(--shadow3);
		border: 2px solid rgba(255, 255, 255, 0.4);
	}

	.mission-title {
		font-family: var(--FFTitle);
		font-weight: 700;
		font-size: clamp(1.1rem, 2.5vw, 1.4rem);
		color: white;
		margin: 0;
	}

	.mission-description {
		font-family: var(--FFTitle);
		color: white;
		font-size: clamp(0.9rem, 1.8vw, 1rem);
		line-height: clamp(1.4rem, 2.5vw, 1.6rem);
		opacity: 0.95;
		margin: 0;
	}

	/* Contact CTA Section */
	.contact-cta-section {
		background: linear-gradient(135deg, var(--background), #FF6101);
		border-radius: var(--radius-lg);
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-xl) var(--spacing-lg);
		box-shadow: var(--shadow);
	}

	.cta-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: var(--spacing-md);
	}

	.cta-title {
		font-family: var(--FFTitle);
		font-weight: 900;
		font-size: clamp(1.8rem, 4vw, 2.5rem);
		color: var(--textDark);
		margin: 0;
	}

	.cta-description {
		font-family: var(--FFTitle);
		color: var(--text);
		font-size: clamp(1rem, 2.5vw, 1.2rem);
		font-weight: 500;
		max-width: 700px;
		line-height: clamp(1.5rem, 3vw, 1.8rem);
		margin: 0 0 var(--spacing-md) 0;
	}

	.btn-cta {
		display: inline-block;
		padding: var(--spacing-md) var(--spacing-xl);
		background: linear-gradient(135deg, #FF6101, var(--ctaSecondary));
		color: white;
		text-decoration: none;
		font-weight: 700;
		font-size: clamp(1rem, 2.5vw, 1.2rem);
		border-radius: var(--radius-md);
		transition: all var(--transition-normal);
		font-family: var(--FFTitle);
		text-align: center;
		box-shadow: var(--shadow);
		border: 2px solid rgba(255, 255, 255, 0.4);
	}

	.btn-cta:hover {
		transform: scale(1.05);
		box-shadow: var(--shadow2);
	}

	/* === MEDIA QUERIES RESPONSIVE === */

	/* Tablet */
	@media (max-width: 1024px) {
		.story-content {
			grid-template-columns: 1fr;
			gap: var(--spacing-lg);
		}

		.mission-grid {
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

		.story-section,
		.mission-section,
		.contact-cta-section {
			padding: var(--spacing-lg) var(--spacing-md);
		}

		.story-content {
			grid-template-columns: 1fr;
			gap: var(--spacing-lg);
		}

		.story-image img {
			max-width: 100%;
		}

		.mission-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-md);
		}

		.btn-cta {
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

		.story-section,
		.mission-section,
		.contact-cta-section {
			padding: var(--spacing-xl) var(--spacing-md);
			margin-bottom: var(--spacing-xl);
		}

		.story-content {
			gap: var(--spacing-xl);
		}

		.story-text {
			gap: var(--spacing-lg);
		}

		.mission-header {
			margin-bottom: var(--spacing-xl);
		}

		.mission-grid {
			gap: var(--spacing-lg);
		}

		.mission-card {
			padding: var(--spacing-lg) var(--spacing-md);
			gap: var(--spacing-md);
		}

		.cta-content {
			gap: var(--spacing-lg);
		}

		.poilu-face {
			height: 150px;
			width: auto;
		}
	}
</style>
