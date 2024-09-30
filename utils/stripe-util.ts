import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY;

if(!secretKey) {
  throw new Error("Stripe secret key not provided.")
}

export const stripe = new Stripe(secretKey, {
  apiVersion: "2024-06-20",
});
