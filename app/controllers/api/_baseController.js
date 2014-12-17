var Nohm = require('nohm').Nohm;

var baseController = {};

baseController._model = function(name){ return Nohm.factory(name) };

baseController._callback = function(err, data) {
  if (err) {
    data = {
      error: err
    };
    this.res.status(400);
  }
  this.res.json(data);
};

baseController.index = function() {
  var self = this,
      options = {},
      model = self._model(self.modelName);

  model.getReadFields().forEach(function(field) {
    options[field] = self.param(field);
  });

  model.read(options, function(err, items) {
    self._callback(err, items);
  });
}

baseController.show = function() {
  var self = this,
      model = self._model(self.modelName);

  model.load(self.param('id'), function (err) {
      self._callback(err, this.allProperties());
    });
}

baseController.create = function() {
  var self = this,
      options = {},
      model = self._model(self.modelName);


  model.getCreateFields().forEach(function(field) {
    options[field] = self.param(field);
  });

  model.create(options, function (err) {
    self._callback(err, this.allProperties());
  });

}

baseController.update = function() {
  var self = this,
      options = {},
      model = self._model(self.modelName);

  model.getUpdateFields().forEach(function(field) {
    options[field] = self.param(field);
  });

  model.load(self.param('id'), function (err) {
      this.update(options, function (err) {
        self._callback(err, this.allProperties());
      });
  });
}

baseController.destroy = function() {
  var self = this,
      model = self._model(self.modelName);

  model.load(self.param('id'), function (err) {
      this.destroy(function (err) {
        self._callback(err, this.allProperties());
      });
  });
}


module.exports = baseController;
