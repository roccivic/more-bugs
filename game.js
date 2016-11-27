'use strict';

var settings = require('./lib/settings');
var Bugs = require('./lib/bugs');

new Bugs()
  .spawn(settings.NUM_BUGS)
  .move();