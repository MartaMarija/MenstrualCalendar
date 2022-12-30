#! /bin/sh

cd src/db/entrypoint

docker stop mencaldb;

docker rm mencaldb;

docker-compose up -d;