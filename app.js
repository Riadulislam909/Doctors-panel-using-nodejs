//DEC
var express = require('express');
var ejs  = require('ejs');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var login = require('./controllers/login');
var logout 	= require('./controllers/logout');
var doctor  = require('./controllers/home');
var signup   = require('./controllers/signup'); 
var verify = require('./controllers/verify');
var bodyParser 	= require('body-parser');
var reset = require('./controllers/reset');
var setpassword = require('./controllers/set');
//var exValidator = require('express-validator');
var app = express();
var multer = require ('multer');
var fs = require ('fs');
var path = require ('path');


//CONFIG
app.set('view engine', 'ejs');

//MIDDLEWARE
app.use(express.static('public'));
app.use("/public",express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
//app.use(exValidator());
app.use(expressSession({secret: 'my top secret password', saveUninitialized: true, resave: false}));
app.use(cookieParser());




app.use('/login', login);
app.use('/signup', signup);
app.use('/doctor', doctor);
app.use('/logout', logout);
app.use('/verify',verify);
app.use('/resetpassword' ,reset);
app.use('/setpassword', setpassword);


//ROUTING
app.get('/', function(req, res){
	res.render('login/index');
});

//SERVER STARTUP
app.listen(3000, function(){
	console.log('Port 3000 is Activated!');
})


