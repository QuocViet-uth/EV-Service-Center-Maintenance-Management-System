import React from 'react';
import Card from '../common/Card';
import ProgressBar from '../customer/ProgressBar';

const WorkOrderCard = ({ order }) => {
  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">
            {order.serviceType}
          </h3>
          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <p>👤 {order.customerName}</p>
            <p>🚗 {order.vehicle}</p>
            <p>🔧 Kỹ thuật viên: {order.technician}</p>
            <p>⏱️ Thời gian ước tính: {order.estimatedTime}</p>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Tiến độ</span>
            <span className="text-sm font-semibold text-gray-800 dark:text-white">
              {order.progress}%
            </span>
          </div>
          <ProgressBar progress={order.progress} />
        </div>

        <div className="flex gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
          <button className="flex-1 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm">
            Xem checklist
          </button>
          <button className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm text-gray-700 dark:text-gray-300">
            Chi tiết
          </button>
        </div>
      </div>
    </Card>
  );
};

export default WorkOrderCard;

