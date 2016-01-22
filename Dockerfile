# DOCKER-VERSION 1.4.1

# retrive the node docker image
FROM registry.eu-gb.bluemix.net/ibmnode:latest

# retrieve the app source code
RUN git clone https://github.com/edevregille/node-todo-uk.git

WORKDIR node-todo-uk

RUN npm install

# expose port
EXPOSE 8080

#launch the app
CMD sleep 5 && node server.js
