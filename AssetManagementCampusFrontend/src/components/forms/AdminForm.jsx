import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

const availablePermissions = [
  { id: 'manage_assets', label: 'Manage Assets' },
  { id: 'manage_users', label: 'Manage Users' },
  { id: 'manage_suppliers', label: 'Manage Suppliers' },
  { id: 'view_reports', label: 'View Reports' },
  { id: 'manage_checkouts', label: 'Manage Checkouts' },
  { id: 'view_activity_logs', label: 'View Activity Logs' }
];

// Example roles - replace or fetch dynamically as needed
const roleOptions = [
  { id: 'admin', label: 'Admin' },
  { id: 'superAdmin', label: 'Super Admin' }
];

export const AdminForm = ({ admin, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: admin?.name || '',
    email: admin?.email || '',
    phone: admin?.phone || '',           // Added phone field
    permissions: admin?.permissions || [],
    password: '',
    confirmPassword: '',
    role: admin?.role || '' // Add role to form data
  });

  const [permissionSearch, setPermissionSearch] = useState('');
  const [roleSearch, setRoleSearch] = useState(admin?.role || '');
  const [showRoleOptions, setShowRoleOptions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting admin:', formData);
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePermissionChange = (permissionId, checked) => {
    setFormData(prev => ({
      ...prev,
      permissions: checked
        ? [...prev.permissions, permissionId]
        : prev.permissions.filter(p => p !== permissionId)
    }));
  };

  const filteredPermissions = availablePermissions.filter(p =>
    p.label.toLowerCase().includes(permissionSearch.toLowerCase())
  );

  const filteredRoles = roleOptions.filter(role =>
    role.label.toLowerCase().includes(roleSearch.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter full name"
        />

        <Input
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter email address"
        />
      </div>

      {/* Phone Number Input */}
      <Input
        label="Phone Number"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Enter phone number"
      />

      {/* Searchable Role Dropdown */}
      <div className="space-y-1 relative">
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <input
          type="text"
          value={roleSearch}
          onChange={(e) => {
            setRoleSearch(e.target.value);
            setShowRoleOptions(true);
          }}
          onFocus={() => setShowRoleOptions(true)}
          onBlur={() => {
            setTimeout(() => setShowRoleOptions(false), 150);
          }}
          placeholder="Search or select role..."
          className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
        />
        {showRoleOptions && (
          <ul className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md border bg-white shadow-lg">
            {filteredRoles.length > 0 ? (
              filteredRoles.map((role) => (
                <li
                  key={role.id}
                  className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-700"
                  onMouseDown={() => {
                    setFormData(prev => ({ ...prev, role: role.id }));
                    setRoleSearch(role.label);
                    setShowRoleOptions(false);
                  }}
                >
                  {role.label}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-sm text-gray-500">No matching roles</li>
            )}
          </ul>
        )}
      </div>

      {!admin && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter password"
          />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm password"
          />
        </div>
      )}

      {/* Searchable Permissions List */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
        <input
          type="text"
          placeholder="Search permissions..."
          value={permissionSearch}
          onChange={(e) => setPermissionSearch(e.target.value)}
          className="mb-3 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto border rounded-md p-2 bg-white">
          {filteredPermissions.length ? (
            filteredPermissions.map((permission) => (
              <label key={permission.id} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-cyan-600 border-gray-300 rounded"
                  checked={formData.permissions.includes(permission.id)}
                  onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                />
                <span className="ml-2 text-sm text-gray-700">{permission.label}</span>
              </label>
            ))
          ) : (
            <p className="text-sm text-gray-500 col-span-2">No matching permissions.</p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {admin ? 'Update Admin' : 'Add Admin'}
        </Button>
      </div>
    </form>
  );
};
