import { Navigate, Outlet } from 'react-router-dom';

export const UserExists = () => {
  const token = localStorage.getItem('dp_token');
  return token ? <Navigate to="/" replace /> : <Outlet />;
};
