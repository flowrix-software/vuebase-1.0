import axios from 'axios'

const API_BASE_URL = 'https://iseekblinds.dev.flowrix.app/api/v1/'
const API_KEY = 'b70dce54-429c-485f-8fc0-192470337735'
const API_SECRET = '3Gp9dkbANPWkLg5nsutDheH1WVmrzqlcnVJNk0PDrptx3xIWtyib9hcRr66zH84NRwUdHACTGSZo9Z8sA1eJm0zsCI34OrLeSobUEKhMqfgB7YWClRO5ZHLTE6R81k5zwIHSTtX7yXuqz3MGfjbLGZK7SVS4dwS58xiljtx9TloCIQISOsoIUE7VWu87mwsJqjrMxzpmPlXML6DSc7w5c7xHDpdYaQrQzNjlZkq5sILEDHlHSXSi6OeRZuSYD5uI'

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
