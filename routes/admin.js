var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/admin-login.html', function(req, res, next) {
  res.render('admin-login', { title: 'Express' });
});


module.exports = router;
