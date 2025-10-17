<div class="pre-hero">
	<div class="paragraph">
		<p class="PreHero-description">
			Le Poilu est un être social, par excellence.
			<br /> Il ne reste jamais dans sa hutte! Il sort, il bouge, il découvre, il partage et
			s'instruit.
			<br />Spectacles, expos, soirées, sports… rien ne lui échappe.
			<br /><span>Si tu veux profiter de tout ce que ta région a à t'offrir… Suis le Poilu !</span>
		</p>
		<a class="btn-link-app" href="#hero-link-app">Télécharger Le Poilu</a>
	</div>
</div>

<style>
	.pre-hero {
		background: linear-gradient(to left, var(--background), var(--lightBg));
		background-image: url('../assets/Poilu-Village.png');
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		border-radius: 18px;
		height: 800px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: -1;
		position: relative;
	}
	.pre-hero::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			rgba(255, 255, 255, 0.128) 0%,
			rgba(22, 22, 22, 0.242) 100%,
			rgba(255, 255, 255, 0)
		);
		border-radius: 18px;
		z-index: 0;
	}
	.PreHero-description {
		font-weight: 500;
		font-family: var(--FFTitle);
		font-size: 1rem;
		color: var(--ctaText);
		text-align: center;
		border-radius: 18px;
		padding: 20px 20px;
		line-height: 2.5rem;
	}
	.PreHero-description span {
		font-weight: 900;
		font-size: 1rem;
	}
	.paragraph {
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0px;
		background-color: rgba(0, 0, 0, 0.26);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		height: 300px;
		margin-top: 30%;
	}
	.btn-link-app {
		display: inline-block;
		margin: 10px auto;
		padding: 15px 30px;
		background-color: var(--cta);
		color: var(--ctaText);
		text-decoration: none;
		font-weight: 600;
		border-radius: 8px;
		transition:
			background-color 0.3s,
			color 0.3s;
		font-family: var(--FFText);
		text-align: center;
		z-index: 2;
		box-shadow: var(--shadow);
	}
</style>
