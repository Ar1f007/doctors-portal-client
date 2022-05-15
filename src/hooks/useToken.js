import axios from 'axios';
import { useEffect, useState } from 'react';
const url = 'http://localhost:5000';
// const herokuUrl = 'https://doctors-portalway.herokuapp.com';

export const useToken = (user, name) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const fnc = async () => {
      const email = user?.user?.email;
      const username = user?.user?.displayName || name;

      if (email) {
        const { data } = await axios.put(`${url}/users/${email}`, {
          email,
          name: username,
        });

        setToken(data.token);
        localStorage.setItem('dp_token', data.token);
      }
    };

    fnc();
  }, [user, name]);

  return [token];
};
