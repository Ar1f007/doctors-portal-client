import axios from 'axios';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import auth from '../config/firebase.config';

const toastId = 'toast';
const url = 'http://localhost:5000';
// const herokuUrl = 'https://doctors-portalway.herokuapp.com';
// axios setup
const authFetch = axios.create({
  baseURL: url,
});

// request
authFetch.interceptors.request.use(
  (config) => {
    config.headers.common['Authorization'] = `Bearer ${localStorage.getItem('dp_token')}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response
authFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      signOut(auth);
      localStorage.removeItem('dp_token');
      toast.info(error.response.data.message || 'Login to continue', { toastId });
    }

    if (error.response.status === 404) {
      toast.info('Something went wrong. Try reloading again.', { toastId });
    }
    return Promise.reject(error);
  }
);

export default authFetch;
