var express = require('express');
var Admin = require('../models/admin');
var Category=require('../models/category')

//them admin moi
exports.adddAdmin=function(req,res,next){
   // const errors = validationResult(req);
   const errors =[];

	// if (!errors.isEmpty()) {
	// 	return res.status(422).send(errors);
	// }
	Admin.findOne({username:req.body.username},function(err,user){
		if(err){
			return res.status(503).send(err);
		}
		else if(user){
			return res.status(422).send({errors:[{msg:'Tên tài khoản đã tồn tại',param:'username'}]});
        }
        console.log(req.body.category);
        
		let newadmin = new Admin({
			username: req.body.username,
			password: req.body.password,
			fullname: req.body.full_name,
            phone: req.body.phone,
            categoryId:req.body.category,
			email: req.body.email,
			gender: req.body.gender
		});

		Admin.createAdmin(newadmin, function (err, createdUser) {
			if (err) {
                console.log("faild");
                
				return res.status(503).send(err);
			}
			else {
                console.log("ok");
                res.redirect('/');
				}
			})
		
	})
}

exports.manageAdmin=function(req,res,next){
    Admin.find().exec(function(err,result){
		if(err){
			console.log(err);
		}
		else{
            console.log(result);
            res.render('manage-admin',{admins:result})
		}
	})
}

exports.getEditAdmin=function(req,res,next){
	let andminid=req.query.id;
	console.log(andminid);

	Admin.findById(andminid).exec(function(err,result){
		if(err){
			console.log(err);
		}
		else{
			console.log("edit admin");

			console.log(result);

            res.render('edit-admin',{admin:result})
		}
	})
}

exports.editAdmin=function(req,res,next){
	console.log(req.query.id+" admin id");
	Admin.editAndmin(req.query.id,req.body.categoryId,req.body.time);
	res.redirect('manage-admin');
}