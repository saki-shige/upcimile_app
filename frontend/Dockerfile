FROM node:16.17.0-alpine
WORKDIR /usr/src/app

ENV LANG=C.UTF-8
ENV TZ=Asia/Tokyo

COPY app/package*.json ./
COPY app/tsconfig.json ./

RUN npm install -g npm@8.18.0
RUN npm install -g react-scripts
RUN npm i -D @types/node typescript ts-node

COPY /app ./
