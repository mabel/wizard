// Draw routes.  Locomotive's router provides expressive syntax for drawing
// routes, including support for resourceful routes, namespaces, and nesting.
// MVC routes can be mapped to controllers using convenient
// `controller#action` shorthand.  Standard middleware in the form of
// `function(req, res, next)` is also fully supported.  Consult the Locomotive
// Guide on [routing](http://locomotivejs.org/guide/routing.html) for additional
// information.
var passport = require('passport');

module.exports = function routes() {
  // DefaultRoute
  this.root('pages#index');

  // this.match('steps/register', 'steps#register');
  // this.match('steps/controller', 'steps#controller');
  this.match('steps/store', 'steps#store');

  this.namespace('api', function() {
    this.resources('users');
    this.resources('controllers', function() {
      this.resources('devices');
    });
  });

  this.namespace('auth', function() {
    this.match('register', 'auth#register', { via: 'post' });
    this.match('login', 'auth#login', { via: 'post' });
    this.match('logout', 'auth#logout', { via: 'post' });
  });
  
  // NotFoundRoute
  // this.match('*', 'pages#main');
}
