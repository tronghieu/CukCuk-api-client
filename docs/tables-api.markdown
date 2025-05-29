# Tables API Guide

This guide explains how to use the CukCuk API Client to interact with the CukCuk OpenPlatform Tables API (`api/v1/tables/{branchID}`). This API allows you to retrieve a list of tables and their details for a specific branch, including their availability and area information.

## Prerequisites

Before using the Tables API, ensure you have:

- **CukCuk API Credentials**: `AppId`, `Domain`, `SecretKey`, and `CompanyCode`. Obtain these from the [CukCuk management portal](https://cukcuk.vn/articles/index.html).
- **Access Token**: Generated via the [Account API](./account-api.md) authentication process.
- Installed the `cukcuk-api-client` package:
  ```bash
  npm i @luutronghieu/cukcuk-api-client
  ```

## API Overview

### Tables API

- **Endpoint**: `GET https://graphapi.cukcuk.vn/api/v1/tables/{branchID}`
- **Purpose**: Retrieves a list of tables for a specified branch, including their areas and availability.
- **Version**: 1.0.

### BranchTables Object

The response contains a `BranchTables` object with the following properties:

| Property          | Type   | Description                                                          |
| ----------------- | ------ | -------------------------------------------------------------------- |
| `ListTable`       | Array  | List of `MapObject` (tables) in the branch.                          |
| `AllowMergeTable` | number | Indicates if multiple orders are allowed on one table (1 = allowed). |

### MapObject (Table) Object

Each table in the `ListTable` array has the following properties:

| Property        | Type    | Description                                                          |
| --------------- | ------- | -------------------------------------------------------------------- |
| `MapObjectID`   | string  | Unique identifier (GUID) of the table.                               |
| `MapObjectName` | string  | Name of the table (e.g., `3.23`).                                    |
| `AreaID`        | string  | Area ID (GUID) where the table is located.                           |
| `AreaName`      | string  | Name of the area (e.g., `3.2`).                                      |
| `IsAvailable`   | boolean | `true` if the table is available (no one seated), `false` otherwise. |

### ServiceResult Object

The API returns a `ServiceResult` object:

| Property       | Type    | Description                                              |
| -------------- | ------- | -------------------------------------------------------- |
| `Code`         | number  | HTTP status code (e.g., `200`, `401`).                   |
| `ErrorType`    | number  | Error type (see [Error Types](#error-types)).            |
| `ErrorMessage` | string  | Detailed error message, if any.                          |
| `Success`      | boolean | `true` if the request was successful, `false` otherwise. |
| `Data`         | object  | `BranchTables` object.                                   |
| `Total`        | number  | Total number of records (typically `0` for this API).    |

## Usage

The `CukCukClient` provides a method to interact with the Tables API:

- `tables.getByBranch`: Retrieves the list of tables for a specific branch.

Below is an example of how to use it.

### Example: Fetching Tables by Branch

```typescript
import { CukCukClient } from "cukcuk-api-client";

const client = new CukCukClient({
  secretKey: "your-secret-key",
});

async function fetchTables() {
  try {
    // Authenticate and obtain access token
    const loginResponse = await client.account.login({
      Domain: "your-domain",
      AppId: "your-app-id",
      LoginTime: new Date().toISOString(),
    });

    // Fetch tables for a specific branch
    const branchId = "f7a8b9c2-3d4e-5f67-8901-a23b4c5d6e7f";
    const tablesResponse = await client.tables.getByBranch(branchId);
    if (tablesResponse.Success) {
      console.log("Tables:", tablesResponse.Data.ListTable);
      console.log("Allow Merge Table:", tablesResponse.Data.AllowMergeTable);
    } else {
      console.error(
        `Error ${tablesResponse.ErrorType}: ${tablesResponse.ErrorMessage}`
      );
    }
  } catch (error) {
    console.error("Error fetching tables:", error.message);
  }
}

fetchTables();
```

### Parameters

#### Tables API (`getByBranch`)

| Parameter  | Type   | Description                              | Required? |
| ---------- | ------ | ---------------------------------------- | --------- |
| `branchId` | string | Branch ID (GUID) to retrieve tables for. | Yes       |

### Headers

The API requires the following headers, automatically handled by the `CukCukClient`:

| Header          | Description                                   | Required? |
| --------------- | --------------------------------------------- | --------- |
| `Authorization` | Bearer token (e.g., `Bearer <AccessToken>`).  | Yes       |
| `CompanyCode`   | Merchant company code (e.g., `demoquanviet`). | Yes       |

### Example Response

```json
{
  "Code": 200,
  "Data": {
    "ListTable": [
      {
        "MapObjectID": "4a541005-1225-4cf4-8134-08ff0bbc395d",
        "MapObjectName": "3.23",
        "AreaID": "58c212a2-ec62-48a9-8fbd-128fe9d2be56",
        "AreaName": "3.2",
        "IsAvailable": true
      },
      {
        "MapObjectID": "989f288c-5c95-4161-b6b4-1840e786639b",
        "MapObjectName": "10",
        "AreaID": "ca198144-bac1-40e8-b908-2027a19931bd",
        "AreaName": "2",
        "IsAvailable": true
      },
      {
        "MapObjectID": "7baa9b03-6a2c-4d17-a1ae-07a5361655cc",
        "MapObjectName": "3.13",
        "AreaID": "3528688d-5efe-4c0f-8df6-2131dd7f06fd",
        "AreaName": "3.1",
        "IsAvailable": true
      }
    ],
    "AllowMergeTable": 1
  },
  "Total": 0,
  "Success": true
}
```

## Error Types

The API may return the following error types in the `ServiceResult.ErrorType` field:

| ErrorType | HTTP Code | Description                                                                |
| --------- | --------- | -------------------------------------------------------------------------- |
| `0`       | 200       | No error.                                                                  |
| `1`       | 200       | Invalid or missing parameters.                                             |
| `2`       | 200       | The `CompanyCode` does not exist.                                          |
| `5`       | 200       | Pagination limit exceeds 100 records (not applicable for this API).        |
| `6`       | 200       | Invalid date/time parameter (not applicable for this API).                 |
| `7`       | 200       | CukCuk connection is disabled, unable to retrieve data.                    |
| `100`     | 200       | Internal API error.                                                        |
| `102`     | 200       | Request rejected due to a concurrent request of the same type.             |
| `-`       | 401       | Access token is expired or invalid; re-authenticate using the Account API. |

### Handling Errors

Always check the `ServiceResult.Success` field and handle errors appropriately:

```typescript
async function fetchTablesWithErrorHandling() {
  try {
    const loginResponse = await client.account.login({
      Domain: "your-domain",
      AppId: "your-app-id",
      LoginTime: new Date().toISOString(),
    });

    const branchId = "f7a8b9c2-3d4e-5f67-8901-a23b4c5d6e7f";
    const tablesResponse = await client.tables.getByBranch(branchId);
    if (tablesResponse.Success) {
      console.log("Tables:", tablesResponse.Data.ListTable);
    } else {
      console.error(
        `Error ${tablesResponse.ErrorType}: ${tablesResponse.ErrorMessage}`
      );
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

fetchTablesWithErrorHandling();
```

## Best Practices

- **Token Management**: Store the `AccessToken` securely and refresh it on HTTP 401 errors.
- **Rate Limiting**: Avoid sending multiple concurrent requests of the same type to prevent `ErrorType: 102`.
- **Availability Check**: Use the `IsAvailable` field to determine if a table is free for seating.
- **Offline Note**: For offline restaurant models, table availability (`IsAvailable`) may not be real-time due to delayed synchronization; plan accordingly.
- **Error Handling**: Always validate `ServiceResult.Success` and handle specific `ErrorType` values.

## Additional Notes

- The `AllowMergeTable` field indicates whether the branch allows multiple orders on a single table (1 = allowed).
- Tables are grouped by areas (e.g., `3.1`, `3.2`), which can be useful for organizing seating arrangements.
- For offline restaurant models, be cautious of the `IsAvailable` field due to potential synchronization delays.
- For more details on authentication, refer to the [Account API Guide](./account-api.md).
