<script>
	import IOS from '../assets/ios.png';
	import Android from '../assets/android.png';
	import Map from '../assets/Map.png';
	import Poilu from '../assets/Poilu.png';
	export let downloadLinks = {
		ios: 'https://www.apple.com/fr/app-store/',
		android: 'https://play.google.com/store/games?hl=fr'
	};
</script>

<section class="hero">
	<div class="hero-content" id="hero-link-app">
		<!-- <h2 class="hero-subtitle">Tous les événements de ta région en un seul endroit</h2> -->
		<h1 class="hero-title">Le Poilu <br /><span>L'agenda de l'Ouest Lyonnais</span></h1>

		<!-- <h2 class="hero-subtitle">Ne rate plus rien près de chez toi !</h2> -->
		<p class="hero-description">
			<!-- Découvre les concerts, les festivals, les marchés, les soirées, et toutes les activités
			locales. -->
			Concerts, spectacles, fêtes, randos, etc - découvre tout ce qui se passe autour de chez toi.
		</p>

		<div class="hero-cta">
			<img class="lePoilu" src={Poilu} alt="Le personnage Le Poilu" />
			<p>Ne rates plus jamais un événement avec le Poilu.</p>
			<div class="container_app-link">
				<a href="https://www.apple.com/fr/app-store/" class="btn-app-link" target="_blank">
					<img class="img-app-link" src={IOS} alt="ios" />
				</a>

				<a href={downloadLinks.android} class="btn-app-link" target="_blank">
					<img class="img-app-link" src={Android} alt="ios" />
				</a>
			</div>
		</div>
	</div>
</section>

<style>
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
		box-shadow: var(--shadow);
		overflow: hidden;
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: var(--spacing-xl);
		padding: var(--spacing-md);
		max-width: var(--desktop);
		width: 100%;
	}

	.hero-title {
		color: rgb(255, 255, 255);
		font-size: 5rem;
		font-family: var(--FFTitle);
		font-weight: 900;
		margin-top: var(--spacing-sm);
		text-align: center;
	}
	.hero-title span {
		font-size: 3rem;
	}

	/* .hero-subtitle {
		font-weight: 800;
		font-family: var(--FFTitle);
		text-align: center;
		font-size: clamp(1.5rem, 4vw, 2rem);
		color: white;
		margin-top: var(--spacing-sm);
	} */

	.hero-description {
		font-family: var(--FFTitle);
		text-align: center;
		color: var(--text);
		font-size: clamp(1rem, 2.5vw, 1.1rem);
		margin-top: var(--spacing-sm);
		max-width: 800px;
		line-height: 1.6;
	}

	.hero-cta {
		display: flex;
		flex-direction: column;
		gap: 0;
		padding: var(--spacing-xl);
		border-radius: var(--radius-md);
		align-items: center;
		justify-content: center;
		margin-top: 0;
		margin-bottom: var(--spacing-xl);
	}

	.hero-cta p {
		font-family: var(--FFTitle);
		font-size: clamp(1rem, 2.5vw, 1.2rem);
		font-weight: 600;
		text-align: center;
		margin-top: var(--spacing-sm);
		margin-bottom: var(--spacing-md);
		color: white;
	}

	.lePoilu {
		height: clamp(200px, 40vw, 450px);
		width: auto;
		margin-bottom: var(--spacing-md);
		filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
		transition: transform var(--transition-normal);
	}

	.lePoilu:hover {
		transform: scale(1.05);
	}

	.container_app-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		gap: var(--spacing-md);
		margin-top: var(--spacing-md);
		flex-wrap: wrap;
	}

	.img-app-link {
		height: 60px;
		width: auto;
		border-radius: var(--radius-md);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
		transition: all var(--transition-normal);
	}

	.btn-app-link {
		cursor: pointer;
		background-color: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 120px;
		height: 60px;
		transition: transform var(--transition-normal);
	}

	.btn-app-link:hover {
		transform: scale(1.05);
	}

	.btn-app-link:hover .img-app-link {
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
	}

	/* ===================================
	   MEDIA QUERIES RESPONSIVE
	   =================================== */

	/* Tablet et moins: 1024px */
	@media (max-width: 1024px) {
		.hero-content {
			margin-top: var(--spacing-lg);
		}

		.hero-cta {
			padding: var(--spacing-lg);
		}
		.hero-title {
			line-height: 60px;
		}
		.hero-title span {
			line-height: 30px;
			font-size: 2rem;
		}
	}

	/* Mobile: 768px et moins */
	@media (max-width: 768px) {
		.hero {
			border-radius: var(--radius-md);
			margin-top: var(--spacing-sm);
		}

		.hero-content {
			margin-top: var(--spacing-md);
			padding: var(--spacing-sm);
		}

		.hero-cta {
			padding: var(--spacing-md);
			margin-top: var(--spacing-md);
			margin-bottom: var(--spacing-md);
		}

		.container_app-link {
			flex-direction: column;
			gap: var(--spacing-md);
			margin-top: var(--spacing-lg);
		}

		.img-app-link {
			height: 50px;
		}

		.btn-app-link {
			width: 100%;
			max-width: 200px;
		}
		.hero-title {
			line-height: 50px;
			margin-bottom: 40px;
		}
		.hero-title span {
			font-size: 2.3rem;
		}
	}

	/* Mobile Small: 480px et moins */
	@media (max-width: 480px) {
		.hero {
			border-radius: var(--radius-sm);
			height: 1000px;
		}

		.hero-content {
			padding: var(--spacing-xs);
		}

		.hero-cta {
			padding: var(--spacing-sm);
		}

		.container_app-link {
			gap: var(--spacing-sm);
		}
		.hero-title {
			font-size: 4rem;
			line-height: 36px;
			margin-bottom: 40px;
		}
		.hero-title span {
			font-size: 1.6rem;
			line-height: 0px;
		}
	}
</style>
