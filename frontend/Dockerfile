ARG NODE_IMAGE=node:20
ARG DEFAULT_VERSION=0.0.0
ARG DEFAULT_REQUEST_CLIENT_MODE=WINDOW
ARG DEFAULT_NODE_ENV=production
ARG DEFAULT_GENERATE_SOURCEMAP=false
ARG DEFAULT_PUBLIC_URL=http://localhost:3000

FROM $NODE_IMAGE as node-image

FROM node-image

ARG DEFAULT_VERSION
ARG DEFAULT_REQUEST_CLIENT_MODE
ARG DEFAULT_NODE_ENV
ARG DEFAULT_GENERATE_SOURCEMAP
ARG DEFAULT_PUBLIC_URL

ENV REACT_APP_VERSION=$DEFAULT_VERSION
ENV PATH=/app/node_modules/.bin:$PATH
ENV REACT_APP_REQUEST_CLIENT_MODE=$DEFAULT_REQUEST_CLIENT_MODE
ENV PUBLIC_URL=$DEFAULT_PUBLIC_URL
ENV REACT_APP_PUBLIC_URL=$DEFAULT_PUBLIC_URL
ENV NODE_ENV=$DEFAULT_NODE_ENV
ENV GENERATE_SOURCEMAP=$DEFAULT_GENERATE_SOURCEMAP

WORKDIR /app
COPY ./package*.json ./
RUN echo 'frontend/Dockerfile'
RUN ["npm", "ci", "--include=dev", "--loglevel", "verbose"]
RUN ["npm", "rebuild", "node-sass", "--sass-binary-name=linux-x64-83"]
COPY tsconfig.json ./tsconfig.json
#COPY config ./config
#COPY scripts ./scripts
COPY public ./public
COPY src ./src
#COPY --from=nor-shared-image /app/shared/src ./src/shared
RUN ["npm", "run", "build"]
