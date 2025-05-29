import { CukCukClient } from "../src";

const client = new CukCukClient({
  secretKey: "your-secret-key",
});

async function saInvoicesExample() {
  try {
    // Authenticate and obtain access token
    const loginResponse = await client.account.login({
      Domain: "your-domain",
      AppId: "your-app-id",
      LoginTime: new Date().toISOString(),
    });

    console.log("✅ Authentication successful");

    // Example 1: Get paginated list of invoices
    console.log("\n📄 Fetching paginated invoices...");
    const pagingRequest = {
      Page: 1,
      Limit: 10,
      BranchId: "9b2f084b-97b6-42a9-b20a-2893fd358ae8", // Optional: filter by branch
      HaveCustomer: true, // Optional: only invoices with customers
    };

    const invoicesResponse = await client.sainvoices.paging(pagingRequest);
    if (invoicesResponse.Success) {
      console.log(`Found ${invoicesResponse.Total} total invoices`);
      console.log(`Returned ${invoicesResponse.Data.length} invoices on this page`);
      
      // Show first invoice basic info
      if (invoicesResponse.Data.length > 0) {
        const firstInvoice = invoicesResponse.Data[0];
        console.log(`First Invoice - ID: ${firstInvoice.RefId}, No: ${firstInvoice.RefNo}, Amount: ${firstInvoice.TotalAmount}`);
      }
    } else {
      console.error(`❌ Paging Error ${invoicesResponse.ErrorType}: ${invoicesResponse.ErrorMessage}`);
    }

    // Example 2: Get complete invoice information by ID
    console.log("\n🧾 Fetching complete invoice information...");
    const invoiceId = "53b8d27d-2c4e-4b34-9881-0015f6765e9d"; // Example invoice ID
    
    const invoiceResponse = await client.sainvoices.get(invoiceId);
    if (invoiceResponse.Success) {
      const invoice = invoiceResponse.Data;
      console.log(`Invoice ${invoice.RefNo} - Customer: ${invoice.CustomerName}, Total: ${invoice.TotalAmount}`);
      console.log(`Employee: ${invoice.EmployeeName}, Payment Status: ${invoice.PaymentStatus}`);
      console.log(`Details count: ${invoice.SAInvoiceDetails?.length || 0}`);
      console.log(`Payments count: ${invoice.SAInvoicePayments?.length || 0}`);
    } else {
      console.error(`❌ Get Invoice Error ${invoiceResponse.ErrorType}: ${invoiceResponse.ErrorMessage}`);
    }

    // Example 3: Get detailed invoice information (items, payments, VAT info only)
    console.log("\n🔍 Fetching detailed invoice information...");
    
    const detailResponse = await client.sainvoices.detail(invoiceId);
    if (detailResponse.Success) {
      const details = detailResponse.Data;
      
      // Show invoice items
      if (details.SAInvoiceDetails && details.SAInvoiceDetails.length > 0) {
        console.log("📋 Invoice Items:");
        details.SAInvoiceDetails.forEach((item, index) => {
          console.log(`  ${index + 1}. ${item.ItemName} - Qty: ${item.Quantity}, Price: ${item.UnitPrice}, Amount: ${item.Amount}`);
        });
      }
      
      // Show payment methods
      if (details.SAInvoicePayments && details.SAInvoicePayments.length > 0) {
        console.log("💳 Payment Methods:");
        details.SAInvoicePayments.forEach((payment, index) => {
          console.log(`  ${index + 1}. ${payment.PaymentName} - Amount: ${payment.Amount}`);
        });
      }
      
      // Show VAT information if available
      if (details.SAVATInfo) {
        console.log("📄 VAT Information:");
        console.log(`  Customer: ${details.SAVATInfo.ReceiverEIvoiceName || 'N/A'}`);
        console.log(`  Tax Code: ${details.SAVATInfo.TaxCode || 'N/A'}`);
        console.log(`  E-Invoice Number: ${details.SAVATInfo.EInvoiceNumber || 'N/A'}`);
      }
    } else {
      console.error(`❌ Detail Error ${detailResponse.ErrorType}: ${detailResponse.ErrorMessage}`);
    }

  } catch (error: any) {
    if (error.code === '401') {
      console.error("🔐 Authentication failed. Please check your credentials and re-authenticate.");
    } else {
      console.error("💥 Unexpected error:", error.message);
    }
  }
}

// Error handling example
async function saInvoicesWithErrorHandling() {
  try {
    await client.account.login({
      Domain: "your-domain",
      AppId: "your-app-id",
      LoginTime: new Date().toISOString(),
    });

    // Example with pagination error handling (limit > 100)
    const invalidPagingRequest = {
      Page: 1,
      Limit: 150, // This will cause ErrorType: 5 (exceeds max 100)
    };

    const response = await client.sainvoices.paging(invalidPagingRequest);
    if (!response.Success) {
      switch (response.ErrorType) {
        case 1:
          console.error("Invalid or missing parameters");
          break;
        case 2:
          console.error("Company code does not exist");
          break;
        case 5:
          console.error("Pagination limit exceeds maximum allowed (100)");
          break;
        case 6:
          console.error("Invalid date/time parameter");
          break;
        case 7:
          console.error("CukCuk connection is disabled");
          break;
        case 100:
          console.error("Internal API error");
          break;
        case 102:
          console.error("Request rejected due to concurrent request");
          break;
        default:
          console.error(`Unknown error: ${response.ErrorMessage}`);
      }
    }
  } catch (error: any) {
    console.error("Request failed:", error.message);
  }
}

// Run examples
saInvoicesExample();

// Uncomment to test error handling
// saInvoicesWithErrorHandling(); 