const isAuthenticated =  (req, res, next) =>{
	if (req.user) next();
	else res.sendStatus(401)
};

const isAdmin = (req, res, next) => {
	if (req.user.is_admin) next();
	else res.sendStatus(403)
};

module.exports = {
	isAuthenticated,
	isAdmin
};