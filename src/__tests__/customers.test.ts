import { CukCukClient } from '../client';
import { CustomersApi } from '../customers';
import { CreateCustomerParams, GetCustomersPagingParams } from '../types';

describe('CustomersApi', () => {
  let client: CukCukClient;
  let customersApi: CustomersApi;

  beforeEach(() => {
    client = new CukCukClient({
      secretKey: 'test-secret-key'
    });
    customersApi = new CustomersApi(client);
  });

  describe('create', () => {
    it('should create a new customer successfully', async () => {
      const mockCustomer: CreateCustomerParams = {
        Name: 'Nguyễn Văn A',
        Tel: '03423546412',
        Birthday: '1998-11-25T00:00:00',
        Address: 'Trần Quốc Vượng, Dịch Vọng Hậu, Cầu Giấy, Hà Nội',
        Description: '',
        Inactive: false
      };

      const mockResponse = {
        Code: 200,
        Data: [{
          Id: '0f330970-d4e4-47d6-b8bb-bbff89415c21',
          ...mockCustomer
        }],
        Total: 0,
        Success: true
      };

      jest.spyOn(client, 'makeRequest').mockResolvedValue(mockResponse);

      const result = await customersApi.create(mockCustomer);

      expect(client.makeRequest).toHaveBeenCalledWith({
        method: 'POST',
        url: 'api/v1/customers/',
        data: mockCustomer
      });

      expect(result).toEqual(mockResponse);
      expect(result.Success).toBe(true);
      expect(result.Data[0].Id).toBeDefined();
    });

    it('should handle duplicate customer error', async () => {
      const mockCustomer: CreateCustomerParams = {
        Name: 'Nguyễn Văn A',
        Tel: '03423546412'
      };

      const mockResponse = {
        Code: 200,
        ErrorType: 200,
        ErrorMessage: 'Mã khách hàng KH000010 hoặc số điện thoại 03423546412 đã tồn tại',
        Data: [{
          Id: 'e7a9139f-5c81-4464-b460-7d892866d6da',
          Code: 'KH000010',
          Name: 'Nguyễn Văn B',
          Tel: '03423546412'
        }],
        Total: 0,
        Success: false
      };

      jest.spyOn(client, 'makeRequest').mockResolvedValue(mockResponse);

      const result = await customersApi.create(mockCustomer);

      expect(result.Success).toBe(false);
      expect(result.ErrorType).toBe(200);
      expect(result.ErrorMessage).toContain('đã tồn tại');
    });
  });

  describe('getPaging', () => {
    it('should get paginated customers successfully', async () => {
      const mockParams: GetCustomersPagingParams = {
        Page: 1,
        Limit: 50,
        IncludeInactive: true,
        LastSyncDate: '2020-05-04T09:28:55.854Z'
      };

      const mockResponse = {
        Code: 200,
        Data: [
          {
            Id: '6cd8a8cd-ac5c-4821-b0dc-8c623fe13bc4',
            Code: 'KH000002',
            Name: 'Nguyễn Văn Dũng',
            Tel: '03482484567',
            Birthday: '1995-12-27T00:00:00',
            Address: '',
            Description: '',
            Email: '',
            Inactive: false
          }
        ],
        Total: 4,
        Success: true
      };

      jest.spyOn(client, 'makeRequest').mockResolvedValue(mockResponse);

      const result = await customersApi.getPaging(mockParams);

      expect(client.makeRequest).toHaveBeenCalledWith({
        method: 'POST',
        url: 'api/v1/customers/paging',
        data: mockParams
      });

      expect(result).toEqual(mockResponse);
      expect(result.Success).toBe(true);
      expect(result.Total).toBe(4);
      expect(result.Data).toHaveLength(1);
    });

    it('should handle pagination limit error', async () => {
      const mockParams: GetCustomersPagingParams = {
        Page: 1,
        Limit: 101 // Exceeds max limit of 100
      };

      const mockResponse = {
        Code: 200,
        ErrorType: 5,
        ErrorMessage: 'Tham số lấy phân trang vượt quá số lượng cấu hình cho phép (max 100)',
        Data: [],
        Total: 0,
        Success: false
      };

      jest.spyOn(client, 'makeRequest').mockResolvedValue(mockResponse);

      const result = await customersApi.getPaging(mockParams);

      expect(result.Success).toBe(false);
      expect(result.ErrorType).toBe(5);
      expect(result.ErrorMessage).toContain('vượt quá số lượng cấu hình cho phép');
    });
  });
}); 