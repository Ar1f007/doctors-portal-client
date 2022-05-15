import axios from 'axios';
import { useEffect, useState } from 'react';

export const useCheckAdmin = (user) => {
  const [admin, setAdmin] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const isAdmin = async (email) => {
    const { data } = await axios(`http://localhost:5000/admin/${email}`, {
      headers: { authorization: `Bearer ${localStorage.getItem('dp_token')}` },
    });

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
