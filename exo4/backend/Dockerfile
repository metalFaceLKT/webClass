FROM node:18-alpine
WORKDIR /app
COPY package*.json ./

COPY . .
USER node
EXPOSE 5000
CMD ["npm", "start"]