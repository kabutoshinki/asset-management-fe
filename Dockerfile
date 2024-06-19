FROM node:20-alpine as base

FROM base as builder

WORKDIR /app

COPY . .

RUN rm -rf node_modules

RUN npm ci

RUN npm run build

FROM base as runner

WORKDIR /app

COPY --from=builder /app/public ./public

RUN mkdir .next

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000
ENV NODE_ENV production

CMD HOSTNAME="0.0.0.0" node server.js