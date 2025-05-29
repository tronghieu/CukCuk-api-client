import { CukCukClient } from './client';
import { 
  InvoicesPagingRequestParam,
  GetSAInvoicesPagingResponse,
  GetSAInvoiceResponse,
  GetSAInvoiceDetailResponse
} from './types';

export class SAInvoicesApi {
  constructor(private client: CukCukClient) {}

  /**
   * Get paginated list of invoices
   * @param params Parameters for pagination and filtering
   * @returns Promise with paginated invoices response
   */
  async paging(params: InvoicesPagingRequestParam): Promise<GetSAInvoicesPagingResponse> {
    return this.client.makeRequest<GetSAInvoicesPagingResponse>({
      method: 'POST',
      url: 'api/v1/sainvoices/paging',
      data: params
    });
  }

  /**
   * Get invoice information by ID
   * @param refId The ID of the invoice to get information for
   * @returns Promise with invoice information response
   */
  async get(refId: string): Promise<GetSAInvoiceResponse> {
    return this.client.makeRequest<GetSAInvoiceResponse>({
      method: 'GET',
      url: `api/v1/sainvoices/${refId}`
    });
  }

  /**
   * Get detailed invoice information by ID (invoice details, payments, VAT info)
   * @param refId The ID of the invoice to get details for
   * @returns Promise with detailed invoice response
   */
  async detail(refId: string): Promise<GetSAInvoiceDetailResponse> {
    return this.client.makeRequest<GetSAInvoiceDetailResponse>({
      method: 'GET',
      url: `api/v1/sainvoices/detail/${refId}`
    });
  }
} 