import { CukCukClient } from './client';
import { 
  GetInventoryItemsPagingParams, 
  GetInventoryItemsPagingResponse,
  GetInventoryItemDetailResponse
} from './types';

export class InventoryItemsApi {
  constructor(private client: CukCukClient) {}

  /**
   * Get paginated list of inventory items
   * @param params Parameters for pagination and filtering
   * @returns Promise with paginated inventory items response
   */
  async getPaging(params: GetInventoryItemsPagingParams): Promise<GetInventoryItemsPagingResponse> {
    return this.client.makeRequest<GetInventoryItemsPagingResponse>({
      method: 'POST',
      url: 'api/v1/inventoryitems/paging',
      data: params
    });
  }

  /**
   * Get detailed information for a specific inventory item
   * @param inventoryItemId The ID of the inventory item to get details for
   * @returns Promise with inventory item details response
   */
  async getDetail(inventoryItemId: string): Promise<GetInventoryItemDetailResponse> {
    return this.client.makeRequest<GetInventoryItemDetailResponse>({
      method: 'GET',
      url: `api/v1/inventoryitems/detail/${inventoryItemId}`
    });
  }
} 