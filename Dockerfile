FROM node:20.18.0-alpine
WORKDIR /home/node/app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "run", "start"]
