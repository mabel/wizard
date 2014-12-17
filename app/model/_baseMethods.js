var Nohm = require('nohm').Nohm;

var baseMethods = {};

baseMethods.getCreateFields = function() { return []; }
baseMethods.getUpdateFields = function() { return []; }
baseMethods.getReadFields = function() { return []; }

baseMethods.create = function(options, cl) {
  this.update(options, cl);
}

baseMethods.update = function(options, cl) {
  this.p(options);
  this.save(cl);
}

baseMethods.destroy = function(cl) {
  this.remove(cl);
}

baseMethods.read = function(options, cl) {
  Nohm.factory(this.modelName).findAndLoad(options, function(err, items) {
    items = items.map(function(item) {
      return item.allProperties();
    });
    cl(err, items);
  });
}

module.exports = baseMethods;
