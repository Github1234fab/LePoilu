<script>
    import Poilu from "../../lib/assets/Poilu_mobile.png";
	let name = '';
	let email = '';
	let message = '';
	function submit(e) {
		e.preventDefault();
		// TODO: connecter à une action SvelteKit (form actions) ou service externe
		alert('Merci ! Nous revenons vers vous rapidement.');
	}
</script>

<svelte:head>
	<title>Contact — Le Poilu</title>
	<meta
		name="description"
		content="Contactez l’équipe du Poilu pour les partenariats, la presse ou le support."
	/>
</svelte:head>

<section class="wrap narrow">
	<h1>Contact</h1>
    <img src={Poilu} alt="le Poilu, le perosnnage mascotte de l'application"  style="height: 200px"/>
	<form class="form" on:submit={submit}>
		<label>
			<span>Nom</span>
			<input required bind:value={name} />
		</label>
		<label>
			<span>Email</span>
			<input type="email" required bind:value={email} />
		</label>
		<label>
			<span>Message</span>
			<textarea required rows="6" bind:value={message}></textarea>
		</label>
		<button type="submit" class="btn btn-dark">Envoyer</button>
	</form>
</section>

<style>
	.wrap {

		margin: 0 auto;
		padding: 48px 16px;
		color: #1c1c1c;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
     
	}
	.narrow {
		max-width: 720px;
	}
	h1 {
		font-size: 2rem;
		margin: 0 0 12px;
	}
	.form {
		display: grid;
		gap: 12px;
		margin-top: 12px;
        width: 100%;
	}
	label {
		display: grid;
		gap: 6px;
	}
	input,
	textarea {
		border: 1px solid #cfcfcf;
		border-radius: 10px;
		padding: 10px;
		font: inherit;
	}
	input:focus,
	textarea:focus {
		outline: 2px solid #0a84ff;
		outline-offset: 2px;
	}
	.btn {
		display: inline-block;
		padding: 10px 14px;
		border: 1px solid #1c1c1c;
		border-radius: 10px;
		text-decoration: none;
		color: #1c1c1c;
		width: max-content;
	}
	.btn-dark {
		background: #1c1c1c;
		color: #fff;
	}
</style>
