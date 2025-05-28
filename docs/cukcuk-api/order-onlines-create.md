# OrderOnlines API - Tạo đơn đặt hàng online | CUKCUK OpenPlatform API

API thực hiện tạo đơn hàng online từ website hoặc app riêng của nhà hàng và đồng bộ về bộ cài bán hàng PC CUKCUK. Giúp thu ngân có thể nhận đơn đặt hàng và xử lý

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

### api/v1/order-onlines/create

#### POST

Tạo đơn đặt hàng online đẩy xuống PC CUKCUK

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
  - ServiceResult.ErrorType: 351
  - Mô tả: Địa chỉ giao hàng không hợp lệ
- HttpCode: 200
  - ServiceResult.ErrorType: 352
  - Mô tả: Nguồn phát sinh đơn hàng không hợp lệ
- HttpCode: 200
  - ServiceResult.ErrorType: 353
  - Mô tả: Thời gian giao, nhận hàng không hợp lệ
- HttpCode: 200
  - ServiceResult.ErrorType: 354
  - Mô tả: Đơn hàng không có món ăn nào
- HttpCode: 200
  - ServiceResult.ErrorType: 355
  - Mô tả: Thiếu thông tin tên khách hàng
- HttpCode: 200
  - ServiceResult.ErrorType: 356
  - Mô tả: Thiếu thông tin số điện thoại khách hàng
- HttpCode: 200
  - ServiceResult.ErrorType: 357
  - Mô tả: Số hóa đơn đã tồn tại
- HttpCode: 200
  - ServiceResult.ErrorType: 400
  - Mô tả: Không cho phép nhận đơn từ bên thứ ba (vào thiết lập trên website CukCuk để mở tính năng)

##### Parameters

| Name  | In   | Description            | Required? | Type                          |
| ----- | ---- | ---------------------- | --------- | ----------------------------- |
| param | body | Đối tượng tạo đơn hàng | true      | CreateOrderOnlineRequestParam |

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

Trả về đối tượng [ServiceResult](#serviceresult-definition) với ServiceResult.Data là thông tin số đơn đặt hàng **OrderCode** được sinh bởi hệ thống.

##### Example

Ví dụ gửi tham số gọi tới api

JSON [CreateOrderOnlineRequestParam](#createorderonlinerequestparam-definition)

```
{
  "OrderId": "0FFDDFAD-3D07-4CB9-8021-96F970D7DE0F",
  "OrderCode": "",
  "OrderType": 0,
  "BranchId": "f7a8b9c2-3d4e-5f67-8901-a23b4c5d6e7f",
  "CustomerName": "A Đặng",
  "CustomerTel": "0389457123",
  "ShippingAddress": "Tòa N03-T1 khu Ngoại giao đoàn, Xuân Tảo, Bắc Từ Liêm, Hà Nội",
  "ShippingTimeType": 0,
  "OrderNote": "Giao trước 18h",
  "TotalAmount": 91000,
  "Amount": 87000,
  "DeliveryAmount": 19000,
  "DiscountAmount": 15000,
  "OrderSource": 1,
  "OrderItems": [
    {
      "Id": "8ab3cd42-e229-4154-841b-30038b25793d",
      "Code": "KEMRUMNHO",
      "ItemType": 6,
      "Name": "Kem rum nho",
      "Price": 29000,
      "UnitID": "47817d1f-c393-4a4c-af57-0d7fe3f29c5f",
      "UnitName": "Cốc",
      "Note": "Không lấy đá",
      "Quantity": 2,
      "Additions": [
        {
          "Id": "d31e46bb-0bd9-4c93-a548-b55a8f33a682",
          "Description": "Ít đường",
          "Price": 0.0,
          "Quantity": 1
        }
      ]
    },
    {
      "Id": "bd106032-7ba4-417b-abb1-15676dbe33da",
      "Code": "KEMVANI",
      "ItemType": 6,
      "Name": "Kem vani",
      "Price": 29000.0,
      "UnitID": "47817d1f-c393-4a4c-af57-0d7fe3f29c5f",
      "UnitName": "Cốc",
      "Quantity": 1
    }
  ]
}

```

Hệ thống sẽ trả về [ServiceResult](#serviceresult-definition) JSON response

```
{
  "Code": 200,
  "Total": 0,
  "Data": "DH5678910",
  "Success": true
}

```

## Definitions

### CreateOrderOnlineRequestParam Definition

- Property: BranchId
  - Type: string
  - Format: guid
  - Bắt buộc (_): _
  - Mô tả: Id chi nhánh bán hàng
- Property: OrderId
  - Type: string
  - Format: guid
  - Bắt buộc (\*):
  - Mô tả: Id đơn đặt hàng, hệ thông tự sinh nếu để trống
- Property: OrderCode
  - Type: string
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Số đơn đặt hàng, hệ thống tự sinh nếu để trống
- Property: OrderType
  - Type: int
  - Format:
  - Bắt buộc (_): _
  - Mô tả: Hình thức đặt hàng (0: giao tận nơi, 1: tự đến lấy)
- Property: CustomerId
  - Type: string
  - Format: guid
  - Bắt buộc (\*):
  - Mô tả: Id khách hàng trên CUKCUK, lấy id từ api Customer
- Property: CustomerName
  - Type: string
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Tên khách hàng, bắt buộc nếu không nhập CustomerId
- Property: CustomerTel
  - Type: string
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Số điện thoại, bắt buộc nếu không nhập CustomerId
- Property: CustomerEmail
  - Type: string
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Địa chỉ email khách hàng
- Property: ShippingAddress
  - Type: string
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Địa chỉ giao hàng, bắt buộc nếu hình thức đặt hàng là giao tận nơi
- Property: ShippingDueDate
  - Type: datetime
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Thời gian giao, nhận hàng dự kiến, hệ thống mặc định cộng thêm 30 phút từ thời điểm gọi api nếu để trống
- Property: ShippingTimeType
  - Type: int
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Loại thời điểm giao nhận hàng (0: giao ngay, 1: giao vào lúc)
- Property: OrderNote
  - Type: string
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Ghi chú cho đơn hàng
- Property: TotalAmount
  - Type: decimal
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Tổng tiền đơn hàng, xem cách tính tại đây
- Property: Amount
  - Type: decimal
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Tổng tiền cho món ăn , nhà hàng tự tính
- Property: TaxAmount
  - Type: decimal
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Tiền thuế, xem cách tính tại đây
- Property: DiscountAmount
  - Type: decimal
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Tiền khuyến mại, xem tại đây
- Property: DeliveryAmount
  - Type: decimal
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Tiền phí giao hàng (nếu có)
- Property: DepositAmount
  - Type: decimal
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Tiền khách đặt cọc
- Property: PaymentStatus
  - Type: decimal
  - Format:
  - Bắt buộc (_): _
  - Mô tả: Trạng thái thanh toán (1: chưa thanh toán, 2: đã thanh toán)
- Property: OrderSource
  - Type: decimal
  - Format:
  - Bắt buộc (_): _
  - Mô tả: Nguồn phát sinh đơn hàng (1: Website nhà hàng, 2: App riêng nhà hàng)
- Property: OrderItems
  - Type: Array<OrderItem>
  - Format:
  - Bắt buộc (_): _
  - Mô tả: Danh sách món trong order, lấy thông tin từ tại api InventoryItemPaging và InventoryItemDetail

### OrderItem Definition

- Property: Id
  - Type: string
  - Format: guid
  - Bắt buộc (_): _
  - Mô tả: Id combo chứa hàng hóa
- Property: Code
  - Type: string
  - Format:
  - Bắt buộc (_): _
  - Mô tả: Id hàng hóa
- Property: ItemType
  - Type: int
  - Format:
  - Bắt buộc (_): _
  - Mô tả: Loại món, xem tại đây
- Property: Name
  - Type: string
  - Format:
  - Bắt buộc (_): _
  - Mô tả: Mã hàng hóa
- Property: Price
  - Type: decimal
  - Format:
  - Bắt buộc (_): _
  - Mô tả: Đơn giá
- Property: UnitID
  - Type: string
  - Format: guid
  - Bắt buộc (_): _
  - Mô tả: Id đơn vị tính
- Property: UnitName
  - Type: string
  - Format:
  - Bắt buộc (_): _
  - Mô tả: Tên đơn vị tính
- Property: Note
  - Type: string
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Ghi chú món
- Property: Quantity
  - Type: decimal
  - Format:
  - Bắt buộc (_): _
  - Mô tả: Số lượng món
- Property: Children
  - Type: array
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Danh sách món con trong món theo nguyên vật liệu Array<OrderItem>
- Property: Additions
  - Type: array
  - Format:
  - Bắt buộc (\*):
  - Mô tả: Danh sách sở thích phục vụ được chọn Array<InventoryItemAddition>

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

### InventoryItemAddtion Definition

| Property    | Type    | Format | Bắt buộc (\*) | Mô tả                |
| ----------- | ------- | ------ | ------------- | -------------------- |
| Id          | string  | guid   | \*            | Id sở thích phục vụ  |
| Description | string  |        | \*            | Tên sở thích phục vụ |
| Price       | decimal |        | \*            | Giá bán cộng thêm    |
| Quantity    | int     |        | \*            | Số lượng chọn        |

### ServiceResult Definition

| Property     | Type   | Format | Mô tả                                      |
| ------------ | ------ | ------ | ------------------------------------------ |
| Code         | int    |        | Mã lỗi HttpCode (200, 500...)              |
| ErrorType    | int    |        | Loại lỗi                                   |
| ErrorMessage | string |        | Thông tin lỗi                              |
| Success      | bool   |        | True - không có lỗi logic xảy ra           |
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
- HttpCode: 200
  - ServiceResult.ErrorType: 351
  - Mô tả: Địa chỉ giao hàng không hợp lệ
- HttpCode: 200
  - ServiceResult.ErrorType: 352
  - Mô tả: Nguồn phát sinh đơn hàng không hợp lệ
- HttpCode: 200
  - ServiceResult.ErrorType: 353
  - Mô tả: Thời gian giao, nhận hàng không hợp lệ
- HttpCode: 200
  - ServiceResult.ErrorType: 354
  - Mô tả: Đơn hàng không có món ăn nào
- HttpCode: 200
  - ServiceResult.ErrorType: 355
  - Mô tả: Thiếu thông tin tên khách hàng
- HttpCode: 200
  - ServiceResult.ErrorType: 356
  - Mô tả: Thiếu thông tin số điện thoại khách hàng
- HttpCode: 200
  - ServiceResult.ErrorType: 357
  - Mô tả: Số hóa đơn đã tồn tại
- HttpCode: 200

  - ServiceResult.ErrorType: 400
  - Mô tả: Không cho phép nhận đơn từ bên thứ ba (vào thiết lập trên website CukCuk để mở tính năng)

- Dải mã lỗi nghiêm trọng

- HttpCode: 200
  - ServiceResult.ErrorType: 100
  - Mô tả: Lỗi nội bộ API Graph
- HttpCode: 200
  - ServiceResult.ErrorType: 102
  - Mô tả: Request bị từ chối, do có request cùng loại đang xử lý. Vui lòng chờ xử lý xong hoặc chờ request đang xử lý timeout thì gọi lại. Ví dụ: Khi đang gọi api login mà api chưa trả về dữ liệu lại tiếp tục gọi request login này sẽ trả về lỗi này.

## Note

### Tạo đơn hàng

Các thông tin về số tiền (tổng tiền hóa đơn, tiền hàng, tiền khuyến mại, phí giao hàng, ...) nhà hàng sẽ tự tính và đảm bảo tính chính xác. Xem cách tính tại [đây](#totalamount---tổng-tiền-đơn-hàng).  
Với món ăn theo nhóm, các món con sẽ được tách thành từng item và truyền vào mảng **OrderItems**.  
Với món ăn theo nguyên vật liệu, các món con sẽ được đẩy vào thuộc tính **Children** của món. Số lượng mỗi món con cho biết tỷ lệ chế biến thành các món của nguyên vật liệu.  
Với món ăn theo combo, các món trong combo sẽ được đẩy vào thuộc tính **Children** của món. Số lượng mỗi món trong combo bằng với số lượng combo.

### TotalAmount - Tổng tiền đơn hàng

Tổng tiền đơn hàng được tính theo công thức:

```
TotalAmount = Amount + DeliveryAmount + ServiceAmount + TaxAmount - DiscountAmount

```

Trong đó:

- **TotalAmount**: Tổng tiền đơn hàng.
- **Amount**: Tổng tiền món ăn.
- **DeliveryAmount**: Phí giao hàng, nhà hàng tự quy định.
- **ServiceAmount**: Phí dịch vụ, xem tại [đây](#serviceamount---phí-dịch-vụ).
- **TaxAmount**: Thuế giá trị gia tăng, xem tại [đây](#taxamount---thuế-giá-trị-gia-tăng).
- **DiscountAmount**: Tiền khuyến mại đơn hàng.

### ServiceAmount - Phí dịch vụ

Phí dịch vụ được tính dựa theo thiết lập mua bán hàng trên website quản lý nhà hàng. Lấy thông tin thiết lập tại api [Branch](branchs_setting.html).

Trường hợp có tính phí dịch vụ **HasCalcService = true** và **CalcServiceDelivery = true** với đơn hàng giao hàng hoặc **CalcServiceTakeAway = true** với đơn hàng tự đến lấy, phí dịch vụ được tính theo một trong hai trường hợp:  
_Trường hợp 1:_ Tính phí dịch vụ theo phần trăm hóa đơn **HasServiceRate = true**, phí dịch vụ tính theo công thức:

- Với nhà hàng thiết lập tính phí dịch vụ trên thành tiền chưa trừ khuyến mại **IsCalcServiceAmountNotPromotion = true**:

```
ServiceAmount = Amount x ServiceRate x 0.01

```

- Với nhà hàng thiết lập tính phí dịch vụ trên thành tiền có trừ khuyến mại **IsCalcServiceAmountNotPromotion = false**:

```
ServiceAmount = (Amount - DiscountAmount) x ServiceRate x 0.01

```

Trong đó:

- **ServiceAmount**: Phí dịch vụ.
- **Amount**: Tổng tiền món ăn.
- **ServiceRate**: Phần trăm tỉ lệ tính phí dịch vụ (từ 0 đến 100), lấy thông tin tại api [Branch](branchs_setting.html).
- **DiscountAmount**: Tiền khuyến mại đơn hàng.

_Trường hợp 2:_ Tính phí dịch vụ theo số tiền cố định **HasAmountService = true**:

```
ServiceAmount = AmountService

```

Trong đó:

- **ServiceAmount**: Phí dịch vụ.
- **AmountService**: Tiền phí dịch vụ, lấy thông tin tại api [Branch](branchs_setting.html).

### TaxAmount - Thuế giá trị gia tăng

Tiền thuế giá trị gia tăng được tính dựa theo thiết lập mua, bán hàng trên website quản lý nhà hàng. Lấy thông tin thiết lập tại api [Branch](branchs_setting.html).

Trường hợp nhà hàng có tính thuế giá trị gia tăng cho hóa đơn **HasVATRate = true** và **VATForDelivery = true** với đơn hàng giao hàng hoặc **VATForTakeAway** với đơn hàng tự đến lấy. Thuế giá trị gia tăng được tính theo công thức:

```
TaxAmount = (Amount + DeliveryAmount + ServiceAmount - DiscountAmount) x TaxRate x 0.01

```

Trong đó:

- **TaxAmount**: Thuế giá trị gia tăng.
- **Amount**: Tổng tiền món ăn.
- **DeliveryAmount**: Phí giao hàng được tính thuế, trong trường hợp không tính thuế cho cả phí giao hàng **VATForShip = false**, thì DeliveryAmount = 0.
- **ServiceAmount**: Phí dịch vụ được tính thuế, trong trường hợp không tính thuế cho phí dịch vụ **CalTaxForService = false** thì ServiceAmount = 0. Xem tại [đây](#serviceamount---phí-dịch-vụ).
- **DiscountAmount**: Tiền khuyến mại đơn hàng.

### DiscountAmount - Tiền khuyến mại

Hiện tại hệ thống chưa hỗ trợ áp dụng các khuyến mại qua API.
