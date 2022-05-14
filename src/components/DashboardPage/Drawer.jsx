import { Link, Outlet } from 'react-router-dom';

export const Drawer = () => {
  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* <!-- Page content here --> */}
        <h1 className="text-2xl lg:text-4xl text-secondary font-medium text-center">Dashboard</h1>
        <Outlet />
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
          Open Sidebar
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          {/* <!-- Sidebar content here --> */}
          <li>
            <Link to="/dashboard">My Appointments</Link>
          </li>
          <li>
            <Link to="/dashboard/review">Review</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
