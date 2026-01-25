import { json } from '@sveltejs/kit';
import { stripe } from '$lib/server/stripe';
// However, standard practice for Stripe integration: 
// 1. Create Checkout Session with 'metadata' containing the ad/sponsor details.
// 2. Stripe Webhook (already existing cloud function) receives 'checkout.session.completed', reads metadata, and writes to Firebase.

export async function POST({ request, url }) {
    try {
        const { type, data, planId, submissionId } = await request.json();
        const origin = url.origin;

        let sessionConfig = {
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${origin}/succes?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/contact?error=payment_cancelled`,
            metadata: {}, 
            client_reference_id: submissionId || data.userId // submissionId is crucial for webhook
        };

        if (type === 'ad') {
            // === ONE-OFF AD PAYMENT ===
            const priceInCents = planId === 'premium' ? 499 : 2499; 
            const productName = planId === 'premium' ? 'Annonce Premium' : 'Pack 10 Annonces';

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
            
            // Using IDs provided by USER from SponsorPlans collection
            const isPremium = planId === 'premium';
            const stripePriceId = isPremium 
                ? 'price_1SZH5wPfye1CgJxxSmxi0j5J'  // visibility-monthly
                : 'price_1SZH4YPfye1CgJxxudmSxxuG'; // essential-monthly
            
            sessionConfig.mode = 'subscription';
            sessionConfig.line_items = [{
                price: stripePriceId,
                quantity: 1,
            }];

            sessionConfig.metadata = {
                type: 'sponsor',
                businessName: data.companyName,
                category: data.category, // Added category to metadata
                ownerName: data.contactName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                city: data.city,
                postalCode: data.zip,
                // Matching planId from SponsorPlans
                planId: isPremium ? 'visibility-monthly' : 'essential-monthly',
                // New fields
                website1: data.website1 || '',
                website2: data.website2 || '',
                description: data.description || '',
                promoOffer: data.promoOffer || '',
                openingHours: data.openingHours || '',
                userId: data.userId || 'guest'
            };
        }

        const session = await stripe.checkout.sessions.create(sessionConfig);

        return json({ url: session.url });

    } catch (err) {
        console.error('Stripe Error:', err);
        return json({ error: err.message }, { status: 500 });
    }
}
