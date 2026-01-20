<script>
	import IOS from '../../lib/assets/ios.png';
	import Android from '../../lib/assets/android.png';
	import PoiluOk from '../../lib/assets/Poilu-ok.png';
	import PoiluMobile from '../../lib/assets/Poilu_mobile.png';

	const downloadLinks = {
		ios: 'https://apps.apple.com/fr/app/le-poilu/id6757426596',
		android: 'https://play.google.com/store/games?hl=fr'
	};
</script>

<svelte:head>
	<title>Télécharger — Le Poilu</title>
	<meta
		name="description"
		content="Téléchargez l'application Le Poilu sur iOS, Android ou utilisez la version Web installable (PWA)."
	/>
</svelte:head>

<main>
	<!-- Hero Section with Download Links -->
	<section class="hero">
		<div class="hero-content">
			<h1 class="hero-title">Télécharger l'application</h1>
			<p class="hero-subtitle">
				Découvrez tous les événements locaux de l'Ouest Lyonnais directement depuis votre smartphone
			</p>

			<div class="download-section">
				<p class="download-label">Disponible sur :</p>
				<div class="download-buttons">
					<a href={downloadLinks.ios} class="download-link" target="_blank" rel="noopener noreferrer">
						<img src={IOS} alt="Télécharger sur l'App Store" class="store-badge" />
					</a>
					<a href={downloadLinks.android} class="download-link" target="_blank" rel="noopener noreferrer">
						<img src={Android} alt="Télécharger sur Google Play" class="store-badge" />
					</a>
				</div>
			</div>

			<picture class="hero-image">
				<source media="(max-width: 768px)" srcset={PoiluMobile} />
				<img src={PoiluOk} alt="Personnage Le Poilu" class="poilu-illustration" />
			</picture>
		</div>
	</section>

	<!-- Features Section -->
	<section class="features-section">
		<div class="features-header">
			<h2 class="section-title">Pourquoi télécharger l'app ?</h2>
			<p class="section-description">
				Profitez d'une expérience optimisée pour découvrir les événements près de chez vous
			</p>
		</div>

		<div class="features-grid">
			<div class="feature-card">
				<div class="feature-icon">
					<i class="fa-solid fa-bolt"></i>
				</div>
				<h3 class="feature-title">Accès rapide</h3>
				<p class="feature-description">
					Consultez instantanément les événements sans ouvrir votre navigateur
				</p>
			</div>

			<div class="feature-card">
				<div class="feature-icon">
					<i class="fa-solid fa-bell"></i>
				</div>
				<h3 class="feature-title">Notifications</h3>
				<p class="feature-description">
					Recevez des alertes pour les nouveaux événements qui vous intéressent
				</p>
			</div>

			<div class="feature-card">
				<div class="feature-icon">
					<i class="fa-solid fa-location-dot"></i>
				</div>
				<h3 class="feature-title">Géolocalisation</h3>
				<p class="feature-description">
					Trouvez automatiquement les événements les plus proches de vous
				</p>
			</div>

			<div class="feature-card">
				<div class="feature-icon">
					<i class="fa-solid fa-heart"></i>
				</div>
				<h3 class="feature-title">Favoris</h3>
				<p class="feature-description">
					Enregistrez vos événements préférés et ne ratez plus rien
				</p>
			</div>
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
		min-height: 600px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		margin-top: var(--spacing-md);
		padding: var(--spacing-xl) var(--spacing-lg);
		box-shadow: var(--shadow);
		overflow: hidden;
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		position: relative;
		z-index: 2;
		width: 100%;
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
		max-width: 700px;
		line-height: clamp(1.4rem, 3vw, 1.8rem);
		margin-bottom: var(--spacing-xl);
	}

	/* Download Section */
	.download-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-md);
		margin-bottom: var(--spacing-xl);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background-color: rgba(255, 255, 255, 0.15);
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-radius: var(--radius-lg);
		padding: var(--spacing-xl) var(--spacing-lg);
		box-shadow: var(--shadow3);
	}

	.download-label {
		font-family: var(--FFTitle);
		font-size: clamp(1.1rem, 2.5vw, 1.4rem);
		font-weight: 700;
		color: white;
		margin: 0;
	}

	.download-buttons {
		display: flex;
		gap: var(--spacing-md);
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}

	.download-link {
		display: inline-block;
		transition: transform var(--transition-normal);
		cursor: pointer;
	}

	.download-link:hover {
		transform: translateY(-5px);
	}

	.store-badge {
		height: clamp(50px, 10vw, 60px);
		width: auto;
		border-radius: var(--radius-md);
		box-shadow: var(--shadow2);
		transition: box-shadow var(--transition-normal);
	}

	.download-link:hover .store-badge {
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
	}

	/* Hero Image */
	.hero-image {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: var(--spacing-md);
	}

	.poilu-illustration {
		height: clamp(200px, 35vw, 350px);
		width: auto;
		filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
		object-fit: contain;
	}

	/* Features Section */
	.features-section {
		background: linear-gradient(135deg, var(--background), #FF6101);
		border-radius: var(--radius-lg);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-xl) var(--spacing-lg);
		box-shadow: var(--shadow);
		margin-bottom: var(--spacing-lg);
	}

	.features-header {
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

	.features-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--spacing-md);
		width: 100%;
		max-width: 900px;
	}

	.feature-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		text-align: center;
		gap: var(--spacing-md);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background-color: rgba(255, 255, 255, 0.9);
		border: 2px solid rgba(255, 97, 1, 0.2);
		border-radius: var(--radius-md);
		padding: var(--spacing-lg) var(--spacing-md);
		box-shadow: var(--shadow3);
		transition: transform var(--transition-normal), box-shadow var(--transition-normal);
	}

	.feature-card:hover {
		transform: translateY(-5px);
		box-shadow: var(--shadow2);
	}

	.feature-icon {
		font-size: clamp(2rem, 4vw, 2.5rem);
		color: #FF6101;
		background: linear-gradient(135deg, rgba(255, 97, 1, 0.1), rgba(232, 132, 60, 0.1));
		width: clamp(70px, 12vw, 80px);
		height: clamp(70px, 12vw, 80px);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: var(--shadow3);
	}

	.feature-title {
		font-family: var(--FFTitle);
		font-weight: 700;
		font-size: clamp(1.1rem, 2.5vw, 1.3rem);
		color: var(--textDark);
		margin: 0;
	}

	.feature-description {
		font-family: var(--FFTitle);
		color: #555;
		font-size: clamp(0.9rem, 1.8vw, 1rem);
		line-height: clamp(1.3rem, 2.5vw, 1.5rem);
		margin: 0;
	}

	/* === MEDIA QUERIES RESPONSIVE === */

	/* Tablet */
	@media (max-width: 1024px) {
		.features-grid {
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
			min-height: 500px;
		}

		.features-section {
			padding: var(--spacing-lg) var(--spacing-md);
		}

		.features-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-md);
		}

		.download-section {
			padding: var(--spacing-lg) var(--spacing-md);
		}

		.download-buttons {
			flex-direction: column;
			gap: var(--spacing-sm);
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
			min-height: 450px;
		}

		.features-section {
			padding: var(--spacing-xl) var(--spacing-md);
			margin-bottom: var(--spacing-xl);
		}

		.download-section {
			padding: var(--spacing-lg) var(--spacing-md);
			gap: var(--spacing-lg);
		}

		.features-grid {
			gap: var(--spacing-lg);
		}

		.feature-card {
			padding: var(--spacing-lg) var(--spacing-md);
			gap: var(--spacing-md);
		}

		.features-header {
			margin-bottom: var(--spacing-xl);
		}

		.poilu-illustration {
			height: 150px;
		}
	}
</style>
