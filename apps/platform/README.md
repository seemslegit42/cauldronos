# CauldronOS Platform

This directory contains the core platform applications for CauldronOS. These applications provide the foundation for the platform and enable the modular architecture that allows users to install and use various modules.

## Platform Components

### Admin Dashboard

The admin dashboard is the main interface for administrators to manage the platform, users, modules, and settings. It provides a comprehensive set of tools for platform administration, including:

- User management
- Module management
- Workspace management
- System settings
- Analytics and reporting

### Client Portal

The client portal is the interface that end-users interact with to access their modules and tools. It provides a personalized experience based on the user's role and permissions, and includes:

- User profile management
- Module access
- Workspace selection
- Notifications
- Activity tracking

### Core API

The core API provides the backend services that power the platform, including:

- Authentication and authorization
- User management
- Module orchestration
- Workspace management
- Data storage and retrieval

## Architecture

The platform follows a modular, microservices-inspired architecture with clear separation of concerns:

- **Frontend**: React-based applications using Ant Design for UI components
- **Backend**: Node.js API services with Express
- **Database**: PostgreSQL with Prisma as the ORM
- **Authentication**: JWT-based authentication with role-based access control
- **Module System**: Dynamic module loading and registration
- **Workspace Isolation**: Multi-tenant architecture with workspace isolation

## Development

### Prerequisites

- Node.js >= 18
- PNPM >= 8
- PostgreSQL >= 13

### Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development servers:
   ```bash
   # Start all platform components
   pnpm platform:dev

   # Start specific components
   pnpm admin:dev
   pnpm client:dev
   pnpm api:dev
   ```

### Building

To build the platform for production, run:

```bash
pnpm platform:build
```

### Testing

To run tests for the platform, run:

```bash
pnpm platform:test
```

## Deployment

The platform can be deployed in various ways:

- **Docker**: The platform includes Docker configurations for containerized deployment
- **Kubernetes**: Kubernetes manifests are provided for orchestrated deployment
- **Vercel**: The frontend applications can be deployed to Vercel
- **Heroku**: The API services can be deployed to Heroku
- **AWS**: Deployment scripts for AWS services are provided

For more information on deployment, see the [Deployment Guide](/docs/deployment-guide.md).

## Extending the Platform

The platform is designed to be extended through modules. Modules can add new functionality to the platform without modifying the core codebase. For more information on creating modules, see the [Module Development Guide](/docs/module-development-guide.md).

## Contributing

Contributions to the platform are welcome. Please see the [Contributing Guide](/CONTRIBUTING.md) for more information.# CauldronOS Platform

This directory contains the core platform applications for CauldronOS. These applications provide the foundation for the platform and enable the modular architecture that allows users to install and use various modules.

## Platform Components

### Admin Dashboard

The admin dashboard is the main interface for administrators to manage the platform, users, modules, and settings. It provides a comprehensive set of tools for platform administration, including:

- User management
- Module management
- Workspace management
- System settings
- Analytics and reporting

### Client Portal

The client portal is the interface that end-users interact with to access their modules and tools. It provides a personalized experience based on the user's role and permissions, and includes:

- User profile management
- Module access
- Workspace selection
- Notifications
- Activity tracking

### Core API

The core API provides the backend services that power the platform, including:

- Authentication and authorization
- User management
- Module orchestration
- Workspace management
- Data storage and retrieval

## Architecture

The platform follows a modular, microservices-inspired architecture with clear separation of concerns:

- **Frontend**: React-based applications using Ant Design for UI components
- **Backend**: Node.js API services with Express
- **Database**: PostgreSQL with Prisma as the ORM
- **Authentication**: JWT-based authentication with role-based access control
- **Module System**: Dynamic module loading and registration
- **Workspace Isolation**: Multi-tenant architecture with workspace isolation

## Development

### Prerequisites

- Node.js >= 18
- PNPM >= 8
- PostgreSQL >= 13

### Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development servers:
   ```bash
   # Start all platform components
   pnpm platform:dev

   # Start specific components
   pnpm admin:dev
   pnpm client:dev
   pnpm api:dev
   ```

### Building

To build the platform for production, run:

```bash
pnpm platform:build
```

### Testing

To run tests for the platform, run:

```bash
pnpm platform:test
```

## Deployment

The platform can be deployed in various ways:

- **Docker**: The platform includes Docker configurations for containerized deployment
- **Kubernetes**: Kubernetes manifests are provided for orchestrated deployment
- **Vercel**: The frontend applications can be deployed to Vercel
- **Heroku**: The API services can be deployed to Heroku
- **AWS**: Deployment scripts for AWS services are provided

For more information on deployment, see the [Deployment Guide](/docs/deployment-guide.md).

## Extending the Platform

The platform is designed to be extended through modules. Modules can add new functionality to the platform without modifying the core codebase. For more information on creating modules, see the [Module Development Guide](/docs/module-development-guide.md).

## Contributing

Contributions to the platform are welcome. Please see the [Contributing Guide](/CONTRIBUTING.md) for more information.# CauldronOS Platform

This directory contains the core platform applications for CauldronOS. These applications provide the foundation for the platform and enable the modular architecture that allows users to install and use various modules.

## Platform Components

### Admin Dashboard

The admin dashboard is the main interface for administrators to manage the platform, users, modules, and settings. It provides a comprehensive set of tools for platform administration, including:

- User management
- Module management
- Workspace management
- System settings
- Analytics and reporting

### Client Portal

The client portal is the interface that end-users interact with to access their modules and tools. It provides a personalized experience based on the user's role and permissions, and includes:

- User profile management
- Module access
- Workspace selection
- Notifications
- Activity tracking

### Core API

The core API provides the backend services that power the platform, including:

- Authentication and authorization
- User management
- Module orchestration
- Workspace management
- Data storage and retrieval

## Architecture

The platform follows a modular, microservices-inspired architecture with clear separation of concerns:

- **Frontend**: React-based applications using Ant Design for UI components
- **Backend**: Node.js API services with Express
- **Database**: PostgreSQL with Prisma as the ORM
- **Authentication**: JWT-based authentication with role-based access control
- **Module System**: Dynamic module loading and registration
- **Workspace Isolation**: Multi-tenant architecture with workspace isolation

## Development

### Prerequisites

- Node.js >= 18
- PNPM >= 8
- PostgreSQL >= 13

### Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development servers:
   ```bash
   # Start all platform components
   pnpm platform:dev

   # Start specific components
   pnpm admin:dev
   pnpm client:dev
   pnpm api:dev
   ```

### Building

To build the platform for production, run:

```bash
pnpm platform:build
```

### Testing

To run tests for the platform, run:

```bash
pnpm platform:test
```

## Deployment

The platform can be deployed in various ways:

- **Docker**: The platform includes Docker configurations for containerized deployment
- **Kubernetes**: Kubernetes manifests are provided for orchestrated deployment
- **Vercel**: The frontend applications can be deployed to Vercel
- **Heroku**: The API services can be deployed to Heroku
- **AWS**: Deployment scripts for AWS services are provided

For more information on deployment, see the [Deployment Guide](/docs/deployment-guide.md).

## Extending the Platform

The platform is designed to be extended through modules. Modules can add new functionality to the platform without modifying the core codebase. For more information on creating modules, see the [Module Development Guide](/docs/module-development-guide.md).

## Contributing

Contributions to the platform are welcome. Please see the [Contributing Guide](/CONTRIBUTING.md) for more information.