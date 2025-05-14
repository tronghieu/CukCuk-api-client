# InventoryItems API - Chi tiết món ăn | CUKCUK OpenPlatform API 
API lấy thông tin chi tiết món ăn từ id

Các thông tin cấu hình cần thiết:


|Tên        |Mô tả               |
|-----------|--------------------|
|CompanyCode|Mã nhà hàng lấy     |
|AccessToken|Chuỗi token xác thực|


Để lấy các thông tin trên xem bài viết [account/login](index.html)

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

### api/v1/inventoryitems/detail/`{inventoryItemId}`

#### GET

Lấy chi tiết món ăn theo id

##### Expected Response Types



* HttpCode: 401
  * ServiceResult.ErrorType: 
  * Mô tả: Chuỗi AccessToken hết hạn hoặc không hợp lệ cần phải gọi cấp phát lại
* HttpCode: 200
  * ServiceResult.ErrorType: 0
  * Mô tả: Không có lỗi
* HttpCode: 200
  * ServiceResult.ErrorType: 2
  * Mô tả: Mã nhà hàng không tồn tại
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


|Name |In |Description|Required?|Type  |
|-----|---|-----------|---------|------|
|param|uri|Id món ăn  |true     |string|



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

Trả về đối tượng [ServiceResult](#serviceresult-definition) với ServiceResult.Data là Array<[InventoryItem](#inventoryitem-definition)\> món ăn chi tiết

##### Example

Ví dụ gọi **GET** tới

[https://graphapi.CUKCUK.vn/api/v1/inventoryitems/detail/f3ad8d97-cc7f-4e1b-8187-06d760ef7d27](https://graphapi.cukcuk.vn/api/v1/inventoryitems/detail/f3ad8d97-cc7f-4e1b-8187-06d760ef7d27)

Hệ thống sẽ trả về [ServiceResult](#serviceresult-definition) với Data là [InventoryItem](#inventoryitem-definition) món ăn chi tiết

JSON response

```
{
  "Code": 200,
  "Data": {
    "Id": "f3ad8d97-cc7f-4e1b-8187-06d760ef7d27",
    "Children": [],
    "AdditionCategories": [
      {
        "Additions": [
          {
            "AdditionId": "18baca13-67e7-4148-b572-98bab323a07f",
            "Description": "Cốc to",
            "Price": 3000.0,
            "InActive": false
          }
        ]
      }
    ],
    "Code": "TRADA",
    "ItemType": 6,
    "Name": "Trà đá",
    "CategoryID": "4b5d63ef-e8ba-4198-b34f-92979447c3fc",
    "CategoryName": "Trà",
    "Price": 2000.0,
    "Inactive": false,
    "UnitID": "47817d1f-c393-4a4c-af57-0d7fe3f29c5f",
    "UnitName": "Cốc",
    "Description": "",
    "IsSeftPrice": false,
    "AllowAdjustPrice": false
  },
  "Total": 0,
  "Success": true
}

```


Definitions
-----------

### InventoryItem Definition



* Property: Id
  * Type: string
  * Format: guid
  * Mô tả: Id món ăn
* Property: Code
  * Type: string
  * Format: 
  * Mô tả: Mã món ăn
* Property: Name
  * Type: string
  * Format: 
  * Mô tả: Tên món ăn
* Property: Children
  * Type: InventoryItem
  * Format: 
  * Mô tả: danh sách các món ăn thành phần
* Property: AdditionCategories
  * Type: InventoryItemAddtionCategory
  * Format: 
  * Mô tả: Danh sách sở thích phục vụ
* Property: ItemType
  * Type: int
  * Format: 
  * Mô tả: Loại món, xem tại đây
* Property: SellingPrice
  * Type: decimal
  * Format: 
  * Mô tả: Giá
* Property: Price
  * Type: decimal
  * Format: 
  * Mô tả: Giá bán
* Property: Description
  * Type: string
  * Format: 
  * Mô tả: Ghi chú
* Property: Inactive
  * Type: bool
  * Format: 
  * Mô tả: true - ngừng kinh doanh, false - đang kinh doanh
* Property: UnitId
  * Type: string
  * Format: guid
  * Mô tả: Id đơn vị tính
* Property: UnitName
  * Type: string
  * Format: 
  * Mô tả: Tên đơn vị tính
* Property: IsSeftPrice
  * Type: bool
  * Format: 
  * Mô tả: Thay đổi theo thời giá
* Property: AllowAdjustPrice
  * Type: bool
  * Format: 
  * Mô tả: Cho phép điều chỉnh giá bán


### ItemType Definition


|Giá trị|Loại                   |
|-------|-----------------------|
|1      |Món ăn                 |
|2      |Món ăn theo nguyên liệu|
|3      |Món ăn theo nhóm       |
|4      |Combo                  |
|5      |Đồ uống đóng chai      |
|6      |Đồ uống pha chế        |
|7      |Mặt hàng khác          |
|8      |Nguyên vật liệu        |
|10     |Đồ uống theo nhóm      |
|12     |Combo tùy chọn         |


### InventoryItemInStockInfo Definition


|Property    |Type   |Format|Mô tả            |
|------------|-------|------|-----------------|
|ProductId   |string |guid  |Id món ăn        |
|ProductCode |string |      |Mã món ăn        |
|ProductName |string |      |Tên món ăn       |
|BranchId    |string |guid  |Id chi nhánh tồn |
|BranchName  |string |      |Tên chi nhánh tồn|
|SellingPrice|decimal|      |Giá bán          |
|OnHand      |decimal|      |Số lượng tồn     |
|Ordered     |decimal|      |Số lượng đặt hàng|


### InventoryItemAddtionCategory Definition


|Property |Type                        |Format|Mô tả                     |
|---------|----------------------------|------|--------------------------|
|Id       |string                      |guid  |Id nhóm sở thích phục vụ  |
|Name     |string                      |      |Tên nhóm sở thích phục vụ |
|Additions|Array<InventoryItemAddition>|      |Danh sách sở thích phục vụ|


### InventoryItemAddtion Definition


|Property   |Type   |Format|Mô tả               |
|-----------|-------|------|--------------------|
|Id         |string |guid  |Id sở thích phục vụ |
|Description|string |      |Tên sở thích phục vụ|
|Price      |decimal|      |Giá bán cộng thêm   |
|InActive   |bool   |      |Ngừng phục vụ       |


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
