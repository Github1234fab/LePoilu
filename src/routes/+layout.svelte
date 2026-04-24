<script>
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/Components/Header.svelte';
	import Footer from '$lib/Components/Footer.svelte';
	import './styles.css';
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


