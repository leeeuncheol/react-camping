const express = require('express');
const bodyParse = require('body-parser');
const app = express(); 
// const cors = require('cors');
const port = process.env.PORT || 5000; 

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

app.get('/api/customers', (req, res) => {
    res.send([
        {
        'id' : 1,
        'image' : 'https://placeimg.com/64/64/1',
        'name' : '홍길동',
        'birthday' : '961222',
        'gender':'남자',
        'job' : '대학생'
      },
      {
        'id' : 2,
        'image' : 'https://placeimg.com/64/64/2',
        'name' : '나이스',
        'birthday' : '956621',
        'gender':'남자',
        'job' : '프로그래머'
      },
      {
        'id' : 3,
        'image' : 'https://placeimg.com/64/64/3',
        'name' : '이순신',
        'birthday' : '853325',
        'gender':'남자',
        'job' : '무직'
      }
    ]);
})



app.listen(port, () => console.log(`Listening on port ${port}`));