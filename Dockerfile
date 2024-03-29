FROM node:16.15-alpine
WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
