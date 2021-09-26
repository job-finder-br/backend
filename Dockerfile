FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

RUN cp ./src/config/storageSecrets.json ./build/config/storageSecrets.json

RUN rm -rf ./src

RUN yarn typeorm migration:run

RUN yarn seed:run

EXPOSE 3333

CMD ["yarn", "start"]
