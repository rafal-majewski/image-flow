ARG ALPINE_VERSION
FROM alpine:${ALPINE_VERSION} AS developing
USER root
RUN adduser -D -h /home/developer -u 1000 developer
RUN apk add --no-cache \
	git \
	openssh
ARG NODE_VERSION
ARG NPM_VERSION
RUN apk add --no-cache \
	nodejs=${NODE_VERSION} \
	npm=${NPM_VERSION}
RUN npm install --global npm-check-updates
