import { CukCukClient } from '../client';
import { SAInvoicesApi } from '../sa-invoices';
import type { 
  InvoicesPagingRequestParam,
  GetSAInvoicesPagingResponse,
  GetSAInvoiceResponse,
  GetSAInvoiceDetailResponse
} from '../types';

// Mock the client
jest.mock('../client');

describe('SAInvoicesApi', () => {
  let client: jest.Mocked<CukCukClient>;
  let sainvoicesApi: SAInvoicesApi;

  beforeEach(() => {
    client = new CukCukClient({
      appId: 'test-app-id',
      domain: 'test-domain',
      secretKey: 'test-secret-key',
      companyCode: 'test-company-code',
    }) as jest.Mocked<CukCukClient>;
    
    sainvoicesApi = new SAInvoicesApi(client);
  });

  describe('paging', () => {
    it('should get paginated invoices', async () => {
      const mockParams: InvoicesPagingRequestParam = {
        Page: 1,
        Limit: 10,
        BranchId: 'test-branch-id',
        HaveCustomer: true,
      };

      const mockResponse: GetSAInvoicesPagingResponse = {
        Code: 200,
        Data: [
          {
            RefId: 'test-invoice-id',
            RefNo: 'INV001',
            CustomerName: 'Test Customer',
            TotalAmount: 100000,
          },
        ],
        Total: 1,
        Success: true,
      };

      client.makeRequest.mockResolvedValue(mockResponse);

      const result = await sainvoicesApi.paging(mockParams);

      expect(client.makeRequest).toHaveBeenCalledWith({
        method: 'POST',
        url: 'api/v1/sainvoices/paging',
        data: mockParams,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('get', () => {
    it('should get invoice by ID', async () => {
      const refId = 'test-invoice-id';
      const mockResponse: GetSAInvoiceResponse = {
        Code: 200,
        Data: {
          RefId: refId,
          RefNo: 'INV001',
          CustomerName: 'Test Customer',
          TotalAmount: 100000,
          SAInvoiceDetails: [],
          SAInvoicePayments: [],
        },
        Total: 0,
        Success: true,
      };

      client.makeRequest.mockResolvedValue(mockResponse);

      const result = await sainvoicesApi.get(refId);

      expect(client.makeRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: `api/v1/sainvoices/${refId}`,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('detail', () => {
    it('should get invoice details by ID', async () => {
      const refId = 'test-invoice-id';
      const mockResponse: GetSAInvoiceDetailResponse = {
        Code: 200,
        Data: {
          SAInvoiceDetails: [
            {
              RefDetailID: 'detail-id',
              RefDetailType: 1,
              RefID: refId,
              ItemID: 'item-id',
              ItemName: 'Test Item',
              Quantity: 2,
              UnitPrice: 50000,
              UnitID: 'unit-id',
              UnitName: 'Cái',
              Amount: 100000,
              DiscountRate: 0,
              SortOrder: 1,
              InventoryItemType: 1,
              IsSeftPrice: false,
              PromotionRate: 0,
              PromotionType: 0,
              SAInvoicePromotionAmount: 0,
              PromotionAmount: 0,
              AllocationAmount: 0,
              PreTaxAmount: 100000,
            },
          ],
          SAInvoicePayments: [
            {
              SAInvoicePaymentID: 'payment-id',
              RefID: refId,
              PaymentType: 1,
              Amount: 100000,
              PaymentName: 'Tiền mặt',
            },
          ],
        },
        Total: 0,
        Success: true,
      };

      client.makeRequest.mockResolvedValue(mockResponse);

      const result = await sainvoicesApi.detail(refId);

      expect(client.makeRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: `api/v1/sainvoices/detail/${refId}`,
      });
      expect(result).toEqual(mockResponse);
    });
  });
}); 