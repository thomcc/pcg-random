# PcgRandom: A RNG for JavaScript based on the PCG algorithm.

For information on the algorithm, see [here](http://www.pcg-random.org/).

This implementation is based on the [Minimal C Edition](https://github.com/imneme/pcg-c-basic). Most of the complexity in the code here comes from JavaScript's lack of 64 bit arithmetic support, which is required by the algorithm.

I'm unlikely to do the more complex RNGs in the non-minimal implentations, (or even implement the [pcg32x2 demo](https://github.com/imneme/pcg-c-basic/blob/master/pcg32-demo.c)) for the same reason. 64 bit arithmetic in JavaScript is tedious, and it gets as the bit width increases. Using arbitrary precision numbers might be possible, but is likely to perform significantly worse.

## Documentation

### `new PcgRandom(...)`

PcgRandom's construction takes 4 arguments, all optional.

- `new PcgRandom(seedHi, seedLo, incHi, incLo)`
    + `seedHi`: The high 32 bits of the seed.
    + `seedLo`: The how 32 bits of the seed.
    + `incHi`: The high 32 bits of the incrementer.
    + `incLo`: The how 32 bits of the incrementer.

- `new PcgRandom(seedHi, seedLo, inc)`
    + `seedHi`: The high 32 bits of the seed.
    + `seedLo`: The low 32 bits of the seed.
    + `inc`: The low 32 bits of the incrementer (0 is used for high 32 bits).

- `new PcgRandom(seedHi, seedLo)`
    + `seedHi`: The high 32 bits of the seed.
    + `seedLo`: The low 32 bits of the seed.
    + The default incrementer value of 0x14057b7ef767814f is used.

- `new PcgRandom(seed)`
    - `seed`: The low 32 bits of the seed (0 is used for high 32 bits).
    - The default incrementer value of `0x14057b7ef767814f` is used. (`0x14057b7e` in the high 32 bits, and `0xf767814f` in the lower 32 bits).

- `new PcgRandom()`
    - The low 32 bits of the seed are randomly generated using `Math.random()`.
    - The default incrementer value of `0x14057b7ef767814f` is used. (`0x14057b7e` in the high 32 bits, and `0xf767814f` in the lower 32 bits).

Usage example:

```javascript
window.random = new PcgRandom(Date.now());
// initialize later using setSeed or setState, or leave with the seed based on the current time.
```

### `PcgRandom.prototype.setSeed(...)`

Seed the PcgRandom and optionally change the value of its incrementer.

The arguments to this method are the same as for the constructor, with the only difference that if no value is provided for the incrementer, it remains the same as it did prior to calling `PcgRandom.prototype.setSeed` (instead of reverting to the default incrementer value).

- `somePcgRandom.setSeed(seedHi, seedLo, incHi, incLo)`
    + `seedHi`: The high 32 bits of the seed.
    + `seedLo`: The how 32 bits of the seed.
    + `incHi`: The high 32 bits of the incrementer.
    + `incLo`: The how 32 bits of the incrementer.

- `somePcgRandom.setSeed(seedHi, seedLo, inc)`
    + `seedHi`: The high 32 bits of the seed.
    + `seedLo`: The low 32 bits of the seed.
    + `inc`: The low 32 bits of the incrementer (0 is used for high 32 bits).

- `somePcgRandom.setSeed(seedHi, seedLo)`
    + `seedHi`: The high 32 bits of the seed.
    + `seedLo`: The low 32 bits of the seed.

- `somePcgRandom.setSeed(seed)`
    - `seed`: The low 32 bits of the seed (0 is used for high 32 bits).
    - The incrementer is left unchanged.

- `somePcgRandom.setSeed()`
    - The low 32 bits of the seed are randomly generated using `Math.random()`.
    - The incrementer is left unchanged.

Usage example:

```javascript
var random = new PcgRandom(5000);
var n = random.integer(40);
// ... later
random.setSeed(5000); // revert seed so that we'll get the same sequence.
console.assert(n == random.integer(40));
```

### `PcgRandom.prototype.getState()`, `PcgRandom.prototype.setState(state)`

`getState` returns a copy of the internal state of this random number generator as a JavaScript Array. It takes no arguments.

`setState` takes a single argument, 

This is provided so that you can save your random number generator's state when your program is not running.

Takes no arguments.

Usage example:

```javascript
function GameState() {
	this.rng = new PcgRandom();
	// ...
}

// used to save
GameState.prototype.toJSON = function() {
	return {
		rngState: this.rng.getState();
		// ...
	};
};

// used to load from a save
GameState.prototype.fromJSON = function(json) {
	this.rng.setState(json.rngState);
	// ...
};
```

### `PcgRandom.prototype.integer([max])`

Get a uniformly distributed 32 bit integer between 0 (inclusive) and a specified value (exclusive).

If the maximum value isn't specified, the function will return a uniformly distributed 32 bit integer, with no maximum.

Usage example:

```javascript
var random = new PcgRandom();

var someInts = new Array(50);
for (var i = 0; i < someInts.length; ++i) {
	someInts[i] = random.integer(40);
}
```


### `PcgRandom.prototype.number()`

Get a uniformly distributed IEEE-754 double between 0.0 and 1.0, with 53 bits of precision (every bit of the mantissa is randomized)

Usage example:

```javascript

var random = new PcgRandom();

// force everybody to use my RNG, even if they call Math.random()
Math.random = function() {
	return random.number();
};
```

## Caveats

It's worth noting that this isn't a cryptographically secure PRNG. Even if the PCG random is proven to be cryptographically secure, I wouldn't be comfortable with anybody using this code in crypto until someone smarter than me has looked at it.

## License
The MIT License (MIT)

Copyright (c) 2014 Thom Chiovoloni

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
