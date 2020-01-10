var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
var adminSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password:{
		type:String,
		required:true
	},
	fullname:{
		type:String,
	},
	avatar:{
		type:String,
	},
	gender:{
		type:Number,
		default:0
	},
	role:{
		type: Number,
		default:1,
	},
	categoryId:{
		type:String,
		ref: 'Category',
		default:null
	},
	time:{
		type:Number,
		default:1
	},
	created_at: { 
		type: Date,
		default: Date.now
	}
},{collection:'admins'});

var Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;

module.exports.createAdmin = function (newAdmin, callBack) {
	var bcrypt = require('bcryptjs');
	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(newAdmin.password, salt, function (err, hash) {
			newAdmin.password = hash;
			newAdmin.save(callBack);
		});
	});
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
		if(err) throw err;
		callback(null, isMatch);
	});
}

module.exports.editAndmin=function(adminid,categoryId,time){
	 Admin.updateOne({ '_id': adminid }, { $set: { 'categoryId': categoryId,  'time': time } }, (err, doc) => {
        if (err) {
            console.log("update document error");
        } else {
            console.log("update document success");
        }
    });
}