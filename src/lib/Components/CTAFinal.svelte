<script>
	import PoiluFace from '../assets/Poilu-jumelles.png';
	import IOS from '../assets/ios.png';
	import Android from '../assets/android.png';

	export let downloadLinks = {
		ios: 'https://www.apple.com/fr/app-store/',
		android: 'https://play.google.com/store/games?hl=fr'
	};
</script>

<section class="cta-final">
	<div class="cta-container">
		<h2 class="cta-title">Prêt à découvrir tous les évènements <br> de l'Ouest-Lyonnais ?</h2>
		<p class="cta-description">
			Rejoins des milliers d'utilisateurs et ne rate plus jamais aucun événement
		</p>
		<img class="poilu-face" src={PoiluFace} alt="Perosnnage le poilu de face" />
		<div class="container_cta-stats">
			<div class="cta-stats">
				<div class="stat">
					<p class="stat-number">1k+</p>
					<p class="stat-label">Téléchargements</p>
				</div>
				<div class="stat">
					<p class="stat-number">200+</p>
					<p class="stat-label">Événements/mois</p>
				</div>
				<div class="stat">
					<p class="stat-number">4.8★</p>
					<p class="stat-label">Note moyenne</p>
				</div>
			</div>
		</div>
		<p class="cta-description">
			Télécharge le Poilu et commence à explorer tout ce qui se passe dans ta région, dès
			aujourd'hui !
		</p>
		<div class="cta-buttons">
			<div class="hero-cta">
				<a href={downloadLinks.ios} class="btn-primary" target="_blank">
					<img src={IOS} alt="ios" />
				</a>
				<a href={downloadLinks.android} class="btn-primary" target="_blank">
					<img src={Android} alt="ios" />
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	.cta-final {
		background: linear-gradient(135deg, #FF6101 0%, var(--ctaSecondary) 50%, #FF6101 100%);
		border-radius: var(--radius-lg);
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 0;
		padding: var(--spacing-lg);
		box-shadow: var(--shadow);
		margin-bottom: 100px;
	}
	.cta-container {
		border-radius: var(--radius-lg);
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 0;
	}

	.btn-primary {
		border: none;
		transition: transform var(--transition-normal);
	}
	.btn-primary:hover {
		transform: scale(1.05);
	}
	.btn-primary img {
		height: 50px;
		width: 100%;
		box-shadow: var(--shadow3);
		border-radius: var(--radius-sm);
		transition: box-shadow var(--transition-normal);
	}
	.btn-primary:hover img {
		box-shadow: var(--shadow2);
	}

	.container_cta-stats {
		display: flex;
		flex-direction: column;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background-color: rgba(255, 255, 255, 0.2);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: var(--radius-lg);
		padding: var(--spacing-md) var(--spacing-lg);
		margin-bottom: var(--spacing-xl);
		box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
	}
	.hero-cta {
		display: flex;
		gap: var(--spacing-md);
		padding: 0px;
		border-radius: var(--radius-md);
		align-items: center;
		justify-content: center;
		margin-top: var(--spacing-md);
		z-index: 10;
	}
	.cta-stats {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-md);
	}
	.poilu-face {
		height: clamp(200px, 30vw, 350px);
		margin-right: var(--spacing-md);
		transition: transform var(--transition-slow);
	}
	.poilu-face:hover {
		transform: scale(1.05);
	}
	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: var(--spacing-xs);
		padding: var(--spacing-sm) var(--spacing-lg);
		border-radius: var(--radius-lg);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background-color: rgba(255, 255, 255, 0.25);
		color: var(--text);
		border: 1px solid rgba(255, 255, 255, 0.3);
		box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
		transition: transform var(--transition-normal), box-shadow var(--transition-normal);
	}
	.stat:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.2);
	}
	.cta-title {
		color: white;
		font-family: var(--FFTitle);
		font-weight: 900;
		font-size: clamp(1.8rem, 4vw, 2.5rem);
		text-align: center;
		margin-bottom: var(--spacing-sm);
	}

	.cta-description {
		font-weight: 500;
		font-family: var(--FFTitle);
		font-size: clamp(1rem, 2vw, 1.1rem);
		color: white;
		text-align: center;
		margin: var(--spacing-md) 0;
		line-height: 1.8rem;
	}
	.stat-number {
		font-size: clamp(1.1rem, 2.5vw, 1.3rem);
		font-weight: 900;
	}
	.stat-label {
		font-size: clamp(0.85rem, 1.5vw, 0.95rem);
	}

	@media (max-width: 768px) {
		.cta-stats {
			flex-direction: column;
		}
		.hero-cta {
			display: flex;
			flex-direction: column;
			border: 1px solid var(--lightBg);
			border-radius: var(--radius-lg);
			padding: var(--spacing-md) var(--spacing-lg);
			margin-bottom: var(--spacing-xl);
		}
		.cta-title {
			padding: var(--spacing-md);
		}
		.cta-description {
			padding: 0 var(--spacing-md);
		}
		.cta-final {
			padding: var(--spacing-md);
		}
	}

	@media (max-width: 480px) {
		.cta-final {
			padding: var(--spacing-sm);
		}
		.hero-cta {
			padding: var(--spacing-sm) var(--spacing-md);
		}
		.container_cta-stats {
			padding: var(--spacing-sm) var(--spacing-md);
		}
	}
</style>
