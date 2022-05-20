import { Link } from 'react-router-dom';
import footer from '../../assets/images/footer.png';

export const Footer = () => {
  return (
    <footer
      className="py-10 lg:pt-32 lg:pb-10"
      style={{
        background: `url(${footer}) no-repeat center center`,
        backgroundSize: 'cover',
      }}
    >
      <div>
        <section className="footer text-neutral max-w-[1366px] mt-[-100px] mx-auto footer-center lg:footer">
          <div>
            <span className="footer-title">Services</span>
            <Link to="/" className="link link-hover capitalize">
              Emergency checkup
            </Link>
            <Link to="/" className="link link-hover capitalize">
              Monthly checkup
            </Link>
            <Link to="/" className="link link-hover capitalize">
              Weekly checkup
            </Link>
            <Link to="/" className="link link-hover capitalize">
              Deep checkup
            </Link>
          </div>
          <div>
            <span className="footer-title">Oral Health</span>
            <Link to="/" className="link link-hover capitalize">
              Fluoride treatment
            </Link>
            <Link to="/" className="link link-hover capitalize">
              Teeth whitening
            </Link>
            <Link to="/" className="link link-hover capitalize">
              Cavity feeling
            </Link>
          </div>
          <div>
            <span className="footer-title">Our Address</span>
            <p className="text-neutral">New York - 101010 Hudson</p>
          </div>
        </section>
      </div>
      <div className="footer-center pt-10">
        <p className="capitalize text-neutral">
          Copyright © {new Date().getFullYear()} - All right reserved
        </p>
      </div>
    </footer>
  );
};
