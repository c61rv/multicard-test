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
  getEmployee(id) {
    return apiClient.get(`/employees/${id}`);
  },
  getDocuments(page = 1, limit = 10, employeeId = null) {
    let url = `/documents?_page=${page}&_limit=${limit}&_expand=employee`;
    if (employeeId) {
      url += `&employeeId=${employeeId}`;
    }
    return apiClient.get(url);
  },
  getDocument(id) {
    return apiClient.get(`/documents/${id}?_expand=employee`);
  }
};