
FROM node:20.9.0

# A directory within the virtualized Docker environment
WORKDIR /usr/src/app

# Copies package.json and package-lock.json to Docker environment
COPY package.json package-lock.json ./

# Installs all node packages
RUN npm install

# Copies everything over to Docker environment
COPY . .

# Uses port which is used by the actual application
EXPOSE 3000

# Finally runs the application
CMD [ "npm", "start" ]
