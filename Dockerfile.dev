FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn dev:typeorm migration:run

RUN yarn dev:seed:run

EXPOSE 3333

CMD ["yarn", "dev"]
