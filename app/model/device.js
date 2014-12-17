var Nohm = require('nohm').Nohm
  , baseMethod = require('./_baseMethods')
  , _ = require('underscore');

var DeviceModel = Nohm.model('Device', {
  properties: {
    controller_id: {
      type: 'string',
      index: true,
      validations: [
        'notEmpty'
      ]
    },
    type: {
      type: 'string',
      index: true,
      validations: [
        'notEmpty'
      ]
    },
    title: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    price: {
      type: 'integer',
      defaultValue: 0
    },
    availability: {
      type: 'integer',
      defaultValue: 0
    },
  },
  methods: _.extend({}, baseMethod, {
    getCreateFields: function() {
      return [
        'controller_id',
        'type',
        'title',
        'description',
        'price',
        'availability'
      ];
    },
    getUpdateFields: function() {
      return [
        'controller_id',
        'type',
        'title',
        'description',
        'price',
        'availability'
      ];
    },
    getReadFields: function() {
      return ['controller_id'];
    },
    update: function(options, cl) {
      var self = this;
      self.p(options);
      self.save(cl);
    },
  }),
  idGenerator: 'increment'
});

module.exports = DeviceModel;