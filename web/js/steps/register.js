define([
  'steps/_step',
  'jquery',
  'jquery.serialize-object',
], function(Step, $) {
  var Register = Step.extend({
    stepDidMount: function() {
      this.form = $('#wizard #register');
    },
    getData: function() {
      return this.form.serializeObject();
    },
    // return ajax
    saveStep: function() {
      return $.ajax({
        url: '/auth/register',
        type: 'POST',
        dataType: 'json',
        data: this.getData(),
      })
      .fail(function(xhr, status, error) {
        console.log(xhr.responseJSON.error);
      });
    }
  });
  
  return Register;
})