import React from 'react';
import { motion } from 'motion/react';

const ReminderCard = ({ reminder, onAction }) => {
  const getReminderTypeColor = (type) => {
    switch (type) {
      case 'maintenance':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'payment':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      case 'renewal':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const getReminderIcon = (type) => {
    switch (type) {
      case 'maintenance':
        return '🔧';
      case 'payment':
        return '💳';
      case 'renewal':
        return '🔄';
      default:
        return '📌';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className={`text-2xl ${getReminderTypeColor(reminder.type)} p-2 rounded-lg`}>
            {getReminderIcon(reminder.type)}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800 dark:text-white mb-1">
              {reminder.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {reminder.description}
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
              {reminder.dueDate && (
                <span>📅 {new Date(reminder.dueDate).toLocaleDateString('vi-VN')}</span>
              )}
              {reminder.dueKm && (
                <span>🚗 Còn {reminder.dueKm} km</span>
              )}
            </div>
          </div>
        </div>
        {onAction && (
          <button
            onClick={() => onAction(reminder)}
            className="px-3 py-1 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Xem
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ReminderCard;
