const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
//const GoogleStrategy = require("passport-google-oauth20").Strategy;
//const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require("../db.js");
const jwt = require("jsonwebtoken");
const { AUTH_JWT_SECRET, FRONT } = process.env;

//==========================================================================//
const myProfile = async (req, res, next) => {
  try {
		const { id } = req.user;
		const result = await User.findByPk(id, {
			attributes: ['id', 'fullName', 'profile_pic', 'email']
		});
		if (req.user.updatedAt === result.updatedAt.toISOString()) {
			return res.json(result);
		} else {
			const { id, fullName,  profile_pic, email, } = result;
			result.dataValues.jwt = jwt.sign(
				{
					id,
					fullName,
					profile_pic,
					email,
				},
				AUTH_JWT_SECRET
			)
			return res.json(result)
		}
	} catch (error) {
		next(error);
	}
};

//==========================================================================//

const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const { id, email, fullName, password } = user;

    // Receiving Data
    if (!{ id, email, fullName, password }) return res.status(403).end();
    // Create a Token
    const token = jwt.sign(
      {
        id,
        email,
        fullName,
        password,
      },
      AUTH_JWT_SECRET,
      {
        expiresIn: 60 * 60 * 24, // expires in 24 hours
      }
    );
    res.status(200).json({ auth: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//==========================================================================//
const login = async (req, res, next) => {
  console.log("estoy en login", req.user)
  passport.authenticate("local", (err, user) => {
    if (err) return next(err);
		else if (!user) return res.status(401).json({message: "No sos vos soy yo"});
		else return res.send(jwt.sign(user, AUTH_JWT_SECRET));
  })(req, res, next);
};

//==========================================================================//

const logout = (req, res) => {
  req.logout();
  return res.status(200).send("Logout successed");
};

module.exports = {
  login,
  logout,
  register,
  myProfile,
};
