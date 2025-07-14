import React, { useState } from 'react';
import { Activity, Search, Filter, User, Package, ArrowRightLeft, Settings } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

const mockActivities = [
  {
    id: '1',
    timestamp: '2024-01-15 14:30:25',
    user: 'John Doe',
    action: 'Checked out',
    target: 'MacBook Pro 16"',
    details: 'Asset checked out for development work',
    type: 'checkout',
    ipAddress: '192.168.1.100'
  },
  {
    id: '2',
    timestamp: '2024-01-15 14:15:12',
    user: 'Admin User',
    action: 'Created',
    target: 'New Asset',
    details: 'iPhone 14 Pro added to inventory',
    type: 'asset',
    ipAddress: '192.168.1.50'
  },
  {
    id: '3',
    timestamp: '2024-01-15 13:45:33',
    user: 'Sarah Wilson',
    action: 'Updated',
    target: 'User Profile',
    details: 'Changed department from IT to HR',
    type: 'user',
    ipAddress: '192.168.1.75'
  },
  {
    id: '4',
    timestamp: '2024-01-15 13:30:18',
    user: 'System',
    action: 'Backup',
    target: 'Database',
    details: 'Daily database backup completed successfully',
    type: 'system',
    ipAddress: '127.0.0.1'
  },
  {
    id: '5',
    timestamp: '2024-01-15 12:20:45',
    user: 'Mike Johnson',
    action: 'Returned',
    target: 'Dell Monitor 27"',
    details: 'Asset returned in good condition',
    type: 'checkout',
    ipAddress: '192.168.1.125'
  }
];

export const ActivityLogPage = () => {
  const [activities] = useState(mockActivities);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');

  const getTypeIcon = (type) => {
    switch (type) {
      case 'asset': return <Package className="h-4 w-4" />;
      case 'user': return <User className="h-4 w-4" />;
      case 'checkout': return <ArrowRightLeft className="h-4 w-4" />;
      case 'system': return <Settings className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'asset': return 'bg-blue-100 text-blue-800';
      case 'user': return 'bg-green-100 text-green-800';
      case 'checkout': return 'bg-orange-100 text-orange-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredActivities = activities.filter(activity => {
    const lowerSearch = searchTerm.toLowerCase();
    const matchesSearch =
      activity.user.toLowerCase().includes(lowerSearch) ||
      activity.action.toLowerCase().includes(lowerSearch) ||
      activity.target.toLowerCase().includes(lowerSearch) ||
      activity.details.toLowerCase().includes(lowerSearch);

    const matchesType = typeFilter === 'all' || activity.type === typeFilter;

    // For demo: show all activities regardless of date filter
    const matchesDate = true;

    return matchesSearch && matchesType && matchesDate;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Activity Log</h1>
        <p className="text-gray-600">Monitor all system activities and user actions</p>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="asset">Asset</option>
              <option value="user">User</option>
              <option value="checkout">Checkout</option>
              <option value="system">System</option>
            </select>

            <select
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last_7_days">Last 7 days</option>
              <option value="last_30_days">Last 30 days</option>
            </select>

            <Button variant="secondary" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </Card>

      {/* Activity Timeline */}
      <Card className="p-6">
        <div className="space-y-4">
          {filteredActivities.map((activity, index) => (
            <div key={activity.id} className="relative">
              {index !== filteredActivities.length - 1 && (
                <div className="absolute left-6 top-12 bottom-0 w-px bg-gray-200" />
              )}

              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getTypeColor(activity.type)}`}>
                  {getTypeIcon(activity.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        <span className="font-semibold">{activity.user}</span> {activity.action.toLowerCase()} <span className="font-semibold">{activity.target}</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                    </div>
                    <time className="text-xs text-gray-500 whitespace-nowrap">
                      {activity.timestamp}
                    </time>
                  </div>

                  <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                    <span>IP: {activity.ipAddress}</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(activity.type)}`}>
                      {activity.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="secondary">
            Load More Activities
          </Button>
        </div>
      </Card>
    </div>
  );
};
