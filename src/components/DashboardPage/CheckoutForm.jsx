import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import authFetch from '../../helper/axiosInstance';

export const CheckoutForm = ({ appointment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState('');
  const [cardSuccess, setCardSuccess] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [processing, setProcessing] = useState(false);

  const { _id, patientName, patientEmail, price } = appointment;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const fetchSecretKey = async () => {
      const { data } = await authFetch.post('/create-payment-intent', { price });
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      }
    };

    fetchSecretKey();
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setCardError(error.message);
    } else {
      setCardError('');
    }

    setProcessing(true);

    const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: patientName,
          email: patientEmail,
        },
      },
    });

    if (intentError) {
      setCardError(intentError.message);
      setCardSuccess('');
      setProcessing(false);
    } else {
      setCardError('');
      setCardSuccess('You payment is completed!');
      setTransactionId(paymentIntent.id);
      setProcessing(false);

      const payment = {
        appointment: _id,
        transactionId: paymentIntent.id,
      };
      await authFetch.patch(`/update-booking/${_id}`, payment);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="rounded p-3 shadow bg-gray-100">
        <div className="py-3">
          <CardElement />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-3 btn btn-secondary btn-sm w-full text-base-100 tracking-widest font-medium"
            disabled={!stripe || !elements || !clientSecret}
          >
            {processing ? 'Processing...' : 'Proceed'}
          </button>
        </div>
      </form>
      {cardError && <p className="mt-3 text-error font-medium">{cardError}</p>}
      {cardSuccess && <p className="mt-3 text-success font-medium">{cardSuccess}</p>}
      {transactionId && (
        <p className="mt-3 font-medium">
          Your transaction id is: <span className="text-orange-700">{transactionId}</span>
        </p>
      )}
    </>
  );
};
