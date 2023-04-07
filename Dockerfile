FROM node:18


COPY package*.json .
RUN npm i
COPY . .
RUN npm build
CMD [ "npm", "start" ]