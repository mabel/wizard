define([
  'steps/_step',
  'jquery',
  'bootstrap.tab',
  'jquery.serialize-object',
], function(Step, $) {
  var Store = Step.extend({
    init: function() {
    },
    stepDidMount: function() {
      this.form = $('#wizard #store');
      // $('#wizard #store').tab();
    },
    getData: function() {
      return this.form.serializeObject();
    },
    // return ajax
    saveStep: function() {
      return $.ajax({
        url: '/api/users/'+this.user.get('id'),
        type: 'PUT',
        dataType: 'json',
        data: this.getData()
      })
      .done(function(data) {
        this.user.set(data);
      }.bind(this))
      .fail(function(xhr) {
        console.log(xhr.responseJSON.error);
      });
    }
  });
  
  return Store;
})