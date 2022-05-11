import { ReactComponent as Google } from '../../assets/icons/google.svg';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../config/firebase.config';
import { useEffect } from 'react';

export const SocialLogin = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <button onClick={() => signInWithGoogle()} className="btn btn-outline hover:bg-neutral">
      <div className="px-4 py-2">
        <Google />
      </div>

      <span className="w-5/6 px-4 py-3">{loading ? 'Logging in...' : 'Continue with Google'}</span>
    </button>
  );
};
