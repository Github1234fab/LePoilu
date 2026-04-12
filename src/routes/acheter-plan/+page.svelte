<script>
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';
	import { auth } from '$lib/firebase';
	import { GoogleAuthProvider, signInWithPopup, linkWithPopup } from 'firebase/auth';

	let planId = $page.url.searchParams.get('plan');

	const plans = {
		pack10: {
			id: 'pack10',
			name: 'Pack 10 Annonces',
			price: '24,99 €',
			description: 'Idéal pour les organisateurs réguliers.',
			features: [
				"10 crédits d'annonces Premium",
				'Validité illimitée',
				'Modération prioritaire',
				'Économie de 50%'
			]
		},
		unlimited: {
			id: 'unlimited',
			name: 'Pass Illimité 30 jours',
			price: '49,99 €',
			description: 'La solution ultime pour les professionnels.',
			features: [
				'Annonces illimitées pendant 30j',
				'Import CSV en masse',
				'Badge Organisateur Vérifié',
				'Support dédié 7j/7'
			]
		}
	};

	let selectedPlan = plans[planId] || plans['pack10']; // Default to pack10 if invalid

	let fromApp = $page.url.searchParams.get('from_app') === 'true';

	let loading = false;
	let error = null;

	async function handlePayment() {
		loading = true;
		error = null;

		try {
			// 1. Authentification (Forced Permanent Account)
			let user = auth.currentUser;
			const googleProvider = new GoogleAuthProvider();

			if (!user || user.isAnonymous) {
				try {
					const result = await signInWithPopup(auth, googleProvider);
					user = result.user;
				} catch (authErr) {
					console.error('Auth Cancelled/Error', authErr);
					throw new Error('Connexion Google requise pour acheter des crédits.');
				}
			}

			// 2. Call Checkout API
			// We determine 'type' based on plan.
			// pack10 -> credit_pack
			// unlimited -> unlimited_pass (handled similarly to credit_pack but different update logic)

			const type = selectedPlan.id === 'pack10' ? 'credit_pack' : 'unlimited_pass';

			const response = await fetch('/api/checkout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					type: type,
					planId: selectedPlan.id,
					fromApp: fromApp,
					data: {
						userId: user.uid,
						email: user.email
					}
				})
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || 'Erreur lors du paiement');
			}

			if (result.url) {
				window.location.href = result.url;
			}
		} catch (err) {
			console.error('Erreur:', err);
			error = err.message;
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Paiement - {selectedPlan.name}</title>
</svelte:head>

<div class="page-container">
	<div class="checkout-wrapper">
		<div class="header-section" in:fly={{ y: -20, duration: 800 }}>
			<h1>Finalise ta commande</h1>
			<p>Connecte-toi et paye en toute sécurité.</p>
		</div>

		<div class="checkout-grid centered-grid">
			<!-- Order Summary -->
			<div class="summary-card" in:fade={{ delay: 200 }}>
				<div class="plan-header">
					<h2>{selectedPlan.name}</h2>
					<div class="price-tag">
						{selectedPlan.price}
					</div>
				</div>
				<p class="plan-desc">{selectedPlan.description}</p>

				<div class="divider"></div>

				<ul class="features-list">
					{#each selectedPlan.features as feature}
						<li><i class="fa-solid fa-check"></i> {feature}</li>
					{/each}
				</ul>

				<div class="total-row">
					<span>Total à payer</span>
					<span>{selectedPlan.price}</span>
				</div>

				<!-- Action Button directly in card -->
				<div class="actions">
					<button class="btn-pay" on:click={handlePayment} disabled={loading}>
						{#if loading}
							<i class="fa-solid fa-spinner fa-spin"></i> Traitement...
						{:else}
							Payer avec Stripe <i class="fa-solid fa-arrow-right"></i>
						{/if}
					</button>
					{#if error}
						<p class="error-text">{error}</p>
					{/if}
					<p class="secure-text-small">
						<i class="fa-solid fa-lock"></i> Paiement sécurisé SSL.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.page-container {
		min-height: 100vh;
		background: var(--lightBg);
		padding: var(--spacing-xl) var(--spacing-md);
	}

	.checkout-wrapper {
		max-width: 1000px;
		margin: 0 auto;
	}

	.header-section {
		text-align: center;
		margin-bottom: var(--spacing-xl);
	}

	.header-section h1 {
		font-size: 2.5rem;
		color: var(--text);
		margin-bottom: var(--spacing-xs);
	}

	.header-section p {
		color: var(--secondary);
		font-size: 1.1rem;
	}

	/* Centered Grid for Single Card Layout */
	.checkout-grid.centered-grid {
		display: flex;
		justify-content: center;
	}

	/* Summary Card */
	.summary-card {
		background: white;
		padding: var(--spacing-lg);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow3);
		border: 1px solid var(--border);
		width: 100%;
		max-width: 500px;
	}

	.plan-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: var(--spacing-sm);
	}

	.plan-header h2 {
		font-size: 1.5rem;
		color: var(--text);
		max-width: 60%;
	}

	.price-tag {
		font-size: 1.8rem;
		font-weight: 700;
		color: var(--cta);
	}

	.plan-desc {
		color: var(--secondary);
		margin-bottom: var(--spacing-md);
	}

	.divider {
		height: 1px;
		background: #eee;
		margin: var(--spacing-md) 0;
	}

	.features-list {
		list-style: none;
		margin-bottom: var(--spacing-lg);
	}

	.features-list li {
		margin-bottom: 10px;
		display: flex;
		align-items: center;
		gap: 10px;
		color: var(--text);
	}

	.features-list li i {
		color: #10b981;
	}

	.total-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: var(--spacing-md);
		border-top: 2px solid var(--border);
		font-weight: 700;
		font-size: 1.2rem;
		color: var(--text);
		margin-bottom: var(--spacing-lg);
	}

	.actions {
		display: flex;
		flex-direction: column;
		gap: 10px;
		align-items: center;
	}

	.btn-pay {
		width: 100%;
		padding: 14px 28px;
		background: var(--cta);
		color: white;
		border: none;
		border-radius: 50px;
		font-weight: 600;
		cursor: pointer;
		transition: all var(--transition-fast);
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
		font-size: 1.1rem;
	}

	.btn-pay:hover {
		background: var(--ctaHover);
		transform: translateY(-2px);
		box-shadow: 0 5px 15px var(--ctaFade);
	}

	.btn-pay:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.secure-text-small {
		color: #10b981;
		font-size: 0.85rem;
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.error-text {
		color: #ef4444;
		text-align: center;
		margin-top: 10px;
		font-weight: 600;
	}
</style>
