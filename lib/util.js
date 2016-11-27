'use strict';

module.exports = {
  randomInt: function(min, max) {
    return Math.round(
      Math.random() * (max - min) + min
    );
  },
  randomColor: function() {
    var r = this.randomInt(0, 255);
    var g = this.randomInt(0, 255);
    var b = this.randomInt(0, 255);
    return 'rgb('+r+','+g+','+b+')';
  }
};