var passport = require('passport')
  , Strategy = require('passport-local').Strategy
  , Nohm = require('nohm').Nohm
  , UserModel = require('../../app/model/user');

module.exports = function() {

  passport.use(new Strategy({
      usernameField: 'email',
    }, function(email, password, done) {
      UserModel.findAndLoad({
        email: email
      }, function (err, users) {
        if (err) { return done(err); }
        if (!users.length) { return done(null, false); }
        if (!users[0].verifyHash(password)) { return done(null, false); }
        return done(null, users[0]);
      });
    }
  ));
  
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    UserModel.load(id, function (err) {
      done(null, this.allProperties());
    });
  });
}
