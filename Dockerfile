FROM node:20-slim AS builder

RUN npm install -g pnpm@latest

WORKDIR /src
COPY package*.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM nginx:stable-alpine

COPY --from=builder /src/dist /usr/share/nginx/html