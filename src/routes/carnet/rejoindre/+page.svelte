<script>
	import { fade, fly } from 'svelte/transition';
	import screenA from '$lib/assets/screen_sponsorA.webp';
	import screenB from '$lib/assets/screen_sponsorB.webp';
	import screenD from '$lib/assets/screen_sponsor_d.webp';
</script>

<svelte:head>
	<title>Attirez de nouveaux clients - Le Poilu</title>
</svelte:head>

<div class="page-wrapper">
	<!-- HERO SECTION -->
	<header class="hero-section">
		<div class="hero-content">
			<div class="badge-pro" in:fade={{ delay: 100 }}><i class="fa-solid fa-store"></i> Pour les commerçants locaux</div>
			<h1 in:fly={{ y: 20, duration: 600 }}>
				Création de <span class="highlight">vitrine</span> sur Le Poilu.
			</h1>
			<p class="hero-subtitle" in:fade={{ delay: 200 }}>
				Le principe est simple: 
				Tu crées ta vitrine. tu deviens visible instantanément auprès de la tribu du Poilu.
				Et si tu choisis de proposer une offre, la tribu du poilu en profite. 
			</p>
		</div>

		<div class="hero-visual" in:fly={{ x: 50, duration: 800, delay: 300 }}>
			<div class="comparison-grid">
				<!-- OPTION 1: AVEC OFFRE (PREMIUM) -->
				<div class="comparison-item premium" in:fly={{ y: 20, delay: 400 }}>
					<div class="mini-phone-mockup">
						<img src={screenD} alt="Exemple vitrine avec offre" />
						<div class="badge-mini">RECOMMANDÉ</div>
					</div>
					<div class="comparison-info">
						<a href="/carnet/rejoindre/inscription?plan=premium" class="btn-choice primary pulse-button">
							Crées ta vitrine avec offre <i class="fa-solid fa-star"></i>
						</a>
					</div>
				</div>

				<!-- OPTION 2: SANS OFFRE (ESSENTIEL) -->
				<div class="comparison-item" in:fly={{ y: 20, delay: 600 }}>
					<div class="mini-phone-mockup">
						<img src={screenB} alt="Exemple vitrine simple" />
					</div>
					<div class="comparison-info">
						<a href="/carnet/rejoindre/inscription?plan=basic" class="btn-choice secondary">
							Crées ta vitrine sans offre <i class="fa-solid fa-arrow-right"></i>
						</a>
					</div>
				</div>
			</div>
		</div>
	</header>
	
	<!-- QUICK ACTION SECTION (REMOVED FINAL CTA DOWN, MOVED UP) -->
	<section class="final-cta">
		<h2>Prêt à booster ton activité ?</h2>
		<a href="/carnet/rejoindre/inscription" class="cta-button">
			Crées ta vitrine <i class="fa-solid fa-star"></i>
		</a>
		<p class="sub-cta">Sans engagement. Annulable à tout moment.</p>
	</section>

	<!-- STEPS SECTION -->
	<section class="steps-section">
		<h2 class="section-title">Comment ça marche ?</h2>
		<div class="steps-grid">
			<div class="step-card">
				<div class="step-number">1</div>
				<h3>Tu crées ta vitrine</h3>
				<p>Renseigne tes infos, télécharge tes photos et choisis l'option qui te convient.</p>
			</div>
			<div class="step-line"></div>
			<div class="step-card">
				<div class="step-number">2</div>
				<h3>Tu crées ton offre</h3>
				<p>Ex: "30% sur les achats avant 11h", "-20% le mardi", "Dessert offert"...</p>
			</div>
			<div class="step-line"></div>
			<div class="step-card">
				<div class="step-number">3</div>
				<h3>Tu crées ta dynamique</h3>
				<p>La tribu te présente l'offre sur son téléphone pour en profiter lors du passage en caisse.</p>
			</div>
		</div>
	</section>

	<!-- SHOWCASE SECTION (NEW) -->
	<section class="showcase-section">
		<h2 class="section-title">L'application "All-in-one" de l'ouest Lyonnais</h2>
		<p class="section-subtitle">
			Une interface moderne et intuitive qui met ton commerce en valeur.
		</p>

		<div class="app-screens">
			<div class="screen-item" in:fly={{ y: 50, duration: 800 }}>
				<img src={screenA} alt="Liste des commerces" />
				<div class="screen-caption">Ta vitrine</div>
			</div>
			<div class="screen-item center-screen" in:fly={{ y: 50, duration: 800, delay: 200 }}>
				<img src={screenB} alt="Fiche commerce détaillée" />
				<div class="screen-caption">Ton offre</div>
			</div>
			<div class="screen-item" in:fly={{ y: 50, duration: 800, delay: 400 }}>
				<img src={screenD} alt="Offre promotionalle" />
				<div class="screen-caption">Ton interface de gestion</div>
			</div>
		</div>
	</section>

	<!-- EXAMPLES SECTION -->
	<section class="examples-section">
		<h2 class="section-title">Des exemples concrets</h2>
		<p class="section-subtitle">Quel que soit ton métier, tu as une offre à proposer.</p>

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

	.badge-pro {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: #fff5f2;
		color: var(--cta);
		padding: 6px 16px;
		border-radius: 50px;
		font-weight: 800;
		font-size: 0.8rem;
		margin-bottom: var(--spacing-md);
		text-transform: uppercase;
		border: 1px solid #fbd5c6;
		letter-spacing: 0.05em;
	}

	.btn-choice {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 12px;
		border-radius: 12px;
		text-decoration: none;
		font-weight: 700;
		font-size: 0.9rem;
		transition: all 0.2s ease;
	}

	.btn-choice.secondary {
		background: #f1f3f5;
		color: #495057;
	}

	.btn-choice.secondary:hover {
		background: #e9ecef;
	}

	.btn-choice.primary {
		background: var(--cta);
		color: white;
	}

	.btn-choice.primary:hover {
		background: var(--ctaHover);
		transform: scale(1.02);
	}

	.pulse-button {
		animation: pulse-small 2s infinite;
	}

	@keyframes pulse-small {
		0% { box-shadow: 0 0 0 0 rgba(217, 70, 122, 0.4); }
		70% { box-shadow: 0 0 0 10px rgba(217, 70, 122, 0); }
		100% { box-shadow: 0 0 0 0 rgba(217, 70, 122, 0); }
	}

	/* --- Comparison Grid --- */
	.comparison-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 30px;
		align-items: end;
	}

	.comparison-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 15px;
	}

	.mini-phone-mockup {
		position: relative;
		width: 100%;
		max-width: 200px;
		border-radius: 20px;
		overflow: hidden;
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
		border: 4px solid white;
		transition: transform 0.3s ease;
	}

	.comparison-item:hover .mini-phone-mockup {
		transform: translateY(-5px);
	}

	.mini-phone-mockup img {
		width: 100%;
		display: block;
	}

	.badge-mini {
		position: absolute;
		top: 10px;
		right: 10px;
		background: var(--cta);
		color: white;
		font-size: 0.5rem;
		font-weight: 800;
		padding: 3px 8px;
		border-radius: 50px;
	}

	.comparison-info {
		width: 100%;
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	/* Re-using btn-choice from previous step but styling for this context */
	.comparison-info .btn-choice {
		padding: 10px;
		font-size: 0.85rem;
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

	.sub-cta {
		margin-top: 15px;
		opacity: 0.7;
		font-size: 0.9rem;
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

		.comparison-grid {
			grid-template-columns: 1fr;
			max-width: 400px;
			margin: var(--spacing-md) auto 0;
			gap: 40px;
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
