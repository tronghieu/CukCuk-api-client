# CukCuk API Client

[![npm version](https://badge.fury.io/js/cukcuk-api-client.svg)](https://badge.fury.io/js/cukcuk-api-client)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL%203.0-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Build Status](https://travis-ci.com/tronghieu/CukCuk-api-client.svg?branch=main)](https://travis-ci.com/tronghieu/CukCuk-api-client)

A Node.js/TypeScript library for interacting with the CukCuk OpenPlatform API, designed for restaurant management applications. This open-source client enables developers to seamlessly connect to CukCuk's API for authentication, branch management, and more, following community standards and best practices.

## Features

- **Type-Safe**: Built with TypeScript for robust type checking and IntelliSense support.
- **Authentication**: Simplifies the process of obtaining and managing access tokens.
- **API Endpoints**: Supports key CukCuk API endpoints like account login and branch listing.
- **Open Source**: Licensed under GNU General Public License v3.0, welcoming contributions from the community.
- **Modular Design**: Easily extendable for additional CukCuk API endpoints.

## Installation

Install the package via npm:

```bash
npm i @luutronghieu/cukcuk-api-client
```

## Prerequisites

To use this library, you need:

- Node.js >= 14.x
- TypeScript >= 4.x (if using TypeScript)
- CukCuk API credentials (`AppID`, `Domain`, `SecretKey`, `CompanyCode`)

Obtain your credentials from the [CukCuk management portal](https://cukcuk.vn) as described in the [official documentation](https://cukcuk.vn/articles/index.html).

## Quick Start

Here's a basic example to authenticate and fetch branches using the CukCuk API client:

```typescript
import { CukCukClient } from "cukcuk-api-client";

const client = new CukCukClient({
  secretKey: "your-secret-key",
});

async function main() {
  try {
    // Authenticate and obtain access token
    const loginResponse = await client.account.login({
      Domain: "your-domain",
      AppId: "your-app-id",
      LoginTime: new Date().toISOString(),
    });

    // Fetch all branches
    const branches = await client.branches.getAll({ includeInactive: true });
    console.log("Branches:", branches);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
```

## Documentation

Detailed guides for connecting to each API endpoint are available in the [docs](./docs) directory:

- [Branches API](./docs/branches-api.md)
- [Categories API](./docs/categories-api.md)
- [Customers API](./docs/customers-api.markdown)
- [Employees API](./docs/employees-api.markdown)
- [Inventory Items API](./docs/inventory-items-api.markdown)
- [Tables API](./docs/tables-api.markdown)
- [Orders API](./docs/orders-api.md)
- [Order Onlines API](./docs/order-onlines-api.md)
- [SAInvoice API](./docs/sa-invoices-api.markdown)
- [Table API](./docs/tables-api.markdown)

Refer to these guides for endpoint-specific parameters, response formats, and error handling.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

See our [Contributing Guide](./CONTRIBUTING.md) for more details.

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](./LICENSE) file for details.

## Support

For issues, feature requests, or questions, please open an issue on the [GitHub repository](https://github.com/tronghieu/CukCuk-api-client/issues).

## Acknowledgments

- Built with ❤️ by the open-source community.
- Thanks to CukCuk for providing the OpenPlatform API.
