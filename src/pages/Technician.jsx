import React, { useState } from 'react';
import { motion } from 'motion/react';
import { toast, Toaster } from 'react-hot-toast';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Checklist from '../components/technician/Checklist';
import ProgressBar from '../components/customer/ProgressBar';

const Technician = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [activeTab, setActiveTab] = useState('workorders');

  const [workOrders] = useState([
    {
      id: 1,
      customerName: 'Nguyễn Văn A',
      vehicle: 'Tesla Model 3',
      serviceType: 'Bảo dưỡng - Gói Plus',
      status: 'processing',
      progress: 60,
      vin: 'TSL123456789',
      mileage: 15000,
      checklist: [
        { id: 1, task: 'Kiểm tra pin và hệ thống điện', completed: true },
        { id: 2, task: 'Kiểm tra hệ thống phanh', completed: true },
        { id: 3, task: 'Kiểm tra lốp xe', completed: false },
        { id: 4, task: 'Vệ sinh cơ bản', completed: false },
        { id: 5, task: 'Kiểm tra và cập nhật phần mềm', completed: false },
        { id: 6, task: 'Kiểm tra hệ thống làm mát', completed: false },
      ],
      vehicleCondition: {
        battery: 'Tốt',
        brakes: 'Tốt',
        tires: 'Cần thay',
        cooling: 'Bình thường',
      },
    },
    {
      id: 2,
      customerName: 'Trần Thị B',
      vehicle: 'VinFast VF8',
      serviceType: 'Sửa chữa - Pin/Battery',
      status: 'pending',
      progress: 0,
      vin: 'VFS987654321',
      mileage: 8000,
      checklist: [
        { id: 1, task: 'Kiểm tra pin', completed: false },
        { id: 2, task: 'Thay pin nếu cần', completed: false },
        { id: 3, task: 'Kiểm tra hệ thống sạc', completed: false },
      ],
      vehicleCondition: {
        battery: 'Yếu - Cần thay',
        brakes: 'Tốt',
        tires: 'Tốt',
        cooling: 'Bình thường',
      },
    },
  ]);

  const handleUpdateProgress = (orderId, progress) => {
    toast.success('Đã cập nhật tiến độ');
    // In real app, update progress
  };

  const handleCompleteTask = (orderId, taskId) => {
    toast.success('Đã hoàn thành công việc');
    // In real app, update task status
  };

  const handleUpdateCondition = (orderId, condition) => {
    toast.success('Đã cập nhật tình trạng xe');
    // In real app, update vehicle condition
  };

  return (
    <div className="min-h-screen dark:bg-black bg-gray-50">
      <Toaster />
      <Header theme={theme} setTheme={setTheme} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Technician Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Quản lý quy trình bảo dưỡng và sửa chữa
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-4">
            {[
              { id: 'workorders', label: 'Phiếu dịch vụ', icon: '📋' },
              { id: 'completed', label: 'Đã hoàn thành', icon: '✅' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-600 dark:text-gray-400 hover:text-primary'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Work Orders Tab */}
        {activeTab === 'workorders' && (
          <div className="space-y-6">
            {workOrders.map((order) => (
              <Card key={order.id}>
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                        {order.serviceType}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <p>👤 Khách hàng: {order.customerName}</p>
                        <p>🚗 Xe: {order.vehicle}</p>
                        <p>🔢 VIN: {order.vin}</p>
                        <p>📊 Số km: {order.mileage.toLocaleString('vi-VN')} km</p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'pending'
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                          : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                      }`}
                    >
                      {order.status === 'pending' ? 'Chờ xử lý' : 'Đang xử lý'}
                    </span>
                  </div>

                  {/* Progress */}
                  {order.status === 'processing' && (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Tiến độ
                        </span>
                        <span className="text-sm font-semibold text-gray-800 dark:text-white">
                          {order.progress}%
                        </span>
                      </div>
                      <ProgressBar progress={order.progress} />
                    </div>
                  )}

                  {/* Vehicle Condition */}
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Tình trạng xe:
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Pin</p>
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {order.vehicleCondition.battery}
                        </p>
                      </div>
                      <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Phanh</p>
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {order.vehicleCondition.brakes}
                        </p>
                      </div>
                      <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Lốp</p>
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {order.vehicleCondition.tires}
                        </p>
                      </div>
                      <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Làm mát</p>
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {order.vehicleCondition.cooling}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Checklist */}
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Checklist:
                    </h4>
                    <Checklist
                      items={order.checklist}
                      onToggle={(taskId) => handleCompleteTask(order.id, taskId)}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                    {order.status === 'pending' && (
                      <Button
                        onClick={() => handleUpdateProgress(order.id, 10)}
                        variant="primary"
                        className="flex-1"
                      >
                        Bắt đầu
                      </Button>
                    )}
                    {order.status === 'processing' && (
                      <>
                        <Button
                          onClick={() => handleUpdateProgress(order.id, order.progress + 10)}
                          variant="secondary"
                          className="flex-1"
                        >
                          Cập nhật tiến độ
                        </Button>
                        <Button
                          onClick={() => handleUpdateProgress(order.id, 100)}
                          variant="primary"
                          className="flex-1"
                        >
                          Hoàn tất
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Completed Tab */}
        {activeTab === 'completed' && (
          <div className="space-y-6">
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              Chưa có phiếu dịch vụ nào đã hoàn thành
            </p>
          </div>
        )}
      </div>

      <Footer theme={theme} setTheme={setTheme} />
    </div>
  );
};

export default Technician;

