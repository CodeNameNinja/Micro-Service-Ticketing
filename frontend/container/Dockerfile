FROM node:16-alpine
ENV NODE_ENV development
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

EXPOSE 8080
CMD ["npm", "run", "start"]