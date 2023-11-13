# Stage 1: Builder
FROM node:18 as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod
# Stage 2: Serve using Nginx
FROM nginx:1.21.3-alpine

COPY --from=builder /app/dist/reddit-lite-copy/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/
RUN cat /etc/nginx/nginx.conf
EXPOSE 9080

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/nginx.conf && nginx -g 'daemon off;'