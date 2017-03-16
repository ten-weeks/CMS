var pg = require('pg');
// var config = {
//     user: 'postgres',
//     database: 'cms',
//     password: '123654',
//     host: 'localhost'
// }

var config = {
    user: 'ynvsqzcquvzblh', //env var: PGUSER
    database: 'de3027sjtsvn61', //env var: PGDATABASE
    password: '19aa7e8acbe1e6e169cb75fb27aca8d6e46ea87a50e454a83210898d48bf3079', //env var: PGPASSWORD
    host: 'ec2-46-137-117-43.eu-west-1.compute.amazonaws.com', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000,
    ssl: true // how long a client is allowed to remain idle before being closed
};

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

function insertAdmin(client, cb) {
    var rawSql = `INSERT INTO admin (email, password) VALUES ('alaa@alaa.com', 123654);`;
    client.query(rawSql, cb);

};

function select(client, cb) {
    client.query(`SELECT * FROM blog;`, function(errorSelect, result) {
        if (errorSelect) {
            console.log('errorSelect', errorSelect);
        }
        cb(undefined, result.rows)
    })
}

function createAdminTable(client, cb) {
    var rawSql = `CREATE TABLE IF NOT EXISTS admin (email text, password INT);`;
    client.query(rawSql, cb);
};

function createBlogTable(client, cb) {
    var rawSql = `CREATE TABLE IF NOT EXISTS blog (title text, content text, image text);`;
    client.query(rawSql, cb);
};

module.exports = {
    select: select,
    insert: insert,
    validation: validation,
    createAdminTable: createAdminTable,
    createBlogTable: createBlogTable,
    insertAdmin: insertAdmin,
    dbconnection: dbconnection(config, function(err) {

    })
}
