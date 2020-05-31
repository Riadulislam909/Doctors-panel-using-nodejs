var express = require('express');
var doctor	= require.main.require('./models/doctor-model');
var router  = express.Router();
const { check, validationResult } = require('express-validator');


router.get('/', function(req, res){
	res.render('login/index');
});

router.post('/', [
    check('username').notEmpty().withMessage("Username is reequired"),
    check('password').notEmpty().withMessage("Password is reequired")
    
], function(req , res){
	const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

	
	var data = {
		username: req.body.username,
		password: req.body.password
	};

    {
	doctor.validate(data, function(results){
		if(results){
			console.log(results);
			var status = results[0].email_status;
			if(status=="verified"){
				req.session.un = req.body.username;
				res.redirect('/doctor');
			}
			else if(status=="not_verified"){
				res.send('verify mail');
			}
			
		}else{
			res.send('invalid username or password');

		}
	});
		
		
	}
    }
);


module.exports = router;