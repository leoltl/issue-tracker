FROM node:12.16.2-stretch

WORKDIR /usr/app

COPY package.json .
COPY package-lock.json . 
RUN npm install

COPY . .

CMD ["npm", "dev"]
