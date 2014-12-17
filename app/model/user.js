var Nohm = require('nohm').Nohm
  , _ = require('underscore')
  , baseMethod = require('./_baseMethods')
  , bcrypt = require('bcrypt');

var UserModel = Nohm.model('User', {
  properties: {
    email: {
      type: 'string',
      unique: true,
      validations: [
        'notEmpty',
        'email'
      ]
    },
    hash: {
      type: 'string',
      validations: [
        'notEmpty'
      ]
    },
    salt: {
      type: 'string',
      validations: [
        'notEmpty'
      ],
      defaultValue: bcrypt.genSaltSync()
    },
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
    contactSms: {
      type: 'string',
    },
    contactEmail: {
      type: 'string',
    },
    contactSupport: {
      type: 'string',
    },
    contactSecurity: {
      type: 'string',
    },
    controller_id: {
      type: 'string',
    },
  },
  methods: _.extend({}, baseMethod, {
    getCreateFields: function() {
      return [
        'email',
        'password',
        'firstName',
        'lastName',
        'phone',
        'contactSms',
        'contactEmail',
        'contactSupport',
        'contactSecurity',
        'controller_id'
      ];
    },
    getUpdateFields: function() {
      return [
        'email',
        'firstName',
        'lastName',
        'phone',
        'contactSms',
        'contactEmail',
        'contactSupport',
        'contactSecurity',
        'controller_id'
      ];
    },
    create: function(options, cl) {
      options.hash = this.generateHash(options.password);
      this.update(_.omit(options, 'password'), cl);
    },
    generateHash: function(password) {
      this.p('salt', bcrypt.genSaltSync());
      return bcrypt.hashSync(password+'', this.p('salt'));
    },
    verifyHash: function(password) {
      return bcrypt.compareSync(password, this.p('hash'));
    },
    allProperties: function () {
      var props = this._super_allProperties.call(this);
      delete props.hash;
      delete props.salt;
      return props;
    }
  }),
  idGenerator: 'increment'
});

module.exports = UserModel;