import { CategoriesApi } from '../categories';
import { CukCukClient } from '../client';
import { GetCategoriesListResponse } from '../types';

describe('CategoriesApi', () => {
  let categoriesApi: CategoriesApi;
  let mockClient: jest.Mocked<CukCukClient>;

  beforeEach(() => {
    mockClient = {
      makeRequest: jest.fn(),
    } as any;

    categoriesApi = new CategoriesApi(mockClient);
  });

  describe('getList', () => {
    it('should fetch all categories', async () => {
      const mockResponse: GetCategoriesListResponse = {
        Code: 200,
        Data: [
          {
            Id: '73d8687e-aaf5-4e26-bb15-14d1ef9c6e50',
            Code: 'COMSUAT',
            Name: 'Cơm suất',
            Description: 'Cơm',
            IsLeaf: false,
            Grade: 1,
            Inactive: false
          }
        ],
        Total: 1,
        Success: true,
        ErrorType: 0,
        ErrorMessage: null
      };

      mockClient.makeRequest.mockResolvedValue(mockResponse);

      const result = await categoriesApi.getList();

      expect(mockClient.makeRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'api/v1/categories/list',
        params: undefined
      });
      expect(result).toEqual(mockResponse);
    });

    it('should fetch all categories including inactive ones', async () => {
      const mockResponse: GetCategoriesListResponse = {
        Code: 200,
        Data: [
          {
            Id: '73d8687e-aaf5-4e26-bb15-14d1ef9c6e50',
            Code: 'COMSUAT',
            Name: 'Cơm suất',
            Description: 'Cơm',
            IsLeaf: false,
            Grade: 1,
            Inactive: false
          },
          {
            Id: '33d35b16-5e5c-47a5-b37b-152ed8e9cd65',
            Code: 'THUCANMAN',
            Name: 'Thức ăn mặn',
            Description: 'Thức ăn mặn',
            IsLeaf: false,
            Grade: 1,
            Inactive: true
          }
        ],
        Total: 2,
        Success: true,
        ErrorType: 0,
        ErrorMessage: null
      };

      mockClient.makeRequest.mockResolvedValue(mockResponse);

      const result = await categoriesApi.getList({ includeInactive: true });

      expect(mockClient.makeRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'api/v1/categories/list',
        params: { includeInactive: true }
      });
      expect(result).toEqual(mockResponse);
    });
  });
}); 