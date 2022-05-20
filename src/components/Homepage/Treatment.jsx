import { useNavigate } from 'react-router-dom';
import treatment from '../../assets/images/treatment.png';
import { Button } from '../Shared/Button';

export const Treatment = () => {
  const navigate = useNavigate();

  const navigateToAppointment = () => {
    navigate('/appointment');
  };

  return (
    <div className="mx-auto max-w-[1366px] hero bg-base-100 pb-20 lg:pb-28 px-6 lg:px-0">
      <div className="hero-content flex-col lg:flex-row">
        <img
          loading="lazy"
          src={treatment}
          className="w-[90%] max-w-md rounded-lg shadow-2xl mb-4 lg:mb-0"
          alt="A boy is getting treatment"
        />
        <div className="lg:pl-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral">
            Exceptional Dental Care, on Your Terms
          </h1>
          <p className="py-6 lg:pr-20">
            It is a long established fact that a reader will be distracted by the readable content
            of a page when looking at its layout. The point of using Lorem Ipsumis that it has a
            more-or-less normal distribution of letters,as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing packages and web
            page
          </p>
          <Button text="get started" navigateToAppointment={navigateToAppointment} />
        </div>
      </div>
    </div>
  );
};
