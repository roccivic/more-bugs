'use strict';

module.exports = {
	/*
	 * Used to track bugs uniquely.
	 * Incremented by 1 every time a bug  is created.
	 */
	ID: 0,
	/*
	 * How fast the bugs move
	 */
	SPEED: 5,
	/*
	 * How many bugs to start with
	 */
	NUM_BUGS: 2,
	/*
	 * How many bugs there should be at most
	 */
	MAX_BUGS: 50,
	/*
     * How often the frames are processed in milliseconds
	 */
	FRAME_INTERVAL: 15,
	/*
	 * The bugs have 2 states: moving and resting.
	 * TIME_ON is the amount of time in milliseconds
	 * that the bug will spend moving.
	 */
	TIME_ON: 1000,
	/*
	 * The bugs have 2 states: moving and resting.
	 * TIME_OFF is the amount of time in milliseconds
	 * that the bug will spend resting.
	 */
	TIME_OFF: 2000,
	/*
	 * The minimum size for a bug in pixels.
	 * The bugs are square for collision detection purposes.
	 */
	MIN_SIZE: 20,
	/*
	 * The maximum size for a bug in pixels.
	 * The bugs are square for collision detection purposes.
	 */
	MAX_SIZE: 60
};