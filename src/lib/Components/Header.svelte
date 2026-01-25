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
			<a href="/carnet/rejoindre" class="nav-link">Espace Commerçant</a>
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
			<a href="/Fonctionnalités" class="nav-link-mobile" on:click={closeMenu}>Fonctionnalités</a>
			<a href="/Tarifs" class="nav-link-mobile" on:click={closeMenu}>Tarifs</a>
			<a href="/Apropos" class="nav-link-mobile" on:click={closeMenu}>À propos</a>
			<a href="/Contact" class="nav-link-mobile" on:click={closeMenu}>Contact</a>
			<a href="/carnet/rejoindre" class="nav-link-mobile" on:click={closeMenu}>Espace Commerçant</a>
			<a href="/Telecharger" class="nav-link-mobile" on:click={closeMenu}>Télécharger l'app</a>
		</nav>
	{/if}
</header>

<style>
	.header {
		border-radius: var(--radius-lg);
		background-color: var(--headerBg);
		backdrop-filter: blur(10px);
		z-index: 1000;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		position: sticky;
		top: 10px;
	}

	.header-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--spacing-sm) var(--spacing-md);
		max-width: var(--desktop);
		margin: 0 auto;
		border-radius: var(--radius-lg);
	}

	.header-logo {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	.poilu-img {
		height: 100px;
		transition: height var(--transition-normal);
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
		transition: color var(--transition-normal);
		position: relative;
	}

	.nav-link::after {
		content: '';
		position: absolute;
		bottom: -5px;
		left: 0;
		width: 0;
		height: 2px;
		background-color: var(--primaryColor);
		transition: width var(--transition-normal);
	}

	.nav-link:hover::after {
		width: 100%;
	}

	.nav-link:hover {
		color: var(--primaryColor);
	}

	.header-cta {
		flex-shrink: 0;
	}

	.btn-header {
		padding: 0.75rem 1.5rem;
		background-color: var(--cta);
		color: var(--ctaText);
		text-decoration: none;
		border-radius: var(--radius-sm);
		font-weight: 600;
		transition: all var(--transition-normal);
		box-shadow: var(--shadow3);
		white-space: nowrap;
	}

	.btn-header:hover {
		background-color: var(--ctaHover);
		box-shadow: var(--shadow);
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
		background-color: var(--cta);
		transition: all var(--transition-normal);
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
		gap: var(--spacing-sm);
		padding: var(--spacing-sm) var(--spacing-md) var(--spacing-md);
		background-color: var(--headerBg);
		backdrop-filter: blur(10px);
		border-top: 1px solid var(--borderColor);
		border-radius: 0 0 var(--radius-lg) var(--radius-lg);
		animation: slideDown var(--transition-normal);
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.nav-mobile.open {
		display: flex;
	}

	.nav-link-mobile {
		text-decoration: none;
		color: var(--textColor);
		font-weight: 500;
		padding: var(--spacing-sm) 0;
		transition: all var(--transition-normal);
		border-radius: var(--radius-sm);
	}

	.nav-link-mobile:hover {
		color: var(--primaryColor);
		padding-left: var(--spacing-xs);
		background-color: rgba(255, 183, 158, 0.1);
	}

	/* .btn-header-mobile {
		padding: 0.75rem 1.5rem;
		background-color: var(--ctaPrimary);
		color: var(--ctaText);
		text-decoration: none;
		border-radius: 8px;
		font-weight: 600;
		text-align: center;
		margin-top: 1rem;
	} */

	/* ===================================
	   MEDIA QUERIES RESPONSIVE
	   =================================== */

	/* Mobile: 768px et moins */
	@media (max-width: 768px) {
		.header-container {
			padding: var(--spacing-sm);
		}

		.poilu-img {
			height: 70px;
		}

		.nav-desktop,
		.header-cta {
			display: none;
		}

		.burger-menu {
			display: flex;
		}
	}

	/* Mobile Small: 480px et moins */
	@media (max-width: 480px) {
		.header {
			border-radius: var(--radius-md);
		}

		.header-container {
			padding: var(--spacing-xs) var(--spacing-sm);
		}

		.poilu-img {
			height: 60px;
		}

		.nav-mobile {
			padding: var(--spacing-sm);
		}
	}

	/* Tablet: 1024px et moins */
	@media (max-width: 1024px) and (min-width: 769px) {
		.nav-desktop {
			gap: 1.5rem;
		}

		.btn-header {
			padding: 0.6rem 1.2rem;
			font-size: 0.9rem;
		}
	}
</style>
