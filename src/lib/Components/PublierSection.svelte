<script>
	import { onMount } from 'svelte';
	import Map from '../assets/Map.png'; // Reusing Map asset if available, or just text
</script>

<section class="publish-section">
	<div class="content-container">
		<div class="text-content">
			<h2 class="section-title">Vous souhaitez publier un évènement ?</h2>
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

			<div class="cta-cards">
				<a href="/Tarifs" class="cta-card card-event">
					<span class="card-icon">📅</span>
					<span class="card-title">Événement</span>
					<span class="card-desc">Publiez vots évènements ...</span>
					<span class="card-cta">Publier →</span>
				</a>
				<a href="/carnet/rejoindre" class="cta-card card-shop">
					<span class="card-icon">🏪</span>
					<span class="card-title">Commerçant</span>
					<span class="card-desc">Créez votre vitrine locale</span>
					<span class="card-cta">Créer →</span>
				</a>
			</div>
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

	.cta-cards {
		display: flex;
		gap: var(--spacing-lg);
		justify-content: center;
		flex-wrap: wrap;
	}

	.cta-card {
		background-color: #f9f9f9;
		border-radius: var(--radius-md);
		padding: 24px 28px;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		text-decoration: none;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
		transition: transform 0.2s, box-shadow 0.2s;
		min-width: 220px;
		max-width: 260px;
	}

	.cta-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
	}

	.card-icon {
		font-size: 2.5rem;
		margin-bottom: 10px;
	}

	.card-title {
		font-family: var(--FFTitle);
		font-weight: 700;
		font-size: 1.4rem;
		color: var(--text);
		margin-bottom: 8px;
	}

	.card-desc {
		font-size: 0.95rem;
		color: #666;
		line-height: 1.4;
		flex: 1;
		margin-bottom: 15px;
	}

	.card-cta {
		font-family: var(--FFTitle);
		font-weight: 700;
		font-size: 1rem;
		padding: 10px 24px;
		border-radius: 50px;
		transition: background-color 0.2s;
		margin-top: auto;
	}

	.card-event .card-cta {
		background-color: #ff6101;
		color: white;
	}

	.card-event:hover .card-cta {
		background-color: #e55500;
	}

	.card-shop .card-cta {
		background-color: #2563eb;
		color: white;
	}

	.card-shop:hover .card-cta {
		background-color: #1d4ed8;
	}

	@media (max-width: 768px) {
		.benefits {
			grid-template-columns: 1fr;
			gap: var(--spacing-md);
		}

		.publish-section {
			padding: var(--spacing-lg) var(--spacing-sm);
		}

		.cta-cards {
			flex-direction: column;
			align-items: center;
			gap: var(--spacing-md);
		}

		.cta-card {
			min-width: 280px;
			max-width: 100%;
		}
	}
</style>
