# Using lightweight alpine image
FROM python:3.6-alpine

# Installing packages
RUN apk update

# Install simple API dependencies
RUN pip3 install flask flask-cors

# Defining working directory and adding source code
WORKDIR /usr/src/app
COPY . .
ENV FLASK_APP=./api/index.py



# Start app
EXPOSE 5000
CMD [ "flask","run","-h","0.0.0.0" ] 