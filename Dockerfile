FROM docker.io/node
WORKDIR /usr/src/app
COPY . .
RUN npm i
EXPOSE 9000
CMD ["node","index.js"]