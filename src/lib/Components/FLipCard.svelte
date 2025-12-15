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
			<p class="desc">{description}</p>

			<span class="material-icons icon">360</span>
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
		height: 360px; /* ajustable : garde une hauteur constante */
	
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
		box-shadow: 10px 4px 8px rgba(0, 0, 0, 0.2);
	}

	/* Hover : desktop. Garde aussi l’état via .flipped pour mobile/clic */
/* Rotation uniquement via la classe .flipped (pas de hover) */
.flip-inner.flipped {
    transform: rotateY(180deg);
}

/* Focus pour l'accessibilité (optionnel) */
.flip-inner:focus {
    outline: 2px solid var(--ctaText);
    outline-offset: 4px;
}

	.face {
		position: absolute;
		inset: 0;
		backface-visibility: hidden;
		border: 1px solid #e6e6e6;
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

	.icon {
		position: absolute;
		font-size: 2.5rem;
		color: var(--ctaText);
		top: 75%;
		left: 45%;
		border-radius: 20%;
		/* background-color: rgb(50, 50, 50); */
		padding: 5px;
		/* box-shadow: var(--shadow); */
	}

	.back {
		transform: rotateY(180deg);
		background: var(--ctaSecondary);
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
		border: 3px solid black;
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
