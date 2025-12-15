<script>
	import Poilu from '../../lib/assets/Map.jpg';
</script>

<div class="pre-hero">
	<div class="wrapper-title">
		<h1 class="hero-title">Le Poilu</h1>
		<!-- <h2>L’application pour publier et trouver tous les événements près de chez toi.</h2> -->
		<h2>Tous les événements de l’Ouest Lyonnais concentrés sur une appli.</h2>

	</div>

	<div class="paragraph">
		<img class="img" src={Poilu} alt="personnage le poilu dans un village" />
		<div class="wrapper-description">
			<h2>Le territoire du Poilu</h2>
			<p class="PreHero-description">
				Le poilu se nourrit d'évènements culturels, sportifs et festifs dans sa belle région de l'ouest Lyonnais.
		Toujours au courant de tout, le Poilu sort de sa hutte pour passer de bonnes soirées, découvrir des ateliers, des spectacles, des expositions, des concerts, participer à des compétitions sportives,  des randonnées et pratiquer tout un tas d'activité...
				<br /><br />Passionné par la vie locale, il adore découvrir et partager les événements qui
				animent son territoire.
				<br /><br />Si toi aussi tu souhaites vivre pleinement ta région, suis Le Poilu et ne
				manque plus jamais un événement près de chez toi !
			</p>
			<a class="btn-link-app" href="/Telecharger">Télécharge Le Poilu</a>
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
		grid-template-columns: 50% 50%;
		align-items: center;
		height: 100%;
		width: 100%;
		border-radius: 18px;
		/* border: 1px solid grey; */
		box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.293);
	}
	.img {
		width: 90%;
		height: 100%;
		object-fit: contain;
		object-position: center;
		border-radius: 18px 0px 0px 18px;
	}

	.wrapper-description {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		gap: 0px;
		background: linear-gradient(to left, var(--ctaSecondary), rgb(255, 255, 255));
		border-radius: 0px 18px 18px 0px;
		z-index: 3;
		padding: 50px;
	
	}
	.wrapper-description h2 {
		font-weight: 800;
		font-family: var(--FFTitle);
		font-size: 2rem;
		/* color: var(--ctaText); */
		text-align: center;
		margin-bottom: 20px;
	}

	.PreHero-description {
		font-weight: 500;
		font-family: var(--FFTitle);
		font-size: 1.1rem;
		/* color: var(--ctaText); */
		text-align: center;
		border-radius: 0px 0px 18px 18px;
		padding: 20px 20px;
		line-height: 2.5rem;
		width: 100%;
	}

	.btn-link-app {
		margin-bottom: 50px;
		margin-top: 20px;
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
		box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.37);
	}

	@media (max-width: 900px) {
		.hero-title {
			font-size: 4rem;
			letter-spacing: -2px;
		}
		.wrapper-title h2 {
			font-size: 1.2rem;
			margin-bottom: 30px;
		}
		.paragraph {
			grid-template-columns: 1fr;
			gap: 0px;
		}
		.img {
			border-radius: 18px 18px 0px 0px;
			height: auto;
		}
		.PreHero-description {
			padding: 30px 20px;
			font-size: 1rem;
			line-height: 1.5rem;
			text-align: center;
		}
		.wrapper-description {
			padding: 0px;
			border-radius: 0px 0px 18px 18px;
			z-index: 3;
		}
	}
</style>
