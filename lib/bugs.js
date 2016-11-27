'use strict';

var Bug = require('./bug');
var Square = require('./square');
var settings = require('./settings');

function Bugs() {
  this.bugs = [];
  this.resize();
}
Bugs.prototype.spawn = function(num) {
  for (var i = 0; i < num; i++) {
    this.bugs.push(new Bug(this));
  }
  return this;
};
Bugs.prototype.kill = function(bug) {
  for (var i = 0; i < this.bugs.length; i++) {
    if (this.bugs[i].id == bug.id) {
      document.body.removeChild(
        bug.elm
      );
      this.bugs.splice(i, 1);
    }
  }
  return this;
};
Bugs.prototype.move = function() {
  var self = this;
  setInterval(function() {
    for (var i = 0; i < self.bugs.length; i++) {
      self.bugs[i].move();
    }
  }, settings.FRAME_INTERVAL);
  window.addEventListener('resize', function(event){
    self.resize();
  });
  return this;
};
Bugs.prototype.resize = function() {
  var halfSize = settings.SIZE / 2;
  this.MIN_X = -halfSize;
  this.MIN_Y = -halfSize;
  this.MAX_X = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  ) + halfSize;
  this.MAX_Y = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  ) + halfSize;
};
Bugs.prototype.collision = function(bug) {
  for (var i = 0; i < this.bugs.length; i++) {
    if (this.bugs[i].id !== bug.id) {
      var bugPosition = new Square(
        bug.getPosition(),
        settings.SIZE
      );
      var otherPosition = new Square(
        this.bugs[i].getPosition(),
        settings.SIZE
      );
      if (bugPosition.hasCollision(otherPosition)) {
        return true;
      }
    }
  }
  return false;
};

module.exports = Bugs;