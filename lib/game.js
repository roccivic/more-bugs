'use strict';

var cookies = require('js-cookie');
var settings = require('./settings');
var Bugs = require('./bugs');

function Game() {
  this.addCss();
  this.addButton();
  this.bugs = new Bugs()
  .spawn(settings.NUM_BUGS)
  .move();
}

Game.prototype.addButton = function() {
  var self = this;
  self.elm = document.createElement("no-more-bugs");
  self.elm.innerHTML = '<span class="fa-stack fa-lg"><i class="fa fa-bug fa-stack-1x"></i><i class="fa fa-ban fa-stack-2x"></i></span> No more bugs';
  self.elm.addEventListener('click', function() {
    cookies.set('NO_MORE_BUGS', 1, { expires: 2 });
    self.bugs.killAll();
    self.elm.style.opacity = '0';
    setTimeout(function() {
      document.body.removeChild(self.elm);
    }, 600);
  }, false);
  document.body.appendChild(
    self.elm
  );
};

Game.prototype.addCss = function() {
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
};

Game.prototype.getCss = function() {
  var bug = 'bug{position:fixed;display:block;cursor:pointer;transition:transform 0.3s ease-in-out,opacity 0.3s ease-in-out;}';
  var button = 'no-more-bugs{';
  button += 'position:fixed;display:block;cursor:pointer;padding:0.5em 1em;background:#444;color:white;bottom:0;right:0;';
  button += 'font-size:10px;font-family:helvetica;box-shadow:0 0 10px 1px black;transition:opacity 0.5s ease-in-out;';
  button += '}';
  button += 'no-more-bugs .fa-ban{color:#a00;opacity:0.5}';
  return bug + button;
};

// check cookies
if (!cookies.get('NO_MORE_BUGS')) {
  new Game();
}