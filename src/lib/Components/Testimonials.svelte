<script>
	import IOS from '../assets/ios.png';
	import Android from '../assets/android.png';
	// import AppScreen from "../../lib/assets/events-v2.jpg"

	export let downloadLinks = {
		ios: 'https://www.apple.com/fr/app-store/',
		android: 'https://play.google.com/store/games?hl=fr'
	};
	const testimonials = [
		{
			name: 'Marie L.',
			location: 'Craponne',
			text: "Je ne rate plus aucun concert dans ma région! L'application est super intuitive.",
			rating: 5
		},
		{
			name: 'Thomas D.',
			location: 'Brignais',
			text: 'Enfin une app qui regroupe tous les événements locaux.',
			rating: 5
		},
		{
			name: 'Sophie M.',
			location: 'Pollionnay',
			text: "Génial pour les assos. On peut créer notre évènement depuis l'appli ! Troooop pratique.",
			rating: 5
		}
	];
</script>

<section class="testimonials">
	<div class="testimonials-container">
		<div class="wrapper">
			<h2 class="section-title">Ils adorent l'application</h2>
			<p class="section-subtitle">Des milliers d'utilisateurs satisfaits</p>

			<div class="hero-cta">
				<a href={downloadLinks.ios} class="btn-primary" target="_blank">
					<img src={IOS} alt="ios" />
				</a>
				<a href={downloadLinks.android} class="btn-primary" target="_blank">
					<img src={Android} alt="ios" />
				</a>
			</div>
		</div>
	</div>

	<div class="testimonials-grid">
		{#each testimonials as testimonial}
			<div class="testimonial-card">
				<div class="testimonial-rating">
					{#each Array(testimonial.rating) as _, i}
						<span class="star">⭐</span>
					{/each}
				</div>
				<p class="testimonial-text">"{testimonial.text}"</p>
				<div class="testimonial-author">
					<!-- <div class="author-avatar"></div> -->
					<div class="author-info">
						<p class="author-name">{testimonial.name}</p>
						<p class="author-location">{testimonial.location}</p>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.testimonials {
		border-radius: var(--radius-lg);
		height: 1200px;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: start;
		z-index: 0;
		padding: var(--spacing-md);
		background-image: url('../assets/Poilu-village2.png');
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		box-shadow: var(--shadow);
	}
	.testimonials-container {
		color: primary;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: center;
	}
	.testimonials-grid {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: flex-end;
		align-items: flex-end;
		gap: var(--spacing-md);
	}
	.testimonial-card {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		border-radius: var(--radius-md);
		padding: var(--spacing-md);
		margin: var(--spacing-xs);
		width: 60%;
		gap: var(--spacing-md);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background-color:#073B4C;
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.3);
		box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
		transition: transform var(--transition-normal), box-shadow var(--transition-normal);
	}
	.testimonial-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.3);
	}
	.hero-cta {
		display: flex;
		gap: var(--spacing-md);
		padding: 0px;
		border-radius: var(--radius-md);
		align-items: center;
		justify-content: flex-start;
		margin-top: var(--spacing-md);
		z-index: 10;
	}
	.btn-primary {
		border: none;
		transition: transform var(--transition-normal);
	}
	.btn-primary:hover {
		transform: scale(1.05);
	}
	.btn-primary img {
		height: 40px;
		width: 100%;
		box-shadow: var(--shadow);
		border-radius: var(--radius-sm);
		transition: box-shadow var(--transition-normal);
	}
	.btn-primary:hover img {
		box-shadow: var(--shadow2);
	}

	.testimonial-text {
		color: white;
		font-weight: 600;
		font-family: var(--FFBody);
		font-size: clamp(0.95rem, 1.8vw, 1.05rem);
		line-height: 1.6;
	}
	.testimonial-author {
		color: white;
		font-family: var(--FFBody);
	}
	.testimonial-rating {
		display: flex;
		gap: var(--spacing-xs);
	}
	.star {
		font-size: clamp(1rem, 2vw, 1.2rem);
	}
	/* .author-avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.3);
		border: 2px solid rgba(255, 255, 255, 0.5);
	} */
	.author-info {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}
	.author-name {
		font-weight: 700;
		margin: 0;
		font-size: clamp(0.95rem, 1.5vw, 1.05rem);
	}
	.author-location {
		opacity: 0.9;
		margin: 0;
		font-size: clamp(0.85rem, 1.3vw, 0.95rem);
	}
	.section-title {
		font-size: clamp(1.8rem, 4vw, 2.5rem);
		font-weight: 800;
		margin-bottom: var(--spacing-sm);
		color: white;
		text-align: center;
		font-family: var(--FFTitle);
	}

	.section-subtitle {
		color: white;
		font-family: var(--FFBody);
		font-size: clamp(1rem, 2vw, 1.1rem);
		text-align: center;
	}
	.wrapper {
		background: linear-gradient(135deg, rgba(255, 97, 1, 0.9), rgba(232, 132, 60, 0.85));
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border-radius: var(--radius-lg);
		padding: var(--spacing-md);
		width: fit-content;
		border: 1px solid rgba(255, 255, 255, 0.3);
		box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		align-self: flex-start;
		margin-bottom: var(--spacing-md);
		transition: transform var(--transition-normal), box-shadow var(--transition-normal);
	}
	.wrapper:hover {
		transform: translateY(-3px);
		box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.4);
	}

	@media (max-width: 1024px) {
		.testimonials {
			grid-template-columns: 1fr;
			height: auto;
			gap: var(--spacing-md);
		}
		.testimonials-container {
			align-items: center;
		}
		.testimonials-grid {
			align-items: center;
		}
		.testimonial-card {
			width: 80%;
		}
	}

	@media (max-width: 768px) {
		.testimonial-card {
			width: 100%;
		}
		.testimonials {
			border: 2px solid var(--ctaSecondary);
			border-radius: var(--radius-lg);
			height: auto;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			z-index: 0;
			padding: var(--spacing-md);
			background-image: url('../assets/Poilu.png');
			background-position: center;
			background-repeat: no-repeat;
			background-size: cover;
		}
		.hero-cta {
			flex-wrap: wrap;
			justify-content: center;
		}
		.wrapper {
			align-self: center;
		}
	}

	@media (max-width: 480px) {
		.testimonials {
			padding: var(--spacing-sm);
		}
		.wrapper {
			padding: var(--spacing-sm);
		}
		.testimonial-card {
			padding: var(--spacing-sm);
		}
	}
</style>
