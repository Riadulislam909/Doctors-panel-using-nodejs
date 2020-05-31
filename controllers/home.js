var express      = require('express');
var doctor       = require.main.require('./models/doctor-model');
var patient      = require.main.require('./models/patient-model');
var notice       = require.main.require('./models/notice-model');
var bed          = require.main.require('./models/bed-model');
var report       = require.main.require('./models/report-model');
var prescription = require.main.require('./models/prescription-model');
var alert        = require('alert-node');
var signup          = require.main.require('./models/signup-model');
var router       = express.Router();

router.get('*', function(req, res, next){

	if(req.session.un != null){
		next();
	}else{
		res.redirect('/login');
	}
});


router.get('/', function(req, res){
			res.render('doctor/index');			
	
});
//patient

router.get('/addpatient', function(req, res){
	doctor.getAll(function(results){
		if(results != null){
			res.render('doctor/addPatient', {userList: results});			
		}else{
			res.send('Error!!!');
		}
	});
	
});

router.post('/addpatient', function(req, res){
	
	var data = {
		pctname: req.body.pname,
		pctnum: req.body.pnumber,
		pctprob:req.body.pprob,
	    pctdoct:req.body.pdoct,
		pctaddress:req.body.paddress,
		pcttime:req.body.ptime,
	};
	
	patient.create(data, function(status){

		if(status){
			alert("Patient is Successfully Created");
			res.redirect('/doctor/addpatient');			
		}else{
		    alert("Error!!");
			res.redirect('/doctor/addpatient');
		}
	});


});


router.get('/viewpct', function(req, res){

	patient.getAll(function(results){
		if(results != null){
			res.render('doctor/viewPatient', {userList: results});			
		}else{
			res.send('Error!!!');
		}
	});
});


router.get('/patientedit/:id', function(req, res){
	
	patient.getById(req.params.id, function(result){
		     if(result != null){
				console.log(req.params.id);
			res.render('doctor/patientEdit', {user: result[0]});			
		}else{
			res.send('Error!!!');
		}
	});		

	
});

router.post('/patientedit/:id', function(req, res){
	var data = {
		pctname: req.body.pname,
		pctnum: req.body.pnumber,
		pctprob:req.body.pprob,
	    pctdoct:req.body.pdoct,
		pctaddress:req.body.paddress,
		id:req.params.id
	};
	
	patient.update(data, function(status){

		if(status){
			res.redirect('/doctor/viewpct');			
		}else{
			res.redirect('/doctor/patientedit/'+req.params.id);
		}
	});
});

router.get('/patientdelete/:id', function(req, res){

	patient.delete(req.params.id, function(status){
		if(status){
			res.redirect('/doctor/viewpct');			
		}else{
			res.send('Error!!!');
		}
	});
});


router.post('/viewpct/search',function(req,res){
	var key = req.body.search;
	signup.searchPac(key,function(err,result){
		console.log(result);
		
		res.render('doctor/viewPatient',{userList : result});
	});
});

//appointment

router.get('/vappoint', function(req, res){
    var data={
    	uname:req.session.un
    }
	patient.getByUn(data, function(results){
		if(results != null){
			res.render('doctor/viewAppointment', {userList: results});			
		}else{
			res.send('Error!!!');
		}
	});
});



router.get('/appointdelete/:id', function(req, res){

	patient.delete(req.params.id, function(status){
		if(status){
			res.redirect('/doctor/vappoint');			
		}else{
			res.send('Error!!!');
		}
	});
});


router.get('/appointmentedit/:id',function(req, res){
	patient.getById(req.params.id, function(result){
		if(result != null){
	   res.render('doctor/apointmentEdit', {user: result[0]});			
   }else{
	   res.send('Error!!!');
   }
});		


});



router.post('/appointmentedit/:id', function(req, res){
	var data = {

		pcttime: req.body.ptime,
		id:req.params.id
	};
	
	patient.update1(data, function(status){

		if(status){
			res.redirect('/doctor/vappoint');			
		}else{
			res.redirect('/doctor/appointmentedit/'+req.params.id);
		}
	});
});






//Prescription
router.get('/addprescrip', function(req, res){
    var data={
    	uname:req.session.un
    }
	patient.getByUn(data, function(results){
		if(results != null){
			res.render('doctor/addPrescrip', {userList: results});			
		}else{
			res.send('Error!.. try again...');
		}
	});
});
router.post('/addprescrip', function(req, res){
	
	var data = {
		name:req.body.name,
		problem:req.body.prob,
		message:req.body.message
	};
	prescription.create(data, function(status){

		if(status){
			alert("Data is Successfully Added");
			res.redirect('/doctor/addprescrip');			
		}else{
		    alert("Sorry..There Is Some Error Occur");
			res.redirect('/doctor/addprescrip');
		}
	});


});

router.get('/vprescrip', function(req, res){

	prescription.getAll(function(results){
		if(results != null){
			res.render('doctor/viewPrescrip', {userList: results});			
		}else{
			res.send('Error!.');
		}
	});
});

router.get('/prescripedit/:id', function(req, res){
    
	prescription.getById(req.params.id, function(result){
		     if(result != null){
			res.render('doctor/prescriptionEdit', {user: result[0]});			
		}else{
			res.send('Error!');
		}
	});		

	
});

router.post('/prescripedit/:id', function(req, res){
	var data = {
		name: req.body.name,
		prob:req.body.prob,
	    message:req.body.message,
		id:req.params.id
	};
	
	prescription.update(data, function(status){

		if(status){
			res.redirect('/doctor/vprescrip');			
		}else{
			res.redirect('/doctor/prescripedit/'+req.params.id);
		}
	});
});

router.get('/prescripdelete/:id', function(req, res){

	prescription.delete(req.params.id, function(status){
		if(status){
			res.redirect('/doctor/vprescrip');			
		}else{
			res.send('Error!');
		}
	});
});


//bed



router.get('/addbed', function(req, res){

			patient.getAll(function(results){
			if(results != null){
				res.render('doctor/bedAllot', {userList: results});			
			}else{
				res.send('Error!.. try again...');
			}
		});
	
		
	});
	
		


router.post('/addbed', function(req, res){
	var data = {
		name: req.body.name,
		word: req.body.wname,
		bednum:req.body.bednum
	};
	bed.create(data, function(status){

		if(status){
			alert("Bed is Successfully Alloted");
			res.redirect('/doctor/addbed');			
		}else{
		    alert("Sorry..There Is Some Error Occur");
			res.redirect('/doctor/addbed');
		}
	});
});


router.get('/vbed', function(req, res){

	bed.getAll(function(results){
		if(results != null){
			res.render('doctor/viewBed', {userList: results});			
		}else{
			res.send('Error!.. try again...');
		}
	});
});


router.get('/bededit/:id', function(req, res){
    
	bed.getById(req.params.id, function(result){
		     if(result != null){
			res.render('doctor/bedEdit', {user: result[0]});			
		}else{
			res.send('Error!.. try again...');
		}
	});		

	
});

router.post('/bededit/:id', function(req, res){
	var data = {
		name: req.body.name,
		word: req.body.word,
		bednum:req.body.bed,
        id:req.params.id
	};
	
	bed.update(data, function(status){

		if(status){
			res.redirect('/doctor/vbed');			
		}else{
			res.redirect('/doctor/bededit/'+req.params.id);
		}
	});
});

router.get('/beddelete/:id', function(req, res){

	bed.delete(req.params.id, function(status){
		if(status){
			res.redirect('/doctor/vbed');			
		}else{
			res.send('Error!.. try again...');
		}
	});
});

//NoticeBoard

router.get('/vnotice', function(req, res){

	notice.getAll(function(results){
		if(results != null){
			res.render('doctor/viewNotice', {userList: results});			
		}else{
			res.send('Error!.. try again...');
		}
	});
});



//Report


router.get('/addoperation', function(req, res){
			patient.getAll(function(results){
			if(results != null){
				res.render('doctor/addReport', {userList: results});			
			}else{
				res.send('Error!.. try again...');
			}
		});
		
	});
	
		


router.post('/addoperation', function(req, res){
	var data = {
		name: req.body.name,
		date: req.body.date,
		details:req.body.message
	};
	report.create(data, function(status){

		if(status){
			alert("Report is Successfully Added");
			res.redirect('/doctor/addoperation');			
		}else{
		    alert("Sorry..There Is Some Error Occur");
			res.redirect('/doctor/addoperation');
		}
	});
});


router.get('/voperationlist', function(req, res){

	report.getAll(function(results){
		if(results != null){
			res.render('doctor/viewReport', {userList: results});			
		}else{
			res.send('Error!.. try again...');
		}
	});
});


router.get('/reportedit/:id', function(req, res){
    
	report.getById(req.params.id, function(result){
		     if(result != null){
			res.render('doctor/reportEdit', {user: result[0]});			
		}else{
			res.send('Error!.. try again...');
		}
	});		

	
});

router.post('/reportedit/:id', function(req, res){
	var data = {
		name: req.body.name,
		date: req.body.date,
		details:req.body.message,
        id:req.params.id
	};
	
	report.update(data, function(status){

		if(status){
			res.redirect('/doctor/voperationlist');			
		}else{
			res.redirect('/doctor/reportedit/'+req.params.id);
		}
	});
});

router.get('/reportdelete/:id', function(req, res){

	report.delete(req.params.id, function(status){
		if(status){
			res.redirect('/doctor/voperationlist');			
		}else{
			res.send('Error!.. try again...');
		}
	});
});


//profile
router.get('/managePro', function(req, res){
    var data ={
     unname:req.session.un
 }
	doctor.getByUn(data, function(result){
		if(result.length > 0){
			res.render('doctor/profileEdit', {user: result[0]});			
		}else{
			res.send('Error!.. try again...');
		}
	});
});
router.post('/managePro', function(req, res){
    var data = {
		username: req.body.name,
		number: req.body.num,
		email: req.body.email,
		address: req.body.address,
        id:req.session.un
	};
	
	doctor.updatePro(data, function(status){

		if(status){
			res.redirect('/doctor/managePro');			
		}else{
			res.send("Error");
		}
	});
});

//Change Password

router.get('/cngPass', function(req, res){
	res.render('doctor/acngpass');			
	
});
router.post('/cngPass', function(req, res){
req.checkBody("new", "Password field cannot be empty").notEmpty();
req.checkBody("confirm", "Confirm Password field cannot be empty").notEmpty();
req.checkBody('confirm', 'Password and confirm password did not matched.').equals(req.body.new);
req.checkBody('new', 'Password must be between 4-60 characters long.').len(4, 60);

const err = req.validationErrors();

if(err){		
	res.render('doctor/acngpass', {errors: err});
}else{
var data = {
	password: req.body.new,
	id:req.session.un
};

doctor.updatePass(data, function(status){

	if(status){
		res.redirect('/doctor/cngPass');
		alert("Password is Successfully Changed");
	}else{
		res.send("Error");
	}
});
}
});



module.exports = router;