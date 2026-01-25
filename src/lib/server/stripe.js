import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16' // Use top-level api version or the one you are comfortable with
});
