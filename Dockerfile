FROM node:18 AS builder
WORKDIR /app
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY . ./
RUN npm run build

FROM nginx:alpine
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]