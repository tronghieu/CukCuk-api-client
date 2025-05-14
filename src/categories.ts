import { CukCukClient } from './client';
import { GetCategoriesListParams, GetCategoriesListResponse } from './types';

export class CategoriesApi {
  constructor(private client: CukCukClient) {}

  /**
   * Get all categories for the merchant
   * @param params Optional parameters including includeInactive flag
   * @returns Promise with categories list response
   */
  async getList(params?: GetCategoriesListParams): Promise<GetCategoriesListResponse> {
    return this.client.makeRequest<GetCategoriesListResponse>({
      method: 'GET',
      url: 'api/v1/categories/list',
      params
    });
  }
} 