FROM ubuntu:20.04

RUN mkdir /app
WORKDIR /app
ADD . /app

CMD npm start