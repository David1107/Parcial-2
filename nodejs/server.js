var express = require('express'); 
var expr  = express();
var pg = require('pg');
var dato; 
var client = new pg.Client(); 

var config = {
        host: '172.17.0.1', 
	user: 'smartlabs', 
        password: 'smartlabspass',
	database: 'smartlabs',
	port: 5432
};
// código tomado de https://github.com/brianc/node-postgres
var pool = new pg.Pool(config);

// to run a query we can acquire a client from the pool,
// run a query on the client, and then return the client to the pool
pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
// código tomado de http://nodeexamples.com/2012/09/21/connecting-to-a-postgresql-database-from-node-js-using-the-pg-module/
        client.query('DROP TABLE IF EXISTS firstname;', function (err, result){
		done(); 
		if(err){
			return console.error('error running query 1', err);
		}
	});
        client.query('CREATE TABLE firstname (names varchar(12) PRIMARY KEY);', function (err, result){
		done(); 
		if(err){
			return console.error('error running query 2', err);
		}
	});
	client.query("INSERT INTO firstname (names) values($1)", ['David'], function (err, result){
                done(); 
		if(err){
			return console.error('error running query 3', err);
		}
	});
  client.query('SELECT * FROM firstname', function(err, result) {
    //call `done()` to release the client back to the pool
    done();

    if(err) {
      return console.error('error running query 4', err);
    }
    dato = result.rows[0];
    //output: 1
  });
});

expr.get('/data', function(req, res) {
  res.send("Dato de la base de datos: " + dato.names);
});

expr.listen("8080");
