import React from 'react';
import { motion } from 'motion/react';
import Card from '../common/Card';

export default function VehicleCard({ vehicle }) {
  if (!vehicle) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full"
    >
      <Card>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
              {vehicle.brand} {vehicle.model}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {vehicle.year} • {vehicle.licensePlate}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                Số km
              </p>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {vehicle.mileage?.toLocaleString('vi-VN') || 'N/A'} km
              </p>
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                Pin
              </p>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {vehicle.batteryHealth || 'N/A'}%
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Lần bảo dưỡng cuối:{' '}
              <span className="font-medium text-gray-800 dark:text-white">
                {vehicle.lastService
                  ? new Date(vehicle.lastService).toLocaleDateString('vi-VN')
                  : 'Chưa có'}
              </span>
            </p>
            {vehicle.vin && (
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                VIN: {vehicle.vin}
              </p>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
