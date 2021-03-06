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
  this.size = Util.randomInt(
    settings.MIN_SIZE,
    settings.MAX_SIZE
  );
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
  self.elm.style.width = self.size + 'px';
  self.elm.style.height = self.size + 'px';
  self.elm.innerHTML = this.getSvg();
  self.elm.addEventListener('click', function() {
    self.parent.kill(self);
    self.parent.spawn(self.parent.getNumSpawn());
  }, false);
  document.body.appendChild(self.elm);
};
Bug.prototype.getSvg = function() {
  var color = Util.randomColor();
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 47.5"><path d="M45 27.5H2.5a1.25 1.25 0 1 1 0-2.5H45a1.249 1.249 0 1 1 0 2.5" fill="#292f33"/><path d="M17.279 25c-.03 0-.058-.001-.087-.003-.115-.008-11.517-.892-13.417-10.293a1.251 1.251 0 0 1 .977-1.474 1.247 1.247 0 0 1 1.473.977c1.526 7.555 11.041 8.29 11.137 8.296A1.25 1.25 0 1 1 17.278 25M5 40a1.25 1.25 0 0 1-1.131-1.78c3.957-8.463 13.797-9.651 14.214-9.698a1.255 1.255 0 0 1 1.379 1.103 1.254 1.254 0 0 1-1.101 1.384c-.088.008-8.874 1.095-12.23 8.271A1.25 1.25 0 0 1 5 40M29.691 25a1.249 1.249 0 0 1-.081-2.498c.101-.006 10.145-.77 11.665-8.295a1.243 1.243 0 0 1 1.472-.977c.677.137 1.115.796.98 1.474-1.903 9.406-13.462 10.262-13.955 10.293a1.695 1.695 0 0 1-.08.003M42.501 40a1.25 1.25 0 0 1-1.133-.72c-3.37-7.204-12.656-8.263-12.748-8.271a1.249 1.249 0 1 1 .261-2.486c.439.046 10.791 1.23 14.752 9.697A1.25 1.25 0 0 1 42.5 40" fill="#292f33"/><path d="M32.487 10.957c-.087-3.283-1.597-5.27-3.87-6.3-.784-.558-2.488-.738-3.617-.907-.344-.038-.928-.029-1.25-.04-.425.004-.977.023-1.25.04a10.35 10.35 0 0 0-3.618.907c-2.272 1.03-3.782 3.018-3.87 6.3-3.787 2.231-6.262 6.12-6.262 11.543 0 8.95 6.715 21.153 15 21.153s15-12.203 15-21.153c0-5.423-2.476-9.312-6.263-11.543" fill="#292f33"/><path d="M21.251 44.949c-8.046-.744-14.376-8.619-14.376-18.226S13.205 13.245 21.25 12.5c.412-.038 1.25-.057 1.25 2.868v28.176c0 1.462-.836 1.444-1.249 1.404M26.249 44.949c8.046-.744 14.376-8.619 14.376-18.226S34.295 13.245 26.25 12.5c-.413-.038-1.25-.057-1.25 2.868v28.176c0 1.462.838 1.444 1.249 1.404" fill="' + color + '"/><path d="M20 20a2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1 5 0M17.5 28.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0M20 37.5a2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1 5 0M35 19.375a3.125 3.125 0 1 1-6.25 0 3.125 3.125 0 0 1 6.25 0M31.25 26.875a1.876 1.876 0 1 1-3.751-.001 1.876 1.876 0 0 1 3.751.001M38.75 30a2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1 5 0M35 37.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0" fill="#292f33"/><path d="M23.116 8.345a3.125 3.125 0 1 1-6.249.001 3.125 3.125 0 0 1 6.25 0M30.446 8.345a3.125 3.125 0 1 1-6.25.001 3.125 3.125 0 0 1 6.25 0" fill="#fff"/><path d="M21.866 7.745a1.876 1.876 0 1 1-3.751-.001 1.876 1.876 0 0 1 3.751.001M29.196 7.745a1.876 1.876 0 1 1-3.752-.001 1.876 1.876 0 0 1 3.752.001" fill="#292f33"/></svg>';
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
  return direction % Math.PI;
};
Bug.prototype.newDirection = function() {
  var newDirection = (Util.randomInt(0, 360) * Math.PI) / 180;
  newDirection -= 180 * Math.PI / 180;
  return this.direction + newDirection;
};
Bug.prototype.draw = function() {
  this.elm.style.left = (this.position.x - this.size / 2) + 'px';
  this.elm.style.top = (this.position.y - this.size / 2) + 'px';
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
    this.parent.spawn(1);
    this.parent.kill(this);
  }
};

module.exports = Bug;
