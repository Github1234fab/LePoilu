<script>
	// Pas de script nécessaire pour l'instant
</script>

<section class="event-types-section">
	<h2 class="section-title">Quels événements publier ?</h2>
	<p class="section-description">
		Associations, clubs, mairies, commerçants ou particuliers : tous vos événements ont leur place
		sur Le Poilu
	</p>
	<div class="event-types-grid">
		<span class="event-tag">🎵 Concerts</span>
		<span class="event-tag">🎭 Spectacles</span>
		<span class="event-tag">🎪 Festivals</span>
		<span class="event-tag">🛒 Marchés</span>
		<span class="event-tag">🏷️ Brocantes</span>
		<span class="event-tag">🥾 Randonnées</span>
		<span class="event-tag">🚴 Balades</span>
		<span class="event-tag">⚽ Stages</span>
		<span class="event-tag">🎨 Ateliers créatifs</span>
		<span class="event-tag">🍷 Dégustations</span>
		<span class="event-tag">🎉 Fêtes locales</span>
		<span class="event-tag">🤝 Événements associatifs</span>
		<span class="event-tag">📚 Conférences</span>
		<span class="event-tag">🎬 Projections</span>
		<span class="event-tag">💃 Soirées dansantes</span>
		<span class="event-tag">🧘 Bien-être</span>
	</div>
</section>

<style>
	.event-types-section {
		background: white;
		border-radius: var(--radius-lg);
		padding: var(--spacing-xl) var(--spacing-lg);
		box-shadow: var(--shadow);
		margin-bottom: 50px;
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
		margin-bottom: var(--spacing-lg);
		margin-left: auto; /* Centrage du texte description */
		margin-right: auto;
	}

	.event-types-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		justify-content: center;
		max-width: 900px;
		margin: 0 auto;
	}

	.event-tag {
		background: linear-gradient(135deg, #fff5f2, #fff);
		border: 1px solid rgba(255, 97, 1, 0.2);
		color: var(--text);
		padding: 10px 18px;
		border-radius: 50px;
		font-family: var(--FFTitle);
		font-weight: 600;
		font-size: 0.95rem;
		transition: all 0.2s;
	}

	/* .event-tag:hover {
		background: linear-gradient(135deg, #ff6101, var(--ctaSecondary));
		color: white;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(255, 97, 1, 0.3);
	} */

	/* Mobile Responsive */
	@media (max-width: 768px) {
		.event-types-section {
			padding: var(--spacing-lg) var(--spacing-md);
		}

		.event-tag {
			padding: 8px 14px;
			font-size: 0.85rem;
		}

		.event-types-grid {
			gap: 8px;
		}
	}
</style>
