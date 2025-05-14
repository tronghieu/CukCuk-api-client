# OrderOnlines API Guide

This guide explains how to use the CukCuk API Client to interact with the CukCuk OpenPlatform OrderOnlines API (`api/v1/order-onlines/create`). This API enables the creation of online orders from a restaurant's website or app, syncing them with the CukCuk PC sales system for cashier processing.

## Prerequisites

Before using the OrderOnlines API, ensure you have:

- **CukCuk API Credentials**: `AppId`, `Domain`, `SecretKey`, and `CompanyCode`. Obtain these from the [CukCuk management portal](https://cukcuk.vn/articles/index.html).
- **Access Token**: Generated via the [Account API](./account-api.md) authentication process.
- Installed the `cukcuk-api-client` package:
  ```bash
  npm install cukcuk-api-client
  ```

## API Overview

### OrderOnlines Create API
- **Endpoint**: `POST https://graphapi.cukcuk.vn/api/v1/order-onlines/create`
- **Purpose**: Creates an online order and syncs it with the CukCuk PC system.
- **Version**: 1.0.

### CreateOrderOnlineRequestParam Object
The request body contains a `CreateOrderOnlineRequestParam` object with the following properties:

| Property         | Type    | Required? | Description                              |
|------------------|---------|-----------|------------------------------------------|
| `BranchId`       | string  | Yes       | Branch ID (GUID) where the order is placed. |
| `OrderId`        | string  | No        | Order ID (GUID), auto-generated if empty. |
| `OrderCode`      | string  | No        | Order code, auto-generated if empty.      |
| `OrderType`      | number  | Yes       | Order type (0: delivery, 1: pickup).      |
| `CustomerId`     | string  | No        | Customer ID (GUID) from the Customer API. |
| `CustomerName`   | string  | No        | Customer name, required if `CustomerId` is absent. |
| `CustomerTel`    | string  | No        | Customer phone number, required if `CustomerId` is absent. |
| `CustomerEmail`  | string  | No        | Customer email address.                  |
| `ShippingAddress`| string  | No        | Delivery address, required for `OrderType: 0`. |
| `ShippingDueDate`| datetime| No        | Expected delivery/pickup time, defaults to 30 minutes from now if empty. |
| `ShippingTimeType` | number| No        | Time type (0: immediate, 1: scheduled).   |
| `OrderNote`      | string  | No        | Order notes.                             |
| `TotalAmount`    | number  | No        | Total order amount (calculated as per formula). |
| `Amount`         | number  | No        | Total item amount (restaurant-calculated). |
| `TaxAmount`      | number  | No        | Tax amount (calculated as per formula).   |
| `DiscountAmount` | number  | No        | Discount amount (currently unsupported via API). |
| `DeliveryAmount` | number  | No        | Delivery fee (if applicable).             |
| `DepositAmount`  | number  | No        | Deposit amount from customer.             |
| `PaymentStatus`  | number  | Yes       | Payment status (1: unpaid, 2: paid).      |
| `OrderSource`    | number  | Yes       | Order source (1: restaurant website, 2: restaurant app). |
| `OrderItems`     | Array   | Yes       | List of order items (fetched from Inventory APIs). |

### OrderItem Object
Each item in the `OrderItems` array has the following properties:

| Property    | Type    | Required? | Description                              |
|-------------|---------|-----------|------------------------------------------|
| `Id`        | string  | Yes       | Item ID (GUID).                          |
| `Code`      | string  | Yes       | Item code.                               |
| `ItemType`  | number  | Yes       | Item type (see [Item Types](#item-types)). |
| `Name`      | string  | Yes       | Item name.                               |
| `Price`     | number  | Yes       | Unit price.                              |
| `UnitID`    | string  | Yes       | Unit ID (GUID).                          |
| `UnitName`  | string  | Yes       | Unit name.                               |
| `Note`      | string  | No        | Item note.                               |
| `Quantity`  | number  | Yes       | Item quantity.                           |
| `Children`  | Array   | No        | Sub-items for ingredient-based or combo items (Array<OrderItem>). |
| `Additions` | Array   | No        | Selected serving preferences (Array<InventoryItemAddition>). |

### InventoryItemAddition Object
Each addition in the `Additions` array has the following properties:

| Property     | Type   | Required? | Description                              |
|--------------|--------|-----------|------------------------------------------|
| `Id`         | string | Yes       | Addition ID (GUID).                      |
| `Description`| string | Yes       | Addition name (e.g., "Ít đường").        |
| `Price`      | number | Yes       | Additional price.                        |
| `Quantity`   | number | Yes       | Quantity of the addition.                |

### Item Types
The `ItemType` field indicates the type of item:

| Value | Type                  |
|-------|-----------------------|
| 1     | Dish                  |
| 2     | Dish by ingredient    |
| 3     | Dish by group         |
| 4     | Combo                 |
| 5     | Bottled drink         |
| 6     | Prepared drink        |
| 7     | Other item            |
| 8     | Raw material          |
| 10    | Drink by group        |
| 12    | Customizable combo    |

### ServiceResult Object
The API returns a `ServiceResult` object:

| Property        | Type   | Description                          |
|-----------------|--------|--------------------------------------|
| `Code`          | number | HTTP status code (e.g., `200`, `401`). |
| `ErrorType`     | number | Error type (see [Error Types](#error-types)). |
| `ErrorMessage`  | string | Detailed error message, if any.      |
| `Success`       | boolean| `true` if the request was successful, `false` otherwise. |
| `Data`          | string | Generated `OrderCode` (e.g., "DH5678910"). |
| `Total`         | number | Total number of records (typically `0`). |

## Usage

The `CukCukClient` provides a method to interact with the OrderOnlines API:
- `orderOnlines.create`: Creates a new online order.

Below is an example of how to use it.

### Example: Creating an Online Order

```typescript
import { CukCukClient } from "cukcuk-api-client";

const client = new CukCukClient({
  secretKey: "your-secret-key",
});

async function createOnlineOrder() {
  try {
    // Authenticate and obtain access token
    const loginResponse = await client.account.login({
      Domain: "your-domain",
      AppId: "your-app-id",
      LoginTime: new Date().toISOString(),
    });

    // Create an online order
    const orderRequest = {
      BranchId: "994c6fe5-da83-441b-a0e8-57a6fed98fb2",
      OrderId: "0FFDDFAD-3D07-4CB9-8021-96F970D7DE0F",
      OrderCode: "",
      OrderType: 0,
      CustomerName: "A Đặng",
      CustomerTel: "0389457123",
      ShippingAddress: "Tòa N03-T1 khu Ngoại giao đoàn, Xuân Tảo, Bắc Từ Liêm, Hà Nội",
      ShippingTimeType: 0,
      OrderNote: "Giao trước 18h",
      TotalAmount: 91000,
      Amount: 87000,
      DeliveryAmount: 19000,
      DiscountAmount: 15000,
      OrderSource: 1,
      OrderItems: [
        {
          Id: "8ab3cd42-e229-4154-841b-30038b25793d",
          Code: "KEMRUMNHO",
          ItemType: 6,
          Name: "Kem rum nho",
          Price: 29000,
          UnitID: "47817d1f-c393-4a4c-af57-0d7fe3f29c5f",
          UnitName: "Cốc",
          Note: "Không lấy đá",
          Quantity: 2,
          Additions: [
            {
              Id: "d31e46bb-0bd9-4c93-a548-b55a8f33a682",
              Description: "Ít đường",
              Price: 0.0,
              Quantity: 1,
            },
          ],
        },
        {
          Id: "bd106032-7ba4-417b-abb1-15676dbe33da",
          Code: "KEMVANI",
          ItemType: 6,
          Name: "Kem vani",
          Price: 29000,
          UnitID: "47817d1f-c393-4a4c-af57-0d7fe3f29c5f",
          UnitName: "Cốc",
          Quantity: 1,
        },
      ],
      PaymentStatus: 1,
    };

    const orderResponse = await client.orderOnlines.create(orderRequest);
    if (orderResponse.Success) {
      console.log("Order Created with Code:", orderResponse.Data);
    } else {
      console.error(`Error ${orderResponse.ErrorType}: ${orderResponse.ErrorMessage}`);
    }
  } catch (error) {
    console.error("Error creating order:", error.message);
  }
}

createOnlineOrder();
```

### Parameters

#### OrderOnlines Create API (`create`)

| Parameter         | Type    | Description                              | Required? |
|-------------------|---------|------------------------------------------|-----------|
| `param`           | object  | `CreateOrderOnlineRequestParam` object.  | Yes       |

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
  "Total": 0,
  "Data": "DH5678910",
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
| `6`       | 200       | Invalid date/time parameter.                                               |
| `7`       | 200       | CukCuk connection is disabled, unable to process data.                     |
| `100`     | 200       | Internal API error.                                                        |
| `102`     | 200       | Request rejected due to a concurrent request of the same type.             |
| `351`     | 200       | Invalid shipping address.                                                  |
| `352`     | 200       | Invalid order source.                                                      |
| `353`     | 200       | Invalid delivery/pickup time.                                              |
| `354`     | 200       | Order contains no items.                                                   |
| `355`     | 200       | Missing customer name.                                                     |
| `356`     | 200       | Missing customer phone number.                                             |
| `357`     | 200       | Order code already exists.                                                 |
| `400`     | 200       | Third-party orders not allowed (enable via CukCuk website settings).       |
| `-`       | 401       | Access token is expired or invalid; re-authenticate using the Account API.  |

### Handling Errors

Always check the `ServiceResult.Success` field and handle errors appropriately:

```typescript
async function createOrderWithErrorHandling() {
  try {
    const loginResponse = await client.account.login({
      Domain: "your-domain",
      AppId: "your-app-id",
      LoginTime: new Date().toISOString(),
    });

    const orderRequest = {
      BranchId: "994c6fe5-da83-441b-a0e8-57a6fed98fb2",
      OrderType: 0,
      CustomerName: "A Đặng",
      CustomerTel: "0389457123",
      ShippingAddress: "Tòa N03-T1 khu Ngoại giao đoàn, Xuân Tảo, Bắc Từ Liêm, Hà Nội",
      OrderSource: 1,
      OrderItems: [],
      PaymentStatus: 1,
    };

    const orderResponse = await client.orderOnlines.create(orderRequest);
    if (orderResponse.Success) {
      console.log("Order Created with Code:", orderResponse.Data);
    } else {
      console.error(`Error ${orderResponse.ErrorType}: ${orderResponse.ErrorMessage}`);
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

createOrderWithErrorHandling();
```

## Best Practices

- **Token Management**: Store the `AccessToken` securely and refresh it on HTTP 401 errors.
- **Rate Limiting**: Avoid sending multiple concurrent requests of the same type to prevent `ErrorType: 102`.
- **Amount Calculation**: Calculate `TotalAmount` accurately using the formula: `TotalAmount = Amount + DeliveryAmount + ServiceAmount + TaxAmount - DiscountAmount`.
- **Item Details**: Fetch item details from the [Inventory Items API](./inventory-items-api.md) to populate `OrderItems`.
- **Validation**: Ensure `CustomerName` and `CustomerTel` are provided if `CustomerId` is absent, and `ShippingAddress` is included for delivery orders.
- **Error Handling**: Always validate `ServiceResult.Success` and handle specific `ErrorType` values, especially order-specific errors (e.g., `351`-`357`).

## Additional Notes

- **Order Amount Calculation**: The restaurant must calculate `Amount`, `DeliveryAmount`, `TaxAmount`, and `DiscountAmount`. Refer to the [TotalAmount](#totalamount---tổng-tiền-đơn-hàng), [ServiceAmount](#serviceamount---phí-dịch-vụ), and [TaxAmount](#taxamount---thuế-giá-trị-gia-tăng) sections for formulas.
- **Item Types**: Use `Children` for ingredient-based or combo items, and `Additions` for serving preferences.
- **Default Values**: If `ShippingDueDate` is empty, it defaults to 30 minutes from the API call time (e.g., 07:16 PM +07 on May 14, 2025, if called now).
- **Discount Limitation**: Discounts are not yet supported via API; set `DiscountAmount` to `0`.
- For more details on authentication or branch settings, refer to the [Account API Guide](./account-api.md) or [Branch API](branchs_setting.html).