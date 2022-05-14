import { Link, useNavigate } from 'react-router-dom';
import { ErrorMessage, SocialLogin } from '../../components';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { BiShow, BiHide } from 'react-icons/bi';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../config/firebase.config';
import { splitErrorMessage } from '../../helper/splitErrorMessage';
import { toast } from 'react-toastify';

const toastId = 'toast';
export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(
    auth,
    { sendEmailVerification: true }
  );
  const [updateProfile, , updateError] = useUpdateProfile(auth);

  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm();

  useEffect(() => {
    if (user) {
      navigate('/appointment');
      toast.success('Account created successfully', { toastId });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (updateError) {
      toast.error('Could not update profile name, try reloading', {
        toastId,
      });
    }
  }, [updateError]);

  useEffect(() => {
    if (isSubmitSuccessful && !error) {
      reset();
    }
  }, [isSubmitSuccessful, reset, error]);

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    if (user) {
      await updateProfile({ displayName: data.name });
    }
  };

  return (
    <div className="flex min-h-[80vh] justify-center items-center">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-semibold uppercase">Sign Up</h2>
          {error && <ErrorMessage text={splitErrorMessage(error.message)} />}

          {/* FORM STARTS HERE */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* NAME INPUT */}
            <div className="form-control w-full max-w-lg">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                aria-label="enter your name"
                className="input input-bordered w-full max-w-lg"
                {...register('name', {
                  required: {
                    value: true,
                    message: 'Please provide your name',
                  },
                })}
              />
              <label className="label">
                {errors.name?.type === 'required' && (
                  <span className="label-text-alt text-error">{errors.name.message}</span>
                )}
              </label>
            </div>

            {/* EMAIL INPUT */}
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

            {/* PASSWORD INPUT */}
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

            <button
              className={`btn ${
                loading && 'loading'
              } w-full text-base-100 tracking-widest font-normal`}
            >
              {!loading && 'Sign up'}
            </button>
          </form>
          {/* FORM ENDS HERE */}

          <p className="text-center pt-2">
            Already have an account?{' '}
            <Link to="/login" className="text-secondary link">
              Login
            </Link>
          </p>
          <div className="divider">OR</div>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};
