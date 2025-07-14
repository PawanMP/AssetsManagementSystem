import React, { useState, useMemo } from 'react';
import {
  ArrowRightLeft, Clock, CheckCircle, XCircle, Package, Search, Filter,
  User, Building, Calendar, RefreshCw, Download
} from 'lucide-react';

import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

const mockCheckouts = [
  {
    id: '1',
    assetName: 'MacBook Pro 16"',
    assetId: 'MBP2023001',
    assetCategory: 'Laptop',
    userName: 'John Doe',
    userEmail: 'john.doe@saegis.edu',
    userDepartment: 'Engineering',
    checkoutDate: '2024-01-10',
    expectedReturn: '2024-01-24',
    status: 'checked_out',
    checkedOutBy: 'Admin User',
    notes: 'For development project',
    value: 2499
  },
  {
    id: '2',
    assetName: 'iPhone 14 Pro',
    assetId: 'IP14001',
    assetCategory: 'Mobile',
    userName: 'Sarah Wilson',
    userEmail: 'sarah.wilson@saegis.edu',
    userDepartment: 'Design',
    checkoutDate: '2024-01-08',
    expectedReturn: '2024-01-22',
    status: 'returned',
    returnDate: '2024-01-20',
    checkedOutBy: 'Admin User',
    checkedInBy: 'Admin User',
    notes: 'Design workshop equipment',
    value: 999
  },
  {
    id: '3',
    assetName: 'Dell Monitor 27"',
    assetId: 'DM27001',
    assetCategory: 'Monitor',
    userName: 'Mike Johnson',
    userEmail: 'mike.johnson@saegis.edu',
    userDepartment: 'Marketing',
    checkoutDate: '2023-12-15',
    expectedReturn: '2023-12-29',
    status: 'overdue',
    checkedOutBy: 'Super Admin',
    notes: 'Marketing presentation setup',
    value: 299
  },
  {
    id: '4',
    assetName: 'iPad Pro 11"',
    assetId: 'IP11001',
    assetCategory: 'Tablet',
    userName: 'Emily Davis',
    userEmail: 'emily.davis@saegis.edu',
    userDepartment: 'Design',
    checkoutDate: '2024-01-12',
    expectedReturn: '2024-01-26',
    status: 'checked_out',
    checkedOutBy: 'Admin User',
    notes: 'Client presentation',
    value: 799
  },
  {
    id: '5',
    assetName: 'Surface Pro 8',
    assetId: 'SP8001',
    assetCategory: 'Laptop',
    userName: 'David Brown',
    userEmail: 'david.brown@saegis.edu',
    userDepartment: 'Engineering',
    checkoutDate: '2024-01-05',
    expectedReturn: '2024-01-19',
    status: 'returned',
    returnDate: '2024-01-18',
    checkedOutBy: 'Super Admin',
    checkedInBy: 'Admin User',
    notes: 'Field testing',
    value: 1299
  }
];

export const CheckoutPage = () => {
  const [activeTab, setActiveTab] = useState('checkout');
  const [checkouts] = useState(mockCheckouts);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRangeFilter, setDateRangeFilter] = useState('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');
  const [adminFilter, setAdminFilter] = useState('all');

  const [checkoutForm, setCheckoutForm] = useState({
    assets: [{ assetType: '', assetId: '' }],
    userId: '',
    expectedReturn: '',
    expectedTime: '',
    notes: '',
    prepared: false
  });

  // Dropdown states for searchable functionality
  const [dropdownStates, setDropdownStates] = useState({});
  const [searchTerms, setSearchTerms] = useState({});

  // Computed values for filters
  const categories = useMemo(() =>
    [...new Set(checkouts.map(item => item.assetCategory))],
    [checkouts]
  );

  const departments = useMemo(() =>
    [...new Set(checkouts.map(item => item.userDepartment))],
    [checkouts]
  );

  const users = useMemo(() =>
    [...new Set(checkouts.map(item => item.userName))],
    [checkouts]
  );

  const admins = useMemo(() =>
    [...new Set(checkouts.map(item => item.checkedOutBy))],
    [checkouts]
  );

  // Filter checkouts based on current filters
  const filteredCheckouts = useMemo(() => {
    return checkouts.filter(checkout => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          checkout.assetName.toLowerCase().includes(searchLower) ||
          checkout.assetId.toLowerCase().includes(searchLower) ||
          checkout.userName.toLowerCase().includes(searchLower) ||
          checkout.userEmail.toLowerCase().includes(searchLower) ||
          checkout.userDepartment.toLowerCase().includes(searchLower) ||
          (checkout.notes && checkout.notes.toLowerCase().includes(searchLower));

        if (!matchesSearch) return false;
      }

      // Status filter
      if (statusFilter !== 'all' && checkout.status !== statusFilter) {
        return false;
      }

      // Category filter
      if (categoryFilter !== 'all' && checkout.assetCategory !== categoryFilter) {
        return false;
      }

      // Department filter
      if (departmentFilter !== 'all' && checkout.userDepartment !== departmentFilter) {
        return false;
      }

      // User filter
      if (userFilter !== 'all' && checkout.userName !== userFilter) {
        return false;
      }

      // Admin filter
      if (adminFilter !== 'all' && checkout.checkedOutBy !== adminFilter) {
        return false;
      }

      // Date range filter
      if (dateRangeFilter !== 'all') {
        const checkoutDate = new Date(checkout.checkoutDate);
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 2, today.getDate());

        switch (dateRangeFilter) {
          case 'today':
            if (checkoutDate < today) return false;
            break;
          case 'this_week':
            if (checkoutDate < weekAgo) return false;
            break;
          case 'this_month':
            if (checkoutDate < monthAgo) return false;
            break;
          case 'last_month':
            if (checkoutDate < lastMonth || checkoutDate >= monthAgo) return false;
            break;
        }
      }

      return true;
    });
  }, [checkouts, searchTerm, statusFilter, dateRangeFilter, categoryFilter, departmentFilter, userFilter, adminFilter]);

  // Helper functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'checked_out':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'returned':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'overdue':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'checked_out':
        return <Clock className="h-3 w-3" />;
      case 'returned':
        return <CheckCircle className="h-3 w-3" />;
      case 'overdue':
        return <XCircle className="h-3 w-3" />;
      default:
        return <Package className="h-3 w-3" />;
    }
  };

  // Helper functions for searchable dropdowns
  const toggleDropdown = (key) => {
    setDropdownStates(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const closeDropdown = (key) => {
    setTimeout(() => {
      setDropdownStates(prev => ({
        ...prev,
        [key]: false
      }));
    }, 150);
  };

  const updateSearchTerm = (key, value) => {
    setSearchTerms(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const selectOption = (key, value, callback) => {
    callback(value);
    updateSearchTerm(key, value);
    setDropdownStates(prev => ({
      ...prev,
      [key]: false
    }));
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setDateRangeFilter('all');
    setCategoryFilter('all');
    setDepartmentFilter('all');
    setUserFilter('all');
    setAdminFilter('all');
    setShowAdvancedFilters(false);
  };

  const exportData = () => {
    const csvContent = [
      ['Asset Name', 'Asset ID', 'Category', 'User', 'Department', 'Checkout Date', 'Expected Return', 'Status', 'Value'],
      ...filteredCheckouts.map(checkout => [
        checkout.assetName,
        checkout.assetId,
        checkout.assetCategory,
        checkout.userName,
        checkout.userDepartment,
        checkout.checkoutDate,
        checkout.expectedReturn,
        checkout.status,
        checkout.value || 0
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'checkout-history.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    console.log('Checkout form submitted:', checkoutForm);
    setCheckoutForm(prev => ({ ...prev, prepared: true }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Check-in/Checkout Management</h1>
        <p className="text-gray-600">Manage asset assignments and returns with advanced filtering</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'checkout', label: 'Check Out', icon: ArrowRightLeft },
            { id: 'checkin', label: 'Check In', icon: CheckCircle },
            { id: 'history', label: 'History & Analytics', icon: Clock }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                  ? 'border-cyan-500 text-cyan-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Check-out Form */}
      {activeTab === 'checkout' && (
        <Card className="p-6 max-w-4xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Prepare Asset Checkout</h3>
          <form onSubmit={handleCheckoutSubmit} className="space-y-6">

            {/* MULTIPLE ASSET SELECTION BLOCK */}
            <div className="space-y-4">
              {checkoutForm.assets.map((asset, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border p-4 rounded-lg bg-gray-50"
                >
                  {/* Asset Type - Searchable Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Asset Type</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchTerms[`assetType-${index}`] || asset.assetType}
                        onChange={(e) => {
                          updateSearchTerm(`assetType-${index}`, e.target.value);
                          toggleDropdown(`assetType-${index}`);
                        }}
                        onFocus={() => toggleDropdown(`assetType-${index}`)}
                        onBlur={() => closeDropdown(`assetType-${index}`)}
                        placeholder="Search or select asset type..."
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-cyan-500 focus:outline-none"
                        required
                      />
                      {dropdownStates[`assetType-${index}`] && (
                        <ul className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md border bg-white shadow-lg">
                          {[...new Set(mockCheckouts.map(item => item.assetCategory))]
                            .filter(type => type.toLowerCase().includes((searchTerms[`assetType-${index}`] || '').toLowerCase()))
                            .map(type => (
                              <li
                                key={type}
                                className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-700"
                                onClick={() => {
                                  const updated = [...checkoutForm.assets];
                                  updated[index].assetType = type;
                                  setCheckoutForm(prev => ({ ...prev, assets: updated }));
                                  selectOption(`assetType-${index}`, type, () => {});
                                }}
                              >
                                {type}
                              </li>
                            ))}
                          {[...new Set(mockCheckouts.map(item => item.assetCategory))]
                            .filter(type => type.toLowerCase().includes((searchTerms[`assetType-${index}`] || '').toLowerCase()))
                            .length === 0 && (
                            <li className="px-4 py-2 text-sm text-gray-500">No matching asset types</li>
                          )}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Asset Serial - Searchable Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Asset Serial</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchTerms[`assetId-${index}`] || asset.assetId}
                        onChange={(e) => {
                          updateSearchTerm(`assetId-${index}`, e.target.value);
                          toggleDropdown(`assetId-${index}`);
                        }}
                        onFocus={() => toggleDropdown(`assetId-${index}`)}
                        onBlur={() => closeDropdown(`assetId-${index}`)}
                        placeholder="Search or select asset serial..."
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-cyan-500 focus:outline-none"
                        required
                      />
                      {dropdownStates[`assetId-${index}`] && (
                        <ul className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md border bg-white shadow-lg">
                          {mockCheckouts
                            .filter(item => item.assetId.toLowerCase().includes((searchTerms[`assetId-${index}`] || '').toLowerCase()))
                            .map(item => (
                              <li
                                key={item.assetId}
                                className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-700"
                                onClick={() => {
                                  const updated = [...checkoutForm.assets];
                                  updated[index].assetId = item.assetId;
                                  setCheckoutForm(prev => ({ ...prev, assets: updated }));
                                  selectOption(`assetId-${index}`, item.assetId, () => {});
                                }}
                              >
                                {item.assetId} - {item.assetName}
                              </li>
                            ))}
                          {mockCheckouts
                            .filter(item => item.assetId.toLowerCase().includes((searchTerms[`assetId-${index}`] || '').toLowerCase()))
                            .length === 0 && (
                            <li className="px-4 py-2 text-sm text-gray-500">No matching asset serials</li>
                          )}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Remove Button */}
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md transition duration-200"
                      onClick={() => {
                        const filtered = checkoutForm.assets.filter((_, i) => i !== index);
                        setCheckoutForm(prev => ({ ...prev, assets: filtered }));
                      }}
                      disabled={checkoutForm.assets.length === 1}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setCheckoutForm(prev => ({
                    ...prev,
                    assets: [...prev.assets, { assetType: '', assetId: '' }]
                  }))
                }
              >
                + Add Another Asset
              </Button>
            </div>

            {/* COMMON FIELDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Requester Email - Searchable Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Requester Email</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerms['userId'] || checkoutForm.userId}
                    onChange={(e) => {
                      updateSearchTerm('userId', e.target.value);
                      toggleDropdown('userId');
                    }}
                    onFocus={() => toggleDropdown('userId')}
                    onBlur={() => closeDropdown('userId')}
                    placeholder="Search or select requester email..."
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-cyan-500 focus:outline-none"
                    required
                  />
                  {dropdownStates['userId'] && (
                    <ul className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md border bg-white shadow-lg">
                      {[...new Set(mockCheckouts.map(item => item.userEmail))]
                        .filter(email => email.toLowerCase().includes((searchTerms['userId'] || '').toLowerCase()))
                        .map(email => (
                          <li
                            key={email}
                            className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-700"
                            onClick={() => {
                              setCheckoutForm(prev => ({ ...prev, userId: email }));
                              selectOption('userId', email, () => {});
                            }}
                          >
                            {email}
                          </li>
                        ))}
                      {[...new Set(mockCheckouts.map(item => item.userEmail))]
                        .filter(email => email.toLowerCase().includes((searchTerms['userId'] || '').toLowerCase()))
                        .length === 0 && (
                        <li className="px-4 py-2 text-sm text-gray-500">No matching emails</li>
                      )}
                    </ul>
                  )}
                </div>
              </div>

              {/* Expected Return Date */}
              <Input
                label="Expected Return Date"
                type="date"
                value={checkoutForm.expectedReturn}
                onChange={(e) => setCheckoutForm(prev => ({ ...prev, expectedReturn: e.target.value }))}
                required
              />

              {/* Expected Return Time */}
              <Input
                label="Expected Return Time"
                type="time"
                value={checkoutForm.expectedTime || ''}
                onChange={(e) => setCheckoutForm(prev => ({ ...prev, expectedTime: e.target.value }))}
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
              <textarea
                value={checkoutForm.notes}
                onChange={(e) => setCheckoutForm(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-cyan-500 focus:outline-none"
                placeholder="Additional notes"
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">Prepare Checkout</Button>

            {/* Confirmation Link */}
            {checkoutForm.prepared && (
              <Button
                variant="secondary"
                size="sm"
                className="w-full mt-3"
                onClick={() => alert(`Confirmation resent to ${checkoutForm.userId}`)}
              >
                Resend Confirmation Link
              </Button>
            )}
          </form>
        </Card>
      )}

      {/* Check-in Form */}
      {activeTab === 'checkin' && (
        <Card className="p-6 max-w-2xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Check In Asset</h3>
          <div className="space-y-4">
            <Input
              label="Asset ID/Serial or Scan Barcode"
              placeholder="Enter asset ID or scan barcode"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Condition Notes</label>
              <textarea
                rows={3}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                placeholder="Note any damage or issues with the returned asset"
              />
            </div>
            <Button className="w-full">
              Check In Asset
            </Button>
          </div>
        </Card>
      )}

      {/* History & Analytics */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          {/* Advanced Filters */}
          <Card className="p-6">
            <div className="flex flex-col space-y-4">
              {/* Basic Filters Row */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search assets, users, notes..."
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
                    <option value="checked_out">Checked Out</option>
                    <option value="returned">Returned</option>
                    <option value="overdue">Overdue</option>
                  </select>
                  <select
                    value={dateRangeFilter}
                    onChange={(e) => setDateRangeFilter(e.target.value)}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="this_week">This Week</option>
                    <option value="this_month">This Month</option>
                    <option value="last_month">Last Month</option>
                  </select>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    {showAdvancedFilters ? 'Hide' : 'More'} Filters
                  </Button>
                </div>
              </div>

              {/* Advanced Filters */}
              {showAdvancedFilters && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    >
                      <option value="all">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <select
                      value={departmentFilter}
                      onChange={(e) => setDepartmentFilter(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    >
                      <option value="all">All Departments</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">User</label>
                    <select
                      value={userFilter}
                      onChange={(e) => setUserFilter(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    >
                      <option value="all">All Users</option>
                      {users.map(user => (
                        <option key={user} value={user}>{user}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Admin</label>
                    <select
                      value={adminFilter}
                      onChange={(e) => setAdminFilter(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    >
                      <option value="all">All Admins</option>
                      {admins.map(admin => (
                        <option key={admin} value={admin}>{admin}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Filter Actions */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing {filteredCheckouts.length} of {checkouts.length} records
                </div>
                <div className="flex space-x-2">
                  <Button variant="secondary" size="sm" onClick={clearAllFilters}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Clear Filters
                  </Button>
                  <Button variant="secondary" size="sm" onClick={exportData}>
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* History Table */}
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Asset
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dates
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Admin
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCheckouts.map((checkout) => (
                    <tr key={checkout.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <Package className="h-5 w-5 text-cyan-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{checkout.assetName}</div>
                            <div className="text-sm text-gray-500">{checkout.assetId} • {checkout.assetCategory}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                            <User className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{checkout.userName}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Building className="h-3 w-3 mr-1" />
                              {checkout.userDepartment}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                            Out: {checkout.checkoutDate}
                          </div>
                          <div className="text-gray-500 mt-1">
                            Due: {checkout.expectedReturn}
                          </div>
                          {checkout.returnDate && (
                            <div className="text-green-600 mt-1">
                              Returned: {checkout.returnDate}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(checkout.status)}`}>
                          {getStatusIcon(checkout.status)}
                          <span className="ml-1">{checkout.status.replace('_', ' ')}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <div>Out: {checkout.checkedOutBy}</div>
                          {checkout.checkedInBy && (
                            <div className="text-gray-500 mt-1">In: {checkout.checkedInBy}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${checkout.value?.toLocaleString() || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredCheckouts.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No checkout records match your current filters</p>
                <Button variant="secondary" size="sm" className="mt-2" onClick={clearAllFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};