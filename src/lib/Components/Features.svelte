<script>
	import { applyAction } from '$app/forms';
	import PoiluFace from '../assets/Poilu-outils.png';
	import Details from '../assets/details.jpg';
	import Events from '../assets/screenShots/eventsPictures.png';
	import Filters from '../assets/screenShots/FiltreLieux.png';
	import Favoris from '../assets/favoris.jpg';
	import Creation from '../assets/creation.jpg';
	import Paiements from '../assets/screenShots/widgets.png';

	const features = [
		{
			icon: 'fa-solid fa-calendar-days',
			title: 'Calendrier intelligent',
			description: `Visualise tous les événements en scrollant. C'est intuitif et tu peux filtrer par catégorie.`,
			img: Events
		},
		{
			icon: 'fa-solid fa-sliders',
			title: 'Filtres avancés',
			description: 'Filtre par ville, date, période..',
			img: Filters
		},
		{
			icon: 'fa-solid fa-walkie-talkie',
			title: `Création d'events`,
			description: `Crée tes événements depuis l'application, en un clin d'œil. Envoie, c'est en ligne !`,
			img: Creation
		},
		{
			icon: 'fa-solid fa-heart',
			title: 'Favoris et partage',
			description: 'Sauvegarde tes événements préférés et partage-les avec tes amis.',
			img: Favoris
		},
		{
			icon: 'fa-solid fa-credit-card',
			title: 'Widgets',
			description: 'Accède en un clic à tous les widgets, hyper-pratique !',
			img: Paiements
		},
		{
			icon: 'fa-solid fa-ticket',
			title: 'Billetterie intégrée',
			description: "Réserve tes places directement depuis l'application.",
			img: Details
		}
	];
</script>

<section class="features">
	
		<div class="features-header">
			<h2 class="section-title">Tous les évènements de l'Ouest Lyonnais dans ta poche</h2>
			<p class="section-subtitle">
				Une application complète avec tous les outils pour ne plus jamais manquer un événement
				local !
			</p>
			<img class="poilu-face" src={PoiluFace} alt="Personnage le poilu de face" />
		</div>
		<div class="features-grid">
			{#each features as feature}
				<div class="feature-card">
					<div class="feature-icon">
						<i class={feature.icon}></i>
					</div>
					<h3 class="feature-title">{feature.title}</h3>
					<p class="feature-description">{feature.description}</p>
					<img class="img" src={feature.img} alt="screenshots de l'application Le Poilu" />
				</div>
			{/each}
		</div>

</section>

<style>
	.features {
		background-color: var(--background);
		border-radius: var(--radius-lg);
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 0;
		position: relative;
		padding: var(--spacing-xl) var(--spacing-md);
	
	}

	.features-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: var(--spacing-xl);
		gap: var(--spacing-md);
		padding: 0 var(--spacing-md);
	}

	.section-title {
		font-weight: 900;
		font-family: var(--FFTitle);
		text-align: center;
		font-size: clamp(1.5rem, 4vw, 2.5rem);
		color: var(--textDark);
		line-height: 1.3;
	}

	.section-subtitle {
		font-family: var(--FFTitle);
		text-align: center;
		font-size: clamp(1rem, 2vw, 1.1rem);
		color: var(--text);
		max-width: 800px;
		line-height: 1.6;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--spacing-md);
		padding: var(--spacing-md);
		width: 100%;
		max-width: var(--desktop);
		margin: 0 auto;
	}

	.feature-card {
		background-color: var(--secondary);
		border-radius: var(--radius-md);
		padding: var(--spacing-md);
		height: 100%;
		width: 100%;
		max-width: 400px;
		gap: var(--spacing-sm);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		transition: transform var(--transition-normal);
		box-shadow: var(--shadow3);
		margin: 0 auto;
	}

	.feature-card:hover {
		transform: translateY(-5px);
		box-shadow: var(--shadow);
	}

	.feature-icon {
		color: var(--background);
		font-size: 2rem;
		margin-bottom: var(--spacing-sm);
	}

	.feature-title {
		color: var(--ctaText);
		font-weight: 700;
		text-align: center;
		font-family: var(--FFTitle);
		font-size: clamp(1.1rem, 2vw, 1.3rem);
	}

	.feature-description {
		color: var(--ctaText);
		text-align: center;
		font-size: clamp(0.9rem, 1.5vw, 1rem);
		line-height: 1.5;
	}

	.poilu-face {
		height: clamp(100px, 15vw, 150px);
		margin: var(--spacing-md) 0;
		transition: transform var(--transition-normal);
	}

	.poilu-face:hover {
		transform: scale(1.1) rotate(5deg);
	}

	.img {
		margin-top: var(--spacing-lg);
		border-radius: var(--radius-lg);
		border: 5px solid transparent;
		height: 100%;
		width: 90%;
		box-shadow: var(--shadow2);
		position: relative;
		transition: transform var(--transition-normal);
	}

	.img:hover {
		transform: scale(1.02);
	}

	/* ===================================
	   MEDIA QUERIES RESPONSIVE
	   =================================== */

	/* Tablet: 1024px et moins */
	@media (max-width: 1024px) {
		.features-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.feature-card {
			max-width: 100%;
		}
	}

	/* Mobile: 768px et moins */
	@media (max-width: 768px) {
		.features {
			padding: var(--spacing-md) var(--spacing-sm);
			border-radius: var(--radius-md);
		}

		.features-header {
			margin-top: var(--spacing-md);
			gap: var(--spacing-sm);
		}

		.features-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-sm);
			padding: var(--spacing-sm);
		}

		.img {
			margin-top: var(--spacing-md);
		}
	}

	/* Mobile Small: 480px et moins */
	@media (max-width: 480px) {
		.features {
			padding: var(--spacing-sm);
			border-radius: var(--radius-sm);
		}

		.features-header {
			padding: 0 var(--spacing-xs);
		}

		.feature-card {
			padding: var(--spacing-sm);
		}

		.feature-icon {
			font-size: 1.5rem;
		}
	}
</style>

