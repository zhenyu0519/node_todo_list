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
mongoose.connect('mongodb://todo:1234@jello.modulusmongo.net:27017/y9rawAsy');

//set the static file path
app.use(express.static(__dirname + '/public'));
//use morgan to create log by the dev formant
app.use(morgan('dev'));
//use this instead of app.use(bodyParser()) which use the body parser
//parse the Content-Type: application/x-www-form-urlencoded
//extended is ture means using qs library to parser the url-encoded data 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//parse application/vnd.api + json as json
app.use(bodyParser.json({type:'application/vnd.api+json'}));
//useOverRide middle ware
app.use(methodOverRide());


//define a model called todo and in this model there is string type text
//which will contain our to do list content
var todo = mongoose.model('todo',{
	text:String
});

//restful api routes

//list all todos
app.get('/api/todos', function(req, res){
	//use mongoose to get list all todos from database
	todo.find(function(err,todos){
		if(err){
			//if there are any errors, send the error back
			res.send(err);
		}
		//return all todos in JSON format
		res.json(todo);
	});
});
//create new todos
app.post('/api/todos',function(req,res){
	todo.create({
		text: req.body.text,
		done:false
	}, function(err,todo){
		if(err){
			res.send(err);
		}
		todo.find(function(){
			if(err){
				res.send(err);
			}
			res.json(todos);
		});
	});
});
//delete todos
app.delete('/api/todos',function(req,res){
	tode.remove({
		_id: req.params.todo_id
	},function(err, todo){
		if(err){
			res.send(err);
		}
		res.json(todos);
	});
});

//load the page view
app.get('*',function(req,res){
	res.sendfile('./public/index.html');
});

//listen the port
app.listen(port);
console.log("The server is running on " + port);
