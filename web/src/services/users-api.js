import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  withCredentials: true
});

http.interceptors.response.use(
  (res) => res.data,
  (error) => Promise.reject(error)
)

export const login = (user) => {
  return http.post('/sessions', user)
}
