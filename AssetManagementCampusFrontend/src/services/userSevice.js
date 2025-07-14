import api from './api';

export const userService = {
  /**
   * Fetches all user records from the API.
   * @returns {Promise<Array>} A promise that resolves to an array of user records.
   */
  async getUsers() {
    const response = await api.get('/users');
    return response.data;
  },

  /**
   * Adds a new user record.
   * @param {Object} userData - The data for the new user.
   * @returns {Promise<Object>} A promise that resolves to the newly created user record.
   */
  async addUser(userData) {
    const response = await api.post('/users', userData);
    return response.data;
  },

  /**
   * Updates an existing user record.
   * @param {string} id - The ID of the user to update.
   * @param {Object} userData - The updated data for the user.
   * @returns {Promise<Object>} A promise that resolves to the updated user record.
   */
  async updateUser(id, userData) {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  /**
   * Deletes a user record.
   * @param {string} id - The ID of the user to delete.
   * @returns {Promise<void>} A promise that resolves when the user is deleted.
   */
  async deleteUser(id) {
    await api.delete(`/users/${id}`);
  },

  /**
   * Toggles the status of a user record between 'active' and 'inactive'.
   * @param {string} id - The ID of the user to toggle status.
   * @param {string} currentStatus - The current status of the user ('active' or 'inactive').
   * @returns {Promise<Object>} A promise that resolves to the updated user record.
   */
  async toggleUserStatus(id, currentStatus) {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    const response = await api.patch(`/users/${id}/status`, { status: newStatus });
    return response.data;
  }
};
