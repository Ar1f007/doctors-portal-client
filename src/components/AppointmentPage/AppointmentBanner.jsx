import chair from '../../assets/images/chair.png';
import { DayPicker } from 'react-day-picker';

export const AppointmentBanner = ({ date, setDate }) => {
  let footer = <p className="mt-3">Please select a date.</p>;
  return (
    <div className="hero min-h-screen bg-base-100 lg:bg-[url('https://i.ibb.co/XWFkJ6H/bg.png')]">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={chair} className="w-full max-w-xl rounded-lg shadow-2xl" alt="chair" />
        <div className="lg:px-20">
          <DayPicker mode="single" selected={date} onDayClick={setDate} footer={footer} />
        </div>
      </div>
    </div>
  );
};
