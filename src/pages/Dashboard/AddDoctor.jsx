import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { Spinner } from '../../components';
import authFetch from '../../helper/axiosInstance';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const loading = false;
const phoneRegex =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const getServiceNames = async () => {
  const { data } = await authFetch('/services');

  return data;
};
const toastId = 'id-1';

// component
export const AddDoctor = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { data, isLoading } = useQuery('services', getServiceNames);

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append('file', values.image[0]);
    formData.append('upload_preset', 'xg2wgbbh');

    const postImage = async () => {
      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dv3wezqsc/image/upload',
          formData
        );

        if (response.data.secure_url) {
          const img = response.data.secure_url;

          const doctorInfo = {
            name: values.name,
            email: values.email,
            specialty: values.specialty,
            phone: values.phone,
            img,
          };

          const { data } = await authFetch.post('/doctors', doctorInfo);

          if (data.insertedId) {
            MySwal.fire({
              title: <strong className="text-neutral font-medium">Success!</strong>,
              icon: 'success',
              confirmButtonColor: '#19D3AE',
            });

            reset();
          }
        }
      } catch (error) {
        if (error.response.status === 424) {
          toast.error(error.response.data, {
            toastId,
          });
        } else {
          toast.error('Could not add a doctor.', {
            toastId,
          });
        }
      }
    };

    postImage();
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
                validate: (value) => value[0].size <= 2000000,
              })}
              aria-label="pick an image of doctor"
              className="block w-full max-w-lg text-sm text-neutral file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-normal file:text-gray-700 hover:file:bg-neutral hover:file:text-base-100 hover:file:pointer focus:border-gray-300 cursor-pointer"
            />
            <label className="label">
              {errors.image?.type === 'required' && (
                <span className="label-text-alt text-error">{errors.image.message}</span>
              )}
              {errors.image?.type === 'validate' && (
                <span className="label-text-alt text-error">
                  Image should not be larger than 2mb in size
                </span>
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
