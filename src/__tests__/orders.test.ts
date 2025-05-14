import { OrdersApi } from '../orders';
import { CukCukClient } from '../client';
import { 
  CreateOrderParams, 
  CreateOrderResponse, 
  GetOrderDetailResponse, 
  GetOrdersPagingParams, 
  GetOrdersPagingResponse,
  UpdateOrderItemsParams,
  UpdateOrderItemsResponse,
  Order,
  OrderDetail
} from '../types';

describe('OrdersApi', () => {
  let ordersApi: OrdersApi;
  let mockClient: jest.Mocked<CukCukClient>;

  const mockOrder: Order = {
    Id: 'order-123',
    Type: 1,
    No: 'ORD-001',
    BranchId: 'branch-123',
    Status: 1,
    Date: '2024-03-20T10:00:00Z',
    OrderDetails: [
      {
        ItemId: 'item-123',
        ItemName: 'Test Item',
        Quantity: 2,
        Price: 100,
        Amount: 200
      }
    ]
  };

  beforeEach(() => {
    mockClient = {
      makeRequest: jest.fn(),
    } as any;

    ordersApi = new OrdersApi(mockClient);
  });

  describe('getPaging', () => {
    it('should fetch paginated orders', async () => {
      const params: GetOrdersPagingParams = {
        Page: 1,
        Limit: 10,
        BranchId: 'branch-123'
      };

      const mockResponse: GetOrdersPagingResponse = {
        Code: 200,
        Data: [mockOrder],
        Total: 1,
        Success: true
      };

      mockClient.makeRequest.mockResolvedValue(mockResponse);

      const result = await ordersApi.getPaging(params);

      expect(mockClient.makeRequest).toHaveBeenCalledWith({
        method: 'POST',
        url: 'api/v1/orders/paging',
        data: params
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('create', () => {
    it('should create a new order', async () => {
      const params: CreateOrderParams = {
        Type: 1,
        BranchId: 'branch-123',
        OrderDetails: [
          {
            ItemId: 'item-123',
            ItemName: 'Test Item',
            Quantity: 2,
            Price: 100,
            Amount: 200
          }
        ]
      };

      const mockResponse: CreateOrderResponse = {
        Code: 200,
        Data: mockOrder,
        Total: 0,
        Success: true
      };

      mockClient.makeRequest.mockResolvedValue(mockResponse);

      const result = await ordersApi.create(params);

      expect(mockClient.makeRequest).toHaveBeenCalledWith({
        method: 'POST',
        url: 'api/v1/orders/create',
        data: params
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getDetail', () => {
    it('should fetch order details', async () => {
      const orderId = 'order-123';

      const mockResponse: GetOrderDetailResponse = {
        Code: 200,
        Data: mockOrder,
        Total: 0,
        Success: true
      };

      mockClient.makeRequest.mockResolvedValue(mockResponse);

      const result = await ordersApi.getDetail(orderId);

      expect(mockClient.makeRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: `api/v1/orders/${orderId}`
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateItems', () => {
    it('should update order items', async () => {
      const params: UpdateOrderItemsParams = {
        Id: 'order-123',
        BranchId: 'branch-123',
        OrderDetails: [
          {
            ItemId: 'item-123',
            ItemName: 'Updated Item',
            Quantity: 3,
            Price: 100,
            Amount: 300
          }
        ]
      };

      const mockResponse: UpdateOrderItemsResponse = {
        Code: 200,
        Data: {
          ...mockOrder,
          OrderDetails: params.OrderDetails
        },
        Total: 0,
        Success: true
      };

      mockClient.makeRequest.mockResolvedValue(mockResponse);

      const result = await ordersApi.updateItems(params);

      expect(mockClient.makeRequest).toHaveBeenCalledWith({
        method: 'POST',
        url: 'api/v1/orders/update-item',
        data: params
      });
      expect(result).toEqual(mockResponse);
    });
  });
}); 