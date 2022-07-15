# 1. create image with npm packages
FROM node:14-alpine as installer
RUN apk update
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

# 2. bundling
FROM installer as builder
WORKDIR /app

COPY . .
RUN ls -al

RUN npm install -g @nestjs/cli 

RUN nest build


# 3. running
FROM installer
WORKDIR /app

ENV  ENV=prod

COPY --from=builder /dist ./dist
COPY --from=builder /.env.prod ./

CMD ["node", "dist/main.js"]
EXPOSE 3002
