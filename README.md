# CauldronOS Monorepo

A modern, modular monorepo for the CauldronOS platform, optimized for scalability, developer experience, build speed, and component reusability. The UI system has been overhauled with Ant Design X and Motion Intelligence for a unified, intelligent, animated enterprise UI/UX system.

## 🏗️ Architecture

This monorepo follows a domain-driven, modular architecture with clear separation of concerns:

```
cauldronos/
├── apps/                  # Application frontends
│   ├── admin-dashboard/   # Admin interface
│   ├── client-portal/     # Client-facing portal
│   └── cauldron-core/     # Core AI system interface
├── packages/              # Shared libraries
│   ├── ui/                # UI component library (Ant Design X + Motion Intelligence)
│   ├── hooks/             # Shared React hooks
│   ├── utils/             # Pure utility functions
│   ├── agents/            # AI agent blueprints and interfaces
│   └── api/               # API layer and services
├── configs/               # Shared configurations
│   ├── eslint/            # ESLint configurations
│   ├── tsconfig/          # TypeScript configurations
│   ├── umi/               # UMI configurations
│   └── tailwind/          # Tailwind CSS configurations
├── scripts/               # Build and development scripts
├── e2e-tests/             # End-to-end tests
├── blog/                  # Documentation blog
├── design-system.json     # Design system tokens and configuration
├── component-map.md       # Component migration guide
└── usage-guide.md         # UI development guide
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- PNPM >= 8

### Installation

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build
```

### Development

```bash
# Start development servers for all apps
pnpm dev

# Start a specific app
pnpm --filter admin-dashboard dev
pnpm --filter client-portal dev
pnpm --filter cauldron-core dev

# Run the blog
pnpm blog:dev
```

### Testing

```bash
# Run all tests
pnpm test

# Run end-to-end tests
pnpm e2e:test
```

## 📦 Packages

### UI Components (`@cauldronos/ui`)

Shared UI components following atomic design principles with AI-native features and motion intelligence:

- `atoms/`: Basic building blocks (Button, Input, Typography, etc.)
- `molecules/`: Combinations of atoms (Card, AnimatedCard, Form, Menu, etc.)
- `organisms/`: Complex components (Header, Sidebar, SmartTable, etc.)
- `templates/`: Page layouts (DashboardLayout, AuthLayout, etc.)
- `animations/`: Animation components and utilities
- `theme/`: Theme system and utilities

### Hooks (`@cauldronos/hooks`)

Shared React hooks for data, auth, UI, and motion.

### Utils (`@cauldronos/utils`)

Pure utility functions for string manipulation, date formatting, etc.

### Agents (`@cauldronos/agents`)

AI agent blueprints, interfaces, and utilities.

### API (`@cauldronos/api`)

API client, endpoints, schemas, and utilities.

## 🎨 Design System

The CauldronOS platform follows "The Cauldron Way™" design system:

### Core Principles

- **Intelligence First**: Every interface feels like an intelligent conversation
- **Motion with Meaning**: Animation enhances understanding, not distracts
- **Consistency and Coherence**: Unified experience across all interfaces
- **Accessibility and Inclusivity**: Design for all users, regardless of ability

### Technical Foundation

- Built with Ant Design, Ant Design X, and Ant Design Pro components
- Enhanced with Framer Motion for fluid animations and micro-interactions
- Supports dark mode and responsive design out of the box
- Uses TailwindCSS for styling with the `twMerge` utility
- AI-native components provide intelligent features and adaptability

## 🧩 Development Guidelines

- Use PNPM exclusively for dependency management
- Follow atomic design principles for UI components
- Use TailwindCSS for styling with the `twMerge` utility
- Ensure all components support dark mode and keyboard accessibility
- Use Zod for form validation
- Write strict TypeScript code with proper typing
- Follow the established directory structure
- Refer to the [usage-guide.md](./usage-guide.md) for UI development best practices

## 📚 Documentation

- [design-system.json](./design-system.json) - Color tokens, spacing, typography, component variants
- [component-map.md](./component-map.md) - Old ➡️ New components list with replacement rationale
- [usage-guide.md](./usage-guide.md) - A short dev guide on how to build UI "The Cauldron Way™"

## 📝 License

This project is proprietary and confidential.