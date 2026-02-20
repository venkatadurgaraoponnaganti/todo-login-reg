import axios from "axios";
import { getToken } from "./AuthService";

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';
const BASE_REST_API_URL = `${API_BASE}/todos`;

// export function getAllTodos(){
//     return axios.get(BASE_REST_API_URL);
// }

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    const token = getToken();

    if (token) {
      config.headers['Authorization'] = token.startsWith('Basic ') ? token : `Basic ${token}`;
    }

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  
export const getAllTodos = () => axios.get(BASE_REST_API_URL)

export const saveTodo = (todo) => axios.post(BASE_REST_API_URL, todo)

export const getTodo = (id) => axios.get(BASE_REST_API_URL + '/' + id)

export const updateTodo = (id, todo) => axios.put(BASE_REST_API_URL + '/' + id, todo)

export const deleteTodo = (id) => axios.delete(BASE_REST_API_URL + '/' + id)

export const completeTodo = (id) => axios.patch(BASE_REST_API_URL + '/' + id + '/complete')

export const inCompleteTodo = (id) => axios.patch(BASE_REST_API_URL + '/' + id + '/in-complete')
