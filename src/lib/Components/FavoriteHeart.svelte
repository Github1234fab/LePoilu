<script>
    import { auth } from '$lib/firebase';
    import { toggleSponsorFavorite } from '$lib/favorites';
    import HeartIcon from './icons/HeartIcon.svelte';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    export let sponsorId;
    export let isFavorite = false;
    export let size = 20;

    let loading = false;
    let user = null;

    onMount(() => {
        const unsubscribe = auth.onAuthStateChanged((u) => {
            user = u;
        });
        return unsubscribe;
    });

    async function handleToggle(e) {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            // Redirect to login if not authenticated
            goto('/compte?redirect=' + encodeURIComponent(window.location.pathname));
            return;
        }

        if (loading) return;

        loading = true;
        try {
            const success = await toggleSponsorFavorite(user.uid, sponsorId, isFavorite);
            if (success) {
                isFavorite = !isFavorite;
            }
        } catch (error) {
            console.error('Failed to toggle favorite:', error);
        } finally {
            loading = false;
        }
    }
</script>

<button 
    class="favorite-button {isFavorite ? 'active' : ''}" 
    on:click={handleToggle}
    aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
    disabled={loading}
    in:fade
>
    {#if loading}
        <div class="spinner"></div>
    {:else}
        <HeartIcon filled={isFavorite} {size} color={isFavorite ? "#ff4757" : "currentColor"} />
    {/if}
</button>

<style>
    .favorite-button {
        background: rgba(255, 255, 255, 0.9);
        border: none;
        border-radius: 50%;
        width: 38px;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        color: #4b5563;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        padding: 0;
        z-index: 20;
    }

    .favorite-button:hover {
        transform: scale(1.1);
        background: white;
        color: #ff4757;
    }

    .favorite-button.active {
        color: #ff4757;
        background: white;
    }

    .favorite-button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .spinner {
        width: 14px;
        height: 14px;
        border: 2px solid rgba(255, 71, 87, 0.1);
        border-top: 2px solid #ff4757;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>
