FROM node:10 as builder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY ./package.json /usr/src/app/package.json
RUN yarn
COPY . /usr/src/app
RUN yarn run build
RUN yarn run exports

FROM node:10
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY ./package.json /usr/src/app/package.json
RUN yarn
COPY . /usr/src/app
COPY --from=builder /usr/src/app/next /usr/src/app/next
EXPOSE 80
CMD ["node", "server.js"]
