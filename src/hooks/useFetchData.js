import axios from 'axios';
import { useEffect, useState } from 'react';

export const useFetchData = (link) => {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios(link);

        setValue(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [link]);
  return { loading, value, setValue };
};
