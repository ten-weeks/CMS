const pg = require('pg');


function insert(title,content,image) {
  var config = {
      user: 'postgres',
      database: 'cms',
      password: '123654',
      host: 'localhost'
  }
  var client = new pg.Client(config);
  client.connect();
  client.query(`INSERT INTO blog (title, content,image) VALUES (\'${title}\',\'${content}\',\'${image}\')`);

}
module.exports = {
  insert : insert
}
