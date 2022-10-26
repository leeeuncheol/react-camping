const express = require('express');
const bodyParse = require('body-parser');
const app = express(); 
const port = process.env.PORT || 5000; 

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));

app.get('/api/hello', (req, res) => {
    res.send({message: 'Hello Express!'});
});

app.listen(port, () => console.log(`Listening on port ${port}`));