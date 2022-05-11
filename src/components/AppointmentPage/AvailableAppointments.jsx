import { format } from 'date-fns/esm';
import { useEffect, useState } from 'react';
import { AppointmentCard } from './AppointmentCard';

export const AvailableAppointments = ({ date }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('services.json')
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <section className="pb-[6.25rem] lg:py-20 mx-auto max-w-[1366px] px-5 lg:px-0">
      <h1 className="text-secondary text-2xl text-center">
        Available appointments on {format(date, 'PP')}
      </h1>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14">
        {services?.map((service) => (
          <AppointmentCard key={service._id} service={service} />
        ))}
      </section>
    </section>
  );
};
