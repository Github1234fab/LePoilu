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
			icon: 'fa-solid fa-hand-pointer',
			title: 'Tu scrolles',
			description: `Visualise tous les événements en une seul fois, en Scrollant. C'est intuitif.<br><br>Les évènements sont classés par ordre chronologique, des plus proches dans le temps en haut, aux plus éloignés dans le temps, en bas.`,
			img: Events,
			alt: ''
		},
		{
			icon: 'fa-solid fa-sliders',
			title: 'Tu Filtres',
			description: 'Pour affiner ta recherche, tu peux filtrer les évènements par ville, par date et par catégorie.<br><br>Tu veux trouver quelque chose à faire près de chez toi, tu filtres avec les noms de ville.<br><br>Tu veux sortir ce week-end, tu filtres avec "ce week-end".<br><br>Tu veux trouver une fête, tu filtres avec "fête", dans le menu déroulant - Catégorie.',
			img: Filters
		},
		{
			icon: 'fa-solid fa-bullhorn',
			title: `Tu crées`,
			description: `Créer tes évènements depuis l'application, en un clin d'oeil.<br><br>Tu renseignes le titre, la date, les horaires, le lieu, la catégorie et une description. Les images et les liens vers la billeterie et vers ton site sont en supplement, mais tu peux très bien t'en passer.<br><br>Ensuite, tu publies ! Ton évènement va passer par l'administration qui s'assure que tout est bien conforme et ton annonce est immédiatement visible par tous les utilisateurs de l'application.`,
			img: Creation
		},
		{
			icon: 'fa-solid fa-heart',
			title: 'Tu likes et tu partages',
			description: 'Chaque annonce qui retient ton attention, tu la likes, en cliquant sur le petit coeur. Tu retrouves aussitôt toutes tes annonces likées dans ta section "Favoris".<br><br>Tu peux les partager avec tes amis, sur les réseaux, par mail, par sms, etc.<br><br>Quand une annonce ne retient plus ton attention, tu clique sur le coeur et elle disapraît aussitôt de tes favoris.' ,
			img: Favoris
		},
		{
			icon: 'fa-solid fa-credit-card',
			title: 'Tu consultes',
			description: 'Tu peux consulter à tout moment tes favoris, ton espace "mes annonces", dans lequel tu retrouveras toutes les annonces que tu as créer avec son statut.<br><br>Par exemple "en attente de valdiation", ou "payée" ou "gratuite".<br><br>Si ton évènement est payant, tu peux effectuer le paiement directement depuis l\'application, en toute sécurité.',
			img: Paiements
		},
		{
			icon: 'fa-solid fa-ticket',
			title: 'Tu réserves',
			description: "Tu verras des annonces avec un bouton 'Réserver'. En cliquant dessus, tu seras redirigé vers la billetterie en ligne de l'évènement, où tu pourras choisir tes places et finaliser ta réservation en toute simplicité.<br><br>Fini les files d'attente, tout se passe directement depuis l'application !",
			img: Details
		}
	];
</script>

<section class="features">
	<div class="features-header">
		<h2 class="section-title">Tu cherches un truc à faire sur le Poilu ?</h2>
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
		background: linear-gradient(135deg, var(--background), #FF6101);
		border-radius: var(--radius-lg);
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 0;
		position: relative;
		box-shadow: var(--shadow);
	}

	.features-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: var(--spacing-xl);
		padding: var(--spacing-lg);
		margin-bottom: var(--spacing-lg);
	}
	.section-title {
		font-weight: 900;
		font-family: var(--FFTitle);
		text-align: center;
		font-size: clamp(1.8rem, 4vw, 2.5rem);
		color: var(--text);
		margin-bottom: var(--spacing-sm);
		transition: transform var(--transition-normal);
	}
	.section-title:hover {
		transform: scale(1.02);
	}
	.section-subtitle {
		font-family: var(--FFTitle);
		color: var(--text);
		font-size: clamp(1rem, 2.5vw, 1.2rem);
		text-align: center;
		font-weight: 500;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--spacing-md);
		padding: var(--spacing-md);
		width: 100%;
	}

	.poilu-face {
		height: clamp(200px, 30vw, 350px);
		margin-top: var(--spacing-md);
		filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
		transition: transform var(--transition-slow);
	}
	.poilu-face:hover {
		transform: scale(1.05) rotate(2deg);
	}

	@media (max-width: 1024px) {
		.features-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: var(--spacing-md);
		}
		.features-header {
			margin-top: var(--spacing-lg);
		}
	}

	@media (max-width: 768px) {
		.features-grid {
			grid-template-columns: 1fr;
			padding: var(--spacing-md);
		}
		.features-header {
			margin-top: var(--spacing-md);
			padding: var(--spacing-md) var(--spacing-sm);
		}
		.section-title {
			font-size: clamp(1.5rem, 4vw, 1.8rem);
		}
		.section-subtitle {
			font-family: var(--FFTitle);
			text-align: center;
			margin-top: var(--spacing-sm);
			font-size: clamp(0.9rem, 2vw, 1rem);
		}
	}

	@media (max-width: 480px) {
		.features-header {
			padding: var(--spacing-sm);
		}
		.features-grid {
			padding: var(--spacing-sm);
			gap: var(--spacing-sm);
		}
	}
</style>
