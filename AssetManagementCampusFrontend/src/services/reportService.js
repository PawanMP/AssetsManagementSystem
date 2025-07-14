import api from './api';

export const reportService = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    const response = await api.get('/reports/dashboard');
    return response.data;
  },

  // Get asset reports
  getAssetReports: async (params = {}) => {
    const response = await api.get('/reports/assets', { params });
    return response.data;
  },

  // Get financial reports
  getFinancialReports: async (params = {}) => {
    const response = await api.get('/reports/financial', { params });
    return response.data;
  },

  // Get inventory reports
  getInventoryReports: async (params = {}) => {
    const response = await api.get('/reports/inventory', { params });
    return response.data;
  },

  // Get user activity reports
  getUserActivityReports: async (params = {}) => {
    const response = await api.get('/reports/user-activity', { params });
    return response.data;
  },

  // Export report as PDF
  exportReportPDF: async (reportType, params = {}) => {
    const response = await api.get(`/reports/${reportType}/export/pdf`, {
      params,
      responseType: 'blob'
    });
    return response.data;
  },

  // Export report as Excel
  exportReportExcel: async (reportType, params = {}) => {
    const response = await api.get(`/reports/${reportType}/export/excel`, {
      params,
      responseType: 'blob'
    });
    return response.data;
  },
};