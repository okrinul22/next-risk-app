# Stage 1: install dependencies
FROM node:20-alpine AS deps
RUN apk update && apk add --no-cache tini
WORKDIR /app
COPY package*.json .
RUN npm ci --only=production

# Stage 2: build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
RUN rm -rf node_modules
COPY --from=deps /app/node_modules ./node_modules

# Stage 3: run
FROM node:20-alpine AS runner
RUN apk update && apk add --no-cache curl
ARG HOSTNAME=0.0.0.0
ARG NODE_ENV=production
ENV HOSTNAME=$HOSTNAME
ENV NODE_ENV=$NODE_ENV
ENV PORT=3000
WORKDIR /app
RUN addgroup --system --gid 1001 nonroot && adduser --system --uid 1001 nonroot
COPY --from=deps /sbin/tini /sbin/tini
COPY --from=builder --chown=nonroot:nonroot /app/.next ./.next
COPY --from=builder --chown=nonroot:nonroot /app/public ./public
COPY --from=builder --chown=nonroot:nonroot /app/node_modules ./node_modules
COPY --from=builder --chown=nonroot:nonroot /app/package.json ./

USER nonroot:nonroot

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["npm", "start"]