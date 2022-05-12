import { useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SuccessMessage } from '../../components';
import auth from '../../config/firebase.config';

export const ForgotPassword = () => {
  const [email, setEmail] = useState([]);
  const [sendPasswordResetEmail, loading] = useSendPasswordResetEmail(auth);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.length === 0) {
      toast.error('Please provide email', {
        position: toast.POSITION.TOP_CENTER,
      });

      return;
    }

    await sendPasswordResetEmail(email);
    setMessage('Reset link sent. Please check your email');
  };
  return (
    <div className="bg-base-200 flex h-[80vh] justify-center items-center">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="card-title">Reset your password</div>
          {!message ? (
            <p className="text-[15px]">
              To reset your password, enter the email address you use to log in.
            </p>
          ) : (
            <SuccessMessage text={message} />
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Your email"
              className="bg-base-200 input w-full max-w-md my-5"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className={`btn ${
                loading && 'loading'
              } w-full text-base-100 tracking-widest font-normal`}
            >
              {!loading && 'Get reset link'}
            </button>
          </form>
          <Link to="/login" className="link text-sm pt-1">
            Take me back to login
          </Link>
        </div>
      </div>
    </div>
  );
};
