<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';

	export let data;

	let sessionId = $page.url.searchParams.get('session_id');
	// Check data from layout or URL param
	$: fromApp = data.from_app || $page.url.searchParams.get('from_app') === 'true';
	$: type = $page.url.searchParams.get('type');
</script>

<svelte:head>
	<title>Paiement Réussi - Le Poilu</title>
</svelte:head>

<div class="page-container">
	<div class="success-card" in:fly={{ y: 20, duration: 800 }}>
		<div class="icon-wrapper" in:fly={{ scale: 0.5, duration: 600, delay: 200 }}>
			<i class="fa-solid fa-check"></i>
		</div>

		{#if type === 'free'}
			<h1>Annonce créée !</h1>
			<p class="subtitle">Ton annonce a bien été enregistrée.</p>
		{:else}
			<h1>Merci pour ta commande !</h1>
			<p class="subtitle">Ton paiement a été validé avec succès.</p>
		{/if}

		<div class="details">
			<p>Un email de confirmation t'a été envoyé.</p>
			{#if sessionId}
				<p class="ref">Référence transaction : <br /><code>{sessionId.slice(0, 20)}...</code></p>
			{/if}
			<p class="info">
				Ta demande est en cours de traitement et sera active dans quelques instants.
			</p>
		</div>

		<div class="actions">
			{#if fromApp}
				<a href="lepoilu://succes" class="btn btn-primary">
					<i class="fa-solid fa-mobile-screen"></i> Retourner sur l'application
				</a>
			{:else}
				<a href="/" class="btn btn-primary">
					<i class="fa-solid fa-house"></i> Retour à l'accueil
				</a>
			{/if}
		</div>
	</div>
</div>

<style>
	.page-container {
		min-height: 80vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--lightBg);
		padding: var(--spacing-md);
	}

	.success-card {
		background: white;
		padding: 3rem;
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow);
		text-align: center;
		max-width: 500px;
		width: 100%;
		border-top: 6px solid #10b981;
	}

	.icon-wrapper {
		width: 80px;
		height: 80px;
		background: #ecfdf5;
		color: #10b981;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2.5rem;
		margin: 0 auto 1.5rem;
		box-shadow: 0 4px 6px rgba(16, 185, 129, 0.2);
	}

	h1 {
		color: var(--text);
		font-size: 2rem;
		margin-bottom: 0.5rem;
		font-weight: 800;
	}

	.subtitle {
		color: var(--secondary);
		font-size: 1.1rem;
		margin-bottom: 2rem;
	}

	.details {
		background: #fafafa;
		padding: 1.5rem;
		border-radius: var(--radius-md);
		margin-bottom: 2rem;
		color: var(--text);
	}

	.ref {
		font-size: 0.85rem;
		color: var(--secondary);
		margin: 1rem 0;
	}

	code {
		background: #eee;
		padding: 2px 6px;
		border-radius: 4px;
		font-family: monospace;
	}

	.actions {
		display: flex;
		justify-content: center;
	}

	.btn {
		padding: 12px 24px;
		border-radius: 50px;
		font-weight: 600;
		cursor: pointer;
		transition: all var(--transition-fast);
		border: none;
		display: flex;
		align-items: center;
		gap: 8px;
		text-decoration: none;
		font-size: 1rem;
	}

	.btn-primary {
		background: var(--cta);
		color: white;
	}

	.btn-primary:hover {
		background: var(--ctaHover);
		transform: translateY(-2px);
		box-shadow: 0 5px 15px var(--ctaFade);
	}
</style>
