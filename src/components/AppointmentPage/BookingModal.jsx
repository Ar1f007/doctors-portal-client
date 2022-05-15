import { format } from 'date-fns';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../config/firebase.config';
import authFetch from '../../helper/axiosInstance';

const toastId = 'ERROR_TOAST';
export const BookingModal = ({ treatment, setTreatment, date, refetch }) => {
  const { _id, name, slots } = treatment;
  const [user] = useAuthState(auth);

  const handleBooking = async (e) => {
    e.preventDefault();
    const formattedDate = format(date, 'PP');
    const slot = e.target.slot.value;

    const bookingData = {
      treatmentId: _id,
      treatment: name,
      patientName: user?.displayName,
      patientEmail: user?.email,
      date: formattedDate,
      slot,
      phone: e.target.phoneNumber.value,
    };

    const { data } = await authFetch.post('/bookings', bookingData);
    if (data.success) {
      toast.success(`Appointment is set, ${formattedDate} at ${slot}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error(
        `You have already booked an appointment for it on ${data.booking?.date} at ${data.booking?.slot}`,
        {
          position: toast.POSITION.TOP_CENTER,
          toastId,
        }
      );
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
            onSubmit={handleBooking}
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
            <select className="font-normal select w-full max-w-lg border-[#cfcfcf]" name="slot">
              {slots?.map((slot, i) => (
                <option value={slot} key={i}>
                  {slot}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              className="input w-full max-w-lg border-[#cfcfcf]"
            />

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
