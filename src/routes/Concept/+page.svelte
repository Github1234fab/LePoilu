<script>
	import PoiluOutils from '../../lib/assets/Poilu-outils.png';
	import MockupIphone from '../../lib/assets/Mockup-iphone-lePoilu.jpg';
	import { fade } from 'svelte/transition';
</script>

<svelte:head>
	<title>Le Concept — Le Poilu</title>
	<meta
		name="description"
		content="Découvre le concept du Poilu : agenda local, bons plans vitrines, et solutions professionnelles pour booster ta visibilité."
	/>
</svelte:head>

<main>
	<!-- HERO SECTION -->
	<section class="features-hero">
		<div class="hero-content">
			<div class="hero-text">
				<h1 class="hero-title">Des outils pour une vie locale utile et pratique.</h1>
				<p class="hero-subtitle">
					Que tu cherches la prochaine fête de village ou que tu cherches à booster ton commerce local, Le Poilu est ton compagnon de confiance.
				</p>
			</div>
			<div class="hero-image">
				<img class="poilu-tools" src={PoiluOutils} alt="Personnage le poilu avec ses outils" />
			</div>
		</div>
	</section>

	<!-- DUALITY TABS/SECTIONS -->
	<section class="dual-features">
		<div class="container">
			<!-- SEGMENT 1: POUR LA TRIBU -->
			<div class="feature-segment tribu-segment">
				<header class="segment-header">
					<span class="segment-badge">ÉVÈNEMENTS</span>
					<h2>Ne manque plus aucun événement autour de toi.</h2>
					<p>L'application indispensable pour profiter de l'Ouest Lyonnais.</p>
				</header>

				<div class="features-grid">
					<article class="feature-item">
						<div class="icon-box"><i class="fa-solid fa-calendar-day"></i></div>
						<h3>Agenda Temps Réel</h3>
						<p>Retrouve tous les événements classés par date et par proximité.</p>
					</article>

					<article class="feature-item">
						<div class="icon-box"><i class="fa-solid fa-filter"></i></div>
						<h3>Filtres Intelligents</h3>
						<p>Cherche par catégorie (Concert, Sport, Marché) ou par public (En famille, Gratuit).</p>
					</article>

					<article class="feature-item">
						<div class="icon-box"><i class="fa-solid fa-map-location-dot"></i></div>
						<h3>Itinéraires Directs</h3>
						<p>D'un clic, lance ton GPS vers le lieu de l'événement, tu peux aussi accéder à la billeterie et le lien de ton annonceur si son annonce est boostée.</p>
					</article>

					<!-- <article class="feature-item">
						<div class="icon-box"><i class="fa-solid fa-bookmark"></i></div>
						<h3>Favoris & Alertes</h3>
						<p>Gardez vos pépites de côté pour ne pas oublier la date.</p>
					</article> -->
				</div>
			</div>

			<hr class="separator" />

			<!-- SEGMENT 2: POUR LES PROS -->
			<div class="feature-segment pro-segment">
				<header class="segment-header">
					<span class="segment-badge pro">LES BONS PLANS</span>
					<h2>Donne de l'élan à ton activité.</h2>
					<p>Annonces ciblées ou vitrine permanente : le choix t'appartient.</p>
				</header>

				<div class="features-grid">
					<article class="feature-item">
						<div class="icon-box pro"><i class="fa-solid fa-store"></i></div>
						<h3>Ta Vitrine Digitale</h3>
						<p>Crée ta vitrine pour que le Poilu t'indexe dans ses bons plans.</p>
					</article>

					<article class="feature-item">
						<div class="icon-box pro"><i class="fa-solid fa-bullhorn"></i></div>
						<h3>Publie ton offre</h3>
						<p>La tribu du Poilu bénéficiera de ton offre en te présentant l'appli.</p>
					</article>

					<article class="feature-item">
						<div class="icon-box pro"><i class="fa-solid fa-chart-line"></i></div>
						<h3>Statistiques d'Audience</h3>
						<p>Suis le nombre de vues et de clics sur ta vitrine.</p>
					</article>
<!-- 
					<article class="feature-item">
						<div class="icon-box pro"><i class="fa-solid fa-file-csv"></i></div>
						<h3>Import de masse</h3>
						<p>Mairies & OT : importez tout votre calendrier via nos modèles Excel/CSV.</p>
					</article> -->
				</div>
				
				<div class="pro-action">
					<a href="/carnet/rejoindre" class="btn-pro">Création de vitrine</a>
				</div>
			</div>
		</div>
	</section>

	<!-- MOBILE PREVIEW -->
	<section class="app-display">
		<div class="display-container">
			<div class="display-text">
				<h2>L'expérience mobile à 100%</h2>
				<p>Rapide, fluide et sans publicité parasite. Le Poilu a été conçu pour l'efficacité au creux de ta main.</p>
				<div class="store-links">
					<a href="/Telecharger" class="btn-store">Télécharger l'App</a>
				</div>
			</div>
			<div class="display-visual">
				<img src={MockupIphone} alt="App Le Poilu sur Smartphone" class="mockup" />
			</div>
		</div>
	</section>
</main>

<style>
	main {
		overflow-x: hidden;
	}

	.container {
		max-width: 1100px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	/* HERO */
	.features-hero {
		background: linear-gradient(135deg, #ff6101 0%, #e8843c 100%);
		color: white;
		padding: 6rem 1.5rem 8rem;
		border-radius: 0 0 60px 60px;
		margin-bottom: 4rem;
	}

	.hero-content {
		max-width: 1200px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		gap: 3rem;
	}

	.hero-title {
		font-family: var(--FFTitle);
		font-size: clamp(2.5rem, 6vw, 3.5rem);
		font-weight: 900;
		line-height: 1.1;
		margin-bottom: 2rem;
	}

	.hero-subtitle {
		font-size: 1.25rem;
		opacity: 0.95;
		max-width: 500px;
		line-height: 1.6;
	}

	.poilu-tools {
		width: 100%;
		max-width: 400px;
		filter: drop-shadow(0 20px 40px rgba(0,0,0,0.2));
	}

	/* SEGMENTS */
	.feature-segment {
		padding: 4rem 0;
	}

	.segment-header {
		text-align: center;
		margin-bottom: 4rem;
	}

	.segment-badge {
		display: inline-block;
		padding: 0.4rem 1.2rem;
		border-radius: 50px;
		font-weight: 800;
		font-size: 0.75rem;
		margin-bottom: 1rem;
		background: rgba(255, 97, 1, 0.1);
		color: #ff6101;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.segment-badge.pro {
		background: rgba(67, 56, 202, 0.1);
		color: #4338ca;
	}

	.segment-header h2 {
		font-family: var(--FFTitle);
		font-size: 2.2rem;
		font-weight: 900;
		color: #1e293b;
		margin-bottom: 1rem;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 2rem;
	}

	.feature-item {
		background: white;
		padding: 2rem;
		border-radius: 24px;
		border: 1px solid #f1f5f9;
		box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
		transition: transform 0.2s;
	}

	.feature-item:hover { transform: translateY(-5px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05); }

	.icon-box {
		width: 50px;
		height: 50px;
		background: #fff5f2;
		color: #ff6101;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.icon-box.pro {
		background: #f5f3ff;
		color: #4338ca;
	}

	.feature-item h3 {
		font-family: var(--FFTitle);
		font-weight: 800;
		margin-bottom: 0.75rem;
		color: #1e293b;
	}

	.feature-item p {
		color: #64748b;
		font-size: 0.95rem;
		line-height: 1.5;
	}

	.separator { border: none; border-top: 1px solid #e2e8f0; margin: 4rem 0; }

	.pro-action { text-align: center; margin-top: 4rem; }
	.btn-pro {
		background: #4338ca;
		color: white;
		padding: 1.25rem 2.5rem;
		border-radius: 50px;
		text-decoration: none;
		font-weight: 800;
		transition: background 0.2s;
	}
	.btn-pro:hover { background: #3730a3; }

	/* APP DISPLAY */
	.app-display {
		background: #0f172a;
		padding: 6rem 1.5rem;
		color: white;
		margin-top: 4rem;
	}

	.display-container {
		max-width: 1100px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		gap: 4rem;
	}

	.display-text h2 {
		font-family: var(--FFTitle);
		font-size: 2.5rem;
		font-weight: 900;
		margin-bottom: 1.5rem;
	}

	.display-text p {
		font-size: 1.2rem;
		opacity: 0.8;
		margin-bottom: 2.5rem;
	}

	.btn-store {
		background: #ff6101;
		color: white;
		padding: 1rem 2rem;
		border-radius: 12px;
		text-decoration: none;
		font-weight: 800;
	}

	.mockup {
		width: 100%;
		max-width: 350px;
		border-radius: 40px;
		box-shadow: 0 50px 100px -20px rgba(0,0,0,0.5);
	}

	@media (max-width: 900px) {
		.hero-content, .display-container { grid-template-columns: 1fr; text-align: center; }
		.hero-image, .display-visual { display: flex; justify-content: center; }
		.hero-subtitle { margin: 0 auto; }
	}
</style>
