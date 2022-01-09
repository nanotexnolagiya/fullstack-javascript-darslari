FROM node:lts

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN chown -R node:node /app
USER node

EXPOSE 3030
CMD npm start