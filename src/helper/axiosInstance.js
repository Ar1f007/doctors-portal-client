import axios from 'axios';

// axios setup
const authFetch = axios.create({
  baseURL: '/api/v1',
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

// request
authFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error.response);

    if (error.response.status === 401) {
    }
    return Promise.reject(error);
  }
);
