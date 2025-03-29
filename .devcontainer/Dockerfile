ARG ALPINE_VERSION
ARG NODE_JS_VERSION
FROM node:${NODE_JS_VERSION}-alpine${ALPINE_VERSION}
USER root
RUN apk add --no-cache git
RUN apk add --no-cache openssh
USER node
