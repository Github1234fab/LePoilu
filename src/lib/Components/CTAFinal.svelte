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
		<h2 class="cta-title">Prêt à découvrir ta région ?</h2>
		<p class="cta-description">
			Rejoins des milliers d'utilisateurs et ne rate plus jamais un événement
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
				<a href={downloadLinks.ios} class="btn-primary"> <img src={IOS} alt="ios" /> </a>
				<a href={downloadLinks.android} class="btn-primary">
					<img src={Android} alt="ios" />
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	.cta-final {
		background-color: var(--ctaSecondary);
		border-radius: 18px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 0;
		padding: 40px;
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
	}
	.btn-primary img {
		height: 40px;
		width: 100%;
		box-shadow: var(--shadow);
	}

	.container_cta-stats {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--lightBg);
		border-radius: 18px;
		padding: 20px 40px;
		margin-bottom: 50px;
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
		height: 150px;
		margin-right: 20px;
	}
	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 10px;
		padding: 10px 30px;
		border-radius: 18px;
		background-color: var(--ctaHover);
		color: var(--ctaText);
	}
	.cta-description{
		font-weight: 500;
		font-family: var(--FFTitle);
		font-size: 1rem;
		color: var(--ctaText);
		text-align: center;
		margin: 20px 0;
		line-height: 1.5rem;
	}
	.stat-number {
		font-size: 1rem;
		font-weight: 900;
	}
	.stat-label {
		font-size: 1rem;
	}
</style>
