<script>
	import { auth, db } from '$lib/firebase';
	import {
		signOut,
		signInWithEmailAndPassword,
		createUserWithEmailAndPassword,
		updateProfile,
		sendPasswordResetEmail
	} from 'firebase/auth';
	import { doc, getDoc, collection, query, where, getDocs, setDoc, documentId } from 'firebase/firestore';
	import { getFavoriteSponsors } from '$lib/favorites';
	import HeartIcon from '$lib/Components/icons/HeartIcon.svelte';
	import FavoriteHeart from '$lib/Components/FavoriteHeart.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { fade, slide } from 'svelte/transition';

	// Merchant Icons Integration
	import StorefrontIcon from '$lib/Components/icons/StorefrontIcon.svelte';
	import StarIcon from '$lib/Components/icons/StarIcon.svelte';
	import EyeIcon from '$lib/Components/icons/EyeIcon.svelte';
	import CursorClickIcon from '$lib/Components/icons/CursorClickIcon.svelte';
	import GiftIcon from '$lib/Components/icons/GiftIcon.svelte';
	import EditIcon from '$lib/Components/icons/EditIcon.svelte';
	import ImageIcon from '$lib/Components/icons/ImageIcon.svelte';
	import MailIcon from '$lib/Components/icons/MailIcon.svelte';
	import ChevronRightIcon from '$lib/Components/icons/ChevronRightIcon.svelte';
	import AlertCircleIcon from '$lib/Components/icons/AlertCircleIcon.svelte';

	let user = null;
	let userData = null;
	let sponsorData = null;
	let loading = true;
	let favoriteSponsorsData = [];
	let loadingFavorites = false;
	let activeTab = 'merchant'; // 'merchant' or 'favorites'

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
				sponsorData = { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
			}

			// 3. Fetch Favorites
			await fetchFavoriteSponsorsData(uid);
		} catch (error) {
		}
	}

	async function fetchFavoriteSponsorsData(uid) {
		loadingFavorites = true;
		try {
			const ids = await getFavoriteSponsors(uid);
			if (ids.length > 0) {
				const chunks = [];
				for (let i = 0; i < ids.length; i += 30) {
					chunks.push(ids.slice(i, i + 30));
				}
				let allSponsors = [];
				for (const chunk of chunks) {
					const q = query(collection(db, 'Sponsors'), where(documentId(), 'in', chunk));
					const snap = await getDocs(q);
					allSponsors = [...allSponsors, ...snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))];
				}
				favoriteSponsorsData = allSponsors;
			} else {
				favoriteSponsorsData = [];
			}
		} catch (error) {
			console.error('Error fetching favorite sponsors:', error);
		} finally {
			loadingFavorites = false;
		}
	}

	function getStatusInfo(status) {
		switch (status) {
			case 'pending':
				return { label: 'En attente de modération', color: 'pending' };
			case 'approved':
				return { label: 'Fiche active', color: 'active' };
			case 'rejected':
				return { label: 'Fiche rejetée', color: 'error' };
			case 'expired':
				return { label: 'Abonnement expiré', color: 'error' };
			default:
				return { label: status || 'Inconnu', color: 'default' };
		}
	}

	$: statusInfo = sponsorData ? getStatusInfo(sponsorData.status) : null;
	$: isPremium = sponsorData?.currentPlan?.type === 'premium';
	$: isMerchantActive = sponsorData?.currentPlan?.isActive;
	$: isSponsorExpired = sponsorData?.status === 'expired' || (sponsorData && !isMerchantActive);

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
				}, { merge: true });
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
				<p class="subtitle">Connecte-toi pour gérer tes annonces et ton espace.</p>

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
							Entre ton email pour recevoir un lien de réinitialisation. (Pense à vérifier les
							spams de ta boîte mail)
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
								<input type="text" placeholder="Ton Nom" bind:value={name} required />
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

				{#if !sponsorData}
					<div class="stats-grid">
						<!-- Only show simple stats for standard users -->
						<div class="stat-card">
							<div class="icon-bg">
								<i class="fa-solid fa-calendar-plus"></i>
							</div>
							<div class="stat-content">
								<h3>Crédits Agenda</h3>
								<p class="stat-number">
									{userData?.subscription?.credits || 0}
								</p>
								<a href="/acheter-plan?plan=pack10" class="btn-sm">Recharger</a>
							</div>
						</div>

						<div class="stat-card">
							<div class="icon-bg star">
								<i class="fa-solid fa-bolt"></i>
							</div>
							<div class="stat-content">
								<h3>Pass Agenda</h3>
								{#if userData?.subscription?.planId === 'unlimited30' && userData.subscription.isActive}
									<p class="stat-number active">Illimité</p>
								{:else}
									<p class="stat-number inactive">Aucun</p>
									<a href="/acheter-plan?plan=unlimited" class="btn-sm">S'abonner</a>
								{/if}
							</div>
						</div>
					</div>
				{/if}



				<div class="dashboard-content" in:fade>
					<div class="tab-content" in:fade>
						{#if sponsorData}
							<div class="merchant-dashboard-section" in:fade>
								<!-- VITRINE SECTION -->
								<section class="management-box pro-box">
									<header class="box-header">
										<div class="box-header-main">
											<div class="header-text">
												<span class="box-pill pro-pill">ESPACE PRO</span>
												<h2>{sponsorData.businessName}</h2>
												<div class="header-meta">
													<span class="status-tag {statusInfo.color}">{statusInfo.label}</span>
													<span class="meta-sep">•</span>
													<span class="plan-tag">{sponsorData.currentPlan?.name || 'Sponsor'}</span>
												</div>
											</div>
											{#if isPremium}
												<div class="premium-badge">
													<StarIcon class="star-icon" />
													<span>PREMIUM</span>
												</div>
											{/if}
										</div>
									</header>

									<div class="box-content">
										<div class="stats-mini-grid">
											<div class="stat-mini-card">
												<div class="mini-icon text-primary"><EyeIcon /></div>
												<div class="mini-data">
													<span class="value">{sponsorData.stats?.views || 0}</span>
													<span class="label">Vues</span>
												</div>
											</div>
											<div class="stat-mini-card">
												<div class="mini-icon text-green"><CursorClickIcon /></div>
												<div class="mini-data">
													<span class="value">{sponsorData.stats?.clicks || 0}</span>
													<span class="label">Clics</span>
												</div>
											</div>
											<div class="stat-mini-card">
												<div class="mini-icon text-orange"><GiftIcon /></div>
												<div class="mini-data">
													<span class="value">{sponsorData.stats?.offersShown || 0}</span>
													<span class="label">Offres</span>
												</div>
											</div>
										</div>

										{#if sponsorData.status === 'rejected'}
											<div class="alert-box error">
												<div class="alert-icon"><AlertCircleIcon /></div>
												<div class="alert-content">
													<h4>Fiche refusée</h4>
													<p>{sponsorData.rejectionReason || 'Contactez-nous pour plus de détails.'}</p>
												</div>
											</div>
										{/if}

										<div class="pro-actions-grid">
											<a href="/espace-commercant/modifier" class="pro-action-card">
												<div class="card-icon edit"><EditIcon /></div>
												<div class="card-text">
													<h4>Modifier ma fiche</h4>
													<p>Infos, adresse, horaires...</p>
												</div>
												<ChevronRightIcon class="chevron" />
											</a>

											<a href="/espace-commercant/offres" class="pro-action-card">
												<div class="card-icon offer"><GiftIcon /></div>
												<div class="card-text">
													<h4>Mon Offre</h4>
													<p>{sponsorData.specialOffer?.isActive ? 'Offre active' : 'Créer un bon plan'}</p>
												</div>
												<ChevronRightIcon class="chevron" />
											</a>

											<a href="/espace-commercant/photos" class="pro-action-card">
												<div class="card-icon photo"><ImageIcon /></div>
												<div class="card-text">
													<h4>Mes Photos</h4>
													<p>{sponsorData.images?.length || 0} / 7 photos</p>
												</div>
												<ChevronRightIcon class="chevron" />
											</a>

											{#if sponsorData.status === 'approved'}
												<a href={`/carnet/${sponsorData.id}`} target="_blank" class="pro-action-card preview">
													<div class="card-icon preview"><EyeIcon /></div>
													<div class="card-text">
														<h4>Voir ma vitrine</h4>
														<p>Aperçu public</p>
													</div>
													<ChevronRightIcon class="chevron" />
												</a>
											{/if}
										</div>
									</div>
								</section>

								<!-- AGENDA SECTION -->
								<section class="management-box agenda-box">
									<header class="box-header">
										<div class="header-text">
											<span class="box-pill agenda-pill">PUBLICATION</span>
											<h2>Agenda & Événements</h2>
											<p class="box-subtitle">Gère tes annonces et ta visibilité locale</p>
										</div>
										
										<div class="header-stats">
											<div class="h-stat">
												<span class="hs-label">Crédits</span>
												<span class="hs-value">{userData?.subscription?.credits || 0}</span>
											</div>
											<div class="h-stat">
												<span class="hs-label">Pass</span>
												<span class="hs-value {userData?.subscription?.isActive ? 'active' : ''}">
													{userData?.subscription?.isActive ? 'ACTIF' : 'AUCUN'}
												</span>
											</div>
										</div>
									</header>

									<div class="box-content">
										<div class="pro-actions-grid">
											<a
												href={userData?.subscription?.credits > 0 ? '/publier?plan=credit' : '/Tarifs'}
												class="pro-action-card highlight"
											>
												<div class="card-icon publish"><i class="fa-solid fa-plus-circle"></i></div>
												<div class="card-text">
													<h4>Publier un événement</h4>
													<p>Utiliser un crédit (Agenda)</p>
												</div>
												<ChevronRightIcon class="chevron" />
											</a>
											
											<a href="/acheter-plan" class="pro-action-card">
												<div class="card-icon shop"><i class="fa-solid fa-cart-shopping"></i></div>
												<div class="card-text">
													<h4>Boutique crédits</h4>
													<p>Recharger mon compte</p>
												</div>
												<ChevronRightIcon class="chevron" />
											</a>
										</div>
									</div>
								</section>

								<div class="section-divider bottom-spacing">
									<span>FIN DE L'ESPACE DE GESTION</span>
								</div>
							</div>
						{:else}
							<!-- Standard User / Non-Merchant CTA -->
							<div class="become-pro-cta" in:fade>
								<div class="pro-cta-card">
									<div class="pro-badge">ESPACE PRO</div>
									<div class="cta-inner">
										<div class="cta-text">
											<h3>Booste ton commerce local</h3>
											<p>Rejoins Le Carnet et propose des offres exclusives à la tribu du Poilu.</p>
										</div>
										<a href="/carnet/rejoindre" class="btn-cta-pro">
											En savoir plus <i class="fa-solid fa-arrow-right"></i>
										</a>
									</div>
								</div>
							</div>
						{/if}

						<section class="management-box favorites-box">
							<header class="box-header">
								<div class="header-text">
									<span class="box-pill fav-pill">MES FAVORIS</span>
									<h2>Mes Vitrines locales</h2>
									<p class="box-subtitle">Tes commerces coups de cœur</p>
								</div>
							</header>

							<div class="box-content">
								{#if loadingFavorites}
									<div class="loading-mini">
										<div class="spinner"></div>
									</div>
								{:else if favoriteSponsorsData.length === 0}
									<div class="empty-favorites">
										<div class="empty-icon-box">
											<HeartIcon size={48} />
										</div>
										<h4>Aucun favori</h4>
										<p>Ajoute des vitrines à tes favoris pour les retrouver ici.</p>
										<a href="/carnet" class="btn-primary mini-btn">Explorer le Carnet</a>
									</div>
								{:else}
									<div class="favorites-grid">
										{#each favoriteSponsorsData as fav}
											<div class="fav-card">
												<a href="/carnet/{fav.id}" class="fav-img-link">
													{#if fav.images && fav.images.length > 0}
														<img src={fav.images[0]} alt={fav.businessName} />
													{:else}
														<div class="img-placeholder">
															<i class="fa-solid fa-store"></i>
														</div>
													{/if}
												</a>
												<div class="fav-info">
													<div class="fav-top">
														<span class="fav-cat">{fav.category || 'Commerce'}</span>
														<FavoriteHeart 
															sponsorId={fav.id} 
															isFavorite={true} 
															size={16} 
														/>
													</div>
													<h4>{fav.businessName}</h4>
													<p>{fav.city}</p>
													<a href="/carnet/{fav.id}" class="view-link">Voir la fiche</a>
												</div>
											</div>
										{/each}
									</div>
								{/if}
							</div>
						</section>

						<div class="apps-promo-card">
							<div class="promo-content">
								<div class="promo-text">
									<h4>Tes favoris partout</h4>
									<p>Retrouve tes Vitrines et ton Agenda favoris sur l'application mobile Le Poilu.</p>
								</div>
								<div class="promo-links">
									<a href="/Telecharger" class="btn-secondary small">Télécharger l'app</a>
								</div>
							</div>
						</div>
					</div>
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
	/* Tabs */
	.account-tabs {
		display: flex;
		gap: 10px;
		margin-bottom: 2rem;
		border-bottom: 1px solid var(--border);
		padding-bottom: 10px;
	}

	.tab-btn {
		background: none;
		border: none;
		padding: 10px 20px;
		font-size: 0.9rem;
		font-weight: 700;
		color: var(--secondary);
		cursor: pointer;
		border-radius: 50px;
		transition: all 0.2s;
	}

	.tab-btn.active {
		background: var(--cta);
		color: white;
	}

	.tab-btn:hover:not(.active) {
		background: #f1f5f9;
		color: var(--text);
	}

	/* Favorites Section */
	.favorites-view {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	/* .favorites-header h3 {
		font-size: 1.5rem;
		font-weight: 800;
		color: var(--text);
		margin-bottom: 5px;
	}

	.favorites-header p {
		color: var(--secondary);
		font-size: 0.9rem;
	} */

	.favorites-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 1.5rem;
	}

	.fav-card {
		background: white;
		border-radius: var(--radius-md);
		overflow: hidden;
		box-shadow: var(--shadow);
		border: 1px solid var(--border);
		transition: transform 0.2s;
	}

	.fav-card:hover { transform: translateY(-3px); }

	.fav-img-link {
		display: block;
		height: 140px;
		background: #f8fafc;
	}

	.fav-img-link img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.img-placeholder {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #cbd5e1;
		font-size: 2rem;
	}

	.fav-info {
		padding: 15px;
	}

	.fav-top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 8px;
	}

	.fav-cat {
		font-size: 0.65rem;
		font-weight: 800;
		color: var(--cta);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.fav-info h4 {
		font-size: 1rem;
		font-weight: 700;
		margin-bottom: 4px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.fav-info p {
		font-size: 0.8rem;
		color: var(--secondary);
		margin-bottom: 12px;
	}

	.view-link {
		font-size: 0.8rem;
		font-weight: 700;
		color: var(--cta);
		text-decoration: none;
	}

	.empty-favorites {
		text-align: center;
		padding: 3rem;
		background: white;
		border-radius: var(--radius-lg);
		border: 2px dashed var(--border);
	}

	.empty-icon-box {
		color: #e2e8f0;
		margin-bottom: 1.5rem;
	}

	.empty-favorites h4 { font-size: 1.25rem; font-weight: 800; margin-bottom: 10px; }
	.empty-favorites p { color: var(--secondary); margin-bottom: 2rem; }

	.btn-primary.mini { display: inline-block; width: auto; padding: 10px 25px; }

	.apps-promo-card {
		background: #fdf2f8;
		border-radius: var(--radius-md);
		padding: 1.5rem;
		border: 1px solid #fbcfe8;
	}

	.promo-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1.5rem;
	}

	.promo-text h4 { color: #be123c; font-weight: 800; margin-bottom: 5px; }
	.promo-text p { color: #9d174d; font-size: 0.85rem; }

	.loading-mini { padding: 2rem; text-align: center; }

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

	.header-meta {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-top: 6px;
	}

	.status-tag {
		font-size: 0.8rem;
		font-weight: 700;
	}

	.status-tag.active { color: #10b981; }
	.status-tag.pending { color: #f97316; }
	.status-tag.error { color: #ef4444; }

	.meta-sep { color: var(--border); }

	.plan-tag {
		font-size: 0.8rem;
		color: var(--secondary);
		font-weight: 600;
	}

	.box-header-main {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
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

	/* Standardized Management Box UI */
	.management-box {
		background: white;
		border-radius: var(--radius-lg);
		border: 1px solid var(--border);
		overflow: hidden;
		box-shadow: var(--shadow);
		margin-bottom: 2rem;
	}

	.box-header {
		padding: 1.8rem 2rem;
		border-bottom: 1px solid rgba(0,0,0,0.05);
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		color: white;
	}

	/* Bolder, distinct identities */
	.pro-box .box-header { 
		background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); 
		border-left: 6px solid #f97316;
	}
	.agenda-box .box-header { 
		background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); 
		border-left: 6px solid #bae6fd;
	}
	.favorites-box .box-header { 
		background: linear-gradient(135deg, #be123c 0%, #9f1239 100%); 
		border-left: 6px solid #fecdd3;
	}



	.box-pill {
		font-size: 0.65rem;
		font-weight: 800;
		padding: 3px 10px;
		border-radius: 50px;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		display: inline-block;
		margin-bottom: 8px;
	}

	.pro-pill { background: #f97316; color: white; }
	.agenda-pill { background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); }
	.fav-pill { background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); }

	.box-header h2 {
		font-size: 1.4rem;
		font-weight: 700;
		color: #ffffff;
		margin: 0;
	}

	.box-subtitle {
		font-size: 0.85rem;
		margin-top: 4px;
		font-weight: 500;
	}

	.pro-box .box-subtitle { color: #cbd5e1; } /* Lighter gray for dark bg */
	.agenda-box .box-subtitle { color: #e0f2fe; } /* Very light blue */
	.favorites-box .box-subtitle { color: #fff1f2; } /* Very light pink */






	.box-content {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.premium-badge {
		background: var(--text);
		color: #facc15;
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 6px 12px;
		border-radius: 50px;
		font-size: 0.75rem;
		font-weight: 900;
	}

	.header-stats {
		display: flex;
		gap: 1.5rem;
	}

	.h-stat {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.hs-label {
		font-size: 0.65rem;
		color: rgba(255,255,255,0.7);
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.hs-value {
		font-size: 1.2rem;
		font-weight: 900;
		color: #ffffff;
	}

	.hs-value.active { color: #4ade80; }

	.card-icon.publish { background: #f0f9ff; color: #0284c7; }
	.card-icon.shop { background: #f8fafc; color: #64748b; }

	.pro-action-card.highlight {
		border: 1px solid #bae6fd;
		background: #f0f9ff;
	}

	.pro-action-card.highlight:hover {
		border-color: #0284c7;
	}

	.plan-badge {
		background: #f1f5f9;
		color: var(--secondary);
		padding: 2px 10px;
		border-radius: 50px;
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
	}

	.event-stats-quick {
		display: flex;
		gap: 1.5rem;
	}

	.quick-stat {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.qs-label {
		font-size: 0.65rem;
		color: rgba(2, 132, 199, 0.6);
		font-weight: 700;
		text-transform: uppercase;
	}

	.qs-value {
		font-size: 1.25rem;
		font-weight: 900;
		color: #0284c7;
	}

	.qs-value.active {
		color: #10b981;
	}

	.events-hero {
		background: #f0f9ff;
		border: 1px solid #e0f2fe;
		padding: 2rem;
		border-radius: var(--radius-lg);
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		overflow: hidden;
		margin-bottom: 1.5rem;
	}

	.events-hero::before {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: radial-gradient(circle, rgba(2, 132, 199, 0.08) 0%, rgba(255, 255, 255, 0) 70%);
		pointer-events: none;
	}

	/* .events-hero h2 {
		font-size: 1.75rem;
		font-weight: 900;
		color: var(--text);
		margin: 0;
	} */

	.menu-item.highlight-item {
		border: 1px solid var(--border);
		background: white;
		box-shadow: var(--shadow3);
	}

	/* .menu-text h4 {
		font-size: 1rem;
		font-weight: 700;
		color: var(--text);
	}

	.menu-text p {
		font-size: 0.8rem;
		color: var(--secondary);
		margin-top: 2px;
	} */


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

	/* .menu-item i:first-child {
		width: 30px;
		color: var(--cta);
		font-size: 1.2rem;
	}

	.menu-item span {
		flex: 1;
		font-weight: 500;
	} */
/* 
	.menu-item .arrow {
		color: #d1d5db;
		width: auto;
	} */

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

	/* --- Unified Merchant Integration Styles --- */
	.section-divider {
		display: flex;
		align-items: center;
		margin: 2rem 0 1.5rem;
		color: var(--secondary);
		font-size: 0.75rem;
		font-weight: 800;
		letter-spacing: 0.1em;
	}

	.section-divider::after {
		content: '';
		flex: 1;
		height: 1px;
		background: var(--border);
		margin-left: 1rem;
		opacity: 0.5;
	}

	.merchant-dashboard-section {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.merchant-hero {
		background: #fff8f0;
		border: 1px solid #ffe8d6;
		padding: 2rem;
		border-radius: var(--radius-lg);
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		overflow: hidden;
	}

	.merchant-hero::before {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: radial-gradient(circle, rgba(255, 183, 158, 0.15) 0%, rgba(255, 255, 255, 0) 70%);
		pointer-events: none;
	}

	/* .merchant-hero h2 {
		font-size: 1.75rem;
		font-weight: 900;
		color: var(--text);
		margin: 0;
	} */

	.category-tag {
		color: var(--cta);
		font-weight: 700;
		font-size: 0.9rem;
		margin-top: 5px;
	}

	.premium-tag {
		background: var(--text);
		color: #facc15;
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 6px 12px;
		border-radius: 50px;
		font-size: 0.75rem;
		font-weight: 900;
	}

	.stats-mini-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}

	.stat-mini-card {
		background: white;
		padding: 1.25rem;
		border-radius: var(--radius-md);
		border: 1px solid var(--border);
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.mini-icon {
		width: 40px;
		height: 40px;
		background: var(--lightBg);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	:global(.mini-icon svg) {
		width: 1.25rem;
		height: 1.25rem;
	}

	.mini-data {
		display: flex;
		flex-direction: column;
	}

	.mini-data .value {
		font-size: 1.25rem;
		font-weight: 800;
	}

	.mini-data .label {
		font-size: 0.75rem;
		color: var(--secondary);
		text-transform: uppercase;
		font-weight: 700;
	}

	.pro-actions-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1rem;
	}

	.pro-action-card {
		background: white;
		padding: 1.25rem;
		border-radius: var(--radius-md);
		text-decoration: none;
		display: flex;
		align-items: center;
		gap: 1.25rem;
		border: 1px solid var(--border);
		transition: all 0.2s;
	}

	.pro-action-card:hover {
		transform: translateY(-3px);
		box-shadow: var(--shadow3);
		border-color: var(--cta);
	}

	.card-icon {
		width: 48px;
		height: 48px;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	:global(.card-icon svg) { width: 1.5rem; height: 1.5rem; }

	.card-icon.edit { background: #e0f2fe; color: #0284c7; }
	.card-icon.offer { background: #fff7ed; color: #ea580c; }
	.card-icon.photo { background: #fdf2f8; color: #db2777; }
	.card-icon.preview { background: #f0fdf4; color: #16a34a; }

	.card-text { flex: 1; }
	.card-text h4 { font-size: 1rem; font-weight: 700; color: var(--text); }
	.card-text p { font-size: 0.85rem; color: var(--secondary); margin-top: 2px; }

	.alert-box {
		padding: 1rem;
		border-radius: var(--radius-md);
		display: flex;
		gap: 1rem;
		background: #fee2e2;
		border: 1px solid #fecaca;
		color: #991b1b;
	}

	/* Become Pro CTA Section */
	.pro-cta-card {
		background: linear-gradient(135deg, #073B4C 0%, #11647d 100%);
		padding: 2.5rem;
		border-radius: var(--radius-lg);
		color: white;
		position: relative;
		overflow: hidden;
		box-shadow: 0 15px 35px rgba(7, 59, 76, 0.2);
	}

	.pro-badge {
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
		background: rgba(255, 255, 255, 0.15);
		padding: 0.4rem 1rem;
		border-radius: 50px;
		font-size: 0.7rem;
		font-weight: 900;
		letter-spacing: 0.1em;
	}

	.cta-inner h3 { color: white; font-size: 1.5rem; font-weight: 800; margin-bottom: 0.75rem; }
	.cta-inner p { color: rgba(255, 255, 255, 0.8); margin-bottom: 1.5rem; max-width: 450px; }

	.btn-cta-pro {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		background: white;
		color: #073B4C;
		padding: 0.8rem 1.8rem;
		border-radius: 50px;
		font-weight: 800;
		text-decoration: none;
		transition: all 0.2s;
	}

	.btn-cta-pro:hover {
		transform: scale(1.05);
		background: #ffb79e;
	}

	/* Status Colors */
	.stat-number.active { color: #10b981; }
	.stat-number.pending { color: #f97316; }
	.stat-number.error { color: #ef4444; }

	/* --- New Account Tabs & Favorites Styles --- */
	.account-tabs {
		display: flex;
		gap: 12px;
		margin-bottom: 2rem;
		border-bottom: 1px solid var(--border);
		padding-bottom: 15px;
		margin-top: 2.5rem;
	}

	.tab-btn {
		background: #f1f5f9;
		border: none;
		padding: 10px 25px;
		font-size: 0.9rem;
		font-weight: 700;
		color: var(--secondary);
		cursor: pointer;
		border-radius: 50px;
		transition: all 0.2s;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.tab-btn.active {
		background: var(--cta);
		color: white;
		box-shadow: 0 4px 12px rgba(230, 57, 70, 0.2);
	}

	.tab-btn:hover:not(.active) {
		background: #e2e8f0;
		color: var(--text);
	}

	/* Favorites Section */
	.favorites-view {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	/* .favorites-header h3 {
		font-size: 1.5rem;
		font-weight: 800;
		color: var(--text);
		margin-bottom: 5px;
	}

	.favorites-header p {
		color: var(--secondary);
		font-size: 0.9rem;
	} */

	.favorites-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 1.5rem;
	}

	.fav-card {
		background: white;
		border-radius: var(--radius-md);
		overflow: hidden;
		box-shadow: var(--shadow3);
		border: 1px solid var(--border);
		transition: transform 0.2s;
		display: flex;
		flex-direction: column;
	}

	.fav-card:hover { 
		transform: translateY(-5px);
		box-shadow: var(--shadow);
	}

	.fav-img-link {
		display: block;
		height: 140px;
		background: #f8fafc;
		overflow: hidden;
	}

	.fav-img-link img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s;
	}

	.fav-card:hover .fav-img-link img {
		transform: scale(1.05);
	}

	.img-placeholder {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #cbd5e1;
		font-size: 2rem;
		background: #f1f5f9;
	}

	.fav-info {
		padding: 15px;
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.fav-top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 8px;
	}

	.fav-cat {
		font-size: 0.65rem;
		font-weight: 800;
		color: var(--cta);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.fav-info h4 {
		font-size: 1rem;
		font-weight: 700;
		margin-bottom: 4px;
		color: var(--text);
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		line-clamp: 1; 
		-webkit-box-orient: vertical;
	}

	.fav-info p {
		font-size: 0.8rem;
		color: var(--secondary);
		margin-bottom: 12px;
	}

	.view-link {
		font-size: 0.8rem;
		font-weight: 700;
		color: var(--cta);
		text-decoration: none;
		margin-top: auto;
		display: inline-block;
	}

	.view-link:hover {
		text-decoration: underline;
	}

	.empty-favorites {
		text-align: center;
		padding: 4rem 2rem;
		background: white;
		border-radius: var(--radius-lg);
		border: 2px dashed var(--border);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.empty-icon-box {
		color: #e2e8f0;
		margin-bottom: 1.5rem;
		background: #f8fafc;
		width: 100px;
		height: 100px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.empty-favorites h4 { font-size: 1.25rem; font-weight: 800; margin-bottom: 10px; }
	.empty-favorites p { color: var(--secondary); margin-bottom: 2rem; max-width: 300px; }

	.btn-primary.mini-btn { 
		display: inline-block; 
		width: auto; 
		padding: 12px 30px; 
		background: var(--cta);
		color: white;
		border-radius: 50px;
		text-decoration: none;
		font-weight: 700;
	}

	.apps-promo-card {
		background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
		border-radius: var(--radius-md);
		padding: 2rem;
		border: 1px solid #fbcfe8;
		margin-top: 1rem;
	}

	.promo-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 2rem;
	}

	.promo-text h4 { color: #be123c; font-weight: 800; margin-bottom: 8px; font-size: 1.1rem; }
	.promo-text p { color: #9d174d; font-size: 0.9rem; line-height: 1.5; }

	.btn-secondary.small {
		background: white;
		color: #be123c;
		padding: 10px 20px;
		border-radius: 50px;
		font-weight: 700;
		border: 1px solid #f9a8d4;
		text-decoration: none;
		font-size: 0.85rem;
		white-space: nowrap;
	}

	.loading-mini { 
		padding: 4rem; 
		display: flex; 
		justify-content: center; 
		align-items: center; 
	}

	.spinner {
		width: 30px;
		height: 30px;
		border: 3px solid #f3f3f3;
		border-top: 3px solid var(--cta);
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@media (max-width: 600px) {
		.promo-content { flex-direction: column; text-align: center; }
		.favorites-grid { grid-template-columns: 1fr; }
	}
</style>
