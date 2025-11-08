# 🚀 QUICK START - Hướng dẫn nhanh

## Bước 1: Cài Docker Desktop
- Windows: https://www.docker.com/products/docker-desktop
- Mac: https://www.docker.com/products/docker-desktop
- Chạy Docker Desktop và đợi nó khởi động xong

## Bước 2: Khởi động MySQL
Mở terminal trong thư mục dự án:
```bash
docker-compose up -d
```
Đợi khoảng 10-20 giây để MySQL khởi động xong.

## Bước 3: Chạy ứng dụng
```bash
mvn spring-boot:run
```

## Bước 4: Kiểm tra
Mở trình duyệt:
- Swagger UI: http://localhost:8080/swagger-ui.html
- API: http://localhost:8080

## ✅ Xong! Bạn có thể bắt đầu test API rồi!

---

## 🔧 Các lệnh thường dùng

**Xem MySQL đang chạy:**
```bash
docker ps
```

**Dừng MySQL:**
```bash
docker-compose down
```

**Xem logs:**
```bash
docker-compose logs mysql
```

**Vào database:**
```bash
docker exec -it evservice_mysql mysql -u evuser -pevpass evservice
```

---

## ❌ Lỗi thường gặp

**Lỗi: Port 3306 đã được dùng**
→ Đóng MySQL local hoặc đổi port trong `docker-compose.yml`

**Lỗi: Không kết nối được database**
→ Đợi MySQL khởi động xong (20-30 giây), sau đó chạy lại Spring Boot

**Lỗi: Table không tồn tại**
→ Bình thường, JPA sẽ tự tạo bảng khi chạy lần đầu

---

Xem thêm chi tiết trong `README.md` và `HUONG_DAN_SINH_VIEN.md`



