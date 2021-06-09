const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const { User } = require('./db.js');
const jwt = require('jsonwebtoken');
const { SECRET } = process.env;

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password', session: false },
    async (email, password, done) => {
      console.log('PASSPORT--->', email, password);
      const user = await User.findOne({ where: { email: email } });
      if (!user) return done(null, false);
      if (!user.compare(password)) return done(null, false);
      const { id, name, last_name, email: userEmail, photoURL } = user;
      return done(null, {
        id,
        name,
        last_name,
        email: userEmail,
        photoURL,
      });
    }
  )
);

passport.use(
  new BearerStrategy((token, done) => {
    jwt.verify(token, SECRET, function (err, user) {
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



module.exports = passport;
