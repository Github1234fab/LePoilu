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
		<a href="https://www.apple.com/fr/app-store/" class="btn-app-link" target="_blank">
			<img class="img-app-link" src={IOS} alt="ios" />
		</a>

		<a href={downloadLinks.android} class="btn-app-link" target="_blank">
			<img class="img-app-link" src={Android} alt="ios" />
		</a>
	</div>
</section>

<style>
	.wrap {
		max-width: var(--desktop);
		margin: 0 auto;
		padding: var(--spacing-lg) var(--spacing-md);
		color: var(--textDark);
		background-image: url('../../lib/assets/Poilu-ok.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		height: clamp(600px, 100vh, 1000px);
	}

	h1 {
		font-size: clamp(1.5rem, 4vw, 2rem);
		font-family: var(--FFTitle);
		margin: 0 0 var(--spacing-xs);
	}

	.lead {
		color: #555;
		font-family: var(--FFBody);
		margin: 0 0 var(--spacing-md);
		font-size: clamp(0.95rem, 2vw, 1rem);
	}

	.container_app-link {
		display: flex;
		gap: var(--spacing-md);
		margin-top: var(--spacing-xs);
	}

	.img-app-link {
		height: clamp(45px, 8vw, 50px);
		width: auto;
		border-radius: var(--radius-md);
		box-shadow: var(--shadow);
		transition: transform var(--transition-normal), box-shadow var(--transition-normal);
	}

	.btn-app-link {
		cursor: pointer;
		background-color: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		width: auto;
		height: clamp(90px, 15vw, 100px);
		transition: transform var(--transition-normal);
	}

	.btn-app-link:hover .img-app-link {
		transform: translateY(-3px);
		box-shadow: var(--shadow2);
	}

	/* === MEDIA QUERIES RESPONSIVE === */

	/* Mobile */
	@media (max-width: 768px) {
		.wrap {
			background-size: contain;
			background-image: url('../../lib/assets/Poilu_mobile.png');
			background-position: bottom;
			height: clamp(600px, 90vh, 850px);
			padding: var(--spacing-md) var(--spacing-sm);
		}

		.container_app-link {
			flex-direction: column;
			gap: var(--spacing-xs);
			align-items: flex-start;
		}

		.btn-app-link {
			height: 80px;
		}
	}

	/* Mobile Small */
	@media (max-width: 480px) {
		.wrap {
			padding: var(--spacing-sm) var(--spacing-xs);
			height: clamp(500px, 90vh, 700px);
		}

		.container_app-link {
			gap: 0;
		}
	}
</style>
