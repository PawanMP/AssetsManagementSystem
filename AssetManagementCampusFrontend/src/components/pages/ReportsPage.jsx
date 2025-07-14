import React, { useState } from 'react';
import { BarChart3, Download, Calendar, FileText } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useUser } from '../../contexts/UserContext';

const reportTypes = [
  {
    id: 'checkout_report',
    title: 'Checkout Report',
    description: 'Weekly, monthly, and yearly summary of asset checkouts',
    icon: FileText,
    permission: null,
  },
  {
    id: 'asset_report',
    title: 'Asset Report',
    description: 'Current inventory and asset summary',
    icon: BarChart3,
    permission: null,
  },
  {
    id: 'activity_log',
    title: 'Activity Log Report',
    description: 'Track user logins, checkouts, and updates',
    icon: Calendar,
    permission: null,
  },
];

export const ReportsPage = () => {
  const { hasPermission } = useUser();
  const [selectedReport, setSelectedReport] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('monthly');
  const [customRange, setCustomRange] = useState({ from: '', to: '' });

  const filteredReports = reportTypes.filter(
    (report) => !report.permission || hasPermission(report.permission)
  );

  const handleGenerateReport = () => {
    const payload = {
      report: selectedReport,
      dateRange: selectedDateRange,
      ...(selectedDateRange === 'custom' ? { customRange } : {}),
    };
    console.log('Generating report:', payload);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600">Generate insights from your asset management data</p>
      </div>

      {/* Report Generator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Report</h3>

            <div className="space-y-4">
              {/* Report Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                <select
                  value={selectedReport}
                  onChange={(e) => setSelectedReport(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select a report type</option>
                  {filteredReports.map((report) => (
                    <option key={report.id} value={report.id}>
                      {report.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Range Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
                <select
                  value={selectedDateRange}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              {/* Custom Date Range Picker */}
              {selectedDateRange === 'custom' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                    <input
                      type="date"
                      value={customRange.from}
                      onChange={(e) => setCustomRange(prev => ({ ...prev, from: e.target.value }))}
                      className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                    <input
                      type="date"
                      value={customRange.to}
                      onChange={(e) => setCustomRange(prev => ({ ...prev, to: e.target.value }))}
                      className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex space-x-3">
                <Button onClick={handleGenerateReport} disabled={!selectedReport}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="secondary">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                <Button variant="secondary">
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Report Types List */}
        <div>
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Reports</h3>
            <div className="space-y-3">
              {filteredReports.map((report) => {
                const Icon = report.icon;
                return (
                  <div key={report.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start">
                      <Icon className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{report.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{report.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Reports */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
        <div className="space-y-3">
          {[
            { name: 'Checkout Report - June 2025', date: '2025-07-01', size: '2.1 MB' },
            { name: 'Asset Report - Q2 2025', date: '2025-06-30', size: '3.0 MB' },
            { name: 'Activity Log - June 2025', date: '2025-07-01', size: '2.5 MB' },
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{report.name}</p>
                  <p className="text-xs text-gray-500">
                    Generated on {report.date} • {report.size}
                  </p>
                </div>
              </div>
              <Button variant="secondary" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
