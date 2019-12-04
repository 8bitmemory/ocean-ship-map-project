#!/bin/bash
echo "You must have docker installed for script to work"
cd oceanShipClient/
docker build -t ocean-react:dev .
docker run -v ${PWD}:/app -v /app/node_modules -p 3000:3000 --rm -d ocean-react:dev
cd ../oceanShipBackend
docker build -t flask-sample-one:dev .
docker run -p 5000:5000 -d flask-sample-one:dev
echo "Flask api can be accessed with 'http://localhost:5000/api/ping' and react client 'http://localhost:3000/'"