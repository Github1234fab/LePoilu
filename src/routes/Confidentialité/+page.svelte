<script>
	import Poilu from '/LePoilu-face.png';
</script>

<svelte:head>
	<title>Mentions légales & confidentialité — Le Poilu</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="wrap narrow prose">
	<img src={Poilu} alt="Personnage le Poilu" style="height: 200px" />
	<h1>Mentions légales & confidentialité</h1>

	<h2>Éditeur</h2>
	<p>
		L’application et le site <strong>Le Poilu</strong> sont édités par :
		<strong>GRALYPHO</strong><br />
		<!-- Adresse : [Adresse complète]<br /> -->
		Email : contact@gralypho.com<br />
		SIRET : 518 296 330            00021<br />
		Directeur de la publication : Fabien MARCEAU
	</p>

	<h2>Hébergement</h2>
	<p>
		L’application et le site sont hébergés par :<br />
		<strong>NETLIFY</strong><br />
		Site web : [Lien du site hébergeur]<br />
	</p>

	<h2>Propriété intellectuelle</h2>
	<p>
		L’ensemble des éléments du service <strong>Le Poilu</strong> (textes, graphismes, logo, design, structure,
		code source, images, etc.) sont protégés par le droit de la propriété intellectuelle et restent la
		propriété exclusive de l’éditeur, sauf mention contraire. Toute reproduction, diffusion ou réutilisation,
		totale ou partielle, sans autorisation écrite préalable, est interdite.
	</p>

	<h2>Protection des données (RGPD)</h2>
	<p>
		L’éditeur du service <strong>Le Poilu</strong> s’engage à ce que la collecte et le traitement des
		données personnelles soient conformes au Règlement Général sur la Protection des Données (RGPD) et
		à la loi française « Informatique et Libertés ». Les données collectées (par exemple : adresse e-mail,
		nom, informations de compte, préférences d’événements) sont utilisées uniquement pour le bon fonctionnement
		du service : gestion des comptes utilisateurs, publication et modération d’événements, envoi de notifications
		ou d’informations liées à l’utilisation de l’application.
	</p>

	<p>
		La base légale du traitement repose sur le consentement de l’utilisateur ou sur l’exécution d’un
		contrat (utilisation du service). Les données sont conservées pour une durée limitée, le temps
		nécessaire à la fourniture du service et au respect des obligations légales. L’utilisateur
		dispose d’un droit d’accès, de rectification, d’opposition, de suppression et de portabilité de
		ses données, qu’il peut exercer à tout moment via le formulaire de contact ou en écrivant à :
		<strong>contact@gralypho.com</strong>.
	</p>

	<p>
		En cas de doute ou de réclamation, l’utilisateur peut contacter la <strong>CNIL</strong>
		(Commission Nationale de l’Informatique et des Libertés) sur
		<a href="https://www.cnil.fr">www.cnil.fr</a>.
	</p>

	<h2>Cookies</h2>
	<p>
		Le site et l’application <strong>Le Poilu</strong> utilisent des cookies uniquement pour assurer
		le bon fonctionnement technique du service et mesurer l’audience (statistiques anonymisées). Aucun
		cookie publicitaire ou de traçage tiers n’est utilisé sans le consentement préalable de l’utilisateur.
		L’utilisateur peut à tout moment accepter, refuser ou paramétrer l’utilisation des cookies via le
		bandeau prévu à cet effet.
	</p>

	<h2>Responsabilité</h2>
	<p>
		L’éditeur du service <strong>Le Poilu</strong> met tout en œuvre pour assurer l’exactitude et la
		mise à jour des informations diffusées, mais ne peut être tenu responsable des erreurs, omissions
		ou indisponibilités du service. L’utilisateur reconnaît utiliser le service sous sa propre responsabilité.
	</p>

	<h2>Contact</h2>
	<p>
		Pour toute question concernant les présentes mentions légales ou la politique de
		confidentialité, vous pouvez contacter :
		<strong>contact@gralypho.com</strong>.
	</p>
</section>

<style>
	.wrap {
		max-width: 900px;
		margin: 0 auto;
		padding: 48px 16px;
		color: #1c1c1c;
	}
	.narrow {
		max-width: 720px;
	}
	h1 {
		font-size: 2rem;
		margin: 0 0 12px;
	}
	h2 {
		font-size: 1.25rem;
		margin: 24px 0 8px;
	}
	p {
		color: #444;
		line-height: 1.65;
	}
</style>
