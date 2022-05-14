import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ErrorMessage, SocialLogin } from '../../components';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { BiShow, BiHide } from 'react-icons/bi';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../config/firebase.config';
import { splitErrorMessage } from '../../helper/splitErrorMessage';
import { useToken } from '../../hooks/useToken';

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const [token] = useToken(user);

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (token) {
      navigate(state?.path || '/');
    }
  }, [token, state, navigate]);

  const onSubmit = async (data) => {
    await signInWithEmailAndPassword(data.email, data.password);
  };

  return (
    <div className="flex min-h-[80vh] justify-center items-center">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-semibold uppercase">Login</h2>
          {error && <ErrorMessage text={splitErrorMessage(error.message)} />}

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* EMAIL */}
            <div className="form-control w-full max-w-lg">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                aria-label="enter your email"
                className="input input-bordered w-full max-w-lg"
                {...register('email', {
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please provide valid email address',
                  },
                  required: {
                    value: true,
                    message: 'Please provide your email',
                  },
                })}
              />
              <label className="label">
                {errors.email?.type === 'required' && (
                  <span className="label-text-alt text-error">{errors.email.message}</span>
                )}
                {errors.email?.type === 'pattern' && (
                  <span className="label-text-alt text-error">{errors.email.message}</span>
                )}
              </label>
            </div>

            {/* PASSWORD */}
            <div className="form-control w-full max-w-lg">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  aria-label="enter your password"
                  className="input input-bordered w-full max-w-lg"
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'Please provide your password',
                    },
                    minLength: {
                      value: 6,
                      message: 'Must be 6 characters or longer',
                    },
                  })}
                />

                <div
                  className="absolute right-0 mr-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <BiHide className="text-lg text-neutral" />
                  ) : (
                    <BiShow className="text-lg text-neutral" />
                  )}
                </div>
              </div>
              <label className="label">
                {errors.password?.type === 'required' && (
                  <span className="label-text-alt text-error">{errors.password.message}</span>
                )}
                {errors.password?.type === 'minLength' && (
                  <span className="label-text-alt text-error">{errors.password.message}</span>
                )}
              </label>
            </div>

            <Link to="/forgot-password" className="mb-4 block hover:link w-max">
              <small>Forgot password?</small>
            </Link>

            {/* BUTTON */}
            <button
              className={`btn ${
                loading && 'loading'
              } w-full text-base-100 tracking-widest font-normal`}
            >
              {!loading && 'Login'}
            </button>
          </form>
          {/* FORM */}

          <p className="text-center pt-2">
            New to Doctors portal?{' '}
            <Link to="/register" className="text-secondary link">
              Create new account
            </Link>
          </p>
          <div className="divider">OR</div>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};
