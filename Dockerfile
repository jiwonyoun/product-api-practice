# 1. create image with npm packages
FROM node:14-alpine as installer
RUN apk update
WORKDIR /src

COPY package.json package-lock.json ./

RUN npm install

# 2. bundling
FROM installer as builder
WORKDIR /src

COPY . .
RUN ls -al

RUN npm install -g @nestjs/cli 

RUN nest build


# 3. running
FROM installer
WORKDIR /src

ENV  ENV=prod

CMD ["node", "dist/main.js"]
EXPOSE 3002
