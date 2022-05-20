import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../config/firebase.config';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Spinner } from '../Shared/Spinner';
import { toast } from 'react-toastify';

export const PrivateRoute = () => {
  const [user, loading, error] = useAuthState(auth);
  const location = useLocation();

  if (error) {
    toast.error('Could not validate. Please login');
    return <Navigate to="/login" replace state={{ path: location.pathname }} />;
  }

  if (loading) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ path: location.pathname }} />;
  }

  return <Outlet />;
};
