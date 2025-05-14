import { CukCukClient } from './client';
import { CreateCustomerParams, CreateCustomerResponse, GetCustomersPagingParams, GetCustomersPagingResponse } from './types';

export class CustomersApi {
  constructor(private client: CukCukClient) {}

  /**
   * Create a new customer
   * @param params Customer data to create
   * @returns Promise with created customer response
   */
  async create(params: CreateCustomerParams): Promise<CreateCustomerResponse> {
    return this.client.makeRequest<CreateCustomerResponse>({
      method: 'POST',
      url: 'api/v1/customers/',
      data: params
    });
  }

  /**
   * Get paginated list of customers
   * @param params Pagination parameters
   * @returns Promise with paginated customers response
   */
  async getPaging(params: GetCustomersPagingParams): Promise<GetCustomersPagingResponse> {
    return this.client.makeRequest<GetCustomersPagingResponse>({
      method: 'POST',
      url: 'api/v1/customers/paging',
      data: params
    });
  }
} 