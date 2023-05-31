FROM node:latest as build-stage
WORKDIR /app
COPY . .
COPY docker.env .env
RUN yarn
RUN yarn build

FROM nginx:latest as server-stage
COPY --from=build-stage app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]