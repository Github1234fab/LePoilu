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
		aria-label={flipped ? `Masquer l'aperçu de ${title}` : `Voir l'aperçu de ${title}`}
	>
		<!-- Face avant -->
		<div class="face front">
			<div class="feature-icon">
				<i class={icon}></i>
			</div>
			<h3 class="title">{title}</h3>
			<div class="desc">{@html description}</div>

			<button class="flip-button" aria-label="Voir l'aperçu">
				<i class="fa-solid fa-mobile-screen-button"></i>
				<span>Voir l'aperçu</span>
			</button>
		</div>

		<!-- Face arrière -->
		<div class="face back" aria-hidden={!flipped}>
			<div class="screenshot-container">
				<img class="img" src={img} {alt} loading="lazy" />
			</div>
			<button class="back-button" aria-label="Retour">
				<i class="fa-solid fa-arrow-rotate-left"></i>
				<span>Retour</span>
			</button>
		</div>
	</div>
</div>

<style>
	/* Conteneur avec perspective */
	.flip-card {
		perspective: 1500px;
		width: 100%;
		height: clamp(450px, 55vw, 650px);
	}

	.flip-inner {
		position: relative;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
		border-radius: var(--radius-lg);
		cursor: pointer;
		outline: none;
		transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: var(--shadow3);
	}

	.flip-inner:hover {
		box-shadow: 0 12px 40px rgba(255, 97, 1, 0.25);
	}

	/* Rotation */
	.flip-inner.flipped {
		transform: rotateY(180deg);
	}

	/* Focus pour l'accessibilité */
	.flip-inner:focus {
		outline: 3px solid #FF6101;
		outline-offset: 4px;
	}

	/* Faces communes */
	.face {
		position: absolute;
		inset: 0;
		backface-visibility: hidden;
		border-radius: var(--radius-lg);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		transition: all var(--transition-normal);
	}

	/* Face avant - Style moderne */
	.front {
		background: linear-gradient(135deg, #FF6101, var(--ctaSecondary));
		padding: var(--spacing-xl) var(--spacing-lg);
		gap: var(--spacing-lg);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}

	.feature-icon {
		font-size: clamp(3rem, 6vw, 4rem);
		color: white;
		background: rgba(255, 255, 255, 0.2);
		width: clamp(100px, 16vw, 130px);
		height: clamp(100px, 16vw, 130px);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
		border: 3px solid rgba(255, 255, 255, 0.3);
		padding: var(--spacing-md);
		transition: transform var(--transition-normal);
	}

	.flip-inner:hover .feature-icon {
		transform: scale(1.1) rotate(-5deg);
	}

	.title {
		margin: 0;
		font-size: clamp(1.4rem, 3vw, 1.8rem);
		color: white;
		font-family: var(--FFTitle);
		font-weight: 900;
		text-align: center;
		line-height: 1.2;
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	}

	.desc {
		flex-grow: 1;
		color: white;
		font-family: var(--FFTitle);
		font-size: clamp(0.95rem, 2vw, 1.1rem);
		font-weight: 500;
		line-height: 1.6;
		text-align: center;
		overflow-y: auto;
		max-height: 100%;
		padding: 0 var(--spacing-sm);
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
	}

	.desc::-webkit-scrollbar {
		width: 6px;
	}

	.desc::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 10px;
	}

	.desc::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.3);
		border-radius: 10px;
	}

	.desc::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 255, 0.5);
	}

	/* Boutons stylisés */
	.flip-button,
	.back-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-sm) var(--spacing-lg);
		background: white;
		color: #FF6101;
		border: none;
		font-weight: 700;
		font-size: clamp(0.95rem, 2vw, 1.1rem);
		border-radius: var(--radius-md);
		font-family: var(--FFTitle);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
		cursor: pointer;
		transition: all var(--transition-normal);
		border: 2px solid rgba(255, 97, 1, 0.2);
	}

	.flip-button:hover,
	.back-button:hover {
		transform: translateY(-3px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
		background: #FF6101;
		color: white;
	}

	.flip-button i,
	.back-button i {
		font-size: clamp(1rem, 2.5vw, 1.2rem);
	}

	/* Face arrière - Screenshot */
	.back {
		transform: rotateY(180deg);
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 245, 240, 0.95));
		padding: var(--spacing-md);
		gap: var(--spacing-md);
		border: 2px solid rgba(255, 97, 1, 0.15);
	}

	.screenshot-container {
		flex: 1;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		border-radius: var(--radius-md);
		background: linear-gradient(135deg, #f8f8f8, #e8e8e8);
		box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
		padding: var(--spacing-sm);
	}

	.img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center;
		border-radius: var(--radius-sm);
		transition: transform var(--transition-normal);
		filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
	}

	.flip-inner:hover .img {
		transform: scale(1.05);
	}

	/* Media queries pour responsive */
	@media (max-width: 1024px) {
		.flip-card {
			height: clamp(420px, 50vw, 600px);
		}

		.front {
			padding: var(--spacing-lg) var(--spacing-md);
			gap: var(--spacing-md);
		}
	}

	@media (max-width: 768px) {
		.flip-card {
			height: clamp(380px, 45vw, 500px);
		}

		.front {
			padding: var(--spacing-md);
			gap: var(--spacing-md);
		}

		.back {
			padding: var(--spacing-sm);
		}

		.feature-icon {
			width: clamp(70px, 12vw, 90px);
			height: clamp(70px, 12vw, 90px);
		}
	}

	@media (max-width: 480px) {
		.flip-card {
			height: clamp(350px, 60vw, 450px);
		}

		.front {
			padding: var(--spacing-md) var(--spacing-sm);
			gap: var(--spacing-sm);
		}

		.back {
			padding: var(--spacing-xs);
			gap: var(--spacing-sm);
		}

		.feature-icon {
			width: 70px;
			height: 70px;
			font-size: 2rem;
		}

		.title {
			font-size: clamp(1.1rem, 4vw, 1.3rem);
		}

		.desc {
			font-size: clamp(0.85rem, 2.5vw, 0.95rem);
			line-height: 1.5;
		}

		.flip-button span,
		.back-button span {
			font-size: clamp(0.85rem, 2.5vw, 0.95rem);
		}

		.screenshot-container {
			padding: var(--spacing-xs);
		}
	}

	/* Préfère moins d'animations : réduit la motion */
	@media (prefers-reduced-motion: reduce) {
		.flip-inner {
			transition: none;
		}
		.flip-inner.flipped {
			transform: none;
		}
		.feature-icon,
		.img {
			transition: none;
		}
	}
</style>
