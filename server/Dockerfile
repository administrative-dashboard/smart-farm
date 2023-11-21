FROM node:18

WORKDIR /app

COPY package.json ./ 
COPY package-lock.json ./ 

RUN npm install

COPY . .



CMD sh -c "npx sequelize db:migrate && npx sequelize db:seed:all && npm run start:dev"

EXPOSE 5000

# CMD ["npm", "run", "start:dev"]
