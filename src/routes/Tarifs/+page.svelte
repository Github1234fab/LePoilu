<script>
	const pricing = [
		{ name: 'À l’unité', price: '4,99 €', details: ['1 annonce', 'Modération standard (< 24h)'] },
		{ name: 'Pack 10', price: '19,90 €', details: ['10 annonces', 'Modération prioritaire'] },
		{
			name: 'Pro (mensuel)',
			price: '24,99 €',
			details: ['Illimité', 'Badge organisateur vérifié']
		}
	];
</script>

<svelte:head>
	<title>Publier un événement — Le Poilu</title>
	<meta
		name="description"
		content="Publiez votre événement local en 2 minutes. Paiement sécurisé, modération rapide, grande visibilité locale."
	/>
</svelte:head>

<section class="wrap">
	<h1>Publier un événement</h1>
	<p class="lead">
		Créez votre annonce, payez et elle sera mise en ligne après modération. Offres de
		lancement disponibles.
	</p>

	<div class="grid">
		{#each pricing as tier}
			<article class="card">
				<h2>{tier.name}</h2>
				<p class="price">{tier.price}</p>
				<ul>
					{#each tier.details as d}
						<li>{d}</li>
					{/each}
				</ul>
				<a class="btn btn-dark" href="/Telecharger">Commencer</a>
			</article>
		{/each}
	</div>

	<div class="howto">
		<h2>Comment ça marche ?</h2>
		<ol>
			<li>Créez votre événement (titre, date, lieu, description, image).</li>
			<li>Choisissez votre formule et payez en ligne.</li>
			<li>Nous modérons en moins de 24 h (ou prioritaire).</li>
			<li>Votre annonce est publiée et visible par les utilisateurs.</li>
		</ol>
	</div>
</section>

<style>
	.wrap {
		max-width: 1100px;
		margin: 0 auto;
		padding: 48px 16px;
		color: #1c1c1c;
        background-image: url('../../lib/assets/Poilu-jumelles.png');
	}
	h1 {
		font-size: 2rem;
		margin: 0 0 8px;
	}
	.lead {
		color: #555;
		margin: 0 0 24px;
		max-width: 720px;
		border-radius: 18px;
		backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        background-color:#fdfcfc2c  ;  
		max-width: 270px; 
	}
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
	@media (min-width: 900px) {
		.grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	.card {
		border: 1px solid #e5e5e5;
		border-radius: 12px;
		padding: 16px;
		background: #fff;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	h2 {
		font-size: 1.1rem;
		margin: 0;
	}
	.price {
		font-size: 1.6rem;
		font-weight: 700;
		margin: 4px 0 8px;
	}
	ul {
		margin: 0 0 12px 18px;
	}
	.btn {
		display: inline-block;
		padding: 10px 14px;
		border: 1px solid #1c1c1c;
		border-radius: 10px;
		text-decoration: none;
		color: #1c1c1c;
	}
	.btn-dark {
		background: #1c1c1c;
		color: #fff;
	}
	.btn:focus {
		outline: 2px solid #0a84ff;
		outline-offset: 2px;
	}
	.howto {
		border: 1px solid #e5e5e5;
		border-radius: 12px;
		padding: 16px;
		margin-top: 24px;
		background: #fafafa;
	}
	.howto h2 {
		margin: 0 0 8px;
	}
	ol {
		margin: 0 0 0 18px;
	}
</style>
