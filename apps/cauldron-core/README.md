# CauldronOS

CauldronOS is a modular operating system for micro-SaaS tools, built with modern web technologies.

## Branding

CauldronOS branding is built around a corporate cyberpunk aesthetic with a focus on three primary colors:

1. **Void Purple** (#2E1A47) - A deep, twilight-like purple that forms the foundation of the brand
2. **Flux Aqua** (#00B2C9) - A vibrant but clear aqua that represents clarity and intelligence
3. **Growth Green** (#00B67F) - A fresh and insightful green that signifies growth and innovation

The brand identity is complemented by a sophisticated typography system:

- **Manrope** - Used for headings and the wordmark
- **Inter** - Used for body text and UI elements
- **JetBrains Mono** - Used for code blocks and technical content

The iconography system uses geometric precision and clean lines:

- **UI Icons** - Navigation, actions, and interface elements
- **Feature Icons** - Specific features or modules within CauldronOS
- **Status Icons** - System status, notifications, and alerts

For detailed usage guidelines, please refer to the [Brand Guidelines](docs/brand-guidelines.md) document.

## Tech Stack

- **Framework**: [Wasp](https://wasp.sh) (React + Node.js)
- **UI**: [Ant Design Pro Components](https://procomponents.ant.design/) + [TailwindCSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **API Integration**: [TanStack React Query](https://tanstack.com/query)
- **Schema Validation**: [Zod](https://zod.dev/)
- **Authentication**: Wasp Auth with role-based access and tenant isolation
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **AI Integration**: [Groq Swarm](https://groq.com/) for orchestrating multi-step AI tasks

## Project Structure

```
src/
├── api/                  # API client and React Query hooks
├── auth/                 # Authentication and authorization
│   ├── components/       # Auth-related components
│   ├── email-and-pass/   # Email authentication
│   └── permissions/      # Permission system
├── client/               # Client-side code
│   ├── components/       # Shared components
│   ├── hooks/            # Custom React hooks
│   └── providers/        # Context providers
├── layout/               # Layout components
├── modules/              # Modular features
├── pages/                # Page components
├── schemas/              # Zod schemas
├── store/                # Zustand stores
├── styles/               # Global styles and theme
├── theme/                # Theme configuration
├── docs/                 # Documentation including brand guidelines
├── icons/                # Custom icon components
├── utils/                # Utility functions
└── workspace/            # Workspace-related code
```

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
