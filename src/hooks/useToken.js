import axios from 'axios';
import { useEffect, useState } from 'react';

export const useToken = (user) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const fnc = async () => {
      const email = user?.user?.email;

      if (email) {
        const { data } = await axios.put(`http://localhost:5000/users/${email}`, { email });

        setToken(data.token);
        localStorage.setItem('dp_token', data.token);
      }
    };

    fnc();
  }, [user]);

  return [token];
};
