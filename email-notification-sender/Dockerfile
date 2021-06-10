FROM node:14
WORKDIR /opt/email-notification-sender
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node", "./src/main.js"]