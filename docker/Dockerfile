FROM node:latest as stage-node
WORKDIR /build
COPY package.json yarn.lock ./
RUN yarn
COPY . .
ENV API_URI=remotehost
ENV XYZ=FromContainerBuild
RUN yarn build

FROM nginx:latest
COPY --from=stage-node /build/dist usr/share/nginx/html
COPY docker/default.conf /etc/nginx/conf.d/.
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]