# Branches API Guide

This guide explains how to use the CukCuk API Client to interact with the CukCuk OpenPlatform Branches APIs, including the Branches List API (`api/v1/branchs/all`) and the Branch Setting API (`api/v1/branchs/setting/{branchId}`). These APIs allow you to retrieve a list of branches (business locations) associated with a merchant and fetch detailed settings for a specific branch, such as VAT and service fee configurations.

> **Note**: The CukCuk API documentation uses the term "branchs," but this library corrects it to the standard English plural "branches" for consistency.

## Prerequisites

Before using the Branches APIs, ensure you have:

- **CukCuk API Credentials**: `AppID`, `Domain`, `SecretKey`, and `CompanyCode`. Obtain these from the [CukCuk management portal](https://cukcuk.vn/articles/index.html).
- **Access Token**: Generated via the [Account API](./account-api.md) authentication process.
- Installed the `cukcuk-api-client` package:
  ```bash
  npm install cukcuk-api-client
  ```

## API Overview

### Branches List API

- **Endpoint**: `POST https://graphapi.cukcuk.vn/api/v1/branchs/all`
- **Purpose**: Retrieves a list of branches for a merchant.
- **Authentication**: Requires `Authorization` and `CompanyCode` headers.
- **Response**: Returns a `ServiceResult` object containing an array of `Branch` objects.

### Branch Setting API

- **Endpoint**: `POST https://graphapi.cukcuk.vn/api/v1/branchs/setting/{branchId}`
- **Purpose**: Retrieves configuration settings for a specific branch, including VAT and service fee details.
- **Authentication**: Requires `Authorization` and `CompanyCode` headers.
- **Response**: Returns a `ServiceResult` object containing a single `BranchSetting` object.

### Branch Object

Each branch in the Branches List API response has the following properties:

| Property        | Type   | Description                                                                 |
|-----------------|--------|-----------------------------------------------------------------------------|
| `Id`            | string | Unique identifier (GUID) of the branch.                                     |
| `Code`          | string | Code of the branch (e.g., `demoquanviet`).                                  |
| `Name`          | string | Name of the branch (e.g., `Demo Quan Viet`).                                |
| `IsBaseDepot`   | boolean | Indicates if the branch is the main depot (`true` for main depot).          |
| `IsChainBranch` | boolean | Indicates if the branch is part of a chain of restaurants (`true` if yes).  |

### BranchSetting Object

The Branch Setting API returns a detailed object with the following properties:

| Property                       | Type    | Description                                                                 |
|--------------------------------|---------|-----------------------------------------------------------------------------|
| `Id`                           | string  | Unique identifier (GUID) of the branch.                                     |
| `Code`                         | string  | Code of the branch (e.g., `demoquanviet`).                                  |
| `Name`                         | string  | Name of the branch (e.g., `Demo Quan Viet`).                                |
| `IsBaseDepot`                  | boolean | Indicates if the branch is the main depot (`true` for main depot).          |
| `Inactive`                     | boolean | Indicates if the branch is inactive (`true` if inactive).                   |
| `HasVATRate`                   | boolean | `true` if VAT is applied.                                                  |
| `VATRate`                      | number  | VAT rate (0–100, e.g., `10.0` for 10%).                                    |
| `VATForDelivery`               | boolean | `true` if VAT applies to delivery orders.                                  |
| `VATForTakeAway`               | boolean | `true` if VAT applies to take-away orders.                                 |
| `VATForShip`                   | boolean | `true` if VAT applies to shipping fees.                                    |
| `CalTaxForService`             | boolean | `true` if tax is calculated for service fees.                              |
| `HasCalcService`               | boolean | `true` if service fees are applied.                                        |
| `CalcServiceDelivery`          | boolean | `true` if service fees apply to delivery orders.                           |
| `CalcServiceTakeAway`          | boolean | `true` if service fees apply to take-away orders.                          |
| `IsCalcServiceAmountNotPromotion` | boolean | `true` if service fees are calculated on amounts before promotions.         |
| `HasCalcServiceWhenRequire`    | boolean | `true` if service fees are applied only when required.                     |
| `HasServiceRate`               | boolean | `true` if service fees are calculated as a percentage of the bill.         |
| `ServiceRate`                  | number  | Service fee rate (0–100, e.g., `5.0` for 5%).                              |
| `HasAmountService`             | boolean | `true` if service fees are a fixed amount.                                 |
| `AmountService`                | number  | Fixed service fee amount (e.g., `0.0`).                                     |

### ServiceResult Object

Both APIs return responses wrapped in a `ServiceResult` object:

| Property        | Type   | Description                                                                 |
|-----------------|--------|-----------------------------------------------------------------------------|
| `Code`          | number | HTTP status code (e.g., `200`, `401`).                                      |
| `ErrorType`     | number | Error type (see [Error Types](#error-types)).                              |
| `ErrorMessage`  | string | Detailed error message, if any.                                             |
| `Success`       | boolean | `true` if the request was successful, `false` otherwise.                   |
| `Data`          | object | Array of `Branch` objects (Branches List) or a `BranchSetting` object (Branch Setting). |
| `Total`         | number | Total number of records (used for pagination, typically `0` for these APIs). |

## Usage

The `CukCukClient` provides methods to interact with both APIs:
- `branches.getAll`: Fetches the list of branches.
- `branches.getSetting`: Fetches settings for a specific branch.

Below are examples for each.

### Example: Fetching All Branches

```typescript
import { CukCukClient } from 'cukcuk-api-client';

const client = new CukCukClient({
  appId: 'your-app-id',
  domain: 'your-domain',
  secretKey: 'your-secret-key',
  companyCode: 'your-company-code',
});

async function fetchBranches() {
  try {
    // Authenticate to obtain an access token
    const loginResponse = await client.account.login({
      domain: 'your-domain',
      appId: 'your-app-id',
      loginTime: new Date().toISOString(),
    });

    // Fetch branches, including inactive ones
    const branches = await client.branches.getAll({ includeInactive: true });
    
    console.log('Branches:', branches.Data);
  } catch (error) {
    console.error('Error fetching branches:', error.message);
  }
}

fetchBranches();
```

### Example: Fetching Branch Settings

```typescript
import { CukCukClient } from 'cukcuk-api-client';

const client = new CukCukClient({
  appId: 'your-app-id',
  domain: 'your-domain',
  secretKey: 'your-secret-key',
  companyCode: 'your-company-code',
});

async function fetchBranchSettings() {
  try {
    // Authenticate to obtain an access token
    const loginResponse = await client.account.login({
      domain: 'your-domain',
      appId: 'your-app-id',
      loginTime: new Date().toISOString(),
    });

    // Fetch settings for a specific branch
    const branchId = '994c6fe5-da83-441b-a0e8-57a6fed98fb2';
    const settings = await client.branches.getSetting(branchId);
    
    console.log('Branch Settings:', settings.Data);
  } catch (error) {
    console.error('Error fetching branch settings:', error.message);
  }
}

fetchBranchSettings();
```

### Parameters

#### Branches List API (`getAll`)

| Parameter          | Type    | Description                                                  | Required? |
|--------------------|---------|--------------------------------------------------------------|-----------|
| `includeInactive`  | boolean | Set - Set to `true` to include inactive branches in the response. | No        |

#### Branch Setting API (`getSetting`)

| Parameter   | Type   | Description                                                  | Required? |
|-------------|--------|--------------------------------------------------------------|-----------|
| `branchId`  | string | The ID (GUID) of the branch, obtained from the Branches List API. | Yes       |

### Headers

Both APIs require the following headers, automatically handled by the `CukCukClient`:

| Header          | Description                                                  | Required? |
|-----------------|--------------------------------------------------------------|-----------|
| `Authorization` | Bearer token in the format `Bearer <AccessToken>`.           | Yes       |
| `CompanyCode`   | The merchant's company code (e.g., `demoquanviet`).          | Yes       |

### Example Responses

#### Branches List API

```json
{
  "Code": 200,
  "Data": [
    {
      "Id": "994c6fe5-da83-441b-a0e8-57a6fed98fb2",
      "Code": "demoquanviet",
      "Name": "Demo Quan Viet",
      "IsBaseDepot": false,
      "IsChainBranch": false
    },
    {
      "Id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "Code": "branch2",
      "Name": "Branch Two",
      "IsBaseDepp": true,
      "IsChainBranch": true
    }
  ],
  "Total": 0,
  "Success": true,
  "ErrorType": 0,
  "ErrorMessage": null
}
```

#### Branch Setting API

```json
{
  "Code": 200,
  "Data": {
    "Id": "994c6fe5-da83-441b-a0e8-57a6fed98fb2",
    "HasVATRate": true,
    "VATRate": 10.0,
    "VATForDelivery": false,
    "VATForTakeAway": false,
    "VATForShip": false,
    "CalTaxForService": false,
    "HasCalcService": true,
    "CalcServiceDelivery": false,
    "CalcServiceTakeAway": false,
    "IsCalcServiceAmountNotPromotion": false,
    "HasCalcServiceWhenRequire": false,
    "HasServiceRate": true,
    "ServiceRate": 5.0,
    "HasAmountService": false,
    "AmountService": 0.0,
    "Code": "demoquanviet",
    "Name": "Demo Quan Viet",
    "IsBaseDepot": false,
    "Inactive": false
  },
  "Total": 0,
  "Success": true,
  "ErrorType": 0,
  "ErrorMessage": null
}
```

## Error Types

Both APIs may return the following error types in the `ServiceResult.ErrorType` field:

| ErrorType | HTTP Code | Description                                                                 |
|-----------|-----------|-----------------------------------------------------------------------------|
| `0`       | 200       | No error.                                                                  |
| `1`       | 200       | Invalid or missing parameters (e.g., `CompanyCode`, `Authorization`, or `branchId`). |
| `2`       | 200       | The `CompanyCode` does not exist.                                          |
| `7`       | 200       | CukCuk connection is disabled, unable to retrieve data.                    |
| `100`     | 200       | Internal API error.                                                        |
| `102`     | 200       | Request rejected due to a concurrent request of the same type.             |
| `-`       | 401       | Access token is expired or invalid; re-authenticate using the Account API.  |

### Handling Errors

Always check the `ServiceResult.Success` field and handle errors appropriately:

```typescript
async function fetchDataWithErrorHandling() {
  try {
    // Fetch branches
    const branches = await client.branches.getAll({ includeInactive: true });
    if (!branches.Success) {
      console.error(`Error ${branches.ErrorType}: ${branches.ErrorMessage}`);
      return;
    }

    // Fetch settings for the first branch
    const branchId = branches.Data[0].Id;
    const settings = await client.branches.getSetting(branchId);
    if (!settings.Success) {
      console.error(`Error ${settings.ErrorType}: ${settings.ErrorMessage}`);
      return;
    }

    console.log('Branches:', branches.Data);
    console.log('Settings:', settings.Data);
  } catch (error) {
    if (error.response?.status === 401) {
      console.error('Authentication failed. Please re-authenticate.');
      // Trigger re-authentication
    } else {
      console.error('Unexpected error:', error.message);
    }
  }
}
```

## Best Practices

- **Token Management**: Store the `AccessToken` securely and refresh it when it expires (HTTP 401 error).
- **Rate Limiting**: Avoid sending multiple concurrent requests of the same type to prevent `ErrorType: 102`.
- **Error Handling**: Always validate `ServiceResult.Success` and handle specific `ErrorType` values.
- **Type Safety**: Use TypeScript interfaces provided by the library for type-safe responses.
- **Branch ID Validation**: Ensure the `branchId` used in the Branch Setting API is valid (obtained from the Branches List API).

## Additional Notes

- The `includeInactive` parameter in the Branches List API is optional and defaults to `false`. Set it to `true` to retrieve inactive branches.
- The Branch Setting API provides detailed configurations for VAT and service fees, which are critical for accurate order calculations.
- If you encounter persistent errors (e.g., `ErrorType: 100`), contact CukCuk support or check the [official documentation](https://cukcuk.vn).

For more details on authentication, refer to the [Account API Guide](./account-api.md).