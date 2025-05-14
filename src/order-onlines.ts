import { CukCukClient } from './client';
import { CreateOrderOnlineParams, CreateOrderOnlineResponse } from './types';

export class OrderOnlinesApi {
  constructor(private client: CukCukClient) {}

  /**
   * Create a new online order
   * @param params Order creation parameters
   * @returns Promise with created order response containing OrderCode
   */
  async create(params: CreateOrderOnlineParams): Promise<CreateOrderOnlineResponse> {
    return this.client.makeRequest<CreateOrderOnlineResponse>({
      method: 'POST',
      url: 'api/v1/order-onlines/create',
      data: params
    });
  }
} 