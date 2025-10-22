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
		border-radius: 18px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 0;
		padding: 40px;
	}
	.footer-container {
		width: 100%;
	}
	.footer-brand {
		display: flex;
		flex-direction: column;
		align-items: baseline;
		justify-content: baseline;
		padding: 0;
	}
	.footer-social {
		display: flex;
		gap: 15px;
	}
	.poilu {
		height: 80px;
	}

	.footer-grid {
		padding: 20px;
		display: flex;
		align-items: flex-start;
		justify-content: space-around;
		gap: 50px;
	}

	.footer-links {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.footer-links a {
		text-decoration: none;
		color: var(--textColor);
	}

	.footer-list {
		list-style-type: none;
	}
	.footer-bottom {
		display: flex;
		align-content: center;
		justify-content: center;
		margin-top: 50px;
		font-size: 0.8rem;
	}
	.social-link {
		color: var(--cta);
	}


	@media (max-width: 768px) {
		.footer-grid {
			flex-direction: column;
			align-items: baseline;
			justify-content: center;
			gap: 30px;
		}
	
	}
</style>
