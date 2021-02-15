import { createCallableFunction, Functions } from './utils';

type StripeSessionParams = {
  duration: number;
  rentalId: string;
  timestamp: number;
  price_choice: string;
}

type StripeSessionResult = {
  sessionId: string;
}

export const createStripeSession = createCallableFunction<
  StripeSessionParams,
  StripeSessionResult
>(Functions.createSession);

