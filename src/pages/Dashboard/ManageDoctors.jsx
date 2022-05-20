import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../config/firebase.config';
import authFetch from '../../helper/axiosInstance';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Spinner } from '../../components';
import { toast } from 'react-toastify';

const MySwal = withReactContent(Swal);
const toastId = 'id1';
const defaultImg = 'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png?1592828498';

const fetchData = async () => {
  const { data } = await authFetch('/doctors');
  return data;
};

// component
export const ManageDoctors = () => {
  const [currentUser] = useAuthState(auth);
  const { data: doctors, isLoading, refetch } = useQuery('doctors', fetchData);

  const popupModal = async (doctor) => {
    const res = await MySwal.fire({
      title: <p className="text-gray-600">Are you sure?</p>,
      html: (
        <p>
          You want to delete <strong>{doctor?.name}</strong>?
        </p>
      ),
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#19D3AE',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete!',
    });

    if (res.isConfirmed) {
      try {
        const { data } = await authFetch.delete(`/doctor/${doctor._id}`);
        if (data.deletedCount > 0) {
          toast.success('Deleted Successfully', {
            toastId,
          });

          refetch();
        }
      } catch (error) {
        toast.error(error.data.message);
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <h2 className="text-xl lg:text-2xl text-neutral lg:-mt-5 text-center font-medium">
        Manage Doctors : {doctors?.length}
      </h2>

      <div className="overflow-x-auto py-10 px-4 lg:px-10">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row --> */}
            {doctors?.map((doctor) => (
              <tr key={doctor._id}>
                <td>
                  <div className="avatar mask mask-squircle">
                    <div className="w-12">
                      <img src={doctor.img || defaultImg} alt={`Doctor ${doctor.name}`} />
                    </div>
                  </div>
                </td>
                <td>{doctor.name}</td>
                <td>{doctor.email}</td>
                <td>
                  <a href={`tel:${doctor.phone}`} className="hover:link">
                    {doctor.phone}
                  </a>
                </td>
                {doctor.email !== currentUser?.email && (
                  <td>
                    {doctor?.role !== 'admin' && (
                      <button onClick={() => popupModal(doctor)} className="btn btn-xs">
                        Delete
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
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
