<script>
	import Poilu from '../../lib/assets/Carte_territoire_le_poilu.jpg';
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
		padding: var(--spacing-md) 0;
	}

	.wrapper-title {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0;
		padding: 0 var(--spacing-md);
	}

	.wrapper-title h2 {
		font-weight: 700;
		font-family: var(--FFTitle);
		font-size: clamp(1.2rem, 3vw, 1.8rem);
		color: var(--textDark);
		text-align: center;
		margin-top: 0;
		margin-bottom: var(--spacing-xl);
		line-height: 1.4;
	}

	.paragraph {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		height: 100%;
		width: 100%;
		border-radius: var(--radius-lg);
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9));
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.3);
		box-shadow: var(--shadow);
		overflow: hidden;
	}

	.img {
		width: 90%;
		height: 100%;
		object-fit: contain;
		object-position: center;
		border-radius: var(--radius-lg) 0 0 var(--radius-lg);
		margin: 0 auto;
		display: block;
	}

	.wrapper-description {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		gap: 0;
		background: linear-gradient(135deg, rgba(232, 132, 60, 0.15), rgba(255, 97, 1, 0.08));
		border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
		z-index: 3;
		padding: var(--spacing-xl);
		height: 100%;
	}

	.wrapper-description h2 {
		font-weight: 900;
		font-family: var(--FFTitle);
		font-size: clamp(1.5rem, 4vw, 2.2rem);
		color: #FF6101;
		text-align: center;
		margin-bottom: var(--spacing-md);
	}

	.PreHero-description {
		font-weight: 500;
		font-family: var(--FFTitle);
		font-size: clamp(0.95rem, 2vw, 1.05rem);
		color: #333;
		text-align: center;
		border-radius: 0 0 var(--radius-lg) var(--radius-lg);
		padding: var(--spacing-md);
		line-height: 1.8;
		width: 100%;
	}

	.btn-link-app {
		margin-bottom: var(--spacing-xl);
		margin-top: var(--spacing-md);
		padding: 16px 40px;
		background-color:  var(--cta);
		color: white;
		text-decoration: none;
		font-weight: 700;
		font-size: clamp(1rem, 2vw, 1.1rem);
		border-radius: var(--radius-md);
		transition: all var(--transition-normal);
		font-family: var(--FFTitle);
		text-align: center;
		z-index: 6;
		box-shadow: 0 8px 24px rgba(255, 97, 1, 0.3);
	}

	.btn-link-app:hover {
		transform: scale(1.05);
		box-shadow: 0 12px 32px rgba(255, 97, 1, 0.4);
	}

	/* ===================================
	   MEDIA QUERIES RESPONSIVE
	   =================================== */

	/* Tablet: 1024px et moins */
	@media (max-width: 1024px) {
		.wrapper-description {
			padding: var(--spacing-lg);
		}

		.PreHero-description {
			padding: var(--spacing-sm);
		}
	}

	/* Mobile: 768px et moins */
	@media (max-width: 768px) {
		.pre-hero {
			padding: var(--spacing-sm) 0;
		}

		.wrapper-title {
			padding: 0 var(--spacing-sm);
		}

		.wrapper-title h2 {
			margin-bottom: var(--spacing-md);
		}

		.paragraph {
			grid-template-columns: 1fr;
			gap: 0;
		}

		.img {
			border-radius: var(--radius-lg) var(--radius-lg) 0 0;
			height: auto;
			width: 100%;
		}

		.wrapper-description {
			padding: var(--spacing-md);
			border-radius: 0 0 var(--radius-lg) var(--radius-lg);
		}

		.PreHero-description {
			padding: var(--spacing-md) var(--spacing-sm);
			line-height: 1.6;
		}

		.btn-link-app {
			margin-bottom: var(--spacing-md);
			width: 100%;
			max-width: 300px;
		}
	}

	/* Mobile Small: 480px et moins */
	@media (max-width: 480px) {
		.wrapper-title h2 {
			margin-bottom: var(--spacing-sm);
		}

		.paragraph {
			border-radius: var(--radius-md);
		}

		.wrapper-description {
			padding: var(--spacing-sm);
		}

		.PreHero-description {
			padding: var(--spacing-sm) var(--spacing-xs);
		}

		.btn-link-app {
			padding: 14px 30px;
		}
	}
</style>
