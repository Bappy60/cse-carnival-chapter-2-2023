import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import MakePayment from './MakePayment';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51NW200FWCeACHFzeNmRLaay10RsG9IEwlqP8VnEAsc5anhkITMoaLQYnsm4QWA5WhTcLih5JzkIObVSNia11hp1d00xj8iCGKH'
);

export default function CorporatePayment({data}) {
    return (
      <Elements stripe={stripePromise}>
   <MakePayment data={data}/>
      </Elements>
    )}  