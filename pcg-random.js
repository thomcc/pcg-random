// Copyright 2014 Thom Chiovoloni, released under the MIT license.

/// A random number generator based on the basic implementation of the PCG algorithm,
/// as described here: http://www.pcg-random.org/
var PcgRandom = (function() {
	'use strict';

	var defaultIncHi = 0x14057b7e;
	var defaultIncLo = 0xf767814f;

	/// Construct a random number generator.
	function PcgRandom(seedHi, seedLo, incHi, incLo) {
		this.setSeed(seedHi, seedLo, incHi, incLo)
	}

	/// Set the seed and incrementer.
	PcgRandom.prototype.setSeed = function(seedHi, seedLo, incHi, incLo) {
		if (seedLo == null && seedHi == null) {
			seedLo = (Math.random() * 0xffffffff) >>> 0;
			seedHi = 0;
		}
		else if (seedLo == null) {
			seedLo = seedHi;
			seedHi = 0;
		}
		if (incLo == null && incHi == null) {
			incLo = this.state_ ? this.state_[3] : defaultIncLo;
			incHi = this.state_ ? this.state_[2] : defaultIncHi;
		}
		else if (incLo == null) {
			incLo = incHi;
			incHi = 0;
		}

		this.state_ = new Int32Array([ 0, 0, incHi >>> 0, (incLo|1) >>> 0 ]);
		this.next_();
		add64_(this.state_, this.state_[0], this.state_[1], seedHi>>>0, seedLo>>>0);
		this.next_();
		return this;
	};

	/// Return a copy of the internal state of this random number generator as a JavaScript Array.
	PcgRandom.prototype.getState = function() {
		return [this.state_[0], this.state_[1], this.state_[2], this.state_[3]];
	};

	/// Set the state of the random number generator.
	PcgRandom.prototype.setState = function(state) {
		this.state_[0] = state[0];
		this.state_[1] = state[1];
		this.state_[2] = state[2];
		this.state_[3] = state[3]|1;
	};

	// shim for Math.imul.
	var imul = Math.imul;
	if (!imul) {
		imul = function(a, b) {
			var ah = (a >>> 16) & 0xffff, al = a & 0xffff;
			var bh = (b >>> 16) & 0xffff, bl = b & 0xffff;
			return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0) | 0);
		};
	}

	// multiply two 64 bit numbers (given in parts), and store the result in `out`.
	function mul64_(out, aHi, aLo, bHi, bLo) {
		var c1 = (aLo >>> 16) * (bLo & 0xffff) >>> 0;
		var c0 = (aLo & 0xffff) * (bLo >>> 16) >>> 0;

		var lo = ((aLo & 0xffff) * (bLo & 0xffff)) >>> 0;
		var hi = ((aLo >>> 16) * (bLo >>> 16)) + ((c0 >>> 16) + (c1 >>> 16)) >>> 0;

		c0 = (c0 << 16) >>> 0;
		lo = (lo + c0) >>> 0;
		if ((lo >>> 0) < (c0 >>> 0)) {
			hi = (hi + 1) >>> 0;
		}

		c1 = (c1 << 16) >>> 0;
		lo = (lo + c1) >>> 0;
		if ((lo >>> 0) < (c1 >>> 0)) {
			hi = (hi + 1) >>> 0;
		}

		hi = (hi + imul(aLo, bHi)) >>> 0;
		hi = (hi + imul(aHi, bLo)) >>> 0;

		out[0] = hi;
		out[1] = lo;
	}

	// add two 64 bit numbers (given in parts), and store the result in `out`.
	function add64_(out, aHi, aLo, bHi, bLo) {
		var hi = (aHi + bHi) >>> 0;
		var lo = (aLo + bLo) >>> 0;
		if ((lo >>> 0) < (aLo >>> 0)) {
			hi = (hi + 1) | 0;
		}
		out[0] = hi;
		out[1] = lo;
	}

	var MUL_HI = 0x5851f42d >>> 0;
	var MUL_LO = 0x4c957f2d >>> 0;

	/// Generate a random 32 bit integer. This uses the PCG algorithm, described
	/// here: http://www.pcg-random.org/
	PcgRandom.prototype.next_ = function() {
		// save current state (what we'll use for this number)
		var oldHi = this.state_[0] >>> 0;
		var oldLo = this.state_[1] >>> 0;

		// churn LCG.
		mul64_(this.state_, oldHi, oldLo, MUL_HI, MUL_LO);
		add64_(this.state_, this.state_[0], this.state_[1], this.state_[2], this.state_[3]);

		// get least sig. 32 bits of ((oldstate >> 18) ^ oldstate) >> 27
		var xsHi = oldHi >>> 18;
		var xsLo = ((oldLo >>> 18) | (oldHi << 14)) >>> 0;
		xsHi = (xsHi ^ oldHi) >>> 0;
		xsLo = (xsLo ^ oldLo) >>> 0;
		var xorshifted = ((xsLo >>> 27) | (xsHi << 5)) >>> 0;
		// rotate xorshifted right a random amount, based on the most sig. 5 bits
		// bits of the old state.
		var rot = oldHi >>> 27;
		var rot2 = ((-rot >>> 0) & 31) >>> 0;
		return ((xorshifted >>> rot) | (xorshifted << rot2)) >>> 0;
	};

	/// Get a uniformly distributed 32 bit integer between [0, max).
	PcgRandom.prototype.integer = function(max) {
		if (!max) {
			return this.next_();
		}
		max = max >>> 0;
		if ((max & (max - 1)) === 0) {
			return this.next_() & (max - 1); // fast path for power of 2
		}

		var num = 0;
		var skew = ((-max >>> 0) % max) >>> 0;
		for (num = this.next_(); num < skew; num = this.next_()) {
			// this loop will rarely execute more than twice,
			// and is intentionally empty
		}
		return num % max;
	};

	var BIT_53 = 9007199254740992.0;
	var BIT_27 = 134217728.0;

	/// Get a uniformly distributed IEEE-754 double between 0.0 and 1.0, with
	/// 53 bits of precision (every bit of the mantissa is randomized).
	PcgRandom.prototype.number = function() {
		var hi = (this.next_() & 0x03ffffff) * 1.0;
		var lo = (this.next_() & 0x07ffffff) * 1.0;
		return ((hi * BIT_27) + lo) / BIT_53;
	};

	return PcgRandom;
}());

if (typeof module !== 'undefined' && module.exports) {
	module.exports = PcgRandom;
}

