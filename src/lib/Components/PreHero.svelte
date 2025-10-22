<script>
	import Poilu from '../assets/Poilu-Village.png';
</script>

<div class="pre-hero">
	<div class="wrapper-title">
		<h1 class="hero-title">Le Poilu</h1>
		<h2>L’application pour publier et trouver tous les événements près de chez toi.</h2>
	</div>

	<div class="paragraph">
		<img class="img" src={Poilu} alt="personnage le poilu dans un village" />
		<div class="wrapper-description">
			<p class="PreHero-description">
				<span>Le Poilu </span>, c'est l'être social, par excellence.

				<br /> <strong>Jamais dans sa hutte !</strong>
				<br />Spectacles, expos, soirées, sport… il est toujours dehors.
			</p>
			<a class="btn-link-app" href="/Telecharger" 
			>Télécharge Le Poilu</a
			>
		</div>
	
	</div>

</div>


<style>
	.pre-hero {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
	}
	.wrapper-title {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0px;
	}
	.hero-title {
		color: var(--secondary);
		font-size: 7rem;
		font-family: var(--FFTitle);
		font-weight: 900;
		letter-spacing: -0.1rem;
		margin-top: 1rem;
		text-align: center;
		letter-spacing: -5px;
	}
	.wrapper-title h2 {
		font-weight: 600;
		font-family: var(--FFText);
		font-size: 1.5rem;
		color: var(--text);
		text-align: center;
		margin-top: 0px;
		margin-bottom: 50px;
	}
	.paragraph {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		height: 100%;
		width: 100%;
		border-radius: 18px;
	}
	.img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 18px 0px 0px 18px;
	}

	.wrapper-description {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		gap: 10px;
		background-color: var(--ctaSecondary);
		border-radius: 0px 18px 18px 0px;
		z-index: 3;
	}
	.PreHero-description {
		font-weight: 500;
		font-family: var(--FFTitle);
		font-size: 1rem;
		color: var(--ctaText);
		text-align: center;
		border-radius: 0px 0px 18px 18px;
		padding: 50px 150px;
		line-height: 2.5rem;
		width: 100%;
	}

	.PreHero-description span {
		font-weight: 700;
		font-size: 1rem;
	}

	.btn-link-app {
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
		z-index: 6;
		box-shadow: var(--shadow3);
	}
</style>
