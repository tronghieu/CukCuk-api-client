import { CukCukClient } from './client';
import { GetTablesByBranchResponse } from './types';

export class TablesApi {
  constructor(private client: CukCukClient) {}

  /**
   * Get all tables for a specific branch
   * @param branchId The ID of the branch to get tables for
   * @returns Promise with tables list response
   */
  async getByBranch(branchId: string): Promise<GetTablesByBranchResponse> {
    return this.client.makeRequest<GetTablesByBranchResponse>({
      method: 'GET',
      url: `api/v1/tables/${branchId}`
    });
  }
} 