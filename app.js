//DEC
var express 		= require('express');
var ejs 			= require('ejs');
var expressSession 	= require('express-session');
var cookieParser 	= require('cookie-parser');
var login 			= require('./controllers/login');
var logout 			= require('./controllers/logout');
var doctor  		= require('./controllers/home');
var bodyParser 		= require('body-parser');
var exValidator 	= require('express-validator');
var app 			= express();


//CONFIG
app.set('view engine', 'ejs');


app.use(express.static('public'));
//MIDDLEWARE

app.use(bodyParser.urlencoded({extended: false}));
app.use(exValidator());
app.use(expressSession({secret: 'my top secret password', saveUninitialized: true, resave: false}));
app.use(cookieParser());




app.use('/login', login);
app.use('/doctor', doctor);
app.use('/logout', logout);


//ROUTING
app.get('/', function(req, res){
	res.render('login/index');
});

//SERVER STARTUP
app.listen(3000, function(){
	console.log('Port 3000 is Activated!');
})


