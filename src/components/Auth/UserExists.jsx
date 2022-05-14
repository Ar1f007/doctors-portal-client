import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet } from 'react-router-dom';
import auth from '../../config/firebase.config';
import { Spinner } from '../Shared/Spinner';

export const UserExists = () => {
  const [user, loading] = useAuthState(auth);
  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );

  if (user) return <Navigate to="/" replace />;

  return <Outlet />;
};
