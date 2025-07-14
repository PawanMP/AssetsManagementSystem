import api from './api';

export const authService = {
  // Get CSRF cookie
  async getCsrfCookie() {
    await api.get('/sanctum/csrf-cookie');
  },

  // Login user
  async login(credentials) {
    await this.getCsrfCookie();
    const response = await api.post('/auth/login', credentials);
    return response.data.user;
  },

  // Logout user
  async logout() {
    await api.post('/auth/logout');
  },

  // Get current user
  async getUser() {
    const response = await api.get('/auth/user');
    return response.data;
  },


};