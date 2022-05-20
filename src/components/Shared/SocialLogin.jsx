import { ReactComponent as Google } from '../../assets/icons/google.svg';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../config/firebase.config';
import { Navigate, useLocation } from 'react-router-dom';
import { splitErrorMessage } from '../../helper/splitErrorMessage';
import { toast } from 'react-toastify';
import { useToken } from '../../hooks/useToken';

const customId = 'toast';
export const SocialLogin = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [token] = useToken(user);
  const { state } = useLocation();

  if (token) {
    return <Navigate to={state?.path || '/'} replace />;
  }

  if (error) {
    if (!splitErrorMessage(error.message).includes('popup closed')) {
      toast.error(splitErrorMessage(error.message), {
        position: toast.POSITION.TOP_CENTER,
        toastId: customId,
      });
    }
  }

  return (
    <button onClick={() => signInWithGoogle()} className="btn btn-outline hover:bg-neutral">
      <div className="px-4 flex items-center gap-3">
        <Google /> <p>{loading ? 'Logging in...' : 'Continue with Google'}</p>
      </div>
    </button>
  );
};
