'use strict';

var Bug = require('./bug');
var Square = require('./square');
var settings = require('./settings');

function Bugs() {
  this.bugs = [];
  this.resize();
  // Add stylesheet
  var css = this.getCss(),
      head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
}
Bugs.prototype.getCss = function() {
  return 'bug{position:fixed;display:block;cursor:pointer;transition:transform 0.3s ease-in-out;}';
};
Bugs.prototype.spawn = function(num) {
  for (var i = 0; i < num; i++) {
    if (this.bugs.length + 1 >= settings.MAX_BUGS) {
      alert('Winner');
      this.killAll();
    } else {
      this.bugs.push(new Bug(this));
    }
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
Bugs.prototype.killAll = function() {
  for (var i = 0; i < this.bugs.length; i++) {
    document.body.removeChild(
      this.bugs[i].elm
    );
  }
  this.bugs = [];
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
  var halfSize = settings.MAX_SIZE / 2;
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
        bug.size
      );
      var otherPosition = new Square(
        this.bugs[i].getPosition(),
        this.bugs[i].size
      );
      if (bugPosition.hasCollision(otherPosition)) {
        return true;
      }
    }
  }
  return false;
};

module.exports = Bugs;