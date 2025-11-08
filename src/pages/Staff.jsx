import React, { useState } from 'react';
import { motion } from 'motion/react';
import { toast, Toaster } from 'react-hot-toast';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import WorkOrderCard from '../components/staff/WorkOrderCard';

const Staff = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [activeTab, setActiveTab] = useState('appointments');

  const [appointments] = useState([
    {
      id: 1,
      customerName: 'Nguyễn Văn A',
      vehicle: 'Tesla Model 3',
      serviceType: 'Bảo dưỡng - Gói Plus',
      date: '2024-03-10T09:00:00',
      status: 'pending',
      phone: '0901234567',
    },
    {
      id: 2,
      customerName: 'Trần Thị B',
      vehicle: 'VinFast VF8',
      serviceType: 'Sửa chữa - Pin/Battery',
      date: '2024-03-10T10:00:00',
      status: 'pending',
      phone: '0907654321',
    },
  ]);

  const [workOrders] = useState([
    {
      id: 1,
      customerName: 'Nguyễn Văn A',
      vehicle: 'Tesla Model 3',
      serviceType: 'Bảo dưỡng - Gói Plus',
      technician: 'Nguyễn Văn C',
      status: 'processing',
      progress: 60,
      estimatedTime: '2 giờ',
    },
    {
      id: 2,
      customerName: 'Trần Thị B',
      vehicle: 'VinFast VF8',
      serviceType: 'Sửa chữa - Pin/Battery',
      technician: 'Lê Văn D',
      status: 'processing',
      progress: 30,
      estimatedTime: '4 giờ',
    },
  ]);

  const [schedule] = useState([
    {
      id: 1,
      technician: 'Nguyễn Văn C',
      shift: 'Ca sáng (8:00-16:00)',
      appointments: [
        { time: '09:00', customer: 'Nguyễn Văn A', vehicle: 'Tesla Model 3' },
        { time: '11:00', customer: 'Trần Thị B', vehicle: 'VinFast VF8' },
      ],
    },
    {
      id: 2,
      technician: 'Lê Văn D',
      shift: 'Ca chiều (14:00-22:00)',
      appointments: [
        { time: '15:00', customer: 'Phạm Văn E', vehicle: 'BYD Atto 3' },
      ],
    },
  ]);

  const handleAcceptAppointment = (id) => {
    toast.success('Đã tiếp nhận yêu cầu đặt lịch');
    // In real app, update appointment status
  };

  const handleAssignTechnician = (appointmentId, technicianId) => {
    toast.success('Đã phân công kỹ thuật viên');
    // In real app, assign technician
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
            Staff Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Quản lý lịch hẹn và dịch vụ
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-4">
            {[
              { id: 'appointments', label: 'Lịch hẹn mới', icon: '📅' },
              { id: 'workorders', label: 'Phiếu dịch vụ', icon: '📋' },
              { id: 'schedule', label: 'Lịch kỹ thuật viên', icon: '👨‍🔧' },
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

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Yêu cầu đặt lịch mới
              </h2>
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
                        <p>📞 SĐT: {appointment.phone}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        onClick={() => handleAcceptAppointment(appointment.id)}
                        variant="primary"
                      >
                        Tiếp nhận
                      </Button>
                      <Button variant="secondary">Chi tiết</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Work Orders Tab */}
        {activeTab === 'workorders' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Phiếu tiếp nhận dịch vụ
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {workOrders.map((order) => (
                <WorkOrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Lịch kỹ thuật viên
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {schedule.map((techSchedule) => (
                <Card key={techSchedule.id}>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                        {techSchedule.technician}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {techSchedule.shift}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-700 dark:text-gray-300">
                        Lịch hẹn:
                      </h4>
                      {techSchedule.appointments.map((apt, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-gray-800 dark:text-white">
                                {apt.time}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {apt.customer} - {apt.vehicle}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer theme={theme} setTheme={setTheme} />
    </div>
  );
};

export default Staff;

