var locomotive = require('locomotive')
  , Controller = locomotive.Controller
  , Nohm = require('nohm').Nohm
  , _ = require('underscore')
  , baseController = require('./_baseController.js');

var deviceController = _.extend(new Controller(), baseController);

deviceController.modelName = 'Device';

module.exports = deviceController;
