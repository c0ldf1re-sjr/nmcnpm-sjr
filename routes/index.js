var express = require('express');
var router = express.Router();
let Admin = require('../models/admin');
/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.isAuthenticated()){
		if(req.user,role==1){
			return res.redirect('/pending-post');
		}
		else{
			return res.render('index');
		}
	}
	else{
		return res.redirect('/login');
	}
});

router.get('/login',function(req,res,next){
	if(req.isAuthenticated()){
		if(req.user.role==1){
			return res.redirect('/pending-post');
		}
		else{
			return res.redirect('/');
		}
	}
	else{
		var bcrypt = require('bcryptjs');
		bcrypt.genSalt(10, function (err, salt) {
			bcrypt.hash('1712802', salt, function (err, hash) {
				Admin.create({username:'1712802',password:hash,role:2},function(err,doc){
					if(err){
						console.log(err);
					}
					else{
						console.log(doc);
					}
				})
			});
		});
		// Admin.find({},function(err,doc){
		// 	console.log(doc);
		// })
		return res.render('login');
	}
})

router.get('/manage-admin', function(req, res, next) {
	res.render('manage-admin');
});

router.get('/edit-admin', function(req, res, next) {
	res.render('edit-admin');
});

router.get('/add-admin', function(req, res, next) {
	res.render('add-admin');
});


router.get('/pending-post', function(req, res, next) {
	res.render('pending_post');
});

module.exports = router;
