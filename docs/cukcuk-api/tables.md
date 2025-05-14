# Tables API - Lấy danh sách các bàn theo chi nhánh | CUKCUK OpenPlatform API 
API lấy thông tin chi tiết các bàn trong khu vực theo chi nhánh

Các thông tin cấu hình cần thiết:


|Tên        |Mô tả               |
|-----------|--------------------|
|CompanyCode|Mã nhà hàng lấy     |
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

### api/v1/tables/`{branchID}`

#### GET

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


##### Parameters


|Name    |In |Description |Required?|Type  |
|--------|---|------------|---------|------|
|branchID|uri|Id chi nhánh|true     |string|



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

Trả về đối tượng [ServiceResult](#serviceresult-definition) với ServiceResult.Data là [BranchTables](#branchtables-definition)

##### Example

Ví dụ gọi **GET** tới

[https://graphapi.cukcuk2.misa.local/api/v1/tables/994C6FE5-DA83-441B-A0E8-57A6FED98FB2](https://graphapi.cukcuk2.misa.local/api/v1/tables/994C6FE5-DA83-441B-A0E8-57A6FED98FB2)

Hệ thống sẽ trả về [ServiceResult](#serviceresult-definition) với Data là [BranchTables](#branchtables-definition) chi tiết JSON response

```
{
    "Code": 200,
    "Data": {
        "ListTable": [
            {
                "MapObjectID": "4a541005-1225-4cf4-8134-08ff0bbc395d",
                "MapObjectName": "3.23",
                "AreaID": "58c212a2-ec62-48a9-8fbd-128fe9d2be56",
                "AreaName": "3.2",
                "IsAvailable": true
            },
            {
                "MapObjectID": "7b0e75eb-a314-40d9-9111-536dea1f6794",
                "MapObjectName": "3.22",
                "AreaID": "58c212a2-ec62-48a9-8fbd-128fe9d2be56",
                "AreaName": "3.2",
                "IsAvailable": true
            },
            {
                "MapObjectID": "277b56bb-6cee-4a6e-af50-834b49bb11b9",
                "MapObjectName": "3.21",
                "AreaID": "58c212a2-ec62-48a9-8fbd-128fe9d2be56",
                "AreaName": "3.2",
                "IsAvailable": true
            },
            {
                "MapObjectID": "989f288c-5c95-4161-b6b4-1840e786639b",
                "MapObjectName": "10",
                "AreaID": "ca198144-bac1-40e8-b908-2027a19931bd",
                "AreaName": "2",
                "IsAvailable": true
            },
            {
                "MapObjectID": "54185182-3aab-4982-8502-34766c7c48ff",
                "MapObjectName": "11",
                "AreaID": "ca198144-bac1-40e8-b908-2027a19931bd",
                "AreaName": "2",
                "IsAvailable": true
            },
            {
                "MapObjectID": "3ad116f9-5aae-4815-b202-3810f1c22ff3",
                "MapObjectName": "7",
                "AreaID": "ca198144-bac1-40e8-b908-2027a19931bd",
                "AreaName": "2",
                "IsAvailable": true
            },
            {
                "MapObjectID": "1ddf58b9-2187-493c-82fa-4314369ae81a",
                "MapObjectName": "13",
                "AreaID": "ca198144-bac1-40e8-b908-2027a19931bd",
                "AreaName": "2",
                "IsAvailable": true
            },
            {
                "MapObjectID": "aaa9b530-50b9-421a-9a0f-4b476a5a99a4",
                "MapObjectName": "6",
                "AreaID": "ca198144-bac1-40e8-b908-2027a19931bd",
                "AreaName": "2",
                "IsAvailable": true
            },
            {
                "MapObjectID": "bd5ee6c7-828a-40c4-b7ed-6eb43993121b",
                "MapObjectName": "8",
                "AreaID": "ca198144-bac1-40e8-b908-2027a19931bd",
                "AreaName": "2",
                "IsAvailable": true
            },
            {
                "MapObjectID": "d471ebfb-7cec-46db-8167-97e33a8272e4",
                "MapObjectName": "9",
                "AreaID": "ca198144-bac1-40e8-b908-2027a19931bd",
                "AreaName": "2",
                "IsAvailable": true
            },
            {
                "MapObjectID": "5ce93fbf-e3d9-49a0-bb48-b257c133377e",
                "MapObjectName": "12",
                "AreaID": "ca198144-bac1-40e8-b908-2027a19931bd",
                "AreaName": "2",
                "IsAvailable": true
            },
            {
                "MapObjectID": "79bcb1be-c60f-46c0-9f2d-b950fdbbb12c",
                "MapObjectName": "14",
                "AreaID": "ca198144-bac1-40e8-b908-2027a19931bd",
                "AreaName": "2",
                "IsAvailable": true
            },
            {
                "MapObjectID": "eb4a0577-bf27-4ad3-aad3-caac9282aad2",
                "MapObjectName": "15",
                "AreaID": "ca198144-bac1-40e8-b908-2027a19931bd",
                "AreaName": "2",
                "IsAvailable": true
            },
            {
                "MapObjectID": "7baa9b03-6a2c-4d17-a1ae-07a5361655cc",
                "MapObjectName": "3.13",
                "AreaID": "3528688d-5efe-4c0f-8df6-2131dd7f06fd",
                "AreaName": "3.1",
                "IsAvailable": true
            },
            {
                "MapObjectID": "e979e774-5bd5-4fb4-96ef-8355b8a25996",
                "MapObjectName": "3.12",
                "AreaID": "3528688d-5efe-4c0f-8df6-2131dd7f06fd",
                "AreaName": "3.1",
                "IsAvailable": true
            },
            {
                "MapObjectID": "d8499e91-ec14-4cbf-8103-842559e26e1b",
                "MapObjectName": "3.15",
                "AreaID": "3528688d-5efe-4c0f-8df6-2131dd7f06fd",
                "AreaName": "3.1",
                "IsAvailable": true
            },
            {
                "MapObjectID": "84f2556c-8506-49e9-bf2c-8a8adc570f64",
                "MapObjectName": "3.14",
                "AreaID": "3528688d-5efe-4c0f-8df6-2131dd7f06fd",
                "AreaName": "3.1",
                "IsAvailable": true
            },
            {
                "MapObjectID": "c16083d5-d51e-4416-9891-a8f44b98541f",
                "MapObjectName": "3.11",
                "AreaID": "3528688d-5efe-4c0f-8df6-2131dd7f06fd",
                "AreaName": "3.1",
                "IsAvailable": true
            },
            {
                "MapObjectID": "dc63767c-3a95-4d70-9b39-585df3e706d1",
                "MapObjectName": "2",
                "AreaID": "0fb13b11-fa1e-4ac1-9f83-d1fe4bd4e32c",
                "AreaName": "1",
                "IsAvailable": true
            },
            {
                "MapObjectID": "df56e7e8-7d4e-4937-976f-59ad03e0bb97",
                "MapObjectName": "4",
                "AreaID": "0fb13b11-fa1e-4ac1-9f83-d1fe4bd4e32c",
                "AreaName": "1",
                "IsAvailable": true
            },
            {
                "MapObjectID": "09ed2bdf-c8ce-4c46-a7c8-5edef0ea4301",
                "MapObjectName": "5",
                "AreaID": "0fb13b11-fa1e-4ac1-9f83-d1fe4bd4e32c",
                "AreaName": "1",
                "IsAvailable": true
            },
            {
                "MapObjectID": "f8de056e-28af-43f3-b7a1-728d7e4980ad",
                "MapObjectName": "3",
                "AreaID": "0fb13b11-fa1e-4ac1-9f83-d1fe4bd4e32c",
                "AreaName": "1",
                "IsAvailable": true
            },
            {
                "MapObjectID": "661e2da4-26d8-4d28-888a-c508aef5e860",
                "MapObjectName": "1",
                "AreaID": "0fb13b11-fa1e-4ac1-9f83-d1fe4bd4e32c",
                "AreaName": "1",
                "IsAvailable": true
            }
        ],
        "AllowMergeTable": 1
    },
    "Total": 0,
    "Success": true
}

```


Definitions
-----------

### BranchTables Definition



* Property: ListTable
  * Type: List<MapObject>
  * Format: 
  * Mô tả: Danh sách các bàn trong chi nhánh
* Property: AllowMergeTable
  * Type: Int
  * Format: 
  * Mô tả: Cho biết thiết lập có cho phép nhiều order trên 1 bàn của chi nhánh


### MapObject Definition


|Property     |Type  |Format|Mô tả                                                        |
|-------------|------|------|-------------------------------------------------------------|
|MapObjectID  |string|guid  |ID của bàn                                                   |
|MapObjectName|string|      |Tên bàn                                                      |
|AreaID       |String|guid  |ID của khu vực                                               |
|AreaName     |String|      |Tên khu vực                                                  |
|IsAvailable  |Bool  |      |Cờ cho biết bàn sẵn sàng phục vụ hay không (không có ai ngồi)|


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


Note
----

*   Lưu ý: đối với nhà hàng mô hình Offline thì có thể xảy ra sai sót với trường trạng thái của bàn do cơ chế đồng bộ tại mô hình offline không theo thời gian thực mà theo thời gian hoạt động của nhà hàng.