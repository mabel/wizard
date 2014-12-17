var locomotive = require('locomotive')
  , Controller = locomotive.Controller
  , Nohm = require('nohm').Nohm
  , _ = require('underscore')
  , baseController = require('./_baseController.js');

var controllerController = _.extend(new Controller(), baseController);

controllerController.modelName = 'Controller';

module.exports = controllerController;
