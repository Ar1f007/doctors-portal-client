import chair from '../../assets/images/chair.png';
import { DayPicker } from 'react-day-picker';

import { useState } from 'react';
import { format } from 'date-fns';

export const AppointmentBanner = () => {
  const [date, setDate] = useState();

  let footer = <p className="text-neutral font-medium py-2">Please pick a day.</p>;
  if (date) {
    footer = <p className="text-neutral font-medium py-2">You picked {format(date, 'PP')}.</p>;
  }
  return (
    <div className="hero min-h-screen bg-base-100 lg:bg-[url('https://i.ibb.co/XWFkJ6H/bg.png')]">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={chair} className="w-full max-w-xl rounded-lg shadow-2xl" alt="chair" />
        <div className="lg:px-20">
          <DayPicker mode="single" selected={date} onSelect={setDate} footer={footer} />
        </div>
      </div>
    </div>
  );
};
