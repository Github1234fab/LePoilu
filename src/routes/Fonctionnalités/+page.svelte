<script>
	import PoiluJumelles from '../../lib/assets/Poilu-outils.png';
	import MockupIphone from '../../lib/assets/Mockup-iphone-lePoilu.jpg';
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
				Le Poilu t'aide à trouver des idées de sorties locales et à publier tes propres événements,
				en quelques minutes.
			</p>
			<img class="poilu-jumelles" src={PoiluJumelles} alt="Personnage le poilu avec des jumelles" />
		</div>
	</section>

	<!-- App Preview Section -->
	<section class="app-preview">
		<h2 class="app-preview-title">L'application en action</h2>
		<img src={MockupIphone} alt="Aperçu de l'application Le Poilu sur iPhone" class="mockup-image" />
	</section>

	<!-- Features Grid Section -->
	<section class="features-section">
		<div class="section-header">
			<h2 class="section-title">Découvre toutes les fonctionnalités</h2>
			<p class="section-description">
				Trouve des idées de sorties locales et publie tes propres événements, en quelques minutes.
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
					<p>Créer → payer → modération → en ligne.<br /><br />Simple et clair.</p>
				</div>
			</article>

			<!-- <article class="feature-card">
				<div class="feature-icon">
					<i class="fa-solid fa-bell"></i>
				</div>
				<h3 class="feature-title">Favoris</h3>
				<div class="feature-content">
					<p>
						Marque tes évènements préférés comme favoris et retrouve les dans ton espace, après avoir créé ton compte. Tu pourras aussi les partager.
					</p>
				</div>
			</article> -->

			<article class="feature-card">
				<div class="feature-icon">
					<i class="fa-solid fa-map-location-dot"></i>
				</div>
				<h3 class="feature-title">Localisation & Itinéraires</h3>
				<div class="feature-content">
					<p>
						Visualise l'emplacement de chaque événement et obtient l'itinéraire en un clic avec ton
						app de navigation préférée. Tu cliques sur le lieu de l'événement et ton application de
						navigation s'ouvre avec l'itinéraire.
					</p>
				</div>
			</article>

			<article class="feature-card">
				<div class="feature-icon">
					<i class="fa-solid fa-heart"></i>
				</div>
				<h3 class="feature-title">Likes et partages</h3>
				<div class="feature-content">
					<p>
						Like tes événements favoris.<br /><br />Partage-les avec tes amis sur les réseaux
						sociaux.
					</p>
				</div>
			</article>

			<!-- <article class="feature-card">
				<div class="feature-icon">
					<i class="fa-solid fa-info-circle"></i>
				</div>
				<h3 class="feature-title">Infos pratiques</h3>
				<div class="feature-content">
					<p>
						Horaires des commerces, marchés, bibliothèques, parcs, salles de sport.<br /><br />Tout
						ce dont tu as besoin.
					</p>
				</div>
			</article> -->
		</div>

		<!-- Professional Section -->
		<div id="pro" class="section-header" style="margin-top: var(--spacing-xxl);">
			<h2 class="section-title">Espace Professionnels</h2>
			<p class="section-description">
				Des outils dédiés pour simplifier la gestion de vos événements.
			</p>
		</div>

		<div class="features-grid" style="grid-template-columns: 1fr; max-width: 700px;">
			<article class="feature-card" style="min-height: auto; padding: var(--spacing-lg);">
				<div class="feature-icon">
					<i class="fa-solid fa-file-csv"></i>
				</div>
				<h3 class="feature-title">Import de masse</h3>
				<div class="feature-content">
					<p>
						Vous êtes une mairie, un office de tourisme ou un organisateur ?<br />
						Gagnez du temps en publiant tous vos événements en une seule fois grâce à notre modèle CSV
						standardisé.
					</p>
					<a
						href="/modele_import_annonces.xlsx"
						download="modele_import_annonces.xlsx"
						class="btn-download"
					>
						<i class="fa-solid fa-download"></i> Télécharger le modèle
					</a>
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
		gap: var(--spacing-xl);
		padding: var(--spacing-sm);
		max-width: var(--desktop);
		margin: 0 auto;
	}

	/* Hero Section */
	.hero {
		background: linear-gradient(135deg, var(--ctaSecondary), #ff6101);
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
		line-height: 1.2;
	}

	.hero-subtitle {
		font-weight: 600;
		font-family: var(--FFTitle);
		text-align: center;
		font-size: clamp(1.1rem, 2.5vw, 1.3rem);
		color: white;
		max-width: 800px;
		line-height: 1.6;
		margin-bottom: var(--spacing-xl);
	}

	.poilu-jumelles {
		height: clamp(200px, 35vw, 400px);
		width: auto;
		filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
		transition: transform var(--transition-normal);

		bottom: 5px;
	}

	.poilu-jumelles:hover {
		transform: scale(1.05);
	}

	/* App Preview Section */
	.app-preview {
		background: linear-gradient(135deg, var(--cta), #1a1a2e);
		border-radius: var(--radius-lg);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: var(--spacing-xl) var(--spacing-lg);
		box-shadow: var(--shadow);
	}

	.app-preview-title {
		color: white;
		font-family: var(--FFTitle);
		font-size: clamp(1.8rem, 4vw, 2.5rem);
		font-weight: 900;
		margin-bottom: var(--spacing-lg);
		text-align: center;
	}

	.mockup-image {
		max-width: 100%;
		height: auto;
		border-radius: var(--radius-md);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
	}

	/* Features Section */
	.features-section {
		background: linear-gradient(135deg, var(--background), #ff6101);
		border-radius: var(--radius-lg);
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-xl) var(--spacing-lg);
		box-shadow: var(--shadow);
	}

	.section-header {
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
		line-height: 1.3;
	}

	.section-description {
		font-family: var(--FFTitle);
		color: #333;
		font-size: clamp(1rem, 2vw, 1.1rem);
		font-weight: 500;
		max-width: 800px;
		line-height: 1.7;
	}

	/* Features Grid */
	.features-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--spacing-md);
		width: 100%;
		margin-bottom: var(--spacing-xl);
	}

	.feature-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		border-radius: var(--radius-md);
		padding: var(--spacing-md);
		gap: var(--spacing-md);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background-color: rgba(255, 255, 255, 0.9);
		border: 1px solid rgba(255, 97, 1, 0.2);
		box-shadow: var(--shadow3);
		transition: all var(--transition-normal);
		text-align: center;
		min-height: 300px;
	}

	.feature-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 12px 40px 0 rgba(255, 97, 1, 0.3);
	}

	.feature-icon {
		font-size: clamp(2rem, 4vw, 2.5rem);
		color: #ff6101;
		background: linear-gradient(135deg, rgba(255, 97, 1, 0.1), rgba(232, 132, 60, 0.1));
		width: 80px;
		height: 80px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 16px rgba(255, 97, 1, 0.2);
		transition: transform var(--transition-normal);
	}

	.feature-card:hover .feature-icon {
		transform: scale(1.1);
	}

	.feature-title {
		font-family: var(--FFTitle);
		font-weight: 700;
		font-size: clamp(1.1rem, 2vw, 1.3rem);
		color: var(--textDark);
		margin: 0;
	}

	.feature-content {
		font-family: var(--FFTitle);
		color: #555;
		font-size: clamp(0.95rem, 1.5vw, 1rem);
		line-height: 1.6;
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
		margin-bottom: var(--spacing-xs);
		position: relative;
		padding-left: var(--spacing-md);
	}

	.feature-content ul li:before {
		content: '✓';
		position: absolute;
		left: 0;
		color: #ff6101;
		font-weight: bold;
	}

	/* CTA Button */
	.btn-cta {
		display: inline-block;
		padding: 18px 50px;
		background-color: var(--cta);
		color: white;
		text-decoration: none;
		font-weight: 700;
		font-size: clamp(1.1rem, 2vw, 1.2rem);
		border-radius: var(--radius-md);
		transition: all var(--transition-normal);
		font-family: var(--FFTitle);
		text-align: center;
		box-shadow: 0 8px 24px rgba(23, 23, 23, 0.362);
		margin-bottom: 50px;
	}

	.btn-cta:hover {
		transform: scale(1.05);
		box-shadow: 0 12px 32px rgba(255, 97, 1, 0.4);
	}

	/* ===================================
	   MEDIA QUERIES RESPONSIVE
	   =================================== */

	/* Tablet: 1024px et moins */
	@media (max-width: 1024px) {
		.features-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.hero {
			padding: var(--spacing-lg) var(--spacing-md);
		}

		.features-section {
			padding: var(--spacing-lg) var(--spacing-md);
		}
	}

	/* Mobile: 768px et moins */
	@media (max-width: 768px) {
		main {
			padding: var(--spacing-xs);
			gap: var(--spacing-md);
		}

		.hero {
			padding: var(--spacing-md) var(--spacing-sm);
			margin-top: var(--spacing-sm);
			border-radius: var(--radius-md);
		}

		.features-section {
			padding: var(--spacing-md) var(--spacing-sm);
			border-radius: var(--radius-md);
		}

		.section-header {
			margin-bottom: var(--spacing-md);
		}

		.features-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-sm);
			margin-bottom: var(--spacing-md);
		}

		.feature-card {
			min-height: auto;
			padding: var(--spacing-sm);
		}

		.feature-icon {
			width: 70px;
			height: 70px;
		}

		.btn-cta {
			padding: 16px 40px;
			width: 100%;
			max-width: 300px;
		}
	}

	/* Mobile Small: 480px et moins */
	@media (max-width: 480px) {
		.hero {
			padding: 20px;
			border-radius: var(--radius-sm);
		}
		.hero-title {
			margin-top: 20px;
			margin-bottom: 50px;
		}
		.section-title {
			margin-top: 50px;
			margin-bottom: 50px;
		}
		.section-description {
			margin-top: 0px;
			margin-bottom: 50px;
		}
		.features-section {
			padding: var(--spacing-sm);
			border-radius: var(--radius-sm);
		}

		.feature-card {
			gap: var(--spacing-sm);
		}

		.feature-icon {
			width: 60px;
			height: 60px;
		}

		.btn-cta {
			padding: 14px 30px;
			margin-top: 50px;
		}
	}
	/* Download Button */
	.btn-download {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		margin-top: var(--spacing-md);
		padding: 12px 30px;
		background-color: var(--ctaSecondary); /* Using secondary color for resource download */
		color: white;
		text-decoration: none;
		font-weight: 600;
		border-radius: var(--radius-md);
		transition: all var(--transition-normal);
		font-family: var(--FFTitle);
	}

	.btn-download:hover {
		background-color: #e55a00; /* Slightly darker shade */
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}
</style>
