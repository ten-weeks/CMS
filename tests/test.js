require('throw-max-listeners-error');
 require('dotenv').config;
 const test = require('tape');
 const shot = require('shot');
 const server = require('../server/server.js');
 const route = require('../server/routes.js');
 const index = require('../index.js');
 const dbutils = require('../app/dbutils.js');
 var client = dbutils.dbconnection;
 test('dbutils.createAdminTable(): should create Admin table', t => {
     dbutils.createAdminTable(client, (errTable, resTable) => {
         t.notOk(errTable, 'table created successfully');
         t.end()
     })
 })
 test("dbutils.selectSingleArticle() with invalid input : should return error",(t)=>{
   dbutils.selectSingleArticle(client,'bla','test', (errSelect, resSelect)=>{
     t.ok(errSelect,"return an error ");
     t.end()
   })
 })



 test('dbutils.dbconnection(): with un correct configration, shouldnt make connection ', t => {
   var config = {
       user: 'postgres',
       database: 'bla bla bla',
       password: '123654',
       host: 'localhost'
   }
     dbutils.dbconnection1(config, (errConn, resCreate) => {
         t.ok(errConn, 'connection faield successfully');
         t.end()
     })
 })



 test('dbutils.insertAdmin: should insert admins email and password', t => {
     dbutils.insertAdmin(client, (errInsert, resTable) => {
         t.notOk(errInsert, 'table created successfully');
         t.end()
     })
 })
 test('dbutils.createBlogTable: should create blog table', t => {
     dbutils.createBlogTable(client, (errTable, resTable) => {
         t.notOk(errTable, 'table created successfully');
         t.end()
     })
 })


 



 test("GET /: should return blog page ", function(t) {
     server.inject({
         method: 'GET',
         url: '/'
     }, function(res) {
         var validtion = res.payload.indexOf('div');
         t.equal(validtion !== 1, true, "get 'div' some where");
         t.equal(res.statusCode, 200, 'get statusCode correctly ');
         t.end();
     });
 })

 test("POST /store : should insert title,contect and image of article to database", (t) => {
     var validtion = {
         title: 'test',
         content: "data",
         imageFile: "hi.jpg"
     }
     server.inject({
         method: 'POST',
         url: '/store',
         payload: validtion
     }, (res) => {
         dbutils.select(client, (err, result) => {
             var validtion1 = result.find((item) => {
                 return item.title === validtion.title && item.content === validtion.content && item.imageFile === validtion.imageFile;
             })
             t.notEqual(validtion1, 'undefined', "insert the data correctly to data base")
             t.equal(res.statusCode, 200, 'get statusCode correctly ');
             t.end();
         });
     })
 })
 test("POST /controlpanel : should go to controlpanel page if email and password are correct", (t) => {
     var validtion = {
         email: 'alaa@alaa.com',
         password: 123654
     }
     server.inject({
         method: 'POST',
         url: '/controlpanel',
         payload: validtion
     }, (res) => {
         dbutils.validation(validtion, client, (err, result) => {
             t.notEqual(result, 0, "email and password are correct")
             t.equal(res.statusCode, 200, 'get statusCode correctly ');
             t.end();
         });
     });
 })
 test("POST /controlpanel : should stay at admin log page if email and password are NOT correct", (t) => {
     var validtion = {
         email: 'alaa@alaa.com',
         password: 123
     }
     server.inject({
         method: 'POST',
         url: '/controlpanel',
         payload: validtion
     }, (res) => {
         dbutils.validation(validtion, client, (err, result) => {
             var validtion1 = res.payload.indexOf('password');
             t.equal(validtion1 !== -1, true, "return admin log page");
             t.equal(result, 0, "email or password are NOT correct");
             t.equal(res.statusCode, 200, 'get statusCode correctly ');
             t.end();
         });
     })
 })
 test("GET/singleArticle : should return one article",(t)=>{
   server.inject({
     method : 'GET',
     url : '/singleArticle/test'
   },(res)=>{
      var validtion = res.payload.indexOf("test");
      t.equal(res.statusCode, 200, 'get statusCode correctly')
     t.notEqual(validtion , -1 , 'return the single article that the user choose correctly')
     t.end();
   })
 })

 test("GET /admin: should return login page for admin", (t) => {
     server.inject({
         method: 'GET',
         url: '/admin'
     }, function(res) {
         var validtion = res.payload.indexOf('password');
         t.equal(res.statusCode, 200, 'get statusCode correctly ');
         t.equal(validtion !== 1, true, "get 'password' some where");

         client.end()
         server.stop(t.end);
     });
 })
