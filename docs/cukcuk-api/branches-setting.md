# Branchs API | CUKCUK OpenPlatform API 
API trả về thông tin thiết lập chi nhánh của nhà hàng

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

### api/v1/branchs/setting/`{branchId}`

#### POST

Lấy thông tin thiết lập chi nhánh của nhà hàng

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
  * ServiceResult.ErrorType: 7
  * Mô tả: Thiết lập kết nối CUKCUK đang ở trạng thái ngắt, không thể lấy dữ liệu
* HttpCode: 200
  * ServiceResult.ErrorType: 100
  * Mô tả: Lỗi nội bộ API Graph
* HttpCode: 200
  * ServiceResult.ErrorType: 102
  * Mô tả: Request bị từ chối, do có request cùng loại đang xử lý. Vui lòng chờ xử lý xong hoặc chờ request đang xử lý timeout thì gọi lại.


##### Parameters


|Name    |In |Description                        |Required?|Type  |
|--------|---|-----------------------------------|---------|------|
|branchId|uri|Id chi nhánh, lấy Id tại api Branch|true     |string|



|Name         |In    |Description                                              |Required?|Type  |
|-------------|------|---------------------------------------------------------|---------|------|
|Authorization|header|Header key cấu hình AccessToken (dạng Bearer AccessToken)|true     |string|
|CompanyCode  |header|Header key cấu hình mã nhà hàng CompanyCode              |true     |string|


Ví dụ:

```
CompanyCode: demoquanviet
Authorization: Bearer 06S1YMPgDJl65xE5tYzAJlNmVALHVHlLZg9euMUaUTO9C0Jm8TL3L4isto97ApKdQbVVX2rUJUTfXbBBipo1B5UvAgl3hwDYh8bNGVVUNp6B99Ht3KZQkwVh2SNblX-vulGSNatV-NF1KOfNJImOUsVXimxVEX3n2lnRV0A_mbJ_XP0sliGqbMzwa9YtY-jts4Iu06TaFOqBpBhndS-mofDlZlKkVqYklwy6cDzBktas7Xfi5MOsCujCDYO_0WFauBQCPDVnSj6ew_3Nm5ollwynkmErSmVf2E4cShM4700

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

Trả về đối tượng [ServiceResult](#serviceresult-definition) với ServiceResult.Data là Array<[Branch](#branch-definition)\>

##### Example

Ví dụ gọi **GET** tới

[https://graphapi.cukcuk.vn/api/v1/branchs/setting/994c6fe5-da83-441b-a0e8-57a6fed98fb2](https://graphapi.cukcuk.vn/api/v1/branchs/setting/994c6fe5-da83-441b-a0e8-57a6fed98fb2)

Hệ thống sẽ trả về [ServiceResult](#serviceresult-definition) với Data là [Branch](#branch-definition)\> JSON response

```
{
  "Code": 200,
  "Data": {
    "Id": "994c6fe5-da83-441b-a0e8-57a6fed98fb2",
    "HasVATRate": true,
    "VATRate": 10.0,
    "VATForDelivery": false,
    "VATForTakeAway": false,
    "VATForShip": false,
    "CalTaxForService": false,
    "HasCalcService": true,
    "CalcServiceDelivery": false,
    "CalcServiceTakeAway": false,
    "IsCalcServiceAmountNotPromotion": false,
    "HasCalcServiceWhenRequire": false,
    "HasServiceRate": true,
    "ServiceRate": 5.0,
    "HasAmountService": false,
    "AmountService": 0.0,
    "Code": "demoquanviet",
    "Name": "demoquanviet",
    "IsBaseDepot": false,
    "Inactive": false
  },
  "Total": 0,
  "Success": true
}

```


Definitions
-----------

### Branch Definition



* Property: Id
  * Type: string
  * Format: guid
  * Mô tả: Id chi nhánh
* Property: Code
  * Type: string
  * Format: 
  * Mô tả: Mã chi nhánh
* Property: Name
  * Type: string
  * Format: 
  * Mô tả: Tên chi nhánh
* Property: IsBaseDepot
  * Type: bool
  * Format: 
  * Mô tả: True - là kho tổng
* Property: IsChainBranch
  * Type: bool
  * Format: 
  * Mô tả: True - là chuỗi nhà hàng
* Property: HasVATRate
  * Type: bool
  * Format: 
  * Mô tả: True - Tính thuế giá trị gia tăng
* Property: VATForDelivery
  * Type: bool
  * Format: 
  * Mô tả: True - Tính thuế cho đơn hàng giao hàng
* Property: VATForTakeAway
  * Type: bool
  * Format: 
  * Mô tả: True - Tính thuế cho đơn hàng mang về
* Property: VATForShip
  * Type: bool
  * Format: 
  * Mô tả: True - Tính thuế cho cả phí giao hàng
* Property: VATRate
  * Type: decimal
  * Format: 
  * Mô tả: Thuế suất (giá trị từ 0 đến 100)
* Property: HasCalcService
  * Type: bool
  * Format: 
  * Mô tả: True - Tính phí dịch vụ
* Property: CalcServiceDelivery
  * Type: bool
  * Format: 
  * Mô tả: True - Tính phí dịch vụ hay cho đơn hàng mang về
* Property: CalcServiceTakeAway
  * Type: bool
  * Format: 
  * Mô tả: True - Tính phí dịch vụ hay cho đơn hàng giao hàng
* Property: IsCalcServiceAmountNotPromotion
  * Type: bool
  * Format: 
  * Mô tả: True - Tính phí dịch vụ trên thành tiền chưa trừ khuyến mại
* Property: CalTaxForService
  * Type: bool
  * Format: 
  * Mô tả: True - Tính thuế cho phí dịch vụ
* Property: HasServiceRate
  * Type: bool
  * Format: 
  * Mô tả: True - Phí dịch vụ tính theo % hóa đơn
* Property: ServiceRate
  * Type: decimal
  * Format: 
  * Mô tả: Phần trăm phí dịch vụ (giá trị từ 0 đến 100)
* Property: HasAmountService
  * Type: bool
  * Format: 
  * Mô tả: True - Phí dịch vụ tính theo số tiền cố định
* Property: AmountService
  * Type: decimal
  * Format: 
  * Mô tả: Tiền phí dich vụ


### ServiceResult Definition


|Property    |Type  |Format|Mô tả                                     |
|------------|------|------|------------------------------------------|
|Code        |int   |      |Mã lỗi HttpCode (200, 500...)             |
|ErrorType   |int   |      |Loại lỗi                                  |
|ErrorMessage|string|      |Thông tin lỗi                             |
|Success     |bool  |      |True - không có lỗi logic xảy ra          |
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
