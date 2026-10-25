import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
});

api.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user?.email) {
          config.headers['user-email'] = user.email;
        }
      } catch {
        // Ignore JSON parse errors
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
