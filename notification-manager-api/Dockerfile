FROM node:14
WORKDIR /opt/notification-manager-api
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "node", "./src/bin/www"]