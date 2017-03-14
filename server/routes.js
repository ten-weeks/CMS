var Joi = require('joi');
const dbutils = require('../app/dbutils.js');
var client = dbutils.dbconnection;
var blogPage = {
    method: 'GET',
    path: '/',
    handler: function(req, reply) {
        var data = {
            title: 'This is Index!',
            message: 'Hello, World. You crazy handlebars layout',
            alaa : 'JUSt FOR TRY'
        };
        reply.view('blogs', data);

    }
};
var adminPage = {
    method: 'GET',
    path: '/admin',
    handler: function(req, reply) {
        reply.view('admin');

    }
};

var controlpanel = {
    method: 'POST',
    path: '/controlpanel',
    handler: function(req, reply) {
        //  var email = req.payload.email;
        reply.view('controlpanel');

    },
    config: {
        validate: {
            payload: {
                email: Joi.string().email().required(),
                password: Joi.number().integer().required()

            }
        }
    }
};

var saveArticels= {
    method: 'POST',
    path: '/store',
    handler: function(req, reply) {
        //console.log("req.payload",req.payload);
        var title = req.payload.title;
        var content = req.payload.content;
        var image = req.payload.imageFile;
        console.log("HHHHH");
        dbutils.insert(title, content, image,client);
        reply.view('controlpanel')
        
    }
};
module.exports = [blogPage,
                  adminPage,
                  controlpanel,
                  saveArticels
]
