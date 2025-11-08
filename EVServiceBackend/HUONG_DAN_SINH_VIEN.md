# HƯỚNG DẪN CHO SINH VIÊN NĂM 3

## 📚 Kiến thức Java cần biết trước khi làm dự án này

### 1. Java OOP cơ bản
- ✅ Class và Object
- ✅ Fields (biến) và Methods (hàm)
- ✅ Constructor
- ✅ Access modifiers (public, private, protected)
- ✅ Getter và Setter

**Ví dụ đơn giản:**
```java
public class Vehicle {
    private Long id;           // Field (thuộc tính)
    private String model;      // Field
    
    // Constructor
    public Vehicle() {
    }
    
    // Getter
    public Long getId() {
        return id;
    }
    
    // Setter
    public void setId(Long id) {
        this.id = id;
    }
}
```

### 2. Java Collections
- ✅ List: Danh sách có thứ tự, cho phép trùng
- ✅ Set: Tập hợp không trùng lặp
- ✅ Map: Lưu dạng key-value

**Ví dụ:**
```java
List<String> names = new ArrayList<>();
names.add("Nguyễn Văn A");
names.add("Trần Thị B");

Set<Integer> numbers = new HashSet<>();
numbers.add(1);
numbers.add(2);

Map<String, Integer> ages = new HashMap<>();
ages.put("A", 20);
ages.put("B", 25);
```

### 3. Enum (Kiểu liệt kê)
- ✅ Định nghĩa các giá trị cố định

**Ví dụ:**
```java
public enum UserRole {
    CUSTOMER,
    STAFF,
    TECHNICIAN,
    ADMIN
}
```

### 4. Exception Handling
- ✅ Try-catch-finally
- ✅ Throwing exceptions

**Ví dụ:**
```java
try {
    User user = userRepository.findById(id).orElseThrow(
        () -> new RuntimeException("User not found")
    );
} catch (Exception e) {
    System.out.println("Lỗi: " + e.getMessage());
}
```

## 🏗️ Cấu trúc dự án - Giải thích đơn giản

### Model (Entity) - Các bảng trong database
**Giống như khai báo cấu trúc dữ liệu:**
```java
@Entity
@Table(name = "users")  // Tên bảng trong database
public class User {
    @Id                  // Đây là khóa chính
    @GeneratedValue      // Tự động tăng ID
    private Long id;
    
    private String username;
    private String email;
}
```

### Repository - Truy vấn database
**Giống như các hàm để lấy dữ liệu:**
```java
public interface UserRepository extends JpaRepository<User, Long> {
    // Tìm user theo username
    Optional<User> findByUsername(String username);
    
    // Tìm tất cả user theo role
    List<User> findByRole(UserRole role);
}
```

### Service - Logic xử lý nghiệp vụ
**Nơi viết các hàm xử lý logic:**
```java
@Service
public class CustomerService {
    @Autowired
    private UserRepository userRepository;  // Dùng repository để lấy dữ liệu
    
    public User createUser(String username) {
        // Logic tạo user mới
        User user = new User();
        user.setUsername(username);
        return userRepository.save(user);  // Lưu vào database
    }
}
```

### Controller - API endpoints
**Nơi nhận request từ client:**
```java
@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;
    
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return customerService.getAllUsers();
    }
}
```

## 🔄 Luồng hoạt động (Flow)

1. **Client gửi request** → `GET /api/customer/users`
2. **Controller nhận request** → `CustomerController.getAllUsers()`
3. **Controller gọi Service** → `CustomerService.getAllUsers()`
4. **Service gọi Repository** → `UserRepository.findAll()`
5. **Repository query database** → `SELECT * FROM users`
6. **Dữ liệu trả về ngược lại** → Controller → Client

## 📝 Các annotation quan trọng

### JPA Annotations
- `@Entity`: Đánh dấu class là một bảng trong database
- `@Table(name = "...")`: Đặt tên bảng
- `@Id`: Đánh dấu đây là khóa chính
- `@GeneratedValue`: Tự động tăng ID
- `@Column(name = "...")`: Đặt tên cột
- `@ManyToOne`: Nhiều record thuộc về 1 record khác
- `@OneToMany`: 1 record có nhiều record con
- `@OneToOne`: 1-1 relationship

### Spring Annotations
- `@RestController`: Controller trả về JSON/XML
- `@Service`: Business logic layer
- `@Repository`: Data access layer
- `@Autowired`: Tự động inject dependency
- `@Component`: Generic component
- `@RequestMapping`: Định nghĩa URL path
- `@GetMapping`: HTTP GET request
- `@PostMapping`: HTTP POST request
- `@PutMapping`: HTTP PUT request
- `@DeleteMapping`: HTTP DELETE request
- `@PathVariable`: Lấy giá trị từ URL `/users/{id}`
- `@RequestParam`: Lấy giá trị từ query string `?name=abc`
- `@RequestBody`: Lấy dữ liệu từ request body

## 💡 Tips cho sinh viên

### 1. Đọc code từ dưới lên
- Bắt đầu từ **Model** (cấu trúc dữ liệu)
- Sau đó đọc **Repository** (cách lấy dữ liệu)
- Tiếp theo **Service** (logic xử lý)
- Cuối cùng **Controller** (API endpoints)

### 2. Sử dụng Lombok
Dự án dùng Lombok để tự động tạo getter/setter:
```java
@Data          // Tự động tạo getter, setter, toString, equals, hashCode
@NoArgsConstructor   // Constructor không tham số
@AllArgsConstructor  // Constructor với tất cả tham số
public class User {
    private Long id;
    private String username;
}
```

### 3. Hiểu về Optional
`Optional` được dùng khi có thể không tìm thấy dữ liệu:
```java
Optional<User> user = userRepository.findById(1L);
if (user.isPresent()) {
    User u = user.get();
} else {
    // Không tìm thấy
}

// Hoặc dùng:
User user = userRepository.findById(1L)
    .orElseThrow(() -> new RuntimeException("Not found"));
```

### 4. Transaction (@Transactional)
Khi cần đảm bảo tất cả các thao tác database phải thành công hoặc rollback:
```java
@Transactional
public void createUserAndVehicle(User user, Vehicle vehicle) {
    userRepository.save(user);      // Lưu user
    vehicleRepository.save(vehicle); // Lưu vehicle
    // Nếu có lỗi ở bước 2, bước 1 sẽ bị rollback
}
```

## 🐛 Debug tips

### 1. Xem SQL queries
Trong `application.properties`:
```properties
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```
Sẽ in ra console tất cả SQL queries khi chạy.

### 2. Xem dữ liệu trong database
```bash
# Vào MySQL container
docker exec -it evservice_mysql mysql -u evuser -pevpass evservice

# Xem các bảng
SHOW TABLES;

# Xem dữ liệu trong bảng users
SELECT * FROM users;

# Đếm số lượng records
SELECT COUNT(*) FROM users;
```

### 3. Log trong code
```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CustomerService {
    private static final Logger logger = LoggerFactory.getLogger(CustomerService.class);
    
    public void someMethod() {
        logger.info("Method được gọi");
        logger.error("Có lỗi xảy ra");
        logger.debug("Debug info");
    }
}
```

## 📚 Tài liệu tham khảo

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [Java Collections](https://docs.oracle.com/javase/tutorial/collections/)
- [Docker Documentation](https://docs.docker.com/)

## ❓ Câu hỏi thường gặp

**Q: Tại sao dùng `Set` thay vì `List`?**
A: `Set` không cho phép trùng lặp. Ví dụ: Một User không thể có 2 Vehicle giống hệt nhau.

**Q: `@ManyToOne` và `@OneToMany` khác nhau như thế nào?**
A: 
- `@ManyToOne`: Nhiều Vehicle thuộc về 1 User (trong class Vehicle)
- `@OneToMany`: 1 User có nhiều Vehicle (trong class User)

**Q: Tại sao cần Service layer?**
A: Service layer tách biệt logic nghiệp vụ khỏi Controller, giúp code dễ bảo trì và test.

**Q: `@Autowired` là gì?**
A: Spring tự động tìm và inject (tiêm) dependency. Bạn không cần tự tạo object.

**Q: Có thể bỏ qua Service layer không?**
A: Có thể, nhưng không nên. Service layer giúp tái sử dụng code và dễ test.



