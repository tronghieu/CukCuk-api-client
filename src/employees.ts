import { CukCukClient } from './client';
import { GetEmployeesPagingParams, GetEmployeesPagingResponse } from './types';

export class EmployeesApi {
  constructor(private client: CukCukClient) {}

  /**
   * Get paginated list of employees
   * @param params Parameters for pagination and filtering
   * @returns Promise with paginated employees response
   */
  async getPaging(params: GetEmployeesPagingParams): Promise<GetEmployeesPagingResponse> {
    return this.client.makeRequest<GetEmployeesPagingResponse>({
      method: 'POST',
      url: 'api/v1/employees/paging',
      data: params
    });
  }
} 