import React from 'react';

const Checklist = ({ items = [], onToggle }) => {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <label
          key={item.id}
          className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
        >
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => onToggle && onToggle(item.id)}
            className="w-5 h-5 text-primary rounded focus:ring-primary focus:ring-2"
          />
          <span
            className={`ml-3 flex-1 ${
              item.completed
                ? 'text-gray-500 dark:text-gray-500 line-through'
                : 'text-gray-800 dark:text-white'
            }`}
          >
            {item.task}
          </span>
          {item.completed && (
            <span className="text-green-500 ml-2">✓</span>
          )}
        </label>
      ))}
    </div>
  );
};

export default Checklist;

