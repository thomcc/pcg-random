# PcgRandom: A RNG for JavaScript based on the PCG algorithm.

For information on the algorithm, see [here](http://www.pcg-random.org/).

This is not a cryptographically secure random number generator. Do not use this generator in cryptographically sensitive applications.

## Documentation

This library is usable as a common.js module (in something like node or browserify), or directly in the browser. In the browser, it adds a global `PcgRandom` identifier to window. When used as a common.js module, it simply exports `PcgRandom`.

### `new PcgRandom(...)`

Construct a random number generator that uses the PCG32 algorithm.

#### Overloads

The constructor has several overloads, taking between 0 and 4 arguments.

- `new PcgRandom()`: Produce a `PcgRandom` with a random seed, and the default increment value.

- `new PcgRandom(seedLo32: number, seedHi32: number = 0)`: Produce a PcgRandom that uses `seedHi32` and `seedLo32` as the 2 parts of the 64 bit seed, and uses the default increment value.

- `new PcgRandom(seedLo32: number, seedHi32: number, incLo32: number, incHi32: number)` produces a PcgRandom that uses the provided seed and increment (where `seedLo32` and `seedHi32` are combined to produce a 64 bit seed, and `incLo32` and `incHi32` are combined to produce a 64 bit increment value).

- `new PcgRandom(seed: bigint, inc?: bigint)`: If `bigint`s are supported, you can provide the seed and increment value as `bigint`s. (Note that `bigint` support is not at all required to use this library).

- `new PcgRandom(stateArray: [number, number, number, number])`: Construct a `PcgRandom` using a state array (which should have been returned by `getState`).

#### Usage Example

```javascript
window.random = new PcgRandom(Date.now());
// initialize later using setSeed or setState, or leave with the seed based on the current time.
```

### `PcgRandom.prototype.setSeed(...)`

Set the seed and optionally the increment value (this value controls how the RNG evolves, but the default is good enough for essentially all cases).

The arguments to this method are the same as for the constructor, with the only difference that if no value is provided for the incrementer, it remains the same as it did prior to calling `PcgRandom.prototype.setSeed` (instead of reverting to the default incrementer value).

#### Overloads

`setSeed` accepts several overloads. These are essentially equivalent to the overloads of the constructor (the main exception being that in cases where `new PcgRandom(...)` will use the default increment value, `setSeed` will leave the already-configured increment value in place).

- `setSeed()`: Randomize the seed.

- `setSeed(seedLo32: number, seedHi32: number = 0)`: Set 64 bit seed to each pair of 32 bit values (in parts). Leaves the increment value in place.

- `setSeed(seedLo32:number, seedHi32:number, incLo32:number, incHi32:number)`: Set 64 bit seed and increment value to each pair of 32 bit values (in parts).

- `setSeed(seed: bigint, inc?: bigint)`: If `bigint`s are supported, you can provide the seed and (optionally) increment value as `bigint`s. If `inc` is not provided, the RNG's increment value will be unchanged.

- `setSeed(stateArray: [number, number, number, number])`: Initialize with a state array, equivalent to `setState`. This exists mostly so that the constructor can use `setSeed` for everything.

#### Usage Example

```javascript
var random = new PcgRandom(5000);
var n = random.integer(40);
// ... later
random.setSeed(5000); // revert seed so that we'll get the same sequence.
console.assert(n === random.integer(40));
```

### `PcgRandom.prototype.getState()`, `PcgRandom.prototype.setState(state)`

These are provided so that you can save your random number generator's state when your program is not running, and reload it later.

- `getState(): [number, number, number, number]` takes no arguments, and returns a copy of the internal state of this random number generator as an Array.

- `setState(state: [number, number, number, number])` takes a single argument, which is an array that should be returned by `getState`.

#### Usage Example

```javascript
class GameState {
    constructor() {
    	this.rng = new PcgRandom();
	    // ...
    }
    // When saving...
    toJSON() {
        return {
            rngState: this.rng.getState();
            // ...
        };
    }
    // When loading...
    fromJSON(json) {
    	this.rng.setState(json.rngState);
        // ...
    }
}
```

The state array can also be passed to `new PcgRandom(...)`, so you can clone an RNG by performing

```javascript
var rng = new PcgRandom();
var rngClone = new PcgRandom(rng.getState());
```

### `PcgRandom.prototype.integer(max?: number): number`

Get a uniformly distributed 32 bit integer between 0 (inclusive) and a specified value (exclusive).

If the maximum value isn't specified, the function will return a uniformly distributed 32 bit integer (equivalent to `PcgRandom.prototype.next32()`).

#### Usage Example

```javascript
var random = new PcgRandom();
var someInts = new Array(50);
for (var i = 0; i < someInts.length; ++i) {
	someInts[i] = random.integer(40);
}
```

### `PcgRandom.prototype.number(): number`

Get a uniformly distributed IEEE-754 binary64 between 0.0 and 1.0. This is essentially equivalent to `Math.random()`.

#### Usage Example

```javascript
var random = new PcgRandom();
// Force everybody to use my RNG, even if they call `Math.random()`.
// (Caveat: This may not be a good idea)
Math.random = function() {
    return random.number();
};
```

### `PcgRandom.prototype.next32(): number`

Generate a random 32 bit integer between `[0, 0xffff_ffff]`, inclusive. Generally, `PcgRandom.prototype.integer` should be preferred.

#### Caveats

You should not use this with the `%` operator, as it will introduce bias, instead, use the `integer` method. That is:

```javascript
var rng = new PcgRandom();
// BAD (biased towards low numbers):
var zeroToNBad = rng.next32() % n;
// GOOD (unbiased):
var zeroToNGood = rng.integer(n);
```

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
