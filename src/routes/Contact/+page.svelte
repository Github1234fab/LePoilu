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
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 40px;
		padding: 10px;
		max-width: 1200px;
		margin: 0 auto;
	}

	/* Hero Section */
	.hero {
		background: linear-gradient(135deg, var(--ctaSecondary), #FF6101);
		border-radius: 18px;
		height: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		margin-top: 30px;
		padding: 60px 40px;
		box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.293);
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
		font-size: 3.5rem;
		font-family: var(--FFTitle);
		font-weight: 900;
		margin-bottom: 20px;
		text-align: center;
	}

	.hero-subtitle {
		font-weight: 600;
		font-family: var(--FFTitle);
		text-align: center;
		font-size: 1.3rem;
		color: white;
		max-width: 800px;
		line-height: 1.8rem;
		margin-bottom: 40px;
	}

	.poilu-mobile {
		height: 350px;
		width: auto;
		filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
	}

	/* Contact Section */
	.contact-section {
		background: linear-gradient(135deg, var(--background), #FF6101);
		border-radius: 18px;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 60px 40px;
		box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.293);
	}

	.contact-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: 50px;
		text-align: center;
	}

	.section-title {
		font-weight: 900;
		font-family: var(--FFTitle);
		font-size: 2.5rem;
		color: #2b2b2b;
		margin-bottom: 15px;
	}

	.section-description {
		font-family: var(--FFTitle);
		color: #333;
		font-size: 1.1rem;
		font-weight: 500;
		max-width: 800px;
		line-height: 1.7rem;
	}

	/* Form Container */
	.form-container {
		display: grid;
		grid-template-columns: 1.5fr 1fr;
		gap: 3rem;
		width: 100%;
		max-width: 1100px;
	}

	/* Contact Form */
	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 25px;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background-color: rgba(255, 255, 255, 0.9);
		border: 1px solid rgba(255, 97, 1, 0.2);
		border-radius: 16px;
		padding: 40px;
		box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.form-group label {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.label-text {
		font-family: var(--FFTitle);
		font-weight: 600;
		font-size: 1rem;
		color: #2b2b2b;
	}

	input,
	textarea {
		border: 2px solid rgba(255, 97, 1, 0.2);
		border-radius: 12px;
		padding: 14px 16px;
		font-family: var(--FFTitle);
		font-size: 1rem;
		color: #333;
		background-color: rgba(255, 255, 255, 0.8);
		transition: all 0.3s ease;
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
		gap: 10px;
		padding: 16px 40px;
		background: linear-gradient(135deg, #FF6101, var(--ctaSecondary));
		color: white;
		border: none;
		font-weight: 700;
		font-size: 1.1rem;
		border-radius: 12px;
		transition: all 0.3s ease;
		font-family: var(--FFTitle);
		text-align: center;
		box-shadow: 0 6px 20px rgba(255, 97, 1, 0.3);
		cursor: pointer;
		margin-top: 10px;
	}

	.btn-submit:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 28px rgba(255, 97, 1, 0.4);
	}

	.btn-submit:active {
		transform: translateY(0);
	}

	/* Contact Info */
	.contact-info {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.info-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 15px;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background-color: rgba(255, 255, 255, 0.9);
		border: 1px solid rgba(255, 97, 1, 0.2);
		border-radius: 16px;
		padding: 30px 20px;
		box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.info-card:hover {
		transform: translateY(-3px);
		box-shadow: 0 12px 40px 0 rgba(255, 97, 1, 0.25);
	}

	.info-icon {
		font-size: 2rem;
		color: #FF6101;
		background: linear-gradient(135deg, rgba(255, 97, 1, 0.1), rgba(232, 132, 60, 0.1));
		width: 70px;
		height: 70px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 16px rgba(255, 97, 1, 0.2);
	}

	.info-title {
		font-family: var(--FFTitle);
		font-weight: 700;
		font-size: 1.2rem;
		color: #2b2b2b;
		margin: 0;
	}

	.info-text {
		font-family: var(--FFTitle);
		color: #555;
		font-size: 0.95rem;
		line-height: 1.5rem;
		margin: 0;
	}

	/* Responsive Design */
	@media (max-width: 900px) {
		main {
			padding: 10px;
			gap: 30px;
		}

		.hero {
			padding: 40px 20px;
			margin-top: 20px;
		}

		.hero-title {
			font-size: 2.5rem;
		}

		.hero-subtitle {
			font-size: 1.1rem;
			line-height: 1.6rem;
		}

		.poilu-mobile {
			height: 250px;
		}

		.contact-section {
			padding: 40px 20px;
		}

		.section-title {
			font-size: 2rem;
		}

		.section-description {
			font-size: 1rem;
			line-height: 1.5rem;
		}

		.form-container {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.contact-form {
			padding: 30px 20px;
		}

		.btn-submit {
			padding: 14px 35px;
			font-size: 1rem;
		}
	}

	@media (min-width: 901px) and (max-width: 1200px) {
		.form-container {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}
</style>
