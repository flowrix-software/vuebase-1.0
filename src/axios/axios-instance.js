import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_FLOWRIX_API_BASE_URL;
const API_KEY = import.meta.env.VITE_FLOWRIX_API_KEY;
const API_SECRET = import.meta.env.VITE_FLOWRIX_API_SECRET;

// const API_BASE_URL = 'https://iseekblinds.flowrix.app/api/v1/'
// const API_KEY = '940d5360-56b6-42c3-810b-3186d1ebe3cc'
// const API_SECRET = 'VtFM7Ir5Vfn3EqjH5EpvvzRWyjW0npqvI1cbhNKIaZaOtZh4g7vd0Ba18zUjeM4ph0qP1LC1unlPzpzR2Tq1FgJC8xHBCzuy6FOqLD4jYxErdJPKVC2Mu4eH1uptnReydKhqmSHmdz3aBVVjq07moRpzHtDzQwZxHsDSwQ4czZpda34eFEXgYqrTtM0Gqr07a1sMgnvyvD7u214EybICivvJndKEZzBYVXu9r4C366KnF4kyn7PRC3IpkugBqASc'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
    'x-api-secret': API_SECRET,
    'Content-Encoding': 'gzip',
    Authorization: 'Bearer ' + accessToken()
    // 'User-Agent': navigator.userAgent,
    // 'Content-Length': 999
  }
})
function accessToken(){
  return localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')).access_token:'';
}
// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    console.log('Request interceptor:', config)
    config.headers['request-startTime'] = new Date().getTime();
    return config
  },
  (error) => {
    // Do something with request error
    console.error('Request error interceptor:', error)
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Do something with successful response
    console.log('Response interceptor:', response)
    const currentTime = new Date().getTime()      
  const startTime = response.config.headers['request-startTime']      
  response.headers['request-duration'] = currentTime - startTime 
    return response
  },
  (error) => {
    // Do something with response error
    console.error('Response error interceptor:', error)
    return Promise.reject(error)
  }
)

export default axiosInstance;
