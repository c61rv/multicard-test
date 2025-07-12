import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  getEmployees(page = 1, limit = 10) {
    return apiClient.get(`/employees?_page=${page}&_limit=${limit}`);
  },
};