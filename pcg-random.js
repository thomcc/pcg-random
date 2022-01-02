// Copyright 2014-2022 Thom Chiovoloni, released under the MIT license.

/// A random number generator based on the implementation of the PCG algorithm,
/// as described here: <http://www.pcg-random.org>.
///
/// Note that this is not a cryptographically secure random number generator. Do
/// not use this generator in cryptographically sensitive applications.
var PcgRandom = (function() {
	'use strict';

	/**
	 * Construct a random number generator that uses the PCG32 algorithm.
	 *
	 * ## Overloads
	 *
	 * This conceptually has several overloads. They are similar to the
	 * overloads of {@linkcode PcgRandom#setSeed}, with two exceptions.
	 *
	 * - `new PcgRandom()` produces a `PcgRandom` with a random seed, and the
	 *   default incrementor value.
	 *
	 * - `new PcgRandom(seedLo32: number, seedHi32: number = 0)` produces a
	 *   PcgRandom that uses `seedHi32` and `seedLo32` as the 2 parts of the 64
	 *   bit seed, and uses the default incrementor value.
	 *
	 * - `new PcgRandom(seedLo32, seedLo32, incLo32)` produces a PcgRandom that
	 *   uses `seedHi32` and `seedLo32` as the combined 64 bit seed, and
	 *   `incLo32` as the incrementor.
	 *
	 * - `new PcgRandom(seedHi32, seedLow32, incHi32, incLow32)` produces a
	 *   PcgRandom that uses `seedHi32` and `seedLo32` as the combined 64 bit
	 *   seed.
	 *
	 * ## Caveats:
	 *
	 * - It's recommended that you provide all 64 bits of the incrementor, if
	 *   you're not going to use a default one.
	 *
	 * - The least significant bit of the incrementor (e.g. `incLo32`) is
	 *   ignored, and replaced by `1`.
	 */
	function PcgRandom() {
		this._state = new Uint32Array(4);
		this._state[2] = PcgRandom.DEFAULT_INC_LO | 1;
		this._state[3] = PcgRandom.DEFAULT_INC_HI;
		this.setSeed.apply(this, arguments);
	}

	/**
	 * The lower (least significant) 32 bits of the default value of the
	 * incrementor.
	 *
	 * That is, this is the default value used for the `incLo` parameter of the
	 * {@linkcode PcgRandom} constructor and {@linkcode PcgRandom#setSeed}.
	 *
	 * @constant
	 * @default
	 */
	PcgRandom.DEFAULT_INC_LO = 0xf767814f;

	/**
	 * The upper (most significant) 32 bits of the default value of the
	 * incrementor.
	 *
	 * That is, this is the default value used for the `incHi` parameter of the
	 * {@linkcode PcgRandom} constructor and {@linkcode PcgRandom#setSeed}.
	 *
	 * @constant
	 * @default
	 */
	PcgRandom.DEFAULT_INC_HI = 0x14057b7e;

	var mathRandom = Math.random;

	/**
	 * Set the seed and optionally the incrementor value (this value controls
	 * how the RNG evolves, but the default is good enough for essentially all
	 * cases).
	 *
	 * Accepts several overloads:
	 *
	 * - `setSeed()`: Randomize seed (leaves the the incrementor value in
	 *   place).
	 *
	 * - `setSeed(seedLo32: number, seedHi32: number = 0)`: Set 64 bit seed to
	 *   each pair of 32 bit values (in parts). Leaves the increment value in
	 *   place.
	 *
	 * - `setSeed(seedLo32:number, seedHi32:number, incLo32:number,
	 *   incHi32:number)`: Set 64 bit seed and increment value to each pair of
	 *   32 bit values (in parts).
	 *
	 * - `setSeed(seed: bigint, inc?: bigint)`: If `bigint`s are supported, you
	 *   can provide the seed and (optionally) increment value as `bigint`s.
	 *
	 * - `setSeed(stateArray: number[4])`: Initialize with a state array,
	 *   equivalent to `setState`. (This exists mostly so that the constructor
	 *   can use `setSeed` for everything).
	 */
	PcgRandom.prototype.setSeed = function PcgRandom_setSeed(seedLo, seedHi, incLo, incHi) {
		// Did we get a state array?
		if (seedLo != null && (typeof seedLo === "object")) {
			if (seedLo.length !== 4) {
				throw new TypeError("Expected array of four numbers");
			}
			return this.setState(seedLo);
		}
		var sl32 = 0;
		var sh32 = 0;
		// Did we get BigInts for seed/inc?
		if (typeof seedLo === 'bigint' && typeof BigInt === 'function') {
			if (seedHi != null && typeof seedHi != 'bigint') {
				throw new TypeError('non-bigint used for `inc` when `seed` is provided');
			}
			sl32 = Number(seedLo & bU32Max);
			sh32 = Number((seedLo >> b32) & bU32Max);
			var b32 = BigInt(32);
			var bU32Max = BigInt(0xffffffff);
			if (typeof seedHi === "bigint") {
				// We need to do `(inc << 1) | 1` to match PCG.
				var b1 = BigInt(1);
				var fixinc = (seedHi << b1) | b1;
				this._state[2] = Number(fixinc & bU32Max) >>> 0;
				this._state[3] = Number((fixinc >> b32) & bU32Max) >>> 0;
			}
		}
		// otherwise, args should be numeric or missing.
		else {
			if (seedLo == null && seedHi == null) {
				sl32 = (mathRandom() * 0xffffffff) >>> 0;
				sh32 = (mathRandom() * 0xffffffff) >>> 0;
			} else {
				sl32 = seedLo >>> 0;
				sh32 = seedHi >>> 0;
			}
			// Custom `inc`.
			if (incLo != null) {
				// Conceptually, we need to do `(inc << 1) | 1` to match PCG,
				// but this is a bit more of a pain in the ass when not using
				// bigints, since the most significant bit of `incLo` needs to
				// shift into the least significant bit of `incHi` as part of
				// this process.
				var il32 = incLo >>> 0;
				var ih32 = incHi >>> 0;
				var incLoMsb = (il32 >>> 31) & 1;
				var incLo0 = ((il32 << 1) | 1) >>> 0
				var incHi0 = (((ih32 << 1) >>> 0) | incLoMsb) >>> 0;
				this._state[2] = incLo0;
				this._state[3] = incHi0;
			}
		}
		this._state[0] = 0;
		this._state[1] = 0;
		this.next32();
		add64_(this._state[0], this._state[1], sl32 >>> 0, sh32 >>> 0, this._state);
		this.next32();
		return this;
	};

	/**
	 * Return a copy of the internal state of this random number generator as a
	 * JavaScript Array.
	 */
	PcgRandom.prototype.getState = function() {
		return [this._state[0], this._state[1], this._state[2], this._state[3]];
	};

	/**
	 * Set the state of the random number generator to an array (which should be
	 * equivalent to one returned from `getState`)
	 */
	PcgRandom.prototype.setState = function(state) {
		this._state[0] = state[0];
		this._state[1] = state[1];
		this._state[2] = state[2] | 1;
		this._state[3] = state[3];
	};

	var MUL_HI = 0x5851f42d;
	var MUL_LO = 0x4c957f2d;

	// shim for Math.imul.
	var imul = Math.imul;
	if (!imul) {
		imul = function(a, b) {
			var ah = (a >>> 16) & 0xffff, al = a & 0xffff;
			var bh = (b >>> 16) & 0xffff, bl = b & 0xffff;
			return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0) | 0);
		};
	}

	// add two 64 bit numbers (given in parts), and store the result in `out`.
	function add64_(aLo, aHi, bLo, bHi, out) {
		var aL = aLo >>> 0, aH = aHi >>> 0;
		var bL = bLo >>> 0, bH = bHi >>> 0;
		var aHpbH = (aH + bH) >>> 0;
		var lo = (aL + bL) >>> 0;
		var carry = Number(lo < aL) >>> 0;
		var hi = (aHpbH + carry) >>> 0;
		out[0] = lo;
		out[1] = hi;
	}

	// multiply two 64 bit numbers (given in parts), and store the result in
	// `out`.
	function mul64_(aLo, aHi, bLo, bHi, out) {
		var aL = aLo >>> 0, aH = aHi >>> 0;
		var bL = bLo >>> 0, bH = bHi >>> 0;

		var aLH = (aL >>> 16) & 0xffff, aLL = aL & 0xffff;
		var bLH = (bL >>> 16) & 0xffff, bLL = bL & 0xffff;

		// no need for imul, these are 16 bits so it can't overflow
		var aLHxbLL = (aLH * bLL) >>> 0, aLLxbLH = (aLL * bLH) >>> 0;
		var aLHxbLH = (aLH * bLH) >>> 0, aLLxbLL = (aLL * bLL) >>> 0;

		var aLHxbLL0 = aLHxbLL >>> 16, aLHxbLL1 = (aLHxbLL << 16) >>> 0;
		var aLLxbLH0 = aLLxbLH >>> 16, aLLxbLH1 = (aLLxbLH << 16) >>> 0;

		var l0 = (aLHxbLL1 + aLLxbLH1) >>> 0;
		var c0 = Number((l0 >>> 0) < (aLHxbLL1 >>> 0)) | 0;
		var h0 = (((aLHxbLL0 + aLLxbLH0) >>> 0) + c0) >>> 0;

		var aLxbH = imul(aL, bH) >>> 0;
		var aHxbL = imul(aH, bL) >>> 0;

		var resLo = (l0 + aLLxbLL) >>> 0;
		var c1 = Number((resLo >>> 0) < (aLLxbLL >>> 0)) | 0;
		var h1 = (((aLHxbLH + h0) >>> 0) + c1) >>> 0;

		var resHi = (((aLxbH + aHxbL) >>> 0) + h1) >>> 0;

		out[0] = resLo;
		out[1] = resHi;
	}

	/**
	 * Generate a random 32 bit integer between `[0, 0xffff_ffff]`, inclusive.
	 *
	 * You should not use this with the `%` operator, as it will introduce
	 * bias, instead, use the `integer` method. That is:
	 *
	 * ```js
	 * let rng = new PcgRandom();
	 *
	 * // BAD (biased towards low numbers):
	 * let zero_to_n_bad = rng.next32() % n;
	 *
	 * // GOOD (unbiased):
	 * let zero_to_n_good = rng.integer(n);
	 * ```
	 */
	PcgRandom.prototype.next32 = function() {
		var state = this._state;
		// save current state (what we'll use for this number)
		var oldLo = state[0] >>> 0;
		var oldHi = state[1] >>> 0;

		// churn LCG.
		mul64_(oldLo, oldHi, MUL_LO, MUL_HI, state);
		add64_(state[0], state[1], state[2], state[3], state);

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

	/**
	 * Get a uniformly distributed 32 bit integer between `[0, max)`. That is:
	 * including zero, not including `max`.
	 */
	PcgRandom.prototype.integer = function(max) {
		if (!max) {
			return this.next32();
		}
		var umax = umax >>> 0;
		if ((umax & (umax - 1)) === 0) {
			// fast path for power of 2.
			return this.next32() & (umax - 1);
		}
		var num = 0;
		var skew = ((-umax >>> 0) % umax) >>> 0;
		for (num = this.next32(); num < skew; num = this.next32()) {
			// this loop will rarely execute more than twice,
			// and is intentionally empty
		}
		return num % max;
	};

	var BIT_53 = 9007199254740992.0;
	var BIT_27 = 134217728.0;

	/**
	 * Get a uniformly distributed IEEE-754 double between 0.0 and 1.0.
	 *
	 * That is, `some_pcg_random.number()` is (essentially) equivalent to
	 * `Math.random()`.
	 */
	PcgRandom.prototype.number = function() {
		var hi = (this.next32() & 0x03ffffff) * 1.0;
		var lo = (this.next32() & 0x07ffffff) * 1.0;
		return ((hi * BIT_27) + lo) / BIT_53;
	};

	return PcgRandom;
}());

if (typeof module !== 'undefined' && module.exports) {
	module.exports = PcgRandom;
}
