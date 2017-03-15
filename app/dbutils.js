var pg = require('pg');
var config = {
    user: 'postgres',
    database: 'cms',
    password: '123654',
    host: 'localhost'
}

function dbconnection(config, cb) {
    var client = new pg.Client(config);
    client.connect(function(err) {
        if (err) {
            cb(err, undefined);
            return;
        }
    });
    return client;
}

function insert(title, content, image, client) {
    client.query(`INSERT INTO blog (title, content,image) VALUES (\'${title}\',\'${content}\',\'${image}\');`,function(errorSelect,result){
      if (errorSelect) {
                      console.log('errorSelect', errorSelect);
                  }


    })

}
function select(client,cb) {
    client.query(`SELECT * FROM blog;`,function(errorSelect,result){
      if (errorSelect) {
                      console.log('errorSelect', errorSelect);
                  }
                  cb(undefined,result.rows)
    })

}
module.exports = {
  select : select,
    insert: insert,
    dbconnection: dbconnection(config, function(err) {})

}
