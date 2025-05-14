# Categories API - Danh sách nhóm thực đơn dạng phẳng | CUKCUK OpenPlatform API 
API lấy danh sách nhóm thực đơn trong hệ thống.

Các thông tin cấu hình cần thiết:


|Tên        |Mô tả               |
|-----------|--------------------|
|CompanyCode|Mã nhà hàng lấy     |
|AccessToken|Chuỗi token xác thực|


Để lấy các thông tin trên xem bài viết [account/login](index.html)

About
-----


|URL                |Phiên bản|
|-------------------|---------|
|[graphapi.cukcuk.vn|1.0      |


Schemes
-------


|Scheme|
|------|
|https |


Endpoints
---------

### api/v1/categories/list?`{?includeInactive=[true|false]}`

#### GET

Lấy danh sách nhóm thực đơn

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


|Name           |In |Description                                         |Required?|Type|
|---------------|---|----------------------------------------------------|---------|----|
|includeInactive|uri|true - lấy toàn bộ bao gồm cả nhóm đã ngừng theo dõi|false    |bool|



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

Trả về đối tượng [ServiceResult](#serviceresult-definition) với ServiceResult.Data là Array<[InventoryItemCategory](#inventoryitemcategory-definition)\> nhóm thực đơn

##### Example

Ví dụ gọi **GET** tới

[https://graphapi.cukcuk.vn/api/v1/categories/list?includeInactive=true](https://graphapi.cukcuk.vn/api/v1/categories/list?includeInactive=true)

Hệ thống sẽ trả về [ServiceResult](#serviceresult-definition) với Data là Array<[InventoryItemCategory](#inventoryitemcategory-definition)\> nhóm thức đơn

JSON response

```
{
  "Code": 200,
  "Data": [
    {
      "Id": "73d8687e-aaf5-4e26-bb15-14d1ef9c6e50",
      "Code": "COMSUAT",
      "Name": "Cơm suất",
      "Description": "Cơm",
      "IsLeaf": false,
      "Grade": 1,
      "Inactive": false
    },
    {
      "Id": "33d35b16-5e5c-47a5-b37b-152ed8e9cd65",
      "Code": "THUCANMAN",
      "Name": "Thức ăn mặn",
      "Description": "Thức ăn mặn",
      "IsLeaf": false,
      "Grade": 1,
      "Inactive": false
    },
    {
      "Id": "4b5d63ef-e8ba-4198-b34f-92979447c3fc",
      "Code": "TRA",
      "Name": "Trà",
      "Description": "Trà",
      "IsLeaf": false,
      "Grade": 1,
      "Inactive": false
    },
    {
      "Id": "8027441b-5ab0-465d-b812-adeba1685ecf",
      "Code": "DOXAO",
      "Name": "Đồ xào",
      "Description": "Đồ xào",
      "IsLeaf": false,
      "Grade": 1,
      "Inactive": false
    },
    {
      "Id": "fcc832b5-7bdc-4dbd-801e-af0a9097b60d",
      "Code": "CANH",
      "Name": "Canh",
      "Description": "Canh",
      "IsLeaf": false,
      "Grade": 1,
      "Inactive": false
    },
    {
      "Id": "dcdd1e90-690d-4ca5-8139-b4406d673c71",
      "Code": "DOUONGDONGCHAI",
      "Name": "Đồ uống đóng chai",
      "Description": "Đồ uống đóng chai",
      "IsLeaf": false,
      "Grade": 1,
      "Inactive": false
    },
    {
      "Id": "859e8661-1145-4dae-ab6b-c47de19b3c1e",
      "Code": "RAU",
      "Name": "Rau",
      "Description": "Rau",
      "IsLeaf": false,
      "Grade": 1,
      "Inactive": false
    },
    {
      "Id": "3ccfe00a-1340-413f-95d2-d99d52a247fc",
      "Code": "MATHANGKHAC_KHAC",
      "Name": "Khác",
      "Description": "Khác",
      "IsLeaf": false,
      "Grade": 1,
      "Inactive": false
    }
  ],
  "Total": 0,
  "Success": true
}

```


Definitions
-----------

### InventoryItemCategory Definition


|Property   |Type  |Format|Mô tả                                                    |
|-----------|------|------|---------------------------------------------------------|
|Id         |string|guid  |Id nhóm thực đơn                                         |
|Code       |string|      |Mã nhóm thực đơn                                         |
|Name       |string|      |Tên nhóm thực đơn                                        |
|Description|string|      |Ghi chú                                                  |
|Inactive   |bool  |      |True - ngừng kinh doanh, false - đang kinh doanh         |
|IsLeaf     |bool  |      |True - là nhóm con, false - là nhóm cha cấp cao nhất     |
|Grade      |int   |      |Số thứ tự cấp bậc của nhóm(nhóm cấp 1, cấp 2...cấp 9 max)|


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
