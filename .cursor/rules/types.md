# Types Organization Rule

All TypeScript type definitions should be stored in `src/types.ts`. This includes:

- Interfaces
- Type aliases
- Enums
- Generic types

## Rationale

- Centralizes all type definitions in one place
- Makes it easier to find and maintain types
- Prevents duplicate type definitions
- Improves code organization and consistency

## Examples

✅ DO:

```typescript
// src/types.ts
export interface User {
  id: string;
  name: string;
}

export type UserRole = "admin" | "user";

export enum UserStatus {
  Active = "active",
  Inactive = "inactive",
}
```

❌ DON'T:

```typescript
// src/user.types.ts
export interface User {
  id: string;
  name: string;
}

// src/role.types.ts
export type UserRole = "admin" | "user";
```

## Exceptions

- Types that are only used within a single file and are not exported can be defined in that file
- Types that are part of a third-party library's type definitions should remain in their respective files
