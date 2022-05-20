import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet, useLocation } from 'react-router-dom';
import auth from '../../config/firebase.config';
import { useCheckAdmin } from '../../hooks/useCheckAdmin';
import { Spinner } from '../Shared/Spinner';

export const Drawer = () => {
  const [user, loading] = useAuthState(auth);
  const [admin] = useCheckAdmin(user);
  const location = useLocation();

  const matchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-44">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="drawer drawer-mobile mt-3 lg:border border-base-200 ">
      <input id="sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content py-[.92rem] border-t-[1px] lg:border-t-0">
        <div className="navbar lg:bg-transparent">
          <div className="navbar-start w-max">
            <label htmlFor="sidebar" tabIndex="0" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
          </div>
          <div className="flex-1 justify-center navbar-center">
            <h1 className="uppercase text-base lg:text-xl font-bold text-primary">
              Welcome to your Dashboard
            </h1>
          </div>
        </div>
        {/* <!-- Page content here --> */}
        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="sidebar" className="drawer-overlay"></label>
        <ul className="lg:bg-gray-50 menu p-4 overflow-y-auto w-max lg:w-[18.5rem] bg-base-100 text-base-content">
          {/* <!-- Sidebar content here --> */}
          <li>
            <Link
              to="/dashboard"
              className={
                matchRoute('/dashboard') ? 'bg-primary' : 'bg-transparent hover:bg-base-200'
              }
            >
              My Appointments
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/reviews"
              className={
                matchRoute('/dashboard/reviews') ? 'bg-primary' : 'bg-transparent hover:bg-base-200'
              }
            >
              Reviews
            </Link>
          </li>

          {admin && (
            <>
              <li>
                <Link
                  to="/dashboard/users"
                  className={
                    matchRoute('/dashboard/users')
                      ? 'bg-primary'
                      : 'bg-transparent hover:bg-base-200'
                  }
                >
                  All Users
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/add-doctor"
                  className={
                    matchRoute('/dashboard/add-doctor')
                      ? 'bg-primary'
                      : 'bg-transparent hover:bg-base-200'
                  }
                >
                  Add Doctor
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/manage-doctors"
                  className={
                    matchRoute('/dashboard/manage-doctors')
                      ? 'bg-primary'
                      : 'bg-transparent hover:bg-base-200'
                  }
                >
                  Manage Doctors
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
