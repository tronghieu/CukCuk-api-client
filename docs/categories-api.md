# Categories API Guide

This guide explains how to use the CukCuk API Client to interact with the CukCuk OpenPlatform Categories API (`api/v1/categories/list`). This API allows you to retrieve a flat list of menu category groups (e.g., "Cơm suất", "Đồ uống đóng chai") associated with a merchant.

## Prerequisites

Before using the Categories API, ensure you have:

- **CukCuk API Credentials**: `AppId`, `Domain`, `SecretKey`, and `CompanyCode`. Obtain these from the [CukCuk management portal](https://cukcuk.vn/articles/index.html).
- **Access Token**: Generated via the [Account API](./account-api.md) authentication process.
- Installed the `cukcuk-api-client` package:
  ```bash
  npm i @luutronghieu/cukcuk-api-client
  ```

## API Overview

### Categories List API

- **Endpoint**: `GET https://graphapi.cukcuk.vn/api/v1/categories/list?includeInactive={true|false}`
- **Purpose**: Retrieves a flat list of menu categories.
- **Authentication**: Requires `Authorization` and `CompanyCode` headers.

### InventoryItemCategory Object

Each category in the response has the following properties:

| Property      | Type    | Description                                                        |
| ------------- | ------- | ------------------------------------------------------------------ |
| `Id`          | string  | Unique identifier (GUID) of the category.                          |
| `Code`        | string  | Code of the category (e.g., `COMSUAT`).                            |
| `Name`        | string  | Name of the category (e.g., `Cơm suất`).                           |
| `Description` | string  | Description of the category (e.g., `Cơm`).                         |
| `IsLeaf`      | boolean | `true` if the category is a leaf node, `false` if it's a parent.   |
| `Grade`       | number  | Hierarchy level of the category (1 to 9, e.g., `1` for top-level). |
| `Inactive`    | boolean | `true` if the category is inactive, `false` if active.             |

### ServiceResult Object

The API returns a `ServiceResult` object:

| Property       | Type    | Description                                              |
| -------------- | ------- | -------------------------------------------------------- |
| `Code`         | number  | HTTP status code (e.g., `200`, `401`).                   |
| `ErrorType`    | number  | Error type (see [Error Types](#error-types)).            |
| `ErrorMessage` | string  | Detailed error message, if any.                          |
| `Success`      | boolean | `true` if the request was successful, `false` otherwise. |
| `Data`         | object  | Array of `InventoryItemCategory` objects.                |
| `Total`        | number  | Total number of records (typically `0` for this API).    |

## Usage

The `CukCukClient` provides a method to interact with the Categories API:

- `categories.getList`: Fetches the list of categories.

Below is an example of how to use it.

### Example: Fetching Categories

```typescript
import { CukCukClient } from "cukcuk-api-client";

const client = new CukCukClient({
  secretKey: "your-secret-key",
});

async function fetchCategories() {
  try {
    // Authenticate and obtain access token
    const loginResponse = await client.account.login({
      Domain: "your-domain",
      AppId: "your-app-id",
      LoginTime: new Date().toISOString(),
    });

    // Fetch categories, including inactive ones
    const categories = await client.categories.getList({
      includeInactive: true,
    });
    console.log("Categories:", categories.Data);
  } catch (error) {
    console.error("Error fetching categories:", error.message);
  }
}

fetchCategories();
```

### Parameters

#### Categories List API (`getList`)

| Parameter         | Type    | Description                                   | Required? |
| ----------------- | ------- | --------------------------------------------- | --------- |
| `includeInactive` | boolean | Set to `true` to include inactive categories. | No        |

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
  "Data": [
    {
      "Id": "73d8687e-aaf5-4e26-bb15-14d1ef9c6e50",
      "Code": "COMSUAT",
      "Name": "Cơm suất",
      "Description": "Cơm",
      "IsLeaf": false,
      "Grade": 1,
      "Inactive": false
    },
    {
      "Id": "dcdd1e90-690d-4ca5-8139-b4406d673c71",
      "Code": "DOUONGDONGCHAI",
      "Name": "Đồ uống đóng chai",
      "Description": "Đồ uống đóng chai",
      "IsLeaf": false,
      "Grade": 1,
      "Inactive": false
    }
  ],
  "Total": 0,
  "Success": true
}
```

## Error Types

The API may return the following error types in the `ServiceResult.ErrorType` field:

| ErrorType | HTTP Code | Description                                                                |
| --------- | --------- | -------------------------------------------------------------------------- |
| `0`       | 200       | No error.                                                                  |
| `2`       | 200       | The `CompanyCode` does not exist.                                          |
| `7`       | 200       | CukCuk connection is disabled, unable to retrieve data.                    |
| `100`     | 200       | Internal API error.                                                        |
| `102`     | 200       | Request rejected due to a concurrent request of the same type.             |
| `-`       | 401       | Access token is expired or invalid; re-authenticate using the Account API. |

### Handling Errors

Always check the `ServiceResult.Success` field and handle errors appropriately:

```typescript
async function fetchCategoriesWithErrorHandling() {
  try {
    const loginResponse = await client.account.login({
      Domain: "your-domain",
      AppId: "your-app-id",
      LoginTime: new Date().toISOString(),
    });

    const categories = await client.categories.getList({
      includeInactive: true,
    });
    if (!categories.Success) {
      console.error(
        `Error ${categories.ErrorType}: ${categories.ErrorMessage}`
      );
      return;
    }

    console.log("Categories:", categories.Data);
  } catch (error) {
    if (error.response?.status === 401) {
      console.error("Authentication failed. Please re-authenticate.");
      // Trigger re-authentication
    } else {
      console.error("Unexpected error:", error.message);
    }
  }
}

fetchCategoriesWithErrorHandling();
```

## Best Practices

- **Token Management**: Store the `AccessToken` securely and refresh it when it expires (HTTP 401 error).
- **Rate Limiting**: Avoid sending multiple concurrent requests of the same type to prevent `ErrorType: 102`.
- **Error Handling**: Always validate `ServiceResult.Success` and handle specific `ErrorType` values.
- **Type Safety**: Use TypeScript interfaces provided by the library for type-safe responses.
- **Filtering Inactive Categories**: Use the `includeInactive` parameter to decide whether to fetch inactive categories based on your use case.

## Additional Notes

- The `includeInactive` parameter is optional and defaults to `false`. Set it to `true` to retrieve inactive categories.
- Categories are returned as a flat list, with the `Grade` property indicating their hierarchy level.
- If you encounter persistent errors (e.g., `ErrorType: 100`), contact CukCuk support or check the [official documentation](https://cukcuk.vn).

For more details on authentication, refer to the [Account API Guide](./account-api.md).
