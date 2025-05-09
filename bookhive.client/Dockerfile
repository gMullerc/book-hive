FROM node:20-alpine

ENV HOME=/home/app
WORKDIR ${HOME}

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 50253

CMD ["npm", "run", "dev"]