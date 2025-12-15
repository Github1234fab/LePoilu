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

		<h2 class="hero-subtitle">Ne rate plus rien près de chez toi !</h2>
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

	<div class="hero-visual">
		<div class="phone-mockup">
			<!-- Placeholder pour ton mockup d'app -->
			<div class="phone-screen"></div>
		</div>
	</div>
</section>

<style>
	.hero {
	
		background: linear-gradient(120deg,var(--ctaSecondary), var(--background));
		border-radius: 18px;
		height: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		margin-top: 30px;
		box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.293);
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 50px;
		padding: 20px;
	}

	.hero-subtitle {
		font-weight: 800;
		font-family: var(--FFTitle);
		text-align: center;
		font-size: 3rem;
		color: white;
	
	}

	.hero-description {
		font-family: var(--FFTitle);
		text-align: center;
	}

	.hero-cta {
		display: flex;
		flex-direction: column;
		gap: 0px;
		padding: 50px;
		border-radius: 12px;
		align-items: center;
		justify-content: center;
		margin-top: 0px;
		margin-bottom: 50px;
	
	}
	.hero-cta p {
		font-family: var(--FFTitle);
		font-size: 1.2rem;
		text-align: center;
		margin-top: 10px;
		margin-bottom: 20px;
	}
	.lePoilu {
		height: 450px;
		width: auto;
		margin-bottom: 30px;
	}
	.container_app-link {
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 100%;
		gap: 0px;
		margin-top: 30px;
		
	}
	.img-app-link {
		height: 60px;
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

	@media (max-width: 900px) {
		.hero {
			flex-direction: column;
			padding: 20px;
		}
		.hero-subtitle {
		font-weight: 800;
		font-family: var(--FFTitle);
		text-align: center;
		font-size: 2rem;
		color: white;
		padding: 20px;
	
	}

		.hero-content {
			margin-top: 20px;
		}

		.hero-cta {
			margin-top: 30px;
			margin-bottom: 30px;
		}
		.container_app-link {
		display: flex;
		flex-direction: column;
		gap: 20px;
		margin-top: 50px;
	}
	
	.lePoilu {
		height:300px;
		width: auto;
		margin-bottom: 30px;
	}
	.img-app-link {
		height: 50px;
		width: auto;
		border-radius: 12px;
		box-shadow: var(--shadow);
	}

	@media screen and (max-width: 500px) {
		.lePoilu {
		height: 160px;
		width: auto;
		margin-bottom: 30px;
	}
	}}
</style>
