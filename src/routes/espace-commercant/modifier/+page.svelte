<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { auth, db } from '$lib/firebase';
	import { collection, query, where, getDocs, doc, updateDoc, Timestamp } from 'firebase/firestore';
	import { onAuthStateChanged } from 'firebase/auth';

	// Icons
	import InformationCircleIcon from '$lib/Components/icons/InformationCircleIcon.svelte';
	import CheckCircleIcon from '$lib/Components/icons/CheckCircleIcon.svelte';
	import AlertCircleIcon from '$lib/Components/icons/AlertCircleIcon.svelte';
	import ChevronRightIcon from '$lib/Components/icons/ChevronRightIcon.svelte';
	import CopyIcon from '$lib/Components/icons/CopyIcon.svelte';
	import EditIcon from '$lib/Components/icons/EditIcon.svelte';

	let user = null;
	let sponsor = null;
	let loading = true;
	let isSaving = false;
	let errorMsg = '';
	let successMsg = '';

	// Form data
	let businessName = '';
	let category = '';
	let address = '';
	let city = '';
	let postalCode = '';

	let description = '';
	let phone = '';
	let email = '';
	let website = '';

	// Horaires
	let hasHours = false;
	let monday = '9h-18h';
	let tuesday = '9h-18h';
	let wednesday = '9h-18h';
	let thursday = '9h-18h';
	let friday = '9h-18h';
	let saturday = '9h-14h';
	let sunday = 'Fermé';

	$: isPremium = sponsor?.currentPlan?.type === 'premium';

	onMount(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			user = currentUser;
			if (user) {
				fetchSponsorData(user.uid);
			} else {
				window.location.href = '/login?redirect=/espace-commercant/modifier';
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
				window.location.href = '/espace-commercant';
				return;
			}

			sponsor = {
				id: snapshot.docs[0].id,
				...snapshot.docs[0].data()
			};

			// Fixed fields
			businessName = sponsor.businessName || '';
			category = sponsor.category || '';
			address = sponsor.address || '';
			city = sponsor.city || '';
			postalCode = sponsor.postalCode || '';

			// Editable fields
			description = sponsor.description || '';
			phone = sponsor.phone || '';
			email = sponsor.email || '';
			website = sponsor.website || '';

			// Hours
			if (sponsor.openingHours) {
				hasHours = true;
				monday = sponsor.openingHours.monday || '9h-18h';
				tuesday = sponsor.openingHours.tuesday || '9h-18h';
				wednesday = sponsor.openingHours.wednesday || '9h-18h';
				thursday = sponsor.openingHours.thursday || '9h-18h';
				friday = sponsor.openingHours.friday || '9h-18h';
				saturday = sponsor.openingHours.saturday || '9h-14h';
				sunday = sponsor.openingHours.sunday || 'Fermé';
			} else {
				hasHours = false;
			}
		} catch (error) {
			console.error('Error fetching sponsor:', error);
			errorMsg = 'Impossible de charger vos données.';
		} finally {
			loading = false;
		}
	}

	async function handleSave() {
		errorMsg = '';
		successMsg = '';

		// Validation
		if (!description.trim()) {
			errorMsg = 'La description est requise.';
			return;
		}
		if (!phone.trim()) {
			errorMsg = 'Le téléphone est requis.';
			return;
		}
		if (!email.trim() || !email.includes('@')) {
			errorMsg = 'Email invalide.';
			return;
		}
		if (isPremium && website.trim() && !website.startsWith('http')) {
			errorMsg = 'Le site web doit commencer par http:// ou https://';
			return;
		}

		isSaving = true;

		try {
			const updateData = {
				description: description.trim(),
				phone: phone.trim(),
				email: email.trim().toLowerCase(),
				updatedAt: Timestamp.now()
			};

			if (isPremium) {
				updateData.website = website.trim() || null;
			}

			if (hasHours) {
				updateData.openingHours = {
					monday: monday.trim(),
					tuesday: tuesday.trim(),
					wednesday: wednesday.trim(),
					thursday: thursday.trim(),
					friday: friday.trim(),
					saturday: saturday.trim(),
					sunday: sunday.trim()
				};
			} else {
				updateData.openingHours = null;
			}

			await updateDoc(doc(db, 'Sponsors', sponsor.id), updateData);

			successMsg = 'Vos modifications ont été enregistrées avec succès.';
			setTimeout(() => {
				successMsg = '';
			}, 4000);
		} catch (error) {
			console.error('Error saving profile:', error);
			errorMsg = 'Impossible de sauvegarder. Veuillez réessayer.';
		} finally {
			isSaving = false;
		}
	}

	function copyToAllFields() {
		tuesday = monday;
		wednesday = monday;
		thursday = monday;
		friday = monday;
	}
</script>

<svelte:head>
	<title>Modifier mes informations - Le Poilu</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 pb-20 pt-6">
	<main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Navigation / Back Button -->
		<a
			href="/espace-commercant"
			class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors"
		>
			<ChevronRightIcon class="h-4 w-4 mr-1 rotate-180" />
			Retour à l'espace commerçant
		</a>

		<div class="mb-8">
			<h1 class="text-3xl font-bold text-gray-900 font-poppins">Modifier ma fiche</h1>
			<p class="mt-2 text-gray-600">
				Mettez à jour les informations de votre vitrine visible par les utilisateurs du Poilu.
			</p>
		</div>

		{#if loading}
			<div class="flex justify-center py-12">
				<div class="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
			</div>
		{:else if sponsor}
			<div class="space-y-8" in:fade>
				<!-- Alerts -->
				{#if errorMsg}
					<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
						<div class="flex">
							<div class="flex-shrink-0"><AlertCircleIcon class="h-5 w-5 text-red-500" /></div>
							<div class="ml-3"><p class="text-sm text-red-700">{errorMsg}</p></div>
						</div>
					</div>
				{/if}

				{#if successMsg}
					<div class="bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
						<div class="flex">
							<div class="flex-shrink-0"><CheckCircleIcon class="h-5 w-5 text-green-500" /></div>
							<div class="ml-3"><p class="text-sm text-green-700">{successMsg}</p></div>
						</div>
					</div>
				{/if}

				<!-- Informations Fixes -->
				<div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
					<h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
						<span>📍</span> Informations fixes
					</h2>

					<div class="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-4 mb-6">
						<div class="text-blue-500 mt-0.5"><InformationCircleIcon class="h-5 w-5" /></div>
						<p class="text-sm text-blue-800">
							Le nom, l'adresse et la catégorie ne peuvent être modifiés directement pour des
							raisons de validation.
							<a href="/contact" class="font-bold underline hover:text-blue-900">Contactez-nous</a> en
							cas de besoin.
						</p>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
							<span class="text-xs font-bold text-gray-500 uppercase tracking-wider"
								>Nom du commerce</span
							>
							<p class="text-gray-900 font-medium mt-1">{businessName}</p>
						</div>
						<div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
							<span class="text-xs font-bold text-gray-500 uppercase tracking-wider">Catégorie</span
							>
							<p class="text-gray-900 font-medium mt-1">{category}</p>
						</div>
						<div class="bg-gray-50 p-4 rounded-xl border border-gray-100 md:col-span-2">
							<span class="text-xs font-bold text-gray-500 uppercase tracking-wider"
								>Adresse complète</span
							>
							<p class="text-gray-900 font-medium mt-1">{address}, {postalCode} {city}</p>
						</div>
					</div>
				</div>

				<!-- Description -->
				<div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
					<h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
						<span>📝</span> Présentation
					</h2>

					<div>
						<label for="description" class="block text-sm font-bold text-gray-700 mb-2"
							>Décrivez votre activité <span class="text-red-500">*</span></label
						>
						<textarea
							id="description"
							bind:value={description}
							maxlength="300"
							rows="5"
							placeholder="Vos spécialités, l'ambiance de votre commerce, ce qui vous rend unique..."
							class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-shadow resize-none"
						></textarea>
						<div class="flex justify-between items-center mt-2">
							<p class="text-xs text-gray-500 italic">💡 Soyez concis et percutant</p>
							<span class="text-xs font-medium text-gray-400">{description.length}/300</span>
						</div>
					</div>
				</div>

				<!-- Coordonnées -->
				<div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
					<h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
						<span>📞</span> Coordonnées
					</h2>

					<div class="space-y-5">
						<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
							<div>
								<label for="phone" class="block text-sm font-bold text-gray-700 mb-2"
									>Téléphone <span class="text-red-500">*</span></label
								>
								<input
									type="tel"
									id="phone"
									bind:value={phone}
									placeholder="Ex: 06 12 34 56 78"
									class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
								/>
							</div>
							<div>
								<label for="email" class="block text-sm font-bold text-gray-700 mb-2"
									>Email public <span class="text-red-500">*</span></label
								>
								<input
									type="email"
									id="email"
									bind:value={email}
									placeholder="contact@votre-commerce.fr"
									class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
								/>
							</div>
						</div>

						<div>
							<label for="website" class="block text-sm font-bold text-gray-700 mb-2">
								Site web
								{#if !isPremium}
									<span
										class="ml-2 text-xs font-bold text-yellow-600 uppercase tracking-wide bg-yellow-100 px-2 py-0.5 rounded"
										>Premium</span
									>
								{/if}
							</label>
							<input
								type="url"
								id="website"
								bind:value={website}
								disabled={!isPremium}
								placeholder="https://votre-site.fr"
								class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-shadow disabled:bg-gray-100 disabled:text-gray-500"
							/>
							{#if !isPremium}
								<p class="text-xs text-gray-500 mt-2 italic">
									L'ajout d'un lien vers votre site web est réservé aux abonnements Premium.
								</p>
							{/if}
						</div>
					</div>
				</div>

				<!-- Horaires -->
				<div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
					<div class="flex items-center justify-between mb-6">
						<h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
							<span>🕐</span> Horaires d'ouverture
						</h2>

						<button
							on:click={() => (hasHours = !hasHours)}
							class="text-sm font-bold text-primary bg-[#FFF8F0] px-4 py-2 rounded-lg hover:bg-[#FFE8D6] transition-colors"
						>
							{hasHours ? 'Masquer' : 'Définir les horaires'}
						</button>
					</div>

					{#if hasHours}
						<div in:fade class="space-y-4">
							<p class="text-sm font-medium text-gray-600 mb-6 bg-gray-50 p-3 rounded-lg">
								Indiquez vos horaires d'ouverture quotidiens. <br class="hidden sm:block" />
								Format au choix, par exemple:
								<strong class="text-gray-900">9h-12h / 14h-18h</strong>
								ou <strong class="text-gray-900">Fermé</strong>.
							</p>

							<div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
								<div class="flex items-center gap-3">
									<label for="monday" class="w-24 text-sm font-bold text-gray-700">Lundi</label>
									<div class="relative flex-1">
										<input
											id="monday"
											type="text"
											bind:value={monday}
											placeholder="Fermé"
											class="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
										/>
										<button
											on:click={copyToAllFields}
											title="Copier pour toute la semaine"
											class="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-primary hover:bg-[#FFF8F0] rounded-md transition-colors"
										>
											<CopyIcon class="h-4 w-4" />
										</button>
									</div>
								</div>

								<div class="flex items-center gap-3">
									<label for="tuesday" class="w-24 text-sm font-bold text-gray-700">Mardi</label>
									<input
										id="tuesday"
										type="text"
										bind:value={tuesday}
										placeholder="9h-18h"
										class="flex-1 px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
									/>
								</div>

								<div class="flex items-center gap-3">
									<label for="wednesday" class="w-24 text-sm font-bold text-gray-700"
										>Mercredi</label
									>
									<input
										id="wednesday"
										type="text"
										bind:value={wednesday}
										placeholder="9h-18h"
										class="flex-1 px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
									/>
								</div>

								<div class="flex items-center gap-3">
									<label for="thursday" class="w-24 text-sm font-bold text-gray-700">Jeudi</label>
									<input
										id="thursday"
										type="text"
										bind:value={thursday}
										placeholder="9h-18h"
										class="flex-1 px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
									/>
								</div>

								<div class="flex items-center gap-3">
									<label for="friday" class="w-24 text-sm font-bold text-gray-700">Vendredi</label>
									<input
										id="friday"
										type="text"
										bind:value={friday}
										placeholder="9h-18h"
										class="flex-1 px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
									/>
								</div>

								<div class="flex items-center gap-3">
									<label for="saturday" class="w-24 text-sm font-bold text-gray-700">Samedi</label>
									<input
										id="saturday"
										type="text"
										bind:value={saturday}
										placeholder="9h-14h"
										class="flex-1 px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
									/>
								</div>

								<div class="flex items-center gap-3">
									<label for="sunday" class="w-24 text-sm font-bold text-gray-700">Dimanche</label>
									<input
										id="sunday"
										type="text"
										bind:value={sunday}
										placeholder="Fermé"
										class="flex-1 px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
									/>
								</div>
							</div>
						</div>
					{/if}
				</div>

				<!-- Submit Button -->
				<div class="pt-4 pb-10">
					<button
						on:click={handleSave}
						disabled={isSaving}
						class="w-full flex justify-center items-center gap-2 bg-primary hover:bg-primary-dark text-white text-lg font-bold py-4 px-6 rounded-xl transition-colors shadow-sm disabled:opacity-70"
					>
						{#if isSaving}
							<div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
						{:else}
							<EditIcon class="h-6 w-6" />
							Enregistrer les modifications
						{/if}
					</button>
				</div>
			</div>
		{/if}
	</main>
</div>
