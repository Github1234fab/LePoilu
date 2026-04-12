<script>
	// Pas de script nécessaire pour l'instant
</script>

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

<style>
	.event-types-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		justify-content: center;
		max-width: 900px;
		margin: 0 auto;
	}

	.event-tag {
		background: white;
		border: 1px solid rgba(0, 0, 0, 0.05);
		color: var(--text);
		padding: 10px 18px;
		border-radius: 50px;
		font-family: var(--FFTitle);
		font-weight: 600;
		font-size: 0.95rem;
		transition: all 0.2s;
		box-shadow: 0 2px 4px rgba(0,0,0,0.02);
	}

	@media (max-width: 768px) {
		.event-tag {
			padding: 8px 14px;
			font-size: 0.85rem;
		}

		.event-types-grid {
			gap: 8px;
		}
	}
</style>
