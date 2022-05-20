import { useEffect, useState } from 'react';
import authFetch from '../helper/axiosInstance';

export const useCheckAdmin = (user) => {
  const [admin, setAdmin] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const isAdmin = async (email) => {
    const { data } = await authFetch(`/admin/${email}`);

    setAdmin(data.admin);
    setCheckingStatus(false);
  };

  useEffect(() => {
    const email = user?.email;

    if (email) {
      isAdmin(email);
    }
  }, [user]);

  return [admin, checkingStatus];
};
