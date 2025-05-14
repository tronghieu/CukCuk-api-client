import { BranchesApi } from '../branches';
import { CukCukClient } from '../client';
import { GetAllBranchesResponse, GetBranchSettingResponse } from '../types';

describe('BranchesApi', () => {
  let branchesApi: BranchesApi;
  let mockClient: jest.Mocked<CukCukClient>;

  beforeEach(() => {
    mockClient = {
      makeRequest: jest.fn(),
    } as any;

    branchesApi = new BranchesApi(mockClient);
  });

  describe('getAll', () => {
    it('should fetch all branches', async () => {
      const mockResponse: GetAllBranchesResponse = {
        Code: 200,
        Data: [
          {
            Id: '1',
            Code: 'branch1',
            Name: 'Branch 1',
            IsBaseDepot: false,
            IsChainBranch: false,
          },
        ],
        Total: 1,
        Success: true,
        ErrorType: 0,
        ErrorMessage: null,
      };

      mockClient.makeRequest.mockResolvedValue(mockResponse);

      const result = await branchesApi.getAll();

      expect(mockClient.makeRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'api/v1/branchs/all',
        params: undefined,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should fetch all branches including inactive ones', async () => {
      const mockResponse: GetAllBranchesResponse = {
        Code: 200,
        Data: [
          {
            Id: '1',
            Code: 'branch1',
            Name: 'Branch 1',
            IsBaseDepot: false,
            IsChainBranch: false,
          },
        ],
        Total: 1,
        Success: true,
        ErrorType: 0,
        ErrorMessage: null,
      };

      mockClient.makeRequest.mockResolvedValue(mockResponse);

      const result = await branchesApi.getAll({ includeInactive: true });

      expect(mockClient.makeRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'api/v1/branchs/all',
        params: { includeInactive: true },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getSetting', () => {
    it('should fetch branch settings', async () => {
      const mockResponse: GetBranchSettingResponse = {
        Code: 200,
        Data: {
          Id: '1',
          Code: 'branch1',
          Name: 'Branch 1',
          IsBaseDepot: false,
          IsChainBranch: false,
          HasVATRate: true,
          VATRate: 10,
          VATForDelivery: false,
          VATForTakeAway: false,
          VATForShip: false,
          CalTaxForService: false,
          HasCalcService: true,
          CalcServiceDelivery: false,
          CalcServiceTakeAway: false,
          IsCalcServiceAmountNotPromotion: false,
          HasCalcServiceWhenRequire: false,
          HasServiceRate: true,
          ServiceRate: 5,
          HasAmountService: false,
          AmountService: 0,
          Inactive: false,
        },
        Total: 0,
        Success: true,
        ErrorType: 0,
        ErrorMessage: null,
      };

      mockClient.makeRequest.mockResolvedValue(mockResponse);

      const result = await branchesApi.getSetting('1');

      expect(mockClient.makeRequest).toHaveBeenCalledWith({
        method: 'POST',
        url: 'api/v1/branchs/setting/1',
      });
      expect(result).toEqual(mockResponse);
    });
  });
}); 