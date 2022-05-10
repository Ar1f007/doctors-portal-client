import chair from '../../assets/images/chair.png';

export const Banner = () => {
  return (
    <div
      className="hero bg-base-100 py-16 lg:pt-[250px] lg:pb-32 
    lg:bg-[url('https://i.ibb.co/XWFkJ6H/bg.png')]"
    >
      <div className="hero-content flex-col lg:flex-row-reverse lg:px-0">
        <img src={chair} className="w-full max-w-xl rounded-lg shadow-2xl" alt="chair" />
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Your New Smile Starts Here</h1>
          <p className="py-6 lg:pr-20">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
          <button className="btn text-base-100 font-bold bg-gradient-to-r from-secondary to-primary btn-primary hover:border-primary hover:bg-gradient-to-l">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};
