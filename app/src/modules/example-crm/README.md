# CRM Module for CauldronOS

This module provides Customer Relationship Management (CRM) functionality for CauldronOS, allowing users to manage customers, contacts, and deals.

## Features

- Customer management
- Contact management
- Deal tracking and pipeline
- Role-based permissions
- Customizable settings

## Installation

### 1. Register the Module

Import and register the module in your application by adding it to the `registerModules.ts` file:

```typescript
import { useEffect } from 'react';
import { useModules } from './ModuleRegistry';

// Import module registrations
import crmModule from './example-crm';
// Import other modules here

export const useRegisterModules = () => {
  const { registerModule } = useModules();

  useEffect(() => {
    // Register all modules
    registerModule(crmModule);
    // Register other modules here
  }, [registerModule]);
};
```

### 2. Add Database Models

Add the CRM module database models to your `schema.prisma` file:

```prisma
// CRM Module Database Models
model Customer {
  id                        String          @id @default(uuid())
  createdAt                 DateTime        @default(now())
  updatedAt                 DateTime        @updatedAt

  name                      String
  status                    String          // 'active', 'lead', 'inactive'
  industry                  String?
  revenue                   String?
  
  // Relations
  contacts                  Contact[]
  deals                     Deal[]
  
  // Workspace relation
  workspace                 Workspace       @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  workspaceId               String
  
  // Created by
  createdBy                 User            @relation(fields: [createdById], references: [id])
  createdById               String
  
  @@index([workspaceId])
}

model Contact {
  id                        String          @id @default(uuid())
  createdAt                 DateTime        @default(now())
  updatedAt                 DateTime        @updatedAt

  name                      String
  email                     String?
  phone                     String?
  role                      String?
  
  // Customer relation
  customer                  Customer        @relation(fields: [customerId], references: [id], onDelete: Cascade)
  customerId                String
  
  // Workspace relation (denormalized for query performance)
  workspace                 Workspace       @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  workspaceId               String
  
  @@index([customerId])
  @@index([workspaceId])
}

model Deal {
  id                        String          @id @default(uuid())
  createdAt                 DateTime        @default(now())
  updatedAt                 DateTime        @updatedAt

  name                      String
  value                     String
  stage                     String          // 'discovery', 'proposal', 'negotiation', 'closed_won', 'closed_lost'
  probability               String?
  
  // Customer relation
  customer                  Customer        @relation(fields: [customerId], references: [id], onDelete: Cascade)
  customerId                String
  
  // Workspace relation (denormalized for query performance)
  workspace                 Workspace       @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  workspaceId               String
  
  @@index([customerId])
  @@index([workspaceId])
}
```

Also, add these relations to the existing Workspace and User models:

```prisma
model Workspace {
  // ...existing fields
  customers                Customer[]
  contacts                 Contact[]
  deals                    Deal[]
}

model User {
  // ...existing fields
  customers                Customer[]
}
```

### 3. Run Database Migrations

After adding the models to your schema.prisma file, run the following commands to create and apply the migrations:

```bash
npx prisma migrate dev --name add_crm_module
```

### 4. Import the Module in Your Application

Make sure the module is imported and used in your application:

```typescript
// In your main application file
import { useRegisterModules } from './modules/registerModules';

function App() {
  // Register all modules
  useRegisterModules();
  
  // Rest of your application
  return (
    // ...
  );
}
```

## Usage

Once installed, the CRM module will be available in the modules list for each workspace. Users with the appropriate permissions can:

1. View and manage customers
2. Add and manage contacts for each customer
3. Track deals through the sales pipeline
4. Configure module settings

## Customization

The CRM module can be customized through the settings page, where you can:

- Configure deal stages
- Set customer statuses
- Enable/disable features
- Manage permissions

## API Integration

The CRM module provides several API endpoints for integration with other systems:

- `GET /api/modules/crm/customers` - Get all customers
- `POST /api/modules/crm/customers` - Create a new customer
- `GET /api/modules/crm/customers/:id` - Get a specific customer
- `PUT /api/modules/crm/customers/:id` - Update a customer
- `DELETE /api/modules/crm/customers/:id` - Delete a customer
- `GET /api/modules/crm/contacts` - Get all contacts
- `GET /api/modules/crm/deals` - Get all deals

See the API documentation in the module for more details.

## Permissions

The CRM module includes the following permissions:

- `crm:read` - View customers, contacts, and deals
- `crm:write` - Create and update customers, contacts, and deals
- `crm:delete` - Delete customers, contacts, and deals
- `crm:export` - Export CRM data
- `crm:import` - Import CRM data
- `crm:settings` - Manage CRM settings

These permissions can be assigned to different roles through the permissions page.# CRM Module for CauldronOS

This module provides Customer Relationship Management (CRM) functionality for CauldronOS, allowing users to manage customers, contacts, and deals.

## Features

- Customer management
- Contact management
- Deal tracking and pipeline
- Role-based permissions
- Customizable settings

## Installation

### 1. Register the Module

Import and register the module in your application by adding it to the `registerModules.ts` file:

```typescript
import { useEffect } from 'react';
import { useModules } from './ModuleRegistry';

// Import module registrations
import crmModule from './example-crm';
// Import other modules here

export const useRegisterModules = () => {
  const { registerModule } = useModules();

  useEffect(() => {
    // Register all modules
    registerModule(crmModule);
    // Register other modules here
  }, [registerModule]);
};
```

### 2. Add Database Models

Add the CRM module database models to your `schema.prisma` file:

```prisma
// CRM Module Database Models
model Customer {
  id                        String          @id @default(uuid())
  createdAt                 DateTime        @default(now())
  updatedAt                 DateTime        @updatedAt

  name                      String
  status                    String          // 'active', 'lead', 'inactive'
  industry                  String?
  revenue                   String?
  
  // Relations
  contacts                  Contact[]
  deals                     Deal[]
  
  // Workspace relation
  workspace                 Workspace       @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  workspaceId               String
  
  // Created by
  createdBy                 User            @relation(fields: [createdById], references: [id])
  createdById               String
  
  @@index([workspaceId])
}

model Contact {
  id                        String          @id @default(uuid())
  createdAt                 DateTime        @default(now())
  updatedAt                 DateTime        @updatedAt

  name                      String
  email                     String?
  phone                     String?
  role                      String?
  
  // Customer relation
  customer                  Customer        @relation(fields: [customerId], references: [id], onDelete: Cascade)
  customerId                String
  
  // Workspace relation (denormalized for query performance)
  workspace                 Workspace       @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  workspaceId               String
  
  @@index([customerId])
  @@index([workspaceId])
}

model Deal {
  id                        String          @id @default(uuid())
  createdAt                 DateTime        @default(now())
  updatedAt                 DateTime        @updatedAt

  name                      String
  value                     String
  stage                     String          // 'discovery', 'proposal', 'negotiation', 'closed_won', 'closed_lost'
  probability               String?
  
  // Customer relation
  customer                  Customer        @relation(fields: [customerId], references: [id], onDelete: Cascade)
  customerId                String
  
  // Workspace relation (denormalized for query performance)
  workspace                 Workspace       @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  workspaceId               String
  
  @@index([customerId])
  @@index([workspaceId])
}
```

Also, add these relations to the existing Workspace and User models:

```prisma
model Workspace {
  // ...existing fields
  customers                Customer[]
  contacts                 Contact[]
  deals                    Deal[]
}

model User {
  // ...existing fields
  customers                Customer[]
}
```

### 3. Run Database Migrations

After adding the models to your schema.prisma file, run the following commands to create and apply the migrations:

```bash
npx prisma migrate dev --name add_crm_module
```

### 4. Import the Module in Your Application

Make sure the module is imported and used in your application:

```typescript
// In your main application file
import { useRegisterModules } from './modules/registerModules';

function App() {
  // Register all modules
  useRegisterModules();
  
  // Rest of your application
  return (
    // ...
  );
}
```

## Usage

Once installed, the CRM module will be available in the modules list for each workspace. Users with the appropriate permissions can:

1. View and manage customers
2. Add and manage contacts for each customer
3. Track deals through the sales pipeline
4. Configure module settings

## Customization

The CRM module can be customized through the settings page, where you can:

- Configure deal stages
- Set customer statuses
- Enable/disable features
- Manage permissions

## API Integration

The CRM module provides several API endpoints for integration with other systems:

- `GET /api/modules/crm/customers` - Get all customers
- `POST /api/modules/crm/customers` - Create a new customer
- `GET /api/modules/crm/customers/:id` - Get a specific customer
- `PUT /api/modules/crm/customers/:id` - Update a customer
- `DELETE /api/modules/crm/customers/:id` - Delete a customer
- `GET /api/modules/crm/contacts` - Get all contacts
- `GET /api/modules/crm/deals` - Get all deals

See the API documentation in the module for more details.

## Permissions

The CRM module includes the following permissions:

- `crm:read` - View customers, contacts, and deals
- `crm:write` - Create and update customers, contacts, and deals
- `crm:delete` - Delete customers, contacts, and deals
- `crm:export` - Export CRM data
- `crm:import` - Import CRM data
- `crm:settings` - Manage CRM settings

These permissions can be assigned to different roles through the permissions page.