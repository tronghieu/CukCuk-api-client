# Orders API - Cập nhật danh sách món cho đơn hàng | CUKCUK OpenPlatform API 
API thực hiện cập nhật danh sách món cho đơn hàng đã tạo.

Các thông tin cấu hình cần thiết:


|Tên        |Mô tả               |
|-----------|--------------------|
|CompanyCode|Mã cửa hàng lấy     |
|AccessToken|Chuỗi token xác thực|


Để lấy các thông tin trên xem bài viết [account/login](index.html)

About
-----


|URL               |Phiên bản|Thay đổi|
|------------------|---------|--------|
|graphapi.cukcuk.vn|1.0      |        |


Schemes
-------


|Scheme|
|------|
|https |


Endpoints
---------

### api/v1/orders/update-item

#### POST

Cập nhật danh sách món cho đơn hàng

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
  * Mô tả: Mã cửa hàng không tồn tại
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
  * ServiceResult.ErrorType: 254
  * Mô tả: Đơn hàng phải có ít nhất một hàng hóa được chọn
* HttpCode: 200
  * ServiceResult.ErrorType: 258
  * Mô tả: Trạng thái đơn hàng không hợp lệ


##### Parameters


|Name |In  |Description           |Required?|Type                |
|-----|----|----------------------|---------|--------------------|
|param|body|Đối tượng tạo đơn hàng|true     |UpdateItemOrderParam|



|Name         |In    |Description                                              |Required?|Type  |
|-------------|------|---------------------------------------------------------|---------|------|
|Authorization|header|Header key cấu hình AccessToken (dạng Bearer AccessToken)|true     |string|
|CompanyCode  |header|Header key cấu hình mã cửa hàng CompanyCode              |true     |string|


Ví dụ:

```
CompanyCode: namng912
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

Trả về đối tượng [ServiceResult](#serviceresult-definition) với ServiceResult.Data là object [Order](#order-definition) trả về thông tin đặt hàng bao gồm cả danh sách món được chọn

##### Example

Ví dụ gửi tham số gọi tới api

JSON [UpdateItemOrderParam](#updateitemorderparam-definition)

```
{
        "Id": "832aea39-6b36-4473-8458-1396c4f36c75",
    "Type": 3,
    "No": "2.16",
    "BranchId": "994c6fe5-da83-441b-a0e8-57a6fed98fb2",
    "Status": 9,
    "Date": "2022-03-29T09:29:35.117+07:00",
    "ShippingDate": "2022-03-29T14:06:01.647+07:00",
    "CustomerId": "8dc32aa6-4d59-4a8f-96be-427ae6fee1b4",
    "CustomerName": "sample string 3",
    "CustomerTel": "sample string 4",
    "EmployeeId": "66935b25-faf4-456b-8bde-080438b630bc",
    "ShippingAddress": "ha noi",
    "DeliveryAmount": 10000.0000,
    "DepositAmount": 8.0000,
    "TotalAmount": 910000.0000,
    "OrderDetails": [
             {
        "Id": "832AEA39-6B36-4473-8458-1396C4F36C74",
        "ItemId": "80F0FBFD-EA80-4857-BED6-75EBA359179A",
        "ItemName": "Aquafina",
        "UnitId": "CC09CE6E-33FF-455D-A421-7E2C1060A8F5123",
        "UnitName": "Chai",
        "Quantity": 9.0000,
        "Status": 1,
        "Price": 10000.0000,
        "Amount": 20000.0000,
        "SortOrder": 0
      }
    ],
    "BranchId": "994C6FE5-DA83-441B-A0E8-57A6FED98FB2",
  "Version": "sample string 10"
}

```


Hệ thống sẽ trả về [ServiceResult](#serviceresult-definition) với Data là object [Order](#order-definition) JSON response

```
{
  "Code": 200,
  "Data": {
    "Id": "832aea39-6b36-4473-8458-1396c4f36c75",
    "Type": 3,
    "No": "2.16",
    "BranchId": "994c6fe5-da83-441b-a0e8-57a6fed98fb2",
    "Status": 9,
    "Date": "2022-03-29T09:35:53.273+07:00",
    "ShippingDate": "2022-03-29T14:06:01.647+07:00",
    "CustomerId": "8dc32aa6-4d59-4a8f-96be-427ae6fee1b4",
    "CustomerName": "sample string 3",
    "CustomerTel": "sample string 4",
    "EmployeeId": "66935b25-faf4-456b-8bde-080438b630bc",
    "ShippingAddress": "ha noi",
    "DeliveryAmount": 10000.0000,
    "DepositAmount": 8.0000,
    "TotalAmount": 910000.0000,
    "OrderDetails": [
      {
        "Id": "3f8db99e-746b-431a-b9d9-1db4e40c60ed",
        "ItemId": "80f0fbfd-ea80-4857-bed6-75eba359179a",
        "ItemName": "Cá lóc chiên xù",
        "UnitId": "cc09ce6e-33ff-455d-a421-7e2c1060a8f5",
        "UnitName": "Con",
        "Quantity": 9.0000,
        "Status": 1,
        "Price": 100000.0000,
        "Amount": 900000.0000,
        "SortOrder": 0
      }
    ]
  },
  "Total": 0,
  "Success": true
}

```


Definitions
-----------

### Order Definition



* Property: Id
  * Type: string
  * Format: guid
  * Mô tả: Id đơn hàng
* Property: No
  * Type: string
  * Format: 
  * Mô tả: Số đơn hàng
* Property: Type
  * Type: int
  * Format: 
  * Mô tả: Loại đơn hàng (1 - phục vụ tại bàn, 2 - mang về, 3 - giao hàng)
* Property: BranchId
  * Type: string
  * Format: guid
  * Mô tả: Id chi nhánh bán hàng
* Property: Status
  * Type: int
  * Format: 
  * Mô tả: Trạng thái đơn hàng, xem tại đây
* Property: OrderDetails
  * Type: Array<OrderDetail>
  * Format: 
  * Mô tả: Danh sách hàng hóa trong đơn hàng
* Property: Date
  * Type: string
  * Format: datetime
  * Mô tả: Ngày, giờ lập đơn
* Property: ShippingDate
  * Type: string
  * Format: datetime
  * Mô tả: Ngày, giờ giao hàng
* Property: CustomerId
  * Type: string
  * Format: guid
  * Mô tả: Id khách hàng
* Property: CustomerName
  * Type: string
  * Format: 
  * Mô tả: Tên khách hàng
* Property: CustomerTel
  * Type: string
  * Format: 
  * Mô tả: Số điện thoại khách hàng
* Property: ShippingAddress
  * Type: string
  * Format: 
  * Mô tả: Địa chỉ giao hàng
* Property: DeliveryAmount
  * Type: decimal
  * Format: 
  * Mô tả: Phí giao hàng
* Property: DepositAmount
  * Type: decimal
  * Format: 
  * Mô tả: Tiền khách đặt trước
* Property: TotalAmount
  * Type: decimal
  * Format: 
  * Mô tả: Tổng đơn hàng


### UpdateItemOrderParam Definition


|Property    |Type              |Format|Bắt buộc (*)|Mô tả                           |
|------------|------------------|------|------------|--------------------------------|
|Id          |string            |guid  |*           |Id đơn đặt hàng                 |
|BranchId    |string            |guid  |*           |Id chi nhánh bán hàng           |
|OrderDetails|Array<OrderDetail>|      |*           |Danh sách các món trong đơn hàng|


### OrderDetail Definition


|Property   |Type   |Format|Bắt buộc (*)|Mô tả                                        |
|-----------|-------|------|------------|---------------------------------------------|
|ItemId     |string |Guid  |            |Id món, xem tại đây đây                      |
|AdditionId |string |      |            |Id sở thích phục vụ gọi thêm, xem tại đây đây|
|Quantity   |decimal|      |            |Số lượng                                     |
|Description|string |      |            |Ghi chú cho món                              |
|UnitId     |string |guid  |            |Id Đơn vị tính                               |
|UnitName   |string |      |            |Tên đơn vị tính                              |
|Quantity   |decimal|      |            |Số lượng                                     |
|Price      |decimal|      |            |Đơn giá                                      |
|Amount     |decimal|      |            |Thành tiền                                   |


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
  * Mô tả: Mã cửa hàng không tồn tại
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
  * ServiceResult.ErrorType: 252
  * Mô tả: Id đơn hàng không tồn tại để cập nhật
* HttpCode: 200
  * ServiceResult.ErrorType: 254
  * Mô tả: Đơn hàng phải có ít nhất một hàng hóa được chọn
* HttpCode: 200
  * ServiceResult.ErrorType: 258
  * Mô tả: Trạng thái đơn hàng không hợp lệ


*   Dải mã lỗi nghiêm trọng



* HttpCode: 200
  * ServiceResult.ErrorType: 100
  * Mô tả: Lỗi nội bộ API Graph
* HttpCode: 200
  * ServiceResult.ErrorType: 102
  * Mô tả: Request bị từ chối, do có request cùng loại đang xử lý. Vui lòng chờ xử lý xong hoặc chờ request đang xử lý timeout thì gọi lại.  Ví dụ: Khi đang gọi api login mà api chưa trả về dữ liệu lại tiếp tục gọi request login này sẽ trả về lỗi này.


Note
----