import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { 
  ClientConfig, 
  ApiResponse, 
  ApiError, 
  LoginRequest, 
  LoginResponse
} from '@/types';
import { BranchesApi } from './branches';
import * as crypto from 'crypto';

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
      AppId: params.AppId,
      Domain: params.Domain,
      LoginTime: params.LoginTime,
      CompanyCode: this.config.companyCode
    });
    const hmac = crypto.createHmac('sha256', this.config.secretKey);
    return hmac.update(jsonString).digest('hex');
  }

  protected async request<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.request<T>(config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw error;
    }
  }

  // Public method for making API requests
  public async makeRequest<T>(config: AxiosRequestConfig): Promise<T> {
    const response = await this.request<T>(config);
    return response.data;
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
          secretKey: this.config.secretKey,
          companyCode: this.config.companyCode,
        },
      });

      if (response.data.AccessToken) {
        this.accessToken = response.data.AccessToken;
        this.config.companyCode = response.data.CompanyCode;
        this.client.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;
        this.client.defaults.headers.common['CompanyCode'] = this.config.companyCode;
      }
      
      return response;
    },
  };

  // Branches API
  public branches = new BranchesApi(this);
} 