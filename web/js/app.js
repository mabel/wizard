define([
  'class',
  'model/user',
  'jquery',
  'steps/register',
  'steps/controller',
  'steps/store',
  'jquery.steps'
], function(Class, User, $, Register, Controller, Store) {

  var App = Class.extend({
      _currentIndex: 0,
      steps: [],
      stepsConstructor: [
        Register,
        Controller,
        Store
      ],
      init: function(option) {
        this.$wizard = $('#wizard');

        this.user = new User(option.user);

        this.initSteps();

        this.startJqurySteps();
        this.toogleLoginPopup();

        if(this.user.isAuth() && this._currentIndex === 0) {
          this._currentIndex = 1;
          this.wizard.steps('next');
          if (this.user.get('controller_id') && this._currentIndex === 1) {
            this._currentIndex = 2;
            this.wizard.steps('next');
          }
        }
        
      },
      initSteps: function() {
        this.stepsConstructor.forEach(function(Step) {
          var step = new Step();
          // передаем по ссылки
          step.user = this.user;
          this.steps.push(step);
        }.bind(this));
      },
      startJqurySteps: function() {
        var self = this;
        this.wizard = this.$wizard.steps({
          headerTag: 'h3',
          bodyTag: 'section',
          transitionEffect: 'slideLeft',
          stepsOrientation: 'vertical',
          onInit: function(event, currentIndex) {
            self.getStep(currentIndex).stepDidMount();
            self.$wizard.removeClass('hidden');
          },
          onContentLoaded: function(event, currentIndex) {
            // start render element
            self.getStep(currentIndex).stepDidMount();
          },
          onStepChanging: function (event, currentIndex, newIndex) {
            var isSwitchStep = false;

            if (self._currentIndex === currentIndex) {
              self.saveStep(currentIndex, newIndex);
            } else {
              isSwitchStep = true;
            }

            return isSwitchStep;
          },
          onStepChanged: function (event, currentIndex, priorIndex) {
            // remove render element
            self.getStep(priorIndex).stepWillUnmount();

            self.getStep(currentIndex).stepDidMount();
          },
          onFinishing: function (event, currentIndex) {
            // debugger
            return true;
          },
          onFinished: function (event, currentIndex) {
            // debugger
            // alert("Submitted!");
          }
        });
      },
      getStep: function(currentIndex) {
        return this.steps[currentIndex];
      },
      saveStep: function(currentIndex, newIndex) {
        this.getStep(currentIndex).saveStep()
          .then(function() {
            this._currentIndex = newIndex;
            this.wizard.steps('next');
          }.bind(this));
      },
      toogleLoginPopup: function() {
        $('#showLogin').click(function() {
          $('#login').slideToggle(100);
          return false;
        });
      }
    });

  return App;
})