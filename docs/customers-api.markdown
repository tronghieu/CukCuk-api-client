# Customers API Guide

This guide explains how to use the CukCuk API Client to interact with the CukCuk OpenPlatform Customers APIs. These APIs allow you to create new customers (`api/v1/customers/`) and retrieve a paginated list of customers (`api/v1/customers/paging`) associated with a merchant.

## Prerequisites

Before using the Customers APIs, ensure you have:

- **CukCuk API Credentials**: `AppId`, `Domain`, `SecretKey`, and `CompanyCode`. Obtain these from the [CukCuk management portal](https://cukcuk.vn/articles/index.html).
- **Access Token**: Generated via the [Account API](./account-api.md) authentication process.
- Installed the `cukcuk-api-client` package:
  ```bash
  npm install cukcuk-api-client
  ```

## API Overview

### Customers Create API
- **Endpoint**: `POST https://graphapi.cukcuk.vn/api/v1/customers/`
- **Purpose**: Adds a new customer to the system.
- **Version**: 1.1 (includes optional `BranchId`).

### Customers Paging API
- **Endpoint**: `POST https://graphapi.cukcuk.vn/api/v1/customers/paging`
- **Purpose**: Retrieves a paginated list of customers.
- **Max Records**: 100 records per page.

### Customer Object
Each customer in the response has the following properties:

| Property            | Type   | Description                              |
|---------------------|--------|------------------------------------------|
| `Id`                | string | Unique identifier (GUID) of the customer. |
| `BranchId`          | string | Branch ID (GUID, optional).              |
| `OriginalBranchId`  | string | Original branch ID (GUID, for partners). |
| `Code`              | string | Customer code (e.g., `KH000010`).        |
| `Name`              | string | Customer name (required).                |
| `CustomerCategoryID`| string | Customer category ID (GUID, optional).   |
| `CustomerCategoryName` | string | Customer category name (optional).       |
| `Tel`               | string | Phone number (required).                 |
| `Address`           | string | Customer address (optional).             |
| `Email`             | string | Email address (optional).                |
| `Description`       | string | Customer notes (optional).               |
| `IdentifyNumber`    | string | ID number (optional).                    |
| `Birthday`          | string | Birth date (ISO 8601 format, optional).  |
| `Inactive`          | boolean| `true` if inactive, `false` if active.   |
| `OldNumberCard`     | string | Old card number (optional).              |
| `CardStartDate`     | string | Card issuance date (ISO 8601, optional). |
| `CardExpireDate`    | string | Card expiration date (ISO 8601, optional). |

### ServiceResult Object
The API returns a `ServiceResult` object:

| Property        | Type   | Description                          |
|-----------------|--------|--------------------------------------|
| `Code`          | number | HTTP status code (e.g., `200`, `401`). |
| `ErrorType`     | number | Error type (see [Error Types](#error-types)). |
| `ErrorMessage`  | string | Detailed error message, if any.      |
| `Success`       | boolean| `true` if the request was successful, `false` otherwise. |
| `Data`          | object | Customer object or array of customers. |
| `Total`         | number | Total number of records (for paging). |

## Usage

The `CukCukClient` provides methods to interact with these APIs:
- `customers.create`: Creates a new customer.
- `customers.getPaging`: Retrieves a paginated list of customers.

Below are examples of how to use them.

### Example: Creating a Customer

```typescript
import { CukCukClient } from "cukcuk-api-client";

const client = new CukCukClient({
  secretKey: "your-secret-key",
});

async function createCustomer() {
  try {
    // Authenticate and obtain access token
    const loginResponse = await client.account.login({
      Domain: "your-domain",
      AppId: "your-app-id",
      LoginTime: new Date().toISOString(),
    });

    // Create a new customer
    const customerData = {
      Code: "KH000010",
      Name: "Nguyễn Văn A",
      Tel: "03423546412",
      Birthday: "1998-11-25T00:00:00",
      Address: "Trần Quốc Vượng, Dịch Vọng Hậu, Cầu Giấy, Hà Nội",
      Description: "",
      Inactive: false,
    };

    const createdCustomer = await client.customers.create(customerData);
    if (createdCustomer.Success) {
      console.log("Created Customer:", createdCustomer.Data);
    } else {
      console.error(`Error ${createdCustomer.ErrorType}: ${createdCustomer.ErrorMessage}`);
    }
  } catch (error) {
    console.error("Error creating customer:", error.message);
  }
}

createCustomer();
```

### Example: Fetching Paginated Customers

```typescript
import { CukCukClient } from "cukcuk-api-client";

const client = new CukCukClient({
  secretKey: "your-secret-key",
});

async function fetchCustomers() {
  try {
    // Authenticate and obtain access token
    const loginResponse = await client.account.login({
      Domain: "your-domain",
      AppId: "your-app-id",
      LoginTime: new Date().toISOString(),
    });

    // Fetch paginated customers
    const pagingParams = {
      Page: 1,
      Limit: 50,
      IncludeInactive: true,
      LastSyncDate: "2020-05-04T09:28:55.854Z",
    };

    const customers = await client.customers.getPaging(pagingParams);
    if (customers.Success) {
      console.log("Customers:", customers.Data);
      console.log("Total Customers:", customers.Total);
    } else {
      console.error(`Error ${customers.ErrorType}: ${customers.ErrorMessage}`);
    }
  } catch (error) {
    console.error("Error fetching customers:", error.message);
  }
}

fetchCustomers();
```

### Parameters

#### Customers Create API (`create`)

| Parameter         | Type   | Description                              | Required? |
|-------------------|--------|------------------------------------------|-----------|
| `Code`            | string | Customer code (optional, auto-generated if empty). | No        |
| `Name`            | string | Customer name (required).                | Yes       |
| `Tel`             | string | Phone number (required, must be unique). | Yes       |
| `Address`         | string | Customer address (optional).             | No        |
| `Email`           | string | Email address (optional).                | No        |
| `Description`     | string | Customer notes (optional).               | No        |
| `IdentifyNumber`  | string | ID number (optional).                    | No        |
| `Birthday`        | string | Birth date (ISO 8601, optional).         | No        |
| `Inactive`        | boolean| Inactive status (`false` by default).    | No        |
| `OldNumberCard`   | string | Old card number (optional).              | No        |
| `CardStartDate`   | string | Card issuance date (ISO 8601, optional). | No        |
| `CardExpireDate`  | string | Card expiration date (ISO 8601, optional). | No       |
| `BranchId`        | string | Branch ID (GUID, optional, version 1.1). | No        |
| `OriginalBranchId`| string | Original branch ID (GUID, optional).     | No        |

#### Customers Paging API (`getPaging`)

| Parameter         | Type    | Description                              | Required? |
|-------------------|---------|------------------------------------------|-----------|
| `Page`            | number  | Page number to retrieve (default: 1).    | Yes       |
| `Limit`           | number  | Number of records per page (max 100).    | Yes       |
| `IncludeInactive` | boolean | `true` to include inactive customers.    | No        |
| `LastSyncDate`    | string  | Last synchronization date (ISO 8601).    | No        |

### Headers

All APIs require the following headers, automatically handled by the `CukCukClient`:

| Header          | Description                          | Required? |
|-----------------|--------------------------------------|-----------|
| `Authorization` | Bearer token (e.g., `Bearer <AccessToken>`). | Yes       |
| `CompanyCode`   | Merchant company code (e.g., `demoquanviet`). | Yes       |

### Example Responses

#### Customers Create API (Success)
```json
{
  "Code": 200,
  "Data": [
    {
      "Id": "0f330970-d4e4-47d6-b8bb-bbff89415c21",
      "Code": "KH000010",
      "Name": "Nguyễn Văn A",
      "Tel": "03423546412",
      "Birthday": "1998-11-25T00:00:00",
      "Address": "Trần Quốc Vượng, Dịch Vọng Hậu, Cầu Giấy, Hà Nội",
      "Description": "",
      "Inactive": false
    }
  ],
  "Total": 0,
  "Success": true
}
```

#### Customers Create API (Duplicate Error)
```json
{
  "Code": 200,
  "ErrorType": 200,
  "ErrorMessage": "Mã khách hàng KH000010 hoặc số điện thoại 03423546412 đã tồn tại",
  "Data": [
    {
      "Id": "e7a9139f-5c81-4464-b460-7d892866d6da",
      "Code": "KH000010",
      "Name": "Nguyễn Văn B",
      "Tel": "03423546412",
      "Address": "Trần Quốc Vượng, Dịch Vọng Hậu, Cầu Giấy, Hà Nội",
      "Description": "",
      "Inactive": false
    }
  ],
  "Total": 0,
  "Success": false
}
```

#### Customers Paging API
```json
{
  "Code": 200,
  "Data": [
    {
      "Id": "6cd8a8cd-ac5c-4821-b0dc-8c623fe13bc4",
      "Code": "KH000002",
      "Name": "Nguyễn Văn Dũng",
      "Tel": "03482484567",
      "Birthday": "1995-12-27T00:00:00",
      "Address": "",
      "Description": "",
      "Email": "",
      "Inactive": false
    }
  ],
  "Total": 4,
  "Success": true
}
```

## Error Types

The APIs may return the following error types in the `ServiceResult.ErrorType` field:

| ErrorType | HTTP Code | Description                                                                 |
|-----------|-----------|-----------------------------------------------------------------------------|
| `0`       | 200       | No error.                                                                  |
| `1`       | 200       | Invalid or missing parameters.                                             |
| `2`       | 200       | The `CompanyCode` does not exist.                                          |
| `5`       | 200       | Pagination limit exceeds 100 records (Customers Paging only).              |
| `6`       | 200       | Invalid date/time parameter (outside 01/01/1753 - 31/12/9999).             |
| `7`       | 200       | CukCuk connection is disabled, unable to retrieve data.                    |
| `100`     | 200       | Internal API error.                                                        |
| `102`     | 200       | Request rejected due to a concurrent request of the same type.             |
| `200`     | 200       | Customer code or phone number already exists (Customers Create only).      |
| `-`       | 401       | Access token is expired or invalid; re-authenticate using the Account API.  |

### Handling Errors

Always check the `ServiceResult.Success` field and handle errors appropriately:

```typescript
async function createCustomerWithErrorHandling() {
  try {
    const loginResponse = await client.account.login({
      Domain: "your-domain",
      AppId: "your-app-id",
      LoginTime: new Date().toISOString(),
    });

    const customerData = {
      Code: "KH000010",
      Name: "Nguyễn Văn A",
      Tel: "03423546412",
      Birthday: "1998-11-25T00:00:00",
      Address: "Trần Quốc Vượng, Dịch Vọng Hậu, Cầu Giấy, Hà Nội",
      Inactive: false,
    };

    const result = await client.customers.create(customerData);
    if (result.Success) {
      console.log("Customer created:", result.Data);
    } else if (result.ErrorType === 200) {
      console.error("Duplicate customer:", result.ErrorMessage);
    } else {
      console.error(`Error ${result.ErrorType}: ${result.ErrorMessage}`);
    }
  } catch (error) {
    if (error.response?.status === 401) {
      console.error("Authentication failed. Please re-authenticate.");
      // Trigger re-authentication
    } else {
      console.error("Unexpected error:", error.message);
    }
  }
}

createCustomerWithErrorHandling();
```

## Best Practices

- **Token Management**: Store the `AccessToken` securely and refresh it on HTTP 401 errors.
- **Rate Limiting**: Avoid concurrent requests to prevent `ErrorType: 102`.
- **Validation**: Ensure `Name` and `Tel` are provided for creating customers, and validate `Birthday` dates.
- **Pagination**: Use `Page` and `Limit` wisely for the Customers Paging API, respecting the 100-record limit.
- **Uniqueness**: Check for existing `Code` or `Tel` values to avoid `ErrorType: 200`.
- **Version Consideration**: For version 1.1, include `BranchId` if targeting a specific branch.

## Additional Notes

- The `Birthday`, `CardStartDate`, and `CardExpireDate` must be valid ISO 8601 dates within the range 01/01/1753 to 31/12/9999.
- The `Customers Create API` (version 1.1) supports `BranchId` to specify the branch where the customer is added.
- Use the `Customers Paging API` to verify customer data before creating duplicates.
- Refer to the [Account API Guide](./account-api.md) for authentication details.