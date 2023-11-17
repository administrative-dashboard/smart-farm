FROM node:18

WORKDIR /app

COPY package.json ./ 
COPY package-lock.json ./ 

RUN npm install

COPY . .

RUN npm i -g sequelize-cli

EXPOSE 5000

CMD ["npm", "run", "start:dev"]