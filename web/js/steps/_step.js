define([
  'class'
], function(Class) {
  var Step = Class.extend({
    stepDidMount: function() {},
    stepWillUnmount: function() {}
  });

  return Step;
})