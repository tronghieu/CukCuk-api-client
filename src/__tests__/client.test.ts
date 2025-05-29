import { CukCukClient } from '../client';
import type { ClientConfig, LoginRequest, LoginResponse } from '../types';

describe('CukCukClient', () => {
  const mockConfig: ClientConfig = {
    appId: 'test-app-id',
    domain: 'test-domain',
    secretKey: 'test-secret-key',
    companyCode: 'test-company-code',
    baseUrl: 'https://api.example.com',
  };

  let client: CukCukClient;

  beforeEach(() => {
    client = new CukCukClient(mockConfig);
  });

  it('should create a client instance with correct configuration', () => {
    expect(client).toBeInstanceOf(CukCukClient);
  });

  describe('account.login', () => {
    it('should successfully login and set access token', async () => {
      const loginParams: LoginRequest = {
        Domain: 'test-domain',
        AppId: 'test-app-id',
        LoginTime: '2024-03-20T10:00:00Z'
      };

      const mockResponse = {
        Code: 200,
        Data: {
          AppId: 'test-app-id',
          Domain: 'test-domain',
          AccessToken: 'test-access-token',
          CompanyCode: 'test-company-code',
          Environment: 1
        },
        Total: 0,
        Success: true,
        ErrorType: 0,
        ErrorMessage: null
      };

      // Mock the request method
      jest.spyOn(client as any, 'request').mockResolvedValue(mockResponse);

      const result = await client.account.login(loginParams);

      expect(result).toEqual(mockResponse);
      expect((client as any).accessToken).toBe('test-access-token');
      expect((client as any).config.companyCode).toBe('test-company-code');
    });
  });

  describe('makeRequest', () => {
    it('should make a request and return data', async () => {
      const mockResponse = {
        Code: 200,
        Data: { test: 'data' },
        Total: 0,
        Success: true,
        ErrorType: 0,
        ErrorMessage: null
      };

      // Mock the request method
      jest.spyOn(client as any, 'request').mockResolvedValue(mockResponse);

      const result = await client.makeRequest({
        method: 'GET',
        url: '/test'
      });

      expect(result).toEqual(mockResponse);
    });

    it('should handle API errors', async () => {
      const mockError = {
        response: {
          status: 400,
          data: {
            message: 'Bad Request',
            details: { error: 'Invalid input' }
          }
        }
      };

      // Mock the request method to throw an error
      jest.spyOn(client as any, 'request').mockRejectedValue(mockError);

      await expect(client.makeRequest({
        method: 'GET',
        url: '/test'
      })).rejects.toEqual(mockError);
    });
  });
}); 