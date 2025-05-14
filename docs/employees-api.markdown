# Employees API Guide

This guide explains how to use the CukCuk API Client to interact with the CukCuk OpenPlatform Employees API (`api/v1/employees/paging`). This API allows you to retrieve a paginated list of employees associated with a merchant, with a maximum of 100 records per page.

## Prerequisites

Before using the Employees API, ensure you have:

- **CukCuk API Credentials**: `AppId`, `Domain`, `SecretKey`, and `CompanyCode`. Obtain these from the [CukCuk management portal](https://cukcuk.vn/articles/index.html).
- **Access Token**: Generated via the [Account API](./account-api.md) authentication process.
- Installed the `cukcuk-api-client` package:
  ```bash
  npm install cukcuk-api-client
  ```

## API Overview

### Employees Paging API
- **Endpoint**: `POST https://graphapi.cukcuk.vn/api/v1/employees/paging`
- **Purpose**: Retrieves a paginated list of employees.
- **Max Records**: 100 records per page.
- **Version**: 1.0.

### Employee Object
Each employee in the response has the following properties:

| Property      | Type   | Description                              |
|---------------|--------|------------------------------------------|
| `Id`          | string | Unique identifier (GUID) of the employee. |
| `BranchId`    | string | Branch ID (GUID) associated with the employee. |
| `Code`        | string | Employee code (e.g., `NV000003`).        |
| `FirstName`   | string | Employee's first name.                   |
| `LastName`    | string | Employee's last name.                    |
| `FullName`    | string | Employee's full name.                    |
| `Gender`      | number | Gender (0 - Female, 1 - Male).           |
| `Mobile`      | string | Mobile phone number.                     |
| `HomeTel`     | string | Home phone number.                       |
| `Email`       | string | Email address.                           |
| `IdentifyNumber` | string | ID number.                           |
| `CurrentAddress` | string | Current address.                        |
| `NativeAddress` | string | Native address (hometown).               |
| `RoleCode`    | string | JSON array of role codes (e.g., `["Admin"]`). |

### ServiceResult Object
The API returns a `ServiceResult` object:

| Property        | Type   | Description                          |
|-----------------|--------|--------------------------------------|
| `Code`          | number | HTTP status code (e.g., `200`, `401`). |
| `ErrorType`     | number | Error type (see [Error Types](#error-types)). |
| `ErrorMessage`  | string | Detailed error message, if any.      |
| `Success`       | boolean| `true` if the request was successful, `false` otherwise. |
| `Data`          | object | Array of `Employee` objects.         |
| `Total`         | number | Total number of records.             |

## Usage

The `CukCukClient` provides a method to interact with the Employees API:
- `employees.getPaging`: Retrieves a paginated list of employees.

Below is an example of how to use it.

### Example: Fetching Paginated Employees

```typescript
import { CukCukClient } from "cukcuk-api-client";

const client = new CukCukClient({
  secretKey: "your-secret-key",
});

async function fetchEmployees() {
  try {
    // Authenticate and obtain access token
    const loginResponse = await client.account.login({
      Domain: "your-domain",
      AppId: "your-app-id",
      LoginTime: new Date().toISOString(),
    });

    // Fetch paginated employees
    const pagingParams = {
      Page: 1,
      Limit: 10,
      BranchId: "994c6fe5-da83-441b-a0e8-57a6fed98fb2",
      LastSyncDate: "2020-05-04T09:28:55.854Z",
    };

    const employees = await client.employees.getPaging(pagingParams);
    if (employees.Success) {
      console.log("Employees:", employees.Data);
      console.log("Total Employees:", employees.Total);
    } else {
      console.error(`Error ${employees.ErrorType}: ${employees.ErrorMessage}`);
    }
  } catch (error) {
    console.error("Error fetching employees:", error.message);
  }
}

fetchEmployees();
```

### Parameters

#### Employees Paging API (`getPaging`)

| Parameter       | Type    | Description                              | Required? |
|-----------------|---------|------------------------------------------|-----------|
| `Page`          | number  | Page number to retrieve (default: 1).    | Yes       |
| `Limit`         | number  | Number of records per page (max 100).    | Yes       |
| `BranchId`      | string  | Branch ID (GUID) to filter; `null` for all branches. | No        |
| `LastSyncDate`  | string  | Last synchronization date (ISO 8601).    | No        |

### Headers

The API requires the following headers, automatically handled by the `CukCukClient`:

| Header          | Description                          | Required? |
|-----------------|--------------------------------------|-----------|
| `Authorization` | Bearer token (e.g., `Bearer <AccessToken>`). | Yes       |
| `CompanyCode`   | Merchant company code (e.g., `demoquanviet`). | Yes       |

### Example Response

```json
{
  "Code": 200,
  "Data": [
    {
      "Id": "44d3af84-d86e-443a-a2bd-1a1f07472481",
      "BranchId": "994c6fe5-da83-441b-a0e8-57a6fed98fb2",
      "Code": "NV000003",
      "FirstName": "",
      "LastName": "",
      "FullName": "Hien Thuong",
      "IdentifyNumber": "",
      "Gender": 0,
      "Mobile": "",
      "HomeTel": "",
      "Email": "",
      "NativeAddress": "",
      "CurrentAddress": "",
      "RoleCode": "[\"Admin\"]"
    },
    {
      "Id": "12c271ea-478c-4350-b55d-162d66208838",
      "BranchId": "994c6fe5-da83-441b-a0e8-57a6fed98fb2",
      "Code": "ntdung",
      "FirstName": "",
      "LastName": "Dung Nguyễn",
      "FullName": "Dung Nguyễn",
      "IdentifyNumber": "",
      "Gender": 1,
      "Mobile": "0988665599",
      "HomeTel": "0988665599",
      "Email": "ntdung@gmail.com",
      "NativeAddress": "",
      "CurrentAddress": "",
      "RoleCode": "[\"Admin\"]"
    }
  ],
  "Total": 3,
  "Success": true
}
```

## Error Types

The API may return the following error types in the `ServiceResult.ErrorType` field:

| ErrorType | HTTP Code | Description                                                                 |
|-----------|-----------|-----------------------------------------------------------------------------|
| `0`       | 200       | No error.                                                                  |
| `1`       | 200       | Invalid or missing parameters.                                             |
| `2`       | 200       | The `CompanyCode` does not exist.                                          |
| `5`       | 200       | Pagination limit exceeds 100 records.                                      |
| `7`       | 200       | CukCuk connection is disabled, unable to retrieve data.                    |
| `100`     | 200       | Internal API error.                                                        |
| `102`     | 200       | Request rejected due to a concurrent request of the same type.             |
| `-`       | 401       | Access token is expired or invalid; re-authenticate using the Account API.  |

### Handling Errors

Always check the `ServiceResult.Success` field and handle errors appropriately:

```typescript
async function fetchEmployeesWithErrorHandling() {
  try {
    const loginResponse = await client.account.login({
      Domain: "your-domain",
      AppId: "your-app-id",
      LoginTime: new Date().toISOString(),
    });

    const pagingParams = {
      Page: 1,
      Limit: 10,
      BranchId: "994c6fe5-da83-441b-a0e8-57a6fed98fb2",
      LastSyncDate: "2020-05-04T09:28:55.854Z",
    };

    const employees = await client.employees.getPaging(pagingParams);
    if (employees.Success) {
      console.log("Employees:", employees.Data);
    } else {
      console.error(`Error ${employees.ErrorType}: ${employees.ErrorMessage}`);
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

fetchEmployeesWithErrorHandling();
```

## Best Practices

- **Token Management**: Store the `AccessToken` securely and refresh it on HTTP 401 errors.
- **Rate Limiting**: Avoid sending multiple concurrent requests of the same type to prevent `ErrorType: 102`.
- **Pagination**: Use `Page` and `Limit` wisely, respecting the 100-record limit.
- **Branch Filtering**: Use `BranchId` to filter employees by branch, or set it to `null` for all branches.
- **Error Handling**: Always validate `ServiceResult.Success` and handle specific `ErrorType` values.

## Additional Notes

- The `LastSyncDate` parameter is optional and can be used to fetch employees updated after a specific time.
- The `RoleCode` is returned as a JSON string (e.g., `["Admin"]`) representing the employee's roles.
- For more details on authentication, refer to the [Account API Guide](./account-api.md).