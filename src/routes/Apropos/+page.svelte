<script>
	import PoiluVillage from '../../lib/assets/Poilu-village.png';
	import PoiluFace from '../../lib/assets/LePoilu-face.png';
</script>

<svelte:head>
	<title>À propos — Le Poilu</title>
	<meta
		name="description"
		content="Le Poilu est une application locale pour découvrir et publier des événements près de chez vous."
	/>
</svelte:head>

<main>
	<!-- Hero Section -->
	<section class="hero">
		<div class="hero-content">
			<h1 class="hero-title">À propos du Poilu</h1>
			<p class="hero-subtitle">
				L'application qui connecte les habitants de l'Ouest Lyonnais avec les événements locaux
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
				<img src={PoiluVillage} alt="Village du Poilu" />
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

	.poilu-face {
		height: 400px;
		width: auto;
		filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
	}

	/* Story Section */
	.story-section {
		background: linear-gradient(135deg, var(--background), #FF6101);
		border-radius: 18px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 60px 40px;
		box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.293);
	}

	.story-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 60px;
		align-items: center;
		width: 100%;
	}

	.story-text {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.section-title {
		font-weight: 900;
		font-family: var(--FFTitle);
		font-size: 2.5rem;
		color: #2b2b2b;
		margin-bottom: 10px;
	}

	.section-description {
		font-family: var(--FFTitle);
		color: #333;
		font-size: 1.1rem;
		font-weight: 500;
		line-height: 1.8rem;
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
		border-radius: 18px;
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
		filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.1));
	}

	/* Mission Section */
	.mission-section {
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

	.mission-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: 50px;
		text-align: center;
	}

	.mission-header .section-title {
		color: white;
	}

	.section-subtitle {
		font-family: var(--FFTitle);
		color: white;
		font-size: 1.2rem;
		font-weight: 600;
		max-width: 800px;
		line-height: 1.8rem;
		margin-top: 10px;
	}

	.mission-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		width: 100%;
	}

	.mission-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 20px;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background-color: rgba(255, 255, 255, 0.15);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 16px;
		padding: 40px 30px;
		box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.mission-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.25);
	}

	.mission-icon {
		font-size: 3rem;
		color: white;
		background: rgba(255, 255, 255, 0.2);
		width: 100px;
		height: 100px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
		border: 2px solid rgba(255, 255, 255, 0.4);
	}

	.mission-title {
		font-family: var(--FFTitle);
		font-weight: 700;
		font-size: 1.4rem;
		color: white;
		margin: 0;
	}

	.mission-description {
		font-family: var(--FFTitle);
		color: white;
		font-size: 1rem;
		line-height: 1.6rem;
		opacity: 0.95;
		margin: 0;
	}

	/* Contact CTA Section */
	.contact-cta-section {
		background: linear-gradient(135deg, var(--background), #FF6101);
		border-radius: 18px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 80px 40px;
		box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.293);
	}

	.cta-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 20px;
	}

	.cta-title {
		font-family: var(--FFTitle);
		font-weight: 900;
		font-size: 2.5rem;
		color: #2b2b2b;
		margin: 0;
	}

	.cta-description {
		font-family: var(--FFTitle);
		color: #333;
		font-size: 1.2rem;
		font-weight: 500;
		max-width: 700px;
		line-height: 1.8rem;
		margin: 0 0 20px 0;
	}

	.btn-cta {
		display: inline-block;
		padding: 18px 50px;
		background: linear-gradient(135deg, #FF6101, var(--ctaSecondary));
		color: white;
		text-decoration: none;
		font-weight: 700;
		font-size: 1.2rem;
		border-radius: 12px;
		transition: all 0.3s ease;
		font-family: var(--FFTitle);
		text-align: center;
		box-shadow: 0 8px 24px rgba(255, 97, 1, 0.3);
		border: 2px solid rgba(255, 255, 255, 0.4);
	}

	.btn-cta:hover {
		transform: scale(1.05);
		box-shadow: 0 12px 32px rgba(255, 97, 1, 0.4);
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

		.poilu-face {
			height: 250px;
		}

		.story-section,
		.mission-section,
		.contact-cta-section {
			padding: 40px 20px;
		}

		.story-content {
			grid-template-columns: 1fr;
			gap: 40px;
		}

		.story-image img {
			max-width: 100%;
		}

		.section-title {
			font-size: 2rem;
		}

		.section-description {
			font-size: 1rem;
			line-height: 1.6rem;
		}

		.mission-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.cta-title {
			font-size: 2rem;
		}

		.cta-description {
			font-size: 1rem;
			line-height: 1.6rem;
		}

		.btn-cta {
			padding: 16px 40px;
			font-size: 1.1rem;
		}
	}

	@media (min-width: 901px) and (max-width: 1200px) {
		.mission-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}
</style>
