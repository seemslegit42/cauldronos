# 🔥 CauldronOS
[![Build Status](https://img.shields.io/github/actions/workflow/status/your-org/cauldronos/build.yml?branch=main&label=Build&style=for-the-badge)](https://github.com/your-org/cauldronos/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)
[![Made with Wasp](https://img.shields.io/badge/Made%20with-Wasp-blue.svg?style=for-the-badge)](https://wasp-lang.dev)
[![UI: Ant Design](https://img.shields.io/badge/UI-Ant%20Design-blueviolet.svg?style=for-the-badge)](https://ant.design)
[![Deploy to Vercel](https://vercelbadge.vercel.app/api/your-org/cauldronos)](https://vercel.com/import/project?template=https://github.com/your-org/cauldronos)
[![AI Powered by CrewAI](https://img.shields.io/badge/AI%20Powered-CrewAI-yellow.svg?style=for-the-badge)](https://github.com/joaomdmoura/crewAI)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](CONTRIBUTING.md)


> **Command your enterprise like a starship.**

CauldronOS is the world’s first **Sentient Enterprise Operating System (sEOS)** — a modular, AI-orchestrated platform where **autonomous AI crews**, not apps, run your internal operations. It’s not software. It’s not a dashboard. It’s your company’s digital nervous system.

---

### 🧠 Why CauldronOS?

**Tired of clunky apps, brittle automation, and endless dashboards?**

CauldronOS fuses the intelligence of CrewAI-powered agent teams with modular micro-SaaS architecture, giving you:

- 🔁 **Autonomous AI Crews** — deploy self-managing teams like "Customer Support Triage" or "Lead Research & Outreach"
- 🎛️ **Drag-and-Drop Modules** — launch internal tools as fast as you can think
- 🧩 **Multi-Tenant Workspaces** — scale intelligently across teams and orgs
- ⚡ **Groq-accelerated AI** — inference at the speed of thought
- 🔐 **Enterprise-Ready Auth & RBAC** — built-in security with zero setup
- 📊 **Real-Time Dashboards & Crew Analytics** — your entire operation, visible and alive

---

### 🚀 What You Can Do with CauldronOS

- 🔮 Build AI-first internal tools with zero boilerplate
- 🧠 Empower non-technical users to orchestrate intelligent workflows
- 🛠️ Offer a marketplace of "AI Teams in a Box" to monetize capabilities
- ⚙️ Extend with custom agents, tools, and CrewAI plugins
- 🧬 Treat your company like a living organism—adaptive, responsive, aware

---

### 💀 Forget the old way. This is CauldronOS.

This is how enterprises evolve.

---

### 🧪 Getting Started

```bash
# Coming soon...
# One-line install script goes here
```

> Want to contribute? Join the rebellion.

---

### 🧠 Tech Stack Highlights
- Ant Design (UI)
- Wasp + React + Node.js + Prisma (Full-Stack)
- CrewAI (Autonomous Multi-Agent System)
- LangGraph + LangChain (AI Orchestration)
- SuperAGI / CopilotKit / Zod / Zustand / React Query
- Groq SDK (Ultra-fast LLM Inference)

---

**CauldronOS is not a product. It’s a paradigm shift.**

Welcome to the operating system of the intelligent enterprise.

> Built by Bitbrew


## 🔑 Core Features

- **Auth & Access Control**
  - Sign up / Sign in / Logout
  - Role-based access: Admin, Manager, User
  - Workspace support (multi-tenant)
- **UI Layout**
  - Ant Design layout system
  - Left sidebar nav (with collapsible nested modules)
  - Top nav: Workspace switcher, notifications, user menu
  - Dark/light mode toggle
- **Core Pages**
  1. **Dashboard** – Overview widgets per workspace (users, modules, recent activity)
  2. **Modules** – List of active modules, toggle on/off, and "Install New Module" button
  3. **Users** – Admin-only user manager, invites, role editor
  4. **Workspace Settings** – Plan info, rename, billing stub
  5. **Account Settings** – User profile, password, preferences
  6. **Dev Playground** – For devs to test future modules (Ant Design playground)

## 🧩 Built for Extensibility

- Modular routing (e.g., `/modules/crm`, `/modules/wiki`, `/modules/ai-assistant`)
- Dynamic sidebar population based on installed modules
- Module scaffold follows same page layout template (sidebar + topnav)
- APIs stubbed per module, easy to expand later

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

### Production Deployment

#### Self-Hosted Deployment

1. Build the production-ready application:
   ```bash
   pnpm build
   ```

2. Start the production server:
   ```bash
   # For all applications
   pnpm start

   # For specific applications
   pnpm --filter admin-dashboard start
   pnpm --filter client-portal start
   pnpm --filter cauldron-core start
   ```

#### Cloud Deployment

##### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure the following settings:
   - Framework Preset: Other
   - Build Command: `pnpm build`
   - Output Directory: `dist`
   - Install Command: `pnpm install`

3. Set up environment variables in the Vercel dashboard

##### Docker Deployment

1. Build the Docker image:
   ```bash
   docker build -t cauldronos:latest .
   ```

2. Run the Docker container:
   ```bash
   docker run -p 3000:3000 -p 3001:3001 -p 3002:3002 cauldronos:latest
   ```

#### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/cauldronos

# Authentication
JWT_SECRET=your-jwt-secret
SESSION_SECRET=your-session-secret

# AI Services
OPENAI_API_KEY=your-openai-api-key
GROQ_API_KEY=your-groq-api-key

# Email
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASSWORD=your-smtp-password
```

#### Production Checklist

Before deploying to production, ensure you've completed the [production-readiness.md](./production-readiness.md) checklist.

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