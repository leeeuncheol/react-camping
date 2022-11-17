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

const multer = require('multer');
const upload = multer({dest: './upload'})

app.get('/api/customers', (req, res) => {
   
      connection.query(
        "SELECT * FROM crawl_data.CUSTOMER where isDeleted = 0",
        (err, rows, fields) => {
          res.send(rows);
        }
      );
    
});

app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res) => {

  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)';

  // let image = '/image/' + req.file.filename;
  let image = 'http://localhost:5000/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;

  let params = [image, name, birthday, gender, job];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
    }
  );

});

app.delete('/api/customers/:id', (req,res) => {
  let sql = 'UPDATE crawl_data.CUSTOMER SET isDeleted = 1 where id = ?';
  let params = [req.params.id];
  connection.query(sql, params,
      (err, rows, fields) => {
        res.send(rows);
      }
    )
});

app.listen(port, () => console.log(`Listening on port ${port}`));