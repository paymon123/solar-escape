
var express = require('express');
var app = express();
const { Client } = require('pg');

//const game = require("./game")

let DB_URI = 
 process.env.DATABASE_URL  | 
 "postgresql://localhost:5432/bankly?user=postgres&password=postgres";

const db = new Client({
  connectionString: DB_URI
  ,ssl: {
    rejectUnauthorized: false
  }
});


db.connect();


app.use(express.static(__dirname ));
app.use(express.urlencoded({
  extended: true
}))




/** general error handler */

app.get('/', function (req, res) {
   
  console.log("hello")
  res.sendFile(__dirname + '/_index.html');
  
  

});
app.get('/highscores', async function (req, res) {
  try{
  let result =  await db.query(
    `SELECT username,
              score
          FROM scores 
          `
   
  );

 
  //console.log("returning select" +result.rows)
  res.send(JSON.stringify(result.rows));
  }
  catch(error){ res.send(error.toString());}

});

app.post('/newscore', async function (req, res) {
  console.log("new score")
  try{
  let username = req.body.username;
  let score = req.body.score;
console.log(username)
console.log(score)
  let result= await db.query(
    `INSERT INTO scores (username,score) VALUES ($1, $2)`,
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
  }catch(error)
  {
    console.log(error.toString())
    res.send(error.toString());
  }
 


});
app.listen(process.env.PORT || 5000, function () {
  
  
  
  // console.log("server online")
});


