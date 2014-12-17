var express = require('express')
  , poweredBy = require('connect-powered-by')
  , session = require('express-session')
  , RedisStore = require('connect-redis')(session)
  , passport = require('passport')
  , morgan = require('morgan');

module.exports = function() {
  // Use middleware.  Standard [Connect](http://www.senchalabs.org/connect/)
  // middleware is built-in, with additional [third-party](https://github.com/senchalabs/connect/wiki)
  // middleware available as separate modules.
  if ('development' == this.env) {
    this.use(morgan('tiny'));
  }

  this.use(express.bodyParser());
  this.use(express.cookieParser());
  this.use(express.methodOverride());
  this.use(poweredBy('Locomotive'));
  this.use(express.favicon());
  this.use(express.session({
    secret: "secretysecret",
    //Change this location if you are running Redis remotely
    store: new RedisStore({ host: 'localhost', port: 6397, client: this.db})
  }));
  this.use(passport.initialize());
  this.use(passport.session());
  this.use(this.router);
  this.use(express.static(__dirname + '/../../web'));
  this.use(express.errorHandler());

}
