import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { 
  ClientConfig, 
  ApiResponse, 
  ApiError, 
  LoginRequest, 
  LoginResponse,
  Branch,
  BranchListParams
} from '@/types';

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

  // Account API
  public account = {
    login: async (params: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
      const response = await this.request<LoginResponse>({
        method: 'POST',
        url: '/api/v1/account/login',
        data: {
          ...params,
          secretKey: this.config.secretKey,
          companyCode: this.config.companyCode,
        },
      });
      
      if (response.data.accessToken) {
        this.accessToken = response.data.accessToken;
        this.client.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;
      }
      
      return response;
    },
  };

  // Branches API
  public branches = {
    getAll: async (params?: BranchListParams): Promise<ApiResponse<Branch[]>> => {
      return this.request<Branch[]>({
        method: 'GET',
        url: '/api/v1/branches',
        params,
      });
    },
  };
} 