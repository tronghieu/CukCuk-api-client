import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { 
  ClientConfig, 
  ApiResponse, 
  ApiError, 
  LoginRequest, 
  LoginResponse
} from '@/types';
import { BranchesApi } from './branches';
import { CategoriesApi } from './categories';
import * as crypto from 'crypto';
import { OrdersApi } from './orders';
import { CustomersApi } from './customers';
import { EmployeesApi } from './employees';
export class CukCukClient {
  private readonly client: AxiosInstance;
  private readonly config: ClientConfig;
  private accessToken?: string;

  constructor(config: ClientConfig) {
    this.config = config;
    this.client = axios.create({
      baseURL: config.baseUrl || 'https://graphapi.cukcuk.vn',
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: any) => {
        const apiError: ApiError = {
          code: error.response?.status?.toString() || 'UNKNOWN',
          message: error.response?.data?.message || error.message,
          details: error.response?.data,
        };
        return Promise.reject(apiError);
      }
    );
  }

  private generateSignature(params: LoginRequest): string {
    const jsonString = JSON.stringify({
      AppID: params.AppId,
      Domain: params.Domain,
      LoginTime: params.LoginTime
    });
    const hmac = crypto.createHmac('sha256', this.config.secretKey);
    return hmac.update(jsonString).digest('hex');
  }

  protected async request<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.request<ApiResponse<T>>(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Public method for making API requests
  public async makeRequest<T>(config: AxiosRequestConfig): Promise<T> {
    const response = await this.request<T>(config);
    return response.Data;
  }

  // Account API
  public account = {
    login: async (params: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
      params.LoginTime = params.LoginTime ? params.LoginTime : new Date().toISOString();
      this.config.appId = params.AppId;
      this.config.domain = params.Domain;
      const SignatureInfo = this.generateSignature(params);
      const response = await this.request<LoginResponse>({
        method: 'POST',
        url: '/api/account/login',
        data: {
          ...params,
          SignatureInfo,
          secretKey: this.config.secretKey
        },
      });

      if (response.Data.AccessToken) {
        this.accessToken = response.Data.AccessToken;
        this.config.companyCode = response.Data.CompanyCode;
        this.client.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;
        this.client.defaults.headers.common['CompanyCode'] = this.config.companyCode;
      }
      
      return response;
    },
  };

  // Branches API
  public branches = new BranchesApi(this);

  // Categories API
  public categories = new CategoriesApi(this);

  // Orders API
  public orders = new OrdersApi(this);

  // Customers API
  public customers = new CustomersApi(this);

  // Employees API
  public employees = new EmployeesApi(this);
} 