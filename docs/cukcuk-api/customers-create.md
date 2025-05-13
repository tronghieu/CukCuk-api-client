# Customers API - Thêm khách hàng | CUKCUK OpenPlatform API 
API thực hiện lưu thông tin khách hàng vào hệ thống

Các thông tin cấu hình cần thiết:


|Tên        |Mô tả               |
|-----------|--------------------|
|CompanyCode|Mã nhà hàng lấy     |
|AccessToken|Chuỗi token xác thực|


Để lấy các thông tin trên xem bài viết [account/login](index.html)

About
-----


|URL               |Phiên bản|Thay đổi                             |
|------------------|---------|-------------------------------------|
|graphapi.CUKCUK.vn|1.0      |                                     |
|graphapi.CUKCUK.vn|1.1      |Thêm Id chi nhánh cần thêm khách hàng|


Schemes
-------


|Scheme|
|------|
|https |


Endpoints
---------

### api/v1/customers/

#### POST

Thêm mới khách hàng

##### Expected Response Types



* HttpCode: 401
  * ServiceResult.ErrorType: 
  * Mô tả: Chuỗi AccessToken hết hạn hoặc không hợp lệ cần phải gọi cấp phát lại
* HttpCode: 200
  * ServiceResult.ErrorType: 1
  * Mô tả: Tham số không hợp lệ null or empty
* HttpCode: 200
  * ServiceResult.ErrorType: 2
  * Mô tả: Mã nhà hàng không tồn tại
* HttpCode: 200
  * ServiceResult.ErrorType: 6
  * Mô tả: Tham số ngày giờ không hợp lệ (01/01/1753 - 31/12/9999)
* HttpCode: 200
  * ServiceResult.ErrorType: 7
  * Mô tả: Thiết lập kết nối CUKCUK đang ở trạng thái ngắt, không thể lấy dữ liệu
* HttpCode: 200
  * ServiceResult.ErrorType: 100
  * Mô tả: Lỗi nội bộ API Graph
* HttpCode: 200
  * ServiceResult.ErrorType: 102
  * Mô tả: Request bị từ chối, do có request cùng loại đang xử lý. Vui lòng chờ xử lý xong hoặc chờ request đang xử lý timeout thì gọi lại.
* HttpCode: 200
  * ServiceResult.ErrorType: 200
  * Mô tả: Thông tin số điện thoại hoặc mã khách hàng đã tồn tại, không thể thêm mới.


##### Parameters


|Name |In  |Description                  |Required?|Type    |
|-----|----|-----------------------------|---------|--------|
|param|body|Đối tượng thêm mới khách hàng|true     |Customer|



|Name         |In    |Description                                              |Required?|Type  |
|-------------|------|---------------------------------------------------------|---------|------|
|Authorization|header|Header key cấu hình AccessToken (dạng Bearer AccessToken)|true     |string|
|CompanyCode  |header|Header key cấu hình mã nhà hàng CompanyCode              |true     |string|


Ví dụ:

```
CompanyCode: demoquanviet
Authorization: Bearer utFYFHGRrnz-JWVCViIjy4k3CtKWOJDBY6wvL5X_5k9jm14tLIP6qPgCXdupERxyv78hWzSAF_rtK1RRAbtwc-M96sUIzFQ4bSfeY_2xYCzmZBTPNKbohxMHDbR2F4eeNk_dM_7B5Zod8-qGhT7LDwtE_23cuRWeK_qWkYHk2rMiqJM-vd9dYHANtq4OVI-Y8fYZ4B_Q_wPvsZl6svkSNLX2RQygFMOccGsC_G3dv1MbUf2KWjOHcr_SBPH66jQPs8V3CbZ_Eywo7vShkqdenhvNqdNOg9Gl56tybzW4YfcAvmYMUUOEuc7-ffyHfUnE

```


##### Content Types Produced


|Produces        |
|----------------|
|application/json|


##### Content Types Consumed


|Consumes        |
|----------------|
|application/json|


##### Response

Trả về đối tượng [ServiceResult](#serviceresult-definition) với ServiceResult.Data là [Customer](#customer-definition) với thông tin **`Customer.Code`, `Customer.Id`** do hệ thống CUKCUK sinh.

##### Example

Ví dụ gửi tham số gọi tới api

JSON [Customer](#customer-definition)

```
{
  "Code": "KH000010",
  "Name": "Nguyễn Văn A",
  "Tel": "03423546412",
  "Birthday": "1998-11-25T00:00:00",
  "Address": "Trần Quốc Vượng, Dịch Vọng Hậu, Cầu Giấy, Hà Nội",
  "Description": "",
  "Inactive": false
}

```


Hệ thống sẽ trả về [ServiceResult](#serviceresult-definition) với Data là Array<[Customer](#customer-definition)\> JSON response

##### Trường hợp: Thông tin số điện thoại và mã khách hàng chưa tồn tại trong hệ thống

```
{
  "Code": 200,
  "Data": [
    {
      "Id": "0f330970-d4e4-47d6-b8bb-bbff89415c21",
      "Code": "KH000010",
      "Name": "Nguyễn Văn A",
      "Tel": "03423546412",
      "Birthday": "1998-11-25T00:00:00",
      "Address": "Trần Quốc Vượng, Dịch Vọng Hậu, Cầu Giấy, Hà Nội",
      "Description": "",
      "Inactive": false
    }
  ],
  "Total": 0,
  "Success": true
}

```


##### Trường hợp: Thông tin số điện thoại và mã khách hàng đã tồn tại trong hệ thống

```
{
  "Code": 200,
  "ErrorType": 200,
  "ErrorMessage": "Mã khách hàng KH000010 hoặc số điện thoại 03423546412 đã tồn tại",
  "Data": [
    {
      "Id": "e7a9139f-5c81-4464-b460-7d892866d6da",
      "Code": "KH000010",
      "Name": "Nguyễn Văn B",
      "Tel": "03423546412",
      "Address": "Trần Quốc Vượng, Dịch Vọng Hậu, Cầu Giấy, Hà Nội",
      "Description": "",
      "Inactive": false
    }
  ],
  "Total": 0,
  "Success": false
}

```


Definitions
-----------

### Customer Definition



* Property: Id
  * Type: string
  * Format: guid
  * Bắt buộc (*): 
  * Mô tả: Id khách hàng
* Property: BranchId
  * Type: string
  * Format: guid
  * Bắt buộc (*): 
  * Mô tả: Id chi nhánh
* Property: OriginalBranchId
  * Type: string
  * Format: guid
  * Bắt buộc (*): 
  * Mô tả: Id chi nhánh gốc (cho đối tác tự quản lý)
* Property: Code
  * Type: string
  * Format: 
  * Bắt buộc (*): 
  * Mô tả: Mã khách hàng
* Property: Name
  * Type: string
  * Format: 
  * Bắt buộc (*): *
  * Mô tả: Tên khách hàng
* Property: CustomerCategoryID
  * Type: string
  * Format: guid
  * Bắt buộc (*): 
  * Mô tả: Id nhóm khách hàng CUKCUK
* Property: CustomerCategoryName
  * Type: string
  * Format: 
  * Bắt buộc (*): 
  * Mô tả: Tên nhóm khách hàng
* Property: Tel
  * Type: string
  * Format: 
  * Bắt buộc (*): *
  * Mô tả: Số điện thoại
* Property: Address
  * Type: string
  * Format: 
  * Bắt buộc (*): 
  * Mô tả: Địa chỉ (số nhà, phố..)
* Property: Email
  * Type: string
  * Format: 
  * Bắt buộc (*): 
  * Mô tả: Email
* Property: Description
  * Type: string
  * Format: 
  * Bắt buộc (*): 
  * Mô tả: Ghi chú khách hàng
* Property: IdentifyNumber
  * Type: string
  * Format: 
  * Bắt buộc (*): 
  * Mô tả: Số ID nhân dân
* Property: Birthday
  * Type: string
  * Format: datetime
  * Bắt buộc (*): 
  * Mô tả: Ngày sinh (ISODate)
* Property: Inactive
  * Type: bool
  * Format: 
  * Bắt buộc (*): 
  * Mô tả: Ngừng theo dõi (true: ngừng theo dõi, false: theo dõi)
* Property: OldNumberCard
  * Type: string
  * Format: 
  * Bắt buộc (*): 
  * Mô tả: Số thẻ cũ
* Property: CardStartDate
  * Type: string
  * Format: datetime
  * Bắt buộc (*): 
  * Mô tả: Ngày phát hành thẻ (ISODate)
* Property: CardExpireDate
  * Type: string
  * Format: datetime
  * Bắt buộc (*): 
  * Mô tả: Ngày hết hạn thẻ (ISODate)


### ServiceResult Definition


|Property    |Type    |Format|Mô tả                                     |
|------------|--------|------|------------------------------------------|
|Code        |int     |      |Mã lỗi HttpCode (200, 500...)             |
|ErrorType   |int     |      |Lo��i lỗi                                 |
|ErrorMessage|string  |      |Thông tin lỗi                             |
|Success     |bool    |      |True - không có lỗi logic xảy ra          |
|Data        |string  |object|Dữ liệu trả về                            |
|Total       |interger|      |Tổng số bản ghi khi lấy dữ liệu phân trang|


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
* HttpCode: 200
  * ServiceResult.ErrorType: 200
  * Mô tả: Thông tin số điện thoại hoặc mã khách hàng đã tồn tại, không thể thêm mới.


*   Dải mã lỗi nghiêm trọng



* HttpCode: 200
  * ServiceResult.ErrorType: 100
  * Mô tả: Lỗi nội bộ API Graph
* HttpCode: 200
  * ServiceResult.ErrorType: 102
  * Mô tả: Request bị từ chối, do có request cùng loại đang xử lý. Vui lòng chờ xử lý xong hoặc chờ request đang xử lý timeout thì gọi lại.  Ví dụ: Khi đang gọi api login mà api chưa trả về dữ liệu lại tiếp tục gọi request login này sẽ trả về lỗi này.
