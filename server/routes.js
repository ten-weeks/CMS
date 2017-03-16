const Joi = require('joi');
const dbutils = require('../app/dbutils.js');
const client = dbutils.dbconnection;
const blogPage = {
    method: 'GET',
    path: '/',
    handler: function(req, reply) {
        dbutils.select(client, function(err, result) {
            var data = result.reverse()
            reply.view('blogs', {
                data: data
            });
        })
    }
};
const adminPage = {
    method: 'GET',
    path: '/admin',
    handler: function(req, reply) {
        reply.view('admin');
    }
};

const controlpanel = {
    method: 'POST',
    path: '/controlpanel',
    handler: function(req, reply) {
        const input = req.payload;
        dbutils.validation(req.payload, client, (err, result) => {
            if (result > 0) {
                reply.view('controlpanel');
            } else {
                reply.view('admin', {
                    auth: 'Error in email or password'
                });
            }
        })
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

const displyimage = {
    method: 'GET',
    path: '/images/{file*}',
    handler: {
        directory: {
            path: 'images'
        }
    }
}

const saveArticels = {
    method: 'POST',
    path: '/store',
    handler: function(req, reply) {
        const title = req.payload.title;
        const content = req.payload.content;
        const image = req.payload.imageFile;
        dbutils.insert(title, content, image, client);
        reply.view('controlpanel')
    }
};
const style = {
    method: 'GET',
    path: '/templates/css/{file*}',
    handler: {
        directory: {
            path: 'templates/css',
            listing: true
        }
    }
};
const sstyle = {
    method: 'GET',
    path: '/templates/sstyle/{file*}',
    handler: {
        directory: {
            path: 'templates/sstyle',
            listing: true
        }
    }
};

module.exports = [blogPage,
    adminPage,
    controlpanel,
    saveArticels,
    style,
    sstyle,
    displyimage
]
