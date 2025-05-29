# SAInvoice API Guide

This guide explains how to use the CukCuk API Client to interact with the CukCuk OpenPlatform SAInvoice API, which provides methods to retrieve paginated invoice lists (`api/v1/sainvoices/paging`), detailed invoice information (`api/v1/sainvoices/detail/{refId}`), and general invoice details (`api/v1/sainvoices/{refId}`). These APIs allow developers to fetch and manage invoice data for restaurant management systems.

## Prerequisites

Before using the SAInvoice API, ensure you have:

- **CukCuk API Credentials**: `AppId`, `Domain`, `SecretKey`, and `CompanyCode`. Obtain these from the [CukCuk management portal](https://cukcuk.vn/articles/index.html).
- **Access Token**: Generated via the [Account API](./account-api.md) authentication process.
- Installed the `cukcuk-api-client` package:
  ```bash
  npm install cukcuk-api-client
  ```

## API Overview

### SAInvoice API Endpoints
- **Paginated Invoice List**: `POST https://graphapi.cukcuk.vn/api/v1/sainvoices/paging`
- **Invoice Detail by ID**: `GET https://graphapi.cukcuk.vn/api/v1/sainvoices/detail/{refId}`
- **Invoice Information**: `GET https://graphapi.cukcuk.vn/api/v1/sainvoices/{refId}`
- **Version**: 1.0.

## Usage

The `CukCukClient` provides methods to interact with the SAInvoice API:
- `sainvoices.paging`: Retrieves a paginated list of invoices.
- `sainvoices.detail`: Fetches detailed invoice information by `refId`.
- `sainvoices.get`: Retrieves general invoice details by `refId`.

Below are examples of how to use these methods.

### Example: Retrieving Paginated Invoice List

```typescript
import { CukCukClient } from "cukcuk-api-client";

const client = new CukCukClient({
  secretKey: "your-secret-key",
});

async function getPaginatedInvoices() {
  try {
    // Authenticate and obtain access token
    const loginResponse = await client.account.login({
      Domain: "your-domain",
      AppId: "your-app-id",
      LoginTime: new Date().toISOString(),
    });

    // Fetch paginated invoices
    const pagingRequest = {
      Page: 1,
      Limit: 50,
      BranchId: "9b2f084b-97b6-42a9-b20a-2893fd358ae8",
      HaveCustomer: true,
    };

    const invoicesResponse = await client.sainvoices.paging(pagingRequest);
    if (invoicesResponse.Success) {
      console.log("Total Invoices:", invoicesResponse.Total);
      console.log("Invoices:", invoicesResponse.Data);
    } else {
      console.error(`Error ${invoicesResponse.ErrorType}: ${invoicesResponse.ErrorMessage}`);
    }
  } catch (error) {
    console.error("Error fetching invoices:", error.message);
  }
}

getPaginatedInvoices();
```

### Example: Retrieving Invoice Details by ID

```typescript
async function getInvoiceDetail() {
  try {
    // Authenticate and obtain access token
    const loginResponse = await client.account.login({
      Domain: "your-domain",
      AppId: "your-app-id",
      LoginTime: new Date().toISOString(),
    });

    // Fetch invoice detail
    const refId = "53b8d27d-2c4e-4b34-9881-0015f6765e9d";
    const detailResponse = await client.sainvoices.detail(refId);
    if (detailResponse.Success) {
      console.log("Invoice Details:", detailResponse.Data);
    } else {
      console.error(`Error ${detailResponse.ErrorType}: ${detailResponse.ErrorMessage}`);
    }
  } catch (error) {
    console.error("Error fetching invoice detail:", error.message);
  }
}

getInvoiceDetail();
```

### Example: Retrieving General Invoice Information

```typescript
async function getInvoiceInfo() {
  try {
    // Authenticate and obtain access token
    const loginResponse = await client.account.login({
      Domain: "your-domain",
      AppId: "your-app-id",
      LoginTime: new Date().toISOString(),
    });

    // Fetch invoice info
    const refId = "53b8d27d-2c4e-4b34-9881-0015f6765e9d";
    const infoResponse = await client.sainvoices.get(refId);
    if (infoResponse.Success) {
      console.log("Invoice Info:", infoResponse.Data);
    } else {
      console.error(`Error ${infoResponse.ErrorType}: ${infoResponse.ErrorMessage}`);
    }
  } catch (error) {
    console.error("Error fetching invoice info:", error.message);
  }
}

getInvoiceInfo();
```

### Parameters

#### SAInvoices Paging API (`paging`)

| Parameter | Type    | Description                              | Required? |
|-----------|---------|------------------------------------------|-----------|
| `param`   | object  | `InvoicesPagingRequestParam` object.     | Yes       |

#### SAInvoices Detail API (`detail`)

| Parameter | Type    | Description                  | Required? |
|-----------|---------|------------------------------|-----------|
| `refId`   | string  | Invoice ID (GUID) to fetch.  | Yes       |

#### SAInvoices Get API (`get`)

| Parameter | Type    | Description                  | Required? |
|-----------|---------|------------------------------|-----------|
| `refId`   | string  | Invoice ID (GUID) to fetch.  | Yes       |

### Headers

The API requires the following headers, automatically handled by the `CukCukClient`:

| Header          | Description                          | Required? |
|-----------------|--------------------------------------|-----------|
| `Authorization` | Bearer token (e.g., `Bearer <AccessToken>`). | Yes       |
| `CompanyCode`   | Merchant company code (e.g., `demoquanviet`). | Yes       |

### InvoicesPagingRequestParam Object
The request body for the `paging` endpoint contains an `InvoicesPagingRequestParam` object with the following properties:

| Property    | Type    | Description                                              | Required? |
|-------------|---------|----------------------------------------------------------|-----------|
| `Page`      | int     | Page number to fetch (1-based).                          | Yes       |
| `Limit`     | int     | Number of records per page (max 100).                    | Yes       |
| `BranchId`  | string  | Branch ID (GUID) to filter, or `null` for all branches.  | No        |
| `HaveCustomer` | bool  | Filter invoices with customers only (`true` or `false`). | No        |
| `LastSyncDate` | datetime | Last sync timestamp for incremental updates.           | No        |

### SAInvoice Object
The response `Data` field contains an `SAInvoice` object with nested structures (`SAInvoiceDetails`, `SAInvoicePayments`, `SAInvoiceCoupons`, `SAVATInfo`). Refer to the [Definitions](#definitions) section for detailed properties.

### Example Responses

#### Paginated Invoice List Response
```json
{
  "Code": 200,
  "Data": [
    {
      "RefId": "3a08fc9e-18d2-4c97-a2b4-102d41f352fc",
      "RefNo": "2004000020",
      "RefDate": "2020-07-08T17:40:55.447",
      "BranchId": "9b2f084b-97b6-42a9-b20a-2893fd358ae8",
      "CustomerName": "Chị Nga",
      "TotalAmount": 2300000.0
    }
    // ... additional invoices
  ],
  "Total": 10,
  "Success": true
}
```

#### Invoice Detail Response
```json
{
  "Code": 200,
  "Data": {
    "SAInvoiceDetails": [
      {
        "RefDetailID": "8ffaba83-7d45-4c07-ac6e-a6c482c09ef0",
        "ItemName": "XK",
        "Quantity": 1.0,
        "UnitPrice": 50000.0,
        "Amount": 50000.0
      }
    ],
    "SAInvoicePayments": [
      {
        "SAInvoicePaymentID": "f7954d7d-c586-4d06-a32b-defe9159ddbc",
        "PaymentType": 1,
        "Amount": 50000.0,
        "PaymentName": "Tiền mặt"
      }
    ],
    "SAVATInfo": {
      "VATID": "80469e2e-5ffd-4e1f-a826-ad789b4c3013",
      "ReceiverEIvoiceName": "abc"
    }
  },
  "Total": 0,
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
| `5`       | 200       | Pagination limit exceeds the maximum allowed (100).                        |
| `6`       | 200       | Invalid date/time parameter (must be between 01/01/1753 and 31/12/9999).   |
| `7`       | 200       | CukCuk connection is disabled, unable to fetch data.                       |
| `100`     | 200       | Internal API error.                                                        |
| `102`     | 200       | Request rejected due to a concurrent request of the same type.             |
| `-`       | 401       | Access token is expired or invalid; re-authenticate using the Account API.  |

### Handling Errors

Always check the `ServiceResult.Success` field and handle errors appropriately:

```typescript
async function getInvoicesWithErrorHandling() {
  try {
    const loginResponse = await client.account.login({
      Domain: "your-domain",
      AppId: "your-app-id",
      LoginTime: new Date().toISOString(),
    });

    const pagingRequest = { Page: 1, Limit: 150, BranchId: null };
    const invoicesResponse = await client.sainvoices.paging(pagingRequest);
    if (invoicesResponse.Success) {
      console.log("Invoices:", invoicesResponse.Data);
    } else {
      console.error(`Error ${invoicesResponse.ErrorType}: ${invoicesResponse.ErrorMessage}`);
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

getInvoicesWithErrorHandling();
```

## Best Practices

- **Token Management**: Store the `AccessToken` securely and refresh it on HTTP 401 errors.
- **Rate Limiting**: Avoid sending multiple concurrent requests of the same type to prevent `ErrorType: 102`.
- **Pagination**: Set `Limit` to a value ≤ 100 and handle pagination with `Page` to fetch all records efficiently.
- **Validation**: Ensure `refId` is a valid GUID for `detail` and `get` endpoints.
- **Error Handling**: Validate `ServiceResult.Success` and handle specific `ErrorType` values, especially pagination-related errors (e.g., `5`).

## Definitions

### InvoicesPagingRequestParam
| Property    | Type    | Description                                              |
|-------------|---------|----------------------------------------------------------|
| `Page`      | int     | Page number to fetch.                                    |
| `Limit`     | int     | Number of records per page (max 100).                    |
| `BranchId`  | string  | Branch ID (GUID) to filter, or `null` for all branches.  |
| `HaveCustomer` | bool  | Filter invoices with customers only.                     |
| `LastSyncDate` | datetime | Last sync timestamp for incremental updates.           |

### SAInvoice
| Property         | Type                 | Description                              |
|------------------|----------------------|------------------------------------------|
| `RefId`          | string               | Invoice ID (GUID).                       |
| `RefNo`          | string               | Invoice number.                          |
| `RefDate`        | datetime             | Invoice creation date.                   |
| `BranchId`       | string               | Branch ID (GUID).                        |
| `CustomerName`   | string               | Customer name.                           |
| `TotalAmount`    | decimal              | Total invoice amount.                    |
| `SAInvoiceDetails` | Array<InvoiceDetail> | List of invoice item details.            |
| `SAInvoicePayments` | Array<InvoicePayment> | List of payment details.                 |
| `SAVATInfo`      | SAVATInfo            | VAT invoice information.                 |

### InvoiceDetail
| Property        | Type    | Description                  |
|-----------------|---------|------------------------------|
| `RefDetailID`   | string  | Detail ID (GUID).            |
| `ItemName`      | string  | Item name.                   |
| `Quantity`      | decimal | Item quantity.               |
| `UnitPrice`     | decimal | Unit price.                  |
| `Amount`        | decimal | Total item amount.           |

### InvoicePayment
| Property         | Type    | Description                  |
|------------------|---------|------------------------------|
| `SAInvoicePaymentID` | string | Payment ID (GUID).           |
| `PaymentType`    | int     | Payment type (see [PaymentType](#paymenttype-definition)). |
| `Amount`         | decimal | Payment amount.              |
| `PaymentName`    | string  | Payment method name.         |

### SAVATInfo
| Property            | Type    | Description                  |
|---------------------|---------|------------------------------|
| `VATID`             | string  | VAT invoice ID (GUID).       |
| `ReceiverEIvoiceName` | string | Receiver name.              |

### OrderType Definition
| Value | Description                  |
|-------|------------------------------|
| 1     | On-site dining order         |
| 2     | Takeaway order               |
| 3     | Delivery order               |
| 4     | Reservation order            |

### PaymentStatus Definition
| Value | Description           |
|-------|-----------------------|
| 0     | Unpaid                |
| 1     | Not collected         |
| 2     | On credit             |
| 3     | Paid                  |
| 4     | Cancelled             |
| 5     | Temporarily cancelled |

### PaymentType Definition
| Value | Description           |
|-------|-----------------------|
| 1     | Cash                  |
| 2     | ATM Card              |
| 3     | VISA Card             |
| 4     | Master Card           |
| 5     | Credit                |
| 6     | Voucher Card          |
| 7     | Prepaid Card          |

## Additional Notes

- **Pagination Limit**: The maximum `Limit` is 100 records per page.
- **Date Range**: `LastSyncDate` and other datetime parameters must be within 01/01/1753 and 31/12/9999.
- **Concurrent Requests**: Avoid duplicate requests to prevent `ErrorType: 102`.
- For more details on authentication or branch settings, refer to the [Account API Guide](./account-api.md).