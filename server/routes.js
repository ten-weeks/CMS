const Joi = require('joi');
const dbutils = require('../app/dbutils.js');
const client = dbutils.dbconnection;
const blogPage = {
    method: 'GET',
    path: '/',
    handler: function(req, reply) {
        dbutils.select(client,function (err, result) {
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
      const input = req.payload;
      console.log("req.payload",req.payload);
      dbutils.validation(req.payload,client, (err, result) =>{
        if (result > 0) {
                reply.view('controlpanel');
            } else {
              reply.view('admin', {auth:'Error in email or password'});

            }

      } )
        //  const email = req.payload.email;


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
module.exports = [blogPage,
                  adminPage,
                  controlpanel,
                  saveArticels,
                  style,
                  displyimage
]
