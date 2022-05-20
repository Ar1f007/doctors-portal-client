import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../config/firebase.config';
import authFetch from '../../helper/axiosInstance';

export const MyAppointments = () => {
  const [user] = useAuthState(auth);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const res = await authFetch(`/bookings?patientEmail=${user?.email}`);
          setAppointments(res.data);
        } catch (error) {
          toast.info('Something went wrong. Try again later.');
        }
      }
    };
    fetchData();
  }, [user, navigate]);

  const handlePayment = (id) => {
    navigate(`/dashboard/payment/${id}`, { state: { email: user?.email } });
  };

  return (
    <main className="sm:pb-20">
      <h2 className="capitalize text-xl lg:text-2xl text-neutral lg:-mt-5 text-center font-medium">
        My Appointments : {appointments?.length}
      </h2>

      <div className="overflow-x-auto py-10 px-4 lg:px-10">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Treatment</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments?.map(({ _id, date, slot, treatment, price, paid }, index) => (
              <tr key={_id}>
                <th>{index + 1}</th>
                <td>{treatment}</td>
                <td>{date}</td>
                <td>{slot}</td>
                <td>{price?.toFixed(2)}</td>
                <td>
                  {price && !paid && (
                    <button className="btn btn-primary" onClick={() => handlePayment(_id)}>
                      Pay
                    </button>
                  )}
                  {price && paid && <button className="btn btn-success">Paid</button>}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Treatment</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  );
};
