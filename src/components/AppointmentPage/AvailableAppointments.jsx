import { format } from 'date-fns/esm';
import { useEffect, useState } from 'react';
import { AppointmentCard } from './AppointmentCard';
import { BookingModal } from './BookingModal';
import { useFetchData } from '../../hooks/useFetchData';
import { Spinner } from '../Shared/Spinner';
import { toast } from 'react-toastify';

const customId = 'toast';
export const AvailableAppointments = ({ date }) => {
  const { value: services, loading } = useFetchData('http://localhost:5000/services');

  const [treatment, setTreatment] = useState({});

  useEffect(() => {
    if (!services) {
      toast.error('Could not load services. Try reloading again', {
        toastId: customId,
      });
    }
  }, [services]);

  if (loading) {
    return (
      <div className="flex justify-center py-44">
        <Spinner />;
      </div>
    );
  }

  return (
    <section className="pb-[6.25rem] lg:py-20 mx-auto max-w-[1366px] px-5 lg:px-0">
      <h1 className="text-secondary text-2xl text-center">
        Available appointments on <span className="text-neutral">{format(date, 'PP')}</span>
      </h1>
      {services?.length === 0 ? (
        <div className="py-20 text-3xl text-center text-neutral font-semibold">
          Sorry, no services available currently. Try another day.
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14">
          {services?.map((service) => (
            <AppointmentCard key={service._id} service={service} setTreatment={setTreatment} />
          ))}
        </section>
      )}

      {treatment && <BookingModal treatment={treatment} setTreatment={setTreatment} date={date} />}
    </section>
  );
};
