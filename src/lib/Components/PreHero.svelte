<div class="pre-hero">
	<h1 class="hero-title">Le Poilu</h1>
	<div class="paragraph">
		<div class="wrapper-description">
			<p class="PreHero-description">
				<span>Le Poilu </span> est un être social, par excellence.
				<br /> Il ne reste jamais dans sa hutte! 
				<br>Il sort, il bouge, il découvre, il partage et
				s'instruit.
				<br />Spectacles, expos, soirées, sports… rien ne lui échappe.
				<br /><span>Si tu veux profiter de tout ce que ta région a à t'offrir… Suis le Poilu !</span
				>
			</p>
			<a class="btn-link-app" href="#hero-link-app">Télécharger Le Poilu</a>
		</div>
	</div>
</div>

<style>
	.pre-hero {
		border-radius: 18px;
		height: 1200px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: -1;
		gap: 5px;
		/* border-radius: 0px 0px 18px 18px; */
	}
	.paragraph {
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
		background-image: url('../assets/Poilu-Village.png');
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		height: 100%;
		width: 100%;
		border-radius: 18px;
		position: relative;
	}
	.hero-title {
		color: var(--secondary);
		font-size: 10rem;
		font-family: var(--FFTitle);
		font-weight: 900;
		letter-spacing: -0.1rem;
		margin-top: 1rem;
		text-align: center;
	}

	.wrapper-description {
		position: absolute;
		bottom: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		gap: 10px;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		/* background-color: #e8843c78; */
		background-color: rgba(33, 33, 33, 0.505);
		border-radius: 0px 0px 18px 18px;
	
	}
	.PreHero-description {
		font-weight: 500;
		font-family: var(--FFTitle);
		font-size: 1rem;
		color: var(--ctaText);
		text-align: center;
		border-radius: 0px 0px 18px 18px;
		padding: 30px;
		line-height: 2.5rem;
		width: 100%;
		
	}

	.PreHero-description span {
		font-weight: 700;
		font-size: 1rem;
	}

	.btn-link-app {
		display: inline-block;
		margin-bottom: 50px;
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
