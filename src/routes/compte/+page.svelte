<script>
	import { auth, db } from '$lib/firebase';
	import {
		signOut,
		signInWithEmailAndPassword,
		createUserWithEmailAndPassword,
		updateProfile,
		sendPasswordResetEmail
	} from 'firebase/auth';
	import { doc, getDoc, collection, query, where, getDocs, setDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';

	let user = null;
	let userData = null;
	let sponsorData = null;
	let loading = true;

	// Form State
	let email = '';
	let password = '';
	let name = ''; // For registration
	let isRegistering = false;
	let isResettingPassword = false;
	let errorMessage = '';
	let successMessage = '';
	let formLoading = false;

	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged(async (u) => {
			user = u;
			if (user) {
				// Check for redirect param
				const params = new URLSearchParams(window.location.search);
				const redirect = params.get('redirect');
				if (redirect) {
					goto(redirect);
					return;
				}
				await fetchUserData(user.uid);
			} else {
				userData = null;
				sponsorData = null;
			}
			loading = false;
		});

		return unsubscribe;
	});

	async function fetchUserData(uid) {
		try {
			// 1. Fetch User Profile
			const docRef = doc(db, 'Users', uid);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				userData = docSnap.data();
			}

			// 2. Fetch Sponsor Status
			const q = query(collection(db, 'Sponsors'), where('userId', '==', uid));
			const querySnapshot = await getDocs(q);
			if (!querySnapshot.empty) {
				// Take the first one found (assuming one business per user for now)
				sponsorData = querySnapshot.docs[0].data();
			}
		} catch (error) {
			console.error('Erreur chargement données:', error);
		}
	}

	async function handleEmailAuth() {
		errorMessage = '';
		successMessage = '';
		formLoading = true;
		try {
			if (isRegistering) {
				// REGISTER
				if (!name.trim()) {
					throw new Error('Le nom est obligatoire.');
				}
				const userCredential = await createUserWithEmailAndPassword(auth, email, password);
				const newUser = userCredential.user;

				await updateProfile(newUser, {
					displayName: name
				});

				// Create User Document in Firestore
				await setDoc(doc(db, 'Users', newUser.uid), {
					email: newUser.email,
					displayName: name,
					createdAt: new Date(),
					role: 'user'
				});
			} else {
				// LOGIN
				await signInWithEmailAndPassword(auth, email, password);
			}
		} catch (error) {
			console.error('Auth Error:', error);
			// Translate common firebase errors
			if (error.code === 'auth/email-already-in-use') {
				errorMessage = 'Cet email est déjà utilisé.';
			} else if (error.code === 'auth/invalid-email') {
				errorMessage = 'Email invalide.';
			} else if (error.code === 'auth/weak-password') {
				errorMessage = 'Le mot de passe doit faire au moins 6 caractères.';
			} else if (
				error.code === 'auth/user-not-found' ||
				error.code === 'auth/wrong-password' ||
				error.code === 'auth/invalid-credential'
			) {
				errorMessage = 'Email ou mot de passe incorrect.';
			} else {
				errorMessage = error.message;
			}
		} finally {
			formLoading = false;
		}
	}

	async function handlePasswordReset() {
		if (!email) {
			errorMessage = 'Veuillez entrer votre email.';
			return;
		}
		errorMessage = '';
		successMessage = '';
		formLoading = true;
		try {
			await sendPasswordResetEmail(auth, email);
			successMessage = 'Email de réinitialisation envoyé ! Vérifiez votre boîte mail.';
			isResettingPassword = false; // Return to login view potentially, or stay to show success
		} catch (error) {
			console.error('Reset Error:', error);
			if (error.code === 'auth/user-not-found') {
				errorMessage = 'Aucun compte associé à cet email.';
			} else if (error.code === 'auth/invalid-email') {
				errorMessage = 'Email invalide.';
			} else {
				errorMessage = error.message;
			}
		} finally {
			formLoading = false;
		}
	}

	async function logout() {
		try {
			await signOut(auth);
			window.location.href = '/';
		} catch (error) {
			console.error('Erreur déconnexion:', error);
		}
	}
</script>

<svelte:head>
	<title>Mon Compte - Le Poilu</title>
</svelte:head>

<div class="page-container">
	<div class="account-wrapper">
		{#if loading}
			<div class="loading">
				<i class="fa-solid fa-spinner fa-spin"></i> Chargement...
			</div>
		{:else if !user}
			<!-- Not Logged In State -->
			<div class="login-card" in:fade>
				<h1>Bienvenue sur Le Poilu</h1>
				<p class="subtitle">Connectez-vous pour gérer vos annonces et votre espace.</p>

				{#if errorMessage}
					<div class="error-message">
						<i class="fa-solid fa-triangle-exclamation"></i>
						{errorMessage}
					</div>
				{/if}

				{#if successMessage}
					<div class="success-message">
						<i class="fa-solid fa-check-circle"></i>
						{successMessage}
					</div>
				{/if}

				{#if isResettingPassword}
					<div class="auth-form">
						<h3>Réinitialiser le mot de passe</h3>
						<p class="small-text">
							Entrez votre email pour recevoir un lien de réinitialisation. (Pensez à vérifier les
							spams de votre boîte mail)
						</p>

						<div class="input-group">
							<i class="fa-solid fa-envelope input-icon"></i>
							<input type="email" placeholder="Email" bind:value={email} required />
						</div>

						<button class="btn-primary" on:click={handlePasswordReset} disabled={formLoading}>
							{formLoading ? 'Envoi...' : 'Envoyer le lien'}
						</button>

						<button
							class="toggle-auth"
							on:click={() => {
								isResettingPassword = false;
								errorMessage = '';
								successMessage = '';
							}}
						>
							Retour à la connexion
						</button>
					</div>
				{:else}
					<form on:submit|preventDefault={handleEmailAuth} class="auth-form">
						{#if isRegistering}
							<div class="input-group">
								<i class="fa-solid fa-user input-icon"></i>
								<input type="text" placeholder="Votre Nom" bind:value={name} required />
							</div>
						{/if}

						<div class="input-group">
							<i class="fa-solid fa-envelope input-icon"></i>
							<input type="email" placeholder="Email" bind:value={email} required />
						</div>

						<div class="input-group">
							<i class="fa-solid fa-lock input-icon"></i>
							<input
								type="password"
								placeholder="Mot de passe"
								bind:value={password}
								required
								minlength="6"
							/>
						</div>

						{#if !isRegistering}
							<div class="forgot-password">
								<button
									type="button"
									on:click={() => {
										isResettingPassword = true;
										errorMessage = '';
									}}
								>
									Mot de passe oublié ?
								</button>
							</div>
						{/if}

						<button type="submit" class="btn-primary" disabled={formLoading}>
							{formLoading ? 'Chargement...' : isRegistering ? "S'inscrire" : 'Se connecter'}
						</button>
					</form>

					<div class="divider">
						<span>OU</span>
					</div>

					<button
						class="toggle-auth"
						on:click={() => {
							isRegistering = !isRegistering;
							errorMessage = '';
							successMessage = '';
						}}
					>
						{isRegistering ? 'Déjà un compte ? Se connecter' : "Pas encore de compte ? S'inscrire"}
					</button>
				{/if}
			</div>
		{:else}
			<!-- Logged In State -->
			<div class="dashboard" in:fade>
				<header class="dashboard-header">
					<div class="user-info">
						<div>
							<h2>{user.displayName || 'Utilisateur'}</h2>
							<p class="email">{user.email}</p>
						</div>
					</div>
					<button class="btn-logout" on:click={logout}>
						<i class="fa-solid fa-right-from-bracket"></i> Déconnexion
					</button>
				</header>

				<div class="stats-grid">
					<!-- Credits Card -->
					<div class="stat-card">
						<div class="icon-bg">
							<i class="fa-solid fa-coins"></i>
						</div>
						<div class="stat-content">
							<h3>Mes Crédits</h3>
							<p class="stat-number">
								{#if userData?.subscription?.credits !== undefined}
									{userData.subscription.credits}
								{:else}
									0
								{/if}
							</p>
							<a href="/acheter-plan?plan=pack10" class="btn-sm">Recharger</a>
						</div>
					</div>

					<!-- Subscription Card -->
					<div class="stat-card">
						<div class="icon-bg star">
							<i class="fa-solid fa-star"></i>
						</div>
						<div class="stat-content">
							<h3>Abonnement</h3>
							{#if userData?.subscription?.planId === 'unlimited30' && userData.subscription.isActive}
								<p class="stat-number active">Illimité</p>
								<p class="stat-sub">
									Expire le {userData.subscription.expiresAt
										? new Date(userData.subscription.expiresAt.seconds * 1000).toLocaleDateString()
										: '?'}
								</p>
							{:else}
								<p class="stat-number inactive">Aucun</p>
								<a href="/acheter-plan?plan=unlimited" class="btn-sm">S'abonner</a>
							{/if}
						</div>
					</div>

					<!-- Sponsor Card -->
					<div class="stat-card">
						<div class="icon-bg sponsor-icon">
							<i class="fa-solid fa-store"></i>
						</div>
						<div class="stat-content">
							<h3>Espace Commerçant</h3>
							{#if sponsorData}
								<p class="stat-number {sponsorData.currentPlan?.isActive ? 'active' : 'pending'}">
									{sponsorData.currentPlan?.isActive ? 'Actif' : 'En attente'}
								</p>
								<p class="stat-sub">{sponsorData.currentPlan?.name || 'Sponsor'}</p>
							{:else}
								<p class="stat-number inactive">Aucun</p>
								<a href="/carnet/rejoindre" class="btn-sm">Devenir Sponsor</a>
							{/if}
						</div>
					</div>
				</div>

				<!-- Actions / Links -->
				<div class="menu-list">
					<a href="/Tarifs" class="menu-item">
						<i class="fa-solid fa-plus"></i>
						<span>Publier une annonce</span>
						<i class="fa-solid fa-chevron-right arrow"></i>
					</a>
					<a href="/carnet/rejoindre" class="menu-item">
						<i class="fa-solid fa-store"></i>
						<span>Apparaissez sur le Carnet en tant que commerçant</span>
						<i class="fa-solid fa-chevron-right arrow"></i>
					</a>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.page-container {
		min-height: 80vh;
		background: var(--lightBg);
		padding: var(--spacing-lg);
		display: flex;
		justify-content: center;
	}

	.account-wrapper {
		width: 100%;
		max-width: 800px;
	}

	.loading {
		text-align: center;
		font-size: 1.2rem;
		color: var(--secondary);
		margin-top: 50px;
	}

	/* Login Card */
	.login-card {
		background: white;
		padding: var(--spacing-xl);
		border-radius: var(--radius-lg);
		text-align: center;
		box-shadow: var(--shadow);
		margin-top: 50px;
	}

	.login-card h1 {
		margin-bottom: var(--spacing-md);
		color: var(--text);
	}

	.login-card p {
		margin-bottom: var(--spacing-lg);
		color: var(--secondary);
	}

	.btn-primary {
		width: 100%;
		background: linear-gradient(135deg, #ff6101, var(--ctaSecondary));
		color: white;
		border: none;
		padding: 12px;
		border-radius: 50px;
		font-weight: 700;
		font-size: 1rem;
		cursor: pointer;
		margin-top: 10px;
		transition: transform 0.2s;
	}

	.btn-primary:hover {
		transform: scale(1.02);
	}

	.btn-primary:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	/* Form Styles */
	.auth-form {
		display: flex;
		flex-direction: column;
		gap: 15px;
		margin-bottom: 20px;
	}

	.input-group {
		position: relative;
	}

	.input-icon {
		position: absolute;
		left: 15px;
		top: 50%;
		transform: translateY(-50%);
		color: #999;
	}

	.input-group input {
		width: 100%;
		padding: 12px 12px 12px 40px;
		border: 1px solid #ddd;
		border-radius: 12px;
		font-size: 1rem;
		box-sizing: border-box; /* Important fix */
		outline: none;
		transition: border-color 0.2s;
	}

	.input-group input:focus {
		border-color: #ff6101;
	}

	.divider {
		display: flex;
		align-items: center;
		text-align: center;
		margin: 20px 0;
		color: #aaa;
		font-size: 0.8rem;
		font-weight: 600;
	}

	.divider::before,
	.divider::after {
		content: '';
		flex: 1;
		border-bottom: 1px solid #eee;
	}

	.divider span {
		padding: 0 10px;
	}

	.toggle-auth {
		background: none;
		border: none;
		color: #ff6101;
		font-weight: 600;
		margin-top: 20px;
		cursor: pointer;
		font-size: 0.9rem;
	}

	.toggle-auth:hover {
		text-decoration: underline;
	}

	.error-message {
		background-color: #fee2e2;
		color: #b91c1c;
		padding: 10px;
		border-radius: 8px;
		font-size: 0.9rem;
		margin-bottom: 15px;
		text-align: left;
	}

	.success-message {
		background-color: #dcfce7;
		color: #15803d;
		padding: 10px;
		border-radius: 8px;
		font-size: 0.9rem;
		margin-bottom: 15px;
		text-align: left;
	}

	.forgot-password {
		display: flex;
		justify-content: flex-end;
	}

	.forgot-password button {
		background: none;
		border: none;
		color: var(--secondary);
		font-size: 0.85rem;
		cursor: pointer;
		padding: 0;
	}

	.forgot-password button:hover {
		color: var(--cta);
		text-decoration: underline;
	}

	.small-text {
		font-size: 0.9rem;
		color: var(--secondary);
		margin-bottom: 15px;
	}

	.subtitle {
		color: #666;
		margin-bottom: 25px;
	}

	/* Dashboard */
	.dashboard-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-lg);
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: 15px;
	}

	.user-info h2 {
		margin: 0;
		font-size: 1.4rem;
		color: var(--text);
	}

	.email {
		margin: 0;
		color: var(--secondary);
		font-size: 0.9rem;
	}

	.btn-logout {
		background: transparent;
		border: 1px solid var(--border);
		padding: 8px 16px;
		border-radius: 20px;
		cursor: pointer;
		color: var(--secondary);
		transition: all 0.2s;
	}

	.btn-logout:hover {
		background: #fee2e2;
		color: #ef4444;
		border-color: #fee2e2;
	}

	/* Stats Grid */
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--spacing-md);
		margin-bottom: var(--spacing-lg);
	}

	.stat-card {
		background: white;
		padding: var(--spacing-md);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow3);
		display: flex;
		align-items: center;
		gap: 15px;
	}

	.icon-bg {
		width: 50px;
		height: 50px;
		background: #e0f2fe;
		color: #0284c7;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
	}

	.icon-bg.star {
		background: #fef9c3;
		color: #ca8a04;
	}

	.icon-bg.sponsor-icon {
		background: #f3e8ff;
		color: #9333ea;
	}

	.stat-content h3 {
		font-size: 0.9rem;
		color: var(--secondary);
		margin-bottom: 2px;
	}

	.stat-number {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text);
		margin-bottom: 5px;
	}

	.stat-number.active {
		color: #10b981;
		font-size: 1.2rem;
	}
	.stat-number.inactive {
		color: var(--secondary);
		font-size: 1.2rem;
	}
	.stat-number.pending {
		color: #f97316;
		font-size: 1.2rem;
	}

	.stat-sub {
		font-size: 0.8rem;
		color: var(--secondary);
	}

	.btn-sm {
		font-size: 0.8rem;
		color: var(--cta);
		text-decoration: none;
		font-weight: 600;
	}

	.btn-sm:hover {
		text-decoration: underline;
	}

	/* Menu List */
	.menu-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.menu-item {
		display: flex;
		align-items: center;
		background: white;
		padding: 15px 20px;
		border-radius: var(--radius-md);
		text-decoration: none;
		color: var(--text);
		box-shadow: var(--shadow3);
		transition: all 0.2s;
	}

	.menu-item:hover {
		transform: translateX(5px);
		border-left: 5px solid var(--cta);
	}

	.menu-item i:first-child {
		width: 30px;
		color: var(--cta);
		font-size: 1.2rem;
	}

	.menu-item span {
		flex: 1;
		font-weight: 500;
	}

	.menu-item .arrow {
		color: #d1d5db;
		width: auto;
	}

	@media (max-width: 600px) {
		.stats-grid {
			grid-template-columns: 1fr;
		}
		.dashboard-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 15px;
		}
		.btn-logout {
			width: 100%;
		}
	}
</style>
