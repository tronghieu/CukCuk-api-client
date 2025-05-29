export interface ClientConfig {
  appId: string;
  domain: string;
  secretKey: string;
  companyCode: string;
  baseUrl?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface ApiResponse<T> {
  Code: number;
  ErrorType?: number;
  ErrorMessage?: string | null;
  Success: boolean;
  Evironment?: string;
  Data: T;
  Total: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

export interface LoginRequest {
  Domain: string;
  AppId: string;
  LoginTime?: string;
}

export interface LoginResponse {
  AppId: string;
  Domain: string;
  AccessToken: string;
  CompanyCode: string;
  Environment: number;
}

export interface Branch {
  Id: string;
  Code: string;
  Name: string;
  IsBaseDepot: boolean;
  IsChainBranch: boolean;
}

export interface BranchSetting extends Branch {
  HasVATRate: boolean;
  VATRate: number;
  VATForDelivery: boolean;
  VATForTakeAway: boolean;
  VATForShip: boolean;
  CalTaxForService: boolean;
  HasCalcService: boolean;
  CalcServiceDelivery: boolean;
  CalcServiceTakeAway: boolean;
  IsCalcServiceAmountNotPromotion: boolean;
  HasCalcServiceWhenRequire: boolean;
  HasServiceRate: boolean;
  ServiceRate: number;
  HasAmountService: boolean;
  AmountService: number;
  Inactive: boolean;
}

export interface GetAllBranchesParams {
  includeInactive?: boolean;
}

export interface GetAllBranchesResponse {
  Code: number;
  Data: Branch[];
  Total: number;
  Success: boolean;
  ErrorType: number;
  ErrorMessage: string | null;
}

export interface GetBranchSettingResponse {
  Code: number;
  Data: BranchSetting;
  Total: number;
  Success: boolean;
  ErrorType: number;
  ErrorMessage: string | null;
}

// Order Types
export interface OrderDetail {
  Id?: string;
  ItemId: string;
  ItemName?: string;
  UnitId?: string;
  UnitName?: string;
  Quantity: number;
  Status?: number;
  Price?: number;
  Amount?: number;
  SortOrder?: number;
  AdditionId?: string;
  ParentId?: string;
  Description?: string;
}

export interface Order {
  Id: string;
  Type: number;
  No: string;
  BranchId: string;
  Status: number;
  Date: string;
  ShippingDate?: string;
  CustomerId?: string;
  CustomerName?: string;
  CustomerTel?: string;
  EmployeeId?: string;
  EmployeeName?: string;
  ShippingAddress?: string;
  DeliveryAmount?: number;
  DepositAmount?: number;
  TotalAmount?: number;
  TableName?: string;
  OrderDetails: OrderDetail[];
  ListTableID?: string[];
  Version?: string;
}

// Orders Paging
export interface GetOrdersPagingParams {
  Page: number;
  Limit: number;
  BranchId?: string;
  LastSyncDate?: string;
}

export interface GetOrdersPagingResponse {
  Code: number;
  Data: Order[];
  Total: number;
  Success: boolean;
}

// Create Order
export interface CreateOrderParams {
  Id?: string;
  Type: number;
  No?: string;
  BranchId: string;
  Date?: string;
  ShippingDate?: string;
  CustomerId?: string;
  CustomerName?: string;
  CustomerTel?: string;
  EmployeeId?: string;
  ShippingAddress?: string;
  DeliveryAmount?: number;
  DepositAmount?: number;
  RequestDescription?: string;
  OrderDetails: OrderDetail[];
  ListTableID?: string[];
  Version?: string;
}

export interface CreateOrderResponse {
  Code: number;
  Data: Order;
  Total: number;
  Success: boolean;
}

// Get Order Detail
export interface GetOrderDetailResponse {
  Code: number;
  Data: Order;
  Total: number;
  Success: boolean;
}

// Update Order Items
export interface UpdateOrderItemsParams {
  Id: string;
  BranchId: string;
  OrderDetails: OrderDetail[];
}

export interface UpdateOrderItemsResponse {
  Code: number;
  Data: Order;
  Total: number;
  Success: boolean;
}

// Categories Types
export interface InventoryItemCategory {
  Id: string;
  Code: string;
  Name: string;
  Description: string;
  Inactive: boolean;
  IsLeaf: boolean;
  Grade: number;
}

export interface GetCategoriesListParams {
  includeInactive?: boolean;
}

export interface GetCategoriesListResponse {
  Code: number;
  Data: InventoryItemCategory[];
  Total: number;
  Success: boolean;
  ErrorType: number;
  ErrorMessage: string | null;
}

export interface ServiceResult<T> {
  Code: number;
  Data: T;
  Total: number;
  Success: boolean;
  ErrorType?: number;
  ErrorMessage?: string;
  Environment?: string;
}

export interface Customer {
  Id?: string;
  BranchId?: string;
  OriginalBranchId?: string;
  Code?: string;
  Name: string;
  CustomerCategoryID?: string;
  CustomerCategoryName?: string;
  Tel: string;
  Address?: string;
  Email?: string;
  Description?: string;
  IdentifyNumber?: string;
  Birthday?: string;
  Inactive?: boolean;
  OldNumberCard?: string;
  CardStartDate?: string;
  CardExpireDate?: string;
  NormalizedTel?: string;
  TotalAmount?: number;
}

export interface CreateCustomerParams extends Omit<Customer, 'Id' | 'NormalizedTel' | 'TotalAmount'> {}

export interface CreateCustomerResponse extends ServiceResult<Customer[]> {}

export interface GetCustomersPagingParams {
  Page: number;
  Limit: number;
  IncludeInactive?: boolean;
  LastSyncDate?: string;
}

export interface GetCustomersPagingResponse extends ServiceResult<Customer[]> {}

// Employee Types
export interface Employee {
  Id: string;
  BranchId: string;
  Code: string;
  FirstName: string;
  LastName: string;
  FullName: string;
  Gender: number;
  Mobile: string;
  HomeTel: string;
  Email: string;
  IdentifyNumber: string;
  CurrentAddress: string;
  NativeAddress: string;
  RoleCode: string;
}

export interface GetEmployeesPagingParams {
  Page: number;
  Limit: number;
  BranchId?: string;
  LastSyncDate?: string;
}

export interface GetEmployeesPagingResponse extends ServiceResult<Employee[]> {}

// Inventory Items Types
export interface InventoryItemAddition {
  Id: string;
  Description: string;
  Price: number;
  Quantity: number;
}

export interface OrderOnlineItem {
  Id: string;
  Code: string;
  ItemType: number;
  Name: string;
  Price: number;
  UnitID: string;
  UnitName: string;
  Note?: string;
  Quantity: number;
  Children?: OrderOnlineItem[];
  Additions?: InventoryItemAddition[];
}

export interface InventoryItemAdditionCategory {
  Additions: InventoryItemAddition[];
}

export interface InventoryItem {
  Id: string;
  Code: string;
  Name: string;
  ItemType: number;
  CategoryID: string;
  CategoryName: string;
  Price: number;
  Inactive: boolean;
  UnitID: string;
  UnitName: string;
  Description: string;
  IsSeftPrice: boolean;
  AllowAdjustPrice: boolean;
  Children?: InventoryItem[];
  AdditionCategories?: InventoryItemAdditionCategory[];
}

export interface GetInventoryItemsPagingParams {
  Page: number;
  Limit: number;
  BranchId?: string;
  CategoryId?: string;
  KeySearch?: string;
  IncludeInactive?: boolean;
}

export interface GetInventoryItemsPagingResponse extends ServiceResult<InventoryItem[]> {}

export interface GetInventoryItemDetailResponse extends ServiceResult<InventoryItem> {}

// Tables Types
export interface MapObject {
  MapObjectID: string;
  MapObjectName: string;
  AreaID: string;
  AreaName: string;
  IsAvailable: boolean;
}

export interface BranchTables {
  ListTable: MapObject[];
  AllowMergeTable: number;
}

export interface GetTablesByBranchResponse extends ServiceResult<BranchTables> {}

// Online Order Types
export interface CreateOrderOnlineParams {
  BranchId: string;
  OrderId?: string;
  OrderCode?: string;
  OrderType: number;
  CustomerId?: string;
  CustomerName?: string;
  CustomerTel?: string;
  CustomerEmail?: string;
  ShippingAddress?: string;
  ShippingDueDate?: string;
  ShippingTimeType?: number;
  OrderNote?: string;
  TotalAmount?: number;
  Amount?: number;
  TaxAmount?: number;
  DiscountAmount?: number;
  DeliveryAmount?: number;
  DepositAmount?: number;
  PaymentStatus: number;
  OrderSource: number;
  OrderItems: OrderOnlineItem[];
}

export interface CreateOrderOnlineResponse {
  Code: number;
  Total: number;
  Data: string; // OrderCode
  Success: boolean;
  ErrorType?: number;
  ErrorMessage?: string;
}

// SAInvoice Types
export interface InvoicesPagingRequestParam {
  Page: number;
  Limit: number;
  BranchId?: string;
  HaveCustomer?: boolean;
  LastSyncDate?: string;
}

export interface SAInvoiceDetail {
  RefDetailID: string;
  RefDetailType: number;
  RefID: string;
  ItemID: string;
  ItemName: string;
  Quantity: number;
  UnitPrice: number;
  UnitID: string;
  UnitName: string;
  Amount: number;
  DiscountRate: number;
  Description?: string;
  SortOrder: number;
  ParentID?: string;
  InventoryItemAdditionID?: string;
  InventoryItemType: number;
  HaveAddition?: boolean;
  IsSeftPrice: boolean;
  PromotionRate: number;
  PromotionType: number;
  PromotionName?: string;
  OrderDetailID?: string;
  IsSelected?: boolean;
  SAInvoicePromotionAmount: number;
  RefDate?: string;
  ItemCode?: string;
  PromotionAmount: number;
  InventoryItemCategoryID?: string;
  AllocationAmount: number;
  PreTaxAmount: number;
  TaxRate?: number;
  TaxAmount?: number;
  AllocationDeliveryPromotionAmount?: number;
}

export interface SAInvoicePayment {
  SAInvoicePaymentID: string;
  RefID: string;
  RefNo?: string;
  PaymentType: number;
  Amount: number;
  CustomerID?: string;
  CustomerName?: string;
  PaymentName?: string;
  VoucherID?: string;
  VoucherQuantity?: number;
  VoucherAmount?: number;
  VoucherCode?: string;
  VoucherName?: string;
  CardID?: string;
  CardName?: string;
  ApplyVoucherType?: number;
  VoucherAllAmount?: number;
  VoucherFoodAmount?: number;
  VoucherDrinkAmount?: number;
  CardNo?: string;
  ApprovalCode?: string;
  CustomerAddress?: string;
  BankName?: string;
  BankAccountNumber?: string;
  CurrencyID?: string;
  MainCurrency?: string;
  ExchangeRate?: number;
  ExchangeAmount?: number;
  FoodAmount?: number;
  DrinkAmount?: number;
}

export interface SAInvoiceCoupon {
  SAInvoiceCouponID: string;
  RefID: string;
  CouponID: string;
  CouponCode: string;
  DiscountType: number;
  DiscountPercent?: number;
  DiscountAmount?: number;
  ApplyFromDate?: string;
  ApplyToDate?: string;
  ApplyCondition?: string;
  IsUnlimitedApply?: boolean;
  ApplyFor?: string;
  InvoiceDiscountAmount?: number;
}

export interface SAVATInfo {
  VATID: string;
  RefID: string;
  ReceiverEIvoiceName?: string;
  Tel?: string;
  CompanyName?: string;
  CompanyAddress?: string;
  TaxCode?: string;
  Email?: string;
  Status?: boolean;
  StatusReleaseEInvoice?: number;
  EInvoiceNumber?: string;
  StatusSendEmail?: number;
  TransactionID?: string;
  SellerTaxCode?: string;
  TemplateCode?: string;
  InvoiceSeries?: string;
  RefDateReleaseEInvoice?: string;
  StatusSendToTax?: number;
  AccountObjectIdentificationNumber?: string;
  IsCalculatingMachinePublishing?: boolean;
  ErrorNoteEinvoice?: string;
}

export interface SAInvoice {
  RefId: string;
  RefType?: number;
  RefNo?: string;
  RefDate?: string;
  BranchId?: string;
  OrderId?: string;
  OrderType?: number;
  ShippingDate?: string;
  ShippingDueDate?: string;
  CustomerId?: string;
  CustomerName?: string;
  CustomerTel?: string;
  MembershipCardId?: string;
  EmployeeId?: string;
  EmployeeName?: string;
  DeliveryEmployeeId?: string;
  DeliveryEmployeeName?: string;
  DeliveryPartnerID?: string;
  DeliveryPartnerName?: string;
  WaiterEmployeeId?: string;
  WaiterEmployeeName?: string;
  ShippingAddress?: string;
  PromotionId?: string;
  PromotionName?: string;
  TableName?: string;
  Description?: string;
  DepositAmount?: number;
  Amount?: number;
  DeliveryAmount?: number;
  ServiceRate?: number;
  ServiceAmount?: number;
  VATRate?: number;
  VATAmount?: number;
  DiscountAmount?: number;
  PromotionRate?: number;
  PromotionAmount?: number;
  PromotionItemsAmount?: number;
  ReceiveAmount?: number;
  ReturnAmount?: number;
  TotalAmount?: number;
  SaleAmount?: number;
  TotalItemAmount?: number;
  TotalItemAmountAfterTax?: number;
  TipAmount?: number;
  ServiceTaxRate?: number;
  DeliveryTaxRate?: number;
  CancelDate?: string;
  CancelBy?: string;
  CancelReason?: string;
  PaymentStatus?: number;
  AvailablePoint?: number;
  UsedPoint?: number;
  AddPoint?: number;
  SAInvoiceDetails?: SAInvoiceDetail[];
  SAInvoicePayments?: SAInvoicePayment[];
  SAInvoiceCoupons?: SAInvoiceCoupon[];
  SAVATInfo?: SAVATInfo;
}

export interface GetSAInvoicesPagingResponse extends ServiceResult<SAInvoice[]> {}

export interface GetSAInvoiceResponse extends ServiceResult<SAInvoice> {}

export interface GetSAInvoiceDetailResponse extends ServiceResult<{
  SAInvoiceDetails?: SAInvoiceDetail[];
  SAInvoicePayments?: SAInvoicePayment[];
  SAInvoiceCoupons?: SAInvoiceCoupon[];
  SAVATInfo?: SAVATInfo;
}> {} 