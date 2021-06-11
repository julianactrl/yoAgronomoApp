const { User } = require("../db");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { AUTH_JWT_SECRET } = process.env;
//==========================================================================//
const myProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    const result = await User.findByPk(id, {
      attributes: [
        "id",
        "fullName",
        "email",
        "password",
        "is_admin",
        "updatedAt",
      ],
    });
    if (req.user.updatedAt === result.updatedAt.toISOString()) {
      return res.json(result);
    } else {
      const { id, fullName, email, password, is_admin, updatedAt } = result;
      result.dataValues.jwt = jwt.sign(
        {
          id,
          fullName,
          email,
          password,
          is_admin,
          updatedAt,
        },
        AUTH_JWT_SECRET
      );
      return res.json(result);
    }
  } catch (error) {
    next(error);
  }
};

//==========================================================================//

const register = async (req, res) => {
  try {
    // Creating a new User
    const user = await User.create(req.body);
    console.log(user);
    // Receiving Data
    const { id, email, password, fullName } = user;
    if (!{ id, email, password, fullName }) return res.status(403).end();
    // Create a Token
    const token = jwt.sign(
      {
        id,
        email,
        password,
        fullName,
      },
      AUTH_JWT_SECRET,
      {
        expiresIn: 60 * 60 * 24, // expires in 24 hours
      }
    );
    res.json({ auth: true, token });
  } catch (error) {
    if (error.message === "Invalid password")
      return res.status(400).json({ message: "Invalid password" });
    if (error.erros[0]?.message === "email must be unique"){
      return res.status(400).json({ message: "email must be unique" });}
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//==========================================================================//
const login = async (req, res, next) => {
  passport.authenticate("local", (err, user, next) => {
    if (err) return next(err);
    else if (!user) return res.sendStatus(401);
    else return res.send(jwt.sign(user, AUTH_JWT_SECRET));
  })(req, res, next);
};
//==========================================================================//

module.exports = {
  login,
  register,
  myProfile,
};
