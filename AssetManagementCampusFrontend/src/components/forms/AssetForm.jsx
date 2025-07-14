import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

const categoryOptions = ['Laptop', 'Mobile', 'Monitor', 'Printer', 'Furniture', 'Other'];
const nameOptions = ['MacBook Pro 16"', 'iPhone 14 Pro', 'Dell Monitor 27"', 'HP LaserJet Pro', 'Surface Pro 9'];
const supplierOptions = [
  { id: '1', name: 'Apple Inc.' },
  { id: '2', name: 'Dell Technologies' },
  { id: '3', name: 'HP Inc.' },
  { id: '4', name: 'Microsoft' },
  { id: '5', name: 'Canon Inc.' }
];
const invoiceOptions = ['INV001', 'INV002', 'INV003', 'INV004'];
const statusOptions = ['available', 'maintenance', 'retired'];

export const AssetForm = ({ asset, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    category: asset?.category || '',
    name: asset?.name || '',
    price: asset?.price || '',
    serialNumber: asset?.serialNumber || '',
    supplierId: asset?.supplierId || '',
    invoiceId: asset?.invoiceId || '',
    location: asset?.location || '',
    status: asset?.status || 'available',
    description: asset?.description || '',
  });

  const [search, setSearch] = useState({
    category: formData.category,
    name: formData.name,
    supplierId: formData.supplierId,
    invoiceId: formData.invoiceId,
    status: formData.status,
  });

  const [dropdownVisible, setDropdownVisible] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSearch(prev => ({ ...prev, [name]: value }));
  };

  const handleSelect = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSearch(prev => ({ ...prev, [field]: value }));
    setDropdownVisible(prev => ({ ...prev, [field]: false }));
  };

  const filtered = (options, field) =>
    options.filter(opt => {
      const label = typeof opt === 'string' ? opt : opt.name;
      return label.toLowerCase().includes((search[field] || '').toLowerCase());
    });

  const renderDropdown = (options, field, labelKey = 'name', valueKey = 'id') => (
    <div className="relative">
      <input
        type="text"
        name={field}
        value={search[field] || ''}
        onChange={(e) => {
          setSearch(prev => ({ ...prev, [field]: e.target.value }));
          setDropdownVisible(prev => ({ ...prev, [field]: true }));
        }}
        onFocus={() => setDropdownVisible(prev => ({ ...prev, [field]: true }))}
        onBlur={() => setTimeout(() => setDropdownVisible(prev => ({ ...prev, [field]: false })), 150)}
        placeholder={`Search or select ${field}...`}
        className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500"
        required
        autoComplete="off"
      />
      {dropdownVisible[field] && (
        <ul className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md border bg-white shadow">
          {filtered(options, field).length > 0 ? (
            filtered(options, field).map((opt) => {
              const label = typeof opt === 'string' ? opt : opt[labelKey];
              const value = typeof opt === 'string' ? opt : opt[valueKey];
              return (
                <li
                  key={value}
                  className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                  onClick={() => handleSelect(field, value)}
                >
                  {label}
                </li>
              );
            })
          ) : (
            <li className="px-4 py-2 text-sm text-gray-500">No matches found</li>
          )}
        </ul>
      )}
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        {renderDropdown(categoryOptions, 'category')}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Asset Name</label>
        {renderDropdown(nameOptions, 'name')}
      </div>

      <Input
        label="Asset Price"
        name="price"
        type="number"
        min="0"
        value={formData.price}
        onChange={handleChange}
        required
        placeholder="Enter asset price"
      />

      <Input
        label="Serial Number"
        name="serialNumber"
        value={formData.serialNumber}
        onChange={handleChange}
        required
        placeholder="Enter serial number"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Supplier</label>
          {renderDropdown(supplierOptions, 'supplierId')}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Invoice</label>
          {renderDropdown(invoiceOptions, 'invoiceId')}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          placeholder="Enter current location"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          {renderDropdown(statusOptions, 'status')}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500"
          placeholder="Enter asset description (optional)"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {asset ? 'Update Asset' : 'Add Asset'}
        </Button>
      </div>
    </form>
  );
};
