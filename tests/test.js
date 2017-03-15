const test = require('tape');
const shot = require('shot');
const server = require('../server/server.js');
const route = require('../server/routes.js');
const index = require('../index.js');
const dbutils = require('../app/dbutils.js');
var client = dbutils.dbconnection;

test("GET /: should return blog.html file",function(t){
  server.inject({
     method  : 'GET',
     url     : '/'
   }, function (res) {
var validtion = res.payload.indexOf('div');
t.equal(validtion !== 1, true, "get 'div' some where");
 t.equal(res.statusCode, 200, 'get statusCode correctly ');
 t.end();

   });
})

 test("POST / : should insert title,contect and image of article to database",function(t){
   var validtion = {
     title :'alaa',
     content : "data",
     imageFile : "gi.jpg"
   }
   server.inject({
      method  : 'POST',
      url     : '/store',
      payload :validtion
    }, function (res) {
  t.equal(res.statusCode, 200, 'get statusCode correctly ');
  console.log("h");
  t.end();
  client.end()

process.exit(0);

    });
 })
