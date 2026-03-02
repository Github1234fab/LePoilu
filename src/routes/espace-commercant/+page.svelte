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
    let errorMsg = "";

    onMount(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            user = currentUser;
            if (user) {
                fetchSponsorData(user.uid);
            } else {
                loading = false;
                // Redirect to login if not authenticated (handled mostly at layout/hook level, but added safeguard)
                window.location.href = "/login?redirect=/espace-commercant";
            }
        });

        return () => unsubscribe();
    });

    async function fetchSponsorData(uid) {
        try {
            loading = true;
            const q = query(
                collection(db, "Sponsors"),
                where("userId", "==", uid)
            );

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
            console.error("[Espace Commercant] Erreur:", error);
            errorMsg = "Impossible de charger vos données.";
        } finally {
            loading = false;
        }
    }

    function getStatusInfo(status) {
        switch (status) {
            case "pending":
                return {
                    label: "En attente de modération",
                    iconColor: "text-orange-500",
                    bgColor: "bg-orange-50",
                    textColor: "text-orange-700"
                };
            case "approved":
                return {
                    label: "Fiche active",
                    iconColor: "text-green-500",
                    bgColor: "bg-green-50",
                    textColor: "text-green-700"
                };
            case "rejected":
                return {
                    label: "Fiche rejetée",
                    iconColor: "text-red-500",
                    bgColor: "bg-red-50",
                    textColor: "text-red-700"
                };
            case "expired":
                return {
                    label: "Abonnement expiré",
                    iconColor: "text-red-500",
                    bgColor: "bg-red-50",
                    textColor: "text-red-700"
                };
            case "suspended":
                return {
                    label: "Fiche suspendue",
                    iconColor: "text-gray-500",
                    bgColor: "bg-gray-100",
                    textColor: "text-gray-700"
                };
            default:
                return {
                    label: status || "Inconnu",
                    iconColor: "text-gray-500",
                    bgColor: "bg-gray-100",
                    textColor: "text-gray-700"
                };
        }
    }

    $: statusInfo = sponsor ? getStatusInfo(sponsor.status) : null;
    $: isPremium = sponsor?.currentPlan?.type === "premium";
    $: isActive = sponsor?.currentPlan?.isActive;
    $: isExpired = sponsor?.status === "expired" || (sponsor && !isActive);

</script>

<svelte:head>
    <title>Mon Espace Commerçant - Le Poilu</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 pb-12">
    <!-- Header de l'espace pro -->
    <div class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <h1 class="text-xl font-bold text-gray-900 font-poppins">Espace Commerçant</h1>
            {#if user}
                <div class="text-sm text-gray-500 hidden sm:block">{user.email}</div>
            {/if}
        </div>
    </div>

    <main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {#if loading}
            <div class="flex flex-col items-center justify-center py-20" in:fade>
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p class="mt-4 text-gray-500 font-medium">Chargement de votre espace...</p>
            </div>
        {:else if errorMsg}
            <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-6" in:fade>
                <div class="flex">
                    <div class="flex-shrink-0">
                        <AlertCircleIcon class="h-5 w-5 text-red-500" />
                    </div>
                    <div class="ml-3">
                        <p class="text-sm text-red-700 font-medium">{errorMsg}</p>
                        <button class="mt-2 text-sm text-red-600 underline" on:click={() => fetchSponsorData(user.uid)}>
                            Réessayer
                        </button>
                    </div>
                </div>
            </div>
        {:else if !sponsor}
            <!-- Empty State : L'utilisateur n'a pas de fiche commerçant -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center flex flex-col items-center justify-center py-16" in:fade>
                <div class="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <StorefrontIcon class="h-10 w-10 text-gray-400" />
                </div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2 font-poppins">Aucune fiche commerçant</h2>
                <p class="text-gray-500 max-w-md mb-8">
                    Vous n'avez pas encore de vitrine dans Le Carnet du Poilu. Gagnez en visibilité auprès des clients locaux de l'Ouest Lyonnais.
                </p>
                <a 
                    href="/espace-commercant/rejoindre" 
                    class="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-full transition-colors shadow-sm"
                >
                    Créer ma vitrine
                </a>
            </div>
        {:else}
            <!-- Dashboard Content -->
            <div class="space-y-6" in:fade>
                
                <!-- Carte Profil & Statut -->
                <div class="bg-white rounded-2xl shadow-sm border border-[#FFE8D6] overflow-hidden">
                    <div class="bg-[#FFF8F0] p-6 border-b border-[#FFE8D6]">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h2 class="text-2xl font-bold text-gray-900 font-poppins mb-1">{sponsor.businessName}</h2>
                                <p class="text-gray-600">{sponsor.category}</p>
                            </div>
                            {#if isPremium}
                                <div class="flex items-center gap-1.5 bg-gray-900 text-yellow-400 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide">
                                    <StarIcon class="w-3.5 h-3.5" />
                                    <span>PREMIUM</span>
                                </div>
                            {/if}
                        </div>

                        <!-- Bannière de Statut -->
                        <div class={`flex items-center gap-3 p-3 rounded-lg ${statusInfo.bgColor}`}>
                            <div class={statusInfo.iconColor}>
                                {#if sponsor.status === 'approved'}
                                    <CheckCircleIcon class="w-5 h-5" />
                                {:else if sponsor.status === 'pending'}
                                    <TimeIcon class="w-5 h-5" />
                                {:else if sponsor.status === 'rejected'}
                                    <CloseCircleIcon class="w-5 h-5" />
                                {:else if sponsor.status === 'expired'}
                                    <AlertCircleIcon class="w-5 h-5" />
                                {:else}
                                    <PauseCircleIcon class="w-5 h-5" />
                                {/if}
                            </div>
                            <span class={`font-semibold ${statusInfo.textColor}`}>
                                {statusInfo.label}
                            </span>
                        </div>

                        <!-- Messages contextuels de statut -->
                        {#if sponsor.status === "pending"}
                            <div class="mt-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <p class="text-sm text-blue-700 leading-relaxed">
                                    Votre fiche est en cours de modération par notre équipe. Le Poilu valide chaque commerce pour garantir la qualité de l'annuaire. Vous recevrez un email sous 24h à 48h.
                                </p>
                            </div>
                        {:else if sponsor.status === "rejected" && sponsor.rejectionReason}
                            <div class="mt-3 bg-red-50 p-4 rounded-lg border border-red-100">
                                <h4 class="text-sm font-bold text-red-800 mb-1">Raison du refus :</h4>
                                <p class="text-sm text-red-700 mb-3">{sponsor.rejectionReason}</p>
                                <a href="/espace-commercant/modifier" class="inline-block bg-red-700 text-white text-sm font-semibold py-2 px-4 rounded hover:bg-red-800 transition-colors">
                                    Modifier ma fiche
                                </a>
                            </div>
                        {:else if isExpired}
                            <div class="mt-3 bg-red-50 p-4 rounded-lg border border-red-100 flex flex-col items-start">
                                <h4 class="text-sm font-bold text-red-800 mb-1">Vitrine inactive</h4>
                                <p class="text-sm text-red-700 mb-3">Votre fiche n'est plus visible par les utilisateurs dans Le Carnet.</p>
                                <a href="/espace-commercant/renouveler" class="inline-block bg-red-700 text-white text-sm font-semibold py-2 px-4 rounded hover:bg-red-800 transition-colors">
                                    Passer en Premium
                                </a>
                            </div>
                        {/if}
                    </div>

                    <!-- Statistiques (si approuvé) -->
                    {#if sponsor.status === "approved" && isActive}
                        <div class="p-6">
                            <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span>📊</span> Vos performances
                            </h3>
                            
                            <div class="grid grid-cols-3 gap-4">
                                <!-- Vues -->
                                <div class="bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-gray-100">
                                    <div class="text-primary mb-2">
                                        <EyeIcon class="w-7 h-7" />
                                    </div>
                                    <span class="text-2xl font-bold text-gray-900 mb-1">{sponsor.stats?.views || 0}</span>
                                    <span class="text-xs text-gray-500 font-medium uppercase tracking-wider">Vues</span>
                                </div>
                                
                                <!-- Clics -->
                                <div class="bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-gray-100">
                                    <div class="text-green-500 mb-2">
                                        <CursorClickIcon class="w-7 h-7" />
                                    </div>
                                    <span class="text-2xl font-bold text-gray-900 mb-1">{sponsor.stats?.clicks || 0}</span>
                                    <span class="text-xs text-gray-500 font-medium uppercase tracking-wider">Clics</span>
                                </div>

                                <!-- Offres -->
                                <div class="bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-gray-100">
                                    <div class="text-orange-500 mb-2">
                                        <GiftIcon class="w-7 h-7" />
                                    </div>
                                    <span class="text-2xl font-bold text-gray-900 mb-1">{sponsor.stats?.offersShown || 0}</span>
                                    <span class="text-xs text-gray-500 font-medium uppercase tracking-wider text-center">Offres<br />vues</span>
                                </div>
                            </div>

                            {#if sponsor.stats?.lastViewDate}
                                <div class="mt-4 text-center">
                                    <p class="text-xs text-gray-400">
                                        Dernière vue le {new Date(sponsor.stats.lastViewDate?.seconds * 1000).toLocaleDateString("fr-FR")}
                                    </p>
                                </div>
                            {/if}
                        </div>
                    {/if}
                </div>

                <!-- Actions / Gestion -->
                <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div class="p-6">
                        <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span>⚙️</span> Gérer ma vitrine
                        </h3>

                        <div class="space-y-3">
                            <!-- Modifier Infos -->
                            <a href="/espace-commercant/modifier" class="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group border border-transparent hover:border-gray-200">
                                <div class="flex items-center gap-4">
                                    <div class="bg-white p-2 rounded-lg shadow-sm group-hover:shadow text-primary">
                                        <EditIcon class="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-gray-900">Modifier mes informations</h4>
                                        <p class="text-sm text-gray-500">Description, horaires, contact, adresse...</p>
                                    </div>
                                </div>
                                <ChevronRightIcon class="w-5 h-5 text-gray-400" />
                            </a>

                            <!-- Gérer l'offre -->
                            <a href="/espace-commercant/offres" class="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group border border-transparent hover:border-gray-200">
                                <div class="flex items-center gap-4">
                                    <div class="bg-white p-2 rounded-lg shadow-sm group-hover:shadow text-green-500">
                                        <GiftIcon class="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-gray-900">Mon offre exclusive</h4>
                                        <p class="text-sm text-gray-500">
                                            {#if sponsor.specialOffer?.isActive}
                                                <span class="text-green-600 font-medium">Offre active :</span> {sponsor.specialOffer.title}
                                            {:else}
                                                Attirez plus de clients avec une réduction
                                            {/if}
                                        </p>
                                    </div>
                                </div>
                                <ChevronRightIcon class="w-5 h-5 text-gray-400" />
                            </a>

                            <!-- Gérer les photos -->
                            <a href="/espace-commercant/photos" class="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group border border-transparent hover:border-gray-200">
                                <div class="flex items-center gap-4">
                                    <div class="bg-white p-2 rounded-lg shadow-sm group-hover:shadow text-blue-500">
                                        <ImageIcon class="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-gray-900">Mes photos</h4>
                                        <p class="text-sm text-gray-500">
                                            {#if isPremium}
                                                {sponsor.images?.length || 0} / 5 photos ajoutées
                                            {:else}
                                                <span class="text-yellow-600">Réservé aux comptes Premium</span>
                                            {/if}
                                        </p>
                                    </div>
                                </div>
                                <ChevronRightIcon class="w-5 h-5 text-gray-400" />
                            </a>

                            <!-- Voir sa fiche (Aperçu) -->
                            {#if sponsor.status === "approved" && isActive}
                            <a href={`/carnet/${sponsor.id}`} target="_blank" class="flex items-center justify-between p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-100 group">
                                <div class="flex items-center gap-4">
                                    <div class="bg-white p-2 rounded-lg shadow-sm text-blue-600">
                                        <EyeIcon class="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-blue-900">Voir ma fiche publique</h4>
                                        <p class="text-sm text-blue-700">Découvrez comment les utilisateurs voient votre vitrine</p>
                                    </div>
                                </div>
                                <ChevronRightIcon class="w-5 h-5 text-blue-400" />
                            </a>
                            {/if}
                        </div>
                    </div>
                </div>

                <!-- Support -->
                <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span>❓</span> Besoin d'aide ?
                    </h3>
                    <p class="text-gray-600 mb-4 text-sm">
                        Une question sur votre abonnement, vos statistiques ou besoin d'aide pour optimiser votre fiche ? Notre équipe est là pour vous.
                    </p>
                    <a href="/contact" class="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors">
                        <MailIcon class="w-5 h-5" />
                        Contacter le support
                    </a>
                </div>

            </div>
        {/if}
    </main>
</div>
