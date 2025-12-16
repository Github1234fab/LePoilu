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
		<!-- <img src={AppScreen} alt="" class="app"> -->
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
						<div class="author-avatar"></div>
						<div class="author-info">
							<p class="author-name">{testimonial.name}</p>
							<p class="author-location">{testimonial.location}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.testimonials {
		/* background-color: var(--ctaHover); */
		border-radius: 18px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		z-index: 0;
		padding: 40px;
		background-image: url('../assets/Poilu-village2.png');
		background-position: left;
		background-repeat: no-repeat;
		background-size: contain;

	}
	.testimonials-container {
		color: primary;
		position: relative;
		align-items: flex-end;
		margin-left: 60%;
	}
	.testimonials-grid {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: flex-end;
		align-items: flex-end;
		gap: 20px;
		margin-top: 30px;
	}
	.testimonial-card {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		border-radius: 12px;
		padding: 20px;
		margin: 10px;
		width: 60%;
		gap: 20px;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background-color: rgba(255, 97, 1, 0.75);
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.3);
		box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
	}
	.hero-cta {
		display: flex;
		gap: 30px;
		padding: 0px;
		border-radius: 12px;
		align-items: center;
		justify-content: flex-start;
		margin-top: 20px;
		z-index: 10;
	}
	.btn-primary {
		border: none;
	}
	.btn-primary img {
		height: 40px;
		width: 100%;
		box-shadow: var(--shadow);
	}

	.testimonial-text {
		color: primary;
		font-weight: 600;
	}
	.testimonial-author {
		color: primary;
	}
	.section-title {
		font-size: 2.5rem;
		font-weight: 800;
		margin-bottom: 10px;
		color: white;
		text-align: center;
	}

	.section-subtitle {
		color: white;
	}
	.wrapper{
		background: linear-gradient(135deg, rgba(255, 97, 1, 0.9), rgba(232, 132, 60, 0.85));
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border-radius: 18px;
		padding: 30px;
		width: fit-content;
		border: 1px solid rgba(255, 255, 255, 0.3);
		box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
	}

	@media (max-width: 900px) {
		.testimonial-card {
			width: 100%;
		}
		.testimonials {
		border: 2px solid var(--ctaSecondary);
		border-radius: 18px;
		height: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 0;
		padding: 20px;
		background-image: url('../assets/Poilu.png');
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}
	.hero-cta {
		flex-wrap: wrap;
	}
	}
</style>
