var hapi = require('hapi');
var Joi = require('joi')
var server = new hapi.Server();
server.connection({
  port:8080
});
