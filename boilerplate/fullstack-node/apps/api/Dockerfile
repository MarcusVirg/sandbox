FROM node:22.7-apline AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22.7-apline
ARG PORT=8000
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist
EXPOSE ${PORT}
CMD ["npm", "run", "start"]
