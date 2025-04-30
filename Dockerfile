FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN sed -i "s/isDev: true,/isDev: false,/" src/env/environment.ts
RUN npm run build
### STAGE 2: Run ###
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/my-app/browser /usr/share/nginx/html
