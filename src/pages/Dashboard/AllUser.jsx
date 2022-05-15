import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { Spinner } from '../../components';

import auth from '../../config/firebase.config';
import authFetch from '../../helper/axiosInstance';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
const toastId = 'id1';

const fetchUsers = async () => {
  try {
    const { data } = await authFetch('/users');
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

  const popupModal = async (user) => {
    console.log(user);
    const res = await MySwal.fire({
      title: <p className="text-gray-600">Are you sure?</p>,
      html: (
        <p>
          You want to make <strong>{user?.name}</strong> an admin?
        </p>
      ),
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#19D3AE',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, make admin!',
    });

    if (res.isConfirmed) {
      const result = await makeAdmin(user);
      if (result) {
        console.log(result);
        MySwal.fire({
          title: <span className="text-gray-600">Successful!</span>,
          icon: 'success',
          confirmButtonColor: '#19D3AE',
        });
      }
    }
  };
  const makeAdmin = async (user) => {
    const { email } = user;

    try {
      const { data } = await authFetch.put(`/users/make-admin/${email}`, {});

      if (data.modifiedCount > 0) {
        refetch();
        return true;
      }
    } catch (error) {
      toast.error(`${error.response.data.message}`, { toastId });
      return false;
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
                      <button onClick={() => popupModal(user)} className="btn btn-xs">
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
