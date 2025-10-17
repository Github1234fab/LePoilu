<svelte:head>
	<title>Fonctionnalités — Le Poilu</title>
	<meta
		name="description"
		content="Filtres avancés, publication d’événements, alertes, cartes et plus dans l’application Le Poilu."
	/>
</svelte:head>

<section class="wrap">
    <h1>Fonctionnalités</h1>
	<p class="lead">
		Le Poilu vous aide à trouver des idées sorties locales et à publier vos propres événements en
		quelques minutes.
	</p>
	
	<div class="grid">
    

		<article class="card">
			<h2>Recherche et filtres</h2>
			<ul>
				<li>Ville, dates, catégories, gratuit, famille</li>
				<li>Tri par pertinence et proximité</li>
			</ul>
		</article>
		<article class="card">
			<h2>Publication express</h2>
			<p>Créer → payer → modération → en ligne. Simple et clair.</p>
		</article>
		<article class="card">
			<h2>Alertes et favoris</h2>
			<p>Soyez notifié quand un événement vous correspond.</p>
		</article>
		<article class="card">
			<h2>Cartes & itinéraires</h2>
			<p>Visualisez rapidement l’emplacement et accédez au trajet.</p>
		</article>
	</div>
</section>

<style>
	.wrap {
		max-width: 1200px;
		margin: 0 auto;
		padding: 48px 16px;
		color: #1c1c1c;
		height: 800px;
		background-image: url('../../lib/assets/Poilu-jumelles.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
        display: flex;
        flex-direction: column;
        align-items: baseline;
        justify-content: center;
	}
	h1 {
		font-size: 2.25rem;
		line-height: 1.2;
		margin: 0 0 8px;
	}
	/* .lead {
		max-width: 720px;
		color: #555;
		margin: 0 0 24px;
	} */
	.grid {
		display: grid;
		gap: 16px;
		grid-template-columns: repeat(1, minmax(0, 1fr));
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        background-color:#c27b2f56  ;    
         padding: 45px 20px;
        margin-top: 25%;
        border-radius: 18px;

	}
	@media (min-width: 768px) {
		.grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	.card {
		border: 1px solid #e5e5e5;
		border-radius: 12px;
		padding: 16px;
		background: #fff;
	}
	h2 {
		font-size: 1.1rem;
		margin: 0 0 8px;
	}
	ul {
		margin: 8px 0 0 18px;
	}
</style>
