import { CukCukClient } from '../client';
import { TablesApi } from '../tables';
import { GetTablesByBranchResponse } from '../types';

describe('TablesApi', () => {
  let client: CukCukClient;
  let tablesApi: TablesApi;

  beforeEach(() => {
    client = new CukCukClient({
      appId: 'test-app-id',
      domain: 'test-domain',
      secretKey: 'test-secret-key',
      companyCode: 'test-company-code'
    });
    tablesApi = new TablesApi(client);
  });

  describe('getByBranch', () => {
    it('should fetch tables for a branch successfully', async () => {
      const mockResponse: GetTablesByBranchResponse = {
        Code: 200,
        Data: {
          ListTable: [
            {
              MapObjectID: '4a541005-1225-4cf4-8134-08ff0bbc395d',
              MapObjectName: '3.23',
              AreaID: '58c212a2-ec62-48a9-8fbd-128fe9d2be56',
              AreaName: '3.2',
              IsAvailable: true
            }
          ],
          AllowMergeTable: 1
        },
        Total: 0,
        Success: true,
        ErrorType: 0
      };

      jest.spyOn(client, 'makeRequest').mockResolvedValue(mockResponse);

      const branchId = 'f7a8b9c2-3d4e-5f67-8901-a23b4c5d6e7f';
      const response = await tablesApi.getByBranch(branchId);

      expect(response).toEqual(mockResponse);
      expect(client.makeRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: `api/v1/tables/${branchId}`
      });
    });

    it('should handle error response', async () => {
      const mockErrorResponse: GetTablesByBranchResponse = {
        Code: 200,
        Data: {
          ListTable: [],
          AllowMergeTable: 0
        },
        Total: 0,
        Success: false,
        ErrorType: 2,
        ErrorMessage: 'Mã nhà hàng không tồn tại'
      };

      jest.spyOn(client, 'makeRequest').mockResolvedValue(mockErrorResponse);

      const branchId = 'invalid-branch-id';
      const response = await tablesApi.getByBranch(branchId);

      expect(response).toEqual(mockErrorResponse);
      expect(response.Success).toBe(false);
      expect(response.ErrorType).toBe(2);
    });

    it('should handle authentication error', async () => {
      const mockErrorResponse: GetTablesByBranchResponse = {
        Code: 401,
        Data: {
          ListTable: [],
          AllowMergeTable: 0
        },
        Total: 0,
        Success: false,
        ErrorType: 0,
        ErrorMessage: 'Unauthorized'
      };

      jest.spyOn(client, 'makeRequest').mockResolvedValue(mockErrorResponse);

      const branchId = 'f7a8b9c2-3d4e-5f67-8901-a23b4c5d6e7f';
      const response = await tablesApi.getByBranch(branchId);

      expect(response.Code).toBe(401);
      expect(response.Success).toBe(false);
    });
  });
}); 