import { CukCukClient } from '../client';
import { OrderOnlinesApi } from '../order-onlines';
import { CreateOrderOnlineParams } from '../types';

describe('OrderOnlinesApi', () => {
  let client: CukCukClient;
  let orderOnlinesApi: OrderOnlinesApi;

  beforeEach(() => {
    client = new CukCukClient({
      secretKey: 'test-secret-key'
    });
    orderOnlinesApi = new OrderOnlinesApi(client);
  });

  describe('create', () => {
    it('should create a new online order successfully', async () => {
      const mockParams: CreateOrderOnlineParams = {
        BranchId: 'f7a8b9c2-3d4e-5f67-8901-a23b4c5d6e7f',
        OrderType: 0,
        CustomerName: 'A Đặng',
        CustomerTel: '0389457123',
        ShippingAddress: 'Tòa N03-T1 khu Ngoại giao đoàn, Xuân Tảo, Bắc Từ Liêm, Hà Nội',
        ShippingTimeType: 0,
        OrderNote: 'Giao trước 18h',
        TotalAmount: 91000,
        Amount: 87000,
        DeliveryAmount: 19000,
        DiscountAmount: 15000,
        OrderSource: 1,
        PaymentStatus: 1,
        OrderItems: [
          {
            Id: '8ab3cd42-e229-4154-841b-30038b25793d',
            Code: 'KEMRUMNHO',
            ItemType: 6,
            Name: 'Kem rum nho',
            Price: 29000,
            UnitID: '47817d1f-c393-4a4c-af57-0d7fe3f29c5f',
            UnitName: 'Cốc',
            Note: 'Không lấy đá',
            Quantity: 2,
            Additions: [
              {
                Id: 'd31e46bb-0bd9-4c93-a548-b55a8f33a682',
                Description: 'Ít đường',
                Price: 0.0,
                Quantity: 1
              }
            ]
          }
        ]
      };

      const mockResponse = {
        Code: 200,
        Total: 0,
        Data: 'DH5678910',
        Success: true
      };

      jest.spyOn(client, 'makeRequest').mockResolvedValue(mockResponse);

      const result = await orderOnlinesApi.create(mockParams);

      expect(client.makeRequest).toHaveBeenCalledWith({
        method: 'POST',
        url: 'api/v1/order-onlines/create',
        data: mockParams
      });

      expect(result).toEqual(mockResponse);
    });

    it('should handle API errors correctly', async () => {
      const mockParams: CreateOrderOnlineParams = {
        BranchId: 'f7a8b9c2-3d4e-5f67-8901-a23b4c5d6e7f',
        OrderType: 0,
        OrderSource: 1,
        PaymentStatus: 1,
        OrderItems: []
      };

      const mockError = {
        Code: 200,
        Total: 0,
        Data: '',
        Success: false,
        ErrorType: 354,
        ErrorMessage: 'Đơn hàng không có món ăn nào'
      };

      jest.spyOn(client, 'makeRequest').mockResolvedValue(mockError);

      const result = await orderOnlinesApi.create(mockParams);

      expect(client.makeRequest).toHaveBeenCalledWith({
        method: 'POST',
        url: 'api/v1/order-onlines/create',
        data: mockParams
      });

      expect(result).toEqual(mockError);
      expect(result.Success).toBe(false);
      expect(result.ErrorType).toBe(354);
    });
  });
}); 