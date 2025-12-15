<script>
	import PreHero from "$lib/Components/PreHero.svelte";
	    import Header from "$lib/Components/Header.svelte";
	    import Hero from "$lib/Components/Hero.svelte";
	    import Features from "$lib/Components/FeaturesCopy.svelte";
	    import HIW from "$lib/Components/HowItWorks.svelte";
	    import Testimonials from "$lib/Components/Testimonials.svelte";
	    import CTAFinal from "$lib/Components/CTAFinal.svelte";
	    // import Footer from "$lib/Components/Footer.svelte";
		import './styles.css';

</script>

<main>

	<!-- <Header/>  -->
 <Hero/> 
<PreHero/>

<Features/>
<HIW/>
<Testimonials/>
<CTAFinal/>
<!-- <Footer/> -->


</main>

<style>
	main{
        display: flex;
        flex-direction: column;
        gap: 40px;
        padding: 10px;
        max-width: 1200px;
        margin: 0 auto;
    }
	
</style>
