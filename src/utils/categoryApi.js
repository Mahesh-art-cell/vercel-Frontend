import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/categories';

export const getCategories = () => axios.get(BASE_URL);
export const addCategory = (data) => axios.post(BASE_URL, data);
export const updateCategory = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteCategory = (id) => axios.delete(`${BASE_URL}/${id}`);
