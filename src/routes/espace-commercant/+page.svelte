<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { auth, db } from '$lib/firebase';
	import { collection, query, where, getDocs } from 'firebase/firestore';
	import { onAuthStateChanged } from 'firebase/auth';

	// Icons
	import StorefrontIcon from '$lib/Components/icons/StorefrontIcon.svelte';
	import TimeIcon from '$lib/Components/icons/TimeIcon.svelte';
	import CheckCircleIcon from '$lib/Components/icons/CheckCircleIcon.svelte';
	import CloseCircleIcon from '$lib/Components/icons/CloseCircleIcon.svelte';
	import AlertCircleIcon from '$lib/Components/icons/AlertCircleIcon.svelte';
	import PauseCircleIcon from '$lib/Components/icons/PauseCircleIcon.svelte';
	import StarIcon from '$lib/Components/icons/StarIcon.svelte';
	import EyeIcon from '$lib/Components/icons/EyeIcon.svelte';
	import CursorClickIcon from '$lib/Components/icons/CursorClickIcon.svelte';
	import GiftIcon from '$lib/Components/icons/GiftIcon.svelte';
	import EditIcon from '$lib/Components/icons/EditIcon.svelte';
	import ImageIcon from '$lib/Components/icons/ImageIcon.svelte';
	import MailIcon from '$lib/Components/icons/MailIcon.svelte';
	import ChevronRightIcon from '$lib/Components/icons/ChevronRightIcon.svelte';

	let user = null;
	let sponsor = null;
	let loading = true;
	let errorMsg = '';

	onMount(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			user = currentUser;
			if (user) {
				fetchSponsorData(user.uid);
			} else {
				loading = false;
				window.location.href = '/compte?redirect=/espace-commercant';
			}
		});

		return () => unsubscribe();
	});

	async function fetchSponsorData(uid) {
		try {
			loading = true;
			const q = query(collection(db, 'Sponsors'), where('userId', '==', uid));

			const snapshot = await getDocs(q);

			if (snapshot.empty) {
				sponsor = null;
			} else {
				sponsor = {
					id: snapshot.docs[0].id,
					...snapshot.docs[0].data()
				};
			}
		} catch (error) {
			console.error('[Espace Commercant] Erreur:', error);
			errorMsg = 'Impossible de charger vos données.';
		} finally {
			loading = false;
		}
	}

	function getStatusInfo(status) {
		switch (status) {
			case 'pending':
				return { label: 'En attente de modération' };
			case 'approved':
				return { label: 'Fiche active' };
			case 'rejected':
				return { label: 'Fiche rejetée' };
			case 'expired':
				return { label: 'Abonnement expiré' };
			case 'suspended':
				return { label: 'Fiche suspendue' };
			default:
				return { label: status || 'Inconnu' };
		}
	}

	$: statusInfo = sponsor ? getStatusInfo(sponsor.status) : null;
	$: isPremium = sponsor?.currentPlan?.type === 'premium';
	$: isActive = sponsor?.currentPlan?.isActive;
	$: isExpired = sponsor?.status === 'expired' || (sponsor && !isActive);
</script>

<svelte:head>
	<title>Mon Espace Commerçant - Le Poilu</title>
</svelte:head>

<div class="espace-layout">
	<header class="espace-header">
		<div class="header-content">
			<h1>Espace Commerçant</h1>
			{#if user}
				<div class="user-email">{user.email}</div>
			{/if}
		</div>
	</header>

	<main class="espace-main">
		{#if loading}
			<div class="loading-state" in:fade>
				<div class="spinner"></div>
				<p>Chargement de votre espace...</p>
			</div>
		{:else if errorMsg}
			<div class="error-state" in:fade>
				<div class="error-icon-wrapper">
					<AlertCircleIcon class="alert-icon" />
				</div>
				<div class="error-content">
					<p>{errorMsg}</p>
					<button class="btn-retry" on:click={() => fetchSponsorData(user.uid)}> Réessayer </button>
				</div>
			</div>
		{:else if !sponsor}
			<div class="empty-state" in:fade>
				<div class="empty-icon-wrapper">
					<StorefrontIcon class="store-icon" />
				</div>
				<h2>Aucune fiche commerçant</h2>
				<p>
					Vous n'avez pas encore de vitrine dans Le Carnet du Poilu. Gagnez en visibilité auprès des
					clients locaux de l'Ouest Lyonnais.
				</p>
				<a href="/espace-commercant/rejoindre" class="btn-primary">Créer ma vitrine</a>
			</div>
		{:else}
			<div class="dashboard-content" in:fade>
				<section class="card profile-card">
					<div class="profile-header">
						<div class="profile-info">
							<h2>{sponsor.businessName}</h2>
							<p>{sponsor.category}</p>
						</div>
						{#if isPremium}
							<div class="premium-badge">
								<StarIcon class="star-icon" />
								<span>PREMIUM</span>
							</div>
						{/if}
					</div>

					<div class="status-banner {sponsor.status}">
						<div class="status-icon">
							{#if sponsor.status === 'approved'}
								<CheckCircleIcon class="icon-approved" />
							{:else if sponsor.status === 'pending'}
								<TimeIcon class="icon-pending" />
							{:else if sponsor.status === 'rejected'}
								<CloseCircleIcon class="icon-rejected" />
							{:else if sponsor.status === 'expired'}
								<AlertCircleIcon class="icon-expired" />
							{:else}
								<PauseCircleIcon class="icon-suspended" />
							{/if}
						</div>
						<span class="status-label">{statusInfo.label}</span>
					</div>

					{#if sponsor.status === 'pending'}
						<div class="status-message message-info">
							<p>
								Votre fiche est en cours de modération par notre équipe. Le Poilu valide chaque
								commerce pour garantir la qualité de l'annuaire. Vous recevrez un email sous 24h à
								48h.
							</p>
						</div>
					{:else if sponsor.status === 'rejected' && sponsor.rejectionReason}
						<div class="status-message message-error">
							<h4>Raison du refus :</h4>
							<p>{sponsor.rejectionReason}</p>
							<a href="/espace-commercant/modifier" class="btn-error">Modifier ma fiche</a>
						</div>
					{:else if isExpired}
						<div class="status-message message-error">
							<h4>Vitrine inactive</h4>
							<p>Votre fiche n'est plus visible par les utilisateurs dans Le Carnet.</p>
							<a href="/espace-commercant/renouveler" class="btn-error">Passer en Premium</a>
						</div>
					{/if}

					{#if sponsor.status === 'approved' && isActive}
						<div class="stats-section">
							<h3><span class="emoji-icon">📊</span> Vos performances</h3>
							<div class="stats-grid">
								<div class="stat-card">
									<div class="stat-icon-wrapper text-primary">
										<EyeIcon class="stat-icon" />
									</div>
									<span class="stat-value">{sponsor.stats?.views || 0}</span>
									<span class="stat-label">Vues</span>
								</div>
								<div class="stat-card">
									<div class="stat-icon-wrapper text-green">
										<CursorClickIcon class="stat-icon" />
									</div>
									<span class="stat-value">{sponsor.stats?.clicks || 0}</span>
									<span class="stat-label">Clics</span>
								</div>
								<div class="stat-card">
									<div class="stat-icon-wrapper text-orange">
										<GiftIcon class="stat-icon" />
									</div>
									<span class="stat-value">{sponsor.stats?.offersShown || 0}</span>
									<span class="stat-label">Offres vues</span>
								</div>
							</div>
							{#if sponsor.stats?.lastViewDate}
								<div class="stat-footer">
									Dernière vue le {new Date(
										sponsor.stats.lastViewDate?.seconds * 1000
									).toLocaleDateString('fr-FR')}
								</div>
							{/if}
						</div>
					{/if}
				</section>

				<section class="card actions-card">
					<h3><span class="emoji-icon">⚙️</span> Gérer ma vitrine</h3>
					<div class="actions-list">
						<a href="/espace-commercant/modifier" class="action-item">
							<div class="action-content">
								<div class="action-icon-wrapper icon-edit">
									<EditIcon class="action-icon" />
								</div>
								<div class="action-text">
									<h4>Modifier mes informations</h4>
									<p>Description, horaires, contact, adresse...</p>
								</div>
							</div>
							<ChevronRightIcon class="chevron-icon" />
						</a>

						<a href="/espace-commercant/offres" class="action-item">
							<div class="action-content">
								<div class="action-icon-wrapper icon-offer">
									<GiftIcon class="action-icon" />
								</div>
								<div class="action-text">
									<h4>Mon offre exclusive</h4>
									<p>
										{#if sponsor.specialOffer?.isActive}
											<span class="offer-active">Offre active :</span> {sponsor.specialOffer.title}
										{:else}
											Attirez plus de clients avec une réduction
										{/if}
									</p>
								</div>
							</div>
							<ChevronRightIcon class="chevron-icon" />
						</a>

						<a href="/espace-commercant/photos" class="action-item">
							<div class="action-content">
								<div class="action-icon-wrapper icon-photo">
									<ImageIcon class="action-icon" />
								</div>
								<div class="action-text">
									<h4>Mes photos</h4>
									<p>
										{#if isPremium}
											{sponsor.images?.length || 0} / 5 photos ajoutées
										{:else}
											<span class="text-warning">Réservé aux comptes Premium</span>
										{/if}
									</p>
								</div>
							</div>
							<ChevronRightIcon class="chevron-icon" />
						</a>

						{#if sponsor.status === 'approved' && isActive}
							<a href={`/carnet/${sponsor.id}`} target="_blank" class="action-item preview-item">
								<div class="action-content">
									<div class="action-icon-wrapper icon-preview">
										<EyeIcon class="action-icon" />
									</div>
									<div class="action-text">
										<h4>Voir ma fiche publique</h4>
										<p>Découvrez comment les utilisateurs voient votre vitrine</p>
									</div>
								</div>
								<ChevronRightIcon class="chevron-icon" />
							</a>
						{/if}
					</div>
				</section>

				<section class="card support-card">
					<h3><span class="emoji-icon">❓</span> Besoin d'aide ?</h3>
					<p>
						Une question sur votre abonnement, vos statistiques ou besoin d'aide pour optimiser
						votre fiche ? Notre équipe est là pour vous.
					</p>
					<a href="/contact" class="btn-support">
						<MailIcon class="support-icon" />
						Contacter le support
					</a>
				</section>
			</div>
		{/if}
	</main>
</div>

<style>
	.espace-layout {
		--color-primary: #e65100;
		--color-primary-dark: #cc4800;
		--color-bg: #f9fafb;
		--color-surface: #ffffff;
		--color-text: #111827;
		--color-text-muted: #6b7280;
		--color-border: #f3f4f6;
		--color-orange-light: #fff8f0;
		--color-orange-border: #ffe8d6;
		--color-green: #10b981;
		--color-green-light: #ecfdf5;
		--color-blue: #3b82f6;
		--color-blue-light: #eff6ff;
		--color-red: #ef4444;
		--color-red-light: #fef2f2;
		--color-yellow: #f59e0b;
		--color-yellow-light: #fffbeb;

		--radius-lg: 16px;
		--radius-md: 12px;
		--radius-sm: 8px;

		--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
		--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

		min-height: 100vh;
		background-color: var(--color-bg);
		padding-bottom: 3rem;
		font-family:
			'Inter',
			system-ui,
			-apple-system,
			sans-serif;
	}

	h1,
	h2,
	h3,
	h4 {
		margin: 0;
		color: var(--color-text);
		font-family: 'Poppins', system-ui, sans-serif;
	}
	p {
		margin: 0;
		line-height: 1.5;
	}

	.espace-header {
		background-color: var(--color-surface);
		border-bottom: 1px solid var(--color-border);
		position: sticky;
		top: 0;
		z-index: 10;
		box-shadow: var(--shadow-sm);
	}
	.header-content {
		max-width: 800px;
		margin: 0 auto;
		padding: 1rem 1.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.espace-header h1 {
		font-size: 1.25rem;
		font-weight: 700;
	}
	.user-email {
		font-size: 0.875rem;
		color: var(--color-text-muted);
	}
	@media (max-width: 600px) {
		.user-email {
			display: none;
		}
	}

	.espace-main {
		max-width: 800px;
		margin: 1.5rem auto 0;
		padding: 0 1.5rem;
	}

	.loading-state,
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 4rem 1rem;
		text-align: center;
	}
	.spinner {
		width: 3rem;
		height: 3rem;
		border: 3px solid var(--color-border);
		border-bottom-color: var(--color-primary);
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin-bottom: 1rem;
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
	.loading-state p {
		color: var(--color-text-muted);
		font-weight: 500;
	}

	.error-state {
		display: flex;
		background-color: var(--color-red-light);
		border-left: 4px solid var(--color-red);
		padding: 1rem;
		border-radius: var(--radius-sm);
		margin-bottom: 1.5rem;
	}
	.error-icon-wrapper {
		flex-shrink: 0;
		margin-right: 0.75rem;
	}
	:global(.alert-icon) {
		width: 1.25rem;
		height: 1.25rem;
		color: var(--color-red);
	}
	.error-content p {
		color: #b91c1c;
		font-weight: 500;
		font-size: 0.875rem;
	}
	.btn-retry {
		background: none;
		border: none;
		color: #dc2626;
		text-decoration: underline;
		font-size: 0.875rem;
		cursor: pointer;
		padding: 0;
		margin-top: 0.5rem;
	}

	.empty-state {
		background: var(--color-surface);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
		border: 1px solid var(--color-border);
		padding: 4rem 2rem;
	}
	.empty-icon-wrapper {
		width: 5rem;
		height: 5rem;
		background: var(--color-bg);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1.5rem;
	}
	:global(.store-icon) {
		width: 2.5rem;
		height: 2.5rem;
		color: #9ca3af;
	}
	.empty-state h2 {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}
	.empty-state p {
		color: var(--color-text-muted);
		max-width: 28rem;
		margin-bottom: 2rem;
	}
	.btn-primary {
		display: inline-block;
		background-color: var(--color-primary);
		color: white;
		font-weight: 600;
		padding: 0.75rem 2rem;
		border-radius: 9999px;
		text-decoration: none;
		box-shadow: var(--shadow-sm);
		transition: all 0.2s ease;
	}
	.btn-primary:hover {
		background-color: var(--color-primary-dark);
		transform: translateY(-1px);
		box-shadow: var(--shadow-md);
	}

	.dashboard-content {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.card {
		background: var(--color-surface);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
		border: 1px solid var(--color-border);
		overflow: hidden;
	}

	.profile-card {
		border-color: var(--color-orange-border);
	}
	.profile-header {
		background-color: var(--color-orange-light);
		padding: 1.5rem;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		border-bottom: 1px solid var(--color-orange-border);
	}
	.profile-info h2 {
		font-size: 1.5rem;
		margin-bottom: 0.25rem;
	}
	.profile-info p {
		color: var(--color-text-muted);
	}
	.premium-badge {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		background: #111827;
		color: #facc15;
		padding: 0.375rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.025em;
	}
	:global(.star-icon) {
		width: 0.875rem;
		height: 0.875rem;
	}

	.status-banner {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem;
		border-radius: var(--radius-md);
		margin: 1.5rem 1.5rem 0 1.5rem;
		background: #f3f4f6;
	}
	.status-banner.approved {
		background: var(--color-green-light);
		color: #047857;
		border: 1px solid #d1fae5;
	}
	.status-banner.pending {
		background: var(--color-yellow-light);
		color: #b45309;
		border: 1px solid #fef3c7;
	}
	.status-banner.rejected {
		background: var(--color-red-light);
		color: #b91c1c;
		border: 1px solid #fee2e2;
	}
	.status-banner.expired {
		background: var(--color-red-light);
		color: #b91c1c;
		border: 1px solid #fee2e2;
	}

	.status-icon {
		display: flex;
		align-items: center;
	}
	:global(.icon-approved) {
		width: 1.25rem;
		height: 1.25rem;
		color: var(--color-green);
	}
	:global(.icon-pending) {
		width: 1.25rem;
		height: 1.25rem;
		color: var(--color-yellow);
	}
	:global(.icon-rejected),
	:global(.icon-expired) {
		width: 1.25rem;
		height: 1.25rem;
		color: var(--color-red);
	}
	:global(.icon-suspended) {
		width: 1.25rem;
		height: 1.25rem;
		color: var(--color-text-muted);
	}
	.status-label {
		font-weight: 600;
		font-size: 0.9375rem;
	}

	.status-message {
		margin: 0.75rem 1.5rem 1.5rem 1.5rem;
		padding: 1rem;
		border-radius: var(--radius-md);
	}
	.message-info {
		background: var(--color-blue-light);
		border: 1px solid #dbeafe;
		color: #1d4ed8;
		font-size: 0.875rem;
	}
	.message-error {
		background: var(--color-red-light);
		border: 1px solid #fee2e2;
		color: #b91c1c;
	}
	.message-error h4 {
		color: #991b1b;
		font-size: 0.875rem;
		margin-bottom: 0.25rem;
	}
	.message-error p {
		font-size: 0.875rem;
		margin-bottom: 0.75rem;
	}
	.btn-error {
		display: inline-block;
		background: #b91c1c;
		color: white;
		padding: 0.5rem 1rem;
		border-radius: var(--radius-sm);
		text-decoration: none;
		font-size: 0.875rem;
		font-weight: 600;
		transition: background 0.2s;
	}
	.btn-error:hover {
		background: #991b1b;
	}

	.stats-section {
		padding: 1.5rem;
		margin-top: 1.5rem;
		border-top: 1px solid var(--color-orange-border);
	}
	.stats-section h3,
	.actions-card h3,
	.support-card h3 {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1.125rem;
		margin-bottom: 1rem;
	}
	.emoji-icon {
		font-size: 1.25rem;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}
	.stat-card {
		background: var(--color-bg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}
	.stat-card:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-sm);
		border-color: #e5e7eb;
	}
	.stat-icon-wrapper {
		margin-bottom: 0.5rem;
	}
	.text-primary {
		color: var(--color-primary);
	}
	.text-green {
		color: var(--color-green);
	}
	.text-orange {
		color: #f97316;
	}
	:global(.stat-icon) {
		width: 1.75rem;
		height: 1.75rem;
	}

	.stat-value {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color-text);
		margin-bottom: 0.25rem;
	}
	.stat-label {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-text-muted);
		font-weight: 600;
	}
	.stat-footer {
		text-align: center;
		margin-top: 1rem;
		font-size: 0.75rem;
		color: #9ca3af;
	}

	@media (max-width: 480px) {
		.stats-grid {
			grid-template-columns: 1fr;
			gap: 0.75rem;
		}
	}

	.actions-card {
		padding: 1.5rem;
	}
	.actions-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	.action-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		text-decoration: none;
		transition: all 0.2s ease;
	}
	.action-item:hover {
		background: #f9fafb;
		border-color: #d1d5db;
		box-shadow: var(--shadow-sm);
	}
	.action-content {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	.action-icon-wrapper {
		background: var(--color-surface);
		padding: 0.5rem;
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow-sm);
		border: 1px solid var(--color-border);
		transition: box-shadow 0.2s ease;
	}
	.action-item:hover .action-icon-wrapper {
		box-shadow: var(--shadow-md);
	}

	.icon-edit {
		color: var(--color-primary);
	}
	.icon-offer {
		color: var(--color-green);
	}
	.icon-photo {
		color: var(--color-blue);
	}
	.icon-preview {
		color: #2563eb;
	}
	:global(.action-icon) {
		width: 1.5rem;
		height: 1.5rem;
	}

	.action-text h4 {
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-text);
		margin-bottom: 0.125rem;
	}
	.action-text p {
		font-size: 0.875rem;
		color: var(--color-text-muted);
	}
	.offer-active {
		color: #16a34a;
		font-weight: 500;
	}
	.text-warning {
		color: #ca8a04;
	}
	:global(.chevron-icon) {
		width: 1.25rem;
		height: 1.25rem;
		color: #9ca3af;
	}

	.preview-item {
		background: var(--color-blue-light);
		border-color: #bfdbfe;
	}
	.preview-item:hover {
		background: #dbeafe;
		border-color: #93c5fd;
	}
	.preview-item .action-icon-wrapper {
		border-color: #bfdbfe;
	}
	.preview-item .action-text h4 {
		color: #1e3a8a;
	}
	.preview-item .action-text p {
		color: #1d4ed8;
	}
	.preview-item :global(.chevron-icon) {
		color: #60a5fa;
	}

	.support-card {
		padding: 1.5rem;
	}
	.support-card p {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		margin-bottom: 1rem;
	}
	.btn-support {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		width: 100%;
		padding: 0.75rem;
		border: 2px solid var(--color-primary);
		color: var(--color-primary);
		border-radius: var(--radius-md);
		font-weight: 600;
		text-decoration: none;
		transition: all 0.2s ease;
		box-sizing: border-box;
	}
	.btn-support:hover {
		background: var(--color-primary);
		color: white;
	}
	:global(.support-icon) {
		width: 1.25rem;
		height: 1.25rem;
	}
</style>
