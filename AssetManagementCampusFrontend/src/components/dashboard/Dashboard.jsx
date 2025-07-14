import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { DashboardOverview } from '../pages/DashboardOverview';
import { InventoryPage } from '../pages/InventoryPage';
import { SuppliersPage } from '../pages/SuppliersPage';
import { InvoicesPage } from '../pages/InvoicesPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ReportsPage } from '../pages/ReportsPage';
import { UserManagementPage } from '../pages/UserManagementPage';
import { ActivityLogPage } from '../pages/ActivityLogPage';
import { AdminManagementPage } from '../pages/AdminManagementPage';

export const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'inventory':
        return <InventoryPage />;
      case 'suppliers':
        return <SuppliersPage />;
      case 'invoices':
        return <InvoicesPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'reports':
        return <ReportsPage />;
      case 'users':
        return <UserManagementPage />;
      case 'activity':
        return <ActivityLogPage />;
      case 'admins':
        return <AdminManagementPage />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};