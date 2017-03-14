const pg = require('pg');

const dbselect = require('../helpers/dbselect');
 module.exports = function () {
   var rr = 'gg' ;
  var config = {
      user: 'postgres',
      database: 'cms',
      password: '123654',
      host: 'localhost'
  }
  var client = new pg.Client(config);
  client.connect();
client.query(`SELECT title FROM blog`,function (err, result) {
    rr = result.rows[0].title;
    // console.log("result",result);
    // console.log("result.rows[0].title",result.rows[0].title);
console.log("result.rows[0].title", rr);


  });







}
