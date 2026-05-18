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

	const MAX_PHOTOS = 7;

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
				window.location.href = '/compte?redirect=/espace-commercant/photos';
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
			errorMsg = 'Impossible de charger tes données.';
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
						errorMsg = "L'image a été envoyée mais n'a pas pu être enregistrée sur ton profil.";
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
		if (!confirm('Es-tu sûr de vouloir supprimer cette photo ? Cette action est irréversible.'))
			return;

		errorMsg = '';
		successMsg = '';

		try {
			// Extract storage path from URL
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

	async function setAsCover(index) {
		if (index === 0) return;

		errorMsg = '';
		successMsg = '';

		try {
			// Reorder images: move selected index to position 0
			const newImages = [...images];
			const [selected] = newImages.splice(index, 1);
			newImages.unshift(selected);
			images = newImages;

			// Update Firestore
			await updateDoc(doc(db, 'Sponsors', sponsor.id), {
				images: images,
				updatedAt: Timestamp.now()
			});

			successMsg = 'Photo de couverture mise à jour !';
			setTimeout(() => {
				successMsg = '';
			}, 3000);
		} catch (error) {
			console.error('Error setting cover:', error);
			errorMsg = 'Impossible de mettre à jour la photo de couverture.';
		}
	}
</script>

<div class="edit-page-container">
	<main class="edit-main-content">
		<!-- Navigation / Back Button -->
		<a href="/compte" class="back-link">
			<div class="icon-back"><ChevronRightIcon /></div>
			<span>Retour à mon compte</span>
		</a>

		<header class="edit-header">
			<h1>Ma Galerie Pro</h1>
			<p>
				Gère les photos qui apparaissent sur ta fiche vitrine Le Carnet. 
				Les visuels de qualité attirent plus de clients !
			</p>
		</header>

		{#if loading}
			<div class="loading-state">
				<div class="spinner"></div>
				<p>Chargement de tes visuels...</p>
			</div>
		{:else if sponsor}
			<div class="edit-form-wrapper" in:fade>
				<!-- Hidden file input -->
				<input
					bind:this={fileInput}
					type="file"
					accept="image/png, image/jpeg, image/jpg, image/webp"
					class="hidden-input"
					on:change={handleFileSelect}
				/>

				<!-- Alerts -->
				{#if errorMsg}
					<div class="alert error" in:slide>
						<div class="alert-icon"><AlertCircleIcon /></div>
						<p>{errorMsg}</p>
					</div>
				{/if}

				{#if successMsg}
					<div class="alert success" in:slide>
						<div class="alert-icon"><CheckCircleIcon /></div>
						<p>{successMsg}</p>
					</div>
				{/if}

				{#if !isPremium}
					<!-- PREMIUM LOCK SCREEN -->
					<div class="premium-lock-card" in:fade>
						<div class="lock-visual">
							<div class="lock-icon-bg">
								<LockClosedIcon />
							</div>
							<div class="pulse-ring"></div>
						</div>
						
						<div class="lock-content">
							<span class="lock-badge">EXCLUSIF PREMIUM</span>
							<h2>Sublime ta fiche avec des photos</h2>
							<p>
								L'ajout de visuels pour mettre en valeur ton commerce est réservé aux abonnés de la
								formule <strong class="highlight">Visibilité Maximale</strong>.
							</p>

							<div class="pro-benefits">
								<div class="benefit-tag"><CheckCircleIcon /> <span>7 Photos HD</span></div>
								<div class="benefit-tag"><CheckCircleIcon /> <span>Lien Site Web</span></div>
								<div class="benefit-tag"><CheckCircleIcon /> <span>Priorité de tri</span></div>
							</div>

							<a href="/espace-commercant" class="btn-upgrade">
								<AlbumsIcon />
								Passer en Premium
							</a>
						</div>
					</div>
				{:else}
					<!-- PHOTO GALLERY -->
					<div class="info-note-pro">
						<div class="note-icon-pro"><InformationCircleIcon /></div>
						<p>
							Ajoute jusqu'à {MAX_PHOTOS} photos. La première photo est ton <strong>image de couverture</strong> 
							et apparaîtra sur les résultats de recherche.
						</p>
					</div>

					<section class="gallery-card">
						<div class="gallery-header">
							<div class="card-title">
								<span class="emoji">🖼️</span>
								<h2>Ma Collection</h2>
							</div>
							<div class="photo-counter">
								<span>{images.length}</span> / {MAX_PHOTOS}
							</div>
						</div>

						<div class="photos-grid">
							{#each images as imageUrl, index}
								<div class="photo-item group" in:fade>
									<img src={imageUrl} alt={`Commerce ${index + 1}`} loading="lazy" />
									
									<div class="photo-overlay">
										<div class="overlay-actions">
											{#if index > 0}
												<button 
													class="btn-set-cover" 
													on:click={() => setAsCover(index)} 
													title="Mettre en photo de couverture"
												>
													<SunnyIcon />
												</button>
											{/if}
											<button class="btn-delete-photo" on:click={() => deleteImage(imageUrl, index)} title="Supprimer">
												<TrashIcon />
											</button>
										</div>
									</div>

									{#if index === 0}
										<div class="cover-badge-premium">
											<div class="badge-icon"><StarIcon /></div>
											<span>COUVERTURE</span>
										</div>
									{/if}
								</div>
							{/each}

							{#if images.length < MAX_PHOTOS}
								<button 
									on:click={triggerFileInput} 
									disabled={isUploading} 
									class="btn-add-photo {isUploading ? 'is-uploading' : ''}"
								>
									{#if isUploading}
										<div class="upload-progress-circle">
											<svg viewBox="0 0 36 36">
												<path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
												<path class="circle" stroke-dasharray="{uploadProgress}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
											</svg>
											<span class="progress-text">{uploadProgress}%</span>
										</div>
										<span class="upload-label">Envoi...</span>
									{:else}
										<div class="add-icon-bg">
											<AddCircleIcon />
										</div>
										<span class="add-label">Ajouter une photo</span>
									{/if}
								</button>
							{/if}
						</div>
					</section>

					<!-- Photography Tips -->
					<section class="tips-card">
						<div class="card-title">
							<span class="emoji">💡</span>
							<h2>Conseils de pro</h2>
						</div>

						<div class="tips-grid">
							<div class="tip-item">
								<div class="tip-icon light"><SunnyIcon /></div>
								<div class="tip-body">
									<h4>Lumière du jour</h4>
									<p>Évitez le flash ou les intérieurs trop sombres.</p>
								</div>
							</div>
							<div class="tip-item">
								<div class="tip-icon landscape"><ResizeIcon /></div>
								<div class="tip-body">
									<h4>Format Paysage</h4>
									<p>Prends tes photos à l'horizontale pour un meilleur rendu.</p>
								</div>
							</div>
							<div class="tip-item">
								<div class="tip-icon storefront"><EyeIcon /></div>
								<div class="tip-body">
									<h4>Votre devanture</h4>
									<p>C'est ce qui aide les clients à te repérer.</p>
								</div>
							</div>
							<div class="tip-item">
								<div class="tip-icon variety"><AlbumsIcon /></div>
								<div class="tip-body">
									<h4>Variez les plaisirs</h4>
									<p>Cadre de vie, produits phares, ambiance...</p>
								</div>
							</div>
						</div>
					</section>
				{/if}
			</div>
		{/if}
	</main>
</div>

<style>
	.edit-page-container {
		min-height: 100vh;
		background: #f9fafb;
		padding: 2rem 0 5rem;
		font-family: 'Poppins', sans-serif;
	}

	.edit-main-content {
		max-width: 900px;
		margin: 0 auto;
		padding: 0 1.25rem;
	}

	/* Navigation */
	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
		color: var(--secondary);
		font-size: 0.9rem;
		font-weight: 600;
		margin-bottom: 2rem;
		transition: color 0.2s;
	}

	.back-link:hover { color: var(--cta); }
	.icon-back { transform: rotate(180deg); display: flex; width: 1rem; height: 1rem; }

	/* Header */
	.edit-header { margin-bottom: 2.5rem; }
	.edit-header h1 { font-size: 2.25rem; font-weight: 900; color: var(--text); margin: 0 0 0.5rem; }
	.edit-header p { color: var(--secondary); font-size: 1.1rem; }

	/* Form State */
	.loading-state { display: flex; flex-direction: column; align-items: center; padding: 4rem 0; color: var(--secondary); }
	.spinner { border: 3px solid #f3f3f3; border-top: 3px solid var(--cta); border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin-bottom: 1rem; }
	@keyframes spin { 100% { transform: rotate(360deg); } }

	.edit-form-wrapper { display: flex; flex-direction: column; gap: 2rem; }
	.hidden-input { display: none; }

	/* Premium Lock Card */
	.premium-lock-card {
		background: white;
		border-radius: 32px;
		padding: 4rem 2rem;
		text-align: center;
		border: 1px solid #edf2f7;
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05);
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		overflow: hidden;
	}

	.lock-visual { position: relative; margin-bottom: 2.5rem; }
	.lock-icon-bg { width: 100px; height: 100px; background: #f8fafc; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #94a3b8; }
	:global(.lock-icon-bg svg) { width: 3rem; height: 3rem; }
	.pulse-ring { position: absolute; top: 0; left: 0; right: 0; bottom: 0; border: 2px solid var(--cta); border-radius: 50%; animation: pulse 2s infinite; opacity: 0; }
	@keyframes pulse { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(1.5); opacity: 0; } }

	.lock-badge { background: #fef9c3; color: #854d0e; font-size: 0.75rem; font-weight: 800; padding: 0.4rem 1rem; border-radius: 50px; margin-bottom: 1.5rem; display: inline-block; }
	.lock-content h2 { font-size: 1.75rem; font-weight: 900; color: var(--text); margin: 0 0 1rem; }
	.lock-content p { color: var(--secondary); max-width: 500px; margin: 0 auto 2.5rem; line-height: 1.6; }
	.lock-content .highlight { color: var(--cta); }

	.pro-benefits { display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5rem; margin-bottom: 3rem; }
	.benefit-tag { display: flex; align-items: center; gap: 0.5rem; font-weight: 700; color: #475569; font-size: 0.95rem; }
	:global(.benefit-tag svg) { color: #10b981; width: 1.25rem; height: 1.25rem; }

	.btn-upgrade {
		background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
		color: white;
		text-decoration: none;
		padding: 1rem 2.5rem;
		border-radius: 50px;
		font-weight: 800;
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		box-shadow: 0 10px 15px rgba(245, 158, 11, 0.3);
		transition: transform 0.2s;
	}
	.btn-upgrade:hover { transform: scale(1.05); }

	/* Gallery Card */
	.gallery-card { background: white; border-radius: 24px; padding: 2rem; border: 1px solid #edf2f7; }
	.gallery-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
	.gallery-header .card-title { margin-bottom: 0; }
	.card-title { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; }
	.card-title .emoji { font-size: 1.5rem; }
	.card-title h2 { font-size: 1.25rem; font-weight: 800; color: var(--text); margin: 0; }

	.photo-counter { background: #f1f5f9; padding: 0.4rem 1rem; border-radius: 50px; font-size: 0.85rem; font-weight: 800; color: #64748b; }
	.photo-counter span { color: var(--text); }

	.photos-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem; }

	.photo-item { aspect-ratio: 1; border-radius: 16px; overflow: hidden; position: relative; border: 1px solid #e2e8f0; }
	.photo-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
	.photo-item:hover img { transform: scale(1.1); }

	.photo-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s; backdrop-filter: blur(2px); }
	.photo-item:hover .photo-overlay { opacity: 1; }

	.overlay-actions { display: flex; gap: 0.75rem; }

	.btn-delete-photo, .btn-set-cover { 
		background: rgba(255, 255, 255, 0.9); 
		border: none; 
		padding: 10px; 
		border-radius: 50%; 
		cursor: pointer; 
		transform: translateY(10px); 
		transition: all 0.2s; 
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.btn-delete-photo { color: #ef4444; }
	.btn-delete-photo:hover { background: #ef4444; color: white; transform: scale(1.1) !important; }
	
	.btn-set-cover { color: #f59e0b; }
	.btn-set-cover:hover { background: #f59e0b; color: white; transform: scale(1.1) !important; }

	.photo-item:hover .btn-delete-photo,
	.photo-item:hover .btn-set-cover { transform: translateY(0); }
	
	:global(.btn-delete-photo svg, .btn-set-cover svg) { width: 1.25rem; height: 1.25rem; }

	.cover-badge-premium { 
		position: absolute; 
		top: 12px; 
		left: 12px; 
		background: white; 
		color: #b45309; 
		font-size: 0.7rem; 
		font-weight: 800; 
		padding: 4px 10px; 
		border-radius: 50px; 
		display: flex; 
		align-items: center; 
		gap: 6px; 
		box-shadow: 0 4px 6px rgba(0,0,0,0.1);
		border: 1px solid #fde68a;
	}
	.badge-icon { color: #f59e0b; display: flex; }
	:global(.badge-icon svg) { width: 0.85rem; height: 0.85rem; }

	.btn-add-photo { aspect-ratio: 1; border-radius: 16px; border: 2px dashed #cbd5e1; background: #f8fafc; color: #64748b; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.75rem; transition: all 0.2s; }
	.btn-add-photo:hover { border-color: var(--cta); background: #fff5f2; color: var(--cta); }
	.btn-add-photo.is-uploading { cursor: not-allowed; border-color: var(--cta); }

	.add-icon-bg { width: 50px; height: 50px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
	:global(.add-icon-bg svg) { width: 1.75rem; height: 1.75rem; }
	.add-label { font-size: 0.85rem; font-weight: 800; }

	/* Upload Progress Circle */
	.upload-progress-circle { position: relative; width: 60px; height: 60px; }
	.circle-bg { fill: none; stroke: #e2e8f0; stroke-width: 3; }
	.circle { fill: none; stroke: var(--cta); stroke-width: 3; stroke-linecap: round; transition: stroke-dasharray 0.3s; transform: rotate(-90deg); transform-origin: 50% 50%; }
	.progress-text { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 0.75rem; font-weight: 800; color: var(--cta); }

	/* Tips Card */
	.tips-card { background: #fff8f5; border-radius: 24px; padding: 2rem; border: 1px solid #ffe8d6; }
	.tips-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
	.tip-item { display: flex; gap: 1rem; background: rgba(255, 255, 255, 0.5); padding: 1.25rem; border-radius: 20px; }
	.tip-icon { width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
	:global(.tip-icon svg) { width: 1.5rem; height: 1.5rem; }

	.tip-icon.light { background: #fee2e2; color: #ef4444; }
	.tip-icon.landscape { background: #e0f2fe; color: #0284c7; }
	.tip-icon.storefront { background: #f0fdf4; color: #16a34a; }
	.tip-icon.variety { background: #fef9c3; color: #854d0e; }

	.tip-body h4 { font-size: 0.95rem; font-weight: 800; color: var(--text); margin: 0 0 0.25rem; }
	.tip-body p { font-size: 0.85rem; color: var(--secondary); margin: 0; line-height: 1.5; }

	/* Info Note Pro (shared logic) */
	.info-note-pro { background: #eff6ff; padding: 1.25rem 1.5rem; border-radius: 20px; display: flex; gap: 1rem; border: 1px solid #dbeafe; }
	.note-icon-pro { color: #3b82f6; width: 1.5rem; flex-shrink: 0; margin-top: 2px; }
	:global(.note-icon-pro svg) { width: 1.5rem; height: 1.5rem; }
	.info-note-pro p { font-size: 0.9rem; color: #1e40af; line-height: 1.6; margin: 0; }

	/* Alerts */
	.alert { padding: 1.25rem; border-radius: 16px; display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; font-weight: 600; }
	.alert.error { background: #fee2e2; color: #991b1b; }
	.alert.success { background: #f0fdf4; color: #166534; }
	:global(.alert svg) { width: 1.5rem; height: 1.5rem; }

	@media (max-width: 600px) {
		.photos-grid { grid-template-columns: repeat(2, 1fr); }
		.edit-header h1 { font-size: 1.75rem; }
		.premium-lock-card { padding: 3rem 1.5rem; }
	}
</style>
