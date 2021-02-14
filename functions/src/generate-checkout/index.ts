import { Request, Response } from 'firebase-functions';
import { stripePublishableKey } from '../config';

export const generateStripeCheckout = async (req: Request, res: Response) => {
  res.send(checkoutHtmlPage(stripePublishableKey, req.query.sessionId));
};

function checkoutHtmlPage (stripePublicKey: string, sessionId: any) {
  return `<html>
    <style>
      .flex-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%; 
          flex-direction: column; 
       }
       h1 {
           font-size: 40px; 
           color: green; 
       }
    </style>
        <body>
          <!-- Load Stripe.js on your website. -->
          <script src="https://js.stripe.com/v3"></script>
          <div class="flex-container"> 
            <h1>...Loading Stripe</h1>
            <div id="error-message"></div>
          </div>
          <script>
            (function () {
              const stripe = Stripe('${stripePublicKey}');
              window.onload = function () {
                stripe.redirectToCheckout({
                  sessionId: '${sessionId}'
                })
                .then(function (result) {
                  if (result.error) {
                    var displayError = document.getElementById('error-message');
                    displayError.textContent = result.error.message;
                  }
                });
              };
            })();
          </script>
        </body>
      </html>`;
};
