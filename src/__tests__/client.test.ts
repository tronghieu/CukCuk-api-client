import { CukCukClient } from '@/client';
import type { ClientConfig } from '@/types';

describe('CukCukClient', () => {
  const mockConfig: ClientConfig = {
    baseUrl: 'https://api.example.com',
    apiKey: 'test-api-key',
  };

  let client: CukCukClient;

  beforeEach(() => {
    client = new CukCukClient(mockConfig);
  });

  it('should create a client instance with correct configuration', () => {
    expect(client).toBeInstanceOf(CukCukClient);
  });
}); 