<script>
	import PoiluFace from '../assets/LePoilu-face.png';
	const steps = [
		{
			number: '1',
			title: "Télécharge l'app",
			 description: 'Disponible sur iOS et Android en un clic.<br><br>L\'appli va s\'installer toute seule sur ton smartphone !'
		},
		{
			number: '2',
			title: 'Tu fais défiler, tu filtres',
			description: 'Consulte les évènements en scrollant et en utilisant les filtres.<br><br>Les évènements sont classés du plus proche au plus lointain, chronologiquement parlant.'
		},
		{
			number: '3',
			title: 'Découvre et profite',
			description: 'Explore les événements, planifie tes sorties.<br><br>Like, partage et surtout amuse-toi bien !'
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
					<p class="step-description">{@html step.description}</p>
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
		background: linear-gradient(135deg, var(--ctaSecondary), #FF6101);
		border-radius: 18px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 0;
		padding: 40px;
		box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.293);
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
		height: 500px;
		display: flex;
		padding: 30px;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		z-index: 0;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background-color: rgba(255, 255, 255, 0.25);
		border: 1px solid rgba(255, 255, 255, 0.3);
		box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
		color: white;
		text-align: center;
		width: 40%;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		gap: 20px;
	}

	.step:hover {
		transform: translateY(-5px);
		box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.25);
	}
	.poilu-face {
		height: 350px;
		margin-right: 20px;
	}
	.step-number {
		font-size: 3rem;
		font-weight: 900;
		margin-top: 20px;
		margin-bottom: 0px;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
		color: #FF6101;
		height: 100px;
		width: 100px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
		border: 2px solid rgba(255, 255, 255, 0.4);
		flex-shrink: 0;
	}
	.section-title {
		color: white;
		font-family: var(--FFTitle);
		font-weight: 900;
		font-size: 2.5rem;
		text-align: center;
		margin-bottom: 10px;
	}

	.section-subtitle {
		color: white;
		font-family: var(--FFTitle);
		font-size: 1.1rem;
		text-align: center;
		margin-bottom: 20px;
	}

	.step-title {
		color: white;
		font-family: var(--FFTitle);
		font-weight: 700;
		font-size: 1.3rem;
		margin-top: 0px;
		margin-bottom: 0px;
	}
	.step-description {
		color: white;
		font-family: var(--FFTitle);
		max-width: 85%;
		line-height: 1.5rem;
		opacity: 0.95;
		margin-top: 0px;
	}
	.step-arrow {
		padding: 5px;
		font-size: 2rem;
		color: white;
		font-weight: bold;
	}
	.btn-link-app {
		display: inline-block;
		margin: 50px auto;
		padding: 18px 40px;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background-color: var(--cta);
		color: white;
		text-decoration: none;
		font-weight: 700;
		font-size: 1.1rem;
		border-radius: 12px;
		border: 2px solid rgba(255, 255, 255, 0.4);
		transition: all 0.3s ease;
		font-family: var(--FFTitle);
		text-align: center;
		z-index: 2;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
	}

	.btn-link-app:hover {
		background: rgba(255, 255, 255, 0.5);
		transform: scale(1.05);
		box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
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
		.poilu-face {
		height: 200px;
		margin-right: 20px;
	}
	}
</style>
