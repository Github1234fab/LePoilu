<script>
	import FeatureFlipCard from '$lib/Components/FLipCard.svelte';
	import PoiluFace from '../assets/Poilu-outils.png';
	import Details from '../assets/details.jpg';
	import Events from '../assets/events-v2.jpg';
	import Filters from '../assets/filters.jpg';
	import Favoris from '../assets/favoris.jpg';
	import Creation from '../assets/creation.jpg';
	import Paiements from '../assets/Paiements.jpg';

	const features = [
		{
			icon: 'fa-solid fa-calendar-days',
			title: 'Calendrier intelligent',
			description: `Visualise tous les événements en scrollant. C'est intuitif et tu peux filtrer par catégorie.`,
			img: Events,
			alt: ''
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
			description: `Créer tes évènements depuis l'application, en un clin d'oeil. Envoye, paye, c'est en ligne !`,
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
			title: 'Historique des paiements',
			description: 'Accéde en un clic à tes paiements, télécharge tes factures, etc.',
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
		<h2 class="section-title">Sortir, c’est trop simple avec Le Poilu.</h2>
		<p class="section-subtitle">
			Une appli tout-en-un pour vivre tous les événements de ta région.
		</p>
		<img class="poilu-face" src={PoiluFace} alt="Personnage le poilu de face" />
	</div>
	<div class="features-grid">
		{#each features as f}
			<FeatureFlipCard {...f} />
		{/each}
	</div>
</section>

<style>
	.features {
		background-color: var(--background);
		border-radius: 18px;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 0;
		position: relative;
	}

	.features-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 70px;
	}
	.section-title {
		font-weight: 900;
		font-family: var(--FFTitle);
		text-align: center;
	}
	.section-subtitle {
		font-family: var(--FFTitle);
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		padding: 30px;
		width: 100%;
	}

	.poilu-face {
		height: 150px;
		margin-right: 20px;
	}
	/* .img {
		margin-top: 10px;
		border-radius: 18px;
		border: 5px solid rgba(93, 3, 3, 0);
		height: 100%;
		width: 90%;
		box-shadow: var(--shadow2);
		position: relative;
		margin-top: 50px;
	} */



	 @media (max-width: 900px) {
		.features-grid {
			grid-template-columns: 1fr;
			padding: 20px;
		}
		.section-subtitle {
		font-family: var(--FFTitle);
		text-align: center;
		margin-top: 10px;
	}
	 }
</style>
