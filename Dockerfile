# Stage 1: install dependencies
FROM node:20-alpine AS deps
RUN corepack enable && corepack prepare pnpm@latest-8 --activate
RUN apk update && apk add --no-cache tini
WORKDIR /app
COPY package*.json .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

# Stage 2: build
FROM node:20-alpine AS builder
RUN corepack enable && corepack prepare pnpm@latest-8 --activate
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm build
RUN rm -rf node_modules
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod

# Stage 3: run
FROM node:20-alpine AS runner
RUN apk update && apk add --no-cache curl
ARG HOSTNAME 0.0.0.0
ARG NODE_ENV production
ENV HOSTNAME=$HOSTNAME
ENV NODE_ENV=$NODE_ENV
RUN corepack enable && corepack prepare pnpm@latest-8 --activate
WORKDIR /app
RUN addgroup --system --gid 1001 nonroot && adduser --system --uid 1001 nonroot
COPY --from=builder --chown=nonroot:nonroot /app/.next ./.next
COPY --from=builder --chown=nonroot:nonroot /app/public ./public
COPY --from=builder --chown=nonroot:nonroot /app/node_modules ./node_modules
COPY --from=builder --chown=nonroot:nonroot /app/package.json ./

COPY --from=deps /sbin/tini /sbin/tini

USER nonroot:nonroot

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["pnpm", "start"]