<script>
	import Poilu from '../../lib/assets/Map.jpg';
</script>

<div class="pre-hero">
	<div class="wrapper-title">
		<!-- <h2>L'application pour publier et trouver tous les événements près de chez toi.</h2> -->
		<h2>Tous les événements de l'Ouest Lyonnais concentrés sur une appli.</h2>
	</div>

	<div class="paragraph">
		<img class="img" src={Poilu} alt="personnage le poilu dans un village" />
		<div class="wrapper-description">
			<h2>Le territoire du Poilu</h2>
			<p class="PreHero-description">
				Le poilu se nourrit d'évènements culturels, sportifs et festifs dans sa belle région de
				l'ouest Lyonnais. Toujours au courant de tout, le Poilu sort de sa hutte pour passer de
				bonnes soirées, découvrir des ateliers, des spectacles, des expositions, des concerts,
				participer à des compétitions sportives, des randonnées et pratiquer tout un tas
				d'activité...
				<br /><br />Passionné par la vie locale, il adore découvrir et partager les événements qui
				animent son territoire.
				<br /><br />Si toi aussi tu souhaites vivre pleinement ta région, suis Le Poilu et ne manque
				plus jamais un événement près de chez toi !
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
	.wrapper-title h2 {
		font-weight: 700;
		font-family: var(--FFTitle);
		font-size: 1.8rem;
		color: #2b2b2b;
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
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9));
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.3);
		box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.293);
	}
	.img {
		width: 90%;
		height: 100%;
		object-fit: contain;
		object-position: center;
		border-radius: 18px 0px 0px 18px;
		/* filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2)); */
		margin: 0 auto;
		display: block;
	}

	.wrapper-description {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		gap: 0px;
		background: linear-gradient(135deg, rgba(232, 132, 60, 0.15), rgba(255, 97, 1, 0.08));
		border-radius: 0px 18px 18px 0px;
		z-index: 3;
		padding: 50px;
	}
	.wrapper-description h2 {
		font-weight: 900;
		font-family: var(--FFTitle);
		font-size: 2.2rem;
		color: #FF6101;
		text-align: center;
		margin-bottom: 20px;
	}

	.PreHero-description {
		font-weight: 500;
		font-family: var(--FFTitle);
		font-size: 1.05rem;
		color: #333;
		text-align: center;
		border-radius: 0px 0px 18px 18px;
		padding: 20px 20px;
		line-height: 1.8rem;
		width: 100%;
	}

	.btn-link-app {
		margin-bottom: 50px;
		margin-top: 30px;
		padding: 16px 40px;
		background: linear-gradient(135deg, #FF6101, var(--ctaSecondary));
		color: white;
		text-decoration: none;
		font-weight: 700;
		font-size: 1.1rem;
		border-radius: 12px;
		transition: all 0.3s ease;
		font-family: var(--FFTitle);
		text-align: center;
		z-index: 6;
		box-shadow: 0 8px 24px rgba(255, 97, 1, 0.3);
	}

	.btn-link-app:hover {
		transform: scale(1.05);
		box-shadow: 0 12px 32px rgba(255, 97, 1, 0.4);
	}

	@media (max-width: 900px) {
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
