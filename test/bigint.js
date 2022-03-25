var test = require('tape');
var PcgRandom = require('../pcg-random.js');

if (typeof(BigInt) != 'undefined') {
    test('BigInt seeding', function(t) {
        var pcg1 = new PcgRandom(BigInt('0x2210ca8399dc2e37'), BigInt('0x14057b7ef767814f'));
        var pcg2 = new PcgRandom(0x99dc2e37, 0x2210ca83, 0xf767814f, 0x14057b7e);
        var state1 = pcg1.getState();
        var state2 = pcg2.getState();
        t.deepEqual(state1.slice(0, 2), state2.slice(0, 2), 'Initial pcg state');
        t.deepEqual(state1.slice(2, 4), state2.slice(2, 4), 'Initial pcg increment');
        t.end();
    });
}
