import { Link } from 'react-router-dom';

export const Button = ({ text, link }) => {
  return (
    <>
      {link ? (
        <Link
          to={link}
          className="btn text-base-100 font-bold bg-gradient-to-r from-secondary to-primary btn-primary hover:border-primary hover:bg-gradient-to-l"
        >
          {text}
        </Link>
      ) : (
        <button className="btn text-base-100 font-bold bg-gradient-to-r from-secondary to-primary btn-primary hover:border-primary hover:bg-gradient-to-l">
          {text}
        </button>
      )}
    </>
  );
};
