import * as functions from 'firebase-functions';
export const stripeKey = functions.config().stripe.key;
