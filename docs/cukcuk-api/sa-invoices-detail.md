# SAInvoice API - Thông tin hóa đơn | CUKCUK OpenPlatform API 
API thực hiện lấy thông tin chi tiết hóa đơn từ id của hóa đơn.

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

### api/v1/sainvoices/detail/`{refId}`

#### GET

Lấy chi tiết hóa đơn theo id

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


|Name |In |Description                 |Required?|Type  |
|-----|---|----------------------------|---------|------|
|refId|uri|id hóa đơn cần lấy thông tin|true     |string|



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

Trả về đối tượng [ServiceResult](#serviceresult-definition) với ServiceResult.Data là [SAInvoice](#sainvoice-definition)

##### Example

Ví dụ gọi **GET** tới

[https://graphapi.cukcuk.vn/api/v1/sainvoices/detail/53B8D27D-2C4E-4B34-9881-0015F6765E9D](https://graphapi.cukcuk.vn/api/v1/sainvoices/detail/53B8D27D-2C4E-4B34-9881-0015F6765E9D)

Hệ thống sẽ trả về [ServiceResult](#serviceresult-definition) với ServiceResult.Data là [SAInvoice](#sainvoice-definition) JSON response

```
{
  "Code": 200,
  "Data": {
    "SAInvoiceDetails": [
      {
        "RefDetailID": "8ffaba83-7d45-4c07-ac6e-a6c482c09ef0",
        "RefDetailType": 1,
        "RefID": "53b8d27d-2c4e-4b34-9881-0015f6765e9d",
        "ItemID": "d8c7b4ef-b935-4fa8-9a04-f28d73bc0e98",
        "ItemName": "XK",
        "Quantity": 1.0,
        "UnitPrice": 50000.0,
        "UnitID": "e2d4815b-385b-4995-980c-4f636a27a1ed",
        "UnitName": "Cái",
        "Amount": 50000.0,
        "DiscountRate": 0.0,
        "SortOrder": 1,
        "InventoryItemType": 1,
        "HaveAddition": false,
        "IsSeftPrice": false,
        "PromotionRate": 0.0,
        "PromotionType": 0,
        "PromotionName": "",
        "OrderDetailID": "d60b1a7e-e5c6-451a-94dc-a2844b31b284",
        "IsSelected": false,
        "SAInvoicePromotionAmount": 0.0,
        "ItemCode": "XK",
        "PromotionAmount": 0.0,
        "AllocationAmount": 0.0,
        "PreTaxAmount": 50000.0,
        "AllocationDeliveryPromotionAmount": 20000.0
      }
    ],
    "SAInvoicePayments": [
      {
        "SAInvoicePaymentID": "f7954d7d-c586-4d06-a32b-defe9159ddbc",
        "RefID": "53b8d27d-2c4e-4b34-9881-0015f6765e9d",
        "PaymentType": 1,
        "Amount": 50000.0,
        "PaymentName": "Tiền mặt",
        "FoodAmount": 0.0,
        "DrinkAmount": 0.0,
        "ApplyVoucherType": 0,
        "VoucherAllAmount": 0.0,
        "VoucherFoodAmount": 0.0,
        "VoucherDrinkAmount": 0.0,
        "ExchangeRate": 0.0,
        "ExchangeAmount": 0.0
      }
    ],
    "SAVATInfo": {
      "VATID": "80469e2e-5ffd-4e1f-a826-ad789b4c3013",
      "RefID": "8ba889d0-a764-4eb5-b016-3673db10a99b",
      "ReceiverEIvoiceName": "abc",
      "Tel": "0378887459",
      "CompanyName": "ABC",
      "CompanyAddress": "HN",
      "TaxCode": "0100786940-993",
      "Email": "abc@gmail.com",
      "Status": true,
      "StatusReleaseEInvoice": 1,
      "EInvoiceNumber": "00000018",
      "StatusSendEmail": 0,
      "TransactionID": "6RT2CX1LZ1",
      "SellerTaxCode": "0109831978",
      "TemplateCode": "1",
      "InvoiceSeries": "1C23MIA",
      "RefDateReleaseEInvoice": "2023-03-28T10:25:54.933+07:00",
      "StatusSendToTax": 0,
      "AccountObjectIdentificationNumber": "CMND1234",
      "IsCalculatingMachinePublishing": true
    },
  },
  "Total": 0,
  "Success": true
}

```


Definitions
-----------

### SAInvoice Definition


|Property         |Type                 |Format|Mô tả                                     |
|-----------------|---------------------|------|------------------------------------------|
|SAInvoiceDetails |Array<InvoiceDetail> |      |Danh sách hàng hóa chi tiết trong hóa đơn |
|SAInvoicePayments|Array<InvoicePayment>|      |Danh sách thông tin thanh toán của hóa đơn|
|SAInvoiceCoupons |Array<InvoiceCoupon> |      |Danh sách các mã ưu đãi trong hóa đơn     |
|SAVATInfo        |SAVATInfo            |      |Thông tin phát hành hóa đơn GTGT          |


### OrderType Definition


|Giá trị|Mô tả                        |
|-------|-----------------------------|
|1      |Đơn hàng phục vụ tại nhà hàng|
|2      |Đơn hàng gói mang về         |
|3      |Đơn hàng giao tận nơi        |
|4      |Đặt chỗ trước                |


### PaymentStatus Definition


|Giá trị|Mô tả          |
|-------|---------------|
|0      |Chưa thanh toán|
|1      |Chưa thu tiền  |
|2      |Ghi nợ         |
|3      |Đã thu tiền    |
|4      |Đã hủy         |
|5      |Tạm hủy        |


### InvoiceDetail Definition



* Property: RefDetailId
  * Type: string
  * Format: guid
  * Mô tả: Id detail hóa đơn
* Property: RefID
  * Type: string
  * Format: guid
  * Mô tả: Id hóa đơn bán hàng
* Property: RefDetailType
  * Type: int
  * Format: 
  * Mô tả: Loại chi tiết, xem tại đây
* Property: ItemID
  * Type: string
  * Format: guid
  * Mô tả: Id mặt hàng
* Property: ItemName
  * Type: string
  * Format: 
  * Mô tả: Tên mặt hàng
* Property: Quantity
  * Type: decimal
  * Format: 
  * Mô tả: Số lượng
* Property: UnitPrice
  * Type: decimal
  * Format: 
  * Mô tả: Đơn giá
* Property: UnitID
  * Type: string
  * Format: guid
  * Mô tả: Id đơn vị tính
* Property: UnitName
  * Type: string
  * Format: 
  * Mô tả: Tên đơn vị tính
* Property: Amount
  * Type: decimal
  * Format: 
  * Mô tả: Thành tiền
* Property: DiscountRate
  * Type: decimal
  * Format: 
  * Mô tả: Tỷ lệ chiết khấu (tính theo %)
* Property: Description
  * Type: string
  * Format: 
  * Mô tả: Ghi chú
* Property: SortOrder
  * Type: int
  * Format: 
  * Mô tả: Thứ tự sắp xếp trong hóa đơn
* Property: ParentID
  * Type: string
  * Format: guid
  * Mô tả: Id dòng cha
* Property: InventoryItemAdditionID
  * Type: string
  * Format: guid
  * Mô tả: Id sở thích phục vụ
* Property: InventoryItemType
  * Type: int
  * Format: 
  * Mô tả: Loại mặt hàng, xem tại đây
* Property: IsSeftPrice
  * Type: bool
  * Format: 
  * Mô tả: Đơn giá thay đổi theo thời giá (true: có, false: không)
* Property: PromotionRate
  * Type: decimal
  * Format: 
  * Mô tả: Tỷ lệ khuyến mại (tính theo %)
* Property: PromotionType
  * Type: int
  * Format: 
  * Mô tả: Loại khuyến mại, xem tại đây
* Property: PromotionName
  * Type: string
  * Format: 
  * Mô tả: Tên khuyến mại
* Property: OrderDetailID
  * Type: string
  * Format: guid
  * Mô tả: Id order detail
* Property: SAInvoicePromotionAmount
  * Type: decimal
  * Format: 
  * Mô tả: Tiền khuyến mại trên hóa đơn
* Property: RefDate
  * Type: datetime
  * Format: 
  * Mô tả: Ngày lập hóa đơn
* Property: ItemCode
  * Type: string
  * Format: 
  * Mô tả: Mã hàng
* Property: PromotionAmount
  * Type: decimal
  * Format: 
  * Mô tả: Tiền khuyến mại
* Property: InventoryItemCategoryID
  * Type: string
  * Format: guid
  * Mô tả: Mã nhóm vật tư hàng hóa
* Property: AllocationAmount
  * Type: decimal
  * Format: 
  * Mô tả: Số tiền phân bổ của khuyến mại cho dòng chi tiết
* Property: PreTaxAmount
  * Type: decimal
  * Format: 
  * Mô tả: Tiền trước thuế của món
* Property: TaxRate
  * Type: decimal
  * Format: 
  * Mô tả: Thuế suất cho món (tính theo %)
* Property: TaxAmount
  * Type: decimal
  * Format: 
  * Mô tả: Tiền thuế cho món
* Property: AllocationDeliveryPromotionAmount
  * Type: decimal
  * Format: 
  * Mô tả: Phân bố chiết khấu giao hàng


### InvoicePayment Definition


|Property          |Type   |Format|Mô tả                            |
|------------------|-------|------|---------------------------------|
|SAInvoicePaymentID|string |guid  |Id thông tin tin thanh toán      |
|RefID             |string |guid  |Id hóa đơn                       |
|RefNo             |string |guid  |Số chứng từ của SAInvoice        |
|PaymentType       |int    |      |Loại thanh toán, xem tại đây     |
|Amount            |decimal|      |Số tiền                          |
|CustomerID        |string |guid  |Id khách ghi nợ                  |
|CustomerName      |string |      |Tên khách ghi nợ                 |
|PaymentName       |string |      |Tên loại thanh toán              |
|VoucherID         |string |guid  |Id thẻ voucher                   |
|VoucherQuantity   |int    |      |Số lượng voucher                 |
|VoucherAmount     |decimal|      |Giá trị của voucher              |
|VoucherCode       |string |      |Mã voucher                       |
|VoucherName       |string |      |Tên voucher                      |
|CardID            |string |guid  |Id thẻ ngân hàng                 |
|CardName          |string |      |Tên thẻ ngân hàng                |
|ApplyVoucherType  |int    |      |Loại áp dụng voucher, xem tại đây|
|VoucherAllAmount  |decimal|      |Số tiền khi áp dụng cho tất cả   |
|VoucherFoodAmount |decimal|      |Số tiền khi chọn áp dụng món ăn  |
|VoucherDrinkAmount|decimal|      |Số tiền khi chọn áp dụng đồ uống |
|CardNo            |string |      |4 số cuối thẻ ATM                |
|ApprovalCode      |string |      |Mã chuẩn chi                     |
|CustomerAddress   |string |      |Địa chỉ khách hàng thanh toán    |
|BankName          |string |      |Tên tài khoản ngân hàng          |
|BankAccountNumber |string |      |Số tài khoản                     |
|CurrencyID        |string |guid  |Id đồng tiền thanh toán          |
|MainCurrency      |string |      |Đồng tiền chinh                  |
|ExchangeRate      |decimal|      |Tỷ giá quy đổi                   |
|ExchangeAmount    |decimal|      |Tiền quy đổi                     |


### InvoiceCoupon Definition



* Property: SAInvoiceCouponID
  * Type: string
  * Format: guid
  * Mô tả: Id mã ưu đãi trong hóa đơn
* Property: RefID
  * Type: string
  * Format: guid
  * Mô tả: Id hóa đơn
* Property: CouponID
  * Type: string
  * Format: guid
  * Mô tả: Id mã ưu đãi
* Property: CouponCode
  * Type: string
  * Format: 
  * Mô tả: Mã ưu đãi
* Property: DiscountType
  * Type: int
  * Format: 
  * Mô tả: Loại ưu đãi (1: theo phần trăm, 2: theo số tiền)
* Property: DiscountPercent
  * Type: decimal
  * Format: 
  * Mô tả: Phần trăm giảm giá
* Property: DiscountAmount
  * Type: decimal
  * Format: 
  * Mô tả: Số tiền giảm giá
* Property: ApplyFromDate
  * Type: datetime
  * Format: 
  * Mô tả: Áp dụng từ ngày
* Property: ApplyToDate
  * Type: datetime
  * Format: 
  * Mô tả: Áp dụng đến ngày
* Property: ApplyCondition
  * Type: string
  * Format: 
  * Mô tả: Điều kiện áp dụng
* Property: IsUnlimitedApply
  * Type: bool
  * Format: 
  * Mô tả: Không giới hạn số lần áp dụng (true: không giới hạn, false: giới hạn số lần áp dụng)
* Property: ApplyFor
  * Type: string
  * Format: 
  * Mô tả: Áp dụng cho
* Property: InvoiceDiscountAmount
  * Type: decimal
  * Format: 
  * Mô tả: Số tiền khuyến mại hóa đơn


### SAVATInfo Definition



* Property: VATID
  * Type: string
  * Format: guid
  * Mô tả: Id hóa đơn điện tử
* Property: RefID
  * Type: string
  * Format: guid
  * Mô tả: Id hóa đơn bán hàng
* Property: ReceiverEIvoiceName
  * Type: string
  * Format: 
  * Mô tả: Tên khách hàng
* Property: Tel
  * Type: string
  * Format: 
  * Mô tả: Số điện thoại
* Property: CompanyName
  * Type: string
  * Format: 
  * Mô tả: Tên công ty
* Property: CompanyAddress
  * Type: string
  * Format: 
  * Mô tả: Địa chỉ công ty
* Property: TaxCode
  * Type: string
  * Format: 
  * Mô tả: Mã số thuế
* Property: Email
  * Type: string
  * Format: 
  * Mô tả: Email người nhận hóa đơn
* Property: Status
  * Type: bool
  * Format: 
  * Mô tả: Khách có lấy hóa đơn giá trị gia tăng
* Property: StatusReleaseEInvoice
  * Type: int
  * Format: 
  * Mô tả: Trạng thái phát hành hóa đơn, xem tại đây
* Property: EInvoiceNumber
  * Type: string
  * Format: 
  * Mô tả: Số hóa đơn khi phát hành hóa đơn điện tử
* Property: StatusSendEmail
  * Type: int
  * Format: 
  * Mô tả: Trạng thái gửi email cho khách hàng (0: chưa gửi, 1: đã gửi)
* Property: TransactionID
  * Type: string
  * Format: 
  * Mô tả: Transaction phát hành hóa đơn điện tử
* Property: SellerTaxCode
  * Type: string
  * Format: 
  * Mô tả: Mã số thuế tài khoản phát hành
* Property: TemplateCode
  * Type: string
  * Format: 
  * Mô tả: Mã mẫu số hóa đơn
* Property: InvoiceSeries
  * Type: string
  * Format: 
  * Mô tả: Ký hiệu của mẫu số hóa đơn
* Property: RefDateReleaseEInvoice
  * Type: datetime
  * Format: 
  * Mô tả: Ngày phát hành h��a đơn
* Property: StatusSendToTax
  * Type: int?
  * Format: 
  * Mô tả: Trạng thái gửi cơ quan thuế, xem tại đây
* Property: AccountObjectIdentificationNumber
  * Type: string
  * Format: 
  * Mô tả: Số cmnd/cccd
* Property: IsCalculatingMachinePublishing
  * Type: bool?
  * Format: 
  * Mô tả: Phát hành dưới máy tính tiền
* Property: ErrorNoteEinvoice
  * Type: string
  * Format: 
  * Mô tả: Ghi chú sai sót


### RefDetailType Definition


|Giá trị|Mô tả                 |
|-------|----------------------|
|1      |Món ăn                |
|2      |Món ăn thêm           |
|3      |Mặt hàng khác         |
|4      |Khuyến mại theo món ăn|


### PromotionType Definition


|Giá trị|Mô tả                       |
|-------|----------------------------|
|1      |Theo chương trình khuyến mại|
|2      |Món mời                     |
|3      |Khuyến mại khác             |


### PaymentType Definition


|Giá trị|Mô tả                   |
|-------|------------------------|
|0      |Tất cả                  |
|1      |Tiền mặt                |
|2      |Thẻ ngân hàng           |
|3      |Ghi nợ                  |
|4      |Voucher                 |
|5      |Thẻ trả trước           |
|6      |Thẻ tích điểm thành viên|


### ApplyVoucherType Definition


|Giá trị|Mô tả   |
|-------|--------|
|1      |Tất cả  |
|2      |Món ăn  |
|3      |Đồ uống |
|4      |Tùy chọn|


### InventoryItemType Definition


|Giá trị|Mô tả                      |
|-------|---------------------------|
|1      |Món ăn                     |
|2      |Món ăn theo nguyên vật liệu|
|3      |Món ăn theo nhóm           |
|4      |Combo                      |
|5      |Đồ uống đóng chai          |
|6      |Đồ uống pha chế            |
|7      |Mặt hàng khác              |
|8      |Nguyên vật liệu            |
|10     |Đồ uống theo nhóm          |


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


### StatusReleaseEInvoice Definition

*   Trạng thái phát hành


|Giá trị|Mô tả         |
|-------|--------------|
|1      |Đã phát hành  |
|-1     |Phát hành lỗi |
|0      |Đang phát hành|
|-2     |Chưa phát hành|
|2      |Chờ cấp mã    |
|3      |Gửi lỗi       |
|4      |Đã cấp mã     |
|5      |Từ chối cấp mã|


### StatusSendToTax Definition

*   Trạng thái gửi CQT


|Giá trị|Mô tả              |
|-------|-------------------|
|0      |Chưa gửi           |
|1      |Đã gửi             |
|2      |CQT tiếp nhận      |
|3      |CQT không tiếp nhận|
|4      |Gửi lỗi            |


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
