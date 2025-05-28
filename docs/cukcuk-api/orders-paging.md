# Orders API - Danh sách đơn hàng | CUKCUK OpenPlatform API

API thực hiện lấy danh sách đơn hàng theo chi nhánh. Phân trang tối đa 100 bản ghi trên một trang

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

### api/v1/orders/paging

#### POST

Lấy danh sách đơn hàng phân trang

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
  - ServiceResult.ErrorType: 6
  - Mô tả: Tham số ngày giờ không hợp lệ (01/01/1753 - 31/12/9999)
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

| Name  | In   | Description                               | Required? | Type                     |
| ----- | ---- | ----------------------------------------- | --------- | ------------------------ |
| param | body | Đối tượng lấy dữ liệu phân trang đơn hàng | true      | OrdersPagingRequestParam |

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

Trả về đối tượng [ServiceResult](#serviceresult-definition) với ServiceResult.Data là Array<[Order](#order-definition)\> tổng số đơn hàng có trong hệ thống qua **ServiceResult.Total**

##### Example

Ví dụ gửi tham số gọi tới api

JSON [OrdersPagingRequestParam](#orderspagingrequestparam-definition)

```
{
  "Page": 1,
  "Limit": 10,
  "BranchId": "f7a8b9c2-3d4e-5f67-8901-a23b4c5d6e7f",
  "LastSyncDate": "2020-05-04T09:28:55.854Z"
}

```

Hệ thống sẽ trả về [ServiceResult](#serviceresult-definition) với Data là Array<[Order](#order-definition)\> JSON response

```
{
  "Code": 200,
  "Data": [
    {
      "Id": "cbfeea95-6996-4b86-9f7b-915b3217726f",
      "Type": 3,
      "No": "1.2",
      "BranchId": "f7a8b9c2-3d4e-5f67-8901-a23b4c5d6e7f",
      "Status": 4,
      "Date": "2020-07-29T11:06:16.837",
      "ShippingDate": "2020-07-29T11:36:05",
      "CustomerId": "c93d3f20-45b5-4428-9c4a-ae37d212555c",
      "CustomerName": "Nguyễn Đức Công",
      "CustomerTel": "0344322228",
      "ShippingAddress": "63 Trần Quốc Vượng, Dịch Vọng Hậu, Cầu Giấy, Hà Nội",
      "DeliveryAmount": 0.0,
      "DepositAmount": 0.0,
      "TotalAmount": 5000.0
    },
    {
      "Id": "9acc925e-0ba8-4524-a932-57b75cfa81b6",
      "Type": 1,
      "No": "1.1",
      "BranchId": "f7a8b9c2-3d4e-5f67-8901-a23b4c5d6e7f",
      "Status": 1,
      "Date": "2020-07-29T09:29:46.067",
      "DeliveryAmount": 0.0,
      "DepositAmount": 0.0,
      "TotalAmount": 5000.0
    },
    {
      "Id": "6f8ac33c-266f-4dc1-a647-8a0c5ebb8070",
      "Type": 1,
      "No": "1.2",
      "BranchId": "f7a8b9c2-3d4e-5f67-8901-a23b4c5d6e7f",
      "Status": 4,
      "Date": "2020-07-28T16:26:45.673",
      "DeliveryAmount": 0.0,
      "DepositAmount": 0.0,
      "TotalAmount": 105000.0
    },
    {
      "Id": "b2ec3b71-4b45-4beb-a3c3-1ae6340343b0",
      "Type": 1,
      "No": "1.1",
      "BranchId": "f7a8b9c2-3d4e-5f67-8901-a23b4c5d6e7f",
      "Status": 4,
      "Date": "2020-07-28T15:02:46.767",
      "CustomerId": "919204d3-64da-4de9-a994-0b5b715b5348",
      "CustomerName": "Chị Nga",
      "CustomerTel": "03456782157",
      "ShippingAddress": "",
      "DeliveryAmount": 0.0,
      "DepositAmount": 0.0,
      "TotalAmount": 45000.0
    }
  ],
  "Total": 0,
  "Success": true
}

```

## Definitions

### OrdersPagingRequestParam Definition

Tham số lấy dữ liệu chi nhánh nhà hàng

| Property     | Type     | Format | Mô tả                                                              |
| ------------ | -------- | ------ | ------------------------------------------------------------------ |
| Page         | int      |        | Số trang lấy dữ liệu                                               |
| Limit        | int      |        | Số bản ghi lấy trên 1 trang (max 100)                              |
| BranchID     | string   | guid   | Id chi nhánh cần lấy, truyền null để lấy dữ liệu toàn bộ chi nhánh |
| LastSyncDate | datetime | guid   | Mốc thời gian lấy dữ liệu                                          |

### Order Definition

| Property        | Type    | Format   | Mô tả                                                           |
| --------------- | ------- | -------- | --------------------------------------------------------------- |
| Id              | string  | guid     | Id đơn hàng                                                     |
| No              | string  |          | Số đơn hàng                                                     |
| Type            | int     |          | Loại đơn hàng (1 - phục vụ tại bàn, 2 - mang về, 3 - giao hàng) |
| BranchId        | string  | guid     | Id chi nhánh bán hàng                                           |
| Status          | int     |          | Trạng thái đơn hàng, xem tại đây                                |
| Date            | string  | datetime | Ngày, giờ lập đơn                                               |
| ShippingDate    | string  | datetime | Ngày, giờ giao hàng                                             |
| CustomerId      | string  | guid     | Id khách hàng                                                   |
| CustomerName    | string  |          | Tên khách hàng                                                  |
| CustomerTel     | string  |          | Số điện thoại khách hàng                                        |
| ShippingAddress | string  |          | Địa chỉ giao hàng                                               |
| DeliveryAmount  | decimal |          | Phí giao hàng                                                   |
| DepositAmount   | decimal |          | Tiền khách đặt trước                                            |
| TotalAmount     | decimal |          | Tổng đơn hàng                                                   |

### OrderStatus Definition

| Giá trị | Mô tả              |
| ------- | ------------------ |
| 0       | Không xác định     |
| 1       | Đang phục vụ       |
| 3       | Yêu cầu thanh toán |
| 4       | Đã thanh toán      |
| 5       | Đã hủy             |
| 6       | Đặt trước          |
| 7       | Chưa gửi bếp bar   |
| 8       | Chưa chế biến      |
| 9       | Đang chờ giao hàng |
| 10      | Đang giao hàng     |
| 11      | Đã giao hàng       |

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
