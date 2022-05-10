import { Link } from 'react-router-dom';
import { NavLinks } from './NavLinks';
import { ReactComponent as MenuBar } from '../../assets/icons/menuBar.svg';
export const Navbar = () => {
  return (
    <div className="navbar bg-base-100 max-w-[1366px] mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <MenuBar />
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <NavLinks />
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Doctors Portal
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <NavLinks />
        </ul>
      </div>
      <div className="navbar-end">
        <Link to="/login" className="btn">
          Login
        </Link>
      </div>
    </div>
  );
};
