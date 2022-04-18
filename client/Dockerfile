# Stage 1: build
FROM node:16-alpine as build

WORKDIR /app

# add the node_modules folder to $PATH
ENV PATH /app/node_modules/.bin:$PATH


COPY ./package.json /app/

# install  dependencies
RUN yarn --silent

# copy everything to /app directory
COPY . /app

RUN yarn build

# Stage 2: prod
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

CMD [ "nginx", "-g", "daemon off;" ]