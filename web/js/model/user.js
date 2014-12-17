define([
  'class',
  'underscore'
], function(Class, _) {
  var User = Class.extend({
        props: {},
        init: function(options) {
          this.set(options);
        },
        get: function(key) {
          return this.props[key];
        },
        set: function(key, val) {
          var attrs;
          if (key == null) return this.props;

          if (typeof key === 'object') {
            attrs = key;
          } else {
            (attrs = {})[key] = val;
          }
          return _.extend(this.props, attrs);
        },
        isAuth: function() {
          return !!this.get('id');
        }
      });

  return User;
})