
FROM node:18

WORKDIR /app

COPY package.json ./ 
COPY package-lock.json ./ 

RUN npm i

COPY . .


# copy /app/ ./app

EXPOSE 3000

CMD ["npm", "start"]`
