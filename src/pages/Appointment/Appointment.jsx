import { AppointmentBanner, AvailableAppointments } from '../../components';
import { useState } from 'react';

export const Appointment = () => {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <AppointmentBanner date={date} setDate={setDate} />
      <AvailableAppointments date={date} />
    </>
  );
};
