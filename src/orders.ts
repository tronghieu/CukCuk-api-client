import { CukCukClient } from './client';
import { 
  CreateOrderParams,
  CreateOrderResponse,
  GetOrderDetailResponse,
  GetOrdersPagingParams,
  GetOrdersPagingResponse,
  UpdateOrderItemsParams,
  UpdateOrderItemsResponse
} from './types';

export class OrdersApi {
  constructor(private client: CukCukClient) {}

  /**
   * Get paginated list of orders
   * @param params Parameters for pagination and filtering
   * @returns Promise with paginated orders response
   */
  async getPaging(params: GetOrdersPagingParams): Promise<GetOrdersPagingResponse> {
    return this.client.makeRequest<GetOrdersPagingResponse>({
      method: 'POST',
      url: 'api/v1/orders/paging',
      data: params
    });
  }

  /**
   * Create a new order
   * @param params Order creation parameters
   * @returns Promise with created order response
   */
  async create(params: CreateOrderParams): Promise<CreateOrderResponse> {
    return this.client.makeRequest<CreateOrderResponse>({
      method: 'POST',
      url: 'api/v1/orders/create',
      data: params
    });
  }

  /**
   * Get details of a specific order
   * @param orderId The ID of the order to get details for
   * @returns Promise with order details response
   */
  async getDetail(orderId: string): Promise<GetOrderDetailResponse> {
    return this.client.makeRequest<GetOrderDetailResponse>({
      method: 'GET',
      url: `api/v1/orders/${orderId}`
    });
  }

  /**
   * Update items in an existing order
   * @param params Parameters for updating order items
   * @returns Promise with updated order response
   */
  async updateItems(params: UpdateOrderItemsParams): Promise<UpdateOrderItemsResponse> {
    return this.client.makeRequest<UpdateOrderItemsResponse>({
      method: 'POST',
      url: 'api/v1/orders/update-item',
      data: params
    });
  }
} 