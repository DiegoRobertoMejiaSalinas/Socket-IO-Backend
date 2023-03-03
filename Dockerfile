FROM node:14-alpine as builder

WORKDIR /usr/src/app

COPY package*.json .

RUN yarn install

COPY . .

RUN yarn run build

CMD ["yarn", "run", "start"]


FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json .

RUN yarn install --production

COPY --from=builder /usr/src/app/dist ./dist

CMD ["yarn", "run", "start:prod"]