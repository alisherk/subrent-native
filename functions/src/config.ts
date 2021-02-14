import * as functions from 'firebase-functions';
export const stripeSecretKey = functions.config().stripe.key;
export const stripePublishableKey = functions.config().stripe.publishablekey;
