FROM node:20.16-alpine3.19
LABEL authors="JanAtzgerstorfer"
WORKDIR /build
COPY package*.json .
RUN npm update && npm install -y
COPY . .
EXPOSE 3000

CMD [ "node", "server.js" ]