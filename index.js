var hapi = require('hapi');
var Joi = require('joi');
const Path = require('path');
const dbinsert = require('./helpers/dbinsert');
const dbselect = require('./helpers/dbselect');
var qs = require('querystring');

//const utils = require('./helpers/utils');

var server = new hapi.Server();
server.connection({
    port: 8080
});

server.register([require('vision'), require('inert')], function(err) {
    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/aa',
        handler: function(request, reply) {
dbselect.selectimage(function(result){
  reply.file('images/'+ result);

})

        }
    })


server.route({
    method: 'GET',
    path: '/',
    handler: function(req, reply) {
      reply.view('blogs');

}
});
server.route({
    method: 'GET',
    path: '/admin',
    handler: function(req, reply) {
        reply.view('layout/admin');

    }
});

server.route({
    method: 'POST',
    path: '/controlpanel',
    handler: function(req, reply) {
        //  var email = req.payload.email;
        reply.view('layout/controlpanel');

    },
    config: {
        validate: {
            payload: {
                email: Joi.string().email().required(),
                password: Joi.number().integer().required()

            }
        }
    }
});

server.route({
    method: 'POST',
    path: '/store',
    handler: function(req, reply) {
        //console.log("req.payload",req.payload);
        var title = req.payload.title;
        var content = req.payload.content;
        var image = req.payload.imageFile;
        dbinsert.insert(title, content, image);
        reply.view('layout/controlpanel')
    }
});
server.views({
engines: {
    html: require('handlebars')
},
relativeTo: __dirname,
path: 'templates',
helpersPath: 'helpers'

});

});
server.start(function() {
    console.log('listion to 8080', server.info.uri);
});
