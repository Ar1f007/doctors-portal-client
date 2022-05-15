import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { Spinner } from '../../components';
import auth from '../../config/firebase.config';
import authFetch from '../../helper/axiosInstance';

const toastId = 'id1';
const token = localStorage.getItem('dp_token');
const fetchUsers = async () => {
  try {
    const { data } = await axios('http://localhost:5000/users', {
      headers: { authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    toast.info('Could not load users try reloading again.', { toastId });
  }
};

export const AllUser = () => {
  const [currentUser] = useAuthState(auth);
  const { data: users, isLoading, refetch } = useQuery('users', fetchUsers);

  if (isLoading) {
    return (
      <div className="flex justify-center py-44">
        <Spinner />
      </div>
    );
  }

  const makeAdmin = async (user) => {
    const { email } = user;

    try {
      const { data } = await authFetch.put(`/users/make-admin/${email}`, {});

      if (data.modifiedCount > 0) {
        refetch();
        toast.success('Success !');
      }
    } catch (error) {
      toast.error(`${error.response.data.message}`, { toastId });
    }
  };
  return (
    <main className="sm:pb-20">
      <h2 className="capitalize text-xl lg:text-2xl text-neutral lg:-mt-5 text-center font-medium">
        All Users : {users?.length}
      </h2>

      <div className="overflow-x-auto py-10 px-4 lg:px-10">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row --> */}
            {users?.map((user) => (
              <tr key={user._id}>
                <td>{user.email}</td>
                {user.email !== currentUser?.email && (
                  <td>
                    <button className="mr-2 btn btn-xs btn-error">Delete</button>
                    {user?.role !== 'admin' && (
                      <button onClick={() => makeAdmin(user)} className="btn btn-xs">
                        Make Admin
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
          {/* <!-- foot --> */}
          <tfoot>
            <tr>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  );
};
