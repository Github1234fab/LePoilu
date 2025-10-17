<svelte:head>
	<title>À propos — Le Poilu</title>
	<meta
		name="description"
		content="Le Poilu est une application locale pour découvrir et publier des événements près de chez vous."
	/>
</svelte:head>

<section class="apropos">
	<div class="container">
		<h1>À propos</h1>
		<p>
			Le Poilu est né d’une envie simple : rendre les sorties locales visibles et accessibles à
			tous, et aider les organisateurs à faire connaître leurs événements facilement.
		</p>

		<h2>Notre mission</h2>
		<p>
			Connecter habitants, familles et passionnés à ce qui se passe près d’eux, tout en soutenant
			l’écosystème local.
		</p>

		<h2>Contact</h2>
		<p>
			Pour les partenariats et la presse, rendez-vous sur la page <a href="/contact">Contact</a>.
		</p>
	</div>
</section>

<style>
	.apropos {
		margin: 0 auto;
		padding: 48px 16px;
		color: #1c1c1c;
		background-image: url('../../lib/assets/Poilu-village.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 1000px;
	}
	.container {
		max-width: 720px;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background-color: #c27b2f56;
		padding: 45px 20px;
		border-radius: 18px;
	}
	h1 {
		font-size: 2rem;
		margin: 0 0 12px;
        color: white;
	}
	h2 {
		font-size: 1.25rem;
		margin: 24px 0 8px;
        color: white;
	}
	p {
		color: #444;
		line-height: 1.6;
        color: white;
	}
	a {
		color: #0a84ff;
        color: white;
	}
	a:focus {
		outline: 2px solid #0a84ff;
		outline-offset: 2px;
	}
</style>
