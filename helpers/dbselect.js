
const pg = require('pg');

 function select (cb) {
  var config = {
      user: 'postgres',
      database: 'cms',
      password: '123654',
      host: 'localhost'
  }
  var client = new pg.Client(config);
  client.connect();
  client.query(`SELECT title FROM blog`,function (err, result) {
    // console.log("result",result);
    // console.log("result.rows[0].title",result.rows[0].title);

return result.rows[0].title

  });
}

function selectimage (cb) {
 var config = {
     user: 'postgres',
     database: 'cms',
     password: '123654',
     host: 'localhost'
 }
 var client = new pg.Client(config);
 client.connect();
 client.query(`SELECT image FROM blog`,function (err, result) {
   // console.log("result",result);
   // console.log("result.rows[0].title",result.rows[0].title);
cb(result.rows[0].image)
 });
}
module.exports ={
  select : select,
  selectimage : selectimage
}
