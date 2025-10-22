<script>
	const playUrl = 'https://play.google.com/store/apps/details?id=lepoilu.app'; // à remplacer
	const appStoreUrl = 'https://apps.apple.com/app/idXXXXXXXXX'; // à remplacer
	const pwaUrl = '/app'; // si version PWA

	import IOS from '../../lib/assets/ios.png';
	import Android from '../../lib/assets/android.png';

	export let downloadLinks = {
		ios: 'https://www.apple.com/fr/app-store/',
		android: 'https://play.google.com/store/games?hl=fr'
	};
</script>

<svelte:head>
	<title>Télécharger — Le Poilu</title>
	<meta
		name="description"
		content="Téléchargez l’application Le Poilu sur iOS, Android ou utilisez la version Web installable (PWA)."
	/>
</svelte:head>

<section class="wrap">
	<h1>Télécharger l'application - le Poilu</h1>
	<p class="lead">Choisissez votre plateforme :</p>
	<div class="container_app-link">
		<a href="https://www.apple.com/fr/app-store/" class="btn-app-link" target = "_blank">
			<img class="img-app-link" src={IOS} alt="ios" />
		</a>

		<a href={downloadLinks.android} class="btn-app-link" target = "_blank">
			<img class="img-app-link" src={Android} alt="ios" />
		</a>
	</div>
</section>

<style>
	.wrap {
		max-width: 900px;
		margin: 0 auto;
		padding: 48px 16px;
		color: #1c1c1c;
		background-image: url('../../lib/assets/Poilu-ok.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		height: 1000px;
	}
	h1 {
		font-size: 2rem;
		margin: 0 0 8px;
	}
	.lead {
		color: #555;
		margin: 0 0 16px;
	}

	.container_app-link {
		display: flex;
		gap: 20px;
		margin-top: 10px;
	}
	.img-app-link {
		height: 50px;
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
		width: auto; /* Largeur fixe */
		height: 100px; /* Hauteur fixe */
	}
</style>
