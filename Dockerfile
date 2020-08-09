FROM node:12.14-alpine

LABEL AUTOR="Victor Comette <victor.comette@gmail.com>"

ARG DATABASE_URL
ARG PGUSER
ARG PGPASSWORD
ARG PGDATABASE
ARG JWT_SECRET
ARG API_KEY

ENV DATABASE_URL=$DATABASE_URL
ENV PGUSER=$PGUSER
ENV PGPASSWORD=$PGPASSWORD
ENV PGDATABASE=$PGDATABASE
ENV JWT_SECRET=$JWT_SECRET
ENV API_KEY=$API_KEY

ENV container docker
ENV ENVIRONMENT homolog

WORKDIR /api

COPY ./ /api

RUN apk --no-cache --virtual build-dependencies add \
  python \
  make \
  g++ \
  curl

RUN npm run build

ENTRYPOINT [ "/bin/sh", "-c", "npm install && npm run start" ]