# Orders API - Tạo đơn đặt hàng | CUKCUK OpenPlatform API

API thực hiện tạo đơn hàng

Các thông tin cấu hình cần thiết:

| Tên         | Mô tả                |
| ----------- | -------------------- |
| CompanyCode | Mã cửa hàng lấy      |
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

### api/v1/orders/create

#### POST

Tạo đơn đặt hàng

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
  - Mô tả: Mã cửa hàng không tồn tại
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
- HttpCode: 200
  - ServiceResult.ErrorType: 251
  - Mô tả: Id đơn hàng đã tồn tại không thể thêm mới
- HttpCode: 200
  - ServiceResult.ErrorType: 253
  - Mô tả: Mã đơn hàng đã tồn tại không thể thêm mới
- HttpCode: 200
  - ServiceResult.ErrorType: 254
  - Mô tả: Đơn hàng phải có ít nhất một hàng hóa được chọn
- HttpCode: 200
  - ServiceResult.ErrorType: 255
  - Mô tả: Đơn hàng không có thông tin khách hàng
- HttpCode: 200
  - ServiceResult.ErrorType: 256
  - Mô tả: Đơn hàng giao hàng không có thông tin địa chỉ giao hàng
- HttpCode: 200
  - ServiceResult.ErrorType: 257
  - Mô tả: Thông tin ngày giao hàng không hợp lệ

##### Parameters

| Name  | In   | Description            | Required? | Type                    |
| ----- | ---- | ---------------------- | --------- | ----------------------- |
| param | body | Đối tượng tạo đơn hàng | true      | CreateOrderRequestParam |

| Name          | In     | Description                                               | Required? | Type   |
| ------------- | ------ | --------------------------------------------------------- | --------- | ------ |
| Authorization | header | Header key cấu hình AccessToken (dạng Bearer AccessToken) | true      | string |
| CompanyCode   | header | Header key cấu hình mã cửa hàng CompanyCode               | true      | string |

Ví dụ:

```
CompanyCode: namng912
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

Trả về đối tượng [ServiceResult](#serviceresult-definition) với ServiceResult.Data là object [CreateOrderRequestParam](#createorderrequestparam-definition) trả về thêm thông tin số đơn đặt hàng **OrderNo** được sinh bởi hệ thống.

##### Example

Ví dụ gửi tham số gọi tới api

JSON [CreateOrderRequestParam](#createorderrequestparam-definition)

```
{
    "Id": "832aea39-6b36-4473-8458-1396c4f36c75",
    "Type": 3,
    "No": "2.16",
    "BranchId": "f7a8b9c2-3d4e-5f67-8901-a23b4c5d6e7f",
    "Date": "2022-03-29T09:29:35.117+07:00",
    "ShippingDate": "2022-03-29T14:06:01.647+07:00",
    "CustomerId": "8dc32aa6-4d59-4a8f-96be-427ae6fee1b4",
    "CustomerName": "sample string 3",
    "CustomerTel": "sample string 4",
    "EmployeeId": "66935b25-faf4-456b-8bde-080438b630bc",
    "ShippingAddress": "ha noi",
    "RequestDescription": "yeu ca gui bep/bar",
    "OrderDetails": [
             {
        "Id": "832AEA39-6B36-4473-8458-1396C4F36C74",
        "ItemId": "80F0FBFD-EA80-4857-BED6-75EBA359179A",
        "ItemName": "Cá lóc chiên xù",
        "UnitId": "CC09CE6E-33FF-455D-A421-7E2C1060A8F5123",
        "UnitName": "Con",
        "Quantity": 9.0000,
        "Status": 1,
        "Price": 10000.0000,
        "SortOrder": 0
      }
    ],
    "BranchId": "f7a8b9c2-3d4e-5f67-8901-a23b4c5d6e7f",
    "ListTableID": [
        "F8DE056E-28AF-43F3-B7A1-728D7E4980AD",
        "DF56E7E8-7D4E-4937-976F-59AD03E0BB97"
    ],
  "Version": "sample string 10"
}

```

Hệ thống sẽ trả về [ServiceResult](#serviceresult-definition) với Data là object [GraphOrderResult](#graphorderresult-definition) JSON response

```
{
  "Code": 200,
  "Data": {
    "Id": "832aea39-6b36-4473-8458-1396c4f36c75",
    "Type": 3,
    "No": "2.16",
    "BranchId": "f7a8b9c2-3d4e-5f67-8901-a23b4c5d6e7f",
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
    "RequestDescription": "yeu ca gui bep/bar",
    "TotalAmount": 910000.0000,
    "TableName": "3, 4",
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

## Definitions

### CreateOrderRequestParam Definition

- Property: Id
  - Type: string
  - Format: guid
  - Bắt buộc (\*):
  - Mô tả: Id đơn hàng, hệ thống tự sinh nếu bỏ trống
- Property: BranchId
  - Type: string
  - Format: guid
  - Bắt buộc (_): _
  - Mô tả: Id chi nhánh bán hàng
- Property: Type
  - Type: int
  - Format:
  - Bắt buộc (_): _
  - Mô tả: Loại đơn hàng, xem tại đây
- Property: No
  - Type: string
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Số đơn hàng, hệ thống tự sinh nếu bỏ trống
- Property: CustomerId
  - Type: string
  - Format: guid
  - Bắt buộc (\*):
  - Mô tả: Id khách hàng trong hệ thống, xem tại đây
- Property: CustomerName
  - Type: string
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Tên khách hàng, bắt buộc nếu không phải khách hàng trong hệ thống
- Property: CustomerTel
  - Type: string
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Số điện thoại khách hàng, bắt buộc nếu không phải khách hàng trong hệ thống
- Property: EmployeeId
  - Type: string
  - Format: guid
  - Bắt buộc (\*):
  - Mô tả: Id nhân viên trong hệ thống, xem tại đây
- Property: ShippingDate
  - Type: datetime
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Giờ hẹn trả khách, bắt buộc với đơn hàng giao hàng tận nơi
- Property: ShippingAddress
  - Type: datetime
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Địa chỉ giao hàng, bắt buộc với đơn hàng giao hàng tận nơi
- Property: DeliveryAmount
  - Type: decimal
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Phí giao hàng
- Property: DepositAmount
  - Type: decimal
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Tiền khách đặt cọc trước
- Property: RequestDescription
  - Type: string
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Yêu cầu gửi bếp/bar
- Property: OrderDetails
  - Type: Array<OrderDetail>
  - Format:
  - Bắt buộc (_): _
  - Mô tả: Danh sách các món trong đơn hàng
- Property: ListTableID
  - Type: string
  - Format:
  - Bắt buộc (\*):
  - Mô tả: List các ID của các bàn order trong khu vực

### GraphOrderResult Definition

- Property: Id
  - Type: string
  - Format: guid
  - Bắt buộc (\*):
  - Mô tả: Id đơn hàng, hệ thống tự sinh nếu bỏ trống
- Property: BranchId
  - Type: string
  - Format: guid
  - Bắt buộc (_): _
  - Mô tả: Id chi nhánh bán hàng
- Property: Type
  - Type: int
  - Format:
  - Bắt buộc (_): _
  - Mô tả: Loại đơn hàng, xem tại đây
- Property: No
  - Type: string
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Số đơn hàng, hệ thống tự sinh nếu bỏ trống
- Property: Status
  - Type: int
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Trạng thái đơn hàng, xem tại đây
- Property: CustomerId
  - Type: string
  - Format: guid
  - Bắt buộc (\*):
  - Mô tả: Id khách hàng trong hệ thống, xem tại đây
- Property: CustomerName
  - Type: string
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Tên khách hàng, bắt buộc nếu không phải khách hàng trong hệ thống
- Property: CustomerTel
  - Type: string
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Số điện thoại khách hàng, bắt buộc nếu không phải khách hàng trong hệ thống
- Property: EmployeeId
  - Type: string
  - Format: guid
  - Bắt buộc (\*):
  - Mô tả: Id nhân viên trong hệ thống, xem tại đây
- Property: ShippingDate
  - Type: datetime
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Giờ hẹn trả khách, bắt buộc với đơn hàng giao hàng tận nơi
- Property: ShippingAddress
  - Type: datetime
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Địa chỉ giao hàng, bắt buộc với đơn hàng giao hàng tận nơi
- Property: DeliveryAmount
  - Type: decimal
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Phí giao hàng
- Property: DepositAmount
  - Type: decimal
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Tiền khách đặt cọc trước
- Property: RequestDescription
  - Type: string
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Yêu cầu gửi bếp/bar
- Property: OrderDetails
  - Type: Array<OrderDetail>
  - Format:
  - Bắt buộc (_): _
  - Mô tả: Danh sách các món trong đơn hàng
- Property: TableName
  - Type: string
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Tên bàn hoặc danh sách các bàn tạo order

### OrderType Definition

| Giá trị | Mô tả                |
| ------- | -------------------- |
| 1       | Phục vụ tại nhà hàng |
| 2       | Gói mang về          |
| 3       | Giao hàng tận nơi    |

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

| Property    | Type    | Format | Bắt buộc (\*) | Mô tả                                         |
| ----------- | ------- | ------ | ------------- | --------------------------------------------- |
| ItemId      | string  | Guid   |               | Id món, xem tại đây đây                       |
| AdditionId  | string  |        |               | Id sở thích phục vụ gọi thêm, xem tại đây đây |
| Quantity    | decimal |        |               | Số lượng                                      |
| Description | string  |        |               | Ghi chú cho món                               |

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
  - Mô tả: Mã cửa hàng không tồn tại
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
- HttpCode: 200
  - ServiceResult.ErrorType: 251
  - Mô tả: Id đơn hàng đã tồn tại không thể thêm mới
- HttpCode: 200
  - ServiceResult.ErrorType: 252
  - Mô tả: Đơn hàng không tồn tại
- HttpCode: 200
  - ServiceResult.ErrorType: 253
  - Mô tả: Mã đơn hàng đã tồn tại
- HttpCode: 200
  - ServiceResult.ErrorType: 254
  - Mô tả: Đơn hàng phải có ít nhất một hàng hóa được chọn
- HttpCode: 200
  - ServiceResult.ErrorType: 255
  - Mô tả: Đơn hàng không có thông tin khách hàng
- HttpCode: 200
  - ServiceResult.ErrorType: 256
  - Mô tả: Đơn hàng giao hàng không có thông tin địa chỉ giao hàng
- HttpCode: 200
  - ServiceResult.ErrorType: 257
  - Mô tả: Thông tin ngày giao hàng không hợp lệ
- HttpCode: 200

  - ServiceResult.ErrorType: 258
  - Mô tả: Trạng thái đơn hàng không hợp lệ

- Dải mã lỗi nghiêm trọng

- HttpCode: 200
  - ServiceResult.ErrorType: 100
  - Mô tả: Lỗi nội bộ API Graph
- HttpCode: 200
  - ServiceResult.ErrorType: 102
  - Mô tả: Request bị từ chối, do có request cùng loại đang xử lý. Vui lòng chờ xử lý xong hoặc chờ request đang xử lý timeout thì gọi lại. Ví dụ: Khi đang gọi api login mà api chưa trả về dữ liệu lại tiếp tục gọi request login này sẽ trả về lỗi này.

## Note

- Nếu có truyền thông tin `OrderId` thì phải đảm bảo `OrderId` này chưa tồn tại trên hệ thống (mã lỗi [ErrorType](#errortype-definition) = 251).
- Phải có thông tin khách hàng (mã lỗi [ErrorType](#errortype-definition) = 255):
  - Khách hàng có trong hệ thống thì truyền `CustomerId`, lấy trong API [customers-paging](./customers_paging).
  - Khách hàng không có trong hệ thống thì bắt buộc phải có tham số `CustomerName` và `CustomerTel`.
- Phải có ít nhất một món ăn được chọn (mã lỗi [ErrorType](#errortype-definition) = 254).
- Các sở thích phục vụ chọn thêm được khai báo thành một phần tử trong danh sách `OrderDetails`.
- Đối với đơn giao hàng:
  - Bắt buộc phải có trường địa chỉ giao hàng `ShippingAddress` (mã lỗi [ErrorType](#errortype-definition) = 256)
  - Bắt buộc phải có trường thời gian dự kiến giao hàng `ShippingDate` và không được nhỏ hơn thời gian hiện tại (mã lỗi [ErrorType](#errortype-definition) = 257)
