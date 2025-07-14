import api from './api';

export const dashboardService = {
  // Get dashboard overview data
  getDashboardOverview: async () => {
    const response = await api.get('/dashboard/overview');
    return response.data;
  },

  // Get recent activities
  getRecentActivities: async (limit = 10) => {
    const response = await api.get(`/dashboard/activities?limit=${limit}`);
    return response.data;
  },

  // Get asset statistics
  getAssetStatistics: async () => {
    const response = await api.get('/dashboard/asset-statistics');
    return response.data;
  },

  // Get financial summary
  getFinancialSummary: async () => {
    const response = await api.get('/dashboard/financial-summary');
    return response.data;
  },

  // Get user statistics
  getUserStatistics: async () => {
    const response = await api.get('/dashboard/user-statistics');
    return response.data;
  },

  // Get system alerts
  getSystemAlerts: async () => {
    const response = await api.get('/dashboard/alerts');
    return response.data;
  },
};