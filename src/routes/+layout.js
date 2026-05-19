// Ce fichier a été vidé pour supprimer toute fonction layout load accédant à url.searchParams.
// Cela empêchait le pré-rendu statique de SvelteKit de se compiler lors du build (prerender = true).
// La détection de l'application est désormais 100% gérée côté client de manière robuste.
