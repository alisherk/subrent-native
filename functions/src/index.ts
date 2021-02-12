import * as functions from 'firebase-functions';
import { generateStripeCheckout } from './generate-checkout';

export const generateStripePage = functions.https.onRequest(
  generateStripeCheckout
);
