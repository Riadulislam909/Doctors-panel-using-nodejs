var mysql =require('mysql');
var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');


var con = mysql.createConnection({

    host : 'localhost',
    user : 'root',
    password : '',
    database : 'node1'
});

con.connect(function(err){
    if(err){
        throw err;
        console.log('you are connected');

    }
});

module.exports.signup = function(username,number,email,status,department,address,password,image,callback) {
	var query =  "INSERT INTO `doctor`(`dname`,`number`,`email`,`email_status`,`department`,`address`,`password`,`image`) VALUES ('" + username + "','" + number + "','" + email + "','" + status + "','" + department + "','" + address + "','" + password + "','" + image + "')";
	con.query(query,callback);
}

module.exports.verify = function (username,email,token,callback){
    var query = "insert into `verify` (`dname`,`email`,`token`) values ('"+username+"','"+email+"','"+token+"')";
    con.query(query,callback);
}

module.exports.getuserid = function (email,callback){
    var query = "select *from verify where email = '"+email+"' ";
    con.query(query,callback);
}

module.exports.searchPac = function(key,callback){
    var query='SELECT  * from patient where pname like "%'+key+'%"';
    con.query(query,callback);
    console.log(query);
}

module.exports.getAllpac = function(callback){
    var query = "select * from paitent" ;
    con.query(query,callback);
}

module.exports.matchtoken = function(id,token,callback){
    var query = "select * from `verify` where token='"+token+"' and id="+id;
    con.query(query,callback);
    console.log(query);
}

module.exports.updateverify = function (email,email_status,callback){
    var query = "update `doctor` set `email_status`='"+email_status+"' where `email`='"+email+"'";
    con.query(query,callback);
    
}

module.exports.findOne =function (email , callback){
    var query = "select *from doctor where email='"+email+"'" ;
    con.query(query,callback);
    console.log(query);
}

module.exports.temp = function(id,email,token,callback){
    var query = "insert into `temp` (`id`,`email`,`token`) values ('"+id+"','"+email+"','"+token+"')";
    con.query(query,callback);
}
module.exports.checktoken=function(token,callback){
    var query = "select * from temp where token='"+token+"'";
    con.query(query,callback);
    console.log(query);
}


module.exports.setpassword =function(id,newpassword,callback){
    var query = "update `doctor` set `password`='"+newpassword+"' where id="+id;
    con.query(query,callback);
}
