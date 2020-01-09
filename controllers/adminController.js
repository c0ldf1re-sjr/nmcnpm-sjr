var express = require('express');
const Admin = require('../models/admin');
const Product = require('../models/product');
const { check, validationResult } = require('express-validator');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

exports.adminLogin = function (req, res, next) {

	passport.authenticate('local', function (error, user, info) {
		if (error) {
			return res.status(500).json(error);
		}
		if (!user) {
			return res.status(401).json(info);
		}
		req.login(user, function (err) {
			if (err) {
				res.status(500).json(error);
			} else {
				res.status(200).json({ success: true });
			}
		});
	})(req, res, next);
}

passport.use(new LocalStrategy(function (username, password, done) {
	Admin.findOne({ username: username }, (err, foundUser) => {
		if (err) {
			throw err;
		}
		if (!foundUser) {
			return done(null, false, { message: 'Unknown user' });
		}

		Admin.comparePassword(password, foundUser.password, (err, isMatch) => {
			if (err) throw err;
			if (isMatch) {
				return done(null, foundUser);
			}
			else {
				return done(null, false, { message: 'Invalid password' });
			}
		});
	});
}));

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	Admin.findById(id, function (err, user) {
		done(err, user);
	});
});

exports.logoutUser = (req, res) => {
	req.logOut();
	return res.redirect('/');
}

exports.getPendingPosts = function (req, res, next) {
	Product.find({ deleted_at: null, pending: 1 }, (err, docs) => {
		res.render('pending_post', { posts: docs });
	});
}


exports.acceptPost = function(req, res, next) {
	Product.findByIdAndUpdate(req.params.id, {pending: 2}, (err, raw) => {
		Product.find({ deleted_at: null, pending: 1 }, (err, docs) => {
			res.render('pending_post', { posts: docs });
		});
	});
}