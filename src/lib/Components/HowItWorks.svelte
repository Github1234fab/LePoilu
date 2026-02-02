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
			title: 'Scrolle. ',
			description: 'Consulte les évènements en faisant défiler la liste des évènements et en utilisant les filtres.'
		},
		{
			number: '3',
			title: 'Créer un compte',
			description: 'Créer un compte si tu veux marquer tes favoris et les retrouver plus tard!'
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
		<a class="btn-link-app" href="/Telecharger" target="_blank">Télécharger Le Poilu</a>
	</div>
</section>

<style>
	.how-it-works {
		background-color:  #FF6101;
		border-radius: var(--radius-lg);
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 0;
		padding: var(--spacing-lg);
		box-shadow: var(--shadow);
		margin-bottom: 100px;
	}

	.how-it-works-container {
		border-radius: var(--radius-lg);
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
		gap: var(--spacing-md);
		align-items: center;
		justify-content: center;
	}
	.step {
		border-radius: var(--radius-lg);
		height: 100%;
		display: flex;
		padding: var(--spacing-md);
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
		transition: transform var(--transition-normal), box-shadow var(--transition-normal);
		gap: var(--spacing-md);
	}

	.step:hover {
		transform: translateY(-5px);
		box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.25);
	}
	.poilu-face {
		height: clamp(200px, 30vw, 350px);
		margin-right: var(--spacing-md);
		transition: transform var(--transition-slow);
	}
	.poilu-face:hover {
		transform: scale(1.05);
	}
	.step-number {
		font-size: clamp(2.5rem, 5vw, 3rem);
		font-weight: 900;
		margin-top: var(--spacing-md);
		margin-bottom: 0px;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
		color: #FF6101;
		height: 100px;
		width: 100px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: var(--shadow3);
		border: 2px solid rgba(255, 255, 255, 0.4);
		flex-shrink: 0;
		transition: transform var(--transition-normal);
	}
	.step:hover .step-number {
		transform: scale(1.1);
	}
	.section-title {
		color: white;
		font-family: var(--FFTitle);
		font-weight: 900;
		font-size: clamp(1.8rem, 4vw, 2.5rem);
		text-align: center;
		margin-bottom: var(--spacing-sm);
	}

	.section-subtitle {
		color: white;
		font-family: var(--FFTitle);
		font-size: clamp(1rem, 2vw, 1.1rem);
		text-align: center;
		margin-bottom: var(--spacing-md);
	}

	.step-title {
		color: white;
		font-family: var(--FFTitle);
		font-weight: 700;
		font-size: clamp(1.1rem, 2.5vw, 1.3rem);
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
		font-size: clamp(0.9rem, 1.5vw, 1rem);
	}
	.step-arrow {
		padding: var(--spacing-xs);
		font-size: clamp(1.5rem, 3vw, 2rem);
		color: white;
		font-weight: bold;
		transition: transform var(--transition-normal);
	}
	.step-arrow:hover {
		transform: scale(1.2);
	}
	.btn-link-app {
		display: inline-block;
		margin: var(--spacing-xl) auto;
		padding: var(--spacing-sm) var(--spacing-lg);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background-color: var(--cta);
		color: white;
		text-decoration: none;
		font-weight: 700;
		font-size: clamp(1rem, 2vw, 1.1rem);
		border-radius: var(--radius-md);
		border: 2px solid rgba(255, 255, 255, 0.4);
		transition: all var(--transition-normal);
		font-family: var(--FFTitle);
		text-align: center;
		z-index: 2;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
	}

	.btn-link-app:hover {
		background: rgba(255, 255, 255, 0.5);
		transform: scale(1.05);
		box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
		color: var(--text);
	}

	@media (max-width: 1024px) {
		.steps-container {
			flex-wrap: wrap;
			gap: var(--spacing-md);
		}
		.step {
			width: 45%;
		}
	}

	@media (max-width: 768px) {
		.step {
			width: 100%;
			height: auto;
		}
		.steps-container {
			flex-direction: column;
		}
		.step-arrow {
			padding: var(--spacing-xs);
			rotate: 90deg;
		}
		.section-subtitle {
			font-family: var(--FFTitle);
			margin-top: var(--spacing-sm);
		}
		.how-it-works {
			padding: var(--spacing-md);
		}
	}

	@media (max-width: 480px) {
		.how-it-works {
			padding: var(--spacing-sm);
		}
		.step {
			padding: var(--spacing-sm);
			gap: var(--spacing-sm);
		}
		.step-number {
			height: 80px;
			width: 80px;
		}
	}
</style>
