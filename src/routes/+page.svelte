<svelte:head>
	<title>Le Poilu — L'agenda des événements et bons plans de l'Ouest Lyonnais</title>
	<meta name="description" content="Découvre tous les événements, concerts et festivals de ta région, ainsi que les meilleurs bons plans vitrines de l'Ouest Lyonnais." />
</svelte:head>

<script>
	import PreHero from '$lib/Components/PreHero.svelte';
	import Header from '$lib/Components/Header.svelte';
	import Hero from '$lib/Components/Hero.svelte';
	import Features from '$lib/Components/Features.svelte';
	import PublierSection from '$lib/Components/PublierSection.svelte';
	import HIW from '$lib/Components/HowItWorks.svelte';
	import Testimonials from '$lib/Components/Testimonials.svelte';
	import CTAFinal from '$lib/Components/CTAFinal.svelte';
	import EventTypes from '$lib/Components/EventTypes.svelte';
	import BonsPlansSection from '$lib/Components/BonsPlansSection.svelte';
	import './styles.css';
</script>

<main>
	<Hero />


	

	<!-- BLOC AGENDA & ÉVÉNEMENTS -->
	<section class="agenda-block">
		<div class="block-header">
			<span class="block-tag">LE POILU — L'AGENDA</span>
			<h2 class="block-title">Tout ce qui se passe <br /><span>près de chez toi</span></h2>
			<p class="block-desc">L'agenda communautaire numéro 1 de l'Ouest Lyonnais.</p>
		</div>

		<div class="agenda-content">
			<EventTypes />
			
			<!-- <div class="agenda-separator">
				<div class="sep-line"></div>
				<span class="sep-text">Votre évènement ici ?</span>
				<div class="sep-line"></div>
			</div> -->

			<PublierSection />
		</div>

			<PreHero />
	</section>
	<!-- BLOC BONS PLANS -->
	<div class="homepage-block bons-plans-block">
		<BonsPlansSection />
	</div>

	<Features />
	<HIW />
	<Testimonials />
	<CTAFinal />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 0 1rem 4rem;
		max-width: 1250px;
		margin: 0 auto;
	}

	.homepage-block {
		width: 100%;
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	/* AGENDA BLOCK REDESIGN */
	.agenda-block {
		background: linear-gradient(180deg, #f8fafc 0%, white 100%);
		padding: 6rem 1.5rem 3rem;
		border-radius: 60px;
		margin-bottom: 2rem;
	}

	.block-header {
		text-align: center;
		margin-bottom: 4rem;
	}

	.block-tag {
		display: inline-block;
		background: rgba(255, 97, 1, 0.1);
		color: var(--cta);
		font-weight: 800;
		font-size: 2.8rem;
		padding: 0.5rem 1.5rem;
		border-radius: 30px;
		letter-spacing: 1px;
		margin-bottom: 1.5rem;
	}

	@media (max-width: 768px) {
		.block-tag {
			font-size: 1.5rem;
			padding: 0.4rem 1.2rem;
		}
	}

	.block-title {
		font-family: var(--FFTitle);
		font-size: clamp(2.5rem, 8vw, 4.5rem);
		font-weight: 900;
		color: var(--textDark);
		line-height: 1;
		margin-bottom: 1.5rem;
	}

	.block-title span {
		background: linear-gradient(135deg, #fb8943 0%, #F96910 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.block-desc {
		color: #64748b;
		font-size: 1.25rem;
		max-width: 600px;
		margin: 0 auto;
		line-height: 1.6;
	}

	.agenda-content {
		max-width: 1000px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3rem;
		margin-bottom: 4rem;
	}

	/* .agenda-separator {
		display: flex;
		align-items: center;
		gap: 2rem;
		width: 100%;
		max-width: 500px;
		margin: 5rem 0;
	}

	.sep-line {
		flex: 1;
		height: 1px;
		background: #e2e8f0;
	}

	.sep-text {
		color: #94a3b8;
		font-size: 0.9rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 1px;
		white-space: nowrap;
	} */

	@media (max-width: 768px) {
		.agenda-block {
			padding: 4rem 1rem;
		}

		/* .agenda-separator {
			margin: 3rem 0;
		} */
	}
</style>
