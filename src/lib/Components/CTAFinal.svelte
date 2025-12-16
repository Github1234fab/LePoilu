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
		<h2 class="cta-title">Prêt à découvrir tous les évènements de ta région de l'Ouest-Lyonnais ?</h2>
		<p class="cta-description">
			Rejoins des milliers d'utilisateurs et ne rate plus jamais aucun événement
		</p>
		<img class="poilu-face" src={PoiluFace} alt="Perosnnage le poilu de face" />
		<div class="container_cta-stats">
			<div class="cta-stats">
				<div class="stat">
					<p class="stat-number">10k+</p>
					<p class="stat-label">Téléchargements</p>
				</div>
				<div class="stat">
					<p class="stat-number">500+</p>
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
		background: linear-gradient(135deg, #FF6101 0%, #e8843c 50%, #FF6101 100%);
		border-radius: 18px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 0;
		padding: 40px;
		box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.293);
	}
	.cta-container {
		border-radius: 18px;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 0;
	}

	.btn-primary {
		border: none;
		transition: transform 0.3s ease;
	}
	.btn-primary:hover {
		transform: scale(1.05);
	}
	.btn-primary img {
		height: 50px;
		width: 100%;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
		border-radius: 8px;
	}

	.container_cta-stats {
		display: flex;
		flex-direction: column;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background-color: rgba(255, 255, 255, 0.2);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 18px;
		padding: 30px 40px;
		margin-bottom: 50px;
		box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
	}
	.hero-cta {
		display: flex;
		gap: 30px;
		padding: 0px;
		border-radius: 12px;
		align-items: center;
		justify-content: center;
		margin-top: 20px;
		z-index: 10;
	}
	.cta-stats {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 20px;
	}
	.poilu-face {
		height: 350px;
		margin-right: 20px;
	}
	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 10px;
		padding: 15px 35px;
		border-radius: 18px;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background-color: rgba(255, 255, 255, 0.25);
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.3);
		box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
	}
	.cta-title {
		color: white;
		font-family: var(--FFTitle);
		font-weight: 900;
		font-size: 2.5rem;
		text-align: center;
		margin-bottom: 10px;
	}

	.cta-description {
		font-weight: 500;
		font-family: var(--FFTitle);
		font-size: 1.1rem;
		color: white;
		text-align: center;
		margin: 20px 0;
		line-height: 1.8rem;
	}
	.stat-number {
		font-size: 1.3rem;
		font-weight: 900;
	}
	.stat-label {
		font-size: 0.95rem;
	}

	@media (max-width: 900px) {
		.cta-stats {
			flex-direction: column;
		}
		.hero-cta {
			display: flex;
			flex-direction: column;
			border: 1px solid var(--lightBg);
			border-radius: 18px;
			padding: 20px 40px;
			margin-bottom: 50px;
		}
		.cta-title{
			padding: 20px;
		}
		.cta-description{
			padding: 0 20px;
		}
		.poilu-face {
		height: 200px;
		margin-right: 20px;
	}
	
	}
</style>
