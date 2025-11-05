# Tài liệu đặc tả yêu cầu
**Project:** EV Service Center Maintenance Management System
## 1. Giới thiệu
### 1.1 Mục đích
Tài liệu này mô tả chi tiết các yêu cầu chức năng và phi chức năng của hệ thống EV Service Center Maintenance Management System (EVSCMMS) – một phần mềm được thiết kế nhằm hỗ trợ các trung tâm dịch vụ quản lý toàn bộ quy trình bảo dưỡng, sửa chữa và quản lý khách hàng đối với xe điện (Electric Vehicle – EV).  
Mục tiêu của hệ thống là:
- Cung cấp một nền tảng số hóa quy trình bảo dưỡng xe điện, giúp khách hàng dễ dàng đặt lịch và theo dõi tình trạng xe.
- Hỗ trợ trung tâm dịch vụ (staff, kỹ thuật viên, quản trị viên) trong việc tiếp nhận, quản lý lịch hẹn, quy trình bảo dưỡng, phụ tùng, nhân sự và tài chính.
- Tối ưu hiệu suất vận hành của trung tâm và nâng cao trải nghiệm khách hàng thông qua các tính năng tự động hóa, gợi ý thông minh và báo cáo thống kê.
### 1.2 Phạm vi
Phần mềm EV Service Center Maintenance Management System là hệ thống web/app tích hợp dành cho các trung tâm dịch vụ xe điện và khách hàng.  
Hệ thống cho phép:
- **Khách hàng(Customer):** đặt lịch bảo dưỡng, nhận thông báo nhắc nhở định kỳ, thanh toán trực tuyến, theo dõi trạng thái xe và lưu lịch sử dịch vụ.
- **Nhân viên trung tâm(Staff):** quản lý hồ sơ khách hàng, lập lịch, tiếp nhận xe và theo dõi tiến độ bảo dưỡng.
- **Kỹ thuật viên(Technician):** cập nhật tình trạng xe, ghi nhận thông tin kiểm tra, thay thế phụ tùng và hoàn tất phiếu dịch vụ.
- **Quản trị viên(Admin):** giám sát toàn bộ hoạt động, quản lý nhân sự, phụ tùng, tài chính và khai thác báo cáo thống kê.  

Phạm vi triển khai của hệ thống bao gồm:
- Trung tâm bảo dưỡng xe điện quy mô nhỏ đến lớn.
- Môi trường web (trình duyệt).
- Tích hợp thanh toán online qua ví điện tử hoặc ngân hàng.
### 1.3 Đối tượng sử dụng
**Customer**: Đặt lịch, theo dõi tình trạng xe, nhận nhắc nhở, thanh toán online.  
**Staff**: Tiếp nhận yêu cầu dịch vụ, lập lịch, quản lý hồ sơ khách hàng & xe.  
**Technician**: Thực hiện quy trình bảo dưỡng, cập nhật tiến độ, ghi nhận tình trạng xe và phụ tùng.  
**Admin**: Quản lý hệ thống, nhân sự, tài chính, phụ tùng, báo cáo thống kê, phân quyền người dùng.  

## 2. Mô tả tổng quan
### 2.1 Bối cảnh hệ thống
Hệ thống **EVSCMMS** là một ứng dụng quản lý tổng thể dành cho **trung tâm dịch vụ bảo dưỡng xe điện**. Hệ thống được thiết kế theo **mô hình client–server**, hoạt động trên nền **web**, giúp kết nối **khách hàng, nhân viên, kỹ thuật viên,** và **quản trị viên** trong cùng một nền tảng duy nhất.  
**Mô hình tổng quan hệ thống**
- **Người dùng bên ngoài**: Khách hàng (Customer).
- **Người dùng nội bộ**: Nhân viên trung tâm (Staff), Kỹ thuật viên (Technician), Quản trị viên (Admin).
- **Thành phần hệ thống chính**:  
    + **Giao diện người dùng (UI Layer)**: Web/App dành cho từng nhóm người dùng.
    + **Lớp dịch vụ ứng dụng (Application Layer)**: Xử lý logic nghiệp vụ (đặt lịch, theo dõi tiến độ, thanh toán...).
    + **Cơ sở dữ liệu trung tâm (Database Layer)**: Lưu trữ thông tin khách hàng, xe, lịch sử bảo dưỡng, phụ tùng, nhân sự và báo cáo.
    + **Tích hợp ngoài (External Services)**: Thanh toán trực tuyến, gửi thông báo qua app.  

**Tóm tắt luồng hoạt động tổng quát**
1. Khách hàng đăng nhập vào hệ thống → đặt lịch bảo dưỡng/sửa chữa.
2. Nhân viên tiếp nhận yêu cầu → lập lịch cho kỹ thuật viên phù hợp.
3. Kỹ thuật viên thực hiện bảo dưỡng → cập nhật tiến độ và tình trạng xe.
4. Hệ thống tạo hóa đơn → khách hàng thanh toán trực tuyến.
5. Quản trị viên theo dõi báo cáo doanh thu, quản lý nhân sự và phụ tùng.

### 2.2 Các tác nhân hệ thống
**Actor:** Customer  
**Vai trò:** Người sử dụng dịch vụ  
**Mô tả chi tiết:** Đặt lịch bảo dưỡng, nhận nhắc nhở, theo dõi tiến độ và thanh toán online.

**Actor:** Staff  
**Vai trò:** Người tiếp nhận yêu cầu  
**Mô tả chi tiết:** Quản lý lịch hẹn, hồ sơ khách hàng, tiếp nhận xe, tạo phiếu dịch vụ.

**Actor:** Technician  
**Vai trò:** Người trực tiếp thực hiện bảo dưỡng  
**Mô tả chi tiết:** Cập nhật tiến trình, tình trạng xe, phụ tùng sử dụng, hoàn tất checklist bảo dưỡng.

**Actor:** Admin  
**Vai trò:** Người quản lý toàn hệ thống  
**Mô tả chi tiết:** Quản lý tài khoản người dùng, nhân sự, phụ tùng, báo cáo tài chính, thống kê.

**Actor:** Payment Gateway  
**Vai trò:** Dịch vụ bên ngoài  
**Mô tả chi tiết:** ĐXử lý các giao dịch thanh toán trực tuyến.

### 2.3 Các ràng buộc hệ thống (System Constraints)
- **Hạn chế kỹ thuật:**
    + Ứng dụng web chạy trên các trình duyệt phổ biến (Chrome, Edge, Safari).
    + Dữ liệu được lưu trữ trong hệ quản trị cơ sở dữ liệu MySQL hoặc PostgreSQL.
- **Hạn chế bảo mật:**
    + Mọi giao tiếp giữa client và server phải sử dụng HTTPS.
    + Thông tin người dùng, xe, và giao dịch phải được mã hóa.
    + Phân quyền truy cập nghiêm ngặt giữa các vai trò.
- **Hạn chế vận hành:**
    + Hệ thống cần hoạt động 24/7, thời gian downtime không vượt quá 1%/tháng.
    + Mỗi trung tâm có thể quản lý tối đa 1.000 xe đang hoạt động đồng thời.
- **Hạn chế tích hợp:**
    + Chỉ hỗ trợ thanh toán qua các cổng phổ biến (MoMo, ZaloPay, VNPay, ngân hàng nội địa).

### 2.4 Giả định và phụ thuộc (Assumptions and Dependencies)
**Giả định:** Trung tâm dịch vụ có cơ sở hạ tầng mạng ổn định  
**Mô tả:** Hệ thống yêu cầu kết nối internet liên tục để đồng bộ dữ liệu.

**Giả định:** Người dùng có tài khoản hợp lệ  
**Mô tả:** Tất cả người dùng (Customer, Staff, Technician, Admin) phải đăng ký/được cấp tài khoản trước khi sử dụng.

**Giả định:** Hệ thống thanh toán bên thứ ba hoạt động ổn định  
**Mô tả:** Việc thanh toán online phụ thuộc vào API của đối tác (MoMo, VNPay...).

**Giả định:** Dữ liệu đầu vào (km, thời gian bảo dưỡng, thông tin xe) được nhập chính xác   
**Mô tả:** Các tính năng nhắc nhở và báo cáo phụ thuộc vào độ chính xác dữ liệu.

**Giả định:** Các trung tâm có quy trình bảo dưỡng EV chuẩn hóa    
**Mô tả:** Đảm bảo quy trình và checklist được áp dụng đồng nhất trên toàn hệ thống.

### 2.5 Mô hình kiến trúc dự kiến (Proposed System Architecture)
**Frontend:**  
- Web: ReactJS.  

**Backend:**
- Framework: .NET Core / Node.js / Java Spring Boot.  
- Database: MySQL / PostgreSQL.  
- RESTful API để kết nối các thành phần.

**Hệ thống hỗ trợ:**
- AI module gợi ý nhu cầu phụ tùng thay thế.
- Notification service (Firebase Cloud Messaging / Email Server).
- Payment Gateway tích hợp (VNPay, MoMo, ZaloPay).

## 3. Yêu cầu chức năng (Functional Requirements)
### 3.1. Chức năng cho Khách hàng (Customer)
#### 3.1.1. Theo dõi xe & Nhắc nhở bảo dưỡng
**Mục tiêu:** Giúp khách hàng quản lý tình trạng xe điện và nhận nhắc nhở định kỳ.  
**Mô tả:**
- Hệ thống tự động gửi thông báo bảo dưỡng khi xe đạt số km hoặc thời gian quy định.
- Gửi nhắc nhở thanh toán hoặc gia hạn gói bảo dưỡng.  

**Dữ liệu vào:** Thông tin xe (VIN, model, số km hiện tại), ngày bảo dưỡng gần nhất.  
**Dữ liệu ra:** Thông báo nhắc bảo dưỡng (qua app/email/SMS).  
**Điều kiện trước:** Khách hàng đã đăng ký xe trong hệ thống.  
**Điều kiện sau:** Khách hàng nhận được thông báo; trạng thái nhắc nhở được lưu trong lịch sử.  
**Mức độ ưu tiên:** Cao.

#### 3.1.2. Đặt lịch dịch vụ
**Mục tiêu:** Cho phép khách hàng đặt lịch bảo dưỡng hoặc sửa chữa trực tuyến.  
**Mô tả:**
- Khách hàng chọn trung tâm dịch vụ, loại dịch vụ, và thời gian mong muốn.
- Nhận xác nhận đặt lịch và thông báo trạng thái.

**Dữ liệu vào:** Thông tin khách hàng, loại dịch vụ, thời gian mong muốn.  
**Dữ liệu ra:** Phiếu xác nhận lịch hẹn, mã lịch hẹn (Booking ID).  
**Điều kiện trước:** Người dùng đăng nhập hợp lệ.  
**Điều kiện sau:** Lịch hẹn được lưu và chờ xác nhận từ nhân viên.  
**Mức độ ưu tiên:** Cao.

#### 3.1.3. Quản lý hồ sơ & chi phí
**Mục tiêu:** Cho phép khách hàng theo dõi lịch sử dịch vụ, chi phí và hóa đơn.  
**Mô tả:**
- Hiển thị danh sách các lần bảo dưỡng/sửa chữa.
- Cho phép xem chi tiết từng hóa đơn, thanh toán online.

**Dữ liệu vào:** Tài khoản khách hàng.  
**Dữ liệu ra:** Danh sách lịch sử bảo dưỡng, hóa đơn, tổng chi phí.  
**Điều kiện trước:** Đã có ít nhất một lần sử dụng dịch vụ.  
**Điều kiện sau:** Khách hàng có thể xem và in hóa đơn điện tử.  
**Mức độ ưu tiên:** Trung bình – Cao.

### 3.2. Chức năng cho Nhân viên Trung tâm (Staff)
#### 3.2.1. Quản lý khách hàng & xe
**Mục tiêu:** Hỗ trợ nhân viên quản lý thông tin khách hàng và xe.  
**Mô tả:** 
- Thêm, sửa, xóa thông tin khách hàng và xe điện (model, VIN, lịch sử dịch vụ).
- Chat trực tuyến với khách hàng để xác nhận hoặc tư vấn dịch vụ.

**Dữ liệu vào:** Thông tin khách hàng và xe.  
**Dữ liệu ra:** Hồ sơ khách hàng được lưu trong hệ thống.  
**Điều kiện trước:** Nhân viên có quyền truy cập hợp lệ.  
**Điều kiện sau:** Dữ liệu được cập nhật đồng bộ với hệ thống CRM.  
**Mức độ ưu tiên:** Cao.

#### 3.2.2. Quản lý lịch hẹn & dịch vụ
**Mục tiêu:** Giúp nhân viên tiếp nhận và sắp xếp các yêu cầu dịch vụ.  
**Mô tả:**
- Nhân viên duyệt yêu cầu đặt lịch của khách hàng.
- Phân công kỹ thuật viên và lập kế hoạch làm việc.

**Dữ liệu vào:** Yêu cầu đặt lịch từ khách hàng.  
**Dữ liệu ra:** Lịch hẹn đã xác nhận, thông báo đến khách hàng.  
**Điều kiện trước:** Có yêu cầu đặt lịch từ khách hàng.  
**Điều kiện sau:** Lịch hẹn được cập nhật và phân công thành công.  
**Mức độ ưu tiên:** Cao.

#### 3.2.3. Quản lý phiếu dịch vụ & checklist EV
**Mục tiêu:** Quản lý quy trình tiếp nhận và kiểm tra xe.  
**Mô tả:**
- Tạo phiếu tiếp nhận dịch vụ khi khách hàng đến trung tâm.
- Ghi nhận tình trạng xe, phụ tùng cần thay, hạng mục kiểm tra.

**Dữ liệu vào:** Mã lịch hẹn, thông tin xe, checklist EV.  
**Dữ liệu ra:** Phiếu dịch vụ và trạng thái xe.  
**Điều kiện trước:** Xe được tiếp nhận tại trung tâm.  
**Điều kiện sau:** Thông tin được lưu và chuyển cho kỹ thuật viên.  
**Mức độ ưu tiên:** Cao.

### 3.3. Chức năng cho Kỹ thuật viên (Technician)
#### 3.3.1. Quản lý quy trình bảo dưỡng
**Mục tiêu:** Giúp kỹ thuật viên theo dõi và cập nhật tiến độ công việc.  
**Mô tả:**
- Cập nhật trạng thái xe: “Chờ”, “Đang bảo dưỡng”, “Hoàn tất”.
- Ghi chú các hạng mục đã thực hiện và phụ tùng sử dụng.

**Dữ liệu vào:** Mã phiếu dịch vụ, thông tin kiểm tra.  
**Dữ liệu ra:** Cập nhật trạng thái xe và báo cáo tiến độ.  
**Điều kiện trước:** Có phiếu dịch vụ được giao.  
**Điều kiện sau:** Báo cáo hoàn tất được lưu trong lịch sử xe.  
**Mức độ ưu tiên:** Cao.

#### 3.3.2. Ghi nhận tình trạng xe và phụ tùng
**Mục tiêu:** Cập nhật chi tiết kết quả kiểm tra và đề xuất thay thế.  
**Mô tả:**
- Ghi nhận tình trạng các bộ phận của xe điện.
- Đề xuất phụ tùng cần thay thế và gửi cho nhân viên duyệt.

**Dữ liệu vào:** Dữ liệu kiểm tra xe, ảnh, ghi chú kỹ thuật viên.  
**Dữ liệu ra:** Báo cáo kỹ thuật, danh sách phụ tùng cần thay.  
**Điều kiện trước:** Xe đang ở trạng thái “Đang bảo dưỡng”.  
**Điều kiện sau:** Báo cáo kỹ thuật được xác nhận và lưu.  
**Mức độ ưu tiên:** Trung bình – Cao.

### 3.4. Chức năng cho Quản trị viên (Admin)
#### 3.4.1. Quản lý phụ tùng
**Mục tiêu:** Theo dõi và quản lý kho phụ tùng EV tại trung tâm.  
**Mô tả:**
- Theo dõi số lượng nhập – xuất – tồn kho.
- Đặt ngưỡng tồn kho tối thiểu.
= Hệ thống AI gợi ý lượng phụ tùng cần nhập thêm dựa trên lịch sử sử dụng.

**Dữ liệu vào:** Danh sách phụ tùng, lượng tồn, lịch sử thay thế.  
**Dữ liệu ra:** Báo cáo tồn kho, đề xuất nhập hàng.  
**Điều kiện trước:** Dữ liệu phụ tùng đã được khai báo.  
**Điều kiện sau:** Hệ thống cập nhật kho tự động.  
**Mức độ ưu tiên:** Cao.

#### 3.4.2. Quản lý nhân sự
**Mục tiêu:** Quản lý và phân công kỹ thuật viên theo ca/lịch.  
**Mô tả:**
- Tạo, sửa, xóa hồ sơ nhân viên.
- Theo dõi thời gian làm việc và hiệu suất.
- Quản lý chứng chỉ chuyên môn của kỹ thuật viên.

**Dữ liệu vào:** Hồ sơ nhân sự, lịch làm việc, dữ liệu chấm công.  
**Dữ liệu ra:** Báo cáo hiệu suất, phân công kỹ thuật viên.  
**Điều kiện trước:** Có danh sách nhân viên hợp lệ.  
**Điều kiện sau:** Dữ liệu được lưu và cập nhật lịch làm việc.  
**Mức độ ưu tiên:** Trung bình – Cao.

#### 3.4.3. Quản lý tài chính & báo cáo
**Mục tiêu:** Theo dõi doanh thu, chi phí và hiệu quả hoạt động của trung tâm.  
**Mô tả:**
- Quản lý quy trình báo giá → hóa đơn → thanh toán (online/offline).
- Tổng hợp báo cáo doanh thu, chi phí, lợi nhuận theo thời gian.
- Thống kê loại dịch vụ phổ biến và xu hướng hỏng hóc xe điện.

**Dữ liệu vào:** Dữ liệu giao dịch và dịch vụ hoàn tất.  
**Dữ liệu ra:** Báo cáo thống kê và biểu đồ phân tích.  
**Điều kiện trước:** Có dữ liệu dịch vụ và giao dịch.  
**Điều kiện sau:** Báo cáo được sinh tự động và xuất ra file (PDF, Excel).  
**Mức độ ưu tiên:** Cao.










	
	
	
	




