FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock* ./

RUN yarn install --production=false

COPY tsconfig*.json ./
COPY src ./src

RUN yarn build

CMD ["node", "dist/index.js"]


