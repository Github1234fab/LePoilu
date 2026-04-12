<script>
    import { fade } from 'svelte/transition';
    import ChevronRightIcon from './icons/ChevronRightIcon.svelte';
</script>

<section class="bons-plans-section">
    <div class="bp-container">
        <header class="section-header">
            <span class="badge">LES BONS PLANS LOCAUX</span>
            <h2 class="section-title">Profite des offres exclusives de tes commerçants locaux.</h2>
            <p class="section-desc">
                Consulte les bons plans du Poilu, et présente l'appli en caisse pour en profiter !
            </p>
        </header>

        <div class="deals-preview">
            <!-- Cards remain identical -->
            <div class="deal-card card-1" in:fade={{delay: 100}}>
                <div class="card-image-bg"></div>
                <div class="card-content">
                    <span class="tag">Restauration</span>
                    <h3>Le Bistrot du Marché</h3>
                    <p>Un café offert pour tout menu déjeuner !</p>
                </div>
            </div>

            <div class="deal-card card-2" in:fade={{delay: 200}}>
                <div class="card-image-bg"></div>
                <div class="card-content">
                    <span class="tag">Boulangerie</span>
                    <h3>Au Fournil Lyonnais</h3>
                    <p>1 baguette offerte pour 3 achetées.</p>
                </div>
            </div>

            <div class="deal-card card-3" in:fade={{delay: 300}}>
                <div class="card-image-bg"></div>
                <div class="card-content">
                    <span class="tag">Mode & Style</span>
                    <h3>La P'tite Boutique</h3>
                    <p>-10% sur la nouvelle collection été.</p>
                </div>
            </div>
        </div>

        <div class="bp-cta-group">
            <a href="/carnet" class="btn-bp">
                Découvre tous les Bons Plans
                <div class="icon-arrow"><ChevronRightIcon /></div>
            </a>
            
            <div class="merchant-card-wrapper">
                <a href="/carnet/rejoindre" class="cta-card card-shop">
                    <span class="card-icon">🏪</span>
                    <span class="card-title">Création de vitrine</span>
                    <span class="card-desc">Crée ta vitrine locale et publie tes pépites</span>
                    <span class="card-cta">C'est parti ! →</span>
                </a>
            </div>
        </div>
    </div>
</section>

<style>
    .bons-plans-section {
        background: linear-gradient(135deg, #fff 0%, #fff5f2 100%);
        padding: 6rem 1.5rem;
        border-radius: 40px;
        margin-bottom: 4rem;
        overflow: hidden;
    }

    .bp-container {
        max-width: var(--desktop);
        margin: 0 auto;
    }

    .section-header {
        text-align: center;
        margin-bottom: 4rem;
    }

    .badge {
        display: inline-block;
        background: rgba(255, 97, 1, 0.1);
        color: var(--cta);
        font-weight: 800;
        font-size: 2.8rem;
        padding: 0.5rem 1.5rem;
        border-radius: 30px;
        margin-bottom: 1.5rem;
        letter-spacing: 1px;
    }

    @media (max-width: 768px) {
        .badge {
            font-size: 1.5rem;
            padding: 0.4rem 1.2rem;
        }
    }

    .section-title {
        font-family: var(--FFTitle);
        font-size: clamp(1.8rem, 5vw, 2.8rem);
        font-weight: 900;
        color: var(--textDark);
        line-height: 1.2;
        margin-bottom: 1.5rem;
    }

    .section-desc {
        color: var(--text);
        font-size: 1.1rem;
        max-width: 700px;
        margin: 0 auto;
        line-height: 1.6;
    }

    .deals-preview {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        margin-bottom: 4rem;
    }

    .deal-card {
        background: white;
        border-radius: 24px;
        height: 350px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 2rem;
        position: relative;
        overflow: hidden;
        border: 1px solid rgba(255, 97, 1, 0.1);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
        transition: transform 0.3s;
    }

    .deal-card:hover {
        transform: translateY(-10px);
    }

    .card-image-bg {
        position: absolute;
        inset: 0;
        background: linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.8) 100%);
        z-index: 1;
    }

    .card-1 { background-image: url('https://images.unsplash.com/photo-1550966841-3ee7adac1661?w=500&q=80'); background-size: cover; background-position: center; }
    .card-2 { background-image: url('https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80'); background-size: cover; background-position: center; }
    .card-3 { background-image: url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80'); background-size: cover; background-position: center; }

    .card-content {
        position: relative;
        z-index: 2;
        color: white;
    }

    .tag {
        font-size: 0.75rem;
        font-weight: 800;
        text-transform: uppercase;
        background: var(--cta);
        padding: 0.2rem 0.6rem;
        border-radius: 4px;
        margin-bottom: 0.75rem;
        display: inline-block;
    }

    .card-content h3 {
        font-family: var(--FFTitle);
        font-size: 1.4rem;
        margin: 0 0 0.5rem;
    }

    .card-content p {
        font-size: 0.95rem;
        opacity: 0.9;
        margin: 0;
    }

    .bp-cta-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3rem;
    }

    .btn-bp {
        background: var(--textDark);
        color: white;
        text-decoration: none;
        padding: 1.25rem 2.5rem;
        border-radius: 50px;
        font-weight: 800;
        display: flex;
        align-items: center;
        gap: 1rem;
        transition: transform 0.2s, background 0.2s;
    }

    .btn-bp:hover {
        background: var(--cta);
        transform: scale(1.05);
    }

    /* Original Merchant Card UI */
    .merchant-card-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .cta-card {
        background-color: white;
        border-radius: 24px;
        padding: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        text-decoration: none;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        transition: transform 0.2s, box-shadow 0.2s;
        min-width: 280px;
        max-width: 350px;
        border: 1px solid #f1f5f9;
	}

	.cta-card:hover {
		transform: translateY(-8px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
	}

	.card-icon {
		font-size: 3rem;
		margin-bottom: 15px;
	}

	.card-title {
		font-family: var(--FFTitle);
		font-weight: 800;
		font-size: 1.5rem;
		color: var(--textDark);
		margin-bottom: 10px;
	}

	.card-desc {
		font-size: 1rem;
		color: #64748b;
		margin-bottom: 20px;
		line-height: 1.4;
	}

	.card-cta {
		font-family: var(--FFTitle);
		font-weight: 800;
		background-color: #2563eb;
		color: white;
		padding: 0.8rem 2rem;
		border-radius: 50px;
		transition: background 0.2s;
	}

	.card-shop:hover .card-cta {
		background-color: #1d4ed8;
	}

    @media (max-width: 768px) {
        .deals-preview {
            grid-template-columns: 1fr;
        }
        
        .cta-card {
            min-width: 100%;
        }
    }

    .icon-arrow { width: 1.25rem; }

    @media (max-width: 900px) {
        .deals-preview {
            grid-template-columns: 1fr;
            max-width: 500px;
            margin: 0 auto 3rem;
        }
        .deal-card { height: 280px; }
    }
</style>
