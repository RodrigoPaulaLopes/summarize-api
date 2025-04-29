FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile install
COPY . .

CMD [ "yarn", "start:dev"]
