var express = require('express');
var router = express.Router();
let Admin = require('../models/admin');
const adminController = require('../controllers/adminController');

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.isAuthenticated()){
		if(req.user.role==1){
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


router.get('/pending-post', adminController.getPendingPosts);

router.get('/accept-post/:id', adminController.acceptPost);

module.exports = router;
