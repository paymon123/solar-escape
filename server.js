
var express = require('express');
var app = express();
const { Client } = require('pg');
//const game = require("./game")

let DB_URI = process.env.DATABASE_URL;
console.log("DATABASE URI" + DB_URI)
const db = new Client({
  connectionString: DB_URI,ssl: {
    rejectUnauthorized: false
  }
});


db.connect();


app.use(express.static(__dirname ));
app.use(express.urlencoded({
  extended: true
}))


app.use(function(req, res, next) {
  console.log("404");
const err = new ExpressError("Not Found", 404);
// pass the error to the next piece of middleware
return next(err);
});


/** general error handler */

app.use(function(err, req, res, next) {
res.status(err.status || 500);
console.log("error being passed: " +err);
return res.json({
  status: err.status,
  message: err.message
});
});
app.get('/', function (req, res) {
   
  console.log("hello")
  res.sendFile(__dirname + '/_index.html');
  
  

});
app.get('/highscores', async function (req, res) {
  let result =  await db.query(
    `SELECT username,
              score
          FROM scores 
          `
   
  );
 
  //console.log("returning select" +result.rows)
  res.send(JSON.stringify(result.rows));

});

app.post('/newscore', async function (req, res) {
  let username = req.body.username;
  let score = req.body.score;

  let result= await db.query(
    `INSERT INTO scores VALUES ($1, $2)`,
    [username, score]
  );
  
  let r =  await db.query(
    `SELECT username,
              score
          FROM scores 
          `
   
  );
  // console.log("result" + r.rows);
  res.send(JSON.stringify(r.rows));
 


});
app.listen(process.env.PORT || 5000, function () {
  
  
  
  // console.log("server online")
});


