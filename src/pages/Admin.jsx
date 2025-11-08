import React, { useState } from 'react';
import { motion } from 'motion/react';
import { toast, Toaster } from 'react-hot-toast';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import DashboardWidgets from '../components/admin/DashboardWidgets';
import ReportsPanel from '../components/admin/ReportsPanel';

const Admin = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data
  const [customers] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      phone: '0901234567',
      vehicles: [
        { id: 1, brand: 'Tesla', model: 'Model 3', vin: 'TSL123456789', mileage: 15000 },
      ],
      totalServices: 5,
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@email.com',
      phone: '0907654321',
      vehicles: [
        { id: 2, brand: 'VinFast', model: 'VF8', vin: 'VFS987654321', mileage: 8000 },
      ],
      totalServices: 3,
    },
  ]);

  const [appointments] = useState([
    {
      id: 1,
      customerName: 'Nguyễn Văn A',
      vehicle: 'Tesla Model 3',
      serviceType: 'Bảo dưỡng - Gói Plus',
      date: '2024-03-10T09:00:00',
      status: 'pending',
      technician: null,
    },
    {
      id: 2,
      customerName: 'Trần Thị B',
      vehicle: 'VinFast VF8',
      serviceType: 'Sửa chữa - Pin/Battery',
      date: '2024-03-05T14:00:00',
      status: 'processing',
      technician: 'Nguyễn Văn C',
    },
  ]);

  const [inventory] = useState([
    { id: 1, name: 'Pin Lithium-ion 75kWh', quantity: 15, minStock: 10, status: 'good' },
    { id: 2, name: 'Bộ phanh trước', quantity: 8, minStock: 10, status: 'low' },
    { id: 3, name: 'Lốp xe EV', quantity: 25, minStock: 20, status: 'good' },
    { id: 4, name: 'Bộ làm mát pin', quantity: 5, minStock: 10, status: 'critical' },
  ]);

  const [staff] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn C',
      role: 'technician',
      shift: 'Ca sáng (8:00-16:00)',
      certifications: ['EV Technician Level 2', 'Battery Specialist'],
      performance: 95,
      workingHours: 160,
    },
    {
      id: 2,
      name: 'Trần Thị D',
      role: 'staff',
      shift: 'Ca chiều (14:00-22:00)',
      certifications: ['Customer Service'],
      performance: 88,
      workingHours: 150,
    },
  ]);

  const [financialData] = useState({
    revenue: 45000000,
    expenses: 12000000,
    profit: 33000000,
    monthlyGrowth: 15.5,
  });

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'customers', label: 'Khách hàng & Xe', icon: '👥' },
    { id: 'appointments', label: 'Lịch hẹn & Dịch vụ', icon: '📅' },
    { id: 'inventory', label: 'Phụ tùng', icon: '🔧' },
    { id: 'staff', label: 'Nhân sự', icon: '👨‍💼' },
    { id: 'financial', label: 'Tài chính & Báo cáo', icon: '💰' },
  ];

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
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Quản lý toàn bộ hệ thống EV Service Center
          </p>
        </motion.div>

        {/* Tabs Navigation */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${
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

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <DashboardWidgets
              customers={customers.length}
              appointments={appointments.length}
              inventory={inventory.length}
              staff={staff.length}
              financialData={financialData}
            />
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Quản lý khách hàng & Xe
              </h2>
              <Button variant="primary">+ Thêm khách hàng</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {customers.map((customer) => (
                <Card key={customer.id}>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                        {customer.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {customer.email} • {customer.phone}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Xe của khách hàng:
                      </h4>
                      {customer.vehicles.map((vehicle) => (
                        <div
                          key={vehicle.id}
                          className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg mb-2"
                        >
                          <p className="font-medium text-gray-800 dark:text-white">
                            {vehicle.brand} {vehicle.model}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            VIN: {vehicle.vin} • {vehicle.mileage.toLocaleString('vi-VN')} km
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Tổng dịch vụ: {customer.totalServices}
                      </span>
                      <div className="flex gap-2">
                        <Button variant="secondary" className="text-sm">
                          💬 Chat
                        </Button>
                        <Button variant="secondary" className="text-sm">
                          Xem chi tiết
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Quản lý lịch hẹn & Dịch vụ
              </h2>
              <Button variant="primary">+ Tạo lịch hẹn</Button>
            </div>

            <div className="space-y-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">
                        {appointment.serviceType}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <p>👤 Khách hàng: {appointment.customerName}</p>
                        <p>🚗 Xe: {appointment.vehicle}</p>
                        <p>📅 Ngày: {new Date(appointment.date).toLocaleString('vi-VN')}</p>
                        {appointment.technician && (
                          <p>🔧 Kỹ thuật viên: {appointment.technician}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
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
                      <div className="flex gap-2">
                        <Button variant="secondary" className="text-sm">
                          Chi tiết
                        </Button>
                        {appointment.status === 'pending' && (
                          <Button variant="primary" className="text-sm">
                            Phân công
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Quản lý phụ tùng
              </h2>
              <Button variant="primary">+ Thêm phụ tùng</Button>
            </div>

            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">
                        Tên phụ tùng
                      </th>
                      <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">
                        Số lượng
                      </th>
                      <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">
                        Tồn tối thiểu
                      </th>
                      <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">
                        Trạng thái
                      </th>
                      <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="py-3 px-4 text-gray-800 dark:text-white">
                          {item.name}
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                          {item.quantity}
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                          {item.minStock}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              item.status === 'good'
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                                : item.status === 'low'
                                ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                                : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                            }`}
                          >
                            {item.status === 'good'
                              ? 'Đủ'
                              : item.status === 'low'
                              ? 'Thấp'
                              : 'Nguy hiểm'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="secondary" className="text-sm">
                            Nhập kho
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* AI Suggestion */}
            <Card title="💡 Gợi ý từ AI">
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Dựa trên lịch sử:</strong> Phụ tùng "Bộ phanh trước" đang ở mức thấp.
                    Đề xuất nhập thêm 15 đơn vị để đảm bảo không thiếu hụt.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Dựa trên xu hướng:</strong> "Bộ làm mát pin" thường được thay thế
                    nhiều vào mùa hè. Đề xuất tăng tồn tối thiểu lên 15 đơn vị.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Staff Tab */}
        {activeTab === 'staff' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Quản lý nhân sự
              </h2>
              <Button variant="primary">+ Thêm nhân viên</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {staff.map((person) => (
                <Card key={person.id}>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                        {person.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {person.role === 'technician' ? '🔧 Kỹ thuật viên' : '👨‍💼 Nhân viên'}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Ca làm việc:</strong> {person.shift}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Hiệu suất:</strong>{' '}
                        <span className="font-semibold text-primary">{person.performance}%</span>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Giờ làm việc (tháng):</strong> {person.workingHours}h
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Chứng chỉ:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {person.certifications.map((cert, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-primary/10 text-primary rounded text-xs"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <Button variant="secondary" className="flex-1 text-sm">
                        Xem lịch
                      </Button>
                      <Button variant="secondary" className="flex-1 text-sm">
                        Chi tiết
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Financial Tab */}
        {activeTab === 'financial' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Tài chính & Báo cáo
            </h2>

            <ReportsPanel financialData={financialData} />
          </div>
        )}
      </div>

      <Footer theme={theme} setTheme={setTheme} />
    </div>
  );
};

export default Admin;

