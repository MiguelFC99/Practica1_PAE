const express = require('express');

const path = require('path');

const app = express();
const news = require('./news');

app.use(express.static(__dirname +'/dist'));

app.get('/',(req, res) =>{
    res.statusCode = 200;
    res.sendFile(path.join(__dirname , 'dist' , 'index.html'));
});

news(app);


app.listen(3000, function(){
    console.log('app is running in http://localhost:3000')
});