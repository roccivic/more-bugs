'use strict';

function Square(point, size) {
	this.x = point.x - size / 2;
	this.y = point.y - size / 2;
	this.width = size;
	this.height = size;
}

Square.prototype.hasCollision = function(other) {
	if (this.x < other.x + other.width &&
	   this.x + this.width > other.x &&
	   this.y < other.y + other.height &&
	   this.height + this.y > other.y
	) {
	   	return true;
	}
};

module.exports = Square;