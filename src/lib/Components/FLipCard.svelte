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
		height: 600px; /* ajustable : garde une hauteur constante */
	
	}

	.flip-inner {
		position: relative;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
		border-radius: 16px;
		cursor: pointer;
		outline: none;
		transition: transform 1000ms cubic-bezier(0.2, 0.7, 0.2, 1);
		/* box-shadow: 10px 4px 8px rgba(0, 0, 0, 0.2); */
	}

	/* Hover : desktop. Garde aussi l’état via .flipped pour mobile/clic */
/* Rotation uniquement via la classe .flipped (pas de hover) */
.flip-inner.flipped {
    transform: rotateY(180deg);
}

/* Focus pour l'accessibilité (optionnel) */
.flip-inner:focus {
    /* outline: 2px solid var(--ctaText); */
    outline-offset: 4px;
}

	.face {
		position: absolute;
		inset: 0;
		backface-visibility: hidden;
		/* border: 1px solid #e6e6e6; */
		border-radius: 16px;
		/* overflow: hidden; */
		background-color: var(--secondary);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 18px;
		gap: 30px;
	}
	.feature-icon {
		font-size: 2rem;
		color: var(--ctaText);
	}

	.title {
		margin: 0;
		font-size: 1.1rem;
		color: var(--ctaText);
	}
	.desc {
		flex-grow: 1;
		color: var(--ctaText);
	}

	.flip-icon {
		position: absolute;
		top: 15px;
		right: 15px;
		font-size: 1.3rem;
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
		transition: all 0.3s ease;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	}

	.flip-inner:hover .flip-icon {
		background-color: rgba(255, 97, 1, 0.3);
		transform: scale(1.1);
	}

	.back {
		transform: rotateY(180deg);
		background: transparent;
		display: grid;
		place-items: center;
		padding: 0;
		overflow: hidden;
		padding: 10px 70px;
		border: none;
	
	}
	.img {
		border-radius: 16px;
		width: 120%;
		height: 100%;
		object-fit: cover;
		/* border: 3px solid black; */
		object-position: bottom;
		box-shadow: var(--shadow3);

	}

	/* Préfère moins d’animations : réduit la motion */
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
