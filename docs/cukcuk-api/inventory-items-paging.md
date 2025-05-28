# InventoryItems API - Danh sách món ăn | CUKCUK OpenPlatform API

API thực hiện lấy danh sách món ăn. Phân trang tối đa 100 bản ghi trên một trang.

Các thông tin cấu hình cần thiết:

| Tên         | Mô tả                |
| ----------- | -------------------- |
| CompanyCode | Mã nhà hàng lấy      |
| AccessToken | Chuỗi token xác thực |

Để lấy các thông tin trên xem bài viết [account/login](index.html)

## About

| URL                | Phiên bản | Thay đổi |
| ------------------ | --------- | -------- |
| graphapi.cukcuk.vn | 1.0       |          |

## Schemes

| Scheme |
| ------ |
| https  |

## Endpoints

### api/v1/inventoryitems/paging

#### POST

Lấy danh sách món ăn phân trang

##### Expected Response Types

- HttpCode: 401
  - ServiceResult.ErrorType:
  - Mô tả: Chuỗi AccessToken hết hạn hoặc không hợp lệ cần phải gọi cấp phát lại
- HttpCode: 200
  - ServiceResult.ErrorType: 0
  - Mô tả: Không có lỗi
- HttpCode: 200
  - ServiceResult.ErrorType: 1
  - Mô tả: Tham số không hợp lệ null or empty
- HttpCode: 200
  - ServiceResult.ErrorType: 2
  - Mô tả: Mã nhà hàng không tồn tại
- HttpCode: 200
  - ServiceResult.ErrorType: 5
  - Mô tả: Tham số lấy phân trang vượt quá số lượng cấu hình cho phép (max 100)
- HttpCode: 200
  - ServiceResult.ErrorType: 7
  - Mô tả: Thiết lập kết nối CUKCUK đang ở trạng thái ngắt, không thể lấy dữ liệu
- HttpCode: 200
  - ServiceResult.ErrorType: 100
  - Mô tả: Lỗi nội bộ API Graph
- HttpCode: 200
  - ServiceResult.ErrorType: 102
  - Mô tả: Request bị từ chối, do có request cùng loại đang xử lý. Vui lòng chờ xử lý xong hoặc chờ request đang xử lý timeout thì gọi lại.

##### Parameters

| Name  | In   | Description                               | Required? | Type                            |
| ----- | ---- | ----------------------------------------- | --------- | ------------------------------- |
| param | body | Đối tượng lấy thông tin phân trang món ăn | true      | InventoryItemPagingRequestParam |

| Name          | In     | Description                                               | Required? | Type   |
| ------------- | ------ | --------------------------------------------------------- | --------- | ------ |
| Authorization | header | Header key cấu hình AccessToken (dạng Bearer AccessToken) | true      | string |
| CompanyCode   | header | Header key cấu hình mã nhà hàng CompanyCode               | true      | string |

Ví dụ:

```
CompanyCode: demoquanviet
Authorization: Bearer utFYFHGRrnz-JWVCViIjy4k3CtKWOJDBY6wvL5X_5k9jm14tLIP6qPgCXdupERxyv78hWzSAF_rtK1RRAbtwc-M96sUIzFQ4bSfeY_2xYCzmZBTPNKbohxMHDbR2F4eeNk_dM_7B5Zod8-qGhT7LDwtE_23cuRWeK_qWkYHk2rMiqJM-vd9dYHANtq4OVI-Y8fYZ4B_Q_wPvsZl6svkSNLX2RQygFMOccGsC_G3dv1MbUf2KWjOHcr_SBPH66jQPs8V3CbZ_Eywo7vShkqdenhvNqdNOg9Gl56tybzW4YfcAvmYMUUOEuc7-ffyHfUnE

```

##### Content Types Produced

| Produces         |
| ---------------- |
| application/json |

##### Content Types Consumed

| Consumes         |
| ---------------- |
| application/json |

##### Response

Trả về đối tượng [ServiceResult](#serviceresult-definition) với ServiceResult.Data là Array<[InventoryItem](#inventoryitem-definition)\> tổng số món ăn có trong hệ thống qua **ServiceResult.Total**

##### Example

Ví dụ gửi tham số gọi tới api

JSON [InventoryItemPagingRequestParam](#inventoryitempagingrequestparam-definition)

```
{
  "Page": 1,
  "Limit": 10,
  "BranchId": "f7a8b9c2-3d4e-5f67-8901-a23b4c5d6e7f",
  "CategoryId": "",
  "KeySearch": "Trà",
  "includeInactive": true
}

```

Hệ thống sẽ trả về [ServiceResult](#serviceresult-definition) với Data là Array<[InventoryItem](#inventoryitem-definition)\> JSON response

```
{
  "Code": 200,
  "Data": [
    {
      "Id": "05b43f96-6cc4-4ff3-acf1-402952d70331",
      "Code": "KHONGDO",
      "ItemType": 5,
      "Name": "Trà xanh không độ",
      "CategoryID": "dcdd1e90-690d-4ca5-8139-b4406d673c71",
      "CategoryName": "Đồ uống đóng chai",
      "Price": 15000.0,
      "Inactive": false,
      "UnitID": "8ade72e5-5735-4dd2-be2f-de056b8e2a90",
      "UnitName": "Chai",
      "Description": "",
      "IsSeftPrice": false,
      "AllowAdjustPrice": false
    },
    {
      "Id": "f3ad8d97-cc7f-4e1b-8187-06d760ef7d27",
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
    }
  ],
  "Total": 2,
  "Success": true
}

```

## Definitions

### InventoryItemPagingRequestParam Definition

Tham số lấy dữ liệu chi nhánh nhà hàng

| Property        | Type   | Format | Mô tả                                   |
| --------------- | ------ | ------ | --------------------------------------- |
| Page            | int    |        | Số trang lấy dữ liệu                    |
| Limit           | int    |        | Số bản ghi lấy trên 1 trang (max 100)   |
| CategoryID      | string | Guid   | Id nhóm món ăn lấy tại categories/list  |
| KeySearch       | string |        | Từ khóa tìm kiếm                        |
| IncludeInactive | bool   |        | Có lấy cả món ăn ngừng kinh doanh không |

### InventoryItem Definition

| Property         | Type    | Format | Mô tả                                            |
| ---------------- | ------- | ------ | ------------------------------------------------ |
| Id               | string  | guid   | Id món ăn                                        |
| Code             | string  |        | Mã món ăn                                        |
| Name             | string  |        | Tên món ăn                                       |
| ItemType         | int     |        | Loại món, xem tại đây                            |
| SellingPrice     | decimal |        | Giá                                              |
| Price            | decimal |        | Giá bán                                          |
| Description      | string  |        | Ghi chú                                          |
| Inactive         | bool    |        | true - ngừng kinh doanh, false - đang kinh doanh |
| UnitId           | string  | guid   | Id đơn vị tính                                   |
| UnitName         | string  |        | Tên đơn vị tính                                  |
| IsSeftPrice      | bool    |        | Thay đổi theo thời giá                           |
| AllowAdjustPrice | bool    |        | Cho phép điều chỉnh giá bán                      |

### ItemType Definition

| Giá trị | Loại                    |
| ------- | ----------------------- |
| 1       | Món ăn                  |
| 2       | Món ăn theo nguyên liệu |
| 3       | Món ăn theo nhóm        |
| 4       | Combo                   |
| 5       | Đồ uống đóng chai       |
| 6       | Đồ uống pha chế         |
| 7       | Mặt hàng khác           |
| 8       | Nguyên vật liệu         |
| 10      | Đồ uống theo nhóm       |
| 12      | Combo tùy chọn          |

### ServiceResult Definition

| Property     | Type   | Format | Mô tả                                      |
| ------------ | ------ | ------ | ------------------------------------------ |
| Code         | int    |        | Mã lỗi HttpCode (200, 500...)              |
| ErrorType    | int    |        | Loại lỗi                                   |
| ErrorMessage | string |        | Thông tin lỗi                              |
| Success      | bool   |        | True - không có lỗi logic xảy ra           |
| Environment  | string |        | Môi trường triển khai của api              |
| Data         | string | object | Dữ liệu trả về client                      |
| Total        | int    |        | Tổng số bản ghi khi lấy dữ liệu phân trang |

### ErrorType Definition

- Dải mã lỗi chung

- HttpCode: 401
  - ServiceResult.ErrorType:
  - Mô tả: Chuỗi AccessToken hết hạn hoặc không hợp lệ cần phải gọi cấp phát lại
- HttpCode: 200
  - ServiceResult.ErrorType: 0
  - Mô tả: Không có lỗi
- HttpCode: 200
  - ServiceResult.ErrorType: 1
  - Mô tả: Tham số không hợp lệ null or empty
- HttpCode: 200
  - ServiceResult.ErrorType: 2
  - Mô tả: Mã nhà hàng không tồn tại
- HttpCode: 200
  - ServiceResult.ErrorType: 3
  - Mô tả: Mã Appid không tồn tại trên hệ thống
- HttpCode: 200
  - ServiceResult.ErrorType: 4
  - Mô tả: Chuỗi thông tin chữ ký đăng nhập không hợp lệ, timeout
- HttpCode: 200
  - ServiceResult.ErrorType: 5
  - Mô tả: Tham số lấy phân trang vượt quá số lượng cấu hình cho phép (max 100)
- HttpCode: 200
  - ServiceResult.ErrorType: 6
  - Mô tả: Tham số ngày giờ không hợp lệ (01/01/1753 - 31/12/9999)
- HttpCode: 200

  - ServiceResult.ErrorType: 7
  - Mô tả: Thiết lập kết nối CUKCUK đang ở trạng thái ngắt, không thể lấy dữ liệu

- Dải mã lỗi nghiêm trọng

- HttpCode: 200
  - ServiceResult.ErrorType: 100
  - Mô tả: Lỗi nội bộ API Graph
- HttpCode: 200
  - ServiceResult.ErrorType: 102
  - Mô tả: Request bị từ chối, do có request cùng loại đang xử lý. Vui lòng chờ xử lý xong hoặc chờ request đang xử lý timeout thì gọi lại. Ví dụ: Khi đang gọi api login mà api chưa trả về dữ liệu lại tiếp tục gọi request login này sẽ trả về lỗi này.
