import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import authFetch from '../../helper/axiosInstance';
import { Spinner } from '../../components';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

export const Payment = () => {
  const { id } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [appointmentInfo, setAppointmentInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await authFetch(`bookings/${id}?email=${location?.state?.email}`);

      setAppointmentInfo(data);
      setLoading(false);
    };
    fetchData();
  }, [id, location?.state]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      <div className="lg:mt-10 card max-w-lg mx-auto bg-slate-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-base font-bold text-gray-600">
            Hello {appointmentInfo?.patientName},
          </h1>
          <p className="text-gray-600">
            Please pay for{' '}
            <span className="font-medium text-secondary">{appointmentInfo?.treatment}</span>
          </p>
          <p>
            Your appointment:{' '}
            <span className="font-medium text-secondary">{appointmentInfo?.date}</span> at{' '}
            <span className="font-medium text-secondary">{appointmentInfo?.slot}</span>{' '}
          </p>
          <p>
            Service charge:{' '}
            <span className="text-secondary font-semibold">
              ${appointmentInfo?.price?.toFixed(2)}
            </span>
          </p>

          <div className="pt-5">
            <Elements stripe={stripePromise}>
              <CheckoutForm appointment={appointmentInfo} />
            </Elements>
          </div>
        </div>
      </div>
    </main>
  );
};
