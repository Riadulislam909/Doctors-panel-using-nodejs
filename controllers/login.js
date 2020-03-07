var express = require('express');
var doctor	= require.main.require('./models/doctor-model');
var router  = express.Router();


router.get('/', function(req, res){
	res.render('login/index');
});

router.post('/', function(req, res){
	req.checkBody('username', 'Username field cannot be empty.').notEmpty();
	req.checkBody("password", "Password field cannot be empty").notEmpty();

	const err = req.validationErrors();

	if(err){		
		res.render('login/index', {errors: err});
	}else{
		
	var data = {
		username: req.body.username,
		password: req.body.password
	};

    {
	doctor.validate(data, function(status){
		if(status){
			req.session.un = req.body.username;
			res.redirect('/doctor');
		}else{
			res.send('invalid username/password...');

		}
	});
		
		
	}
    }
});


module.exports = router;