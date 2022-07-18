# 1. create image with npm packages
FROM node:14-alpine as installer
RUN apk update
WORKDIR /

COPY package.json package-lock.json ./

RUN npm install

# 2. bundling
FROM installer as builder
WORKDIR /

COPY . .
RUN ls -al

RUN npm install -g @nestjs/cli 

RUN nest build


# 3. running
FROM installer
WORKDIR /

ENV ENV=prod

CMD ["npm", "run", "start"]
EXPOSE 3002
