# stage 1: build angular

FROM node:21.7.0-bullseye-slim AS build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build --prod

# stage 2: server

FROM nginx:stable-bullseye AS server

COPY --from=build /app/dist/the-movie-frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80