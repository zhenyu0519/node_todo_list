// load all the modules we need
var express =require('express');
var app = express();
var mongoose = require('mongoose');
//log all the request
var morgan = require('morgan');
var bodyParser = require('body-parser');
//simulate delete and put
var methodOverRide = require('method-override');

//allow you to listen to your own port number but the default will be 8080
var port = process.env.PORT || 8080;

//connect with mongoDB
mongoose.connect('');

//set the static file path
app.use(express.static(__dirname + '/public'));
//use morgan to create log by the dev formant
app.use(morgan('dev'));
//use this instead of app.use(bodyParser()) which use the body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//