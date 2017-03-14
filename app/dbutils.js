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
console.log("DBBBB");
      if (errorSelect) {
                      console.log('errorSelect', errorSelect);
                  }
                  

    })

}
module.exports = {
    insert: insert,
    dbconnection: dbconnection(config, function(err) {})

}
