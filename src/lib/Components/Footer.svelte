<script>
	export let appName = 'Le Poilu';
	import Poilu from '../assets/Poilu_mobile.png';
	export let socialLinks = {
		facebook: '#',
		instagram: '#',
		twitter: '#'
	};

	const currentYear = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="footer-container">
		<div class="footer-grid">
			<div class="footer-brand">
				<img class="poilu" src={Poilu} alt="le poilu personnage" />
				<!-- <p class="footer-tagline">Tous les événements de ta région, en un seul endroit</p> -->
				<div class="footer-social">
					<a href={socialLinks.facebook} class="social-link" aria-label="Facebook">
						<span><i class="fa-brands fa-facebook"></i></span>
					</a>
					<a href={socialLinks.instagram} class="social-link" aria-label="Instagram">
						<span><i class="fa-brands fa-square-instagram"></i></span>
					</a>
					<a href={socialLinks.twitter} class="social-link" aria-label="Twitter">
						<span><i class="fa-brands fa-square-x-twitter"></i></span>
					</a>
				</div>
			</div>

			<div class="footer-links">
				<h4 class="footer-heading">Application</h4>
				<ul class="footer-list">
					<li><a href="/Fonctionnalités" class="footer-link">Fonctionnalités</a></li>
					<li><a href="/Telecharger" class="footer-link">Télécharger</a></li>
					<li><a href="/Tarifs" class="footer-link">Tarifs</a></li>
				</ul>
			</div>

			<div class="footer-links">
				<h4 class="footer-heading">Entreprise</h4>
				<ul class="footer-list">
					<li><a href="/Apropos" class="footer-link">À propos</a></li>
					<li><a href="/Contact" class="footer-link">Contact</a></li>
				</ul>
			</div>

			<div class="footer-links">
				<h4 class="footer-heading">Légal</h4>
				<ul class="footer-list">
					<li><a href="/Confidentialité" class="footer-link">Confidentialité</a></li>
					<li><a href="/CGU" class="footer-link">CGU</a></li>
					<li><a href="/Confidentialité" class="footer-link">Mentions légales</a></li>
				</ul>
			</div>
		</div>

		<div class="footer-bottom">
			<p class="footer-copyright">
				© {currentYear}
				{appName}. Tous droits réservés.
			</p>
		</div>
	</div>
</footer>

<style>
	.footer {
		background-color: var(--background);
		border-radius: var(--radius-lg);
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 0;
		padding: var(--spacing-xl);
		margin-top: var(--spacing-xl);
	}

	.footer-container {
		width: 100%;
		max-width: var(--desktop);
		margin: 0 auto;
	}

	.footer-brand {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		gap: var(--spacing-md);
		padding: 0;
	}

	.footer-social {
		display: flex;
		gap: var(--spacing-sm);
	}

	.poilu {
		height: clamp(60px, 8vw, 80px);
		transition: transform var(--transition-normal);
	}

	.poilu:hover {
		transform: scale(1.05);
	}

	.footer-grid {
		padding: var(--spacing-md);
		display: flex;
		align-items: flex-start;
		justify-content: space-around;
		gap: var(--spacing-xl);
		flex-wrap: wrap;
	}

	.footer-heading {
		font-family: var(--FFTitle);
		font-weight: 700;
		color: var(--textDark);
		margin-bottom: var(--spacing-sm);
		font-size: 1.1rem;
	}

	.footer-links {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		min-width: 150px;
	}

	.footer-link {
		text-decoration: none;
		color: var(--textColor);
		transition: all var(--transition-normal);
		padding: var(--spacing-xs) 0;
		display: inline-block;
	}

	.footer-link:hover {
		color: var(--primaryColor);
		padding-left: var(--spacing-xs);
	}

	.footer-list {
		list-style-type: none;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.footer-bottom {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: var(--spacing-xl);
		padding-top: var(--spacing-md);
		border-top: 1px solid var(--borderColor);
	}

	.footer-copyright {
		font-size: clamp(0.75rem, 1.5vw, 0.9rem);
		color: var(--text);
		text-align: center;
	}

	.social-link {
		color: var(--cta);
		font-size: 1.5rem;
		transition: all var(--transition-normal);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: var(--radius-sm);
	}

	.social-link:hover {
		color: var(--ctaHover);
		background-color: rgba(217, 70, 122, 0.1);
		transform: translateY(-3px);
	}


	/* ===================================
	   MEDIA QUERIES RESPONSIVE
	   =================================== */

	/* Tablet: 1024px et moins */
	@media (max-width: 1024px) {
		.footer {
			padding: var(--spacing-lg);
		}

		.footer-grid {
			gap: var(--spacing-lg);
		}
	}

	/* Mobile: 768px et moins */
	@media (max-width: 768px) {
		.footer {
			padding: var(--spacing-md);
			border-radius: var(--radius-md);
		}

		.footer-grid {
			flex-direction: column;
			align-items: flex-start;
			justify-content: flex-start;
			gap: var(--spacing-lg);
			padding: var(--spacing-sm);
		}

		.footer-brand {
			width: 100%;
			align-items: center;
		}

		.footer-links {
			width: 100%;
		}

		.footer-bottom {
			margin-top: var(--spacing-md);
		}
	}

	/* Mobile Small: 480px et moins */
	@media (max-width: 480px) {
		.footer {
			padding: var(--spacing-sm);
			border-radius: var(--radius-sm);
		}

		.footer-grid {
			gap: var(--spacing-md);
			padding: var(--spacing-xs);
		}

		.footer-social {
			width: 100%;
			justify-content: center;
		}

		.social-link {
			width: 35px;
			height: 35px;
			font-size: 1.3rem;
		}
	}
</style>
