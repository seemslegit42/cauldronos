FROM node:18-alpine AS base

# Install pnpm
RUN npm install -g pnpm@10.9.0

# Set working directory
WORKDIR /app

# Copy package.json and related files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy all package.json files
COPY apps/admin-dashboard/package.json ./apps/admin-dashboard/package.json
COPY apps/client-portal/package.json ./apps/client-portal/package.json
COPY apps/cauldron-core/package.json ./apps/cauldron-core/package.json
COPY packages/ui/package.json ./packages/ui/package.json
COPY packages/hooks/package.json ./packages/hooks/package.json
COPY packages/utils/package.json ./packages/utils/package.json
COPY packages/agents/package.json ./packages/agents/package.json
COPY packages/api/package.json ./packages/api/package.json

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy all files
COPY . .

# Build all packages
RUN pnpm build

# Production image
FROM node:18-alpine AS production

WORKDIR /app

# Copy built artifacts and node_modules
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=base /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=base /app/turbo.json ./turbo.json

# Copy built packages
COPY --from=base /app/packages/ui/dist ./packages/ui/dist
COPY --from=base /app/packages/ui/package.json ./packages/ui/package.json
COPY --from=base /app/packages/hooks/dist ./packages/hooks/dist
COPY --from=base /app/packages/hooks/package.json ./packages/hooks/package.json
COPY --from=base /app/packages/utils/dist ./packages/utils/dist
COPY --from=base /app/packages/utils/package.json ./packages/utils/package.json
COPY --from=base /app/packages/agents/dist ./packages/agents/dist
COPY --from=base /app/packages/agents/package.json ./packages/agents/package.json
COPY --from=base /app/packages/api/dist ./packages/api/dist
COPY --from=base /app/packages/api/package.json ./packages/api/package.json

# Copy built apps
COPY --from=base /app/apps/admin-dashboard/dist ./apps/admin-dashboard/dist
COPY --from=base /app/apps/admin-dashboard/package.json ./apps/admin-dashboard/package.json
COPY --from=base /app/apps/client-portal/dist ./apps/client-portal/dist
COPY --from=base /app/apps/client-portal/package.json ./apps/client-portal/package.json
COPY --from=base /app/apps/cauldron-core/dist ./apps/cauldron-core/dist
COPY --from=base /app/apps/cauldron-core/package.json ./apps/cauldron-core/package.json

# Expose ports
EXPOSE 3000 3001 3002

# Start all applications
CMD ["pnpm", "start"]
