import { Link, Outlet, useLocation } from 'react-router-dom';

export const Drawer = () => {
  const location = useLocation();

  const matchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  return (
    <div className="drawer drawer-mobile mt-3 lg:border border-base-200 ">
      <input id="sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content py-[.92rem] border-t-[1px] lg:border-t-0">
        <div className="navbar lg:bg-transparent">
          <div className="navbar-start w-max">
            <label htmlFor="sidebar" tabIndex="1" className="btn btn-ghost lg:hidden">
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
        <Outlet />

        {/* <!-- Page content here --> */}
      </div>
      <div className="drawer-side">
        <label htmlFor="sidebar" className="drawer-overlay"></label>
        <ul className="lg:bg-gray-50 menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
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
              to="/dashboard/review"
              className={
                matchRoute('/dashboard/review') ? 'bg-primary' : 'bg-transparent hover:bg-base-200'
              }
            >
              Review
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
