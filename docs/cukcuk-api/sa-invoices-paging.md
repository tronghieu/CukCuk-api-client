# SAInvoice API - Danh sách hóa đơn | CUKCUK OpenPlatform API 
API thực hiện lấy danh sách hóa đơn theo khách hàng, chi nhánh. Phân trang tối đa 100 bản ghi trên một trang

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

### api/v1/sainvoices/paging

#### POST

Lấy danh sách hóa đơn phân trang

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


|Name |In  |Description                             |Required?|Type                      |
|-----|----|----------------------------------------|---------|--------------------------|
|param|body|Đối tượng lấy dữ liệu phân trang hóa đơn|true     |InvoicesPagingRequestParam|



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

Trả về đối tượng [ServiceResult](#serviceresult-definition) với ServiceResult.Data là Array<[SAInvoice](#sainvoice-definition)\> tổng số hóa đơn có trong hệ thống qua **ServiceResult.Total**

##### Example

Ví dụ gửi tham số gọi tới api

JSON [InvoicesPagingRequestParam](#invoicespagingrequestparam-definition)

```
{
  "Page": 1,
  "Limit": 100,
  "BranchId": "9b2f084b-97b6-42a9-b20a-2893fd358ae8",
  "HaveCustomer": true
}

```


Hệ thống sẽ trả về [ServiceResult](#serviceresult-definition) với Data là Array<[SAInvoice](#sainvoice-definition)\> JSON response

```
{
  "Code": 200,
  "Data": [
    {
      "RefId": "3a08fc9e-18d2-4c97-a2b4-102d41f352fc",
      "RefType": 550,
      "RefNo": "2004000020",
      "RefDate": "2020-07-08T17:40:55.447",
      "BranchId": "9b2f084b-97b6-42a9-b20a-2893fd358ae8",
      "OrderType": 0,
      "CustomerId": "cd9018f0-5d20-407c-9a6a-f3221275b950",
      "CustomerName": "Chị Nga",
      "EmployeeId": "12c271ea-478c-4350-b55d-162d66208838",
      "EmployeeName": "Dung Nguyễn",
      "Description": "chị Nga, 28 Tăng Thiết Giáp, Phường Cổ Nhuế 2, Quận Bắc Từ Liêm, Hà Nội ",
      "DepositAmount": 0.0,
      "Amount": 2300000.0,
      "DeliveryAmount": 0.0,
      "ServiceRate": 0.0,
      "ServiceAmount": 0.0,
      "VATRate": 0.0,
      "VATAmount": 0.0,
      "DiscountAmount": 0.0,
      "PromotionRate": 0.0,
      "PromotionAmount": 0.0,
      "PromotionItemsAmount": 0.0,
      "ReceiveAmount": 0.0,
      "ReturnAmount": 0.0,
      "TotalAmount": 2300000.0,
      "SaleAmount": 0.0,
      "TotalItemAmount": 0.0,
      "TotalItemAmountAfterTax": 0.0,
      "TipAmount": 0.0,
      "ServiceTaxRate": 0.0,
      "DeliveryTaxRate": 0.0,
      "PaymentStatus": 0,
      "AvailablePoint": 0,
      "UsedPoint": 0,
      "AddPoint": 0
    },
    {
      "RefId": "fb30bacc-6996-4834-8bb5-b39554c2d9ed",
      "RefType": 550,
      "RefNo": "2004000018",
      "RefDate": "2020-07-08T17:39:25.417",
      "BranchId": "9b2f084b-97b6-42a9-b20a-2893fd358ae8",
      "OrderType": 0,
      "CustomerId": "cd9018f0-5d20-407c-9a6a-f3221275b950",
      "CustomerName": "Chị Nga",
      "EmployeeId": "12c271ea-478c-4350-b55d-162d66208838",
      "EmployeeName": "Dung Nguyễn",
      "Description": "chị Nga, 28 Tăng Thiết Giáp, Phường Cổ Nhuế 2, Quận Bắc Từ Liêm, Hà Nội ",
      "DepositAmount": 0.0,
      "Amount": 2300000.0,
      "DeliveryAmount": 0.0,
      "ServiceRate": 0.0,
      "ServiceAmount": 0.0,
      "VATRate": 0.0,
      "VATAmount": 0.0,
      "DiscountAmount": 0.0,
      "PromotionRate": 0.0,
      "PromotionAmount": 0.0,
      "PromotionItemsAmount": 0.0,
      "ReceiveAmount": 0.0,
      "ReturnAmount": 0.0,
      "TotalAmount": 2300000.0,
      "SaleAmount": 0.0,
      "TotalItemAmount": 0.0,
      "TotalItemAmountAfterTax": 0.0,
      "TipAmount": 0.0,
      "ServiceTaxRate": 0.0,
      "DeliveryTaxRate": 0.0,
      "PaymentStatus": 0,
      "AvailablePoint": 0,
      "UsedPoint": 0,
      "AddPoint": 0
    },
    {
      "RefId": "e877a5e5-470d-48ed-bedb-c333647e209e",
      "RefType": 550,
      "RefNo": "2004000017",
      "RefDate": "2020-07-08T17:37:51.057",
      "BranchId": "9b2f084b-97b6-42a9-b20a-2893fd358ae8",
      "OrderType": 0,
      "CustomerId": "6b4b84d5-4196-4f84-bd85-4f3c638df61d",
      "CustomerName": "Chị Bảo châu",
      "EmployeeId": "12c271ea-478c-4350-b55d-162d66208838",
      "EmployeeName": "Dung Nguyễn",
      "Description": "",
      "DepositAmount": 0.0,
      "Amount": 560000.0,
      "DeliveryAmount": 50000.0,
      "ServiceRate": 0.0,
      "ServiceAmount": 0.0,
      "VATRate": 0.0,
      "VATAmount": 0.0,
      "DiscountAmount": 0.0,
      "PromotionRate": 0.0,
      "PromotionAmount": 0.0,
      "PromotionItemsAmount": 0.0,
      "ReceiveAmount": 0.0,
      "ReturnAmount": 0.0,
      "TotalAmount": 610000.0,
      "SaleAmount": 0.0,
      "TotalItemAmount": 0.0,
      "TotalItemAmountAfterTax": 0.0,
      "TipAmount": 0.0,
      "ServiceTaxRate": 0.0,
      "DeliveryTaxRate": 0.0,
      "PaymentStatus": 0,
      "AvailablePoint": 0,
      "UsedPoint": 0,
      "AddPoint": 0
    },
    {
      "RefId": "0ba898a7-a466-4662-9378-7784151573b6",
      "RefType": 550,
      "RefNo": "2004000019",
      "RefDate": "2020-07-08T17:36:50.763",
      "BranchId": "9b2f084b-97b6-42a9-b20a-2893fd358ae8",
      "OrderType": 0,
      "CustomerId": "cd9018f0-5d20-407c-9a6a-f3221275b950",
      "CustomerName": "Chị Nga",
      "EmployeeId": "12c271ea-478c-4350-b55d-162d66208838",
      "EmployeeName": "Dung Nguyễn",
      "Description": "chị Nga, 28 Tăng Thiết Giáp, Phường Cổ Nhuế 2, Quận Bắc Từ Liêm, Hà Nội ",
      "DepositAmount": 0.0,
      "Amount": 2300000.0,
      "DeliveryAmount": 0.0,
      "ServiceRate": 0.0,
      "ServiceAmount": 0.0,
      "VATRate": 0.0,
      "VATAmount": 0.0,
      "DiscountAmount": 0.0,
      "PromotionRate": 0.0,
      "PromotionAmount": 0.0,
      "PromotionItemsAmount": 0.0,
      "ReceiveAmount": 0.0,
      "ReturnAmount": 0.0,
      "TotalAmount": 2300000.0,
      "SaleAmount": 0.0,
      "TotalItemAmount": 0.0,
      "TotalItemAmountAfterTax": 0.0,
      "TipAmount": 0.0,
      "ServiceTaxRate": 0.0,
      "DeliveryTaxRate": 0.0,
      "PaymentStatus": 0,
      "AvailablePoint": 0,
      "UsedPoint": 0,
      "AddPoint": 0
    },
    {
      "RefId": "5ca84e6a-1b6d-4952-89b4-62428dabd335",
      "RefType": 550,
      "RefNo": "2004000016",
      "RefDate": "2020-07-08T16:54:34.983",
      "BranchId": "9b2f084b-97b6-42a9-b20a-2893fd358ae8",
      "OrderType": 0,
      "CustomerId": "cd9018f0-5d20-407c-9a6a-f3221275b950",
      "CustomerName": "Chị Nga",
      "EmployeeId": "12c271ea-478c-4350-b55d-162d66208838",
      "EmployeeName": "Dung Nguyễn",
      "Description": "chị Nga, 28 Tăng Thiết Giáp, Phường Cổ Nhuế 2, Quận Bắc Từ Liêm, Hà Nội ",
      "DepositAmount": 0.0,
      "Amount": 2300000.0,
      "DeliveryAmount": 0.0,
      "ServiceRate": 0.0,
      "ServiceAmount": 0.0,
      "VATRate": 0.0,
      "VATAmount": 0.0,
      "DiscountAmount": 0.0,
      "PromotionRate": 0.0,
      "PromotionAmount": 0.0,
      "PromotionItemsAmount": 0.0,
      "ReceiveAmount": 0.0,
      "ReturnAmount": 0.0,
      "TotalAmount": 2300000.0,
      "SaleAmount": 0.0,
      "TotalItemAmount": 0.0,
      "TotalItemAmountAfterTax": 0.0,
      "TipAmount": 0.0,
      "ServiceTaxRate": 0.0,
      "DeliveryTaxRate": 0.0,
      "PaymentStatus": 0,
      "AvailablePoint": 0,
      "UsedPoint": 0,
      "AddPoint": 0
    },
    {
      "RefId": "465314c0-ca6f-4782-976a-a8e51bd54297",
      "RefType": 550,
      "RefNo": "2004000014",
      "RefDate": "2020-07-08T16:51:54.63",
      "BranchId": "9b2f084b-97b6-42a9-b20a-2893fd358ae8",
      "OrderType": 0,
      "CustomerId": "cd9018f0-5d20-407c-9a6a-f3221275b950",
      "CustomerName": "Chị Nga",
      "EmployeeId": "12c271ea-478c-4350-b55d-162d66208838",
      "EmployeeName": "Dung Nguyễn",
      "Description": "chị Nga, 28 Tăng Thiết Giáp, Phường Cổ Nhuế 2, Quận Bắc Từ Liêm, Hà Nội ",
      "DepositAmount": 0.0,
      "Amount": 2300000.0,
      "DeliveryAmount": 0.0,
      "ServiceRate": 0.0,
      "ServiceAmount": 0.0,
      "VATRate": 0.0,
      "VATAmount": 0.0,
      "DiscountAmount": 0.0,
      "PromotionRate": 0.0,
      "PromotionAmount": 0.0,
      "PromotionItemsAmount": 0.0,
      "ReceiveAmount": 0.0,
      "ReturnAmount": 0.0,
      "TotalAmount": 2300000.0,
      "SaleAmount": 0.0,
      "TotalItemAmount": 0.0,
      "TotalItemAmountAfterTax": 0.0,
      "TipAmount": 0.0,
      "ServiceTaxRate": 0.0,
      "DeliveryTaxRate": 0.0,
      "PaymentStatus": 0,
      "AvailablePoint": 0,
      "UsedPoint": 0,
      "AddPoint": 0
    },
    {
      "RefId": "052ef319-2b51-491c-9b32-7dc746bd8e3c",
      "RefType": 550,
      "RefNo": "2004000015",
      "RefDate": "2020-07-08T16:49:52.383",
      "BranchId": "9b2f084b-97b6-42a9-b20a-2893fd358ae8",
      "OrderType": 0,
      "CustomerId": "cd9018f0-5d20-407c-9a6a-f3221275b950",
      "CustomerName": "Chị Nga",
      "EmployeeId": "12c271ea-478c-4350-b55d-162d66208838",
      "EmployeeName": "Dung Nguyễn",
      "Description": "chị Nga, 28 Tăng Thiết Giáp, Phường Cổ Nhuế 2, Quận Bắc Từ Liêm, Hà Nội ",
      "DepositAmount": 0.0,
      "Amount": 2300000.0,
      "DeliveryAmount": 0.0,
      "ServiceRate": 0.0,
      "ServiceAmount": 0.0,
      "VATRate": 0.0,
      "VATAmount": 0.0,
      "DiscountAmount": 0.0,
      "PromotionRate": 0.0,
      "PromotionAmount": 0.0,
      "PromotionItemsAmount": 0.0,
      "ReceiveAmount": 0.0,
      "ReturnAmount": 0.0,
      "TotalAmount": 2300000.0,
      "SaleAmount": 0.0,
      "TotalItemAmount": 0.0,
      "TotalItemAmountAfterTax": 0.0,
      "TipAmount": 0.0,
      "ServiceTaxRate": 0.0,
      "DeliveryTaxRate": 0.0,
      "PaymentStatus": 0,
      "AvailablePoint": 0,
      "UsedPoint": 0,
      "AddPoint": 0
    },
    {
      "RefId": "92ea360f-4bd3-472a-a138-ab4ef5ba5d7f",
      "RefType": 550,
      "RefNo": "2004000010",
      "RefDate": "2020-07-08T16:32:48.977",
      "BranchId": "9b2f084b-97b6-42a9-b20a-2893fd358ae8",
      "OrderType": 0,
      "CustomerId": "cd9018f0-5d20-407c-9a6a-f3221275b950",
      "CustomerName": "Chị Nga",
      "EmployeeId": "12c271ea-478c-4350-b55d-162d66208838",
      "EmployeeName": "Dung Nguyễn",
      "Description": "Chị Nga, 236 Hoàng Quốc Việt giao hàng trước 12h",
      "DepositAmount": 0.0,
      "Amount": 10610000.0,
      "DeliveryAmount": 0.0,
      "ServiceRate": 0.0,
      "ServiceAmount": 0.0,
      "VATRate": 0.0,
      "VATAmount": 0.0,
      "DiscountAmount": 0.0,
      "PromotionRate": 0.0,
      "PromotionAmount": 0.0,
      "PromotionItemsAmount": 0.0,
      "ReceiveAmount": 0.0,
      "ReturnAmount": 0.0,
      "TotalAmount": 10610000.0,
      "SaleAmount": 0.0,
      "TotalItemAmount": 0.0,
      "TotalItemAmountAfterTax": 0.0,
      "TipAmount": 0.0,
      "ServiceTaxRate": 0.0,
      "DeliveryTaxRate": 0.0,
      "PaymentStatus": 0,
      "AvailablePoint": 0,
      "UsedPoint": 0,
      "AddPoint": 0
    },
    {
      "RefId": "59836160-ef5d-4bf4-a180-6036bdcc7db2",
      "RefType": 550,
      "RefNo": "2004000012",
      "RefDate": "2020-07-08T15:11:36.163",
      "BranchId": "9b2f084b-97b6-42a9-b20a-2893fd358ae8",
      "OrderType": 0,
      "CustomerId": "722fadf2-44b0-47d9-b076-e5a1889be73c",
      "CustomerName": "Anh Bảo 1",
      "EmployeeId": "12c271ea-478c-4350-b55d-162d66208838",
      "EmployeeName": "Dung Nguyễn",
      "Description": "",
      "DepositAmount": 0.0,
      "Amount": 85000.0,
      "DeliveryAmount": 0.0,
      "ServiceRate": 0.0,
      "ServiceAmount": 0.0,
      "VATRate": 0.0,
      "VATAmount": 0.0,
      "DiscountAmount": 0.0,
      "PromotionRate": 0.0,
      "PromotionAmount": 0.0,
      "PromotionItemsAmount": 0.0,
      "ReceiveAmount": 0.0,
      "ReturnAmount": 0.0,
      "TotalAmount": 85000.0,
      "SaleAmount": 0.0,
      "TotalItemAmount": 0.0,
      "TotalItemAmountAfterTax": 0.0,
      "TipAmount": 0.0,
      "ServiceTaxRate": 0.0,
      "DeliveryTaxRate": 0.0,
      "PaymentStatus": 0,
      "AvailablePoint": 0,
      "UsedPoint": 0,
      "AddPoint": 0
    },
    {
      "RefId": "6cfefcec-df05-4286-ad50-93f35223f7ac",
      "RefType": 550,
      "RefNo": "2004000011",
      "RefDate": "2020-07-08T15:10:48.993",
      "BranchId": "9b2f084b-97b6-42a9-b20a-2893fd358ae8",
      "OrderType": 0,
      "CustomerId": "722fadf2-44b0-47d9-b076-e5a1889be73c",
      "CustomerName": "Anh Bảo 1",
      "EmployeeId": "12c271ea-478c-4350-b55d-162d66208838",
      "EmployeeName": "Dung Nguyễn",
      "Description": "",
      "DepositAmount": 0.0,
      "Amount": 85000.0,
      "DeliveryAmount": 0.0,
      "ServiceRate": 0.0,
      "ServiceAmount": 0.0,
      "VATRate": 0.0,
      "VATAmount": 0.0,
      "DiscountAmount": 0.0,
      "PromotionRate": 0.0,
      "PromotionAmount": 0.0,
      "PromotionItemsAmount": 0.0,
      "ReceiveAmount": 0.0,
      "ReturnAmount": 0.0,
      "TotalAmount": 85000.0,
      "SaleAmount": 0.0,
      "TotalItemAmount": 0.0,
      "TotalItemAmountAfterTax": 0.0,
      "TipAmount": 0.0,
      "ServiceTaxRate": 0.0,
      "DeliveryTaxRate": 0.0,
      "PaymentStatus": 0,
      "AvailablePoint": 0,
      "UsedPoint": 0,
      "AddPoint": 0
    }
  ],
  "Total": 0,
  "Success": true
}

```


Definitions
-----------

### InvoicesPagingRequestParam Definition

Tham số lấy dữ liệu chi nhánh nhà hàng


|Property    |Type    |Format|Mô tả                                                               |
|------------|--------|------|--------------------------------------------------------------------|
|Page        |int     |      |Số trang lấy dữ liệu                                                |
|Limit       |int     |      |Số bản ghi lấy trên 1 trang (max 100)                               |
|BranchID    |string  |guid  |Id chi nhánh cần lấy, truyền null để lấy dữ liệu toàn bộ chi nhánh  |
|HaveCustomer|bool    |      |Chỉ lấy các hóa đơn có khách hàng hay không (true: có, false: không)|
|LastSyncDate|datetime|      |Mốc thời gian lấy dữ liệu                                           |


### SAInvoice Definition



* Property: RefId
  * Type: string
  * Format: guid
  * Mô tả: Id hóa đơn
* Property: RefType
  * Type: int
  * Format: 
  * Mô tả: Loại hóa đơn
* Property: RefNo
  * Type: string
  * Format: 
  * Mô tả: Số hóa đơn
* Property: RefDate
  * Type: datetime
  * Format: 
  * Mô tả: Ngày phát sinh hóa đơn
* Property: BranchId
  * Type: string
  * Format: guid
  * Mô tả: Id chi nhánh
* Property: OrderId
  * Type: string
  * Format: guid
  * Mô tả: Id đơn hàng được thanh toán
* Property: OrderType
  * Type: int
  * Format: 
  * Mô tả: Loại đơn hàng, xem tại đây
* Property: ShippingDate
  * Type: datetime
  * Format: 
  * Mô tả: Thời gian giao hàng
* Property: ShippingDueDate
  * Type: datetime
  * Format: 
  * Mô tả: Thời gian hẹn trả khách
* Property: CustomerId
  * Type: string
  * Format: guid
  * Mô tả: Id khách hàng
* Property: CustomerName
  * Type: string
  * Format: 
  * Mô tả: Tên khách hàng
* Property: CustomerTel
  * Type: string
  * Format: 
  * Mô tả: Số điện thoại khách hàng
* Property: MembershipCardId
  * Type: string
  * Format: guid
  * Mô tả: Id hạng thẻ của khách tại thời gian phát sinh hóa đơn
* Property: EmployeeId
  * Type: string
  * Format: guid
  * Mô tả: Id nhân viên thu ngân
* Property: EmployeeName
  * Type: string
  * Format: 
  * Mô tả: Tên nhân viên thu ngân
* Property: DeliveryEmployeeId
  * Type: string
  * Format: guid
  * Mô tả: Id nhân viên giao hàng
* Property: DeliveryEmployeeName
  * Type: string
  * Format: 
  * Mô tả: Tên nhân viên giao hàng
* Property: WaiterEmployeeId
  * Type: string
  * Format: guid
  * Mô tả: Tên nhân viên phục vụ
* Property: WaiterEmployeeName
  * Type: string
  * Format: 
  * Mô tả: Tên nhân viên phục vụ
* Property: ShippingAddress
  * Type: string
  * Format: 
  * Mô tả: Địa chỉ giao hàng (với đơn hàng giao tận nơi)
* Property: PromotionId
  * Type: string
  * Format: guid
  * Mô tả: Id chương trình khuyến mại theo hóa đơn
* Property: PromotionName
  * Type: string
  * Format: 
  * Mô tả: Tên chương trình khuyến mại theo hóa đơn
* Property: TableName
  * Type: string
  * Format: 
  * Mô tả: Bàn được chọn (với đơn hàng phục vụ tại bàn)
* Property: Description
  * Type: string
  * Format: 
  * Mô tả: Ghi chú cho hóa đơn
* Property: DepositAmount
  * Type: decimal
  * Format: 
  * Mô tả: Tiền đặt cọc
* Property: Amount
  * Type: decimal
  * Format: 
  * Mô tả: Tiền hàng
* Property: DeliveryAmount
  * Type: decimal
  * Format: 
  * Mô tả: Phí giao hàng
* Property: ServiceRate
  * Type: decimal
  * Format: 
  * Mô tả: Tỷ lệ phí dịch vụ (tính theo %)
* Property: ServiceAmount
  * Type: decimal
  * Format: 
  * Mô tả: Phí dịch vụ
* Property: VATRate
  * Type: decimal
  * Format: 
  * Mô tả: Tỷ lệ thuế (tính theo %)
* Property: VATAmount
  * Type: decimal
  * Format: 
  * Mô tả: Tiền thuế
* Property: DiscountAmount
  * Type: decimal
  * Format: 
  * Mô tả: Số tiền khuyến mại
* Property: PromotionRate
  * Type: decimal
  * Format: 
  * Mô tả: Tỷ lệ khuyến mại theo hóa đơn (tính theo %)
* Property: PromotionAmount
  * Type: decimal
  * Format: 
  * Mô tả: Giảm giá theo hóa đơn
* Property: PromotionItemsAmount
  * Type: decimal
  * Format: 
  * Mô tả: Giảm giá các mặt hàng
* Property: ReceiveAmount
  * Type: decimal
  * Format: 
  * Mô tả: Số tiền đã trả
* Property: ReturnAmount
  * Type: decimal
  * Format: 
  * Mô tả: Số tiền trả lại cho khách
* Property: TotalAmount
  * Type: decimal
  * Format: 
  * Mô tả: Tổng thanh toán
* Property: SaleAmount
  * Type: decimal
  * Format: 
  * Mô tả: Doanh số
* Property: TotalItemAmount
  * Type: decimal
  * Format: 
  * Mô tả: Thành tiền
* Property: TotalItemAmountAfterTax
  * Type: decimal
  * Format: 
  * Mô tả: Thành tiền sau thuế
* Property: TipAmount
  * Type: decimal
  * Format: 
  * Mô tả: Tiền tip
* Property: ServiceTaxRate
  * Type: decimal
  * Format: 
  * Mô tả: Thuế suất cho phí dịch vụ
* Property: DeliveryTaxRate
  * Type: decimal
  * Format: 
  * Mô tả: Thuế suất cho phí giao hàng
* Property: CancelDate
  * Type: datetime
  * Format: 
  * Mô tả: Ngày hủy hóa đơn
* Property: CancelBy
  * Type: string
  * Format: 
  * Mô tả: Tên người hủy hóa đơn
* Property: CancelReason
  * Type: string
  * Format: 
  * Mô tả: Lý do hủy hóa đơn
* Property: PaymentStatus
  * Type: int
  * Format: 
  * Mô tả: Trạng thái thanh toán hóa đơn, xem tại đây[#paymentstatus-definition]
* Property: AvailablePoint
  * Type: int
  * Format: 
  * Mô tả: Số điểm có trước khi thanh toán hóa đơn
* Property: UsedPoint
  * Type: int
  * Format: 
  * Mô tả: Số điểm sử dụng trong hóa đơn
* Property: AddPoint
  * Type: int
  * Format: 
  * Mô tả: Số điểm tích được trong hóa đơn


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
