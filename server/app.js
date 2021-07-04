const dotenv = require('dotenv');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
const express = require('express');
const path = require("path")
const app = express();

app.use(cookieParser());
var expressSession = require('express-session');
app.use(expressSession({secret: 'secretkey', saveUninitialized: true, resave: false}));
//app.use(express.static(path.join(__dirname, 'client','build')))
dotenv.config({path:'./config.env'})
require('./db/conn')

app.use(express.json());
const App = require('./model/Apps');
const Schedule = require('./model/schedule');

const port = process.env.PORT || 4000;

app.use(require('./router/auth'))

app.listen(port,()=>{
    console.log('server is running',port)
})