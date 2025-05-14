# Orders API Guide

This guide explains how to use the CukCuk API Client to interact with the CukCuk OpenPlatform Orders APIs. These APIs allow you to retrieve a paginated list of orders (`api/v1/orders/paging`), create new orders (`api/v1/orders/create`), fetch order details (`api/v1/orders/{orderId}`), and update order items (`api/v1/orders/update-item`).

## Prerequisites

Before using the Orders APIs, ensure you have:

- **CukCuk API Credentials**: `AppID`, `Domain`, `SecretKey`, and `CompanyCode`. Obtain these from the [CukCuk management portal](https://cukcuk.vn/articles/index.html).
- **Access Token**: Generated via the [Account API](./account-api.md) authentication process.
- Installed the `cukcuk-api-client` package:
  ```bash
  npm install cukcuk-api-client
  ```

## API Overview

### Orders Paging API (`api/v1/orders/paging`)

- **Endpoint**: `POST https://graphapi.cukcuk.vn/api/v1/orders/paging`
- **Purpose**: Retrieves a paginated list of orders for a specific branch or all branches.
- **Max Records**: 100 records per page.

### Orders Create API (`api/v1/orders/create`)

- **Endpoint**: `POST https://graphapi.cukcuk.vn/api/v1/orders/create`
- **Purpose**: Creates a new order with specified details and items.

### Orders Detail API (`api/v1/orders/{orderId}`)

- **Endpoint**: `GET https://graphapi.cukcuk.vn/api/v1/orders/{orderId}`
- **Purpose**: Fetches detailed information for a specific order by its ID.

### Orders Update Items API (`api/v1/orders/update-item`)

- **Endpoint**: `POST https://graphapi.cukcuk.vn/api/v1/orders/update-item`
- **Purpose**: Updates the list of items for an existing order.

## Usage

The `CukCukClient` provides methods to interact with these APIs. Below are examples for each.

### Example: Fetching Paginated Orders

```typescript
import { CukCukClient } from "cukcuk-api-client";

const client = new CukCukClient({
  secretKey: "your-secret-key",
});

async function fetchOrders() {
  try {
    const loginResponse = await client.account.login({
      Somain: "your-domain",
      AppID: "your-app-id",
      LoginTime: new Date().toISOString(),
    });

    const pagingParams = {
      Page: 1,
      Limit: 10,
      BranchId: "994c6fe5-da83-441b-a0e8-57a6fed98fb2",
      LastSyncDate: "2020-05-04T09:28:55.854Z",
    };

    const orders = await client.orders.getPaging(pagingParams);
    console.log("Orders:", orders.Data);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
  }
}

fetchOrders();
```

### Example: Creating an Order

```typescript
import { CukCukClient } from "cukcuk-api-client";

const client = new CukCukClient({
  secretKey: "your-secret-key",
});

async function createOrder() {
  try {
    const loginResponse = await client.account.login({
      Domain: "your-domain",
      AppID: "your-app-id",
      LoginTime: new Date().toISOString(),
    });

    const orderData = {
      Id: "832aea39-6b36-4473-8458-1396c4f36c75",
      Type: 3,
      No: "2.16",
      BranchId: "994c6fe5-da83-441b-a0e8-57a6fed98fb2",
      Date: new Date().toISOString(),
      ShippingDate: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
      CustomerId: "8dc32aa6-4d59-4a8f-96be-427ae6fee1b4",
      CustomerName: "sample string 3",
      CustomerTel: "sample string 4",
      ShippingAddress: "ha noi",
      RequestDescription: "yeu ca gui bep/bar",
      OrderDetails: [
        {
          ItemId: "80F0FBFD-EA80-4857-BED6-75EBA359179A",
          ItemName: "Cá lóc chiên xù",
          UnitId: "CC09CE6E-33FF-455D-A421-7E2C1060A8F5123",
          UnitName: "Con",
          Quantity: 9.0,
          Status: 1,
          Price: 10000.0,
        },
      ],
      ListTableID: [
        "F8DE056E-28AF-43F3-B7A1-728D7E4980AD",
        "DF56E7E8-7D4E-4937-976F-59AD03E0BB97",
      ],
    };

    const createdOrder = await client.orders.create(orderData);
    console.log("Created Order:", createdOrder.Data);
  } catch (error) {
    console.error("Error creating order:", error.message);
  }
}

createOrder();
```

### Example: Fetching Order Details

```typescript
import { CukCukClient } from "cukcuk-api-client";

const client = new CukCukClient({
  secretKey: "your-secret-key",
});

async function getOrderDetails() {
  try {
    const loginResponse = await client.account.login({
      Domain: "your-domain",
      AppID: "your-app-id",
      LoginTime: new Date().toISOString(),
    });

    const orderId = "cbfeea95-6996-4b86-9f7b-915b3217726f";
    const orderDetails = await client.orders.getDetail(orderId);
    console.log("Order Details:", orderDetails.Data);
  } catch (error) {
    console.error("Error fetching order details:", error.message);
  }
}

getOrderDetails();
```

### Example: Updating Order Items

```typescript
import { CukCukClient } from "cukcuk-api-client";

const client = new CukCukClient({
  secretKey: "your-secret-key",
});

async function updateOrderItems() {
  try {
    const loginResponse = await client.account.login({
      Domain: "your-domain",
      AppID: "your-app-id",
      LoginTime: new Date().toISOString(),
    });

    const updateData = {
      Id: "832aea39-6b36-4473-8458-1396c4f36c75",
      BranchId: "994c6fe5-da83-441b-a0e8-57a6fed98fb2",
      OrderDetails: [
        {
          ItemId: "80F0FBFD-EA80-4857-BED6-75EBA359179A",
          ItemName: "Aquafina",
          UnitId: "CC09CE6E-33FF-455D-A421-7E2C1060A8F5123",
          UnitName: "Chai",
          Quantity: 9.0,
          Price: 10000.0,
          Amount: 20000.0,
        },
      ],
    };

    const updatedOrder = await client.orders.updateItems(updateData);
    console.log("Updated Order:", updatedOrder.Data);
  } catch (error) {
    console.error("Error updating order items:", error.message);
  }
}

updateOrderItems();
```

## Parameters

### Orders Paging API (`getPaging`)

| Parameter      | Type   | Description                                          | Required? |
| -------------- | ------ | ---------------------------------------------------- | --------- |
| `Page`         | number | Page number to retrieve (default: 1).                | Yes       |
| `Limit`        | number | Number of records per page (max 100).                | Yes       |
| `BranchId`     | string | Branch ID to filter (GUID, `null` for all branches). | No        |
| `LastSyncDate` | string | Last synchronization date (ISO 8601 format).         | No        |

### Orders Create API (`create`)

| Parameter         | Type               | Description                                                                | Required? |
| ----------------- | ------------------ | -------------------------------------------------------------------------- | --------- |
| `Id`              | string             | Order ID (GUID, auto-generated if empty).                                  | No        |
| `BranchId`        | string             | Branch ID (GUID, required).                                                | Yes       |
| `Type`            | number             | Order type (1: On-site, 2: Take-away, 3: Delivery).                        | Yes       |
| `No`              | string             | Order number (auto-generated if empty).                                    | No        |
| `CustomerId`      | string             | Customer ID (GUID, optional if `CustomerName` and `CustomerTel` provided). | No        |
| `CustomerName`    | string             | Customer name (required if no `CustomerId`).                               | No        |
| `CustomerTel`     | string             | Customer phone (required if no `CustomerId`).                              | No        |
| `ShippingDate`    | string             | Delivery date (ISO 8601, required for delivery orders).                    | No        |
| `ShippingAddress` | string             | Delivery address (required for delivery orders).                           | No        |
| `OrderDetails`    | Array<OrderDetail> | List of order items (required, at least one item).                         | Yes       |
| `ListTableID`     | Array<string>      | List of table IDs (optional).                                              | No        |

### Orders Detail API (`getDetail`)

| Parameter | Type   | Description                  | Required? |
| --------- | ------ | ---------------------------- | --------- |
| `orderId` | string | Order ID (GUID) to retrieve. | Yes       |

### Orders Update Items API (`updateItems`)

| Parameter      | Type               | Description                                                | Required? |
| -------------- | ------------------ | ---------------------------------------------------------- | --------- |
| `Id`           | string             | Order ID (GUID, required).                                 | Yes       |
| `BranchId`     | string             | Branch ID (GUID, required).                                | Yes       |
| `OrderDetails` | Array<OrderDetail> | Updated list of order items (required, at least one item). | Yes       |

## Headers

All APIs require the following headers, automatically handled by the `CukCukClient`:
| Header | Description | Required? |
|-----------------|--------------------------------------|-----------|
| `Authorization` | Bearer token (e.g., `Bearer <AccessToken>`). | Yes |
| `CompanyCode` | Merchant company code (e.g., `demoquanviet`). | Yes |

## Example Responses

### Orders Paging API

```json
{
  "Code": 200,
  "Data": [
    {
      "Id": "cbfeea95-6996-4b86-9f7b-915b3217726f",
      "Type": 3,
      "No": "1.2",
      "BranchId": "994c6fe5-da83-441b-a0e8-57a6fed98fb2",
      "Status": 4,
      "Date": "2020-07-29T11:06:16.837",
      "ShippingDate": "2020-07-29T11:36:05",
      "CustomerId": "c93d3f20-45b5-4428-9c4a-ae37d212555c",
      "CustomerName": "Nguyễn Đức Công",
      "CustomerTel": "0344322228",
      "ShippingAddress": "63 Trần Quốc Vượng, Dịch Vọng Hậu, Cầu Giấy, Hà Nội",
      "DeliveryAmount": 0.0,
      "DepositAmount": 0.0,
      "TotalAmount": 5000.0
    }
  ],
  "Total": 0,
  "Success": true
}
```

### Orders Create API

```json
{
  "Code": 200,
  "Data": {
    "Id": "832aea39-6b36-4473-8458-1396c4f36c75",
    "Type": 3,
    "No": "2.16",
    "BranchId": "994c6fe5-da83-441b-a0e8-57a6fed98fb2",
    "Status": 9,
    "Date": "2022-03-29T09:35:53.273+07:00",
    "ShippingDate": "2022-03-29T14:06:01.647+07:00",
    "CustomerId": "8dc32aa6-4d59-4a8f-96be-427ae6fee1b4",
    "CustomerName": "sample string 3",
    "CustomerTel": "sample string 4",
    "DeliveryAmount": 10000.0,
    "DepositAmount": 8.0,
    "TotalAmount": 910000.0,
    "OrderDetails": [
      {
        "ItemName": "Cá lóc chiên xù",
        "Quantity": 9.0,
        "Price": 100000.0,
        "Amount": 900000.0
      }
    ]
  },
  "Total": 0,
  "Success": true
}
```

### Orders Detail API

```json
{
  "Code": 200,
  "Data": {
    "Id": "cbfeea95-6996-4b86-9f7b-915b3217726f",
    "Type": 3,
    "No": "1.2",
    "BranchId": "994c6fe5-da83-441b-a0e8-57a6fed98fb2",
    "Status": 4,
    "Date": "2020-07-29T11:06:16.837",
    "ShippingDate": "2020-07-29T11:36:05",
    "CustomerId": "c93d3f20-45b5-4428-9c4a-ae37d212555c",
    "CustomerName": "Nguyễn Đức Công",
    "CustomerTel": "0344322228",
    "ShippingAddress": "63 Trần Quốc Vượng, Dịch Vọng Hậu, Cầu Giấy, Hà Nội",
    "DeliveryAmount": 0.0,
    "DepositAmount": 0.0,
    "TotalAmount": 5000.0,
    "OrderDetails": [
      {
        "ItemName": "Trà đá",
        "Quantity": 1.0,
        "Price": 2000.0,
        "Amount": 2000.0
      }
    ]
  },
  "Total": 0,
  "Success": true
}
```

### Orders Update Items API

```json
{
  "Code": 200,
  "Data": {
    "Id": "832aea39-6b36-4473-8458-1396c4f36c75",
    "Type": 3,
    "No": "2.16",
    "BranchId": "994c6fe5-da83-441b-a0e8-57a6fed98fb2",
    "Status": 9,
    "Date": "2022-03-29T09:35:53.273+07:00",
    "ShippingDate": "2022-03-29T14:06:01.647+07:00",
    "CustomerId": "8dc32aa6-4d59-4a8f-96be-427ae6fee1b4",
    "CustomerName": "sample string 3",
    "CustomerTel": "sample string 4",
    "DeliveryAmount": 10000.0,
    "DepositAmount": 8.0,
    "TotalAmount": 910000.0,
    "OrderDetails": [
      {
        "ItemName": "Aquafina",
        "Quantity": 9.0,
        "Price": 10000.0,
        "Amount": 20000.0
      }
    ]
  },
  "Total": 0,
  "Success": true
}
```

## Error Types

All Orders APIs may return the following error types in the `ServiceResult.ErrorType` field:

| ErrorType | HTTP Code | Description                                                                |
| --------- | --------- | -------------------------------------------------------------------------- |
| `0`       | 200       | No error.                                                                  |
| `1`       | 200       | Invalid or missing parameters.                                             |
| `2`       | 200       | The `CompanyCode` does not exist.                                          |
| `5`       | 200       | Pagination limit exceeds 100 records (Orders Paging only).                 |
| `6`       | 200       | Invalid date/time parameter (outside 01/01/1753 - 31/12/9999).             |
| `7`       | 200       | CukCuk connection is disabled, unable to retrieve data.                    |
| `100`     | 200       | Internal API error.                                                        |
| `102`     | 200       | Request rejected due to a concurrent request.                              |
| `251`     | 200       | Order ID already exists (Orders Create only).                              |
| `252`     | 200       | Order ID does not exist (Orders Update Items only).                        |
| `253`     | 200       | Order number already exists (Orders Create only).                          |
| `254`     | 200       | Order must have at least one item.                                         |
| `255`     | 200       | Order requires customer information.                                       |
| `256`     | 200       | Delivery order requires a shipping address.                                |
| `257`     | 200       | Invalid shipping date (Orders Create only).                                |
| `258`     | 200       | Invalid order status.                                                      |
| `-`       | 401       | Access token is expired or invalid; re-authenticate using the Account API. |

## Best Practices

- **Token Management**: Store the `AccessToken` securely and refresh it on HTTP 401 errors.
- **Rate Limiting**: Avoid concurrent requests to prevent `ErrorType: 102`.
- **Validation**: Validate `BranchId`, `orderId`, and date parameters before sending requests.
- **Pagination**: Use `Page` and `Limit` wisely for the Orders Paging API, respecting the 100-record limit.
- **Order Creation**: Ensure `OrderDetails` is non-empty and provide customer details for delivery orders.

## Additional Notes

- For the Orders Create API, ensure `ShippingDate` is in the future for delivery orders.
- Use the Orders Detail API to verify order data before updating items.
- Refer to the [Account API Guide](./account-api.md) for authentication details.
