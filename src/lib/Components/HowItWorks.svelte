<script>
	import PoiluFace from '../assets/LePoilu-face.png';
	const steps = [
		{
			number: '1',
			title: "Télécharge l'app",
			description: 'Disponible sur iOS et Android'
		},
		{
			number: '2',
			title: 'Tu fais défiler et tu choisis',
			description: 'Consulte  en scrollant et en utilisant les filtres'
		},
		{
			number: '3',
			title: 'Découvre et profite',
			description: 'Explore les événements et planifie tes sorties'
		}
	];
</script>

<section class="how-it-works">
	<div class="how-it-works-container">
		<h2 class="section-title">Comment ça marche ?</h2>
		<p class="section-subtitle">Trois étapes simples pour commencer</p>
		<img class="poilu-face" src={PoiluFace} alt="Personnage le poilu de face" />
		<div class="steps-container">
			{#each steps as step, index}
				<div class="step">
					<div class="step-number">{step.number}</div>
					<h3 class="step-title">{step.title}</h3>
					<p class="step-description">{step.description}</p>
				</div>
				{#if index < steps.length - 1}
					<div class="step-arrow">→</div>
				{/if}
			{/each}
		</div>
		<a class="btn-link-app" href="#hero-link-app" target="_blank">Télécharger Le Poilu</a>
	</div>
</section>

<style>
	.how-it-works {
		background-color: var(--background);
		border-radius: 18px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 0;
		padding: 40px;
	}

	.how-it-works-container {
		border-radius: 18px;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 0;
	}

	.steps-container {
		margin-top: 0px;
		display: flex;
		gap: 20px;
		align-items: center;
		justify-content: center;
		/* flex-wrap: wrap; */
	}
	.step {
		border-radius: 18px;
		height: 300px;
		display: flex;
		padding: 20px;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 0;
		background-color: var(--ctaSecondary);
		color: var(ctaText);
		text-align: center;
		width: 40%;
	}
	.poilu-face {
		height: 150px;
		margin-right: 20px;
	}
	.step-number {
		font-size: 3rem;
		font-weight: 900;
		margin-bottom: 10px;
		background-color: white;
		height: 100px;
		width: 100px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.step-title {
		color: var(--ctaText);
		margin-bottom: 20px;
	}
	.step-description {
		color: var(--ctaText);
		max-width: 70%;
	}
	.step-arrow {
		padding: 5px;
	}
	.btn-link-app {
		display: inline-block;
		margin: 50px auto;
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

	@media (max-width: 900px) {
		.step {
			width: 80%;
			height: auto;
		}
		.steps-container {
			flex-direction: column;
		}
		.step-arrow {
			padding: 5px;
			rotate: 90deg;
		}
		.section-subtitle {
			font-family: var(--FFTitle);
			margin-top: 10px;
		}
	}
</style>
