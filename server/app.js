var express=require('express');
var app=express();
var path=require('path');
var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded( { extended: false } );
var pg=require('pg');
// user to connect to the "introToSQL" table on local host
// postgres must be running and you must have this db name correct
var connectionString = 'postgres://localhost:5432/introToSQL';

// static public folder
app.use( express.static( 'public' ) );

// base url
app.get( '/', function( req, res ){
  console.log( 'at base url' );
  res.sendFile( path.resolve( 'views/index.html' ) );
}); // end base url

// creates a new user from the req.body object that is received
app.post( '/createNew', urlencodedParser, function( req, res ){
  console.log( 'in POST createNew: ' + req.body.username + " " + req.body.active );
  pg.connect( connectionString, function( err, client, done ){
    // "users" is table. username = $1 = req.body.username
    client.query( 'INSERT INTO users ( username, active, created ) VALUES ( $1, $2, $3 )', [ req.body.username, req.body.active, 'now()' ] );
  });
}); // end createNew

// update user status
app.post( '/updateUser', urlencodedParser, function( req, res ){
  console.log( 'in POST updateUser: ' + req.body.active + " " + req.body.id );
  pg.connect( connectionString, function( err, client, done ){
    // "users" is table. username = $1 = req.body.username
    client.query('UPDATE users set active=false WHERE id=($1)', [req.body.id]);
    // client.query('UPDATE users set (active, id) VALUES ($1, $2)', [req.body.active, req.body.id]);
  });
}); // end update user status

app.post( '/deleteUser', urlencodedParser, function( req, res ){
  console.log( 'in POST deleteUser: ' + req.body.active + " " + req.body.id );
  pg.connect( connectionString, function( err, client, done ){
    // "users" is table. username = $1 = req.body.username
    // client.query('UPDATE users set active=false WHERE id=($1)', [req.body.id]);
    client.query('DELETE from users WHERE id=($1)', [req.body.id]);
    // client.query('UPDATE users set (active, id) VALUES ($1, $2)', [req.body.active, req.body.id]);
  });
}); // end update user status


// send back all records in users that conform to the query
app.get( '/getUsers', function( req, res ){
  console.log( 'in get users' );
// this wil hold our results
  var results =[];
  pg.connect( connectionString, function( err, client, done ){
    // get all user records and store in "query" variable
    var callDB = client.query( 'SELECT * FROM users WHERE active=true ORDER BY id DESC;' );
    console.log( "query: " + callDB );
    // push each row in query into our results array

    callDB.on( 'row', function ( row ){
      results.push( row );
    }); // end query push
    callDB.on( 'end', function (){
      return res.json( results );
    }); // end onEnd
    if(err){
      console.log(err);
    } // end error
  }); // end connect
}); // end users get

// spin up server
app.listen( 8000, 'localhost', function( req, res ){
  console.log( "server listening on 8000");
});
