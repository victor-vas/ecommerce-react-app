/* eslint-disable prettier/prettier */
import React, { useState, useEffect, FormEvent } from 'react';
import {
  loadStripe,
  Stripe,
  StripeCardElement,
  StripeCardElementChangeEvent,
  StripeCardNumberElement,
} from '@stripe/stripe-js';
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from '@stripe/react-stripe-js';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Wrapper } from './styled';
import { useCartContext } from '../../context/cartContext';
import { useUserContext } from '../../context/userContext';
import formatPrice from '../../utils/formatPrice';

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY as string);

const CheckoutForm = () => {
  const { cart, totalAmount, shippingFee, clearCart } = useCartContext();
  const { myUser } = useUserContext();
  const history = useHistory();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState<string | boolean>('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe() as Stripe;
  const elements = useElements();

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  const createPaymentIntent = async () => {
    try {
      const { data } = await axios.post(
        '/.netlify/functions/create-payment-intent',
        JSON.stringify({ cart, totalAmount, shippingFee }),
      );

      setClientSecret(data.clientSecret);
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    createPaymentIntent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements?.getElement(CardElement) as
          | StripeCardElement
          | StripeCardNumberElement
          | { token: string }
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      setTimeout(() => {
        if (clearCart) clearCart();
        history.push('/');
      }, 10000);
    }
  };

  return (
    <div>
      {succeeded ? (
        <article>
          <h4>Thank you</h4>
          <h4>Your payment was successful!</h4>
          <h4>Redirecting to home page shortly</h4>
        </article>
      ) : (
        <article>
          <h4>
            Hello,
            {myUser && myUser.name}
          </h4>
          <p>{`Your total is, ${formatPrice(shippingFee + totalAmount)}`}</p>
          <p>Test Card Name: 4242 4242 4242 4242</p>
        </article>
      )}
      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <button
          type="submit"
          id="submit"
          disabled={(processing as boolean) || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div id="spinner" className="spinner" /> : 'Pay'}
          </span>
        </button>
        {/* Mostra qualquer erro que ocorra enquanto estiver processando o pagamento  */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        {/* Mostra uma menssagem de sucesso quando estiver completo */}
        <p className={succeeded ? 'result-message' : 'result-message hidden'}>
          {`Payment succeeded, see the result in your `}
          <a href="https://dashboard.stripe.com/test/payments">
            Stripe dashboard.
          </a>
          {` Refresh the page to pay again.`}
        </p>
      </form>
    </div>
  );
};

const StripeCheckout = () => {
  return (
    <Wrapper>
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </Wrapper>
  );
};

export default StripeCheckout;
