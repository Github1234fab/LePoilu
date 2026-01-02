<script>
	import PoiluJumelles from '../../lib/assets/Poilu-jumelles.png';
</script>

<svelte:head>
	<title>Fonctionnalités — Le Poilu</title>
	<meta
		name="description"
		content="Filtres avancés, publication d'événements, alertes, cartes et plus dans l'application Le Poilu."
	/>
</svelte:head>

<main>
	<!-- Hero Section -->
	<section class="hero">
		<div class="hero-content">
			<h1 class="hero-title">Toutes les fonctionnalités</h1>
			<p class="hero-subtitle">
				Le Poilu vous aide à trouver des idées sorties locales et à publier vos propres événements en quelques minutes.
			</p>
			<img class="poilu-jumelles" src={PoiluJumelles} alt="Personnage le poilu avec des jumelles" />
		</div>
	</section>

	<!-- Features Grid Section -->
	<section class="features-section">
		<div class="section-header">
			<h2 class="section-title">Découvre toutes les fonctionnalités</h2>
			<p class="section-description">
				Trouve toutes les infos utiles de ta région. Heures d'ouvertures des commerçants, la localisation des marchés, des bibliothèques, des parcs, des salles de sport et bien plus encore.
			</p>
		</div>

		<div class="features-grid">
			<article class="feature-card">
				<div class="feature-icon">
					<i class="fa-solid fa-sliders"></i>
				</div>
				<h3 class="feature-title">Recherche et filtres</h3>
				<div class="feature-content">
					<ul>
						<li>Ville, dates, catégories</li>
						<li>Gratuit, famille</li>
						<li>Tri par pertinence et proximité</li>
					</ul>
				</div>
			</article>

			<article class="feature-card">
				<div class="feature-icon">
					<i class="fa-solid fa-bullhorn"></i>
				</div>
				<h3 class="feature-title">Publication express</h3>
				<div class="feature-content">
					<p>Créer → payer → modération → en ligne.<br><br>Simple et clair.</p>
				</div>
			</article>

			<article class="feature-card">
				<div class="feature-icon">
					<i class="fa-solid fa-bell"></i>
				</div>
				<h3 class="feature-title">Alertes et favoris</h3>
				<div class="feature-content">
					<p>Soyez notifié quand un événement vous correspond.<br><br>Sauvegardez vos événements préférés.</p>
				</div>
			</article>

			<article class="feature-card">
				<div class="feature-icon">
					<i class="fa-solid fa-map-location-dot"></i>
				</div>
				<h3 class="feature-title">Cartes & itinéraires</h3>
				<div class="feature-content">
					<p>Visualisez rapidement l'emplacement et accédez au trajet.<br><br>Navigation GPS intégrée.</p>
				</div>
			</article>

			<article class="feature-card">
				<div class="feature-icon">
					<i class="fa-solid fa-heart"></i>
				</div>
				<h3 class="feature-title">Likes et partages</h3>
				<div class="feature-content">
					<p>Like tes événements favoris.<br><br>Partage-les avec tes amis sur les réseaux sociaux.</p>
				</div>
			</article>

			<article class="feature-card">
				<div class="feature-icon">
					<i class="fa-solid fa-info-circle"></i>
				</div>
				<h3 class="feature-title">Infos pratiques</h3>
				<div class="feature-content">
					<p>Horaires des commerces, marchés, bibliothèques, parcs, salles de sport.<br><br>Tout ce dont tu as besoin.</p>
				</div>
			</article>
		</div>

		<a href="/Telecharger" class="btn-cta">Essayez l'app</a>
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

	/* Features Section */
	.features-section {
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

	.section-header {
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

	/* Features Grid */
	.features-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		width: 100%;
		margin-bottom: 50px;
	}

	.feature-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		border-radius: 16px;
		padding: 30px;
		gap: 20px;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background-color: rgba(255, 255, 255, 0.9);
		border: 1px solid rgba(255, 97, 1, 0.2);
		box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		text-align: center;
		min-height: 300px;
	}

	.feature-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 12px 40px 0 rgba(255, 97, 1, 0.3);
	}

	.feature-icon {
		font-size: 2.5rem;
		color: #FF6101;
		background: linear-gradient(135deg, rgba(255, 97, 1, 0.1), rgba(232, 132, 60, 0.1));
		width: 80px;
		height: 80px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 16px rgba(255, 97, 1, 0.2);
	}

	.feature-title {
		font-family: var(--FFTitle);
		font-weight: 700;
		font-size: 1.3rem;
		color: #2b2b2b;
		margin: 0;
	}

	.feature-content {
		font-family: var(--FFTitle);
		color: #555;
		font-size: 1rem;
		line-height: 1.6rem;
		flex-grow: 1;
	}

	.feature-content p {
		margin: 0;
	}

	.feature-content ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.feature-content ul li {
		margin-bottom: 8px;
		position: relative;
		padding-left: 20px;
	}

	.feature-content ul li:before {
		content: "✓";
		position: absolute;
		left: 0;
		color: #FF6101;
		font-weight: bold;
	}

	/* CTA Button */
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

		.poilu-jumelles {
			height: 250px;
		}

		.features-section {
			padding: 40px 20px;
		}

		.section-title {
			font-size: 2rem;
		}

		.section-description {
			font-size: 1rem;
			line-height: 1.5rem;
		}

		.features-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.feature-card {
			min-height: auto;
		}

		.btn-cta {
			padding: 16px 40px;
			font-size: 1.1rem;
		}
	}

	@media (min-width: 901px) and (max-width: 1200px) {
		.features-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
