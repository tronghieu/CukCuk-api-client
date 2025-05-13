import { CukCukClient } from './client';
import { GetAllBranchesParams, GetAllBranchesResponse, GetBranchSettingResponse } from './types';

export class BranchesApi {
  constructor(private client: CukCukClient) {}

  /**
   * Get all branches for the merchant
   * @param params Optional parameters including includeInactive flag
   * @returns Promise with branches list response
   */
  async getAll(params?: GetAllBranchesParams): Promise<GetAllBranchesResponse> {
    return this.client.makeRequest<GetAllBranchesResponse>({
      method: 'POST',
      url: 'api/v1/branchs/all',
      data: params
    });
  }

  /**
   * Get settings for a specific branch
   * @param branchId The ID of the branch to get settings for
   * @returns Promise with branch settings response
   */
  async getSetting(branchId: string): Promise<GetBranchSettingResponse> {
    return this.client.makeRequest<GetBranchSettingResponse>({
      method: 'POST',
      url: `api/v1/branchs/setting/${branchId}`
    });
  }
} 