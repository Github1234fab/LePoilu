<script>
	import { fade, fly } from 'svelte/transition';
	import screenA from '$lib/assets/screen_sponsorA.webp';
	import screenB from '$lib/assets/screen_sponsorB.webp';
	import screenD from '$lib/assets/screen_SponsorD.webp';
</script>

<svelte:head>
	<title>Attirez de nouveaux clients - Le Poilu</title>
</svelte:head>

<div class="page-wrapper">
	<!-- HERO SECTION -->
	<header class="hero-section">
		<div class="hero-content">
			<div class="badge-new" in:fade={{ delay: 100 }}><i class="fa-solid fa-bolt"></i> Nouveau</div>
			<h1 in:fly={{ y: 20, duration: 600 }}>
				Transformez l'audience du <span class="highlight">Poilu</span> en clients.
			</h1>
			<p class="hero-subtitle" in:fade={{ delay: 200 }}>
				Le principe est simple : Vous proposez une offre exclusive sur l'app. La tribu du Poilu
				vient en profiter !
			</p>
			<a href="/carnet/rejoindre/inscription" class="cta-button big-pulse">
				Je lance mon offre <i class="fa-solid fa-arrow-right"></i>
			</a>
		</div>

		<div class="hero-visual" in:fly={{ x: 50, duration: 800, delay: 300 }}>
			<div class="phone-mockup">
				<img src={screenB} alt="Exemple d'offre sur mobile" />
				<div class="floating-card">
					<i class="fa-solid fa-check-circle text-success"></i> "Bonjour ! J'ai vu votre offre sur Le
					Poilu."
				</div>
			</div>
		</div>
	</header>

	<!-- STEPS SECTION -->
	<section class="steps-section">
		<h2 class="section-title">Comment ça marche ?</h2>
		<div class="steps-grid">
			<div class="step-card">
				<div class="step-number">1</div>
				<h3>Vous créez votre fiche</h3>
				<p>Renseignez vos infos et choisissez votre plan Premium.</p>
			</div>
			<div class="step-line"></div>
			<div class="step-card">
				<div class="step-number">2</div>
				<h3>Vous définissez une offre</h3>
				<p>Ex: "Café offert", "-20% le mardi", "Dessert offert"...</p>
			</div>
			<div class="step-line"></div>
			<div class="step-card">
				<div class="step-number">3</div>
				<h3>Les clients arrivent</h3>
				<p>Ils présentent l'offre sur leur téléphone lors du passage en caisse.</p>
			</div>
		</div>
	</section>

	<!-- SHOWCASE SECTION (NEW) -->
	<section class="showcase-section">
		<h2 class="section-title">L'application "All-in-one" de l'ouest Lyonnais</h2>
		<p class="section-subtitle">
			Une interface moderne et intuitive qui met votre commerce en valeur.
		</p>

		<div class="app-screens">
			<div class="screen-item" in:fly={{ y: 50, duration: 800 }}>
				<img src={screenA} alt="Liste des commerces" />
				<div class="screen-caption">Un Carnet Clair</div>
			</div>
			<div class="screen-item center-screen" in:fly={{ y: 50, duration: 800, delay: 200 }}>
				<img src={screenB} alt="Fiche commerce détaillée" />
				<div class="screen-caption">Votre Fiche Complète</div>
			</div>
			<div class="screen-item" in:fly={{ y: 50, duration: 800, delay: 400 }}>
				<img src={screenD} alt="Offre promotionalle" />
				<div class="screen-caption">Vos Offres Exclusives</div>
			</div>
		</div>
	</section>

	<!-- EXAMPLES SECTION -->
	<section class="examples-section">
		<h2 class="section-title">Des exemples concrets</h2>
		<p class="section-subtitle">Quel que soit votre métier, vous avez une offre à proposer.</p>

		<div class="examples-grid">
			<!-- Example 1 -->
			<div class="example-card">
				<div class="example-icon"><i class="fa-solid fa-bread-slice"></i></div>
				<div class="example-content">
					<h3>Boulangerie</h3>
					<div class="offer-box">"1 Croissant offert pour tout achat de 10€"</div>
					<p class="result">
						<i class="fa-solid fa-chart-line"></i> +15 paniers moyens augmentés / semaine
					</p>
				</div>
			</div>

			<!-- Example 2 -->
			<div class="example-card">
				<div class="example-icon"><i class="fa-solid fa-scissors"></i></div>
				<div class="example-content">
					<h3>Coiffeur</h3>
					<div class="offer-box">"-20% sur la coupe Homme le Mardi matin"</div>
					<p class="result"><i class="fa-solid fa-clock"></i> Remplissage des créneaux creux</p>
				</div>
			</div>

			<!-- Example 3 -->
			<div class="example-card">
				<div class="example-icon"><i class="fa-solid fa-utensils"></i></div>
				<div class="example-content">
					<h3>Restaurateur</h3>
					<div class="offer-box">"Le café offert pour tout Menu du Jour"</div>
					<p class="result">
						<i class="fa-solid fa-heart"></i> Fidélisation de la clientèle locale
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- FINAL CTA -->
	<section class="final-cta">
		<h2>Prêt à booster votre activité ?</h2>
		<a href="/carnet/rejoindre/inscription" class="cta-button">
			Rejoindre Le Carnet <i class="fa-solid fa-star"></i>
		</a>
		<p class="sub-cta">Sans engagement. Annulable à tout moment.</p>
	</section>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: 'Poppins', sans-serif;
	}

	.page-wrapper {
		background: #ffffff;
		overflow-x: hidden;
	}

	/* --- HERO --- */
	.hero-section {
		min-height: 80vh;
		max-width: var(--desktop);
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		padding: var(--spacing-xl) var(--spacing-md);
		gap: var(--spacing-xl);
	}

	.hero-content h1 {
		font-family: var(--FFTitle);
		font-size: 3.5rem;
		line-height: 1.1;
		margin-bottom: var(--spacing-md);
		color: var(--text);
	}

	.highlight {
		color: var(--cta);
		position: relative;
		white-space: nowrap;
	}

	.highlight::after {
		content: '';
		position: absolute;
		bottom: 5px;
		left: 0;
		width: 100%;
		height: 15px;
		background: #fbd5c6;
		z-index: -1;
		opacity: 0.6;
		transform: rotate(-2deg);
	}

	.hero-subtitle {
		font-size: 1.3rem;
		color: var(--secondary);
		margin-bottom: var(--spacing-lg);
		line-height: 1.6;
		max-width: 90%;
	}

	.badge-new {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: #e6f4ea;
		color: #1e8e3e;
		padding: 6px 16px;
		border-radius: 50px;
		font-weight: 700;
		font-size: 0.9rem;
		margin-bottom: var(--spacing-md);
		text-transform: uppercase;
	}

	/* Hero Visual */
	.phone-mockup {
		position: relative;
		width: 280px;
		margin: 0 auto;
	}

	.phone-mockup img {
		width: 100%;
		border-radius: 30px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
		border: 8px solid white;
	}

	.floating-card {
		position: absolute;
		bottom: 10%;
		left: -40px;
		background: white;
		padding: 15px 20px;
		border-radius: 12px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
		font-weight: 600;
		display: flex;
		align-items: center;
		gap: 10px;
		width: 300px;
		font-size: 0.9rem;
		animation: float 4s ease-in-out infinite;
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	/* --- STEPS --- */
	.steps-section {
		background: #f8f9fa;
		padding: var(--spacing-xl) var(--spacing-md);
		text-align: center;
	}

	.section-title {
		font-size: 2.5rem;
		margin-bottom: var(--spacing-xl);
		color: var(--text);
		font-family: var(--FFTitle);
	}

	.steps-grid {
		max-width: 1000px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		position: relative;
	}

	.step-card {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 15px;
		padding: 0 20px;
	}

	.step-number {
		width: 50px;
		height: 50px;
		background: var(--cta);
		color: white;
		font-size: 1.5rem;
		font-weight: 700;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 10px;
	}

	.step-card h3 {
		font-size: 1.2rem;
		margin-bottom: 5px;
	}
	.step-card p {
		font-size: 0.95rem;
		color: var(--secondary);
	}

	.step-line {
		flex: 0.5;
		height: 2px;
		background: #e9ecef;
		margin-top: 25px;
	}

	/* --- SHOWCASE --- */
	.showcase-section {
		padding: var(--spacing-xl) var(--spacing-md);
		text-align: center;
		background: white;
		overflow: hidden;
	}

	.app-screens {
		display: flex;
		justify-content: center;
		align-items: flex-end; /* Align bottom to handle different sizes if any */
		gap: 30px;
		padding-top: 30px;
		flex-wrap: wrap;
	}

	.screen-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 15px;
		width: 220px;
	}

	.screen-item img {
		width: 100%;
		border-radius: 20px;
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
		border: 6px solid #f8f9fa;
		transition: transform 0.3s ease;
	}

	.screen-item:hover img {
		transform: translateY(-10px);
	}

	.center-screen {
		z-index: 2;
		width: 240px; /* Slightly bigger */
	}

	.center-screen img {
		box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
		border: 8px solid white;
	}

	.screen-caption {
		font-weight: 700;
		color: var(--text);
		font-size: 1.1rem;
	}

	/* --- EXAMPLES --- */
	.examples-section {
		padding: var(--spacing-xl) var(--spacing-md);
		max-width: var(--desktop);
		margin: 0 auto;
		text-align: center;
	}

	.section-subtitle {
		font-size: 1.2rem;
		color: var(--secondary);
		margin-top: -30px;
		margin-bottom: var(--spacing-xl);
	}

	.examples-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--spacing-lg);
	}

	.example-card {
		background: white;
		border: 1px solid #eee;
		border-radius: var(--radius-lg);
		padding: 30px;
		transition: transform 0.3s ease;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
	}

	.example-card:hover {
		transform: translateY(-10px);
		box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
	}

	.example-icon {
		font-size: 2.5rem;
		color: var(--secondary);
		margin-bottom: 20px;
	}

	.offer-box {
		background: #fff5f2;
		color: var(--cta);
		font-weight: 700;
		padding: 10px;
		border-radius: 8px;
		margin: 15px 0;
		font-size: 0.95rem;
		border: 1px dashed var(--ctaFade);
	}

	.result {
		font-size: 0.85rem;
		color: #10b981;
		font-weight: 600;
	}

	/* --- FINAL CTA --- */
	.final-cta {
		background: #073b4c;
		color: white;
		text-align: center;
		padding: var(--spacing-xl) var(--spacing-md);
	}

	.final-cta h2 {
		color: white;
		margin-bottom: var(--spacing-lg);
		font-size: 2.5rem;
	}

	.cta-button {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		background: var(--cta);
		color: white;
		padding: 15px 30px;
		border-radius: 50px;
		font-weight: 700;
		font-size: 1.2rem;
		text-decoration: none;
		transition: all 0.3s ease;
		box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
	}

	.cta-button:hover {
		transform: scale(1.05);
		background: var(--ctaHover);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
	}

	.big-pulse {
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0% {
			box-shadow: 0 0 0 0 rgba(217, 70, 122, 0.4);
		}
		70% {
			box-shadow: 0 0 0 15px rgba(217, 70, 122, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(217, 70, 122, 0);
		}
	}

	.sub-cta {
		margin-top: 15px;
		opacity: 0.7;
		font-size: 0.9rem;
	}

	.text-success {
		color: #10b981;
	}

	/* RESPONSIVE */
	@media (max-width: 1024px) {
		.hero-section {
			grid-template-columns: 1fr;
			text-align: center;
		}

		.hero-content h1 {
			font-size: 2.5rem;
		}
		.hero-subtitle {
			margin: 0 auto var(--spacing-lg) auto;
		}

		.steps-grid {
			flex-direction: column;
			align-items: center;
			gap: 30px;
		}
		.step-line {
			display: none;
		}

		.examples-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
