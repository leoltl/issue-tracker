import axios from 'axios';

const BASE_URL = 'http://localhost:3000/'

const instance = axios.create({
  baseURL: BASE_URL
})

instance.interceptors.response.use((response) => {
  // do something with the response data
  console.log('Response was received');

  return response;
}, error => {
  console.log(error);
  return Promise.reject(error);
});



export default instance;