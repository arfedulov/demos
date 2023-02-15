FROM node:16

COPY . /app

WORKDIR /app

EXPOSE 3000

RUN npm ci
CMD ["node", "server.mjs"]
