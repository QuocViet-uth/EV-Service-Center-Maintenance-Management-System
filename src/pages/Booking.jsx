import React, { useState } from 'react';
import { motion } from 'motion/react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

const Booking = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  
  // Form data state
  const [formData, setFormData] = useState({
    // Vehicle data
    vehicleId: null,
    vehicleOption: 'new', // 'new' or 'existing'
    brand: '',
    model: '',
    year: '',
    batteryType: '',
    color: '',
    licensePlate: '',
    batteryCapacity: '',
    
    // Service data
    serviceType: '', // 'maintenance' or 'repair'
    maintenancePackage: '', // 'normal' or 'plus'
    damagedParts: [],
    issueDescription: '',
    
    // Schedule data
    appointmentDate: '',
    appointmentTime: '',
  });

  // Mock existing vehicles (in real app, this would come from API)
  const [existingVehicles] = useState([
    {
      id: 1,
      brand: 'Tesla',
      model: 'Model 3',
      year: '2022',
      batteryType: 'Lithium-ion',
      color: 'Đỏ',
      licensePlate: '30A-12345',
      batteryCapacity: '75',
    },
    {
      id: 2,
      brand: 'VinFast',
      model: 'VF8',
      year: '2023',
      batteryType: 'Lithium-ion',
      color: 'Trắng',
      licensePlate: '29A-67890',
      batteryCapacity: '90',
    },
  ]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleVehicleSelect = (vehicle) => {
    setFormData(prev => ({
      ...prev,
      vehicleId: vehicle.id,
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      batteryType: vehicle.batteryType,
      color: vehicle.color,
      licensePlate: vehicle.licensePlate,
      batteryCapacity: vehicle.batteryCapacity,
    }));
  };

  const handlePartToggle = (part) => {
    setFormData(prev => {
      const parts = prev.damagedParts.includes(part)
        ? prev.damagedParts.filter(p => p !== part)
        : [...prev.damagedParts, part];
      return { ...prev, damagedParts: parts };
    });
  };

  const validateStep1 = () => {
    if (formData.vehicleOption === 'existing' && !formData.vehicleId) {
      toast.error('Vui lòng chọn xe hoặc thêm xe mới');
      return false;
    }
    if (formData.vehicleOption === 'new') {
      if (!formData.brand || !formData.model || !formData.year || 
          !formData.batteryType || !formData.color || !formData.licensePlate) {
        toast.error('Vui lòng điền đầy đủ thông tin xe');
        return false;
      }
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.serviceType) {
      toast.error('Vui lòng chọn loại dịch vụ');
      return false;
    }
    if (formData.serviceType === 'maintenance' && !formData.maintenancePackage) {
      toast.error('Vui lòng chọn gói bảo dưỡng');
      return false;
    }
    if (formData.serviceType === 'repair') {
      if (formData.damagedParts.length === 0) {
        toast.error('Vui lòng chọn ít nhất một bộ phận bị hư');
        return false;
      }
      if (!formData.issueDescription.trim()) {
        toast.error('Vui lòng mô tả sự cố của xe');
        return false;
      }
    }
    return true;
  };

  const validateStep3 = () => {
    if (!formData.appointmentDate || !formData.appointmentTime) {
      toast.error('Vui lòng chọn ngày và giờ hẹn');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (!validateStep3()) return;
    
    // Here you would submit to API
    console.log('Booking data:', formData);
    toast.success('Đặt lịch thành công!');
    
    // Navigate to confirmation or customer page
    setTimeout(() => {
      navigate('/customer');
    }, 1500);
  };

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Minimum tomorrow
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3); // Maximum 3 months ahead
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen dark:bg-black bg-gray-50">
      <Toaster />
      <Header theme={theme} setTheme={setTheme} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg transition-all ${
                        currentStep >= step
                          ? 'bg-primary text-white'
                          : 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {step}
                    </div>
                    <div className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">
                      {step === 1 && 'Thông tin xe'}
                      {step === 2 && 'Chọn dịch vụ'}
                      {step === 3 && 'Lên lịch'}
                    </div>
                  </div>
                  {step < 3 && (
                    <div
                      className={`h-1 flex-1 mx-2 ${
                        currentStep > step ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 sm:p-8">
            {/* Step 1: Vehicle Form */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                  Thông tin xe
                </h2>

                {/* Vehicle Option Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                    Chọn xe
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => handleInputChange('vehicleOption', 'existing')}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                        formData.vehicleOption === 'existing'
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-300 dark:border-gray-600 hover:border-primary/50'
                      }`}
                    >
                      Chọn xe có sẵn
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInputChange('vehicleOption', 'new')}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                        formData.vehicleOption === 'new'
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-300 dark:border-gray-600 hover:border-primary/50'
                      }`}
                    >
                      Thêm xe mới
                    </button>
                  </div>
                </div>

                {/* Existing Vehicles List */}
                {formData.vehicleOption === 'existing' && existingVehicles.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                      Danh sách xe của bạn
                    </label>
                    <div className="grid gap-4">
                      {existingVehicles.map((vehicle) => (
                        <div
                          key={vehicle.id}
                          onClick={() => handleVehicleSelect(vehicle)}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            formData.vehicleId === vehicle.id
                              ? 'border-primary bg-primary/10'
                              : 'border-gray-300 dark:border-gray-600 hover:border-primary/50'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                                {vehicle.brand} {vehicle.model}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Năm: {vehicle.year} | Màu: {vehicle.color} | Biển số: {vehicle.licensePlate}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Pin: {vehicle.batteryType} | Dung lượng: {vehicle.batteryCapacity} kWh
                              </p>
                            </div>
                            {formData.vehicleId === vehicle.id && (
                              <div className="text-primary text-xl">✓</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New Vehicle Form */}
                {formData.vehicleOption === 'new' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Hãng xe <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.brand}
                          onChange={(e) => handleInputChange('brand', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                          placeholder="VD: Tesla, VinFast..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Tên mẫu xe <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.model}
                          onChange={(e) => handleInputChange('model', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                          placeholder="VD: Model 3, VF8..."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Năm sản xuất <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={formData.year}
                          onChange={(e) => handleInputChange('year', e.target.value)}
                          min="2010"
                          max={new Date().getFullYear()}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                          placeholder="VD: 2022"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Loại pin <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={formData.batteryType}
                          onChange={(e) => handleInputChange('batteryType', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                        >
                          <option value="">Chọn loại pin</option>
                          <option value="Lithium-ion">Lithium-ion</option>
                          <option value="Lithium Polymer">Lithium Polymer</option>
                          <option value="LFP">LFP (Lithium Iron Phosphate)</option>
                          <option value="NMC">NMC (Nickel Manganese Cobalt)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Màu sắc <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.color}
                          onChange={(e) => handleInputChange('color', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                          placeholder="VD: Đỏ, Trắng, Đen..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Biển số xe <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.licensePlate}
                          onChange={(e) => handleInputChange('licensePlate', e.target.value.toUpperCase())}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                          placeholder="VD: 30A-12345"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Dung lượng pin (kWh)
                      </label>
                      <input
                        type="number"
                        value={formData.batteryCapacity}
                        onChange={(e) => handleInputChange('batteryCapacity', e.target.value)}
                        min="0"
                        step="0.1"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                        placeholder="VD: 75, 90..."
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 2: Service Selection */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                  Chọn dịch vụ
                </h2>

                {/* Service Type Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                    Loại dịch vụ <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        handleInputChange('serviceType', 'maintenance');
                        handleInputChange('damagedParts', []);
                        handleInputChange('issueDescription', '');
                      }}
                      className={`p-6 rounded-lg border-2 transition-all text-left ${
                        formData.serviceType === 'maintenance'
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-300 dark:border-gray-600 hover:border-primary/50'
                      }`}
                    >
                      <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">
                        Bảo dưỡng
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Kiểm tra và bảo dưỡng định kỳ cho xe điện
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleInputChange('serviceType', 'repair');
                        handleInputChange('maintenancePackage', '');
                      }}
                      className={`p-6 rounded-lg border-2 transition-all text-left ${
                        formData.serviceType === 'repair'
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-300 dark:border-gray-600 hover:border-primary/50'
                      }`}
                    >
                      <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">
                        Sửa chữa
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Sửa chữa các bộ phận bị hư hỏng
                      </p>
                    </button>
                  </div>
                </div>

                {/* Maintenance Packages */}
                {formData.serviceType === 'maintenance' && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                      Chọn gói bảo dưỡng <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div
                        onClick={() => handleInputChange('maintenancePackage', 'normal')}
                        className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.maintenancePackage === 'normal'
                            ? 'border-primary bg-primary/10'
                            : 'border-gray-300 dark:border-gray-600 hover:border-primary/50'
                        }`}
                      >
                        <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">
                          Gói Normal
                        </h3>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Kiểm tra pin và hệ thống điện</li>
                          <li>• Kiểm tra hệ thống phanh</li>
                          <li>• Kiểm tra lốp xe</li>
                          <li>• Vệ sinh cơ bản</li>
                        </ul>
                        <p className="mt-3 font-semibold text-primary">Giá: 500.000đ</p>
                      </div>
                      <div
                        onClick={() => handleInputChange('maintenancePackage', 'plus')}
                        className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.maintenancePackage === 'plus'
                            ? 'border-primary bg-primary/10'
                            : 'border-gray-300 dark:border-gray-600 hover:border-primary/50'
                        }`}
                      >
                        <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">
                          Gói Plus
                        </h3>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Tất cả dịch vụ gói Normal</li>
                          <li>• Kiểm tra và cập nhật phần mềm</li>
                          <li>• Kiểm tra hệ thống làm mát</li>
                          <li>• Bảo dưỡng chi tiết toàn bộ</li>
                          <li>• Bảo hành 6 tháng</li>
                        </ul>
                        <p className="mt-3 font-semibold text-primary">Giá: 1.200.000đ</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Repair Service */}
                {formData.serviceType === 'repair' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                        Chọn bộ phận bị hư <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                          'Pin/Battery',
                          'Động cơ/Motor',
                          'Hệ thống phanh',
                          'Hệ thống treo',
                          'Hệ thống làm mát',
                          'Hệ thống điện',
                          'Lốp xe',
                          'Gương chiếu hậu',
                          'Đèn pha',
                          'Cửa sổ',
                          'Màn hình',
                          'Khác',
                        ].map((part) => (
                          <button
                            key={part}
                            type="button"
                            onClick={() => handlePartToggle(part)}
                            className={`p-3 rounded-lg border-2 transition-all text-sm ${
                              formData.damagedParts.includes(part)
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-gray-300 dark:border-gray-600 hover:border-primary/50'
                            }`}
                          >
                            {part}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Mô tả sự cố <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={formData.issueDescription}
                        onChange={(e) => handleInputChange('issueDescription', e.target.value)}
                        rows={5}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                        placeholder="Mô tả chi tiết về sự cố của xe..."
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 3: Schedule */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                  Lên lịch đặt hẹn
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Chọn ngày <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.appointmentDate}
                      onChange={(e) => handleInputChange('appointmentDate', e.target.value)}
                      min={getMinDate()}
                      max={getMaxDate()}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Chọn giờ <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.appointmentTime}
                      onChange={(e) => handleInputChange('appointmentTime', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                    >
                      <option value="">Chọn giờ</option>
                      {[
                        '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
                        '11:00', '11:30', '13:00', '13:30', '14:00', '14:30',
                        '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
                      ].map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Summary */}
                  <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-white">
                      Tóm tắt đặt lịch
                    </h3>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <p>
                        <span className="font-medium">Xe:</span>{' '}
                        {formData.vehicleOption === 'existing'
                          ? existingVehicles.find(v => v.id === formData.vehicleId)?.brand + ' ' + 
                            existingVehicles.find(v => v.id === formData.vehicleId)?.model
                          : formData.brand + ' ' + formData.model}
                      </p>
                      <p>
                        <span className="font-medium">Dịch vụ:</span>{' '}
                        {formData.serviceType === 'maintenance'
                          ? `Bảo dưỡng - Gói ${formData.maintenancePackage === 'normal' ? 'Normal' : 'Plus'}`
                          : 'Sửa chữa'}
                      </p>
                      {formData.serviceType === 'repair' && (
                        <p>
                          <span className="font-medium">Bộ phận:</span>{' '}
                          {formData.damagedParts.join(', ')}
                        </p>
                      )}
                      <p>
                        <span className="font-medium">Ngày giờ:</span>{' '}
                        {formData.appointmentDate && formData.appointmentTime
                          ? `${new Date(formData.appointmentDate).toLocaleDateString('vi-VN')} lúc ${formData.appointmentTime}`
                          : 'Chưa chọn'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`px-6 py-2 rounded-lg border-2 transition-all ${
                  currentStep === 1
                    ? 'border-gray-300 dark:border-gray-600 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 dark:border-gray-600 hover:border-primary hover:text-primary'
                }`}
              >
                Quay lại
              </button>
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all"
                >
                  Tiếp theo
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all"
                >
                  Xác nhận đặt lịch
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <Footer theme={theme} setTheme={setTheme} />
    </div>
  );
};

export default Booking;

