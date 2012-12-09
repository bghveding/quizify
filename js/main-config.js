requirejs.config({
  paths: { 
    'cs': 'vendor/requirejs/cs',
    'text': 'vendor/requirejs/text',
    'underscore': 'vendor/underscore-min',
    'underscore.string': 'vendor/underscore.string.min',
    'backbone': 'vendor/backbone',
    'coffee-script': 'vendor/CoffeeScript',
  },

  shim: {
    'backbone': {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
    },
    'underscore': { exports: '_' },
    'underscore.string': {
      deps: ['underscore'],
      exports: '_str',
    },
    'vendor/bootstrap.min': ['jquery'],
    'vendor/backbone.localStorage': ['backbone']
  },
  //urlArgs: "bust=" +  (new Date()).getTime() // Avoid fetching cached version of files
});