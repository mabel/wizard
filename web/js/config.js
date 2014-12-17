requirejs.config({
  baseUrl: 'js',
  paths: {
    jquery: 'vendor/jquery-2.1.1',
    'jquery.steps': 'vendor/jquery.steps-1.1.0',
    'jquery.serialize-object': 'vendor/jquery.serialize-object-2.3.4',
    underscore: 'vendor/underscore-1.7.0',
    bootstrap: 'vendor/bootstrap-3.3.1',
    'bootstrap.tab': 'vendor/bootstrap.tab-3.3.1',
    'class': 'vendor/class',
  },
  shim: {
    jquery: {
      exports: '$'
    },
    'jquery.steps': {
      deps: ['jquery'],
      exports: '$.fn.steps'
    },
    'jquery.serialize-object': {
      deps: ['jquery'],
      exports: '$.fn.serializeObject'
    },
    underscore: {
      exports: '_'
    },
    'bootstrap': {
      deps: ['jquery'],
    },
    'bootstrap.tab': {
      deps: ['bootstrap'],
      exports: '$.fn.tab'
    },
  }
});