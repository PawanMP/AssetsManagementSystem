import React, { useState, useRef } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Upload } from 'lucide-react';

const mockSuppliers = [
  { id: '1', name: 'TechFlow Solutions', phone: '+1 (555) 123-4567', email: 'contact@techflow.com' },
  { id: '2', name: 'Office Depot Pro', phone: '+1 (555) 987-6543', email: 'business@officedepot.com' },
  { id: '3', name: 'GlobalTech Supplies', phone: '+1 (555) 456-7890', email: 'sales@globaltech.com' }
];

export const InvoiceForm = ({ invoice, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    invoiceNumber: invoice?.invoiceNumber || '',
    supplierId: invoice?.supplierId || '',
    supplierName: invoice?.supplierName || '',
    supplierPhone: invoice?.supplierPhone || '',
    supplierEmail: invoice?.supplierEmail || '',
    date: invoice?.date || new Date().toISOString().slice(0, 16),
    description: invoice?.description || ''
  });

  const [supplierSearch, setSupplierSearch] = useState(formData.supplierName || '');
  const [showSupplierOptions, setShowSupplierOptions] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const supplierInputRef = useRef();

  const filteredSuppliers = mockSuppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(supplierSearch.toLowerCase())
  );

  const handleSupplierSelect = (supplier) => {
    setFormData(prev => ({
      ...prev,
      supplierId: supplier.id,
      supplierName: supplier.name,
      supplierPhone: supplier.phone,
      supplierEmail: supplier.email
    }));
    setSupplierSearch(supplier.name);
    setShowSupplierOptions(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare form data to submit, including file if selected
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (selectedFile) {
      data.append('file', selectedFile);
    }

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Searchable Supplier Dropdown */}
      <div className="relative space-y-1">
        <label className="block text-sm font-medium text-gray-700">Select Supplier</label>
        <input
          type="text"
          name="supplierName"
          value={supplierSearch}
          onChange={(e) => {
            setSupplierSearch(e.target.value);
            setShowSupplierOptions(true);
            setFormData(prev => ({ ...prev, supplierId: '' })); // Clear supplierId when typing
          }}
          onFocus={() => setShowSupplierOptions(true)}
          onBlur={() => {
            // Delay hiding dropdown to allow click on options
            setTimeout(() => setShowSupplierOptions(false), 150);
          }}
          placeholder="Search or select supplier..."
          className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
          ref={supplierInputRef}
          autoComplete="off"
        />

        {showSupplierOptions && (
          <ul className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
            {filteredSuppliers.length > 0 ? (
              filteredSuppliers.map(supplier => (
                <li
                  key={supplier.id}
                  className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-700"
                  onMouseDown={() => handleSupplierSelect(supplier)} // use onMouseDown to prevent blur before click
                >
                  {supplier.name}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-sm text-gray-500">No matching suppliers</li>
            )}
          </ul>
        )}
      </div>

      {/* Supplier Info Display */}
      {formData.supplierId && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg mt-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Supplier Name</label>
            <p className="text-sm text-gray-900 mt-1">{formData.supplierName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <p className="text-sm text-gray-900 mt-1">{formData.supplierPhone}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="text-sm text-gray-900 mt-1">{formData.supplierEmail}</p>
          </div>
        </div>
      )}

      {/* Invoice Number + Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Invoice Number"
          name="invoiceNumber"
          value={formData.invoiceNumber}
          onChange={handleChange}
          required
          placeholder="Enter invoice number"
        />
        <Input
          label="Issue Date & Time"
          name="date"
          type="datetime-local"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Document</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-cyan-400 transition-colors cursor-pointer relative">
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">
            {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
          </p>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="invoice-file"
          />
          <label
            htmlFor="invoice-file"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
          >
            Choose File
          </label>
          <p className="text-xs text-gray-500 mt-1">PNG, JPG, PDF up to 10MB</p>
        </div>

        {selectedFile?.type.startsWith('image/') && (
          <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="mt-4 h-32 mx-auto" />
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          placeholder="Enter invoice description or notes"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {invoice ? 'Update Invoice' : 'Add Invoice'}
        </Button>
      </div>
    </form>
  );
};
