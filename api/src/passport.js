const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const { User } = require("./db.js");
const jwt = require("jsonwebtoken");
const { AUTH_JWT_SECRET } = process.env;

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password", session: false },
    async (email, password, done) => {
      console.log("!!!!!!",email, password)
      const user = await User.findOne({ where: { email: email } });
      if (!user) return done(null, false);
      if (!user.compare(password)) return done(null, false);
      const { id, email: userEmail, fullName, is_admin, updatedAt } = user;
      return done(null, {
        id,
        email: userEmail,
        fullName,
        is_admin,
        updatedAt,
      });
    }
  )
);

passport.use(
  new BearerStrategy((token, done) => {
    console.log("soy el token",token)
    jwt.verify(token, AUTH_JWT_SECRET, function(err, user)  {
      if (err) return done(err);
      return done(null, user ? user : false);
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
