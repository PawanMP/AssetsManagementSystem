import React, { useState } from 'react';
import { Plus, Search, Mail, Phone, MapPin, Edit, Trash2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { SupplierForm } from '../forms/SupplierForm';

const mockSuppliers = [
  {
    id: '1',
    name: 'TechFlow Solutions',
    email: 'contact@techflow.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Street, Silicon Valley, CA 94025',
    contactPerson: 'John Smith',
    totalContracts: 12,
    lastOrder: '2024-01-10',
  },
  {
    id: '2',
    name: 'Office Depot Pro',
    email: 'business@officedepot.com',
    phone: '+1 (555) 987-6543',
    address: '456 Business Ave, New York, NY 10001',
    contactPerson: 'Sarah Johnson',
    totalContracts: 8,
    lastOrder: '2024-01-08',
  },
  {
    id: '3',
    name: 'GlobalTech Supplies',
    email: 'sales@globaltech.com',
    phone: '+1 (555) 456-7890',
    address: '789 Enterprise Blvd, Austin, TX 73301',
    contactPerson: 'Mike Wilson',
    totalContracts: 15,
    lastOrder: '2024-01-12',
  },
];

export const SuppliersPage = () => {
  const [suppliers] = useState(mockSuppliers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Supplier Management</h1>
          <p className="text-gray-600">Manage your vendors and suppliers</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Supplier
        </Button>
      </div>

      {/* Search */}
      <Card className="p-6">
        <div className="max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </Card>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map((supplier) => (
          <Card key={supplier.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{supplier.name}</h3>
              <div className="flex space-x-1">
                <button
                  className="p-1 text-gray-400 hover:text-blue-600 rounded"
                  onClick={() => {
                    setSelectedSupplier(supplier);
                    setShowEditModal(true);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-red-600 rounded">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                {supplier.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                {supplier.phone}
              </div>
              <div className="flex items-start text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                <span className="line-clamp-2">{supplier.address}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Contact Person:</span>
                <span className="font-medium text-gray-900">{supplier.contactPerson}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-500">Total Contracts:</span>
                <span className="font-medium text-gray-900">{supplier.totalContracts}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-500">Last Order:</span>
                <span className="font-medium text-gray-900">{supplier.lastOrder}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Supplier Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Supplier"
      >
        <SupplierForm onSubmit={() => setShowAddModal(false)} onCancel={() => setShowAddModal(false)} />
      </Modal>

      {/* Edit Supplier Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Supplier"
      >
        <SupplierForm
          supplier={selectedSupplier}
          onSubmit={() => setShowEditModal(false)}
          onCancel={() => setShowEditModal(false)}
        />
      </Modal>
    </div>
  );
};
