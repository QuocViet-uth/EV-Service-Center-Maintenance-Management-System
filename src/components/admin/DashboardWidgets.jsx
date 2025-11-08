import React from 'react';
import Card from '../common/Card';
import { motion } from 'motion/react';

const DashboardWidgets = ({ customers, appointments, inventory, staff, financialData }) => {
  const widgets = [
    {
      title: 'Tổng khách hàng',
      value: customers,
      icon: '👥',
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      title: 'Lịch hẹn hôm nay',
      value: appointments,
      icon: '📅',
      color: 'bg-green-500',
      change: '+5%',
    },
    {
      title: 'Phụ tùng trong kho',
      value: inventory,
      icon: '🔧',
      color: 'bg-purple-500',
      change: 'Stable',
    },
    {
      title: 'Nhân viên',
      value: staff,
      icon: '👨‍💼',
      color: 'bg-orange-500',
      change: 'Active',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {widgets.map((widget, index) => (
        <motion.div
          key={widget.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {widget.title}
                </p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  {widget.value}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {widget.change}
                </p>
              </div>
              <div
                className={`${widget.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}
              >
                {widget.icon}
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardWidgets;

