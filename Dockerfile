FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM build AS test
ENV JWT_SECRET=test
RUN npm test

FROM build AS prod
EXPOSE 3000
CMD npm start