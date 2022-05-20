import { Link } from 'react-router-dom';
import img from '../../assets/images/404.svg';
export const PageNotFound = () => {
  return (
    <section className="py-10 px-3 min-h-screen absolute top-0 right-0 left-0 bottom-0 z-10 bg-gray-50 flex flex-col  items-center lg:py-20">
      <img src={img} alt="" className="w-full max-w-xl" />
      <h1 className="text-xl lg:text-3xl text-neutral font-bold mt-5 text-center">
        Looks like you found the great door way of nothing!
      </h1>
      <p className="text-base font-medium text-center my-5">
        The page you are trying to visit is not found or it's probably taken down currently!
      </p>

      <div>
        <Link to="/" className="btn btn-primary text-neutral">
          Go back to Homepage
        </Link>
      </div>
    </section>
  );
};
