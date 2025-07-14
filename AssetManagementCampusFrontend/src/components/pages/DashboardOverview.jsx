import React from 'react';
import { Package, Users, AlertTriangle, TrendingUp, DollarSign, ShoppingCart } from 'lucide-react';
import { Card } from '../ui/Card';

const stats = [
  { name: 'Total Assets', value: '2,847', icon: Package, change: '+12%', changeType: 'positive' },
  { name: 'Available', value: '156', icon: Users, change: '+3%', changeType: 'positive' },
  { name: 'Checked Out', value: '342', icon: ShoppingCart, change: '+8%', changeType: 'positive' },
  { name: 'Maintenance Needed', value: '23', icon: AlertTriangle, change: '-2%', changeType: 'negative' },

];

const recentActivity = [
  { id: 1, user: 'John Doe', action: 'Checked out', asset: 'MacBook Pro 16"', time: '2 hours ago' },
  { id: 2, user: 'Sarah Wilson', action: 'Returned', asset: 'iPhone 14 Pro', time: '4 hours ago' },
  { id: 3, user: 'Mike Johnson', action: 'Checked out', asset: 'Dell Monitor', time: '6 hours ago' },
  { id: 4, user: 'Lisa Brown', action: 'Maintenance request', asset: 'Printer HP LaserJet', time: '8 hours ago' },
];

export const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Monitor your Saegis Campus asset management system performance</p>
      </div>

      {/* Stats Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {stats.map((stat) => {
    const Icon = stat.icon;
    return (
      <Card
        key={stat.name}
        className="p-8 min-h-[140px] flex flex-col justify-between hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-cyan-500"
      >
        <div className="flex items-center">
          <div className="p-3 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg">
            <Icon className="h-7 w-7 text-white" />
          </div>
          <div className="ml-4 flex-1">
            <p className="text-base font-medium text-gray-600">{stat.name}</p>
            <div className="flex items-baseline">
              <p className="text-3xl font-semibold text-gray-900">{stat.value}</p>
              <p
                className={`ml-2 text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-emerald-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </p>
            </div>
          </div>
        </div>
      </Card>
    );
  })}
</div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-cyan-600 rounded-full mr-3"></div>
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-100"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    <span className="text-cyan-600 font-semibold">{activity.user}</span> {activity.action.toLowerCase()}
                  </p>
                  <p className="text-sm text-gray-600">{activity.asset}</p>
                </div>
                <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-cyan-600 rounded-full mr-3"></div>
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 hover:from-cyan-100 hover:to-cyan-200 rounded-xl border border-cyan-200 transition-all duration-200 hover:shadow-md hover:scale-105">
              <Package className="h-6 w-6 text-cyan-600 mx-auto mb-2" />
              <span className="block text-sm font-medium text-cyan-900">Add Asset</span>
            </button>
            <button className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 rounded-xl border border-emerald-200 transition-all duration-200 hover:shadow-md hover:scale-105">
              <ShoppingCart className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
              <span className="block text-sm font-medium text-emerald-900">Check Out</span>
            </button>
            <button className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl border border-blue-200 transition-all duration-200 hover:shadow-md hover:scale-105">
              <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <span className="block text-sm font-medium text-blue-900">Add User</span>
            </button>
            <button className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl border border-purple-200 transition-all duration-200 hover:shadow-md hover:scale-105">
              <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <span className="block text-sm font-medium text-purple-900">View Reports</span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
