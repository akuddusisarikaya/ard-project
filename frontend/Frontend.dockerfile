FROM node:18-alpine
WORKDIR /app
RUN npm install -g vite
COPY .env .env
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["vite", "--host"]
EXPOSE 5173:5173