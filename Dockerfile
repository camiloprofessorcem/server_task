FROM docker.io/node
WORKDIR /usr/src/app
COPY . .
RUN npm i
CMD ["node","index.js"]