const Joi = require('joi');
const dbutils = require('../app/dbutils.js');
const client = dbutils.dbconnection;
const blogPage = {
    method: 'GET',
    path: '/',
    handler: function(req, reply) {
        dbutils.select(client,function (err, result) {
          console.log("result",result);

          reply.view('blogs', {result:result});

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
        //  const email = req.payload.email;
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

const displyimage = {
        method: 'GET',
        path: '/images/{file*}',
        handler:{
           directory: {
      path: 'images'
    }
  }
    }

const saveArticels= {
    method: 'POST',
    path: '/store',
    handler: function(req, reply) {
        //console.log("req.payload",req.payload);
        const title = req.payload.title;
        const content = req.payload.content;
        const image = req.payload.imageFile;
        dbutils.insert(title, content, image,client);
        reply.view('controlpanel')

    }
};
module.exports = [blogPage,
                  adminPage,
                  controlpanel,
                  saveArticels,
                  displyimage
]
