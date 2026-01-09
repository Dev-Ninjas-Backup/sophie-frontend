FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./


RUN npm ci


COPY . .


ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL

RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production


COPY --from=builder /app/dist ./dist


ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000


RUN npm install -g serve

# Start the app
CMD ["serve", "-s", "dist", "-l", "3000"]