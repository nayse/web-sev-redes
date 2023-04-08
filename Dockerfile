FROM node:14-alpine

WORKDIR /aplicacao

COPY package*.json ./

RUN npm install

RUN apk update && apk add --no-cache httpie

COPY . .

EXPOSE 3000

CMD ["npm", "start"]


