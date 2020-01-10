var express = require('express');
var router = express.Router();
var superAdminController=require('../controllers/superAdminController')

router.get('/add-admin', function(req, res, next) {
	res.render('add-admin');
});

router.post('/add-admin',superAdminController.adddAdmin);

router.get('/manage-admin',superAdminController.manageAdmin);

router.get('/edit-admin',superAdminController.getEditAdmin);

router.post('/edit-admin',superAdminController.editAdmin);

module.exports = router;