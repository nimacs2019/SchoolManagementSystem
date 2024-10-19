// src/services/studentService.js
import instance from '../utils/axiosInstance'  // Import the configured axios instance

const API_URL = '/api/students';

const studentService = {
  getAllStudents: async () => instance.get(API_URL),
  addStudent: async (studentData) => instance.post(API_URL, studentData),
  updateStudent: async (id, updatedData) =>
    instance.put(`${API_URL}/${id}`, updatedData),
  deleteStudent: async (id) => instance.delete(`${API_URL}/${id}`),
};

export default studentService;
