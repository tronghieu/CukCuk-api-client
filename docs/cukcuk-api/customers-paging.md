# Customers API - Danh sách khách hàng | CUKCUK OpenPlatform API 
API trả về dữ liệu danh sách khách hàng phân trang, tối đa 100 bản ghi trên một trang.

Các thông tin cấu hình cần thiết:


|Tên        |Mô tả                                      |
|-----------|-------------------------------------------|
|CompanyCode|Mã nhà hàng lấy                            |
|AccessToken|Chuỗi token xác thực                       |
|Environment|Sub path để gọi request tới api lấy dữ liệu|


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

### api/v1/customers/paging

#### POST

Lấy danh sách khách hàng phân trang

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
  * ServiceResult.ErrorType: 5
  * Mô tả: Tham số lấy phân trang vượt quá số lượng cấu hình cho phép (max 100)
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


|Name |In  |Description                        |Required?|Type                      |
|-----|----|-----------------------------------|---------|--------------------------|
|param|body|Đối tượng lấy phân trang khách hàng|true     |CustomerPagingRequestParam|



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

Trả về đối tượng [ServiceResult](#serviceresult-definition) với ServiceResult.Data là Array<[Customer](#customer-definition)\> tổng số khách hàng có trong hệ thống qua **ServiceResult.Total**

##### Example

Ví dụ gửi tham số gọi tới api

JSON [CustomerPagingRequestParam](#customerpagingrequestparam-definition)

```
{
  "Page": 1,
  "Limit": 50,
  "IncludeInactive": true,
  "LastSyncDate": "2020-05-04T09:28:55.854Z"
}

```


Hệ thống sẽ trả về [ServiceResult](#serviceresult-definition) với Data là Array<[Customer](#customer-definition)\> JSON response

```
{
  "Code": 200,
  "Data": [
    {
      "Id": "6cd8a8cd-ac5c-4821-b0dc-8c623fe13bc4",
      "Code": "KH000002",
      "Name": "Nguyễn Văn Dũng",
      "Tel": "03482484567",
      "Birthday": "1995-12-27T00:00:00",
      "Address": "",
      "Description": "",
      "Email": "",
      "Inactive": false
    },
    {
      "Id": "919204d3-64da-4de9-a994-0b5b715b5348",
      "Code": "KH000003",
      "Name": "Chị Nga",
      "Tel": "03456782157",
      "Address": "",
      "Description": "",
      "Email": "",
      "Inactive": false
    }
  ],
  "Total": 4,
  "Success": true
}

```


Definitions
-----------

### CustomerPagingRequestParam Definition

Tham số lấy dữ liệu chi nhánh nhà hàng


|Property       |Type    |Format|Mô tả                                                     |
|---------------|--------|------|----------------------------------------------------------|
|Page           |int     |      |số trang lấy dữ liệu                                      |
|Limit          |int     |      |số bản ghi lấy trên 1 trang (max 100)                     |
|IncludeInactive|bool    |      |true - lấy toàn bộ bao gồm cả khách hàng đã ngừng theo dõi|
|LastSyncDate   |datetime|      |Mốc thời gian lấy dữ liệu                                 |


### Customer Definition


|Property            |Type   |Format  |Mô tả                              |
|--------------------|-------|--------|-----------------------------------|
|Id                  |string |guid    |Id khách hàng                      |
|Code                |string |        |Mã khách hàng                      |
|Name                |string |        |Tên khách hàng                     |
|CustomerCategoryID  |string |guid    |Id nhóm khách hàng CUKCUK          |
|CustomerCategoryName|string |        |Tên nhóm khách hàng                |
|Tel                 |string |        |Số điện thoại                      |
|NormalizedTel       |string |        |Số điện thoại chuẩn hóa            |
|Address             |string |        |Địa chỉ (số nhà, phố..)            |
|Email               |string |        |Email                              |
|Description         |string |        |Ghi chú khách hàng                 |
|IdentifyNumber      |string |        |Số ID nhân dân                     |
|Birthday            |string |datetime|Ngày sinh (ISODate)                |
|TotalAmount         |decimal|        |Tổng tiền khách hàng phát sinh|


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
