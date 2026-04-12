<script>
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { auth, db } from '$lib/firebase';
	import { collection, query, orderBy, getDocs, addDoc, Timestamp } from 'firebase/firestore';
	import { onAuthStateChanged } from 'firebase/auth';

	// Icons
	import EyeIcon from '$lib/Components/icons/EyeIcon.svelte';
	import GiftIcon from '$lib/Components/icons/GiftIcon.svelte';
	import StatsChartIcon from '$lib/Components/icons/StatsChartIcon.svelte';
	import PricetagIcon from '$lib/Components/icons/PricetagIcon.svelte';
	import StarIcon from '$lib/Components/icons/StarIcon.svelte';
	import CheckCircleIcon from '$lib/Components/icons/CheckCircleIcon.svelte';
	import ArrowForwardIcon from '$lib/Components/icons/ArrowForwardIcon.svelte';
	import ShieldCheckmarkIcon from '$lib/Components/icons/ShieldCheckmarkIcon.svelte';
	import LockClosedIcon from '$lib/Components/icons/LockClosedIcon.svelte';
	import CloseCircleIcon from '$lib/Components/icons/CloseCircleIcon.svelte';
	import ReceiptIcon from '$lib/Components/icons/ReceiptIcon.svelte';
	import MailIcon from '$lib/Components/icons/MailIcon.svelte';
	import ChevronRightIcon from '$lib/Components/icons/ChevronRightIcon.svelte';
	import GlobeOutlineIcon from '$lib/Components/icons/GlobeOutlineIcon.svelte';
	import AlertCircleIcon from '$lib/Components/icons/AlertCircleIcon.svelte';

	const CF_URL = 'https://us-central1-bddjson.cloudfunctions.net/createSponsorCheckoutSession';

	let user = null;
	let loading = true;
	let isProcessing = false;
	let errorMsg = '';

	// Step 1: select plan
	let plans = [];
	let selectedPlan = null;

	// Step 2: checkout form
	let businessName = '';
	let ownerName = '';
	let email = '';
	let phone = '';
	let address = '';
	let postalCode = '';
	let city = '';
	let category = '';
	let description = '';

	const categories = [
		'Restaurant',
		'Café & Bar',
		'Boulangerie-Pâtisserie',
		'Traiteur',
		'Épicerie fine',
		'Plombier',
		'Électricien',
		'Peintre',
		'Menuisier',
		'Jardinier',
		'Mode & Vêtements',
		'Décoration',
		'Librairie',
		'Fleuriste',
		'Quincaillerie',
		'Coiffeur',
		'Esthéticienne',
		'Massage',
		'Salle de sport',
		'Garage',
		'Carrossier',
		'Avocat',
		'Comptable',
		'Agence immobilière'
	];

	onMount(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			user = currentUser;
			if (!user) {
				// Not strictly requiring auth conceptually until checkout, but doing it here
				window.location.href = '/compte?redirect=/espace-commercant/rejoindre';
			} else {
				fetchPlans();
			}
		});
		return () => unsubscribe();
	});

	async function fetchPlans() {
		try {
			const q = query(collection(db, 'SponsorPlans'), orderBy('order', 'asc'));
			const snapshot = await getDocs(q);

			plans = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data()
			}));
		} catch (error) {
			console.error('Error fetching plans:', error);
			errorMsg = "Impossible de récupérer les formules d'abonnement.";
		} finally {
			loading = false;
		}
	}

	function selectPlan(plan) {
		selectedPlan = plan;
		// Autofill email if user available
		if (user && user.email) {
			email = user.email;
		}
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function goBackToPlans() {
		selectedPlan = null;
		errorMsg = '';
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	const getCategorySection = (cat) => {
		const foodCategories = [
			'Boulangerie-Pâtisserie',
			'Traiteur',
			'Épicerie fine'
		];
		const restaurantCategories = [
			'Restaurant',
			'Café & Bar'
		];
		const servicesCategories = ['Plombier', 'Électricien', 'Peintre', 'Menuisier', 'Jardinier'];
		const retailCategories = [
			'Mode & Vêtements',
			'Décoration',
			'Librairie',
			'Fleuriste',
			'Quincaillerie'
		];
		const wellnessCategories = ['Coiffeur', 'Esthéticienne', 'Massage', 'Salle de sport'];
		const autoCategories = ['Garage', 'Carrossier'];
		const professionalCategories = ['Avocat', 'Comptable', 'Agence immobilière'];

		if (foodCategories.includes(cat)) return 'food';
		if (restaurantCategories.includes(cat)) return 'restaurant';
		if (servicesCategories.includes(cat)) return 'services';
		if (retailCategories.includes(cat)) return 'retail';
		if (wellnessCategories.includes(cat)) return 'wellness';
		if (autoCategories.includes(cat)) return 'auto';
		if (professionalCategories.includes(cat)) return 'professional';
		return 'services';
	};

	function validateForm() {
		if (!businessName.trim()) return 'Le nom du commerce est requis.';
		if (!ownerName.trim()) return 'Votre nom est requis.';
		if (!email.trim() || !email.includes('@')) return "L'email est invalide.";
		if (!phone.trim()) return 'Le téléphone est requis.';
		if (!address.trim()) return "L'adresse est requise.";
		if (!postalCode.trim()) return 'Le code postal est requis.';
		if (!city.trim()) return 'La ville est requise.';
		if (!category) return 'Veuillez sélectionner une catégorie.';
		return null; // No errors
	}

	async function handleSubmit() {
		errorMsg = '';
		const validationError = validateForm();
		if (validationError) {
			errorMsg = validationError;
			return;
		}

		if (!user) {
			errorMsg = 'Vous devez être connecté pour continuer.';
			return;
		}

		if (!selectedPlan || !selectedPlan.stripePriceId) {
			errorMsg = 'Le plan sélectionné est invalide ou expiré.';
			return;
		}

		isProcessing = true;

		try {
			// 1. Create Sponsor doc with status: pending_payment
			const now = new Date();
			const endDate = new Date(now.getTime() + (selectedPlan.duration || 30) * 24 * 60 * 60 * 1000);

			const isPremium = selectedPlan.planId === 'visibility-monthly';

			const sponsorData = {
				businessName: businessName.trim(),
				ownerName: ownerName.trim(),
				email: email.trim().toLowerCase(),
				phone: phone.trim(),

				address: address.trim(),
				postalCode: postalCode.trim(),
				city: city.trim(),

				category: category,
				sector: getCategorySection(category),
				description: description.trim() || '',

				currentPlan: {
					planId: selectedPlan.id,
					type: isPremium ? 'premium' : 'basic',
					price: selectedPlan.price,
					startDate: Timestamp.fromDate(now),
					endDate: Timestamp.fromDate(endDate),
					isActive: false, // Activated by Stripe webhook
					autoRenew: true,
					lastPaymentDate: null,
					stripeSubscriptionId: null,
					paymentFailed: false
				},

				stats: { views: 0, clicks: 0, offersShown: 0 },
				images: [],
				specialOffer: null,
				status: 'pending_payment',
				createdAt: Timestamp.fromDate(now),
				updatedAt: Timestamp.fromDate(now),
				userId: user.uid
			};

			const docRef = await addDoc(collection(db, 'Sponsors'), sponsorData);
			const sponsorDocId = docRef.id;

			// 2. Call Cloud Function to get Stripe Checkout session
			const returnUrl = window.location.origin + '/espace-commercant'; // Redirects to dashboard

			const response = await fetch(CF_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					sponsorDocId: sponsorDocId,
					userId: user.uid,
					planId: selectedPlan.id,
					stripePriceId: selectedPlan.stripePriceId,
					businessName: businessName.trim(),
					email: email.trim(),
					returnUrl: returnUrl
				})
			});

			const data = await response.json();

			if (data.error || !data.url) {
				console.error('Stripe Checkout Error:', data.error);
				errorMsg = data.error || "Impossible d'initialiser le paiement.";
				isProcessing = false;
				return;
			}

			// 3. Redirect to Stripe
			window.location.href = data.url;
		} catch (error) {
			console.error('Checkout process error:', error);
			errorMsg = 'Une erreur est survenue lors du processus. Réessaie un peu plus tard.';
			isProcessing = false;
		}
	}
</script>

<svelte:head>
	<title>{selectedPlan ? 'Finalise ton inscription' : 'Rejoins Le Carnet'} - Le Poilu</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 pb-20 pt-6">
	<main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
		{#if loading}
			<div class="flex justify-center flex-col items-center py-20">
				<div class="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
				<p class="text-gray-500 font-medium">Chargement des formules d'abonnement...</p>
			</div>
		{:else if !selectedPlan}
			<!-- STEP 1: SELECT PLAN -->
			<div in:fade>
				<a
					href="/espace-commercant"
					class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors"
				>
					<ChevronRightIcon class="h-4 w-4 mr-1 rotate-180" />
					Retour à mon espace vitrine
				</a>

				<!-- Header -->
				<div class="bg-[#FFF8F0] p-8 rounded-2xl border border-orange-100 mb-10 text-center">
					<h1 class="text-3xl md:text-4xl font-bold text-gray-900 font-poppins mb-3">
						Rejoins Le Carnet du Poilu
					</h1>
					<p class="text-lg text-gray-700 max-w-2xl mx-auto">
						Gagne en visibilité auprès de milliers d'utilisateurs locaux de l'ouest Lyonnais et
						propulse ton commerce.
					</p>
				</div>

				<!-- Benefits -->
				<div class="mb-14">
					<h2 class="text-2xl font-bold text-center text-gray-900 mb-8">
						Pourquoi rejoindre Le Carnet ?
					</h2>

					<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<div
							class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow"
						>
							<div class="bg-orange-50 text-primary p-3 rounded-full shrink-0">
								<EyeIcon class="h-6 w-6" />
							</div>
							<div>
								<h3 class="text-lg font-bold text-gray-900 mb-1">Visibilité locale ciblée</h3>
								<p class="text-gray-600">
									Touchez directement les habitants de la région qui cherchent activement tes
									services.
								</p>
							</div>
						</div>

						<div
							class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow"
						>
							<div class="bg-orange-50 text-primary p-3 rounded-full shrink-0">
								<GiftIcon class="h-6 w-6" />
							</div>
							<div>
								<h3 class="text-lg font-bold text-gray-900 mb-1">Offres exclusives</h3>
								<p class="text-gray-600">
									Propose des réductions ou avantages aux utilisateurs de l'app pour les fidéliser.
								</p>
							</div>
						</div>

						<div
							class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow"
						>
							<div class="bg-orange-50 text-primary p-3 rounded-full shrink-0">
								<StatsChartIcon class="h-6 w-6" />
							</div>
							<div>
								<h3 class="text-lg font-bold text-gray-900 mb-1">Statistiques en direct</h3>
								<p class="text-gray-600">
									Suis tes vues de profil, les clics et l'engagement global des utilisateurs.
								</p>
							</div>
						</div>

						<div
							class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow"
						>
							<div class="bg-orange-50 text-primary p-3 rounded-full shrink-0">
								<PricetagIcon class="h-6 w-6" />
							</div>
							<div>
								<h3 class="text-lg font-bold text-gray-900 mb-1">Kit vitrine inclus</h3>
								<p class="text-gray-600">
									Reçois un autocollant et une belle affiche Le Poilu pour ton établissement
									physique.
								</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Plans -->
				<div class="mb-16">
					<h2 class="text-2xl font-bold text-center text-gray-900 mb-8">
						Nos formules d'abonnement
					</h2>

					<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
						{#each plans as plan}
							{@const isPremium = plan.planId === 'visibility-monthly'}
							<div
								class={`relative bg-white rounded-2xl p-8 border-2 transition-shadow shadow-sm hover:shadow-lg flex flex-col h-full ${isPremium ? 'border-primary' : 'border-gray-200'}`}
							>
								{#if isPremium}
									<div
										class="absolute -top-4 right-6 bg-gray-900 text-yellow-400 font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md"
									>
										<StarIcon class="h-3 w-3 fill-yellow-400" />
										Recommandé
									</div>
								{/if}

								<div class="mb-6 flex-1">
									<h3
										class={`text-2xl font-bold mb-2 ${isPremium ? 'text-primary' : 'text-gray-900'}`}
									>
										{plan.name}
									</h3>
									<p class="text-gray-600 mb-6">{plan.description}</p>

									<div class="flex items-end gap-1 mb-8">
										<span class="text-4xl font-bold text-gray-900">{plan.price.toFixed(2)}€</span>
										<span class="text-gray-500 font-medium mb-1">/mois</span>
									</div>

									<div class="space-y-3">
										{#each plan.included || [] as feature}
											<div class="flex items-start gap-3">
												<CheckCircleIcon
													class={`h-5 w-5 shrink-0 ${isPremium ? 'text-primary' : 'text-green-500'}`}
												/>
												<span class="text-gray-700">{feature}</span>
											</div>
										{/each}
									</div>
								</div>

								<button
									on:click={() => selectPlan(plan)}
									class={`w-full py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors ${
										isPremium
											? 'bg-primary hover:bg-primary-dark text-white'
											: 'bg-gray-100 hover:bg-gray-200 text-gray-900'
									}`}
								>
									Choisir {plan.shortName || plan.name}
									<ArrowForwardIcon class="h-5 w-5" />
								</button>
							</div>
						{/each}
					</div>
				</div>

				<!-- Guarantees -->
				<div class="bg-green-50 rounded-2xl p-8 mb-12 border border-green-100">
					<h2
						class="text-xl font-bold text-center text-gray-900 mb-6 flex items-center justify-center gap-2"
					>
						<span>🛡️</span> Nos garanties professionnelles
					</h2>

					<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
						<div class="text-center">
							<LockClosedIcon class="h-8 w-8 text-green-600 mx-auto mb-2" />
							<p class="text-sm font-medium text-green-900">Paiement 100% sécurisé via Stripe</p>
						</div>
						<div class="text-center">
							<CloseCircleIcon class="h-8 w-8 text-green-600 mx-auto mb-2" />
							<p class="text-sm font-medium text-green-900">Sans engagement de durée</p>
						</div>
						<div class="text-center">
							<ShieldCheckmarkIcon class="h-8 w-8 text-green-600 mx-auto mb-2" />
							<p class="text-sm font-medium text-green-900">Modération qualité assurée</p>
						</div>
						<div class="text-center">
							<ReceiptIcon class="h-8 w-8 text-green-600 mx-auto mb-2" />
							<p class="text-sm font-medium text-green-900">Factures par e-mail automatiques</p>
						</div>
					</div>
				</div>

				<!-- Contact -->
				<div class="text-center">
					<h3 class="text-lg font-bold text-gray-900 mb-2">Une question avant de te lancer ?</h3>
					<p class="text-gray-600 mb-6">
						Notre équipe est là pour t'accompagner dans la numérisation de ton commerce.
					</p>
					<a
						href="/contact"
						class="inline-flex items-center gap-2 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-bold py-3 px-6 rounded-xl transition-colors"
					>
						<MailIcon class="h-5 w-5" />
						Nous contacter
					</a>
				</div>
			</div>
		{:else}
			<!-- STEP 2: CHECKOUT FORM -->
			<div in:slide>
				<button
					on:click={goBackToPlans}
					class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors"
				>
					<ChevronRightIcon class="h-4 w-4 mr-1 rotate-180" />
					Modifier mon abonnement
				</button>

				<div class="flex flex-col lg:flex-row gap-8 items-start">
					<!-- Left: Form -->
					<div class="flex-1 w-full order-2 lg:order-1">
						{#if errorMsg}
							<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-6">
								<div class="flex">
									<div class="flex-shrink-0"><AlertCircleIcon class="h-5 w-5 text-red-500" /></div>
									<div class="ml-3"><p class="text-sm text-red-700">{errorMsg}</p></div>
								</div>
							</div>
						{/if}

						<div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
							<h2 class="text-xl font-bold text-gray-900 mb-6">Informations du commerce</h2>

							<div class="space-y-5">
								<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
									<div>
										<label for="businessName" class="block text-sm font-bold text-gray-700 mb-2"
											>Nom du commerce <span class="text-red-500">*</span></label
										>
										<input
											id="businessName"
											type="text"
											bind:value={businessName}
											placeholder="Ex: La Belle Époque"
											class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
										/>
									</div>
									<div>
										<label for="ownerName" class="block text-sm font-bold text-gray-700 mb-2"
											>Nom du gérant <span class="text-red-500">*</span></label
										>
										<input
											id="ownerName"
											type="text"
											bind:value={ownerName}
											placeholder="Ex: Jean Dupont"
											class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
										/>
									</div>
								</div>

								<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
									<div>
										<label for="email" class="block text-sm font-bold text-gray-700 mb-2"
											>Email public <span class="text-red-500">*</span></label
										>
										<input
											id="email"
											type="email"
											bind:value={email}
											placeholder="contact@commerce.fr"
											class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
										/>
									</div>
									<div>
										<label for="phone" class="block text-sm font-bold text-gray-700 mb-2"
											>Téléphone public <span class="text-red-500">*</span></label
										>
										<input
											id="phone"
											type="tel"
											bind:value={phone}
											placeholder="04 78 00 00 00"
											class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
										/>
									</div>
								</div>

								<div>
									<label for="address" class="block text-sm font-bold text-gray-700 mb-2"
										>Adresse postale <span class="text-red-500">*</span></label
									>
									<input
										id="address"
										type="text"
										bind:value={address}
										placeholder="12 rue de la République"
										class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
									/>
								</div>

								<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
									<div>
										<label for="postalCode" class="block text-sm font-bold text-gray-700 mb-2"
											>Code Postal <span class="text-red-500">*</span></label
										>
										<input
											id="postalCode"
											type="text"
											bind:value={postalCode}
											placeholder="69002"
											maxlength="5"
											class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
										/>
									</div>
									<div>
										<label for="city" class="block text-sm font-bold text-gray-700 mb-2"
											>Ville <span class="text-red-500">*</span></label
										>
										<input
											id="city"
											type="text"
											bind:value={city}
											placeholder="Lyon"
											class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
										/>
									</div>
								</div>

								<div>
									<span class="block text-sm font-bold text-gray-700 mb-3"
										>Catégorie <span class="text-red-500">*</span></span
									>
									<div class="flex flex-wrap gap-2">
										{#each categories as cat}
											<button
												on:click={() => (category = cat)}
												class={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
													category === cat
														? 'bg-primary border-primary text-white'
														: 'bg-white border-gray-300 text-gray-700 hover:border-primary hover:text-primary'
												}`}
											>
												{cat}
											</button>
										{/each}
									</div>
								</div>

								<div>
									<label for="description" class="block text-sm font-bold text-gray-700 mb-2"
										>Petite présentation de ton établissement</label
									>
									<textarea
										id="description"
										bind:value={description}
										rows="3"
										placeholder="Décris ta boutique, tes spécialités, pour donner envie..."
										class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary resize-none"
									></textarea>
								</div>
							</div>
						</div>
					</div>

					<!-- Right: Sticky Order Summary -->
					<div class="w-full lg:w-96 order-1 lg:order-2 lg:sticky lg:top-8">
						<div class="bg-[#FFF8F0] border border-[#FFE8D6] rounded-2xl p-6 shadow-sm">
							<h3
								class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-[#FFE8D6] pb-4"
							>
								<PricetagIcon class="h-5 w-5 text-primary" />
								Récapitulatif
							</h3>

							<div class="space-y-3 mb-6">
								<div class="flex justify-between items-center text-gray-700">
									<span class="font-medium">Formule</span>
									<span class="font-bold">{selectedPlan.name}</span>
								</div>
								<div class="flex justify-between items-center text-gray-700">
									<span>Période</span>
									<span>{selectedPlan.duration || 30} jours</span>
								</div>
								<div class="border-t border-[#FFE8D6] pt-3 mt-3 flex justify-between items-center">
									<span class="text-lg font-bold text-gray-900">Total à payer</span>
									<span class="text-2xl font-bold text-primary"
										>{selectedPlan.price.toFixed(2)}€</span
									>
								</div>
							</div>

							<div
								class="bg-green-50 rounded-xl p-4 mb-6 border border-green-100 flex flex-col gap-3"
							>
								<div class="flex items-start gap-2">
									<GlobeOutlineIcon class="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
									<p class="text-xs text-green-800 font-medium leading-tight">
										Tu seras redirigé vers Stripe pour un paiement sécurisé 3D Secure.
									</p>
								</div>
								<div class="flex items-start gap-2">
									<ShieldCheckmarkIcon class="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
									<p class="text-xs text-green-800 font-medium leading-tight">
										Ta fiche sera modérée et publiée sous 24-48h.
									</p>
								</div>
							</div>

							<button
								on:click={handleSubmit}
								disabled={isProcessing}
								class="w-full py-4 lg:py-5 px-6 rounded-xl font-bold text-lg text-white bg-green-500 hover:bg-green-600 shadow-sm transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
							>
								{#if isProcessing}
									<div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
									<span>Redirection...</span>
								{:else}
									<LockClosedIcon class="h-5 w-5" />
									Payer {selectedPlan.price.toFixed(2)}€
								{/if}
							</button>
							<p class="text-center text-xs text-gray-500 mt-4 leading-relaxed">
								En cliquant sur "Payer", tu acceptes nos CGV et notre politique de
								confidentialité.
							</p>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</main>
</div>
