import axios from 'axios';

const BASE_URL = 'http://localhost:3000/'

const instance = axios.create({
  baseURL: BASE_URL
})


instance.interceptors.request.use(config => {
  const storedToken = window.localStorage.getItem('jwt-token')
  if (storedToken) {
    config.headers['Authorization'] = `Bearer ${storedToken}`;
  }
  return config
}, err => Promise.reject(err))


instance.interceptors.response.use((response) => {
  // do something with the response data
  console.log('Response was received from', response.config.url)
  return response;
}, error => {
  console.log(error);
  return Promise.reject(error);
});



export default instance;