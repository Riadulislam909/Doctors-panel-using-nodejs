var express = require ('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require('./models/signup-model');
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var randomToken = require ('random-token');
var multer = require ('multer');
var fs = require ('fs');
var path = require ('path');
const { check, validationResult } = require('express-validator');



router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "public/asssets/images/upload_images"); //here we specify the destination. in this case i specified the current directory
    },
    filename: function(req, file, cb) {
      console.log(file); //log the file object info in console
      cb(null, file.originalname);//here we specify the file saving name. in this case. 
  //i specified the original file name .you can modify this name to anything you want
    }
  });

  var upload = multer({ storage: storage });

router.get('/',function(req,res){

    res.render('signup/form');
});




router.post('/',upload.single("image"), [
    check('username').notEmpty().withMessage("Username should reequired"),
    check('password').notEmpty().withMessage("Password should reequired"),
    check('number').notEmpty().withMessage("Number should reequired"),
    check('email').notEmpty().isEmail().withMessage("Email should required"),
    
],function(req , res){

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

        var email_status = "not_verified";
        var email = req.body.email;
        var username = req.body.username;
        var number = req.body.number;
        var username = req.body.username;
        var department = req.body.department;
        var address = req.body.address;
        var filename =req.file.filename;
       
        db.signup(req.body.username,req.body.number,req.body.email,email_status,req.body.department,req.body.address,req.body.password,req.file.filename);
        var token = randomToken(8);

        db.verify (req.body.username,email,token);

        db.getuserid(email,function(err,result){
            var id = result[0].id;
            var output =  `
            <p>Dear  `+username+`, </p>
            <p>Thanks for sign up. Your verification id and token is given below :  </p>
           
            <ul>
                <li>User ID: `+ id + `</li>
                <li>Token: `+ token + `</li>
            </ul>
            <p>verify Link: <a href="http://localhost:3000/verify">LOGIN</a></p>
            
            <p><strong>This is an automatically generated mail. Please do not reply back.</strong></p>
            
            <p>Regards,</p>
            <p>H Manager</p>
        `;

        var transporter = nodemailer.createTransport({
            service : 'gmail',
            auth: {
                user: 'riadulislam814@gmail.com',
                pass: ''
            }

        });
        var mailOptions = {

            from: 'riadulislam814@gmail.com', 
            to: email, 
            subject: 'Email Verification', // Subject line
            html: output// plain text body
        };

        transporter.sendMail(mailOptions,function(err,info){
            if(err) {
                return console.log(err);
            }
            console.log(info);
        });

        res.send ('Check you email for token to verify');

        });


        
        
        
       // res.redirect('login');
    
    
});











module.exports =router;