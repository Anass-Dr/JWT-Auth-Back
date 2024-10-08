FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM base AS test
ENV JWT_SECRET=test
RUN npm test

FROM base AS build
EXPOSE 3000
CMD npm start