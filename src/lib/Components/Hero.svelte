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

		<h2 class="hero-subtitle">Toutes les sorties prêt de chez toi en un clin d'oeil</h2>
		<p class="hero-description">
			<!-- Découvre les concerts, les festivals, les marchés, les soirées, et toutes les activités
			locales. -->
			Concerts, marchés, sport, famille — découvre ce qui se passe cette semaine autour de chez toi.
		</p>

		<div class="hero-cta">
			<img class="lePoilu" src={Poilu} alt="Le personnage Le Poilu" />
			<p>Ne rates plus jamais un événement.</p>
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

	<div class="hero-visual">
		<div class="phone-mockup">
			<!-- Placeholder pour ton mockup d'app -->
			<div class="phone-screen"></div>
		</div>
	</div>
</section>

<style>
	.hero {
		/* background: linear-gradient(to left, var(--background), var(--lightBg)); */
		background-color: var(--background);
		border-radius: 18px;
		height: 600px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 5px;
		padding: 20px;
	}

	.hero-subtitle {
		font-weight: 900;
		font-family: var(--FFTitle);
		text-align: center;
	}

	.hero-description {
		font-family: var(--FFTitle);
		text-align: center;
	}

	.hero-cta {
		display: flex;
		flex-direction: column;
		gap: 0px;
		padding: 20px;
		border-radius: 12px;
		align-items: center;
		justify-content: center;
		margin-top: 50px;
		margin-bottom: 50px;
		border: 1px solid var(--cta);
	}
	.lePoilu {
		height: 150px;
		width: auto;
	}
	.container_app-link {
		display: flex;
		gap: 20px;
		margin-top: 10px;
	}
	.img-app-link {
		height: 40px;
		width: auto;
		border-radius: 12px;
		box-shadow: var(--shadow);
	}
	.btn-app-link {
		cursor: pointer;
		background-color: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 120px; /* Largeur fixe */
		height: 60px; /* Hauteur fixe */
	}

	.hero-visual {
		background-color: #f5f5f5;
	}

	.phone-mockup {
		background-color: #f5f5f5;
	}

	.phone-screen {
		background-color: #f5f5f5;
	}
</style>
