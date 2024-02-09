FROM node:21

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3333

CMD [ "npm", "run", "start:dev" ]

