<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { auth, db } from '$lib/firebase';
	import { collection, query, where, getDocs, doc, updateDoc, Timestamp } from 'firebase/firestore';
	import { onAuthStateChanged } from 'firebase/auth';

	// Icons
	import GiftIcon from '$lib/components/icons/GiftIcon.svelte';
	import InformationCircleIcon from '$lib/components/icons/InformationCircleIcon.svelte';
	import CalendarIcon from '$lib/components/icons/CalendarIcon.svelte';
	import EyeIcon from '$lib/components/icons/EyeIcon.svelte';
	import EyeOffIcon from '$lib/components/icons/EyeOffIcon.svelte';
	import CheckCircleIcon from '$lib/components/icons/CheckCircleIcon.svelte';
	import TrashIcon from '$lib/components/icons/TrashIcon.svelte';
	import ChevronRightIcon from '$lib/components/icons/ChevronRightIcon.svelte';
	import AlertCircleIcon from '$lib/components/icons/AlertCircleIcon.svelte';

	let user = null;
	let sponsor = null;
	let loading = true;
	let isSaving = false;
	let errorMsg = '';
	let successMsg = '';

	// FormData
	let title = '';
	let description = '';
	let conditions = '';
	let isActive = true;
	let hasValidityDate = false;
	let validUntil = '';

	onMount(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			user = currentUser;
			if (user) {
				fetchSponsorData(user.uid);
			} else {
				window.location.href = '/login?redirect=/espace-commercant/offres';
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
				// If no sponsor profile exists, redirect to dashboard which handles the empty state
				window.location.href = '/espace-commercant';
				return;
			}

			sponsor = {
				id: snapshot.docs[0].id,
				...snapshot.docs[0].data()
			};

			const existingOffer = sponsor.specialOffer;
			if (existingOffer) {
				title = existingOffer.title || '';
				description = existingOffer.description || '';
				conditions = existingOffer.conditions || '';
				isActive = existingOffer.isActive !== undefined ? existingOffer.isActive : true;

				if (existingOffer.validUntil) {
					hasValidityDate = true;
					// Format timestamp to YYYY-MM-DD for HTML input
					const date = new Date(existingOffer.validUntil.seconds * 1000);
					validUntil = date.toISOString().split('T')[0];
				}
			}
		} catch (error) {
			console.error('Error fetching sponsor data:', error);
			errorMsg = 'Impossible de charger vos données.';
		} finally {
			loading = false;
		}
	}

	async function handleSave() {
		errorMsg = '';
		successMsg = '';

		if (!title.trim()) {
			errorMsg = "Le titre de l'offre est requis.";
			return;
		}
		if (!description.trim()) {
			errorMsg = "La description de l'offre est requise.";
			return;
		}

		isSaving = true;

		try {
			const offerData = {
				title: title.trim(),
				description: description.trim(),
				conditions: conditions.trim() || '',
				isActive: isActive
			};

			if (hasValidityDate && validUntil) {
				offerData.validUntil = Timestamp.fromDate(new Date(validUntil));
			} else {
				offerData.validUntil = null;
			}

			await updateDoc(doc(db, 'Sponsors', sponsor.id), {
				specialOffer: offerData,
				updatedAt: Timestamp.now()
			});

			successMsg = isActive
				? 'Votre offre spéciale a été publiée avec succès !'
				: 'Votre offre a été enregistrée, mais reste masquée pour le moment.';

			// Update local state to reflect changes in preview
			sponsor.specialOffer = offerData;

			// Clear success message after 4s
			setTimeout(() => {
				successMsg = '';
			}, 4000);
		} catch (error) {
			console.error('Error saving offer:', error);
			errorMsg = "Impossible d'enregistrer l'offre. Veuillez réessayer.";
		} finally {
			isSaving = false;
		}
	}

	async function handleDelete() {
		if (!confirm('Êtes-vous sûr de vouloir supprimer votre offre spéciale ?')) return;

		isSaving = true;
		try {
			await updateDoc(doc(db, 'Sponsors', sponsor.id), {
				specialOffer: null,
				updatedAt: Timestamp.now()
			});

			// Reset form
			title = '';
			description = '';
			conditions = '';
			isActive = true;
			hasValidityDate = false;
			validUntil = '';
			sponsor.specialOffer = null;

			successMsg = 'Offre supprimée avec succès.';
			setTimeout(() => {
				successMsg = '';
			}, 4000);
		} catch (error) {
			console.error('Error deleting offer:', error);
			errorMsg = "Impossible de supprimer l'offre.";
		} finally {
			isSaving = false;
		}
	}
</script>

<svelte:head>
	<title>Gérer mon offre - Le Poilu</title>
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
			<h1 class="text-3xl font-bold text-gray-900 font-poppins">Gérer mon offre exclusive</h1>
			<p class="mt-2 text-gray-600">
				Proposez une offre spéciale aux utilisateurs du Poilu pour attirer de nouveaux clients.
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
							<div class="flex-shrink-0"><AlertCircleIcon class="h-5 w-5 text-red-400" /></div>
							<div class="ml-3"><p class="text-sm text-red-700">{errorMsg}</p></div>
						</div>
					</div>
				{/if}

				{#if successMsg}
					<div class="bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
						<div class="flex">
							<div class="flex-shrink-0"><CheckCircleIcon class="h-5 w-5 text-green-400" /></div>
							<div class="ml-3"><p class="text-sm text-green-700">{successMsg}</p></div>
						</div>
					</div>
				{/if}

				<!-- Info Banner -->
				<div class="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-4">
					<div class="text-blue-500 mt-0.5"><InformationCircleIcon class="h-6 w-6" /></div>
					<p class="text-sm text-blue-800 leading-relaxed">
						L'offre spéciale apparaîtra sur votre fiche dans <strong>Le Carnet</strong>. Les
						utilisateurs devront montrer l'application pour en profiter.
					</p>
				</div>

				<!-- Form Section -->
				<div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
					<h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
						<span>🎁</span> Contenu de l'offre
					</h2>

					<div class="space-y-6">
						<!-- Titre -->
						<div>
							<label for="title" class="block text-sm font-bold text-gray-700 mb-2"
								>Titre de l'offre <span class="text-red-500">*</span></label
							>
							<input
								type="text"
								id="title"
								bind:value={title}
								maxlength="50"
								placeholder="Ex: Café offert, 10% de réduction..."
								class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
							/>
							<div class="flex justify-end mt-1">
								<span class="text-xs text-gray-400">{title.length}/50</span>
							</div>
						</div>

						<!-- Description -->
						<div>
							<label for="description" class="block text-sm font-bold text-gray-700 mb-2"
								>Description détaillée <span class="text-red-500">*</span></label
							>
							<textarea
								id="description"
								bind:value={description}
								maxlength="150"
								rows="3"
								placeholder="Ex: Pour 2 pizzas achetées, avec le menu du jour..."
								class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-shadow resize-none"
							></textarea>
							<div class="flex justify-end mt-1">
								<span class="text-xs text-gray-400">{description.length}/150</span>
							</div>
						</div>

						<!-- Conditions -->
						<div>
							<label for="conditions" class="block text-sm font-bold text-gray-700 mb-2"
								>Conditions (Optionnel)</label
							>
							<textarea
								id="conditions"
								bind:value={conditions}
								maxlength="100"
								rows="2"
								placeholder="Ex: Hors promotions en cours..."
								class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-shadow resize-none"
							></textarea>
							<div class="flex justify-end mt-1">
								<span class="text-xs text-gray-400">{conditions.length}/100</span>
							</div>
						</div>
					</div>
				</div>

				<!-- Settings Section -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<!-- Date de validité -->
					<div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
						<h2 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
							<span>📅</span> Date de validité
						</h2>

						<div class="flex items-center justify-between mb-4">
							<div>
								<h3 class="font-semibold text-gray-800">Ajouter une date limite</h3>
								<p class="text-sm text-gray-500">L'offre expirera automatiquement</p>
							</div>
							<label class="relative inline-flex items-center cursor-pointer">
								<input type="checkbox" bind:checked={hasValidityDate} class="sr-only peer" />
								<div
									class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"
								></div>
							</label>
						</div>

						{#if hasValidityDate}
							<div class="mt-4" in:fade>
								<div class="relative">
									<div
										class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"
									>
										<CalendarIcon class="h-5 w-5" />
									</div>
									<input
										type="date"
										bind:value={validUntil}
										min={new Date().toISOString().split('T')[0]}
										class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
									/>
								</div>
							</div>
						{/if}
					</div>

					<!-- Visibilité -->
					<div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
						<h2 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
							<span>👁️</span> Visibilité
						</h2>

						<div class="flex items-center justify-between">
							<div>
								<h3 class="font-semibold text-gray-800">Rendre l'offre publique</h3>
								<p class="text-sm text-gray-500">
									{isActive ? "L'offre sera visible par tous" : "L'offre restera masquée"}
								</p>
							</div>
							<label class="relative inline-flex items-center cursor-pointer">
								<input type="checkbox" bind:checked={isActive} class="sr-only peer" />
								<div
									class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"
								></div>
							</label>
						</div>
					</div>
				</div>

				<!-- Aperçu -->
				<div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
					<h2 class="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
						<span>👀</span> Aperçu de l'offre
					</h2>

					<div
						class="bg-[#FFF8F0] border-2 border-[#FFE8D6] rounded-xl p-6 relative overflow-hidden"
					>
						<div class="flex items-start gap-4">
							<div class="bg-green-100 text-green-600 p-3 rounded-full shrink-0">
								<GiftIcon class="h-6 w-6" />
							</div>
							<div class="flex-1">
								<h3 class="text-lg font-bold text-green-800 mb-2">
									{title || "Titre de l'offre"}
								</h3>
								<p class="text-gray-700 mb-3 whitespace-pre-wrap leading-relaxed">
									{description || "Description complète de l'offre..."}
								</p>

								{#if conditions}
									<p class="text-sm text-gray-500 italic mb-2">
										Conditions : {conditions}
									</p>
								{/if}

								{#if hasValidityDate && validUntil}
									<p class="text-sm font-semibold text-orange-600 mb-2">
										Valable jusqu'au {new Date(validUntil).toLocaleDateString('fr-FR')}
									</p>
								{/if}

								{#if !isActive}
									<div
										class="inline-flex items-center gap-1.5 bg-red-100 text-red-700 px-3 py-1.5 rounded-md mt-2 text-sm font-semibold"
									>
										<EyeOffIcon class="h-4 w-4" />
										Offre actuellement masquée
									</div>
								{/if}
							</div>
						</div>
					</div>
				</div>

				<!-- Actions / Buttons -->
				<div class="flex flex-col gap-4 pt-4 border-t border-gray-200">
					<button
						on:click={handleSave}
						disabled={isSaving}
						class="w-full flex justify-center items-center gap-2 bg-primary hover:bg-primary-dark text-white text-lg font-bold py-4 px-6 rounded-xl transition-colors shadow-sm disabled:opacity-70"
					>
						{#if isSaving}
							<div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
						{:else}
							<CheckCircleIcon class="h-6 w-6" />
							Enregistrer l'offre
						{/if}
					</button>

					{#if sponsor.specialOffer}
						<button
							on:click={handleDelete}
							disabled={isSaving}
							class="w-full flex justify-center items-center gap-2 bg-white border-2 border-red-500 hover:bg-red-50 text-red-500 font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-70"
						>
							<TrashIcon class="h-5 w-5" />
							Supprimer l'offre définitivement
						</button>
					{/if}
				</div>
			</div>
		{/if}
	</main>
</div>
