var locomotive = require('locomotive')
  , Controller = locomotive.Controller
  , passport = require('passport')
  , baseController = require('../api/_baseController.js')
  , Nohm = require('nohm').Nohm;

var authController = new Controller();

authController._callback = baseController._callback;

authController.login = function() {
  var self = this;

  passport.authenticate('local', function(err, user, info) {
    if (!user) {
      err = 'Not found';
    }

    if (err) {
      self._callback(err, user.allProperties());
    }

    self.req.logIn(user, function(err) {
      self._callback(err, user.allProperties());
    });

  })(this.__req, this.__res, this.__next);

}

authController.register = function() {
  var self = this,
      options = {},
      model = Nohm.factory('User');

  model.getCreateFields().forEach(function(field) {
    options[field] = self.param(field);
  });

  model.create(options, function (err) {
    var user = this;
    self.req.logIn(user, function(err) {
      self._callback(err, user.allProperties());
    });
  });
}

authController.logout = function() {
  var self = this;
  self.req.logout();
  self._callback(null, {});
}

module.exports = authController;
