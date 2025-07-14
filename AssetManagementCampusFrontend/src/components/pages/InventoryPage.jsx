import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye, Package, MapPin, DollarSign, Calendar } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { AssetForm } from '../forms/AssetForm';

const mockAssets = [
  {
    id: '1',
    name: 'MacBook Pro 16"',
    category: 'Laptop',
    status: 'available',
    location: 'IT Storage Room A',
    value: 2499,
    serialNumber: 'MBP2023001',
    lastUpdated: '2024-01-15',
    description: 'High-performance laptop for development work. Includes 32GB RAM, 1TB SSD.',
    purchaseDate: '2023-08-15',
    warrantyExpiry: '2026-08-15',
    supplier: 'Apple Inc.'
  },

  {
    id: '2',
    name: 'iPhone 14 Pro',
    category: 'Mobile',
    status: 'checked_out',
    location: 'Engineering Dept',
    value: 999,
    serialNumber: 'IP14001',
    lastUpdated: '2024-01-14',
    description: 'Latest iPhone model for mobile app testing and development.',
    purchaseDate: '2023-09-20',
    warrantyExpiry: '2024-09-20',
    supplier: 'Apple Inc.',
    assignedTo: 'John Doe'
  },
  {
    id: '3',
    name: 'Dell Monitor 27"',
    category: 'Monitor',
    status: 'maintenance',
    location: 'IT Workshop',
    value: 299,
    serialNumber: 'DM27001',
    lastUpdated: '2024-01-13',
    description: '4K UHD monitor with USB-C connectivity. Currently has display issues.',
    purchaseDate: '2023-06-10',
    warrantyExpiry: '2026-06-10',
    supplier: 'Dell Technologies'
  },
  {
    id: '4',
    name: 'HP LaserJet Pro',
    category: 'Printer',
    status: 'available',
    location: 'Office Floor 2',
    value: 199,
    serialNumber: 'HP2023001',
    lastUpdated: '2024-01-12',
    description: 'Monochrome laser printer for high-volume printing.',
    purchaseDate: '2023-05-15',
    warrantyExpiry: '2025-05-15',
    supplier: 'HP Inc.'
  },
  {
    id: '5',
    name: 'Surface Pro 9',
    category: 'Tablet',
    status: 'checked_out',
    location: 'Design Department',
    value: 1299,
    serialNumber: 'SP9001',
    lastUpdated: '2024-01-11',
    description: 'Versatile 2-in-1 device for design and presentation work.',
    purchaseDate: '2023-10-01',
    warrantyExpiry: '2025-10-01',
    supplier: 'Microsoft',
    assignedTo: 'Sarah Wilson'
  },
  {
    id: '6',
    name: 'Canon EOS R5',
    category: 'Camera',
    status: 'available',
    location: 'Media Center',
    value: 3899,
    serialNumber: 'CR5001',
    lastUpdated: '2024-01-10',
    description: 'Professional mirrorless camera for high-quality photography and videography.',
    purchaseDate: '2023-07-20',
    warrantyExpiry: '2025-07-20',
    supplier: 'Canon Inc.'
  },
      {
    id: '7',
    name: 'MacBook Pro 16"',
    category: 'Laptop',
    status: 'available',
    location: 'IT Storage Room A',
    value: 100000000,
    serialNumber: 'MBP2023001',
    lastUpdated: '2024-01-15',
    description: 'High-performance laptop for development work. Includes 32GB RAM, 1TB SSD.',
    purchaseDate: '2023-08-15',
    warrantyExpiry: '2026-08-15',
    supplier: 'Apple Inc.'
  },
];

export const InventoryPage = () => {
  const [assets] = useState(mockAssets);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'checked_out': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return '✅';
      case 'checked_out': return '📤';
      case 'maintenance': return '🔧';

      default: return '❓';
    }
  };

  const categories = [...new Set(assets.map(asset => asset.category))];

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || asset.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || asset.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const AssetViewModal = () => {
    if (!selectedAsset) return null;

    return (
      <div className="space-y-6">
        {/* Asset Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl flex items-center justify-center">
              <Package className="h-8 w-8 text-cyan-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{selectedAsset.name}</h3>
              <p className="text-sm text-gray-500">Serial: {selectedAsset.serialNumber}</p>
              <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(selectedAsset.status)}`}>
                <span className="mr-2">{getStatusIcon(selectedAsset.status)}</span>
                {selectedAsset.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">${selectedAsset.value.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Asset Value</p>
          </div>
        </div>

        {/* Asset Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card className="p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Package className="h-4 w-4 mr-2 text-cyan-600" />
              Basic Information
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Category:</span>
                <span className="text-sm font-medium text-gray-900">{selectedAsset.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Serial Number:</span>
                <span className="text-sm font-mono text-gray-900">{selectedAsset.serialNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Supplier:</span>
                <span className="text-sm text-gray-900">{selectedAsset.supplier || 'N/A'}</span>
              </div>
              {selectedAsset.assignedTo && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Assigned To:</span>
                  <span className="text-sm font-medium text-blue-600">{selectedAsset.assignedTo}</span>
                </div>
              )}
            </div>
          </Card>

          {/* Location & Dates */}
          <Card className="p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-cyan-600" />
              Location & Dates
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Current Location:</span>
                <span className="text-sm font-medium text-gray-900">{selectedAsset.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Purchase Date:</span>
                <span className="text-sm text-gray-900">{selectedAsset.purchaseDate || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Warranty Expiry:</span>
                <span className="text-sm text-gray-900">{selectedAsset.warrantyExpiry || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Last Updated:</span>
                <span className="text-sm text-gray-900">{selectedAsset.lastUpdated}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Description */}
        {selectedAsset.description && (
          <Card className="p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Description</h4>
            <p className="text-sm text-gray-700 leading-relaxed">{selectedAsset.description}</p>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <Button
            variant="secondary"
            onClick={() => {
              setShowViewModal(false);
              setSelectedAsset(null);
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
            Edit Asset
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600">Manage your assets and equipment</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Asset
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Package className="h-5 w-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-lg font-semibold text-gray-900">
                {assets.filter(a => a.status === 'available').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Checked Out</p>
              <p className="text-lg font-semibold text-gray-900">
                {assets.filter(a => a.status === 'checked_out').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-2 bg-cyan-100 rounded-lg">
              <DollarSign className="h-5 w-5 text-cyan-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-lg font-semibold text-gray-900">
                {assets.filter(a => a.status === 'pending').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Package className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Maintenance</p>
              <p className="text-lg font-semibold text-gray-900">
                {assets.filter(a => a.status === 'maintenance').length}
              </p>
            </div>
          </div>
        </Card>

      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="checked_out">Checked Out</option>
              <option value="maintenance">Maintenance</option>
              <option value="retired">Retired</option>
            </select>
            <Button variant="secondary" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Assets Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <Package className="h-5 w-5 text-cyan-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                        <div className="text-sm text-gray-500">{asset.serialNumber}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                      {asset.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(asset.status)}`}>
                      <span className="mr-1">{getStatusIcon(asset.status)}</span>
                      {asset.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                      {asset.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${asset.value.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-cyan-600 hover:text-cyan-900 p-1 rounded hover:bg-cyan-50 transition-colors"
                        onClick={() => {
                          setSelectedAsset(asset);
                          setShowViewModal(true);
                        }}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50 transition-colors"
                        onClick={() => {
                          setSelectedAsset(asset);
                          setShowEditModal(true);
                        }}
                        title="Edit Asset"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                        title="Delete Asset"
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

      {/* Add Asset Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Asset"
        size="lg"
      >
        <AssetForm onSubmit={() => setShowAddModal(false)} onCancel={() => setShowAddModal(false)} />
      </Modal>

      {/* Edit Asset Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedAsset(null);
        }}
        title="Edit Asset"
        size="lg"
      >
        <AssetForm
          asset={selectedAsset}
          onSubmit={() => {
            setShowEditModal(false);
            setSelectedAsset(null);
          }}
          onCancel={() => {
            setShowEditModal(false);
            setSelectedAsset(null);
          }}
        />
      </Modal>

      {/* View Asset Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedAsset(null);
        }}
        title="Asset Details"
        size="xl"
      >
        <AssetViewModal />
      </Modal>
    </div>
  );
};
