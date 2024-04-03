FROM node:14 as build

WORKDIR /build

COPY . /build/

RUN npm i
RUN npm run ng build --prod

FROM nginx:latest

ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /build/dist/web-ui /usr/share/nginx/html

EXPOSE 4200
