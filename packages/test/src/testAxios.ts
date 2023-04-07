import axios, { AxiosError } from 'axios'

export const testAxios = axios.create({
  baseURL: 'http://localhost:3000/api',
})

export const testAxiosWithCatch = axios.create({
  baseURL: 'http://localhost:3000/api',
})

testAxiosWithCatch.interceptors.response.use(
  () => {
    throw new Error('This should fail')
  },
  (error: AxiosError) => error.response,
)
