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
		height: clamp(500px, 60vw, 600px);
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
		background-color: var(--secondary);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-sm);
		gap: var(--spacing-md);
		box-shadow: var(--shadow3);
		transition: box-shadow var(--transition-normal);
	}
	.face:hover {
		box-shadow: var(--shadow2);
	}
	.feature-icon {
		font-size: clamp(1.8rem, 3vw, 2rem);
		color: var(--ctaText);
		transition: transform var(--transition-normal);
	}
	.flip-inner:hover .feature-icon {
		transform: scale(1.1) rotate(5deg);
	}

	.title {
		margin: 0;
		font-size: clamp(1rem, 2vw, 1.1rem);
		color: var(--ctaText);
		font-family: var(--FFTitle);
		font-weight: 700;
		text-align: center;
	}
	.desc {
		flex-grow: 1;
		color: var(--ctaText);
		font-family: var(--FFBody);
		font-size: clamp(0.9rem, 1.5vw, 1rem);
		line-height: 1.6;
		text-align: center;
	}

	.flip-icon {
		position: absolute;
		top: var(--spacing-sm);
		right: var(--spacing-sm);
		font-size: clamp(1.1rem, 2vw, 1.3rem);
		color: var(--ctaText);
		background-color: rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		border-radius: 50%;
		width: 45px;
		height: 45px;
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
		width: 120%;
		height: 100%;
		object-fit: cover;
		object-position: bottom;
		box-shadow: var(--shadow3);
		transition: transform var(--transition-slow);
	}
	.back:hover .img {
		transform: scale(1.02);
	}

	/* Media queries pour responsive */
	@media (max-width: 1024px) {
		.flip-card {
			height: clamp(450px, 55vw, 550px);
		}
		.back {
			padding: var(--spacing-xs) var(--spacing-lg);
		}
	}

	@media (max-width: 768px) {
		.flip-card {
			height: clamp(400px, 50vw, 500px);
		}
		.face {
			padding: var(--spacing-sm);
			gap: var(--spacing-sm);
		}
		.back {
			padding: var(--spacing-xs) var(--spacing-md);
		}
		.img {
			width: 100%;
		}
	}

	@media (max-width: 480px) {
		.flip-card {
			height: clamp(350px, 45vw, 450px);
		}
		.face {
			padding: var(--spacing-xs);
		}
		.flip-icon {
			width: 40px;
			height: 40px;
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
