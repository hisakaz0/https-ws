
FROM node:lts-slim

USER node
WORKDIR /home/node

COPY index.js .
COPY package.json .
COPY package-lock.json .

RUN npm install

CMD npm start

