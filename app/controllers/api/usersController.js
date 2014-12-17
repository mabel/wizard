var locomotive = require('locomotive')
  , Controller = locomotive.Controller
  , Nohm = require('nohm').Nohm
  , _ = require('underscore')
  , baseController = require('./_baseController.js');

var userController = _.extend(new Controller(), baseController);

userController.modelName = 'User';

module.exports = userController;
