<script>
	import { onMount, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import { auth, db, storage } from '$lib/firebase';
	import { collection, query, where, getDocs, doc, updateDoc, Timestamp } from 'firebase/firestore';
	import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
	import { onAuthStateChanged } from 'firebase/auth';

	// Icons
	import InformationCircleIcon from '$lib/Components/icons/InformationCircleIcon.svelte';
	import LockClosedIcon from '$lib/Components/icons/LockClosedIcon.svelte';
	import CheckCircleIcon from '$lib/Components/icons/CheckCircleIcon.svelte';
	import AddCircleIcon from '$lib/Components/icons/AddCircleIcon.svelte';
	import TrashIcon from '$lib/Components/icons/TrashIcon.svelte';
	import SunnyIcon from '$lib/Components/icons/SunnyIcon.svelte';
	import ResizeIcon from '$lib/Components/icons/ResizeIcon.svelte';
	import EyeIcon from '$lib/Components/icons/EyeIcon.svelte';
	import AlbumsIcon from '$lib/Components/icons/AlbumsIcon.svelte';
	import ChevronRightIcon from '$lib/Components/icons/ChevronRightIcon.svelte';
	import AlertCircleIcon from '$lib/Components/icons/AlertCircleIcon.svelte';

	const MAX_PHOTOS = 5;

	let user = null;
	let authUnsubscribe;
	let sponsor = null;
	let loading = true;

	let images = [];
	let isUploading = false;
	let uploadProgress = 0;

	let errorMsg = '';
	let successMsg = '';

	// File input reference
	let fileInput;

	$: isPremium = sponsor?.currentPlan?.type === 'premium';

	onMount(() => {
		authUnsubscribe = onAuthStateChanged(auth, (currentUser) => {
			user = currentUser;
			if (user) {
				fetchSponsorData(user.uid);
			} else {
				window.location.href = '/login?redirect=/espace-commercant/photos';
			}
		});
	});

	onDestroy(() => {
		if (authUnsubscribe) authUnsubscribe();
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

			images = sponsor.images || [];
		} catch (error) {
			console.error('Error fetching sponsor:', error);
			errorMsg = 'Impossible de charger vos données.';
		} finally {
			loading = false;
		}
	}

	function triggerFileInput() {
		if (!isPremium) {
			errorMsg =
				"L'ajout de photos est réservé aux abonnés Premium. Passez en Premium pour débloquer cette fonctionnalité !";
			return;
		}
		if (images.length >= MAX_PHOTOS) {
			errorMsg = `Vous avez atteint la limite de ${MAX_PHOTOS} photos.`;
			return;
		}
		errorMsg = '';
		fileInput.click();
	}

	async function handleFileSelect(event) {
		const file = event.target.files[0];
		if (!file) return;

		// Reset input for next selection
		fileInput.value = '';

		// Verify valid image
		if (!file.type.startsWith('image/')) {
			errorMsg = "Le fichier sélectionné n'est pas une image valide.";
			return;
		}

		// Limit size (e.g., 5MB)
		if (file.size > 5 * 1024 * 1024) {
			errorMsg = "L'image est trop volumineuse. La taille maximum est de 5 Mo.";
			return;
		}

		uploadImage(file);
	}

	async function uploadImage(file) {
		isUploading = true;
		uploadProgress = 0;
		errorMsg = '';
		successMsg = '';

		try {
			const filename = `sponsors/${sponsor.id}/${Date.now()}_${file.name}`;
			const storageRef = ref(storage, filename);

			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				'state_changed',
				(snapshot) => {
					uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
				},
				(error) => {
					console.error('Upload error:', error);
					errorMsg = "Une erreur s'est produite lors de l'envoi de l'image.";
					isUploading = false;
					uploadProgress = 0;
				},
				async () => {
					try {
						const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

						// Update local array
						images = [...images, downloadURL];

						// Update Firestore
						await updateDoc(doc(db, 'Sponsors', sponsor.id), {
							images: images,
							updatedAt: Timestamp.now()
						});

						successMsg = 'Photo ajoutée avec succès !';
						setTimeout(() => {
							successMsg = '';
						}, 4000);
					} catch (dbError) {
						console.error('Firestore update error:', dbError);
						errorMsg = "L'image a été envoyée mais n'a pas pu être enregistrée sur votre profil.";
					} finally {
						isUploading = false;
						uploadProgress = 0;
					}
				}
			);
		} catch (error) {
			console.error('Setup upload error:', error);
			errorMsg = "Impossible de préparer l'envoi de l'image. Veuillez réessayer.";
			isUploading = false;
			uploadProgress = 0;
		}
	}

	async function deleteImage(imageUrl, index) {
		if (!confirm('Êtes-vous sûr de vouloir supprimer cette photo ? Cette action est irréversible.'))
			return;

		errorMsg = '';
		successMsg = '';

		try {
			// Extract storage path from URL
			// Firebase Storage URLs are like: https://firebasestorage.googleapis.com/.../o/sponsors%2F...%2Fimage.jpg?...
			const imagePath = decodeURIComponent(imageUrl.split('/o/')[1].split('?')[0]);
			const imageRef = ref(storage, imagePath);

			// Delete from storage
			await deleteObject(imageRef);

			// Update local array
			images = images.filter((_, i) => i !== index);

			// Update Firestore
			await updateDoc(doc(db, 'Sponsors', sponsor.id), {
				images: images,
				updatedAt: Timestamp.now()
			});

			successMsg = 'Photo supprimée.';
			setTimeout(() => {
				successMsg = '';
			}, 4000);
		} catch (error) {
			console.error('Error deleting image:', error);
			errorMsg = 'Impossible de supprimer la photo. Elle a peut-être déjà été supprimée.';
		}
	}
</script>

<svelte:head>
	<title>Mes photos - Le Poilu</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 pb-20 pt-6">
	<main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Navigation / Back Button -->
		<a
			href="/espace-commercant"
			class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors"
		>
			<ChevronRightIcon class="h-4 w-4 mr-1 rotate-180" />
			Retour à l'espace commerçant
		</a>

		<div class="mb-8">
			<h1 class="text-3xl font-bold text-gray-900 font-poppins">Mes photos pro</h1>
			<p class="mt-2 text-gray-600">
				Gérez les photos qui apparaissent sur votre fiche vitrine Le Carnet.
			</p>
		</div>

		{#if loading}
			<div class="flex justify-center py-12">
				<div class="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
			</div>
		{:else if sponsor}
			<div class="space-y-8" in:fade>
				<!-- Hidden file input -->
				<input
					bind:this={fileInput}
					type="file"
					accept="image/png, image/jpeg, image/jpg, image/webp"
					class="hidden"
					on:change={handleFileSelect}
				/>

				<!-- Info Box -->
				<div class="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-4">
					<div class="text-blue-500 mt-0.5"><InformationCircleIcon class="h-6 w-6" /></div>
					<p class="text-sm text-blue-800 leading-relaxed">
						Ajoutez jusqu'à {MAX_PHOTOS} photos de votre commerce. Les vitrines avec des photos de qualité
						attirent <strong class="font-bold">2 fois plus de clients</strong> !
					</p>
				</div>

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

				{#if !isPremium}
					<!-- Non-Premium State -->
					<div
						class="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center flex flex-col items-center"
					>
						<div class="bg-gray-100 p-6 rounded-full inline-block mb-6">
							<LockClosedIcon class="h-16 w-16 text-gray-400" />
						</div>
						<h2 class="text-2xl font-bold text-gray-900 mb-3">Fonctionnalité Premium</h2>
						<p class="text-gray-600 mb-8 max-w-lg mx-auto">
							L'ajout de photos pour mettre en valeur votre commerce est réservé aux abonnés de la
							formule <strong class="font-semibold text-gray-900">Visibilité Maximale</strong>.
						</p>

						<div class="flex flex-col gap-4 items-start text-left mb-8 max-w-xs mx-auto">
							<div class="flex items-center gap-3">
								<CheckCircleIcon class="h-5 w-5 text-green-500 shrink-0" />
								<span class="font-medium text-gray-800">Galerie de {MAX_PHOTOS} photos</span>
							</div>
							<div class="flex items-center gap-3">
								<CheckCircleIcon class="h-5 w-5 text-green-500 shrink-0" />
								<span class="font-medium text-gray-800">Mise en avant sur l'app</span>
							</div>
							<div class="flex items-center gap-3">
								<CheckCircleIcon class="h-5 w-5 text-green-500 shrink-0" />
								<span class="font-medium text-gray-800">Bouton site web débloqué</span>
							</div>
						</div>

						<a
							href="/espace-commercant"
							class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-8 rounded-full transition-colors inline-flex items-center gap-2 shadow-sm"
						>
							<AlbumsIcon class="h-5 w-5" />
							Gérer mon abonnement Premium
						</a>
					</div>
				{:else}
					<!-- Premium State - Photo Gallery -->
					<div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
						<div class="flex justify-between items-center mb-6">
							<h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
								<span>🖼️</span> Galerie photo
							</h2>
							<div class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-bold">
								{images.length} / {MAX_PHOTOS}
							</div>
						</div>

						<!-- Photo Grid -->
						<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
							{#each images as imageUrl, index}
								<div
									class="aspect-[4/3] rounded-xl overflow-hidden relative group border border-gray-200"
								>
									<img
										src={imageUrl}
										alt={`Image du commerce ${index + 1}`}
										class="w-full h-full object-cover"
									/>

									<!-- Badges and controls -->
									<div
										class="absolute inset-x-0 top-0 p-2 flex justify-between bg-gradient-to-b from-black/50 to-transparent"
									>
										<span class="bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-md">
											{index === 0 ? 'Couverture' : `#${index + 1}`}
										</span>
										<button
											on:click={() => deleteImage(imageUrl, index)}
											class="bg-red-500/90 hover:bg-red-500 text-white p-1.5 rounded-full transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
											title="Supprimer la photo"
										>
											<TrashIcon class="h-4 w-4" />
										</button>
									</div>
								</div>
							{/each}

							<!-- Add Button -->
							{#if images.length < MAX_PHOTOS}
								<button
									on:click={triggerFileInput}
									disabled={isUploading}
									class="aspect-[4/3] rounded-xl border-2 border-dashed border-primary bg-primary/5 hover:bg-primary/10 flex flex-col items-center justify-center transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{#if isUploading}
										<div class="relative w-12 h-12 flex items-center justify-center">
											<div class="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
											<div
												class="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"
											></div>
											<span class="text-xs font-bold text-primary">{uploadProgress}%</span>
										</div>
										<span class="mt-2 text-sm font-semibold text-primary">Envoi...</span>
									{:else}
										<AddCircleIcon
											class="h-10 w-10 text-primary mb-2 group-hover:scale-110 transition-transform"
										/>
										<span class="text-sm font-bold text-primary">Ajouter une photo</span>
									{/if}
								</button>
							{/if}
						</div>

						<!-- Order info -->
						{#if images.length > 1}
							<p class="mt-4 text-sm text-gray-500 italic flex items-center gap-1.5">
								<InformationCircleIcon class="h-4 w-4 shrink-0" />
								L'image #1 étiquettée "Couverture" sera l'image principale de votre fiche.
							</p>
						{/if}
					</div>

					<!-- Photography Tips -->
					<div class="bg-[#FFF8F0] border border-[#FFE8D6] rounded-2xl p-6 sm:p-8">
						<h3 class="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
							<span>💡</span> Conseils pour de belles photos
						</h3>

						<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div class="flex items-start gap-4 bg-white/60 p-4 rounded-xl">
								<div class="bg-orange-100 text-orange-500 p-2.5 rounded-lg shrink-0">
									<SunnyIcon class="h-5 w-5" />
								</div>
								<div>
									<h4 class="font-bold text-gray-900 text-sm mb-1">
										Privilégiez la lumière du jour
									</h4>
									<p class="text-sm text-gray-600">
										Évitez les photos de nuit ou les intérieurs trop sombres et flous.
									</p>
								</div>
							</div>

							<div class="flex items-start gap-4 bg-white/60 p-4 rounded-xl">
								<div class="bg-blue-100 text-blue-500 p-2.5 rounded-lg shrink-0">
									<ResizeIcon class="h-5 w-5" />
								</div>
								<div>
									<h4 class="font-bold text-gray-900 text-sm mb-1">Cadrez en format Paysage</h4>
									<p class="text-sm text-gray-600">
										Prenez votre téléphone à l'horizontale (format rectangle large).
									</p>
								</div>
							</div>

							<div class="flex items-start gap-4 bg-white/60 p-4 rounded-xl">
								<div class="bg-green-100 text-green-500 p-2.5 rounded-lg shrink-0">
									<EyeIcon class="h-5 w-5" />
								</div>
								<div>
									<h4 class="font-bold text-gray-900 text-sm mb-1">Montrez votre établissement</h4>
									<p class="text-sm text-gray-600">
										Mettez en valeur votre devanture ou la décoration de la salle.
									</p>
								</div>
							</div>

							<div class="flex items-start gap-4 bg-white/60 p-4 rounded-xl">
								<div class="bg-purple-100 text-purple-500 p-2.5 rounded-lg shrink-0">
									<AlbumsIcon class="h-5 w-5" />
								</div>
								<div>
									<h4 class="font-bold text-gray-900 text-sm mb-1">Variez les vues</h4>
									<p class="text-sm text-gray-600">
										Proposez des photos de vos plats, de la boutique et de vos équipes.
									</p>
								</div>
							</div>
						</div>
					</div>
				{/if}
			</div>
		{/if}
	</main>
</div>

<style>
	/* Add smooth transitions to the grid elements */
	.aspect-\[4\/3\] {
		aspect-ratio: 4 / 3;
	}
</style>
