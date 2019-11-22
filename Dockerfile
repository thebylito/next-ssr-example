# Caso seja Interno
# FROM node:10 as builder
# RUN mkdir /usr/src/app
# WORKDIR /usr/src/app
# COPY ./package.json /usr/src/app/package.json
# RUN yarn
# COPY . /usr/src/app
# RUN NODE_ENV=production yarn run build
# RUN NODE_ENV=production yarn run exports

# FROM node:10
# RUN mkdir /usr/src/app
# WORKDIR /usr/src/app
# COPY ./package.json /usr/src/app/package.json
# RUN yarn
# COPY . /usr/src/app
# COPY --from=builder /usr/src/app/next /usr/src/app/next
# EXPOSE 80
#
#CMD ["node", "server.js"]

# Caso seja DMZ, Build deve ser feito localmente
### BUILDAMOS LOCALMENTE E NO "DEPLOY" ELE E APENAS EXECUTADO
### yarn build && tar -cvf ./deploy.tar --exclude='*.map' ./captain-definition ./*
### APOS criar o deploy.tar deve subir com o comando "caprover deploy -t ./deploy.tar"
FROM node:10
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app/
EXPOSE 80
CMD ["node", "server.js"]
