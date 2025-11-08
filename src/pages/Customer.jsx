import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import ReminderCard from '../components/common/ReminderCard';
import VehicleCard from '../components/customer/VehicleCard';
import ServiceStatus from '../components/customer/ServiceStatus';
import ServiceHistory from '../components/customer/ServiceHistory';
import PaymentMock from '../components/customer/PaymentMock';
import ChatWidget from '../components/common/ChatWidget';

const Customer = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showChat, setShowChat] = useState(false);

  // Mock data - in real app, this would come from API
  const [vehicles] = useState([
    {
      id: 1,
      brand: 'Tesla',
      model: 'Model 3',
      year: '2022',
      licensePlate: '30A-12345',
      mileage: 15000,
      batteryHealth: 95,
      lastService: '2024-01-15',
      vin: 'TSL123456789',
    },
    {
      id: 2,
      brand: 'VinFast',
      model: 'VF8',
      year: '2023',
      licensePlate: '29A-67890',
      mileage: 8000,
      batteryHealth: 98,
      lastService: '2024-02-01',
      vin: 'VFS987654321',
    },
  ]);

  const [reminders] = useState([
    {
      id: 1,
      type: 'maintenance',
      title: 'Bảo dưỡng định kỳ',
      description: 'Xe Tesla Model 3 cần bảo dưỡng định kỳ sau 20.000 km',
      dueDate: '2024-03-15',
      dueKm: 5000,
      vehicleId: 1,
    },
    {
      id: 2,
      type: 'payment',
      title: 'Thanh toán gói bảo dưỡng',
      description: 'Gói bảo dưỡng Plus sẽ hết hạn vào ngày 15/03/2024',
      dueDate: '2024-03-15',
      vehicleId: 1,
    },
    {
      id: 3,
      type: 'renewal',
      title: 'Gia hạn gói dịch vụ',
      description: 'Gói dịch vụ Premium sẽ hết hạn trong 30 ngày',
      dueDate: '2024-04-01',
      vehicleId: 2,
    },
  ]);

  const [appointments] = useState([
    {
      id: 1,
      serviceType: 'Bảo dưỡng - Gói Plus',
      date: '2024-03-10T09:00:00',
      center: 'Trung tâm Hà Nội',
      status: 'pending',
      progress: 0,
      vehicleId: 1,
    },
    {
      id: 2,
      serviceType: 'Sửa chữa - Pin/Battery',
      date: '2024-03-05T14:00:00',
      center: 'Trung tâm TP.HCM',
      status: 'processing',
      progress: 60,
      vehicleId: 2,
    },
    {
      id: 3,
      serviceType: 'Bảo dưỡng - Gói Normal',
      date: '2024-02-20T10:00:00',
      center: 'Trung tâm Hà Nội',
      status: 'completed',
      progress: 100,
      vehicleId: 1,
    },
  ]);

  const [serviceHistory] = useState([
    {
      id: 1,
      type: 'Bảo dưỡng - Gói Normal',
      date: '2024-02-20',
      odometer: 12000,
      total: 500000,
      vehicleId: 1,
    },
    {
      id: 2,
      type: 'Sửa chữa - Hệ thống phanh',
      date: '2024-01-15',
      odometer: 10000,
      total: 1200000,
      vehicleId: 1,
    },
    {
      id: 3,
      type: 'Bảo dưỡng - Gói Plus',
      date: '2024-02-01',
      odometer: 5000,
      total: 1200000,
      vehicleId: 2,
    },
  ]);

  const [invoices] = useState([
    {
      id: 1,
      date: '2024-03-10',
      amount: 1200000,
      paid: false,
      serviceId: 1,
    },
    {
      id: 2,
      date: '2024-02-20',
      amount: 500000,
      paid: true,
      serviceId: 3,
    },
  ]);

  const handleBookService = () => {
    navigate('/booking');
  };

  const handlePayInvoice = (invoiceId) => {
    // In real app, this would open payment modal
    toast.success('Đang chuyển đến trang thanh toán...');
    // Navigate to payment page or open payment modal
  };

  const handleReminderAction = (reminder) => {
    if (reminder.type === 'maintenance') {
      navigate('/booking');
    } else if (reminder.type === 'payment' || reminder.type === 'renewal') {
      // Show payment modal or navigate to payment
      toast.info('Chức năng thanh toán đang được phát triển');
    }
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
            Dashboard Khách hàng
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Quản lý xe và dịch vụ của bạn
          </p>
        </motion.div>

        {/* Tabs Navigation */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-4">
            {[
              { id: 'dashboard', label: 'Tổng quan' },
              { id: 'vehicles', label: 'Xe của tôi' },
              { id: 'services', label: 'Dịch vụ' },
              { id: 'history', label: 'Lịch sử' },
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
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Reminders Section */}
              <Card title="Nhắc nhở & Thông báo">
                <div className="space-y-4">
                  {reminders.length > 0 ? (
                    reminders.map((reminder) => (
                      <ReminderCard
                        key={reminder.id}
                        reminder={reminder}
                        onAction={handleReminderAction}
                      />
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                      Không có nhắc nhở nào
                    </p>
                  )}
                </div>
              </Card>

              {/* Service Status */}
              <Card title="Trạng thái dịch vụ">
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-white">
                            {appointment.serviceType}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(appointment.date).toLocaleString('vi-VN')}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            {appointment.center}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            appointment.status === 'pending'
                              ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                              : appointment.status === 'processing'
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                              : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                          }`}
                        >
                          {appointment.status === 'pending'
                            ? 'Chờ xử lý'
                            : appointment.status === 'processing'
                            ? 'Đang xử lý'
                            : 'Hoàn tất'}
                        </span>
                      </div>
                      {appointment.status !== 'completed' && (
                        <div className="mt-3">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-500"
                              style={{ width: `${appointment.progress}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Tiến độ: {appointment.progress}%
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card title="Thao tác nhanh">
                <div className="space-y-3">
                  <Button
                    onClick={handleBookService}
                    className="w-full"
                    variant="primary"
                  >
                    📅 Đặt lịch dịch vụ
                  </Button>
                  <Button
                    onClick={() => setActiveTab('vehicles')}
                    className="w-full"
                    variant="secondary"
                  >
                    🚗 Xem xe của tôi
                  </Button>
                  <Button
                    onClick={() => setShowChat(true)}
                    className="w-full"
                    variant="secondary"
                  >
                    💬 Chat hỗ trợ
                  </Button>
                </div>
              </Card>

              {/* Pending Payments */}
              <Card title="Hóa đơn chờ thanh toán">
                <div className="space-y-3">
                  {invoices
                    .filter((inv) => !inv.paid)
                    .map((invoice) => (
                      <div
                        key={invoice.id}
                        className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            #{invoice.id}
                          </span>
                          <span className="font-semibold text-gray-800 dark:text-white">
                            {invoice.amount.toLocaleString('vi-VN')} ₫
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">
                          {new Date(invoice.date).toLocaleDateString('vi-VN')}
                        </p>
                        <Button
                          onClick={() => handlePayInvoice(invoice.id)}
                          className="w-full"
                          variant="primary"
                        >
                          Thanh toán
                        </Button>
                      </div>
                    ))}
                  {invoices.filter((inv) => !inv.paid).length === 0 && (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4 text-sm">
                      Không có hóa đơn chờ thanh toán
                    </p>
                  )}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Vehicles Tab */}
        {activeTab === 'vehicles' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Xe của tôi
              </h2>
              <Button onClick={handleBookService} variant="primary">
                + Thêm xe mới
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Dịch vụ
              </h2>
              <Button onClick={handleBookService} variant="primary">
                + Đặt lịch mới
              </Button>
            </div>
            <ServiceStatus appointments={appointments} />
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Lịch sử dịch vụ
            </h2>
            <ServiceHistory records={serviceHistory} />
            <PaymentMock
              invoices={invoices}
              onPay={handlePayInvoice}
            />
          </div>
        )}
      </div>

      {/* Chat Widget */}
      {showChat && (
        <ChatWidget onClose={() => setShowChat(false)} />
      )}

      <Footer theme={theme} setTheme={setTheme} />
    </div>
  );
};

export default Customer;
