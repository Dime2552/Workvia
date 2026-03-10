import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'https://localhost:5267/api',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'An unexpected error occurred';
    let errorTitle = 'Error';

    if (error.response && error.response.data) {
      const data = error.response.data;
      if (typeof data === 'string') {
        errorMessage = data.split('|')[0];
      } else if (data.title) {
        errorTitle = data.title;
        errorMessage = data.detail || data.title;
        
        if (data.errors) {
          const validationErrors = Object.values(data.errors).flat();
          if (validationErrors.length > 0) {
            errorMessage = validationErrors[0] as string;
          }
        }
      }
    }

    const status = error.response?.status;
    switch (status) {
      case 400:
        toast.warning(errorMessage);
        break;
      case 401:
        toast.error('Unauthorized. Please login again.');
        break;
      case 403:
        toast.error('You do not have permission to perform this action.');
        break;
      case 404:
        toast.error('Resource not found.');
        break;
      case 500:
        toast.error('Server error. Try again later.');
        break;
      case 0:
        toast.error('Cannot connect to server.');
        break;
      default:
        toast.error(`${errorTitle}: ${errorMessage}`);
        break;
    }

    return Promise.reject(error);
  }
);

export default api;