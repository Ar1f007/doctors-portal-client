import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="p-10">
      <div>
        <section className="footer text-neutral max-w-[1366px] mx-auto footer-center lg:footer">
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
