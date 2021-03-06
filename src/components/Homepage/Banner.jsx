import { useNavigate } from 'react-router-dom';
import chair from '../../assets/images/chair.png';
import { Button } from '../Shared/Button';

export const Banner = () => {
  const navigate = useNavigate();

  const navigateToAppointment = () => {
    navigate('/appointment');
  };

  return (
    <div
      className="mx-auto lg:h-[90vh] max-w-[1366px] hero bg-base-100 pt-10
    lg:bg-[url('https://i.ibb.co/XWFkJ6H/bg.png')]"
    >
      <div className="hero-content flex-col lg:flex-row-reverse lg:px-0">
        <img src={chair} className="w-full max-w-xl rounded-lg shadow-2xl" alt="chair" />
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral">
            Your New Smile Starts Here
          </h1>
          <p className="py-6 lg:pr-20">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
          <Button text="get started" navigateToAppointment={navigateToAppointment} />
        </div>
      </div>
    </div>
  );
};
