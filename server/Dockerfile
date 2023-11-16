FROM node:18

WORKDIR /app

COPY package.json ./ 
COPY package-lock.json ./ 

RUN npm install

COPY . .


RUN chmod +x startup.sh
RUN npm i -g sequelize-cli
# copy /app/ ./app
EXPOSE 5000

CMD ["npm", "run", "start:dev"]
