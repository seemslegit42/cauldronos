# CauldronOS - The WordPress of AI-driven Micro-SaaS

CauldronOS is a modular platform that enables users—from solopreneurs to enterprises—to easily deploy, configure, and manage autonomous AI-driven internal tools and workflows, all without requiring deep technical knowledge.

## Vision

CauldronOS aims to become the WordPress of AI-driven Micro-SaaS, offering a platform that combines the accessibility, modularity, and extensibility of WordPress with the cutting-edge potential of artificial intelligence, creating a scalable ecosystem for AI-powered operations.

## Branding

CauldronOS branding is built around a corporate cyberpunk aesthetic with a focus on three primary colors:

1. **Void Purple** (#2E1A47) - A deep, twilight-like purple that forms the foundation of the brand
2. **Flux Aqua** (#00B2C9) - A vibrant but clear aqua that represents clarity and intelligence
3. **Growth Green** (#00B67F) - A fresh and insightful green that signifies growth and innovation

The brand identity is complemented by a sophisticated typography system:

- **Manrope** - Used for headings and the wordmark
- **Inter** - Used for body text and UI elements
- **JetBrains Mono** - Used for code blocks and technical content

For detailed usage guidelines, please refer to the [Brand Guidelines](docs/brand-guidelines.md) document.

## Tech Stack

- **Framework**: [Wasp](https://wasp.sh) (React + Node.js)
- **UI**: [Ant Design Pro Components](https://procomponents.ant.design/) + [TailwindCSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **API Integration**: [TanStack React Query](https://tanstack.com/query)
- **Schema Validation**: [Zod](https://zod.dev/)
- **Authentication**: Wasp Auth with role-based access and tenant isolation
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **AI Integration**: [CrewAI](https://github.com/joaomdmoura/crewAI) and [Groq Swarm](https://groq.com/) for orchestrating multi-step AI tasks

## New Project Structure

The apps directory follows a WordPress-like architecture with clear separation between core platform and modules:

```
apps/
├── platform/                # Core platform applications
│   ├── admin-dashboard/     # Admin interface for managing the platform
│   ├── client-portal/       # Client-facing portal
│   └── core-api/            # Core API services
│
├── modules/                 # Pluggable modules (like WordPress plugins)
│   ├── ai-assistant/        # AI assistant module
│   ├── crm/                 # Customer Relationship Management module
│   ├── analytics/           # Analytics and reporting module
│   ├── knowledge-base/      # Knowledge base and documentation module
│   ├── calendar/            # Calendar and scheduling module
│   └── email/               # Email marketing module
│
├── themes/                  # UI themes (like WordPress themes)
│   ├── corporate/           # Corporate theme
│   ├── startup/             # Startup theme
│   └── enterprise/          # Enterprise theme
│
└── tools/                   # Development and utility tools
    ├── module-creator/      # Tool for creating new modules
    ├── theme-creator/       # Tool for creating new themes
    └── dev-playground/      # Development playground
```

## Core Concepts

### Platform

The platform apps provide the foundation of CauldronOS. They include:

- **Admin Dashboard**: The main interface for administrators to manage the platform, users, modules, and settings.
- **Client Portal**: The interface that end-users interact with to access their modules and tools.
- **Core API**: The backend services that power the platform, including authentication, user management, and module orchestration.

### Modules

Modules are self-contained applications that provide specific functionality, similar to WordPress plugins. Each module follows a standardized structure:

```
module-name/
├── api/                # Module-specific API endpoints
├── components/         # UI components
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── store/              # State management
├── utils/              # Utility functions
├── index.ts            # Main entry point
├── manifest.json       # Module metadata and configuration
└── README.md           # Documentation
```

### Themes

Themes control the visual appearance and layout of the platform, similar to WordPress themes. They can be switched without affecting functionality.

### Tools

Tools are utilities for developers to create, test, and deploy modules and themes.

## Development

### Prerequisites

- Node.js 16+ (Current version: 22.14.0)
- npm (11.3.0+) or Yarn package manager (1.22.0+)
- PostgreSQL 13+

### Running locally

1. Install dependencies using either npm or yarn:

```bash
# Using npm
npm install

# Using yarn
yarn install
```

2. Set up environment:

- Create `.env.client` and `.env.server` files with correct dev values
- Run the database: `wasp start db`
- Run migrations (if needed): `wasp db migrate-dev`
- Start the development server: `npm run dev` or `yarn dev`

### Code Style

```bash
# Lint the code
npm run lint
# or
yarn lint

# Fix linting issues
npm run lint:fix
# or
yarn lint:fix

# Format the code
npm run format
# or
yarn format
```

### State Management

The application uses Zustand for state management. Store files are located in the `src/store` directory.

### API Integration

API requests are handled using TanStack React Query. The API client and custom hooks are located in the `src/api` directory.

### Authentication

Authentication is handled by Wasp's built-in auth system, with additional role-based access control and tenant isolation.

### UI Components

The application uses Ant Design Pro Components for UI elements, with TailwindCSS for styling. The theme is configured to work with both libraries and follows the CauldronOS brand guidelines.

## Admin Dashboard

The application includes a comprehensive Admin Dashboard for system management and monitoring.

### Features

- **Responsive Layout**: Adapts to different screen sizes with collapsible sidebar
- **Dark Mode Support**: Fully compatible with the cyberpunk theme
- **Metrics Overview**: Key system metrics with visual indicators
- **User Statistics**: Detailed user analytics with charts
- **System Logs**: Filterable and searchable system event logs
- **Modular Components**: Built with reusable, extensible components

### Components

The Admin Dashboard is built using the following modular components:

- **SidebarNav**: Collapsible navigation sidebar with admin menu items
- **TopNavBar**: Header bar with notifications, user profile, and settings
- **MetricsOverview**: Grid of key metrics with trend indicators
- **SystemLogTable**: Interactive table for viewing and managing system logs
- **UserStatsPanel**: User statistics with charts and key metrics

### Usage

- Access the Admin Dashboard at `/admin/dashboard`
- Components can be imported individually from `components/admin`
- All components support loading states and dark mode
- Components can be extended or replaced as needed

## AI Assistant

The application includes a floating AI assistant that provides contextual help and answers questions about the application.

### Features

- **Floating Interface**: Access the AI assistant from anywhere in the application
- **Voice Input**: Speak your questions instead of typing
- **Contextual Awareness**: The assistant understands which module you're currently using
- **Real-time Streaming**: See responses as they're being generated
- **Conversation History**: Review previous interactions

### Usage

- Click the AI icon in the bottom right corner to open the assistant
- Type your question or click the microphone icon to use voice input
- The assistant will provide contextual help based on your current location in the app
- Use keyboard shortcut `Alt+A` to quickly toggle the assistant

### Technical Details

- Built using Ant Design X components
- Uses Groq's LLM API with GPT-4-turbo for generating responses
- Implements streaming responses for real-time interaction
- Stores conversation history in local storage
- Uses Langchain for contextual understanding of application modules

## License

This project is licensed under the MIT License - see the LICENSE file for details.
