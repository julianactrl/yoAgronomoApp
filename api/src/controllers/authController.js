const { User } = require("../db");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { AUTH_JWT_SECRET, FRONT } = process.env;
const bcrypt = require("bcrypt");


//==========================================================================//
const myProfile = async (req, res, next) => {
  try {
    const id  = req.user.id;
    console.log(req.user)
    const result = await User.findByPk(id, {
      attributes: [
        "id",
        "fullName",
        "email",
        "profile_pic",
        "is_admin",
        "updatedAt",
      ],
    });
    if (req.user.updatedAt === result.updatedAt.toISOString()) {
      return res.send(result);
    } else {
      const { id, fullName, email, profile_pic, is_admin, updatedAt } = result;
      result.dataValues.jwt = jwt.sign(
        {
          id,
          fullName,
          email,
          profile_pic,
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
  try{
    const user = await User.create(req.body);
    const { 
      id,
      email,
      fullName,
      password
    } = user;

    // Receiving Data
    if (!{ id, email, fullName, password }) return res.status(403).end();
    // Create a Token
    const token = jwt.sign(
      {
        id,
        email,
        fullName,
        password
      },
      AUTH_JWT_SECRET,
      {
        expiresIn: 60 * 60 * 24, // expires in 24 hours
      }
    )
    res.status(200).json({ auth: true, token });

   
} catch (error) {
    console.log(error)
    res.status(500).json({ message:  "Something went wrong"  });
}
}

//==========================================================================//
const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//       const oldUser = await User.findOne({
//         where: { email: email  }});
//       if (!oldUser) return res.status(404).json({ message:  "User doesn`t exist" });
//       const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
//       if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid Password' });
//       const token = jwt.sign({ email: oldUser.email }, AUTH_JWT_SECRET, { expiresIn: '1hr' });
//       res.status(201).json({ result: oldUser, token, message:  "Log in Successful" });
//   } catch (error) {
//       console.log(error);
//       res.status(500).json({message:'Something went wrong'});
//   }
// }
  passport.authenticate("local", (err, user) => {
    if (err) {
      console.log(err)
    }
    else if (!user) {
      console.log(user)
      return res.status(401)
    }
    else return res.send(jwt.verify(user, AUTH_JWT_SECRET));
  })(req, res);
};




//==========================================================================//

//logout
// const logout = (req, res) => {
  
//   res.localStorage.removeItem("userInfo");
//   res.status(200).send("User Logged out");
// };

//==========================================================================//

const google = () => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
  });
};

const googleAuth = () => {
  passport.authenticate("google"),
    function (req, res) {
      const { id, fullName, profile_pic, email, is_admin, updatedAt } =
        req.user.dataValues;
      const token = jwt.sign(
        {
          id,
          fullName,
          profile_pic,
          email,
          is_admin,
          updatedAt,
        },
        AUTH_JWT_SECRET
      );
      res.redirect(`${FRONT}/?jwt=${token}`);
    };
};

module.exports = {
  login,
 // logout,
  register,
  myProfile,
  google,
  googleAuth,
};
