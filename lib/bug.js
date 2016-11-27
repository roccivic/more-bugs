'use strict';

var Point = require('./point');
var Square = require('./square');
var Util = require('./util');
var settings = require('./settings');

function Bug(parent) {
  this.id = settings.ID++;
  this.parent = parent;
  var x = Util.randomInt(parent.MIN_X, parent.MAX_X);
  var y = Util.randomInt(parent.MIN_Y, parent.MAX_Y);
  if (Math.random() >= 0.5) {
    if (Math.random() >= 0.5) {
      x = parent.MIN_X;
    } else {
      x = parent.MAX_X;
    }
  } else {
    if (Math.random() >= 0.5) {
      y = parent.MIN_Y;
    } else {
      y = parent.MAX_Y;
    }
  }
  this.position = new Point(x, y);
  this.direction = 0;
  this.direction = this.newDirection();
  this.timeOn = Util.randomInt(0, settings.TIME_ON);
  this.timeOff = Util.randomInt(0, settings.TIME_OFF);
  this.stuck = 0;
  this.create();
  this.draw();
}
Bug.prototype.create = function() {
  var self = this;
  self.elm = document.createElement("bug");
  self.elm.innerHTML = this.getSvg();
  self.elm.addEventListener('click', function() {
    self.parent.kill(self);
    self.parent.spawn(settings.NUM_RESPAWN);
  }, false);
  document.body.insertBefore(
    self.elm,
    document.body.childNodes[0]
  );
};
Bug.prototype.getSvg = function() {
  var color = Util.randomColor();
  return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><g><rect style="fill:'+color+';" width="20" height="15" x="0" y="5" ry="3" /><rect style="fill:'+color+';" width="10" height="10" x="5" y="0" ry="3" /></g></svg>';
};
Bug.prototype.getPosition = function() {
  var velocity = {
    x: settings.SPEED * Math.cos(this.direction),
    y: settings.SPEED * Math.sin(this.direction)
  };
  return new Point(
    this.position.x + velocity.x,
    this.position.y + velocity.y
  );
};
Bug.prototype.getDirection = function(force) {
  var direction = this.direction;
  // If already off screen
  if (this.position.x > this.parent.MAX_X) {
    this.position.x = this.parent.MAX_X;
  }
  if (this.position.y > this.parent.MAX_Y) {
    this.position.y = this.parent.MAX_Y;
  }
  var position = this.getPosition();
  if (force) {
    direction = this.newDirection();
  }
  if (
    position.x <= this.parent.MIN_X ||
    position.x >= this.parent.MAX_X ||
    position.y <= this.parent.MIN_Y ||
    position.y >= this.parent.MAX_Y
  ) {
    direction = this.newDirection();
    position = this.getPosition();
  }
  return direction;
};
Bug.prototype.newDirection = function() {
  var newDirection = (Util.randomInt(0, 360) * Math.PI) / 180;
  newDirection -= 180 * Math.PI / 180;
  return this.direction + newDirection;
};
Bug.prototype.draw = function() {
  this.elm.style.left = (this.position.x - settings.SIZE / 2) + 'px';
  this.elm.style.top = (this.position.y - settings.SIZE / 2) + 'px';
  this.elm.style.transform = 'rotate(' +
    (this.direction + Math.PI/2)
  + 'rad)';
};
Bug.prototype.move = function() {
  if (this.timeOn > 0) {
    if (this.parent.collision(this)) {
      var retries = 10;
      while (this.parent.collision(this) && retries--) {
        this.direction = this.getDirection(true);
        this.timeOn -= settings.FRAME_INTERVAL;
      }
      if (retries > 0) {
        this.position = this.getPosition();
      } else {
        this.stuck++;
      }
    } else {
      this.direction = this.getDirection();
      this.position = this.getPosition();
    }
    this.draw();
    this.timeOn -= settings.FRAME_INTERVAL;
  } else if (this.timeOff > 0) {
    this.timeOff -= settings.FRAME_INTERVAL;
  } else {
    this.direction = this.getDirection(true);
    this.timeOn = Util.randomInt(0, settings.TIME_ON);
    this.timeOff = Util.randomInt(0, settings.TIME_OFF);
    this.draw();
  }
  if (this.stuck > Util.randomInt(20, 100)) {
    console.log('stuck');
    this.parent.spawn(1);
    this.parent.kill(this);
  }
};

module.exports = Bug;
