FROM node:18-alpine

WORKDIR /app

COPY package*.json ./ 

RUN npm install

COPY . .

EXPOSE 5000

CMD sh -c "npx sequelize db:migrate && npx sequelize db:seed:all && npm run start:dev"