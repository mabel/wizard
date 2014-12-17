var locomotive = require('locomotive')
  , Controller = locomotive.Controller
  , _ = require('underscore')
  , Nohm = require('nohm').Nohm;

var stepsController = new Controller();

stepsController.register = function() {
  this.user = this.req.user;
  this.render();
}

stepsController.controller = function() {
  if (!this.req.isAuthenticated())
    return this.res.send(401);

  var self = this;

  self.user = self.req.user;
  
  Nohm.factory('Controller').read({}, function(err, controllers) {
    if (err && err !== 'not found') {
      self.res.status(400);
    }
    self.controllers = controllers;

    self.render();
  });
}

stepsController.store = function() {
  if (!this.req.isAuthenticated())
    return this.res.send(401);

  var self = this;
  var types = ['security', 'energy', 'comfort'];

  self.user = self.req.user;
  self.devices = {};
  
  if (self.user.controller_id) {
    Nohm.factory('Device').read({
      controller_id: self.user.controller_id
    }, function(err, devices) {
      if (err && err !== 'not found') {
        self.res.status(400);
      }

      types.forEach(function(type) {
        self.devices[type] = _.where(devices, {type: type});
      });

      self.render();
    });
  } else {
    types.forEach(function(type) {
      self.devices[type] = [];
    });
    self.render();
  }
}


module.exports = stepsController;
