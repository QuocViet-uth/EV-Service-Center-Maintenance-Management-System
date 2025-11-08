import React from 'react';
import Card from '../common/Card';

export default function ServiceHistory({ records = [] }) {
  if (!records || records.length === 0) {
    return (
      <Card title="Lịch sử dịch vụ">
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          Chưa có lịch sử dịch vụ
        </p>
      </Card>
    );
  }

  return (
    <Card title="Lịch sử dịch vụ">
      <div className="space-y-4">
        {records.map((record) => (
          <div
            key={record.id}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                  {record.type}
                </h4>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>📅 {new Date(record.date).toLocaleDateString('vi-VN')}</span>
                  {record.odometer && (
                    <span>🚗 {record.odometer.toLocaleString('vi-VN')} km</span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-gray-800 dark:text-white">
                  {record.total?.toLocaleString('vi-VN') || '0'} ₫
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
