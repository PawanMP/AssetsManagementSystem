import api from './api';

export const invoiceService = {
  // Get all invoices
  getAllInvoices: async (params = {}) => {
    const response = await api.get('/invoices', { params });
    return response.data;
  },

  // Get single invoiceA
  getInvoice: async (id) => {
    const response = await api.get(`/invoices/${id}`);
    return response.data;
  },

  // Create new invoice
  createInvoice: async (invoiceData) => {
    const response = await api.post('/invoices', invoiceData);
    return response.data;
  },

  // Update invoice
  updateInvoice: async (id, invoiceData) => {
    const response = await api.put(`/invoices/${id}`, invoiceData);
    return response.data;
  },

  // Delete invoice
  deleteInvoice: async (id) => {
    const response = await api.delete(`/invoices/${id}`);
    return response.data;
  },

  // Generate invoice PDF
  generateInvoicePDF: async (id) => {
    const response = await api.get(`/invoices/${id}/pdf`, {
      responseType: 'blob'
    });
    return response.data;
  },

  // Send invoice email
  sendInvoiceEmail: async (id, emailData) => {
    const response = await api.post(`/invoices/${id}/send-email`, emailData);
    return response.data;
  },

  // Mark invoice as paid
  markAsPaid: async (id) => {
    const response = await api.post(`/invoices/${id}/mark-paid`);
    return response.data;
  },
};