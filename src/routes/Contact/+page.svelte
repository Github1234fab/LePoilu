<script>
	import PoiluMobile from '../../lib/assets/Poilu.png';

	let name = '';
	let email = '';
	let message = '';

	function submit(e) {
		e.preventDefault();
		// TODO: connecter à une action SvelteKit (form actions) ou service externe
		alert('Merci ! Nous revenons vers vous rapidement.');
	}
</script>

<svelte:head>
	<title>Contact — Le Poilu</title>
	<meta
		name="description"
		content="Contactez l'équipe du Poilu pour les partenariats, la presse ou le support."
	/>
</svelte:head>

<main>
	<!-- Hero Section -->
	<section class="hero">
		<div class="hero-content">
			<h1 class="hero-title">Contactez-nous</h1>
			<p class="hero-subtitle">
				Une question, un partenariat, une suggestion ? <br> Nous sommes à votre écoute
			</p>
			<img class="poilu-mobile" src={PoiluMobile} alt="Le Poilu personnage mascotte" />
		</div>
	</section>

	<!-- Contact Form Section -->
	<section class="contact-section">
		<div class="contact-header">
			<h2 class="section-title">Envoyez-nous un message</h2>
			<p class="section-description">
				Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais
			</p>
		</div>

		<div class="form-container">
			<form class="contact-form" on:submit={submit}>
				<div class="form-group">
					<label for="name">
						<span class="label-text">Nom</span>
						<input
							id="name"
							type="text"
							required
							bind:value={name}
							placeholder="Votre nom"
						/>
					</label>
				</div>

				<div class="form-group">
					<label for="email">
						<span class="label-text">Email</span>
						<input
							id="email"
							type="email"
							required
							bind:value={email}
							placeholder="votre.email@exemple.com"
						/>
					</label>
				</div>

				<div class="form-group">
					<label for="message">
						<span class="label-text">Message</span>
						<textarea
							id="message"
							required
							rows="6"
							bind:value={message}
							placeholder="Votre message..."
						></textarea>
					</label>
				</div>

				<button type="submit" class="btn-submit">
					<i class="fa-solid fa-paper-plane"></i>
					Envoyer le message
				</button>
			</form>

			<div class="contact-info">
				<div class="info-card">
					<div class="info-icon">
						<i class="fa-solid fa-envelope"></i>
					</div>
					<h3 class="info-title">Email</h3>
					<p class="info-text">contact@lepoilu.fr</p>
				</div>

				<div class="info-card">
					<div class="info-icon">
						<i class="fa-solid fa-building"></i>
					</div>
					<h3 class="info-title">Partenariats</h3>
					<p class="info-text">Pour toute collaboration professionnelle</p>
				</div>

				<div class="info-card">
					<div class="info-icon">
						<i class="fa-solid fa-newspaper"></i>
					</div>
					<h3 class="info-title">Presse</h3>
					<p class="info-text">Demandes médias et relations presse</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Account Deletion Section -->
	<section class="deletion-section">
		<div class="deletion-content">
			<div class="deletion-icon">
				<i class="fa-solid fa-user-slash"></i>
			</div>
			<h2 class="deletion-title">Suppression de compte</h2>
			<p class="deletion-intro">Pour supprimer votre compte Le Poilu et toutes les données associées :</p>

			<ol class="deletion-steps">
				<li>Depuis l'espace "Mon compte" sur l'application <strong>Le Poilu</strong></li>
				<li>Depuis le site web : <strong>contact@lepoilu.fr</strong></li>
				<li>Objet : <strong>"Suppression de compte"</strong></li>
				<li>Indiquez l'adresse email de votre compte</li>
			</ol>

			<div class="deletion-info">
				<p class="deletion-timeline">Votre compte et vos données seront supprimés sous 30 jours.</p>
				<p class="deletion-data">Données supprimées : email, nom, événements créés, favoris.</p>
			</div>
		</div>
	</section>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
		padding: var(--spacing-xs);
		max-width: var(--desktop);
		margin: 0 auto;
	}

	/* Hero Section */
	.hero {
		background: linear-gradient(135deg, var(--ctaSecondary), #FF6101);
		border-radius: var(--radius-lg);
		height: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		margin-top: var(--spacing-md);
		padding: var(--spacing-xl) var(--spacing-lg);
		box-shadow: var(--shadow);
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.hero-title {
		color: white;
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-family: var(--FFTitle);
		font-weight: 900;
		margin-bottom: var(--spacing-md);
		text-align: center;
	}

	.hero-subtitle {
		font-weight: 600;
		font-family: var(--FFTitle);
		text-align: center;
		font-size: clamp(1rem, 2.5vw, 1.3rem);
		color: white;
		max-width: 800px;
		line-height: clamp(1.4rem, 3vw, 1.8rem);
		margin-bottom: var(--spacing-lg);
	}

	.poilu-mobile {
		height: clamp(220px, 35vw, 350px);
		width: auto;
		filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
	}

	/* Contact Section */
	.contact-section {
		background: linear-gradient(135deg, var(--background), #FF6101);
		border-radius: var(--radius-lg);
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-xl) var(--spacing-lg);
		box-shadow: var(--shadow);
	}

	.contact-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: var(--spacing-xl);
		text-align: center;
	}

	.section-title {
		font-weight: 900;
		font-family: var(--FFTitle);
		font-size: clamp(1.8rem, 4vw, 2.5rem);
		color: var(--textDark);
		margin-bottom: var(--spacing-sm);
	}

	.section-description {
		font-family: var(--FFTitle);
		color: var(--text);
		font-size: clamp(0.95rem, 2vw, 1.1rem);
		font-weight: 500;
		max-width: 800px;
		line-height: clamp(1.4rem, 2.5vw, 1.7rem);
	}

	/* Form Container */
	.form-container {
		display: grid;
		grid-template-columns: 1.5fr 1fr;
		gap: var(--spacing-lg);
		width: 100%;
		max-width: 1100px;
	}

	/* Contact Form */
	.contact-form {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background-color: rgba(255, 255, 255, 0.9);
		border: 1px solid rgba(255, 97, 1, 0.2);
		border-radius: var(--radius-md);
		padding: var(--spacing-lg);
		box-shadow: var(--shadow3);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.form-group label {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.label-text {
		font-family: var(--FFTitle);
		font-weight: 600;
		font-size: clamp(0.9rem, 1.8vw, 1rem);
		color: var(--textDark);
	}

	input,
	textarea {
		border: 2px solid rgba(255, 97, 1, 0.2);
		border-radius: var(--radius-md);
		padding: var(--spacing-sm) var(--spacing-sm);
		font-family: var(--FFTitle);
		font-size: clamp(0.9rem, 1.8vw, 1rem);
		color: var(--text);
		background-color: rgba(255, 255, 255, 0.8);
		transition: all var(--transition-normal);
		width: 100%;
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: #FF6101;
		background-color: white;
		box-shadow: 0 0 0 3px rgba(255, 97, 1, 0.1);
	}

	input::placeholder,
	textarea::placeholder {
		color: #999;
	}

	textarea {
		resize: vertical;
		min-height: 150px;
	}

	.btn-submit {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-sm) var(--spacing-lg);
		background: linear-gradient(135deg, #FF6101, var(--ctaSecondary));
		color: white;
		border: none;
		font-weight: 700;
		font-size: clamp(1rem, 2vw, 1.1rem);
		border-radius: var(--radius-md);
		transition: all var(--transition-normal);
		font-family: var(--FFTitle);
		text-align: center;
		box-shadow: var(--shadow3);
		cursor: pointer;
		margin-top: var(--spacing-xs);
	}

	.btn-submit:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow2);
	}

	.btn-submit:active {
		transform: translateY(0);
	}

	/* Contact Info */
	.contact-info {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.info-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: var(--spacing-sm);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background-color: rgba(255, 255, 255, 0.9);
		border: 1px solid rgba(255, 97, 1, 0.2);
		border-radius: var(--radius-md);
		padding: var(--spacing-md) var(--spacing-md);
		box-shadow: var(--shadow3);
		transition: transform var(--transition-normal), box-shadow var(--transition-normal);
	}

	.info-card:hover {
		transform: translateY(-3px);
		box-shadow: var(--shadow2);
	}

	.info-icon {
		font-size: clamp(1.5rem, 3vw, 2rem);
		color: #FF6101;
		background: linear-gradient(135deg, rgba(255, 97, 1, 0.1), rgba(232, 132, 60, 0.1));
		width: clamp(60px, 10vw, 70px);
		height: clamp(60px, 10vw, 70px);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: var(--shadow3);
	}

	.info-title {
		font-family: var(--FFTitle);
		font-weight: 700;
		font-size: clamp(1rem, 2vw, 1.2rem);
		color: var(--textDark);
		margin: 0;
	}

	.info-text {
		font-family: var(--FFTitle);
		color: #555;
		font-size: clamp(0.85rem, 1.6vw, 0.95rem);
		line-height: clamp(1.3rem, 2.5vw, 1.5rem);
		margin: 0;
	}

	/* Account Deletion Section */
	.deletion-section {
		background: linear-gradient(135deg, #fff, #fff5f0);
		border-radius: var(--radius-lg);
		padding: var(--spacing-xl) var(--spacing-lg);
		box-shadow: var(--shadow3);
		border: 2px solid rgba(255, 97, 1, 0.15);
	}

	.deletion-content {
		max-width: 800px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.deletion-icon {
		font-size: clamp(2.5rem, 4vw, 3rem);
		color: #FF6101;
		background: linear-gradient(135deg, rgba(255, 97, 1, 0.1), rgba(232, 132, 60, 0.1));
		width: clamp(70px, 12vw, 90px);
		height: clamp(70px, 12vw, 90px);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: var(--shadow3);
		margin-bottom: var(--spacing-md);
	}

	.deletion-title {
		font-weight: 900;
		font-family: var(--FFTitle);
		font-size: clamp(1.6rem, 3.5vw, 2.2rem);
		color: var(--textDark);
		margin-bottom: var(--spacing-md);
	}

	.deletion-intro {
		font-family: var(--FFTitle);
		font-size: clamp(0.95rem, 2vw, 1.1rem);
		color: #555;
		font-weight: 500;
		margin-bottom: var(--spacing-md);
		line-height: clamp(1.4rem, 2.5vw, 1.6rem);
	}

	.deletion-steps {
		text-align: left;
		background: rgba(255, 255, 255, 0.8);
		border: 1px solid rgba(255, 97, 1, 0.2);
		border-radius: var(--radius-md);
		padding: var(--spacing-md) var(--spacing-lg);
		margin-bottom: var(--spacing-md);
		width: 100%;
		box-shadow: var(--shadow3);
	}

	.deletion-steps li {
		font-family: var(--FFTitle);
		font-size: clamp(0.9rem, 1.8vw, 1.05rem);
		color: var(--text);
		line-height: clamp(1.6rem, 3vw, 2rem);
		margin-bottom: var(--spacing-xs);
	}

	.deletion-steps li:last-child {
		margin-bottom: 0;
	}

	.deletion-steps strong {
		color: #FF6101;
		font-weight: 700;
	}

	.deletion-info {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		width: 100%;
	}

	.deletion-timeline {
		font-family: var(--FFTitle);
		font-size: clamp(0.9rem, 1.8vw, 1rem);
		color: #FF6101;
		font-weight: 600;
		margin: 0;
	}

	.deletion-data {
		font-family: var(--FFTitle);
		font-size: clamp(0.85rem, 1.6vw, 0.95rem);
		color: #666;
		font-weight: 500;
		margin: 0;
	}

	/* === MEDIA QUERIES RESPONSIVE === */

	/* Tablet */
	@media (max-width: 1024px) {
		.form-container {
			grid-template-columns: 1fr;
			gap: var(--spacing-md);
		}
	}

	/* Mobile */
	@media (max-width: 768px) {
		main {
			padding: var(--spacing-xs);
			gap: var(--spacing-md);
		}

		.hero {
			padding: var(--spacing-lg) var(--spacing-md);
			margin-top: var(--spacing-md);
		}

		.contact-section {
			padding: var(--spacing-lg) var(--spacing-md);
		}

		.form-container {
			grid-template-columns: 1fr;
			gap: var(--spacing-md);
		}

		.contact-form {
			padding: var(--spacing-md) var(--spacing-md);
		}

		.btn-submit {
			max-width: 100%;
		}

		.deletion-section {
			padding: var(--spacing-lg) var(--spacing-md);
		}

		.deletion-steps {
			padding: var(--spacing-md) var(--spacing-md);
		}
	}

	/* Mobile Small */
	@media (max-width: 480px) {
		main {
			gap: var(--spacing-xl);
		}

		.hero {
			padding: var(--spacing-lg) var(--spacing-md);
			margin-bottom: var(--spacing-xl);
		}

		.contact-section {
			padding: var(--spacing-xl) var(--spacing-md);
			margin-bottom: var(--spacing-xl);
		}

		.contact-header {
			margin-bottom: var(--spacing-xl);
		}

		.form-container {
			gap: var(--spacing-xl);
		}

		.contact-form {
			padding: var(--spacing-lg) var(--spacing-md);
			gap: var(--spacing-lg);
		}

		.form-group {
			gap: var(--spacing-sm);
		}

		.contact-info {
			gap: var(--spacing-lg);
		}

		.info-card {
			padding: var(--spacing-lg) var(--spacing-md);
			gap: var(--spacing-md);
		}

		.deletion-section {
			padding: var(--spacing-xl) var(--spacing-md);
			margin-bottom: var(--spacing-xl);
		}

		.deletion-content {
			gap: var(--spacing-md);
		}

		.deletion-icon {
			margin-bottom: var(--spacing-lg);
		}

		.deletion-steps {
			padding: var(--spacing-lg) var(--spacing-md) var(--spacing-lg) var(--spacing-xl);
			margin-bottom: var(--spacing-lg);
			max-width: 100%;
		}

		.deletion-steps li {
			text-align: left;
			line-height: 1.8rem;
			margin-bottom: var(--spacing-sm);
		}

		.deletion-info {
			gap: var(--spacing-sm);
		}

		.poilu-mobile {
			height: 150px;
			width: auto;
		}
	}
</style>
