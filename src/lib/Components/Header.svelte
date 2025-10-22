<script>
	// export let appName = 'Le Poilu';
	import Poilu from '../assets/Poilu_mobile.png';
	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}
</script>

<header class="header">
	<div class="header-container">
		<div class="header-logo">
			<a href="/"><img class="poilu-img" src={Poilu} alt="Logo du Poilu" /></a>
		</div>

		<!-- Navigation desktop -->
		<nav class="nav-desktop">
			<a href="/Fonctionnalités" class="nav-link">Fonctionnalités</a>
			<a href="/Tarifs" class="nav-link">Tarifs</a>
			<a href="/Apropos" class="nav-link">À propos</a>
			<a href="/Contact" class="nav-link">Contact</a>
		</nav>

		<div class="header-cta">
			<a href="/Telecharger" class="btn-header">Télécharger l'app</a>
		</div>

		<!-- Burger menu mobile -->
		<button class="burger-menu" on:click={toggleMenu} aria-label="Menu">
			<span class="burger-line" class:open={isMenuOpen}></span>
			<span class="burger-line" class:open={isMenuOpen}></span>
			<span class="burger-line" class:open={isMenuOpen}></span>
		</button>
	</div>

	<!-- Menu mobile -->
	{#if isMenuOpen}
		<nav class="nav-mobile" class:open={isMenuOpen}>
			<a href="#fonctionnalites" class="nav-link-mobile" on:click={closeMenu}>Fonctionnalités</a>
			<a href="#comment-ca-marche" class="nav-link-mobile" on:click={closeMenu}>Comment ça marche</a
			>
			<a href="#temoignages" class="nav-link-mobile" on:click={closeMenu}>Témoignages</a>
			<a href="#telechargement" class="nav-link-mobile" on:click={closeMenu}>Télécharger</a>
			<a href="#telechargement" class="btn-header-mobile" on:click={closeMenu}>Télécharger l'app</a>
		</nav>
	{/if}
</header>

<style>
	.header {
		border-radius: 18px;
		background-color: var(--headerBg);
		z-index: 1000;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}

	.header-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		max-width: 1200px;
		margin: 0 auto;

		border-radius: 18px;
	}

	.header-logo {
		display: flex;
		align-items: center;
	}
	.poilu-img {
		height: 100px;
	}

	.nav-desktop {
		display: flex;
		gap: 2rem;
		align-items: center;
	}

	.nav-link {
		text-decoration: none;
		color: var(--textColor);
		font-weight: 500;
		transition: color 0.3s;
	}

	.nav-link:hover {
		color: var(--primaryColor);
	}

	.header-cta {
		color: var(--cta);
	}

	.btn-header {
		padding: 0.75rem 1.5rem;
		background-color: var(--cta);
		color: var(--ctaText);
		text-decoration: none;
		border-radius: 8px;
		font-weight: 600;
		transition: 0.3s;
		box-shadow: var(--shadow3);
	}
	.btn-header:hover {
		background-color: var(--ctaHover);
		box-shadow: var(--shadow3);
		transform: scale(1.05);
	}

	/* Burger menu */
	.burger-menu {
		display: none;
		flex-direction: column;
		gap: 5px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
	}

	.burger-line {
		width: 25px;
		height: 3px;
		background-color: var(--ctaHover);
		transition: all 0.3s;
		border-radius: 2px;
	}

	.burger-line.open:nth-child(1) {
		transform: rotate(45deg) translate(8px, 8px);
	}

	.burger-line.open:nth-child(2) {
		opacity: 0;
	}

	.burger-line.open:nth-child(3) {
		transform: rotate(-45deg) translate(7px, -7px);
	}

	/* Menu mobile */
	.nav-mobile {
		display: none;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem 2rem 2rem;
		background-color: var(--headerBg);
		border-top: 1px solid var(--borderColor);
	}

	.nav-mobile.open {
		display: flex;
	}

	.nav-link-mobile {
		text-decoration: none;
		color: var(--textColor);
		font-weight: 500;
		padding: 0.75rem 0;
		transition: color 0.3s;
	}

	.nav-link-mobile:hover {
		color: var(--primaryColor);
	}

	.btn-header-mobile {
		padding: 0.75rem 1.5rem;
		background-color: var(--ctaPrimary);
		color: var(--ctaText);
		text-decoration: none;
		border-radius: 8px;
		font-weight: 600;
		text-align: center;
		margin-top: 1rem;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.nav-desktop,
		.header-cta {
			display: none;
		}

		.burger-menu {
			display: flex;
		}
	}
</style>
