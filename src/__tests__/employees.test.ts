import { CukCukClient } from '../client';
import { EmployeesApi } from '../employees';
import { GetEmployeesPagingResponse } from '../types';

describe('EmployeesApi', () => {
  let client: CukCukClient;
  let employeesApi: EmployeesApi;

  beforeEach(() => {
    client = new CukCukClient({
      appId: 'test-app-id',
      domain: 'test-domain',
      secretKey: 'test-secret-key',
      companyCode: 'test-company-code'
    });
    employeesApi = new EmployeesApi(client);
  });

  describe('getPaging', () => {
    it('should fetch paginated employees successfully', async () => {
      const mockResponse: GetEmployeesPagingResponse = {
        Code: 200,
        Data: [
          {
            Id: '44d3af84-d86e-443a-a2bd-1a1f07472481',
            BranchId: 'f7a8b9c2-3d4e-5f67-8901-a23b4c5d6e7f',
            Code: 'NV000003',
            FirstName: '',
            LastName: '',
            FullName: 'Hien Thuong',
            IdentifyNumber: '',
            Gender: 0,
            Mobile: '',
            HomeTel: '',
            Email: '',
            NativeAddress: '',
            CurrentAddress: '',
            RoleCode: '["Admin"]'
          }
        ],
        Total: 1,
        Success: true,
        ErrorType: 0
      };

      jest.spyOn(client, 'makeRequest').mockResolvedValue(mockResponse);

      const params = {
        Page: 1,
        Limit: 10,
        BranchId: 'f7a8b9c2-3d4e-5f67-8901-a23b4c5d6e7f',
        LastSyncDate: '2020-05-04T09:28:55.854Z'
      };

      const result = await employeesApi.getPaging(params);

      expect(result).toEqual(mockResponse);
      expect(client.makeRequest).toHaveBeenCalledWith({
        method: 'POST',
        url: 'api/v1/employees/paging',
        data: params
      });
    });

    it('should handle error response', async () => {
      const mockErrorResponse: GetEmployeesPagingResponse = {
        Code: 200,
        Data: [],
        Total: 0,
        Success: false,
        ErrorType: 1,
        ErrorMessage: 'Invalid parameters'
      };

      jest.spyOn(client, 'makeRequest').mockResolvedValue(mockErrorResponse);

      const params = {
        Page: 1,
        Limit: 101 // Exceeding max limit
      };

      const result = await employeesApi.getPaging(params);

      expect(result).toEqual(mockErrorResponse);
      expect(result.Success).toBe(false);
      expect(result.ErrorType).toBe(1);
    });

    it('should handle authentication error', async () => {
      const mockError = {
        response: {
          status: 401
        }
      };

      jest.spyOn(client, 'makeRequest').mockRejectedValue(mockError);

      const params = {
        Page: 1,
        Limit: 10
      };

      await expect(employeesApi.getPaging(params)).rejects.toEqual(mockError);
    });
  });
}); 