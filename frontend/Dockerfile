# 1. Fázis: Statikus oldal készítése npm build-el
FROM node:latest as build

WORKDIR /frontend

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

# 2. Fázis: Statikus oldal átmásolása egy nginx containerbe és a weboldal kiszolgálása
FROM nginx:latest

COPY --from=build /frontend/www /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

