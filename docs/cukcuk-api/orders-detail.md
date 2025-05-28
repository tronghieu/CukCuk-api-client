# Orders API - Chi tiết đơn hàng | CUKCUK OpenPlatform API

API lấy thông tin chi tiết đơn hàng từ id của đơn hàng

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

### api/v1/orders/`{orderId}`

#### GET

Lấy chi tiết đơn hàng theo id

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

| Name    | In  | Description | Required? | Type   |
| ------- | --- | ----------- | --------- | ------ |
| orderId | uri | Id đơn hàng | true      | string |

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

Ví dụ gọi **GET** tới

[https://graphapi.cukcuk.vn/api/v1/orders/cbfeea95-6996-4b86-9f7b-915b3217726f](https://graphapi.cukcuk.vn/api/v1/orders/cbfeea95-6996-4b86-9f7b-915b3217726f)

Hệ thống sẽ trả về [ServiceResult](#serviceresult-definition) với Data là [Order](#order-definition) chi tiết JSON response

```
{
  "Code": 200,
  "Data": {
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
    "EmployeeName": "",
    "ShippingAddress": "63 Trần Quốc Vượng, Dịch Vọng Hậu, Cầu Giấy, Hà Nội",
    "DeliveryAmount": 0.0,
    "DepositAmount": 0.0,
    "TotalAmount": 5000.0,
    "TableName": "3, 4",
    "OrderDetails": [
      {
        "Id": "18f4179b-2f7f-4fae-8e23-1e9793dd06a3",
        "ItemName": "Trà đá",
        "UnitId": "47817d1f-c393-4a4c-af57-0d7fe3f29c5f",
        "UnitName": "Cốc",
        "Quantity": 1.0,
        "Status": 1,
        "Price": 2000.0,
        "Amount": 2000.0
      },
      {
        "Id": "5d23d98c-8cb2-4cd3-a048-47c41a649219",
        "ItemName": "Cốc to",
        "AdditionId": "0e78cbd9-4e6c-455f-910e-ab0dc5759dfa",
        "ParentId":"18f4179b-2f7f-4fae-8e23-1e9793dd06a3",
        "UnitName": "",
        "Quantity": 1.0,
        "Status": 1,
        "Price": 3000.0,
        "Amount": 3000.0
      }
    ]
  },
  "Total": 0,
  "Success": true
}

```

## Definitions

### Order Definition

- Property: Id
  - Type: string
  - Format: guid
  - Mô tả: Id đơn hàng
- Property: No
  - Type: string
  - Format:
  - Mô tả: Số đơn hàng
- Property: Type
  - Type: int
  - Format:
  - Mô tả: Loại đơn hàng (1 - phục vụ tại bàn, 2 - mang về, 3 - giao hàng)
- Property: BranchId
  - Type: string
  - Format: guid
  - Mô tả: Id chi nhánh bán hàng
- Property: Status
  - Type: int
  - Format:
  - Mô tả: Trạng thái đơn hàng, xem tại đây
- Property: OrderDetails
  - Type: Array<OrderDetail>
  - Format:
  - Mô tả: Danh sách hàng hóa trong đơn hàng
- Property: Date
  - Type: string
  - Format: datetime
  - Mô tả: Ngày, giờ lập đơn
- Property: ShippingDate
  - Type: string
  - Format: datetime
  - Mô tả: Ngày, giờ giao hàng
- Property: CustomerId
  - Type: string
  - Format: guid
  - Mô tả: Id khách hàng
- Property: CustomerName
  - Type: string
  - Format:
  - Mô tả: Tên khách hàng
- Property: CustomerTel
  - Type: string
  - Format:
  - Mô tả: Số điện thoại khách hàng
- Property: ShippingAddress
  - Type: string
  - Format:
  - Mô tả: Địa chỉ giao hàng
- Property: DeliveryAmount
  - Type: decimal
  - Format:
  - Mô tả: Phí giao hàng
- Property: DepositAmount
  - Type: decimal
  - Format:
  - Mô tả: Tiền khách đặt trước
- Property: TotalAmount
  - Type: decimal
  - Format:
  - Mô tả: Tổng đơn hàng
- Property: TableName
  - Type: string
  - Format:
  - Mô tả: Tên bàn hoặc danh sách các bàn tạo order

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

### OrderDetail Definition

| Property   | Type    | Format | Mô tả               |
| ---------- | ------- | ------ | ------------------- |
| Id         | int     |        | Id detail           |
| ItemId     | string  | guid   | Id hàng hóa         |
| AdditionId | string  | guid   | Id sở thích phục vụ |
| ParentId   | string  | guid   | Id detail món cha   |
| ItemName   | string  |        | Tên hàng hóa        |
| UnitId     | string  | guid   | Id Đơn vị tính      |
| UnitName   | string  |        | Tên đơn vị tính     |
| Quantity   | decimal |        | Số lượng            |
| Price      | decimal |        | Đơn giá             |
| Amount     | decimal |        | Thành tiền          |

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
