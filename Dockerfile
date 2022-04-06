#FROM node:14.15.4-alpine3.12
#FROM node:16
FROM arm64v8/node:14.15.4-alpine
ENV PATH /app/node_modules/.bin:$PATH

# workdir
WORKDIR /app

# ENV
ENV PORT 9000
ENV HOST 0.0.0.0

COPY . ./
RUN yarn install
#RUN yarn build

# start
EXPOSE 9000
CMD yarn start server.js
