'use strict';

var settings = require('./settings');
var Bugs = require('./bugs');

new Bugs()
  .spawn(settings.NUM_BUGS)
  .move();