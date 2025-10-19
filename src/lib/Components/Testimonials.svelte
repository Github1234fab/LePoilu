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
			location: 'Lyon',
			text: "Je ne rate plus aucun concert dans ma ville ! L'application est super intuitive.",
			rating: 5
		},
		{
			name: 'Thomas D.',
			location: 'Marseille',
			text: 'Enfin une app qui regroupe tous les événements locaux. Les notifications sont top.',
			rating: 5
		},
		{
			name: 'Sophie M.',
			location: 'Toulouse',
			text: "J'ai découvert plein d'événements sympas près de chez moi que je ne connaissais pas.",
			rating: 5
		}
	];
</script>

<section class="testimonials">
	<div class="testimonials-container">
		<!-- <img src={AppScreen} alt="" class="app"> -->
		<h2 class="section-title">Ils adorent l'application</h2>
		<p class="section-subtitle">Des milliers d'utilisateurs satisfaits</p>

		<div class="hero-cta">
			<a href={downloadLinks.ios} class="btn-primary" target = "_blank"> <img src={IOS} alt="ios" /> </a>
			<a href={downloadLinks.android} class="btn-primary" target = "_blank">
				<img src={Android} alt="ios" />
			</a>
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
		justify-content: baseline;
		z-index: 0;
		padding: 40px;
		background-image: url('../assets/Poilu-ok.png');
		background-position: center;
		background-repeat: no-repeat;

	}
	.testimonials-container {
		color: primary;
		position: relative;
	}
	/* .app{
		height: 320px;
		width: auto;
		position: absolute;
		top: 50%;
		left: 100%;
		border: 5px solid #c27c2f;
		border-radius: 18px;
		box-shadow: var(--shadow2);


	} */
	.testimonials-grid {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: baseline;
		gap: 20px;
		margin-top: 30px;
	}
	.testimonial-card {
		display: flex;
		flex-direction: column;
		align-items: baseline;
		background-color: var(--ctaSecondary);
		border-radius: 12px;
		padding: 20px;
		margin: 10px;
		width: 60%;
		gap: 20px;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background-color: rgba(255, 255, 255, 0.413);
	}
	.hero-cta {
		display: flex;
		gap: 30px;
		padding: 0px;
		border-radius: 12px;
		align-items: center;
		justify-content: baseline;
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
</style>
