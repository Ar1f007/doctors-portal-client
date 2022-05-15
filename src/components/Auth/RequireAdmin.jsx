import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import auth from '../../config/firebase.config';
import { useCheckAdmin } from '../../hooks/useCheckAdmin';
import { Spinner } from '../Shared/Spinner';

export const RequireAdmin = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [admin, checkingStatus] = useCheckAdmin(user);

  if (loading || checkingStatus) {
    return (
      <div className="flex justify-center py-44">
        <Spinner />
      </div>
    );
  }

  if (!admin || !user) {
    signOut(auth);
    localStorage.removeItem('dp_token');
    return <Navigate to="/login" replace />;
  }
  return children;
};
