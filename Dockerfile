FROM alpine
RUN apk add --update npm
RUN mkdir /usr/local/moencoding
WORKDIR /usr/local/moencoding
COPY . .
RUN npm install
EXPOSE 8080

CMD ["npm", "run", "start-prod"]
