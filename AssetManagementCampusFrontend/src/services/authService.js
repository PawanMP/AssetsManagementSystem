// src/services/auth.js
import api from './api'; // axios instance with baseURL + credentials

export const authService = {
  async getCsrfCookie() {
    await api.get('/sanctum/csrf-cookie');
  },

  async login(credentials) {
    await this.getCsrfCookie();
    const response = await api.post('/auth/login', credentials);
    return response.data.user;
  },

  async logout() {
    await api.post('/auth/logout'); // ✅ This is the logout call
  },

  async getUser() {
    const response = await api.get('/auth/user');
    return response.data;
  },

  async refreshUser() {
    const response = await api.get('/auth/refresh');
    return response.data.user;
  }
};
