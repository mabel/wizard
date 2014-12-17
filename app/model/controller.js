var Nohm = require('nohm').Nohm
  , baseMethod = require('./_baseMethods')
  , _ = require('underscore');

var ControllerModel = Nohm.model('Controller', {
  properties: {
    name: {
      type: 'string',
      validations: [
        'notEmpty',
      ]
    },
  },
  methods: _.extend({}, baseMethod, {
    getCreateFields: function() {
    return ['name']; 
    },
    getUpdateFields: function() {
      return ['name']; 
    }
  }),
  idGenerator: 'increment'
});

module.exports = ControllerModel;