import { useNavigate } from 'react-router-dom';
import doctor from '../../assets/images/doctor.png';
import { Button } from '../Shared/Button';

export const Appointment = () => {
  const navigate = useNavigate();

  const navigateToAppointment = () => {
    navigate('/appointment');
  };
  return (
    <section className="lg:pt-20 pb-12">
      <section className="flex justify-center items-center py-12 px-9 lg:py-0 lg:px-0 bg-[url('https://i.ibb.co/hXvVCKX/appointment.png')]">
        <figure className="flex-1 mt-[-150px] hidden lg:flex justify-center">
          <img src={doctor} alt="doctor" className="max-h-[600px]" />
        </figure>
        <div className="flex-1">
          <h2 className="text-xl text-secondary font-bold mb-3">Appointment</h2>
          <h3 className="text-3xl font-semibold text-base-100 mb-3">Make an appointment Today</h3>
          <p className="text-base-100 text-base mb-5 lg:pr-36">
            It is a long established fact that a reader will be distracted by the readable content
            of a page when looking at its layout. The point of using Lorem Ipsumis that it has a
            more-or-less normal distribution of letters,as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing packages and web
            page
          </p>
          <Button text="get started" navigateToAppointment={navigateToAppointment} />
        </div>
      </section>
    </section>
  );
};
