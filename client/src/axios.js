import axios from 'axios';

const instance =  axios.create({
  baseURL:'http://localhost:3000/',
  // proxy: {
  //   host: 'localhost',
  //   port: 3000,
  // },
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