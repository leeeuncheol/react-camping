const express = require('express');
const bodyParse = require('body-parser');
const app = express(); 
// const cors = require('cors');
const port = process.env.PORT || 5000; 
const fs = require('fs');

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true,
// };
// app.use(cors(corsOptions));

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));

// app.get('/api/hello', (req, res) => {
//     res.send({message: 'Hello Express!'});
// });

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host : conf.host,
  user: conf.user,
  password: conf.password,
  port : conf.port,
  database: conf.database
});
connection.connect(); 

app.get('/api/customers', (req, res) => {
   
      connection.query(
        "SELECT * FROM crawl_data.CUSTOMER",
        (err, rows, fields) => {
          res.send(rows);
        }
      );
    
});



app.listen(port, () => console.log(`Listening on port ${port}`));