var locomotive = require('locomotive')
  , Controller = locomotive.Controller
  , Nohm = require('nohm').Nohm;

var pagesController = new Controller();

pagesController.index = function() {
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

module.exports = pagesController;
