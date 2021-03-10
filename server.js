const express = require('express');
const dotenv = require('dotenv');

const {newsRouters,usersRouters} = require('./routes/indexRoutes');
//const {Database} = require('./models');

//const MongoClient = require('mongodb').MongoClient;
dotenv.config();

//const mongoUrl = process.env.MONGO_URL;


const path = require('path');

const app = express();
const news = require('./news');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname +'/dist'));
app.use('/news',newsRouters);
app.use('/users',usersRouters);

app.get('/',(req, res) =>{
    res.statusCode = 200;
    res.sendFile(path.join(__dirname , 'dist' , 'index.html'));
});

news(app);


app.listen(3000, function(){
    console.log('app is running in http://localhost:3000')
});

