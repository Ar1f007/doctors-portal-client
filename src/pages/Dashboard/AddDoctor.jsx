import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { Spinner } from '../../components';
import authFetch from '../../helper/axiosInstance';
const loading = false;
const phoneRegex =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const getServiceNames = async () => {
  const { data } = await authFetch('/services');

  return data;
};
export const AddDoctor = () => {
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm();

  const { data, isLoading } = useQuery('services', getServiceNames);

  const onSubmit = async (formData) => {
    console.log(formData);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-44">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl lg:text-2xl text-neutral lg:-mt-5 text-center font-medium">
        Add a New Doctor
      </h2>

      <div className="max-w-lg mx-auto mt-10 shadow-lg p-5 rounded-md">
        <h2 className="text-center text-medium text-xl uppercase">Fill up the information</h2>
        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* NAME */}
          <div className="form-control w-full max-w-lg">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              autoComplete="username"
              aria-label="enter doctor's name"
              className="input input-bordered w-full max-w-lg"
              {...register('name', {
                required: {
                  value: true,
                  message: "Please provide doctor's name",
                },
              })}
            />
            <label className="label">
              {errors.name?.type === 'required' && (
                <span className="label-text-alt text-error">{errors.name.message}</span>
              )}
            </label>
          </div>

          {/* EMAIL */}
          <div className="form-control w-full max-w-lg">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="username"
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

          {/* Specialty */}
          <div className="form-control w-full max-w-lg">
            <label className="label">
              <span className="label-text">Specialization</span>
            </label>
            <select
              {...register('specialty', {
                required: {
                  value: true,
                  message: "Please provide doctor's specialization",
                },
              })}
              aria-label="pick doctor's specialization field"
              className="font-normal select select-bordered w-full max-w-lg"
            >
              <option value="">Pick Specialty</option>
              {data?.map(({ _id, name }) => (
                <option key={_id} value={name}>
                  {name}
                </option>
              ))}
            </select>

            <label className="label">
              {errors.specialty?.type === 'required' && (
                <span className="label-text-alt text-error">{errors.specialty.message}</span>
              )}
            </label>
          </div>

          {/* PHONE */}
          <div className="form-control w-full max-w-lg">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <input
              type="text"
              name="phone"
              placeholder="Phone number"
              aria-label="enter doctor's phone number"
              className="input input-bordered w-full max-w-lg"
              {...register('phone', {
                required: {
                  value: true,
                  message: "Please provide doctor's phone number",
                },
                pattern: {
                  value: phoneRegex,
                  message: 'Not a valid phone number',
                },
              })}
            />
            <label className="label">
              {errors.phone?.type === 'required' && (
                <span className="label-text-alt text-error">{errors.phone.message}</span>
              )}
              {errors.phone?.type === 'pattern' && (
                <span className="label-text-alt text-error">{errors.phone.message}</span>
              )}
            </label>
          </div>

          {/* Image */}
          <div className="form-control w-full max-w-lg">
            <label className="label">
              <span className="label-text">Image</span>
            </label>

            <input
              type="file"
              {...register('image', {
                required: {
                  value: true,
                  message: 'Please put an image',
                },
              })}
              aria-label="pick an image of doctor"
              className="block w-full max-w-lg text-sm text-neutral file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-normal file:text-gray-700 hover:file:bg-neutral hover:file:text-base-100 hover:file:pointer focus:border-gray-300 cursor-pointer"
            />
            <label className="label">
              {errors.image?.type === 'required' && (
                <span className="label-text-alt text-error">{errors.image.message}</span>
              )}
            </label>
          </div>

          {/* BUTTON */}
          <button
            className={`btn ${
              loading && 'loading'
            } w-full text-base-100 tracking-widest font-normal`}
          >
            {!loading && 'Add'}
          </button>
        </form>
        {/* FORM */}
      </div>
    </div>
  );
};
