import { json } from '@sveltejs/kit';
import { stripe } from '$lib/server/stripe';
import { env } from '$env/dynamic/private';

// However, standard practice for Stripe integration: 
// 1. Create Checkout Session with 'metadata' containing the ad/sponsor details.
// 2. Stripe Webhook (already existing cloud function) receives 'checkout.session.completed', reads metadata, and writes to Firebase.

export async function POST({ request, url, cookies }) {
    try {
        const { type, data, planId, submissionId, fromApp } = await request.json();
        const origin = url.origin;

        const fromAppCookie = cookies.get('from_app') === 'true';
        const isFromApp = fromApp || fromAppCookie;

        let sessionConfig = {
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${origin}/succes?session_id={CHECKOUT_SESSION_ID}${isFromApp ? '&from_app=true' : ''}`,
            cancel_url: `${origin}/contact?error=payment_cancelled`,
            metadata: {}, 
            client_reference_id: submissionId || data.userId // submissionId is crucial for webhook
        };

        if (data.email) {
            sessionConfig.customer_email = data.email;
        }

        if (type === 'ad') {
            // === ONE-OFF AD PAYMENT ===
            const priceInCents = planId === 'premium' ? 499 : 2499; 
            const productName = planId === 'premium' ? 'Évènement Premium' : 'Pack 10 Évènements';

            sessionConfig.line_items = [{
                price_data: {
                    currency: 'eur',
                    product_data: { name: productName },
                    unit_amount: priceInCents,
                },
                quantity: 1,
            }];

            // Metadata for Cloud Function (webhook expects submissionId)
            sessionConfig.metadata = {
                type: 'ad', // Matches default 'else' block in webhook that calls handleAdPayment
                submissionId: submissionId,
                planId: planId,
                userId: data.userId || 'guest'
            };

            // If it's a subscription like 'pack10' (credit pack), mode is still 'payment' (one-time)
            
        } else if (type === 'sponsor') {
            // === SPONSOR SUBSCRIPTION ===
            
            // Using IDs provided by USER from environment variables
            const isPremium = planId === 'premium';
            const priceId = isPremium ? env.STRIPE_PRICE_PREMIUM : env.STRIPE_PRICE_ESSENTIAL;
            
            sessionConfig.mode = 'subscription';
            sessionConfig.line_items = [{
                price: priceId,
                quantity: 1,
            }];

            sessionConfig.metadata = {
                type: 'sponsor',
                sponsorId: submissionId, 
                sponsorDocId: submissionId, // MATCHING WEBHOOK EXPECTATION
                businessName: data.companyName,
                category: data.category, 
                ownerName: data.contactName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                city: data.city,
                postalCode: data.zip,
                planId: isPremium ? 'visibility-monthly' : 'essential-monthly',
                website1: data.website1 || '',
                website2: data.website2 || '',
                description: data.description || '',
                promoOffer: data.promoOffer || '',
                openingHours: data.openingHours || '',
                userId: data.userId || 'guest'
            };
        } else if (type === 'credit_pack') {
            // === CREDIT PACK (10 ADS) ===
            // Maps to existing backend 'handlePlanPurchase' logic
            sessionConfig.line_items = [{
                price_data: {
                    currency: 'eur',
                    product_data: { name: 'Pack 10 Évènements Premium' },
                    unit_amount: 1990, // 19.90€
                },
                quantity: 1,
            }];

            sessionConfig.metadata = {
                type: 'plan', // ROUTING TO handlePlanPurchase
                planId: 'pack10',
                userId: data.userId,
                credits: '10', // Backend expects string
                duration: '0',
                badge: 'false'
            };

        } else if (type === 'unlimited_pass') {
            // === UNLIMITED PASS (30 DAYS) ===
            // Maps to existing backend 'handlePlanPurchase' logic
            sessionConfig.line_items = [{
                price_data: {
                    currency: 'eur',
                    product_data: { name: 'Pass Illimité 30 Jours' },
                    unit_amount: 3990, // 39.90€
                },
                quantity: 1,
            }];

            sessionConfig.metadata = {
                type: 'plan', // ROUTING TO handlePlanPurchase
                planId: 'unlimited30',
                userId: data.userId,
                credits: '0', 
                duration: '30', // Backend likely uses this for unlimited validity
                badge: 'true'
            };
        }

        const session = await stripe.checkout.sessions.create(sessionConfig);

        return json({ url: session.url });

    } catch (err) {
        console.error('Stripe Error:', err);
        return json({ error: err.message }, { status: 500 });
    }
}
