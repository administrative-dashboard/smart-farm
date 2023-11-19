FROM node:20.9.0

# RUN mkdir -p /usr/app
WORKDIR /usr/src/app


COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]