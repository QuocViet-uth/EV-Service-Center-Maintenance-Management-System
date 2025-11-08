# EV Service Center Maintenance Management System

Hệ thống quản lý bảo dưỡng xe điện cho trung tâm dịch vụ - Backend API

## Công nghệ sử dụng

- **Java 21** - Ngôn ngữ lập trình
- **Spring Boot 3.5.6** - Framework Java
- **Spring Security** - Bảo mật và JWT Authentication
- **Spring Data JPA** - Truy cập database (ORM)
- **MySQL 8.0** - Database (chạy qua Docker)
- **Lombok** - Giảm boilerplate code
- **Docker & Docker Compose** - Quản lý database
- **Swagger/OpenAPI** - API documentation

## Cấu trúc dự án

```
src/main/java/com/evservice/maintenance/
├── config/              # Security, CORS configuration
├── controller/          # REST Controllers cho các actors
├── dto/                 # Data Transfer Objects
├── model/               # Entity models
│   └── enums/          # Enum types
├── repository/          # JPA Repositories
├── security/            # JWT Filter
├── service/             # Business logic layer
└── util/                # Utilities (JWT, Security)

```

## Các Actors và chức năng

### 1. Customer (Khách hàng)
- Đăng ký/Đăng nhập
- Quản lý xe điện (thêm, xem danh sách, lịch sử)
- Đặt lịch bảo dưỡng/sửa chữa
- Xem nhắc nhở bảo dưỡng
- Xem lịch sử dịch vụ và hóa đơn
- Thanh toán online

### 2. Staff (Nhân viên)
- Xem và xử lý lịch hẹn từ khách hàng
- Phân công kỹ thuật viên
- Quản lý hồ sơ khách hàng và xe
- Chat trực tuyến với khách hàng
- Quản lý phiếu tiếp nhận dịch vụ

### 3. Technician (Kỹ thuật viên)
- Xem danh sách công việc được phân công
- Bắt đầu và theo dõi quá trình bảo dưỡng
- Ghi nhận tình trạng xe và công việc đã thực hiện
- Sử dụng phụ tùng trong quá trình bảo dưỡng
- Hoàn thành dịch vụ và tạo hóa đơn
- Quản lý lịch làm việc

### 4. Admin (Quản trị viên)
- Quản lý phụ tùng (thêm, cập nhật, kiểm tra tồn kho)
- AI gợi ý mức tồn kho tối thiểu
- Quản lý nhân sự (tạo tài khoản Staff, Technician)
- Quản lý trung tâm dịch vụ
- Xem báo cáo tài chính và thống kê

## API Endpoints chính

### Authentication
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập

### Customer APIs (`/api/customer`)
- `POST /vehicles` - Thêm xe
- `GET /vehicles` - Danh sách xe của tôi
- `GET /vehicles/{id}/history` - Lịch sử bảo dưỡng
- `POST /appointments` - Đặt lịch dịch vụ
- `GET /appointments` - Danh sách lịch hẹn
- `GET /reminders` - Nhắc nhở bảo dưỡng
- `GET /invoices` - Danh sách hóa đơn

### Staff APIs (`/api/staff`)
- `GET /appointments/pending` - Lịch hẹn chờ xử lý
- `PUT /appointments/{id}/confirm` - Xác nhận lịch hẹn
- `GET /customers` - Danh sách khách hàng
- `POST /chat/send` - Gửi tin nhắn

### Technician APIs (`/api/technician`)
- `GET /appointments` - Công việc được phân công
- `POST /service/start/{appointmentId}` - Bắt đầu bảo dưỡng
- `PUT /service/{recordId}` - Cập nhật tiến độ
- `POST /service/{recordId}/parts` - Sử dụng phụ tùng
- `POST /service/{recordId}/complete` - Hoàn thành

### Admin APIs (`/api/admin`)
- `POST /parts` - Thêm phụ tùng
- `GET /parts/low-stock` - Phụ tùng sắp hết
- `POST /technicians` - Tạo kỹ thuật viên
- `POST /staff` - Tạo nhân viên
- `GET /reports/financial` - Báo cáo tài chính
- `GET /reports/popular-services` - Thống kê dịch vụ

## Yêu cầu hệ thống

- **Java 21** hoặc cao hơn
- **Maven 3.6+**
- **Docker** và **Docker Compose** (để chạy MySQL)
- **MySQL 8.0** (chạy qua Docker)

## Cài đặt và chạy dự án

### Bước 1: Cài đặt Docker

**Windows:**
- Tải và cài đặt [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop)

**Mac:**
- Tải và cài đặt [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop)

**Linux:**
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install docker.io docker-compose
```

### Bước 2: Khởi động MySQL bằng Docker

Mở terminal/command prompt tại thư mục dự án và chạy:

```bash
docker-compose up -d
```

Lệnh này sẽ:
- Tải image MySQL 8.0 (lần đầu tiên)
- Tạo container MySQL
- Tạo database `evservice` tự động
- Tạo user `evuser` với password `evpass`

**Kiểm tra MySQL đã chạy:**
```bash
docker ps
# Bạn sẽ thấy container evservice_mysql đang chạy
```

**Xem logs của MySQL:**
```bash
docker-compose logs mysql
```

**Dừng MySQL:**
```bash
docker-compose down
```

**Dừng và xóa dữ liệu:**
```bash
docker-compose down -v
```

### Bước 3: Cấu hình ứng dụng

File `application.properties` đã được cấu hình sẵn:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/evservice
spring.datasource.username=evuser
spring.datasource.password=evpass
```

### Bước 4: Build và chạy ứng dụng

**Build project:**
```bash
mvn clean install
```

**Chạy ứng dụng:**
```bash
mvn spring-boot:run
```

Hoặc nếu dùng IDE (IntelliJ IDEA, Eclipse):
- Mở project trong IDE
- Tìm file `EvServiceBackendApplication.java`
- Click chuột phải → Run

### Bước 5: Kiểm tra ứng dụng

1. **Kiểm tra API đang chạy:**
   ```
   http://localhost:8080
   ```

2. **Truy cập Swagger UI để test API:**
   ```
   http://localhost:8080/swagger-ui.html
   ```

3. **Kiểm tra database:**
   ```bash
   # Kết nối vào MySQL container
   docker exec -it evservice_mysql mysql -u evuser -pevpass evservice
   
   # Xem các bảng đã được tạo
   SHOW TABLES;
   
   # Thoát
   exit;
   ```

## Cấu trúc dự án - Kiến thức Java sử dụng

Dự án này sử dụng các kiến thức Java cơ bản phù hợp cho sinh viên năm 3:

### 1. **Java OOP (Object-Oriented Programming)**
- **Class và Object**: Tất cả các model (User, Vehicle, ServiceAppointment...) là các class
- **Encapsulation**: Sử dụng private fields với getter/setter (qua Lombok `@Data`)
- **Inheritance**: Có thể mở rộng sau
- **Polymorphism**: Thông qua interface (Repository interfaces)

**Ví dụ trong code:**
```java
@Entity
public class User {
    private Long id;        // Private field
    private String username; // Encapsulation
    // Lombok tự động tạo getter/setter
}
```

### 2. **Java Collections**
- **Set**: `Set<Vehicle>`, `Set<ServiceAppointment>` - Không trùng lặp
- **List**: `List<ServiceRecord>` - Có thứ tự, cho phép trùng lặp
- **Map**: Sử dụng trong JWT claims, báo cáo

**Ví dụ trong code:**
```java
@OneToMany(mappedBy = "user")
private Set<Vehicle> vehicles = new HashSet<>(); // Set collection
```

### 3. **JPA Mapping (Java Persistence API)**
- **@Entity**: Đánh dấu class là entity trong database
- **@Table**: Đặt tên bảng
- **@Id, @GeneratedValue**: Primary key tự động tăng
- **@ManyToOne, @OneToMany, @OneToOne**: Quan hệ giữa các bảng

**Ví dụ trong code:**
```java
@Entity
@Table(name = "vehicles")
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne  // Nhiều xe thuộc về 1 user
    private User user;
}
```

### 4. **Spring Boot cơ bản**
- **@RestController**: Tạo REST API
- **@Service**: Business logic layer
- **@Repository**: Truy cập database
- **@Autowired**: Dependency Injection
- **@RequestMapping, @GetMapping, @PostMapping**: Định nghĩa endpoints

**Ví dụ trong code:**
```java
@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService; // Dependency Injection
    
    @GetMapping("/vehicles")
    public List<Vehicle> getVehicles() {
        return customerService.getMyVehicles();
    }
}
```

## Các lệnh Docker hữu ích

```bash
# Khởi động MySQL
docker-compose up -d

# Dừng MySQL
docker-compose down

# Xem logs
docker-compose logs -f mysql

# Vào container MySQL
docker exec -it evservice_mysql bash

# Kết nối MySQL từ terminal
docker exec -it evservice_mysql mysql -u evuser -pevpass evservice

# Xem các container đang chạy
docker ps

# Xóa tất cả và tạo lại (mất dữ liệu)
docker-compose down -v
docker-compose up -d
```

## Xử lý lỗi thường gặp

### Lỗi: Port 3306 đã được sử dụng
```bash
# Kiểm tra xem có MySQL khác đang chạy không
netstat -ano | findstr :3306  # Windows
lsof -i :3306                 # Mac/Linux

# Đổi port trong docker-compose.yml:
ports:
  - "3307:3306"  # Thay vì 3306:3306
# Và cập nhật application.properties:
spring.datasource.url=jdbc:mysql://localhost:3307/evservice
```

### Lỗi: Không kết nối được database
- Kiểm tra MySQL container đang chạy: `docker ps`
- Kiểm tra logs: `docker-compose logs mysql`
- Đảm bảo đợi MySQL khởi động xong (khoảng 10-20 giây)

### Lỗi: Table không tồn tại
- JPA sẽ tự động tạo bảng khi chạy lần đầu
- Nếu vẫn lỗi, kiểm tra `spring.jpa.hibernate.ddl-auto=update` trong `application.properties`

## Tính năng đặc biệt

### 1. Nhắc nhở bảo dưỡng tự động
- Hệ thống tự động kiểm tra và tạo nhắc nhở theo:
  - Số km đã chạy (90% khoảng cách bảo dưỡng)
  - Thời gian (90% khoảng thời gian bảo dưỡng)
  - Gói dịch vụ sắp hết hạn

### 2. AI gợi ý tồn kho phụ tùng
- Phân tích lịch sử sử dụng 3 tháng gần nhất
- Tính toán mức tồn kho đề xuất dựa trên:
  - Tần suất sử dụng trung bình
  - Thời gian giao hàng
  - Buffer an toàn 20%

### 3. Quản lý quy trình bảo dưỡng
- Theo dõi tiến độ: PENDING → CONFIRMED → IN_PROGRESS → COMPLETED
- Checklist EV: Pin, Motor, Hệ thống sạc
- Tự động tạo hóa đơn khi hoàn thành

### 4. Thanh toán online
- Hỗ trợ nhiều phương thức: E-Wallet, Banking, Card, Cash
- Tích hợp sẵn framework cho payment gateway (VnPay, Momo, etc.)

## Notes

- Tất cả API đều yêu cầu JWT token (trừ `/api/auth/**`)
- Token được gửi trong header: `Authorization: Bearer <token>`
- CORS đã được cấu hình cho tất cả origins (có thể chỉnh sửa trong SecurityConfig)

## TODO / Cải tiến tương lai

- [ ] WebSocket cho chat real-time
- [ ] Tích hợp payment gateway thực tế
- [ ] Push notifications cho mobile app
- [ ] Export báo cáo PDF/Excel
- [ ] Upload/download tài liệu (ảnh xe, chứng chỉ)
- [ ] Machine Learning nâng cao cho AI gợi ý phụ tùng
- [ ] Multi-language support

