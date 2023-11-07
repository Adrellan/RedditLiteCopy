# Az alpine linux legújabb verziójú node alapú kép kiválasztása
FROM node:lts-alpine

# A munkakönyvtár beállítása
WORKDIR /app

# A függőségek másolása és telepítése
COPY . .
RUN npm install
RUN npm run build


# Az alkalmazás portjának kinyitása
EXPOSE 3560
WORKDIR /app/build
# Az alkalmazás indítása
CMD ["node", "index.js"]