const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("./db.js");
const jwt = require("jsonwebtoken");
const { AUTH_JWT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BACK } =
  process.env;


passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password", session: false },
    async (email, password, done) => {
      console.log("!!!!!!", email, password);
      const user = await User.findOne({ where: { email: email } });
      if (!user) return done(null, false, { message: "Incorrect email." });
      if (!user.compare(password)) return done(null, false, { message: "Incorrect password." });
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
    jwt.verify(token, AUTH_JWT_SECRET, function (err, user) {
      console.log(token);

      if (err) return done(err);
      return done(null, user ? user : false);
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


//==========================================================================//
//================GOOGLE===================================================//
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${BACK}/auth/googleAuth`,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const user = {
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          email: profile.emails[0].value,
          is_admin: false,
          googleId: profile.id,
          profile_pic: profile.photos[0].value.replace("s96-c", "s300-c"),
          password: null,
        };
        const foundUser = await User.findOne({ where: { email: user.email } });
        if (foundUser) {
          const updatedUser = await foundUser.update(user);
          done(null, updatedUser);
        } else {
          const createdUser = await User.create(user);
          done(null, createdUser);
        }
      } catch (err) {
        done(err, null);
      }
    }
  )
);

module.exports = passport;
