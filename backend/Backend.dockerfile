FROM node:18-alpine
WORKDIR /app
COPY .env .env
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
EXPOSE 8081:8081