<script>
	import { onMount } from 'svelte';
	import Map from '../assets/Map.png'; // Reusing Map asset if available, or just text
</script>

<div class="benefits">
	<div class="benefit-item">
		<i class="fa-solid fa-bullhorn benefit-icon"></i>
		<h3>Visibilité locale</h3>
		<p>Plus de 500 utilisateurs actifs dans l'Ouest Lyonnais.</p>
	</div>
	<div class="benefit-item">
		<i class="fa-solid fa-bolt benefit-icon"></i>
		<h3>Parution Flash</h3>
		<p>Ton annonce en ligne en moins de 2 minutes.</p>
	</div>
	<div class="benefit-item">
		<i class="fa-solid fa-mobile-screen benefit-icon"></i>
		<h3>Gratuit ou plus aboutit</h3>
		<p>Publie gratuitement ou opte pour plus de visibilité.</p>
	</div>
</div>

<div class="cta-cards">
	<a href="/Tarifs" class="cta-card card-event">
		<span class="card-icon">📅</span>
		<span class="card-title">Prêt à publier ?</span>
		<span class="card-desc">Asso, club ou particulier : diffuse ton évènement dès maintenant.</span>
		<span class="card-cta">Publier mon annonce →</span>
	</a>
</div>

<style>
	.benefits {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		margin: 2rem 0;
		width: 100%;
		max-width: 1000px;
	}

	.benefit-item {
		text-align: center;
		padding: 1rem;
	}

	.benefit-icon {
		font-size: 2rem;
		color: #10b981;
		margin-bottom: 1rem;
	}

	.benefit-item h3 {
		font-family: var(--FFTitle);
		color: var(--textDark);
		margin-bottom: 0.5rem;
		font-weight: 800;
	}

	.benefit-item p {
		color: #64748b;
		font-size: 0.95rem;
		line-height: 1.5;
	}

	.cta-cards {
		display: flex;
		justify-content: center;
		margin-top: 2rem;
	}

	.cta-card {
		background-color: white;
		border-radius: 24px;
		padding: 40px;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		text-decoration: none;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
		transition: transform 0.2s, box-shadow 0.2s;
		max-width: 450px;
		border: 1px solid #f1f5f9;
	}

	.cta-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
	}

	.card-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.card-title {
		font-family: var(--FFTitle);
		font-weight: 800;
		font-size: 1.8rem;
		color: var(--textDark);
		margin-bottom: 0.5rem;
	}

	.card-desc {
		font-size: 1.1rem;
		color: #64748b;
		margin-bottom: 2rem;
	}

	.card-cta {
		font-family: var(--FFTitle);
		font-weight: 800;
		background-color: #ff6101;
		color: white;
		padding: 1rem 2.5rem;
		border-radius: 50px;
		transition: background 0.2s;
	}

	.card-event:hover .card-cta {
		background-color: #e55500;
	}

	@media (max-width: 768px) {
		.benefits {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}
</style>
