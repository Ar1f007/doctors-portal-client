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
            </tr>
          </thead>
          <tbody>
            {appointments?.map(({ _id, date, slot, treatment }, index) => (
              <tr key={_id}>
                <th>{index + 1}</th>
                <td>{treatment}</td>
                <td>{date}</td>
                <td>{slot}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Treatment</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  );
};
