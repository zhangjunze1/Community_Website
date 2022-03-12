import axios from 'axios'

// eslint-disable-next-line no-unused-vars
const instance = axios.create({
  baseURL: 'http://1.117.153.199:8181',
  timeout: 2000
})

export default instance
