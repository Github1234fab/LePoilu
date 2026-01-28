<script>
	import { onMount } from 'svelte';
	import Map from '../assets/Map.png'; // Reusing Map asset if available, or just text
</script>

<section class="publish-section">
	<div class="content-container">
		<div class="text-content">
			<h2 class="section-title">Vous organisez un événement ?</h2>
			<p class="section-subtitle">
				Associations, mairies, commerçants ou particuliers : diffusez vos événements auprès de toute
				la communauté de l'Ouest Lyonnais.
			</p>

			<div class="benefits">
				<div class="benefit-item">
					<span class="icon">📢</span>
					<h3>Visibilité locale</h3>
					<p>Touchez directement les habitants intéressés par les sorties locales.</p>
				</div>
				<div class="benefit-item">
					<span class="icon">⚡️</span>
					<h3>Publication rapide</h3>
					<p>En quelques clics, votre annonce est en ligne et visible par toute la tribu du Poilu.</p>
				</div>
				<div class="benefit-item">
					<span class="icon">📱</span>
					<h3>Accessible partout</h3>
					<p>Visible sur l'application iOS, Android, publication via le site web.</p>
				</div>
			</div>

			<a href="/Tarifs" class="btn-publish"> Publier une annonce </a>
		</div>
	</div>
</section>

<style>
	.publish-section {
		padding: var(--spacing-xl) var(--spacing-md);
		background-color: white;
		border-radius: var(--radius-lg);
		margin-bottom: 100px;
		box-shadow: var(--shadow);
		position: relative;
		overflow: hidden;
	}

	.content-container {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.section-title {
		font-family: var(--FFTitle);
		font-size: clamp(2rem, 5vw, 3rem);
		color: var(--ctaSecondary); /* Dark blue/purple usually */
		margin-bottom: var(--spacing-sm);
		font-weight: 900;
	}

	.section-subtitle {
		font-size: clamp(1rem, 2vw, 1.2rem);
		color: var(--text);
		max-width: 800px;
		line-height: 1.6;
		margin: 30px auto;
	}

	.benefits {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--spacing-lg);
		margin-bottom: var(--spacing-xl);
		width: 100%;
	}

	.benefit-item {
		background: #f9f9f9;
		padding: var(--spacing-md);
		border-radius: var(--radius-md);
		transition: transform 0.3s ease;
	}

	.benefit-item:hover {
		transform: translateY(-5px);
		background: #f0f0f0;
	}

	.icon {
		font-size: 3rem;
		display: block;
		margin-bottom: var(--spacing-sm);
	}

	.benefit-item h3 {
		font-family: var(--FFTitle);
		color: var(--ctaSecondary);
		margin-bottom: var(--spacing-xs);
		font-weight: 700;
		font-size: 1.2rem;
	}

	.benefit-item p {
		color: var(--text);
		font-size: 0.95rem;
		line-height: 1.5;
	}

	.btn-publish {
		display: inline-block;
		background-color: var(--cta); /* Classic orange button */
		color: white;
		padding: 15px 40px;
		border-radius: 50px;
		font-family: var(--FFTitle);
		font-weight: 700;
		font-size: 1.2rem;
		text-decoration: none;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
		box-shadow: 0 4px 15px rgba(255, 97, 1, 0.3);
	}

	.btn-publish:hover {
		transform: scale(1.05);
		box-shadow: 0 8px 25px rgba(255, 97, 1, 0.5);
	}

	@media (max-width: 768px) {
		.benefits {
			grid-template-columns: 1fr;
			gap: var(--spacing-md);
		}

		.publish-section {
			padding: var(--spacing-lg) var(--spacing-sm);
		}
	}
</style>
