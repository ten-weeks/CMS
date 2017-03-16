const Hapi = require('hapi');
const Vision = require('vision');
const Inert = require('inert');
const Handlebars = require('handlebars');
const routes = require('../server/routes.js');
const server = new Hapi.Server();

server.connection({
    port: process.env.PORT || 8080
});

server.register([Vision, Inert], (err) => {
    if (err) throw err;
    server.views({
        engines: {
            html: require('handlebars')
        },
        path: 'templates',
        // partialsPath: 'templates/partials',
        // helpersPath: 'templates/helpers',
    });

    server.route(routes);
});

module.exports = server;
