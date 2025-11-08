import React from 'react';
import Card from '../common/Card';
import ProgressBar from './ProgressBar';

export default function ServiceStatus({ appointments = [] }) {
  if (!appointments || appointments.length === 0) {
    return (
      <Card title="Trạng thái dịch vụ">
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          Chưa có dịch vụ nào
        </p>
      </Card>
    );
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'Chờ xử lý';
      case 'processing':
        return 'Đang xử lý';
      case 'completed':
        return 'Hoàn tất';
      default:
        return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      case 'processing':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  return (
    <Card title="Trạng thái dịch vụ">
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-1">
                  {appointment.serviceType}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(appointment.date).toLocaleString('vi-VN')}
                </p>
                {appointment.center && (
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    📍 {appointment.center}
                  </p>
                )}
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                  appointment.status
                )}`}
              >
                {getStatusLabel(appointment.status)}
              </span>
            </div>

            {appointment.status !== 'completed' && (
              <div className="mt-4">
                <ProgressBar progress={appointment.progress || 0} />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Tiến độ: {appointment.progress || 0}%
                </p>
              </div>
            )}

            {appointment.status === 'completed' && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm font-semibold text-green-800 dark:text-green-300">
                  ✅ Dịch vụ đã hoàn tất
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
