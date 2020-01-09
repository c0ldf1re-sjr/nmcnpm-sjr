module.exports =  function (req, res, next) {
	if (!req.isAuthenticated()||(req.isAuthenticated()&&req.user.role!=2)) {
		if(req.xhr){
			return res.status(401).send({error:true,message:'unAuthenticated'});
		}
		else{
			res.redirect('/');
		}
	}
	else{
		next();
	}
}