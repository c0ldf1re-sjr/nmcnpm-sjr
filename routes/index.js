var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin-login', { title: 'Express' });
});

router.get('/index.html', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/manage-admin.html', function(req, res, next) {
  res.render('manage-admin', { title: 'Express' });
});

router.get('/edit-admin.html', function(req, res, next) {
  res.render('edit-admin', { title: 'Express' });
});

router.get('/add-admin.html', function(req, res, next) {
  res.render('add-admin', { title: 'Express' });
});


router.get('/pending-post.html', function(req, res, next) {
  res.render('pending_post');
});

router.get('/admin-login.html', function(req, res, next) {
  res.render('admin-login', { title: 'Express' });
});


module.exports = router;
