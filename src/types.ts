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
  AdditionId: string;
  Description: string;
  Price: number;
  InActive: boolean;
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