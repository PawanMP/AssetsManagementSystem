import api from './api';

export const supplierService = {
  // Get all suppliers
  getAllSuppliers: async (params = {}) => {
    const response = await api.get('/suppliers', { params });
    return response.data;
  },

  // Get single supplier
  getSupplier: async (id) => {
    const response = await api.get(`/suppliers/${id}`);
    return response.data;
  },

  // Create new supplier
  createSupplier: async (supplierData) => {
    const response = await api.post('/suppliers', supplierData);
    return response.data;
  },

  // Update supplier
  updateSupplier: async (id, supplierData) => {
    const response = await api.put(`/suppliers/${id}`, supplierData);
    return response.data;
  },

  // Delete supplier
  deleteSupplier: async (id) => {
    const response = await api.delete(`/suppliers/${id}`);
    return response.data;
  },

  // Get supplier assets
  getSupplierAssets: async (id) => {
    const response = await api.get(`/suppliers/${id}/assets`);
    return response.data;
  },

  // Get supplier invoices
  getSupplierInvoices: async (id) => {
    const response = await api.get(`/suppliers/${id}/invoices`);
    return response.data;
  },
};