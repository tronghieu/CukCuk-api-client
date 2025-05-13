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
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

export interface LoginRequest {
  domain: string;
  appId: string;
  loginTime: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
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