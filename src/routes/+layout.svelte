<script>
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/Components/Header.svelte';
	import Footer from '$lib/Components/Footer.svelte';
	import './styles.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	export let data;

	onMount(() => {
		// Enregistrement du cookie s'il est présent dans l'URL
		const fromAppParam = $page.url.searchParams.get('from_app');
		if (fromAppParam === 'true') {
			document.cookie = 'from_app=true; path=/; max-age=3600; SameSite=Lax; Secure';
			if (data) data.from_app = true;
		} else {
			// Sinon, restauration depuis le cookie existant
			const isCookieSet = document.cookie.split('; ').some(row => row.startsWith('from_app=true'));
			if (isCookieSet && data) {
				data.from_app = true;
			}
		}
	});
</script>

<div class="app-container">
  <header>
   <Header/>
  </header>

  <main class="content">
    <slot/>
  </main>

  <footer>
<Footer/>
  </footer>
</div>

<style>
  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh; 
  }

  header {
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  .content {
    flex: 1; 
  }

  footer {
    margin-top: auto; 
  }
</style>


