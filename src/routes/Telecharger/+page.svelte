<script>
	const playUrl = 'https://play.google.com/store/apps/details?id=lepoilu.app'; // à remplacer
	const appStoreUrl = 'https://apps.apple.com/app/idXXXXXXXXX'; // à remplacer
	const pwaUrl = '/app'; // si version PWA
</script>

<svelte:head>
	<title>Télécharger — Le Poilu</title>
	<meta
		name="description"
		content="Téléchargez l’application Le Poilu sur iOS, Android ou utilisez la version Web installable (PWA)."
	/>
</svelte:head>

<section class="wrap">
	<h1>Télécharger</h1>
	<p class="lead">Choisissez votre plateforme :</p>
	<div class="buttons">
		<a class="btn btn-dark" href={playUrl}>Google Play</a>
		<a class="btn btn-dark" href={appStoreUrl}>App Store</a>
		<!-- <a class="btn" href={pwaUrl}>Version Web (PWA)</a> -->
	</div>
	<!-- <p class="note">Astuce : sur mobile, ajoutez la version Web à votre écran d’accueil pour une expérience proche de l’app.</p> -->
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
        height: 1000px
	}
	h1 {
		font-size: 2rem;
		margin: 0 0 8px;
	}
	.lead {
		color: #555;
		margin: 0 0 16px;
	}
	.buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin: 16px 0 8px;
	}
	.btn {
		display: inline-block;
		padding: 10px 14px;
		border: 1px solid #1c1c1c;
		border-radius: 10px;
		text-decoration: none;
		color: #1c1c1c;
	}
	.btn-dark {
		background: #1c1c1c;
		color: #fff;
	}
	.btn:focus {
		outline: 2px solid #0a84ff;
		outline-offset: 2px;
	}
	/* .note {
		color: #666;
		margin-top: 8px;
	} */
</style>
