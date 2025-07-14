import React, { useState } from 'react';
import { Plus, Search, FileText, Eye, Edit, Trash2, Download, Calendar, DollarSign } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { InvoiceForm } from '../forms/InvoiceForm';

const mockInvoices = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    supplierName: 'TechFlow Solutions',
    supplierPhone: '+1 (555) 123-4567',
    supplierEmail: 'contact@techflow.com',
    supplierId: '1',
    amount: 15750.0,
    date: '2024-01-15',
    status: 'pending',
    dueDate: '2024-02-14',
    description: 'MacBook Pro and accessories purchase',
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    supplierName: 'Office Depot Pro',
    supplierPhone: '+1 (555) 987-6543',
    supplierEmail: 'business@officedepot.com',
    supplierId: '2',
    amount: 2340.5,
    date: '2024-01-12',
    status: 'paid',
    dueDate: '2024-02-11',
    description: 'Office furniture and supplies',
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    supplierName: 'GlobalTech Supplies',
    supplierPhone: '+1 (555) 456-7890',
    supplierEmail: 'sales@globaltech.com',
    supplierId: '3',
    amount: 8920.0,
    date: '2024-01-08',
    status: 'overdue',
    dueDate: '2024-02-07',
    description: 'Network equipment and cables',
  },
];

export const InvoicesPage = () => {
  const [invoices] = useState(mockInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return '✅';
      case 'pending':
        return '⏳';
      case 'overdue':
        return '⚠️';
      default:
        return '❓';
    }
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (invoice.description && invoice.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidAmount = invoices
    .filter((inv) => inv.status === 'paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingAmount = invoices
    .filter((inv) => inv.status === 'pending')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const overdueAmount = invoices
    .filter((inv) => inv.status === 'overdue')
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  const InvoiceViewModal = () => {
    if (!selectedInvoice) return null;

    return (
      <div className="space-y-6">
        {/* Invoice Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl flex items-center justify-center">
              <FileText className="h-8 w-8 text-cyan-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{selectedInvoice.invoiceNumber}</h3>
              <p className="text-sm text-gray-500">Date: {selectedInvoice.date}</p>
              <span
                className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(
                  selectedInvoice.status
                )}`}
              >
                <span className="mr-2">{getStatusIcon(selectedInvoice.status)}</span>
                {selectedInvoice.status.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">${selectedInvoice.amount.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Total Amount</p>
          </div>
        </div>

        {/* Invoice Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Supplier Information */}
          <Card className="p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <FileText className="h-4 w-4 mr-2 text-cyan-600" />
              Supplier Information
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Company:</span>
                <span className="text-sm font-medium text-gray-900">{selectedInvoice.supplierName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Email:</span>
                <span className="text-sm text-gray-900">{selectedInvoice.supplierEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Phone:</span>
                <span className="text-sm text-gray-900">{selectedInvoice.supplierPhone}</span>
              </div>
            </div>
          </Card>

          {/* Invoice Details */}
          <Card className="p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-cyan-600" />
              Invoice Details
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Invoice Date:</span>
                <span className="text-sm font-medium text-gray-900">{selectedInvoice.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Due Date:</span>
                <span className="text-sm text-gray-900">{selectedInvoice.dueDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Amount:</span>
                <span className="text-sm font-bold text-gray-900">${selectedInvoice.amount.toLocaleString()}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Description */}
        {selectedInvoice.description && (
          <Card className="p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Description</h4>
            <p className="text-sm text-gray-700 leading-relaxed">{selectedInvoice.description}</p>
          </Card>
        )}

        {/* Invoice Photo */}
        {selectedInvoice.photo && (
          <Card className="p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Invoice Document</h4>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Invoice document attached</p>
              <Button size="sm" className="mt-2">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <Button
            variant="secondary"
            onClick={() => {
              setShowViewModal(false);
              setSelectedInvoice(null);
            }}
          >
            Close
          </Button>
          <Button
            onClick={() => {
              setShowViewModal(false);
              setShowEditModal(true);
            }}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Invoice
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoice Management</h1>
          <p className="text-gray-600">Manage supplier invoices and payments</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Invoice
        </Button>
      </div>

   

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
            <Button variant="secondary" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </Card>

      {/* Invoices Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <FileText className="h-5 w-5 text-cyan-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{invoice.invoiceNumber}</div>
                        <div className="text-sm text-gray-500">{invoice.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{invoice.supplierName}</div>
                      <div className="text-sm text-gray-500">{invoice.supplierEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${invoice.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                        invoice.status
                      )}`}
                    >
                      <span className="mr-1">{getStatusIcon(invoice.status)}</span>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-cyan-600 hover:text-cyan-900 p-1 rounded hover:bg-cyan-50 transition-colors"
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setShowViewModal(true);
                        }}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50 transition-colors"
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setShowEditModal(true);
                        }}
                        title="Edit Invoice"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                        title="Delete Invoice"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Invoice Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Invoice" size="lg">
        <InvoiceForm onSubmit={() => setShowAddModal(false)} onCancel={() => setShowAddModal(false)} />
      </Modal>

      {/* Edit Invoice Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedInvoice(null);
        }}
        title="Edit Invoice"
        size="lg"
      >
        <InvoiceForm
          invoice={selectedInvoice}
          onSubmit={() => {
            setShowEditModal(false);
            setSelectedInvoice(null);
          }}
          onCancel={() => {
            setShowEditModal(false);
            setSelectedInvoice(null);
          }}
        />
      </Modal>

      {/* View Invoice Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedInvoice(null);
        }}
        title="Invoice Details"
        size="xl"
      >
        <InvoiceViewModal />
      </Modal>
    </div>
  );
};
