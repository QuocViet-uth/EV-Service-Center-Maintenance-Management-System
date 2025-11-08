# API Documentation - EV Service Center Maintenance Management System

**Base URL:** `http://localhost:8080`

**Authentication:** Hầu hết các API yêu cầu JWT Bearer Token trong header:
```
Authorization: Bearer <token>
```

---

## 1. Authentication APIs (`/api/auth`)

### 1.1. Đăng ký tài khoản
- **Method:** `POST`
- **Endpoint:** `/api/auth/register`
- **Authentication:** Không cần
- **Request Body:**
```json
{
  "username": "string",
  "password": "string",
  "email": "string",
  "fullName": "string",
  "phoneNumber": "string",
  "role": "CUSTOMER | STAFF | TECHNICIAN | ADMIN"
}
```
- **Response:** `AuthResponse` (chứa token JWT)

### 1.2. Đăng nhập
- **Method:** `POST`
- **Endpoint:** `/api/auth/login`
- **Authentication:** Không cần
- **Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```
- **Response:** `AuthResponse` (chứa token JWT)

---

## 2. Customer APIs (`/api/customer`)

**Tất cả API Customer yêu cầu Authentication (Bearer Token)**

### 2.1. Quản lý xe

#### 2.1.1. Thêm xe mới
- **Method:** `POST`
- **Endpoint:** `/api/customer/vehicles`
- **Request Body:**
```json
{
  "vin": "string",
  "model": "string",
  "brand": "string",
  "year": 2023,
  "licensePlate": "string",
  "color": "string",
  "currentMileage": 0,
  "maintenanceIntervalKm": 5000,
  "maintenanceIntervalDays": 180,
  "servicePackageExpiry": "2025-01-01"
}
```
- **Response:** `Vehicle`

#### 2.1.2. Lấy danh sách xe của tôi
- **Method:** `GET`
- **Endpoint:** `/api/customer/vehicles`
- **Response:** `List<Vehicle>`

#### 2.1.3. Lấy lịch sử bảo dưỡng của xe
- **Method:** `GET`
- **Endpoint:** `/api/customer/vehicles/{vehicleId}/history`
- **Path Parameters:**
  - `vehicleId` (Long)
- **Response:** `List<ServiceRecord>`

### 2.2. Đặt lịch dịch vụ

#### 2.2.1. Tạo lịch hẹn bảo dưỡng
- **Method:** `POST`
- **Endpoint:** `/api/customer/appointments`
- **Request Body:**
```json
{
  "vehicleId": 1,
  "serviceCenterId": 1,
  "serviceType": "MAINTENANCE | REPAIR | INSPECTION",
  "scheduledDateTime": "2025-12-10T10:30:00",
  "description": "string",
  "customerNotes": "string"
}
```
- **Response:** `ServiceAppointment`

#### 2.2.2. Lấy danh sách lịch hẹn của tôi
- **Method:** `GET`
- **Endpoint:** `/api/customer/appointments`
- **Response:** `List<ServiceAppointment>`

### 2.3. Nhắc nhở

#### 2.3.1. Lấy danh sách nhắc nhở
- **Method:** `GET`
- **Endpoint:** `/api/customer/reminders`
- **Response:** `List<MaintenanceReminder>`

### 2.4. Hóa đơn

#### 2.4.1. Lấy danh sách hóa đơn của tôi
- **Method:** `GET`
- **Endpoint:** `/api/customer/invoices`
- **Response:** `List<Invoice>`

---

## 3. Staff APIs (`/api/staff`)

**Tất cả API Staff yêu cầu Authentication (Bearer Token)**

### 3.1. Quản lý lịch hẹn

#### 3.1.1. Lấy danh sách lịch hẹn chờ xác nhận
- **Method:** `GET`
- **Endpoint:** `/api/staff/appointments/pending`
- **Query Parameters:**
  - `serviceCenterId` (Long) - Required
- **Response:** `List<ServiceAppointment>`

#### 3.1.2. Lấy hàng chờ lịch hẹn
- **Method:** `GET`
- **Endpoint:** `/api/staff/appointments/queue`
- **Query Parameters:**
  - `serviceCenterId` (Long) - Required
- **Response:** `List<ServiceAppointment>`

#### 3.1.3. Xác nhận lịch hẹn và phân công kỹ thuật viên
- **Method:** `PUT`
- **Endpoint:** `/api/staff/appointments/{appointmentId}/confirm`
- **Path Parameters:**
  - `appointmentId` (Long)
- **Query Parameters:**
  - `technicianId` (Long) - Required
- **Response:** `ServiceAppointment`

#### 3.1.4. Cập nhật trạng thái lịch hẹn
- **Method:** `PUT`
- **Endpoint:** `/api/staff/appointments/{appointmentId}/status`
- **Path Parameters:**
  - `appointmentId` (Long)
- **Query Parameters:**
  - `status` (AppointmentStatus) - Required: PENDING | CONFIRMED | IN_PROGRESS | COMPLETED | CANCELLED
- **Response:** `ServiceAppointment`

### 3.2. Quản lý khách hàng & xe

#### 3.2.1. Lấy danh sách tất cả khách hàng
- **Method:** `GET`
- **Endpoint:** `/api/staff/customers`
- **Response:** `List<User>`

#### 3.2.2. Lấy thông tin chi tiết xe
- **Method:** `GET`
- **Endpoint:** `/api/staff/vehicles/{vehicleId}`
- **Path Parameters:**
  - `vehicleId` (Long)
- **Response:** `Vehicle`

#### 3.2.3. Lấy lịch sử dịch vụ của xe
- **Method:** `GET`
- **Endpoint:** `/api/staff/vehicles/{vehicleId}/history`
- **Path Parameters:**
  - `vehicleId` (Long)
- **Response:** `List<ServiceRecord>`

### 3.3. Chat với khách hàng

#### 3.3.1. Gửi tin nhắn
- **Method:** `POST`
- **Endpoint:** `/api/staff/chat/send`
- **Query Parameters:**
  - `receiverId` (Long) - Required
  - `appointmentId` (Long) - Optional
- **Request Body:** `String` (nội dung tin nhắn)
- **Response:** `ChatMessage`

#### 3.3.2. Lấy tin nhắn theo lịch hẹn
- **Method:** `GET`
- **Endpoint:** `/api/staff/chat/appointment/{appointmentId}`
- **Path Parameters:**
  - `appointmentId` (Long)
- **Response:** `List<ChatMessage>`

---

## 4. Technician APIs (`/api/technician`)

**Tất cả API Technician yêu cầu Authentication (Bearer Token)**

### 4.1. Quản lý công việc

#### 4.1.1. Lấy danh sách lịch hẹn được phân công
- **Method:** `GET`
- **Endpoint:** `/api/technician/appointments`
- **Response:** `List<ServiceAppointment>`

### 4.2. Quy trình bảo dưỡng

#### 4.2.1. Bắt đầu bảo dưỡng
- **Method:** `POST`
- **Endpoint:** `/api/technician/service/start/{appointmentId}`
- **Path Parameters:**
  - `appointmentId` (Long)
- **Response:** `ServiceRecord`

#### 4.2.2. Cập nhật phiếu bảo dưỡng
- **Method:** `PUT`
- **Endpoint:** `/api/technician/service/{recordId}`
- **Path Parameters:**
  - `recordId` (Long)
- **Query Parameters (tất cả optional):**
  - `vehicleCondition` (String)
  - `workPerformed` (String)
  - `notes` (String)
  - `batteryCheck` (String)
  - `motorCheck` (String)
  - `chargingSystemCheck` (String)
- **Response:** `ServiceRecord`

#### 4.2.3. Sử dụng phụ tùng
- **Method:** `POST`
- **Endpoint:** `/api/technician/service/{recordId}/parts`
- **Path Parameters:**
  - `recordId` (Long)
- **Query Parameters:**
  - `partsId` (Long) - Required
  - `quantity` (Integer) - Required
- **Response:** `ServicePartsUsage`

#### 4.2.4. Hoàn thành bảo dưỡng
- **Method:** `POST`
- **Endpoint:** `/api/technician/service/{recordId}/complete`
- **Path Parameters:**
  - `recordId` (Long)
- **Query Parameters:**
  - `laborCost` (BigDecimal) - Required
- **Response:** `ServiceRecord`
- **Lưu ý:** API này sẽ tự động tạo Invoice

### 4.3. Quản lý lịch làm việc

#### 4.3.1. Tạo ca làm việc
- **Method:** `POST`
- **Endpoint:** `/api/technician/schedule`
- **Query Parameters:**
  - `workDate` (LocalDate) - Required (format: YYYY-MM-DD)
  - `startTime` (LocalTime) - Required (format: HH:mm:ss)
  - `endTime` (LocalTime) - Required (format: HH:mm:ss)
  - `shiftType` (String) - Required
- **Response:** `TechnicianSchedule`

---

## 5. Admin APIs (`/api/admin`)

**Tất cả API Admin yêu cầu Authentication (Bearer Token)**

### 5.1. Quản lý phụ tùng

#### 5.1.1. Thêm phụ tùng
- **Method:** `POST`
- **Endpoint:** `/api/admin/parts`
- **Query Parameters:**
  - `serviceCenterId` (Long) - Required
  - `partCode` (String) - Required
  - `name` (String) - Required
  - `description` (String) - Optional
  - `category` (String) - Required
  - `manufacturer` (String) - Optional
  - `quantity` (Integer) - Required
  - `minimumStockLevel` (Integer) - Required
  - `unitPrice` (BigDecimal) - Required
- **Response:** `Parts`

#### 5.1.2. Cập nhật số lượng tồn kho phụ tùng
- **Method:** `PUT`
- **Endpoint:** `/api/admin/parts/{partsId}/stock`
- **Path Parameters:**
  - `partsId` (Long)
- **Query Parameters:**
  - `newQuantity` (Integer) - Required
- **Response:** `Parts`

#### 5.1.3. Lấy danh sách phụ tùng tồn thấp
- **Method:** `GET`
- **Endpoint:** `/api/admin/parts/low-stock`
- **Query Parameters:**
  - `serviceCenterId` (Long) - Required
- **Response:** `List<Parts>`

### 5.2. Quản lý nhân sự

#### 5.2.1. Tạo kỹ thuật viên
- **Method:** `POST`
- **Endpoint:** `/api/admin/technicians`
- **Query Parameters:**
  - `username` (String) - Required
  - `email` (String) - Required
  - `password` (String) - Required
  - `fullName` (String) - Required
  - `phoneNumber` (String) - Required
  - `certifications` (String) - Optional
- **Response:** `User` (Technician)

#### 5.2.2. Tạo nhân viên
- **Method:** `POST`
- **Endpoint:** `/api/admin/staff`
- **Query Parameters:**
  - `username` (String) - Required
  - `email` (String) - Required
  - `password` (String) - Required
  - `fullName` (String) - Required
  - `phoneNumber` (String) - Required
  - `department` (String) - Required
- **Response:** `User` (Staff)

### 5.3. Quản lý trung tâm dịch vụ

#### 5.3.1. Tạo trung tâm dịch vụ
- **Method:** `POST`
- **Endpoint:** `/api/admin/service-centers`
- **Query Parameters:**
  - `name` (String) - Required
  - `address` (String) - Required
  - `phoneNumber` (String) - Required
  - `email` (String) - Required
- **Response:** `ServiceCenter`

### 5.4. Báo cáo tài chính

#### 5.4.1. Báo cáo tài chính
- **Method:** `GET`
- **Endpoint:** `/api/admin/reports/financial`
- **Query Parameters:**
  - `startDate` (LocalDateTime) - Required (format: YYYY-MM-DDTHH:mm:ss)
  - `endDate` (LocalDateTime) - Required (format: YYYY-MM-DDTHH:mm:ss)
- **Response:** `Map<String, Object>`
  - `totalRevenue` (BigDecimal)
  - `pendingAmount` (BigDecimal)
  - `totalInvoices` (Integer)
  - `periodStart` (LocalDateTime)
  - `periodEnd` (LocalDateTime)

#### 5.4.2. Báo cáo lợi nhuận
- **Method:** `GET`
- **Endpoint:** `/api/admin/reports/profit`
- **Query Parameters:**
  - `startDate` (LocalDateTime) - Required
  - `endDate` (LocalDateTime) - Required
- **Response:** `Map<String, Object>`
  - `revenue` (BigDecimal)
  - `laborCostTotal` (BigDecimal)
  - `partsCostTotal` (BigDecimal)
  - `grossProfit` (BigDecimal)
  - `periodStart` (LocalDateTime)
  - `periodEnd` (LocalDateTime)

#### 5.4.3. Thống kê loại dịch vụ phổ biến
- **Method:** `GET`
- **Endpoint:** `/api/admin/reports/popular-services`
- **Query Parameters:**
  - `startDate` (LocalDateTime) - Required
  - `endDate` (LocalDateTime) - Required
- **Response:** `Map<ServiceType, Long>`

#### 5.4.4. Thống kê xu hướng hỏng hóc
- **Method:** `GET`
- **Endpoint:** `/api/admin/reports/failure-trends`
- **Response:** `Map<String, Long>`

#### 5.4.5. Báo cáo hiệu suất kỹ thuật viên
- **Method:** `GET`
- **Endpoint:** `/api/admin/reports/technician-performance`
- **Query Parameters:**
  - `startDate` (LocalDateTime) - Required
  - `endDate` (LocalDateTime) - Required
- **Response:** `Map<String, Object>`
  - `technicianStats` (Map<Long, Map<String, Object>>)
    - `jobs` (Integer)
    - `totalMinutes` (Long)
    - `avgMinutesPerJob` (Long)

### 5.5. Báo giá

#### 5.5.1. Ước tính báo giá dịch vụ
- **Method:** `POST`
- **Endpoint:** `/api/admin/quotes/estimate`
- **Query Parameters:**
  - `serviceCenterId` (Long) - Required
  - `partsIds` (List<Long>) - Optional (comma-separated: 1,2,3)
  - `quantities` (List<Integer>) - Optional (comma-separated: 2,1,1)
  - `laborCost` (BigDecimal) - Optional
  - `serviceFee` (BigDecimal) - Optional
  - `discount` (BigDecimal) - Optional
  - `tax` (BigDecimal) - Optional
- **Response:** `Map<String, Object>`
  - `partsTotal` (BigDecimal)
  - `laborCost` (BigDecimal)
  - `serviceFee` (BigDecimal)
  - `discount` (BigDecimal)
  - `tax` (BigDecimal)
  - `totalAmount` (BigDecimal)

---

## 6. Payment APIs (`/api/payment`)

### 6.1. Thanh toán online (Mock)
- **Method:** `POST`
- **Endpoint:** `/api/payment/process`
- **Authentication:** Không cần
- **Request Body:**
```json
{
  "invoiceId": 1,
  "paymentMethod": "E_WALLET | BANKING | CASH | CARD",
  "paymentReference": "string",
  "paymentProvider": "string"
}
```
- **Response:** `Payment`

### 6.2. Lấy thông tin thanh toán theo hóa đơn
- **Method:** `GET`
- **Endpoint:** `/api/payment/invoice/{invoiceId}`
- **Authentication:** Không cần
- **Path Parameters:**
  - `invoiceId` (Long)
- **Response:** `Payment`

### 6.3. Đánh dấu thanh toán offline
- **Method:** `POST`
- **Endpoint:** `/api/payment/invoice/{invoiceId}/mark-offline-paid`
- **Authentication:** Yêu cầu (Staff/Admin)
- **Path Parameters:**
  - `invoiceId` (Long)
- **Query Parameters:**
  - `reference` (String) - Optional
- **Response:** `Payment`

---

## 7. Payment Gateway APIs (`/api/payment/gateway`)

### 7.1. Tạo URL thanh toán VNPay
- **Method:** `POST`
- **Endpoint:** `/api/payment/gateway/create`
- **Authentication:** Không cần
- **Query Parameters:**
  - `invoiceId` (Long) - Required
- **Response:** `Map<String, String>`
  - `payUrl` (String) - URL thanh toán VNPay

### 7.2. IPN Callback từ VNPay
- **Method:** `POST`
- **Endpoint:** `/api/payment/gateway/ipn`
- **Authentication:** Không cần (VNPay gọi tự động)
- **Request Parameters:** Tất cả các tham số từ VNPay (form-data)
- **Response:** `String` ("OK" hoặc "INVALID")

---

## 8. Service Center APIs (`/api/service-centers`)

### 8.1. Lấy danh sách trung tâm dịch vụ
- **Method:** `GET`
- **Endpoint:** `/api/service-centers`
- **Authentication:** Không cần
- **Response:** `List<ServiceCenter>`

### 8.2. Lấy thông tin trung tâm dịch vụ
- **Method:** `GET`
- **Endpoint:** `/api/service-centers/{id}`
- **Authentication:** Không cần
- **Path Parameters:**
  - `id` (Long)
- **Response:** `ServiceCenter`

---

## Enums

### AppointmentStatus
- `PENDING` - Chờ xác nhận
- `CONFIRMED` - Đã xác nhận
- `IN_PROGRESS` - Đang bảo dưỡng
- `COMPLETED` - Hoàn thành
- `CANCELLED` - Đã hủy

### ServiceType
- `MAINTENANCE` - Bảo dưỡng
- `REPAIR` - Sửa chữa
- `INSPECTION` - Kiểm tra

### PaymentStatus
- `PENDING` - Chờ thanh toán
- `COMPLETED` - Đã thanh toán
- `FAILED` - Thanh toán thất bại

### PaymentMethod
- `E_WALLET` - Ví điện tử
- `BANKING` - Chuyển khoản ngân hàng
- `CASH` - Tiền mặt
- `CARD` - Thẻ

### ReminderType
- `MILEAGE_BASED` - Nhắc nhở theo km
- `TIME_BASED` - Nhắc nhở theo thời gian
- `SERVICE_PACKAGE` - Nhắc nhở gói dịch vụ
- `PAYMENT` - Nhắc nhở thanh toán

### UserRole
- `CUSTOMER` - Khách hàng
- `STAFF` - Nhân viên
- `TECHNICIAN` - Kỹ thuật viên
- `ADMIN` - Quản trị viên

---

## Lưu ý

1. **Base URL:** Tất cả API sử dụng base URL `http://localhost:8080` (có thể thay đổi theo cấu hình server)

2. **Authentication:** 
   - Hầu hết API yêu cầu JWT Bearer Token trong header `Authorization: Bearer <token>`
   - Token được lấy từ API `/api/auth/login` hoặc `/api/auth/register`

3. **CORS:** Tất cả API đã được cấu hình CORS cho phép truy cập từ mọi origin (`@CrossOrigin(origins = "*")`)

4. **Date/Time Format:**
   - `LocalDateTime`: `YYYY-MM-DDTHH:mm:ss` (ví dụ: `2025-12-10T10:30:00`)
   - `LocalDate`: `YYYY-MM-DD` (ví dụ: `2025-12-10`)
   - `LocalTime`: `HH:mm:ss` (ví dụ: `10:30:00`)

5. **Error Handling:** 
   - Status code 200: Thành công
   - Status code 400: Bad Request (dữ liệu không hợp lệ)
   - Status code 401: Unauthorized (chưa đăng nhập hoặc token hết hạn)
   - Status code 403: Forbidden (không có quyền truy cập)
   - Status code 404: Not Found (không tìm thấy resource)
   - Status code 500: Internal Server Error (lỗi server)

---

**Tổng số API:** 40+ endpoints

**Ngày tạo:** 2024-12-10

