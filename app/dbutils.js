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

function validation(input, client, cb) {
    client.query(`SELECT *  from admin where email = \'${input.email}\' AND password  = \'${input.password}\'; `, function(errorSelect, result) {
        if (errorSelect) {
            console.log('errorSelect', errorSelect);
            cb(errorSelect, undefined)
        }
        console.log("validation", result.rowCount);
        cb(undefined, result.rowCount)
    });
}

function insert(title, content, image, client) {
    client.query(`INSERT INTO blog (title, content,image) VALUES (\'${title}\',\'${content}\',\'${image}\');`, function(errorInsert, result) {
        if (errorInsert) {
            console.log('errorInsert', errorInsert);
        }


    })

}
function insertAdmin(client,cb) {
  var rawSql = `INSERT INTO admin (email, password) VALUES ('alaa@alaa.com', 123654);`;
  client.query(rawSql,cb);

};
function select(client, cb) {
    client.query(`SELECT * FROM blog;`, function(errorSelect, result) {
        if (errorSelect) {
            console.log('errorSelect', errorSelect);
        }
        cb(undefined, result.rows)
    })

}
function createAdminTable  (client, cb)  {
  var rawSql = `CREATE TABLE IF NOT EXISTS admin (email text, password INT);`;
  client.query(rawSql,cb);
};
function createBlogTable  (client, cb)  {
  var rawSql = `CREATE TABLE IF NOT EXISTS blog (title text, content text, image text);`;
  client.query(rawSql,cb);
};

module.exports = {
    select: select,
    insert: insert,
    validation: validation,
    createAdminTable :createAdminTable,
    createBlogTable : createBlogTable,
    insertAdmin : insertAdmin,
    dbconnection: dbconnection(config, function(err) {

    })

}
