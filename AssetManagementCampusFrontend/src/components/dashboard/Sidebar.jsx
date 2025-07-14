import React from 'react';
import {
  LayoutDashboard,
  Package,
  Truck,
  ArrowRightLeft,
  BarChart3,
  Users,
  Activity,
  UserCog,
  FileText,
  X
} from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

// Navigation items without TypeScript types
const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'suppliers', label: 'Suppliers', icon: Truck },
  { id: 'invoices', label: 'Invoices', icon: FileText, permission: 'manage_invoices' },
  { id: 'checkout', label: 'Check-in/out', icon: ArrowRightLeft },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'users', label: 'User Records', icon: Users, permission: 'manage_users' },
  { id: 'admins', label: 'Admin Management', icon: UserCog, permission: 'manage_admins' },
  { id: 'activity', label: 'Activity Log', icon: Activity, permission: 'view_activity_logs' },
];

export const Sidebar = ({ currentPage, onPageChange, isOpen, onClose }) => {
  const { user, hasPermission } = useUser();

  const filteredNavItems = navItems.filter(item =>
    !item.permission || hasPermission(item.permission)
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 shadow-2xl transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-blue-700/50">
          <div className="flex items-center space-x-3">
            {/* Saegis-inspired logo */}
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-md">
              <img
                src="/photo/logo.jpeg"
                alt="Saegis Logo"
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Saegis Campus</h1>
              <p className="text-xs text-cyan-200">Asset Management</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md text-cyan-200 hover:text-white hover:bg-blue-700/50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id);
                  onClose();
                }}
                className={`
                  w-full flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200
                  ${isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg transform scale-105'
                    : 'text-cyan-100 hover:bg-blue-700/50 hover:text-white hover:transform hover:scale-105'
                  }
                `}
              >
                <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-cyan-300'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-blue-700/50">
          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="h-10 w-10 rounded-full object-cover border-2 border-cyan-400"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.name}
              </p>
              <p className="text-xs text-cyan-200 capitalize">
                {user?.role?.replace('_', ' ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
