
const server = require('./server/server.js');
server.start(function() {
    console.log('listion to 8080', server.info.uri);
});
