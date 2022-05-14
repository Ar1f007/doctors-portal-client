import axios from 'axios';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../config/firebase.config';

const toastId = 'id-1';
export const MyAppointments = () => {
  const [user] = useAuthState(auth);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const res = await axios(`http://localhost:5000/bookings?patientEmail=${user?.email}`, {
            headers: { authorization: 'Bearer ' + localStorage.getItem('dp_token') },
          });

          setAppointments(res.data);
        } catch (error) {
          await signOut(auth);
          localStorage.removeItem('dp_token');

          if (error.response.status === 403) {
            toast.info(error.response.data.message + '. Please login again.', { toastId });
          }
          if (error.response.status === 401) {
            toast.info(error.response.data.message, { toastId });
          }

          navigate('/login');
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
