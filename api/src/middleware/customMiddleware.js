const isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
	  next();
	} else {
	  res.send(false);
	}
  };


module.exports = {
	isAuthenticated,
	
};