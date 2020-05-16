const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo');
const productRouter = require('./routers/product');
const fileRouter = require('./routers/file');
const app = express()
const db = mongoose.connection;
dotenv.config()

var cors = require('cors')
app.use(cors()) // Use this after the variable declaration

mongoose.set('useCreateIndex', true)
mongoose.connect("mongodb://localhost:27017/Lab3", { useNewUrlParser: true }).then(() => console.log('DB Connected!'))
db.on('error', (err) => {
    console.log('DB connection error:', err.message)
})

mongoose.Promise = global.Promise;
app.use(morgan("dev"))
app.use(bodyParser())
app.use(bodyParser.urlencoded({extended:false }))
app.use(bodyParser.json())
app.options("/*", function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(200);
});

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use('/uploads', express.static('uploads'))
app.use('/product', productRouter)
app.use('/file', fileRouter)
module.exports = app;