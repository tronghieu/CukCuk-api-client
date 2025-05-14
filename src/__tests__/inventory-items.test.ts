import { CukCukClient } from '../client';
import { InventoryItemsApi } from '../inventory-items';
import { 
  GetInventoryItemsPagingParams,
  GetInventoryItemsPagingResponse,
  GetInventoryItemDetailResponse,
  InventoryItem
} from '../types';

describe('InventoryItemsApi', () => {
  let client: CukCukClient;
  let inventoryItemsApi: InventoryItemsApi;

  beforeEach(() => {
    client = new CukCukClient({
      appId: 'test-app-id',
      domain: 'test-domain',
      secretKey: 'test-secret-key',
      companyCode: 'test-company-code'
    });
    inventoryItemsApi = new InventoryItemsApi(client);
  });

  describe('getPaging', () => {
    it('should fetch paginated inventory items', async () => {
      const mockParams: GetInventoryItemsPagingParams = {
        Page: 1,
        Limit: 10,
        BranchId: 'test-branch-id',
        CategoryId: 'test-category-id',
        KeySearch: 'test',
        IncludeInactive: true
      };

      const mockResponse: GetInventoryItemsPagingResponse = {
        Code: 200,
        Data: [
          {
            Id: 'test-item-id',
            Code: 'TEST',
            Name: 'Test Item',
            ItemType: 1,
            CategoryID: 'test-category-id',
            CategoryName: 'Test Category',
            Price: 1000,
            Inactive: false,
            UnitID: 'test-unit-id',
            UnitName: 'Test Unit',
            Description: 'Test Description',
            IsSeftPrice: false,
            AllowAdjustPrice: false
          }
        ],
        Total: 1,
        Success: true,
        ErrorType: 0,
        ErrorMessage: undefined
      };

      jest.spyOn(client, 'makeRequest').mockResolvedValue(mockResponse);

      const result = await inventoryItemsApi.getPaging(mockParams);

      expect(client.makeRequest).toHaveBeenCalledWith({
        method: 'POST',
        url: 'api/v1/inventoryitems/paging',
        data: mockParams
      });

      expect(result).toEqual(mockResponse);
      expect(result.Success).toBe(true);
      expect(result.Data).toHaveLength(1);
      expect(result.Data[0].Id).toBe('test-item-id');
    });

    it('should handle error response', async () => {
      const mockParams: GetInventoryItemsPagingParams = {
        Page: 1,
        Limit: 10
      };

      const mockErrorResponse: GetInventoryItemsPagingResponse = {
        Code: 200,
        Data: [],
        Total: 0,
        Success: false,
        ErrorType: 2,
        ErrorMessage: 'Company code does not exist'
      };

      jest.spyOn(client, 'makeRequest').mockResolvedValue(mockErrorResponse);

      const result = await inventoryItemsApi.getPaging(mockParams);

      expect(result.Success).toBe(false);
      expect(result.ErrorType).toBe(2);
      expect(result.ErrorMessage).toBe('Company code does not exist');
    });
  });

  describe('getDetail', () => {
    it('should fetch inventory item details', async () => {
      const mockItemId = 'test-item-id';

      const mockResponse: GetInventoryItemDetailResponse = {
        Code: 200,
        Data: {
          Id: mockItemId,
          Code: 'TEST',
          Name: 'Test Item',
          ItemType: 1,
          CategoryID: 'test-category-id',
          CategoryName: 'Test Category',
          Price: 1000,
          Inactive: false,
          UnitID: 'test-unit-id',
          UnitName: 'Test Unit',
          Description: 'Test Description',
          IsSeftPrice: false,
          AllowAdjustPrice: false,
          Children: [],
          AdditionCategories: [
            {
              Additions: [
                {
                  AdditionId: 'test-addition-id',
                  Description: 'Test Addition',
                  Price: 500,
                  InActive: false
                }
              ]
            }
          ]
        },
        Total: 0,
        Success: true,
        ErrorType: 0,
        ErrorMessage: undefined
      };

      jest.spyOn(client, 'makeRequest').mockResolvedValue(mockResponse);

      const result = await inventoryItemsApi.getDetail(mockItemId);

      expect(client.makeRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: `api/v1/inventoryitems/detail/${mockItemId}`
      });

      expect(result).toEqual(mockResponse);
      expect(result.Success).toBe(true);
      expect(result.Data.Id).toBe(mockItemId);
      expect(result.Data.AdditionCategories).toHaveLength(1);
      expect(result.Data.AdditionCategories![0].Additions).toHaveLength(1);
    });

    it('should handle error response', async () => {
      const mockItemId = 'non-existent-id';

      const mockErrorResponse: GetInventoryItemDetailResponse = {
        Code: 200,
        Data: {} as InventoryItem,
        Total: 0,
        Success: false,
        ErrorType: 1,
        ErrorMessage: 'Invalid or missing parameters'
      };

      jest.spyOn(client, 'makeRequest').mockResolvedValue(mockErrorResponse);

      const result = await inventoryItemsApi.getDetail(mockItemId);

      expect(result.Success).toBe(false);
      expect(result.ErrorType).toBe(1);
      expect(result.ErrorMessage).toBe('Invalid or missing parameters');
    });
  });
}); 