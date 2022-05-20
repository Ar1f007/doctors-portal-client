import { format } from 'date-fns';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../config/firebase.config';
import authFetch from '../../helper/axiosInstance';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
const toastId = 'ERROR_TOAST';
const phoneRegex =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export const BookingModal = ({ treatment, setTreatment, date, refetch }) => {
  const { _id, name, slots } = treatment;
  const [user] = useAuthState(auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    const formattedDate = format(date, 'PP');
    const slot = values.slot;

    const bookingData = {
      treatmentId: _id,
      treatment: name,
      patientName: user?.displayName,
      patientEmail: user?.email,
      date: formattedDate,
      slot,
      phone: values.phoneNumber,
    };

    const { data } = await authFetch.post('/bookings', bookingData);

    if (data.success) {
      MySwal.fire({
        title: <strong className="text-neutral font-medium">Appointment Booked!</strong>,
        html: (
          <span className="text-neutral">
            on {formattedDate} at {slot}
          </span>
        ),
        icon: 'success',
        confirmButtonColor: '#19D3AE',
      });
    } else {
      toast.error(data?.message, {
        position: toast.POSITION.TOP_CENTER,
        toastId,
      });
    }
    refetch();
    setTreatment(null);
  };

  return (
    <>
      <input type="checkbox" id="bookingModal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box text-neutral">
          <label
            htmlFor="bookingModal"
            className="btn btn-sm btn-circle absolute right-2 top-2 text-base-100"
          >
            ✕
          </label>
          <h3 className="text-lg font-semibold text-neutral tracking-wide">{name}</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="py-4 grid grid-cols-1 justify-items-center gap-3"
          >
            <input
              type="text"
              className="input w-full max-w-lg"
              value={format(date, 'PP')}
              disabled
            />

            <input
              type="text"
              readOnly
              disabled
              name="name"
              value={user?.displayName || ''}
              className="input w-full max-w-lg border-[#cfcfcf]"
            />
            <input
              type="email"
              readOnly
              disabled
              value={user?.email || ''}
              name="email"
              className="input w-full max-w-lg border-[#cfcfcf]"
            />
            <select
              className="font-normal select w-full max-w-lg border-[#cfcfcf]"
              {...register('slot', {
                required: 'Please select one time slot',
              })}
            >
              <option value="">Pick a time slot</option>
              {slots?.map((slot, i) => (
                <option value={slot} key={i}>
                  {slot}
                </option>
              ))}
            </select>
            {errors.slot && <p className="text-error w-full">{errors.slot.message}</p>}
            <input
              {...register('phoneNumber', { required: 'Phone number is required' })}
              type="text"
              placeholder="Phone Number"
              className="input w-full max-w-lg border-[#cfcfcf]"
            />

            {errors.phoneNumber && (
              <p className="text-error w-full">{errors.phoneNumber.message}</p>
            )}

            <input
              type="submit"
              value="submit"
              htmlFor="bookingModal"
              className="btn text-base-100 tracking-wide w-full max-w-lg"
            />
          </form>
        </div>
      </div>
    </>
  );
};
