import React from 'react';
import Card from '../common/Card';

const ReportsPanel = ({ financialData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Financial Summary */}
      <Card title="Tổng quan tài chính">
        <div className="space-y-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Doanh thu</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {financialData.revenue.toLocaleString('vi-VN')} ₫
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Tăng {financialData.monthlyGrowth}% so với tháng trước
            </p>
          </div>

          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Chi phí</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              {financialData.expenses.toLocaleString('vi-VN')} ₫
            </p>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Lợi nhuận</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {financialData.profit.toLocaleString('vi-VN')} ₫
            </p>
          </div>
        </div>
      </Card>

      {/* Service Statistics */}
      <Card title="Thống kê dịch vụ">
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="text-gray-700 dark:text-gray-300">Bảo dưỡng - Gói Plus</span>
            <span className="font-semibold text-gray-800 dark:text-white">45%</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="text-gray-700 dark:text-gray-300">Bảo dưỡng - Gói Normal</span>
            <span className="font-semibold text-gray-800 dark:text-white">30%</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="text-gray-700 dark:text-gray-300">Sửa chữa - Pin</span>
            <span className="font-semibold text-gray-800 dark:text-white">15%</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="text-gray-700 dark:text-gray-300">Sửa chữa - Khác</span>
            <span className="font-semibold text-gray-800 dark:text-white">10%</span>
          </div>
        </div>
      </Card>

      {/* Trend Analysis */}
      <Card title="Xu hướng hỏng hóc EV" className="lg:col-span-2">
        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="font-semibold text-gray-800 dark:text-white mb-2">
              🔋 Pin/Battery - 35% các sự cố
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Phổ biến nhất, thường xảy ra sau 2-3 năm sử dụng
            </p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="font-semibold text-gray-800 dark:text-white mb-2">
              🛞 Hệ thống phanh - 25% các sự cố
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Tăng vào mùa mưa, cần bảo dưỡng định kỳ
            </p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="font-semibold text-gray-800 dark:text-white mb-2">
              ⚡ Hệ thống điện - 20% các sự cố
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Thường liên quan đến hệ thống sạc và quản lý năng lượng
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ReportsPanel;

