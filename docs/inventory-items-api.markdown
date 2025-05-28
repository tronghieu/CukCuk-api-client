# Inventory Items API Guide

This guide explains how to use the CukCuk API Client to interact with the CukCuk OpenPlatform Inventory Items APIs. These APIs allow you to retrieve a paginated list of inventory items (`api/v1/inventoryitems/paging`) and fetch detailed information for a specific item (`api/v1/inventoryitems/detail/{inventoryItemId}`).

## Prerequisites

Before using the Inventory Items APIs, ensure you have:

- **CukCuk API Credentials**: `AppId`, `Domain`, `SecretKey`, and `CompanyCode`. Obtain these from the [CukCuk management portal](https://cukcuk.vn/articles/index.html).
- **Access Token**: Generated via the [Account API](./account-api.md) authentication process.
- Installed the `cukcuk-api-client` package:
  ```bash
  npm install cukcuk-api-client
  ```

## API Overview

### Inventory Items Paging API

- **Endpoint**: `POST https://graphapi.cukcuk.vn/api/v1/inventoryitems/paging`
- **Purpose**: Retrieves a paginated list of inventory items (menu items).
- **Max Records**: 100 records per page.
- **Version**: 1.0.

### Inventory Items Detail API

- **Endpoint**: `GET https://graphapi.cukcuk.vn/api/v1/inventoryitems/detail/{inventoryItemId}`
- **Purpose**: Fetches detailed information for a specific inventory item by its ID.
- **Version**: 1.0.

### InventoryItem Object

Each inventory item in the response has the following properties:

| Property             | Type    | Description                                    |
| -------------------- | ------- | ---------------------------------------------- |
| `Id`                 | string  | Unique identifier (GUID) of the item.          |
| `Code`               | string  | Item code (e.g., `TRADA`).                     |
| `ItemType`           | number  | Item type (see [Item Types](#item-types)).     |
| `Name`               | string  | Item name (e.g., `Trà đá`).                    |
| `CategoryID`         | string  | Category ID (GUID).                            |
| `CategoryName`       | string  | Category name (e.g., `Trà`).                   |
| `Price`              | number  | Selling price (e.g., `2000.0`).                |
| `Inactive`           | boolean | `true` if inactive, `false` if active.         |
| `UnitId`             | string  | Unit ID (GUID).                                |
| `UnitName`           | string  | Unit name (e.g., `Cốc`).                       |
| `Description`        | string  | Item description (optional).                   |
| `IsSeftPrice`        | boolean | `true` if price varies by market.              |
| `AllowAdjustPrice`   | boolean | `true` if price can be adjusted.               |
| `Children`           | Array   | List of component items (Detail API only).     |
| `AdditionCategories` | Array   | List of serving preferences (Detail API only). |

### Item Types

The `ItemType` field indicates the type of inventory item:

| Value | Type               |
| ----- | ------------------ |
| 1     | Dish               |
| 2     | Dish by ingredient |
| 3     | Dish by group      |
| 4     | Combo              |
| 5     | Bottled drink      |
| 6     | Prepared drink     |
| 7     | Other item         |
| 8     | Raw material       |
| 10    | Drink by group     |
| 12    | Customizable combo |

### ServiceResult Object

The API returns a `ServiceResult` object:

| Property       | Type    | Description                                              |
| -------------- | ------- | -------------------------------------------------------- |
| `Code`         | number  | HTTP status code (e.g., `200`, `401`).                   |
| `ErrorType`    | number  | Error type (see [Error Types](#error-types)).            |
| `ErrorMessage` | string  | Detailed error message, if any.                          |
| `Success`      | boolean | `true` if the request was successful, `false` otherwise. |
| `Data`         | object  | Inventory item(s) data.                                  |
| `Total`        | number  | Total number of records (for paging).                    |

## Usage

The `CukCukClient` provides methods to interact with these APIs:

- `inventoryItems.getPaging`: Retrieves a paginated list of inventory items.
- `inventoryItems.getDetail`: Fetches details for a specific inventory item.

Below are examples of how to use them.

### Example: Fetching Paginated Inventory Items

```typescript
import { CukCukClient } from "cukcuk-api-client";

const client = new CukCukClient({
  secretKey: "your-secret-key",
});

async function fetchInventoryItems() {
  try {
    // Authenticate and obtain access token
    const loginResponse = await client.account.login({
      Domain: "your-domain",
      AppId: "your-app-id",
      LoginTime: new Date().toISOString(),
    });

    // Fetch paginated inventory items
    const pagingParams = {
      Page: 1,
      Limit: 10,
      BranchId: "f7a8b9c2-3d4e-5f67-8901-a23b4c5d6e7f",
      CategoryId: "",
      KeySearch: "Trà",
      IncludeInactive: true,
    };

    const items = await client.inventoryItems.getPaging(pagingParams);
    if (items.Success) {
      console.log("Inventory Items:", items.Data);
      console.log("Total Items:", items.Total);
    } else {
      console.error(`Error ${items.ErrorType}: ${items.ErrorMessage}`);
    }
  } catch (error) {
    console.error("Error fetching inventory items:", error.message);
  }
}

fetchInventoryItems();
```

### Example: Fetching Inventory Item Details

```typescript
import { CukCukClient } from "cukcuk-api-client";

const client = new CukCukClient({
  secretKey: "your-secret-key",
});

async function fetchItemDetails() {
  try {
    // Authenticate and obtain access token
    const loginResponse = await client.account.login({
      Domain: "your-domain",
      AppId: "your-app-id",
      LoginTime: new Date().toISOString(),
    });

    // Fetch details for a specific inventory item
    const itemId = "f3ad8d97-cc7f-4e1b-8187-06d760ef7d27";
    const itemDetails = await client.inventoryItems.getDetail(itemId);
    if (itemDetails.Success) {
      console.log("Item Details:", itemDetails.Data);
    } else {
      console.error(
        `Error ${itemDetails.ErrorType}: ${itemDetails.ErrorMessage}`
      );
    }
  } catch (error) {
    console.error("Error fetching item details:", error.message);
  }
}

fetchItemDetails();
```

### Parameters

#### Inventory Items Paging API (`getPaging`)

| Parameter         | Type    | Description                             | Required? |
| ----------------- | ------- | --------------------------------------- | --------- |
| `Page`            | number  | Page number to retrieve (default: 1).   | Yes       |
| `Limit`           | number  | Number of records per page (max 100).   | Yes       |
| `BranchId`        | string  | Branch ID (GUID) to filter; optional.   | No        |
| `CategoryId`      | string  | Category ID (GUID) to filter; optional. | No        |
| `KeySearch`       | string  | Search keyword (e.g., `Trà`).           | No        |
| `IncludeInactive` | boolean | `true` to include inactive items.       | No        |

#### Inventory Items Detail API (`getDetail`)

| Parameter         | Type   | Description                 | Required? |
| ----------------- | ------ | --------------------------- | --------- |
| `inventoryItemId` | string | Item ID (GUID) to retrieve. | Yes       |

### Headers

All APIs require the following headers, automatically handled by the `CukCukClient`:

| Header          | Description                                   | Required? |
| --------------- | --------------------------------------------- | --------- |
| `Authorization` | Bearer token (e.g., `Bearer <AccessToken>`).  | Yes       |
| `CompanyCode`   | Merchant company code (e.g., `demoquanviet`). | Yes       |

### Example Responses

#### Inventory Items Paging API

```json
{
  "Code": 200,
  "Data": [
    {
      "Id": "05b43f96-6cc4-4ff3-acf1-402952d70331",
      "Code": "KHONGDO",
      "ItemType": 5,
      "Name": "Trà xanh không độ",
      "CategoryID": "dcdd1e90-690d-4ca5-8139-b4406d673c71",
      "CategoryName": "Đồ uống đóng chai",
      "Price": 15000.0,
      "Inactive": false,
      "UnitID": "8ade72e5-5735-4dd2-be2f-de056b8e2a90",
      "UnitName": "Chai",
      "Description": "",
      "IsSeftPrice": false,
      "AllowAdjustPrice": false
    },
    {
      "Id": "f3ad8d97-cc7f-4e1b-8187-06d760ef7d27",
      "Code": "TRADA",
      "ItemType": 6,
      "Name": "Trà đá",
      "CategoryID": "4b5d63ef-e8ba-4198-b34f-92979447c3fc",
      "CategoryName": "Trà",
      "Price": 2000.0,
      "Inactive": false,
      "UnitID": "47817d1f-c393-4a4c-af57-0d7fe3f29c5f",
      "UnitName": "Cốc",
      "Description": "",
      "IsSeftPrice": false,
      "AllowAdjustPrice": false
    }
  ],
  "Total": 2,
  "Success": true
}
```

#### Inventory Items Detail API

```json
{
  "Code": 200,
  "Data": {
    "Id": "f3ad8d97-cc7f-4e1b-8187-06d760ef7d27",
    "Children": [],
    "AdditionCategories": [
      {
        "Additions": [
          {
            "AdditionId": "18baca13-67e7-4148-b572-98bab323a07f",
            "Description": "Cốc to",
            "Price": 3000.0,
            "InActive": false
          }
        ]
      }
    ],
    "Code": "TRADA",
    "ItemType": 6,
    "Name": "Trà đá",
    "CategoryID": "4b5d63ef-e8ba-4198-b34f-92979447c3fc",
    "CategoryName": "Trà",
    "Price": 2000.0,
    "Inactive": false,
    "UnitID": "47817d1f-c393-4a4c-af57-0d7fe3f29c5f",
    "UnitName": "Cốc",
    "Description": "",
    "IsSeftPrice": false,
    "AllowAdjustPrice": false
  },
  "Total": 0,
  "Success": true
}
```

## Error Types

The APIs may return the following error types in the `ServiceResult.ErrorType` field:

| ErrorType | HTTP Code | Description                                                                |
| --------- | --------- | -------------------------------------------------------------------------- |
| `0`       | 200       | No error.                                                                  |
| `1`       | 200       | Invalid or missing parameters.                                             |
| `2`       | 200       | The `CompanyCode` does not exist.                                          |
| `5`       | 200       | Pagination limit exceeds 100 records (Paging API only).                    |
| `7`       | 200       | CukCuk connection is disabled, unable to retrieve data.                    |
| `100`     | 200       | Internal API error.                                                        |
| `102`     | 200       | Request rejected due to a concurrent request of the same type.             |
| `-`       | 401       | Access token is expired or invalid; re-authenticate using the Account API. |

### Handling Errors

Always check the `ServiceResult.Success` field and handle errors appropriately:

```typescript
async function fetchInventoryItemsWithErrorHandling() {
  try {
    const loginResponse = await client.account.login({
      Domain: "your-domain",
      AppId: "your-app-id",
      LoginTime: new Date().toISOString(),
    });

    const pagingParams = {
      Page: 1,
      Limit: 10,
      BranchId: "f7a8b9c2-3d4e-5f67-8901-a23b4c5d6e7f",
      CategoryId: "",
      KeySearch: "Trà",
      IncludeInactive: true,
    };

    const items = await client.inventoryItems.getPaging(pagingParams);
    if (items.Success) {
      console.log("Inventory Items:", items.Data);
    } else {
      console.error(`Error ${items.ErrorType}: ${items.ErrorMessage}`);
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

fetchInventoryItemsWithErrorHandling();
```

## Best Practices

- **Token Management**: Store the `AccessToken` securely and refresh it on HTTP 401 errors.
- **Rate Limiting**: Avoid sending multiple concurrent requests of the same type to prevent `ErrorType: 102`.
- **Pagination**: Use `Page` and `Limit` wisely for the Paging API, respecting the 100-record limit.
- **Filtering**: Use `CategoryId` and `KeySearch` to narrow down results efficiently.
- **Detail API Usage**: Use the Detail API after fetching a list to get additional information like `AdditionCategories`.
- **Error Handling**: Always validate `ServiceResult.Success` and handle specific `ErrorType` values.

## Additional Notes

- The `AdditionCategories` field in the Detail API provides serving preferences (e.g., "Cốc to" with an additional price of 3000).
- Use the [Categories API](./categories-api.md) to retrieve `CategoryId` values for filtering in the Paging API.
- The `Children` field in the Detail API is useful for items like combos that have component items.
- For more details on authentication, refer to the [Account API Guide](./account-api.md).
