<script>
	export let title = 'Filtres malins';
	export let icon;
	export let description = 'Ville, dates, gratuit, famille…';
	export let img;
	export let alt = 'Aperçu de la fonctionnalité Filtres';
	let flipped = false;

	function toggleFlip() {
		flipped = !flipped;
	}
	function onKey(e) {
		// Accessibilité clavier : Enter ou Espace
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			toggleFlip();
		}
	}
</script>

<div class="flip-card">
	<div
		class="flip-inner"
		class:flipped
		on:click={toggleFlip}
		on:keydown={onKey}
		tabindex="0"
		role="button"
		aria-pressed={flipped}
		aria-label={flipped ? `Masquer l’aperçu de ${title}` : `Voir l’aperçu de ${title}`}
	>
		<!-- Face avant -->
		<div class="face">
			<div class="feature-icon">
				<i class={icon}></i>
			</div>
			<h3 class="title">{title}</h3>
			<p class="desc">{@html description}</p>

			<span class="flip-icon">
				<i class="fa-solid fa-rotate"></i>
			</span>
		</div>

		<!-- Face arrière -->
		<div class="face back" aria-hidden={!flipped}>
			<img class="img" src={img} {alt} loading="lazy" />
		</div>
	</div>
</div>

<style>
	/* conteneur avec perspective */
	.flip-card {
		perspective: 1200px;
		width: 100%;
		height: clamp(400px, 55vw, 600px);
	}

	.flip-inner {
		position: relative;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
		border-radius: var(--radius-md);
		cursor: pointer;
		outline: none;
		transition: transform var(--transition-slow) cubic-bezier(0.2, 0.7, 0.2, 1);
	}

	/* Rotation uniquement via la classe .flipped (pas de hover) */
	.flip-inner.flipped {
		transform: rotateY(180deg);
	}

	/* Focus pour l'accessibilité */
	.flip-inner:focus {
		outline-offset: 4px;
	}

	.face {
		position: absolute;
		inset: 0;
		backface-visibility: hidden;
		border-radius: var(--radius-md);
		/* background-color: var(--secondary); */
		background-color: #E63946;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: clamp(1rem, 3vw, 1.5rem);
		gap: clamp(0.75rem, 2vw, 1.5rem);
		/* box-shadow: var(--shadow3); */
		transition: box-shadow var(--transition-normal);
	}
	.feature-icon {
		font-size: clamp(1.5rem, 4vw, 2rem);
		color: var(--ctaText);
		transition: transform var(--transition-normal);
	}
	.flip-inner:hover .feature-icon {
		transform: scale(1.1) rotate(5deg);
	}

	.title {
		margin: 0;
		font-size: clamp(0.9rem, 2.5vw, 1.1rem);
		color: var(--ctaText);
		font-family: var(--FFTitle);
		font-weight: 700;
		text-align: center;
		line-height: 1.3;
	}
	.desc {
		flex-grow: 1;
		color: var(--ctaText);
		font-family: var(--FFBody);
		font-size: clamp(0.8rem, 2vw, 1rem);
		line-height: 1.5;
		text-align: center;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.flip-icon {
		position: absolute;
		top: clamp(0.5rem, 2vw, 1rem);
		right: clamp(0.5rem, 2vw, 1rem);
		font-size: clamp(0.9rem, 2vw, 1.2rem);
		color: var(--ctaText);
		background-color: rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		border-radius: 50%;
		width: clamp(35px, 8vw, 45px);
		height: clamp(35px, 8vw, 45px);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all var(--transition-normal);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	}

	.flip-inner:hover .flip-icon {
		background-color: rgba(255, 97, 1, 0.3);
		transform: scale(1.1) rotate(180deg);
	}

	.back {
		transform: rotateY(180deg);
		background: transparent;
		display: grid;
		place-items: center;
		padding: 0;
		overflow: hidden;
		padding: var(--spacing-xs) var(--spacing-xl);
		border: none;
	}
	.img {
		border-radius: var(--radius-md);
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		box-shadow: var(--shadow3);
		transition: transform var(--transition-slow);
	}
	.back:hover .img {
		transform: scale(1.3);
	}

	/* Media queries pour responsive */
	@media (max-width: 1024px) {
		.flip-card {
			height: clamp(380px, 50vw, 550px);
		}
		.back {
			padding: var(--spacing-xs) var(--spacing-lg);
		}
	}

	@media (max-width: 768px) {
		.flip-card {
			height: clamp(320px, 45vw, 450px);
		}
		.face {
			gap: clamp(0.5rem, 1.5vw, 1rem);
		}
		.back {
			padding: var(--spacing-xs) var(--spacing-md);
		}
		.img {
			width: 100%;
		}
		.feature-icon {
			font-size: clamp(1.3rem, 5vw, 1.8rem);
		}
		.title {
			font-size: clamp(0.85rem, 3vw, 1rem);
		}
		.desc {
			font-size: clamp(0.75rem, 2.5vw, 0.9rem);
			line-height: 1.4;
		}
	}

	@media (max-width: 480px) {
		.flip-card {
			height: clamp(300px, 60vw, 350px);
		}
		.face {
			gap: clamp(0.4rem, 1vw, 0.75rem);
		}
		.feature-icon {
			font-size: clamp(1.2rem, 6vw, 1.5rem);
		}
		.title {
			font-size: clamp(0.8rem, 3.5vw, 0.95rem);
			line-height: 1.2;
		}
		.desc {
			font-size: clamp(0.7rem, 3vw, 0.85rem);
			line-height: 1.3;
		}
	}

	/* Préfère moins d'animations : réduit la motion */
	@media (prefers-reduced-motion: reduce) {
		.flip-inner {
			transition: none;
		}
		.flip-card:hover .flip-inner,
		.flip-inner.flipped,
		.flip-inner:focus {
			transform: none;
		}
	}
</style>
