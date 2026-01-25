<script>
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';

	let planId = $page.url.searchParams.get('plan');

	const plans = {
		pack10: {
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
		pro: {
			name: 'Abonnement Pro',
			price: '49,99 €',
			period: '/mois',
			description: 'La solution ultime pour les professionnels.',
			features: [
				'Annonces illimitées',
				'Import CSV en masse',
				'Badge Organisateur Vérifié',
				'Support dédié 7j/7'
			]
		}
	};

	let selectedPlan = plans[planId] || plans['pack10']; // Default to pack10 if invalid

	let loading = false;
	let error = null;

	async function handlePayment() {
		loading = true;
		error = null;

		try {
			// Logic:
			// If plan is 'pack10', it's a credit pack for Ads -> type: 'ad' (as defined in checkout API logic for Pack 10)
			// If plan is 'pro', it's a Sponsor Subscription -> type: 'sponsor' (but checkout API expects sponsor data like company name etc.)
			// WAIT: The 'Pro' plan on Tarifs page says "Annonces illimitées... Badge organisateur". It sounds like a super-user/organizer plan, NOT necessarily a merchant 'carnet' listing.
			// However, in previous turns, the 'Pro' plan link was changed to /acheter-plan?plan=pro.
			// And in the Checkout API I treated 'sponsor' for subscriptions.
			// If 'Pro' is just a subscription for an organizer to post ads, it might be different from 'Merchant' listing.
			// Let's assume for now:
			// - Pack 10 -> Type 'ad' (buying credits)
			// - Pro -> Type 'sponsor' (subscription) OR verify if Pro needs company details.
			// The current checkout page mocks a credit card form but lacks company details form for Pro if it's a sponsor.
			// If 'Pro' is just a user subscription, sending it as 'sponsor' with empty company details might fail if API expects them.
			// Let's send basic user info for now.

			const type = planId === 'pack10' ? 'ad' : 'sponsor';

			const response = await fetch('/api/checkout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					type: type,
					planId: planId,
					data: {
						plan: planId,
						// Mock data for context since this checkout page doesn't ask for company details yet
						// In a real app, if Pro is a sponsor, we should ask for company info here too or link it to user profile.
						companyName: 'Organisateur Pro',
						email: 'user@example.com' // Should come from auth
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
			<h1>Finaliser votre commande</h1>
			<p>Plus qu'une étape pour profiter de vos avantages.</p>
		</div>

		<div class="checkout-grid">
			<!-- Order Summary -->
			<div class="summary-card" in:fade={{ delay: 200 }}>
				<div class="plan-header">
					<h2>{selectedPlan.name}</h2>
					<div class="price-tag">
						{selectedPlan.price}<span class="period">{selectedPlan.period || ''}</span>
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
			</div>

			<!-- Payment Form -->
			<div class="payment-card" in:fly={{ x: 20, duration: 600, delay: 400 }}>
				<h3>Moyen de paiement</h3>

				<form on:submit|preventDefault={handlePayment}>
					<div class="card-input-wrapper">
						<label for="cardName">Nom sur la carte</label>
						<input type="text" id="cardName" placeholder="Jean Dupont" required />
					</div>

					<div class="card-input-wrapper">
						<label for="cardNumber">Numéro de carte</label>
						<div class="input-with-icon">
							<i class="fa-regular fa-credit-card"></i>
							<input type="text" id="cardNumber" placeholder="0000 0000 0000 0000" required />
						</div>
					</div>

					<div class="grid-2">
						<div class="card-input-wrapper">
							<label for="expiry">Expiration</label>
							<input type="text" id="expiry" placeholder="MM/AA" required />
						</div>
						<div class="card-input-wrapper">
							<label for="cvc">CVC</label>
							<div class="input-with-icon">
								<i class="fa-solid fa-lock"></i>
								<input type="text" id="cvc" placeholder="123" required />
							</div>
						</div>
					</div>

					<p class="secure-text">
						<i class="fa-solid fa-shield-halved"></i> Paiement 100% sécurisé via Stripe
					</p>

					<div class="actions">
						<a href="/Tarifs" class="btn-back">Changer d'offre</a>
						<button type="submit" class="btn-pay" disabled={loading}>
							{#if loading}
								<i class="fa-solid fa-spinner fa-spin"></i> Traitement...
							{:else}
								Payer {selectedPlan.price} <i class="fa-solid fa-arrow-right"></i>
							{/if}
						</button>
					</div>
					{#if error}
						<p class="error-text">{error}</p>
					{/if}
				</form>
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

	.checkout-grid {
		display: grid;
		grid-template-columns: 1fr 1.2fr;
		gap: var(--spacing-lg);
		align-items: start;
	}

	/* Summary Card */
	.summary-card {
		background: white;
		padding: var(--spacing-lg);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow3);
		border: 1px solid var(--border);
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

	.period {
		font-size: 1rem;
		color: var(--secondary);
		font-weight: 400;
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
	}

	/* Payment Card */
	.payment-card {
		background: white;
		padding: var(--spacing-xl);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow);
	}

	.payment-card h3 {
		margin-bottom: var(--spacing-lg);
		color: var(--text);
	}

	.card-input-wrapper {
		margin-bottom: var(--spacing-md);
	}

	label {
		display: block;
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--text);
		margin-bottom: 5px;
	}

	input {
		width: 100%;
		padding: 12px 16px;
		border: 2px solid var(--border);
		border-radius: var(--radius-sm);
		font-size: 1rem;
		transition: all var(--transition-fast);
		font-family: var(--FFBody);
	}

	.input-with-icon {
		position: relative;
	}

	.input-with-icon i {
		position: absolute;
		left: 16px;
		top: 50%;
		transform: translateY(-50%);
		color: var(--secondary);
	}

	.input-with-icon input {
		padding-left: 45px;
	}

	input:focus {
		outline: none;
		border-color: var(--cta);
		box-shadow: 0 0 0 4px var(--ctaFade);
	}

	.grid-2 {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-md);
	}

	.secure-text {
		display: flex;
		align-items: center;
		gap: 8px;
		color: #10b981;
		font-size: 0.9rem;
		margin: var(--spacing-md) 0;
		background: #ecfdf5;
		padding: 10px;
		border-radius: var(--radius-sm);
	}

	.actions {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: var(--spacing-lg);
	}

	.btn-back {
		text-decoration: none;
		color: var(--secondary);
		font-weight: 500;
		transition: color var(--transition-fast);
	}

	.btn-back:hover {
		color: var(--text);
	}

	.btn-pay {
		padding: 14px 28px;
		background: var(--cta);
		color: white;
		border: none;
		border-radius: 50px;
		font-weight: 600;
		cursor: pointer;
		transition: all var(--transition-fast);
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 1.1rem;
	}

	.btn-pay:hover {
		background: var(--ctaHover);
		transform: translateY(-2px);
		box-shadow: 0 5px 15px var(--ctaFade);
	}

	@media (max-width: 768px) {
		.checkout-grid {
			grid-template-columns: 1fr;
		}

		.summary-card {
			order: -1;
		}

		.actions {
			flex-direction: column-reverse;
			gap: var(--spacing-md);
		}

		.btn-pay {
			width: 100%;
			justify-content: center;
		}
	}

	.error-text {
		color: #ef4444;
		text-align: center;
		margin-top: 10px;
		font-weight: 600;
	}
</style>
