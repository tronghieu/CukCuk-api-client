# Account API | CUKCUK OpenPlatform API 
API Thực hiện cấp thông tin Token để xác thực request hợp lệ cho khi thực hiện gửi, lấy dữ liệu từ hệ thống CUKCUK.

Xem hướng dẫn tối ưu cơ chế xác thực [tại đây](../articles/using_authen.html)

Các thông tin cấu hình cần thiết:


|AppID|Domain     |Secret Key|
|-----|-----------|----------|
|AppID|Tên kết nối|Mã bảo mật|


Để lấy các thông tin trên xem bài viết [tại đây](../articles/index.html).

About
-----


|URL               |Phiên bản|
|------------------|---------|
|graphapi.cukcuk.vn|1.0      |


Schemes
-------


|Scheme|
|------|
|https |


Endpoints
---------

### api/Account/Login

#### POST

Thực hiện lấy thông tin Token đăng nhập

##### Expected Response Types



* HttpCode: 401
  * ServiceResult.ErrorType: 
  * Mô tả: Chuỗi AccessToken hết hạn hoặc không hợp lệ cần phải gọi cấp phát lại
* HttpCode: 200
  * ServiceResult.ErrorType: 0
  * Mô tả: Không có lỗi
* HttpCode: 200
  * ServiceResult.ErrorType: 1
  * Mô tả: Tham số không hợp lệ null or empty
* HttpCode: 200
  * ServiceResult.ErrorType: 2
  * Mô tả: Mã nhà hàng không tồn tại
* HttpCode: 200
  * ServiceResult.ErrorType: 3
  * Mô tả: Mã Appid không tồn tại trên hệ thống
* HttpCode: 200
  * ServiceResult.ErrorType: 4
  * Mô tả: Chuỗi thông tin chữ ký đăng nhập không hợp lệ, timeout
* HttpCode: 200
  * ServiceResult.ErrorType: 7
  * Mô tả: Thiết lập kết nối CUKCUK đang ở trạng thái ngắt, không thể lấy dữ liệu
* HttpCode: 200
  * ServiceResult.ErrorType: 100
  * Mô tả: Lỗi nội bộ API Graph
* HttpCode: 200
  * ServiceResult.ErrorType: 102
  * Mô tả: Request bị từ chối, do có request cùng loại đang xử lý. Vui lòng chờ xử lý xong hoặc chờ request đang xử lý timeout thì gọi lại.


##### Parameters


|Name |In  |Description                       |Required?|Type      |
|-----|----|----------------------------------|---------|----------|
|param|body|Đối tượng chứa thông tin đăng nhập|true     |LoginParam|


##### Content Types Produced


|Produces        |
|----------------|
|application/json|


##### Content Types Consumed


|Consumes        |
|----------------|
|application/json|


##### Response

Trả về đối tượng [ServiceResult](#serviceresult-definition) với ServiceResult.Data là [LoginResponse](#loginresponse-definition)

Definitions
-----------

### LoginData Definition

Thông tin đăng nhập


|Property |Type  |Format|Mô tả                                         |
|---------|------|------|----------------------------------------------|
|Domain   |string|      |Tên miền ví dụ: demoquanao                    |
|AppID    |string|      |AppID cần kết nối                             |
|LoginTime|string|      |Thời gian đăng nhập dạng string (giờ UTC date)|


### LoginParam Definition

Tham số thông tin đăng nhập với chuỗi chữ ký tới API


|Property     |Type  |Format|Mô tả                                           |
|-------------|------|------|------------------------------------------------|
|Domain       |string|      |Tên miền ví dụ: demoquanao                      |
|AppID        |string|      |AppID cần kết nối                               |
|LoginTime    |string|      |Thời gian đăng nhập dạng string (giờ UTC date)  |
|SignatureInfo|string|      |Thông tin chữ ký để validate thông tin đăng nhập|


### LoginResponse Definition


|Property   |Type  |Format|Mô tả                                                     |
|-----------|------|------|----------------------------------------------------------|
|AppID      |string|      |AppID cần kết nối                                         |
|Domain     |string|      |Tên miền, ví dụ: demoquanao                               |
|AccessToken|string|      |Chuỗi token dùng để xác thực các request                  |
|CompanyCode|string|      |Mã nhà hàng sẽ gửi cùng các request                       |
|Environment|string|      |Môi trường để build đường dẫn api request lấy, gửi dữ liệu|


### ServiceResult Definition


|Property    |Type  |Format|Mô tả                                     |
|------------|------|------|------------------------------------------|
|Code        |int   |      |Mã lỗi HttpCode (200, 500...)             |
|ErrorType   |int   |      |Loại lỗi                                  |
|ErrorMessage|string|      |Thông tin lỗi                             |
|Success     |bool  |      |True - không có lỗi logic xảy ra          |
|Environment |string|      |Môi trường triển khai của api             |
|Data        |string|object|Dữ liệu trả về client                     |
|Total       |int   |      |Tổng số bản ghi khi lấy dữ liệu phân trang|


### ErrorType Definition

*   Dải mã lỗi chung



* HttpCode: 401
  * ServiceResult.ErrorType: 
  * Mô tả: Chuỗi AccessToken hết hạn hoặc không hợp lệ cần phải gọi cấp phát lại
* HttpCode: 200
  * ServiceResult.ErrorType: 0
  * Mô tả: Không có lỗi
* HttpCode: 200
  * ServiceResult.ErrorType: 1
  * Mô tả: Tham số không hợp lệ null or empty
* HttpCode: 200
  * ServiceResult.ErrorType: 2
  * Mô tả: Mã nhà hàng không tồn tại
* HttpCode: 200
  * ServiceResult.ErrorType: 3
  * Mô tả: Mã Appid không tồn tại trên hệ thống
* HttpCode: 200
  * ServiceResult.ErrorType: 4
  * Mô tả: Chuỗi thông tin chữ ký đăng nhập không hợp lệ, timeout
* HttpCode: 200
  * ServiceResult.ErrorType: 5
  * Mô tả: Tham số lấy phân trang vượt quá số lượng cấu hình cho phép (max 100)
* HttpCode: 200
  * ServiceResult.ErrorType: 6
  * Mô tả: Tham số ngày giờ không hợp lệ (01/01/1753 - 31/12/9999)
* HttpCode: 200
  * ServiceResult.ErrorType: 7
  * Mô tả: Thiết lập kết nối CUKCUK đang ở trạng thái ngắt, không thể lấy dữ liệu


*   Dải mã lỗi nghiêm trọng



* HttpCode: 200
  * ServiceResult.ErrorType: 100
  * Mô tả: Lỗi nội bộ API Graph
* HttpCode: 200
  * ServiceResult.ErrorType: 102
  * Mô tả: Request bị từ chối, do có request cùng loại đang xử lý. Vui lòng chờ xử lý xong hoặc chờ request đang xử lý timeout thì gọi lại.  Ví dụ: Khi đang gọi api login mà api chưa trả về dữ liệu lại tiếp tục gọi request login này sẽ trả về lỗi này.


### SignatureInfo Build

SignatureInfo là thông tin chữ ký để đảm bảo gói tin tham số lấy thông tin đăng nhập là toàn vẹn và hợp lệ. Để build chuỗi chữ ký cần có cấu hình **SecretKey**

Danh sách tham số cấu hình lấy tại **trang quản lý CUKCUK**


|AppID|Domain     |Secret Key|
|-----|-----------|----------|
|AppID|Tên kết nối|Mã bảo mật|


xem bài viết lấy thông cấu hình [tại đây](../articles/index.html)

Chuỗi chữ ký được build theo dạng bọc thông tin tham số đẩy lên ở dạng JSON, sau đó thực hiện mã hóa một chiều theo chuẩn mã hóa Hash **HMACSHA256** với salt là thông tin cấu hình **SecretKey**.