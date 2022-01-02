var test = require('tape');
var PcgRandom = require('../pcg-random.js');

var fixtures = [{
    name: 'expected values for 32 bit seed (12345), default inc',
    create: function() { return new PcgRandom(12345); },
    initState: [0x99dc2e37, 0x2210ca83, 0xf767814f, 0x14057b7e],
    sequence: [
        { val: 0x5421840f, state: [0x780be9fa, 0xc4ddd47f, 0xf767814f, 0x14057b7e] }, // 0
        { val: 0xbca9019b, state: [0x6114a841, 0xae77e3cc, 0xf767814f, 0x14057b7e] }, // 1
        { val: 0xc8519e77, state: [0x815653bc, 0xd17214fb, 0xf767814f, 0x14057b7e] }, // 2
        { val: 0x9105380b, state: [0x138a7d5b, 0x80bbc105, 0xf767814f, 0x14057b7e] }, // 3
        { val: 0x257c177c, state: [0x14e6af4e, 0x14272fe6, 0xf767814f, 0x14057b7e] }, // 4
        { val: 0xe139577e, state: [0x45520405, 0x121bda54, 0xf767814f, 0x14057b7e] }, // 5
        { val: 0x90def695, state: [0xa9b9b130, 0x84afd581, 0xf767814f, 0x14057b7e] }, // 6
        { val: 0x954b95fe, state: [0x4ce276bf, 0xc76a259b, 0xf767814f, 0x14057b7e] }, // 7
        { val: 0x428838ed, state: [0xa54a21e2, 0x5ff90992, 0xf767814f, 0x14057b7e] }, // 8
        { val: 0xb39fe479, state: [0x9cc89409, 0xb8cd7d34, 0xf767814f, 0x14057b7e] }, // 9
        { val: 0x54c1f033, state: [0xdd56fde4, 0xaa9ffdcb, 0xf767814f, 0x14057b7e] }, // 10
        { val: 0xd76c229f, state: [0x7d5a3e63, 0x35d6d338, 0xf767814f, 0x14057b7e] }, // 11
        { val: 0xe6eb6f26, state: [0x78d695b6, 0xa44fb60f, 0xf767814f, 0x14057b7e] }, // 12
        { val: 0x3e39289f, state: [0xd4531c4d, 0xc33afb7e, 0xf767814f, 0x14057b7e] }, // 13
        { val: 0x59760d67, state: [0xd9deadd8, 0xa5f43a6e, 0xf767814f, 0x14057b7e] }, // 14
        { val: 0x2627abe8, state: [0x0a823847, 0x1f521840, 0xf767814f, 0x14057b7e] }, // 15
        { val: 0x3d487e52, state: [0x3f899eca, 0x9cdedaf2, 0xf767814f, 0x14057b7e] }, // 16
        { val: 0xf716337b, state: [0xcbf0a0d1, 0x941f6d58, 0xf767814f, 0x14057b7e] }, // 17
        { val: 0x42f8a0fa, state: [0xd620750c, 0xa2b95ccf, 0xf767814f, 0x14057b7e] }, // 18
        { val: 0xe8c30572, state: [0x6529086b, 0x183f2e01, 0xf767814f, 0x14057b7e] }, // 19
        { val: 0xa0fca03a, state: [0xc512111e, 0x35e2c91d, 0xf767814f, 0x14057b7e] }, // 20
        { val: 0xbaf16232, state: [0x70886595, 0x8a79455d, 0xf767814f, 0x14057b7e] }, // 21
        { val: 0x7c322796, state: [0xc57f4780, 0xd67be47b, 0xf767814f, 0x14057b7e] }, // 22
        { val: 0xde8f29f3, state: [0x70bf92cf, 0x9fd75a09, 0xf767814f, 0x14057b7e] }, // 23
        { val: 0xf7f29f5d, state: [0xb96400b2, 0x3c9b978f, 0xf767814f, 0x14057b7e] }, // 24
        { val: 0x5726e62a, state: [0x69edee99, 0x1ccfcb6e, 0xf767814f, 0x14057b7e] }, // 25
        { val: 0x733f3176, state: [0xeaa55934, 0xe5d413aa, 0xf767814f, 0x14057b7e] }, // 26
        { val: 0xa855bfdb, state: [0x98fcfb73, 0xd1bca1ce, 0xf767814f, 0x14057b7e] }, // 27
        { val: 0xe4ad0d8d, state: [0xda8cc186, 0x24a25fd0, 0xf767814f, 0x14057b7e] }, // 28
        { val: 0x9944adf0, state: [0xa124ffdd, 0xb621a98f, 0xf767814f, 0x14057b7e] }, // 29
        { val: 0xc203e710, state: [0x2d781e28, 0xa3caef07, 0xf767814f, 0x14057b7e] }, // 30
        { val: 0x8feb2795, state: [0xf9c2a657, 0x91769c35, 0xf767814f, 0x14057b7e] }, // 31
        { val: 0xc342cbb5, state: [0x13c6e79a, 0x663708db, 0xf767814f, 0x14057b7e] }, // 32
        { val: 0xadac6e22, state: [0xa2e59d61, 0xd0e7c669, 0xf767814f, 0x14057b7e] }, // 33
        { val: 0x3f928287, state: [0xe84c4a5c, 0x4017dc4a, 0xf767814f, 0x14057b7e] }, // 34
        { val: 0xe302f989, state: [0x3d40377b, 0x5674fa8e, 0xf767814f, 0x14057b7e] }, // 35
        { val: 0x9833a778, state: [0x65ce46ee, 0x2cf0ca5a, 0xf767814f, 0x14057b7e] }, // 36
        { val: 0x54f0c166, state: [0x22600b25, 0xcdbdb3d8, 0xf767814f, 0x14057b7e] }, // 37
        { val: 0xd80b74db, state: [0x2059d1d0, 0x05cd1041, 0xf767814f, 0x14057b7e] }, // 38
        { val: 0xb9a2264c, state: [0x145792df, 0xce38461f, 0xf767814f, 0x14057b7e] }, // 39
        { val: 0x87591063, state: [0xac73f382, 0x74c46dd2, 0xf767814f, 0x14057b7e] }, // 40
        { val: 0x71da6238, state: [0x2040cd29, 0x1474ceb6, 0xf767814f, 0x14057b7e] }, // 41
        { val: 0xa3a65d58, state: [0x5d6fe884, 0x71965257, 0xf767814f, 0x14057b7e] }, // 42
        { val: 0x1964cb27, state: [0x6d40dc83, 0x82ef9692, 0xf767814f, 0x14057b7e] }, // 43
        { val: 0xc5315df6, state: [0x95724156, 0xe3850ead, 0xf767814f, 0x14057b7e] }, // 44
        { val: 0x0a6c99a7, state: [0x79f4a76d, 0x8fa88829, 0xf767814f, 0x14057b7e] }, // 45
        { val: 0xbc35fa8a, state: [0x94e90278, 0x919ced8c, 0xf767814f, 0x14057b7e] }, // 46
        { val: 0x4f5d4ce6, state: [0xcc6e7867, 0xd0c3a286, 0xf767814f, 0x14057b7e] }, // 47
        { val: 0x1cb5b106, state: [0x5c80c46a, 0x2bf40ac1, 0xf767814f, 0x14057b7e] }, // 48
        { val: 0x5bf4003c, state: [0xe52c9df1, 0x1ca3ec43, 0xf767814f, 0x14057b7e] }, // 49
        { val: 0x728fadac, state: [0xdbded3ac, 0xbb3bcb57, 0xf767814f, 0x14057b7e] }, // 50
        { val: 0xf9664ace, state: [0x6bb10a8b, 0x382914c8, 0xf767814f, 0x14057b7e] }, // 51
        { val: 0x8a0a46b0, state: [0x20a850be, 0xb75323c2, 0xf767814f, 0x14057b7e] }, // 52
        { val: 0x870b77a9, state: [0x9ba1f4b5, 0x04b85627, 0xf767814f, 0x14057b7e] }, // 53
        { val: 0x970ae131, state: [0xd49e5020, 0xa0657864, 0xf767814f, 0x14057b7e] }, // 54
        { val: 0xa0fb10ca, state: [0x039b76ef, 0x3cb70041, 0xf767814f, 0x14057b7e] }, // 55
        { val: 0x312dc3db, state: [0xe6d6fa52, 0x9588bc84, 0xf767814f, 0x14057b7e] }, // 56
        { val: 0xcf366c44, state: [0x3b1a2fb9, 0x3ec8e33a, 0xf767814f, 0x14057b7e] }, // 57
        { val: 0x01b23b22, state: [0x0b5babd4, 0x5b1f33fb, 0xf767814f, 0x14057b7e] }, // 58
        { val: 0xf30c7c94, state: [0x6326e193, 0xf8bf40e4, 0xf767814f, 0x14057b7e] }, // 59
        { val: 0x2fdfb2ec, state: [0x9db41526, 0xa58b3444, 0xf767814f, 0x14057b7e] }, // 60
        { val: 0x3a4cab16, state: [0x9dab12fd, 0x2502e590, 0xf767814f, 0x14057b7e] }, // 61
        { val: 0x4a05d9a0, state: [0xb6265ac8, 0x509d9cd0, 0xf767814f, 0x14057b7e] }, // 62
        { val: 0xbe84ec47, state: [0x3996ae77, 0xb89f92fa, 0xf767814f, 0x14057b7e] }, // 63
        { val: 0xef377627, state: [0xb6b4353a, 0x6025cb76, 0xf767814f, 0x14057b7e] }, // 64
        { val: 0xff804ba6, state: [0xae3ea281, 0x0cb29de2, 0xf767814f, 0x14057b7e] }, // 65
        { val: 0xcb29ece0, state: [0x8c1d10fc, 0x331f3828, 0xf767814f, 0x14057b7e] }, // 66
        { val: 0xa18f9a77, state: [0xb69c819b, 0x9b98d263, 0xf767814f, 0x14057b7e] }, // 67
        { val: 0xd2160e63, state: [0x286d2e8e, 0xdb97326e, 0xf767814f, 0x14057b7e] }, // 68
        { val: 0x5c122f8e, state: [0x7d572245, 0x743a773e, 0xf767814f, 0x14057b7e] }, // 69
        { val: 0x18721d35, state: [0xa7e1c270, 0x1cd90dad, 0xf767814f, 0x14057b7e] }, // 70
        { val: 0x93642a6f, state: [0xe4bc3eff, 0x0d51b31d, 0xf767814f, 0x14057b7e] }, // 71
        { val: 0xd51b0498, state: [0xee2a1522, 0x4b5cef50, 0xf767814f, 0x14057b7e] }, // 72
        { val: 0x7d35cfd8, state: [0x1a131649, 0x182fee9e, 0xf767814f, 0x14057b7e] }, // 73
        { val: 0x80bfa257, state: [0xa94da324, 0xd94732c7, 0xf767814f, 0x14057b7e] }, // 74
        { val: 0x1c125985, state: [0xe1f00aa3, 0x2cbb0987, 0xf767814f, 0x14057b7e] }, // 75
        { val: 0x24bb02a9, state: [0x58bf3cf6, 0x84b28ffd, 0xf767814f, 0x14057b7e] }, // 76
        { val: 0xda3f9655, state: [0xf371428d, 0xbb3316b3, 0xf767814f, 0x14057b7e] }, // 77
        { val: 0xce1fcccc, state: [0x8a652718, 0x3c3a265c, 0xf767814f, 0x14057b7e] }, // 78
        { val: 0x810e8a54, state: [0x5a8c4887, 0xabdb761e, 0xf767814f, 0x14057b7e] }, // 79
        { val: 0x5ce883db, state: [0xc49e3a0a, 0xe63f12a9, 0xf767814f, 0x14057b7e] }, // 80
        { val: 0x7e564c0c, state: [0xc5d4ab11, 0x46d820f5, 0xf767814f, 0x14057b7e] }, // 81
        { val: 0x79db0628, state: [0xdb8c024c, 0x57f3c164, 0xf767814f, 0x14057b7e] }, // 82
        { val: 0xc17f9ea4, state: [0xea639cab, 0xdb89b3ab, 0xf767814f, 0x14057b7e] }, // 83
        { val: 0x2615260e, state: [0x8929e05e, 0x16f1de8a, 0xf767814f, 0x14057b7e] }, // 84
        { val: 0xf78ed9b7, state: [0x58c893d5, 0x153ea066, 0xf767814f, 0x14057b7e] }, // 85
        { val: 0xa9f5294f, state: [0x5af928c0, 0x6615ac9a, 0xf767814f, 0x14057b7e] }, // 86
        { val: 0x3e6c2b6a, state: [0x482aeb0f, 0x6cb17aa0, 0xf767814f, 0x14057b7e] }, // 87
        { val: 0x8c14b161, state: [0x354a43f2, 0x4f18e9df, 0xf767814f, 0x14057b7e] }, // 88
        { val: 0x90f18fa1, state: [0x910480d9, 0x908afd1a, 0xf767814f, 0x14057b7e] }, // 89
        { val: 0xc9c14456, state: [0x1b6ace74, 0xc8ca5f20, 0xf767814f, 0x14057b7e] }, // 90
        { val: 0xa6d1288c, state: [0x5f1d57b3, 0x7bdda696, 0xf767814f, 0x14057b7e] }, // 91
        { val: 0x184cf76e, state: [0x6d40b8c6, 0x60c475b1, 0xf767814f, 0x14057b7e] }, // 92
        { val: 0x00e188db, state: [0x9ab0361d, 0x24c83136, 0xf767814f, 0x14057b7e] }, // 93
        { val: 0x29907009, state: [0xae1a6768, 0xf20eb88e, 0xf767814f, 0x14057b7e] }, // 94
        { val: 0x07420681, state: [0xbae04697, 0xf2012e4b, 0xf767814f, 0x14057b7e] }, // 95
        { val: 0x008965f9, state: [0xfdbbd2da, 0x7c3bde8c, 0xf767814f, 0x14057b7e] }, // 96
        { val: 0x60830ef0, state: [0x2fe7b7a1, 0x474cd564, 0xf767814f, 0x14057b7e] }, // 97
        { val: 0xe3e99896, state: [0x03f0a79c, 0x649e198e, 0xf767814f, 0x14057b7e] }, // 98
        { val: 0x53093c01, state: [0xe9a75bbb, 0xf4bb50a9, 0xf767814f, 0x14057b7e] }  // 99
    ]
}, {
    name: 'expected values for 64 bit seed (0xcafebeef_f00babcd), default inc',
    create: function() { return new PcgRandom(0xf00babcd, 0xcafebeef); },
    initState: [0x5b53533b, 0xac1d4b29, 0xf767814f, 0x14057b7e],
    sequence: [
        { val: 0x602e0c1d, state: [0x50ae67ae, 0xfa48f7a6, 0xf767814f, 0x14057b7e] }, // 0
        { val: 0x92324d1a, state: [0xabc50ce5, 0xd0fd53a1, 0xf767814f, 0x14057b7e] }, // 1
        { val: 0xeb3cf7c7, state: [0x67b96090, 0xf78464e6, 0xf767814f, 0x14057b7e] }, // 2
        { val: 0xc22c83bf, state: [0x1db4ea9f, 0x5e6e2654, 0xf767814f, 0x14057b7e] }, // 3
        { val: 0x3e59b8c7, state: [0xb324a042, 0x26e8bceb, 0xf767814f, 0x14057b7e] }, // 4
        { val: 0x3dd16aa3, state: [0x7ec26ae9, 0x1a16d64b, 0xf767814f, 0x14057b7e] }, // 5
        { val: 0x285b433b, state: [0x183ae344, 0xa3b6f881, 0xf767814f, 0x14057b7e] }, // 6
        { val: 0xa0d9476d, state: [0xe7143043, 0x42468de7, 0xf767814f, 0x14057b7e] }, // 7
        { val: 0xc848d3ae, state: [0x94e43a16, 0x55254dc0, 0xf767814f, 0x14057b7e] }, // 8
        { val: 0x4e292ac4, state: [0xb324a12d, 0x9ee24828, 0xf767814f, 0x14057b7e] }, // 9
        { val: 0xbe409b89, state: [0xcbfe2938, 0x36c3b899, 0xf767814f, 0x14057b7e] }, // 10
        { val: 0x9361da94, state: [0x871f8827, 0x4cc308bd, 0xf767814f, 0x14057b7e] }, // 11
        { val: 0xd44c31b8, state: [0x2f30c92a, 0xf8b82779, 0xf767814f, 0x14057b7e] }, // 12
        { val: 0x2e0655c8, state: [0x0438b3b1, 0xfd1de1b5, 0xf767814f, 0x14057b7e] }, // 13
        { val: 0x4777bc9f, state: [0xf888e66c, 0xfd1889de, 0xf767814f, 0x14057b7e] }, // 14
        { val: 0x462da637, state: [0xbea3964b, 0x6226120e, 0xf767814f, 0x14057b7e] }, // 15
        { val: 0x0e744c15, state: [0x5f5f217e, 0xde9565ad, 0xf767814f, 0x14057b7e] }, // 16
        { val: 0x5548201a, state: [0xd313e675, 0x507518be, 0xf767814f, 0x14057b7e] }, // 17
        { val: 0x1c83a865, state: [0xcf540ee0, 0x92c84951, 0xf767814f, 0x14057b7e] }, // 18
        { val: 0x6f1ed643, state: [0x44ef3eaf, 0x7898b272, 0xf767814f, 0x14057b7e] }, // 19
        { val: 0x151a262b, state: [0x35695712, 0xf3888066, 0xf767814f, 0x14057b7e] }, // 20
        { val: 0xc45e4209, state: [0xa297bd79, 0x35429448, 0xf767814f, 0x14057b7e] }, // 21
        { val: 0x02a14c8c, state: [0x067fd694, 0x1761e5c3, 0xf767814f, 0x14057b7e] }, // 22
        { val: 0xfb0f00db, state: [0x5b77a553, 0x23792320, 0xf767814f, 0x14057b7e] }, // 23
        { val: 0x26f257fc, state: [0x43c2bde6, 0x6a98a2de, 0xf767814f, 0x14057b7e] }, // 24
        { val: 0x786a98b8, state: [0x4bb5fcbd, 0xfd223a55, 0xf767814f, 0x14057b7e] }, // 25
        { val: 0x48814771, state: [0xc4c7b188, 0x87c7b639, 0xf767814f, 0x14057b7e] }, // 26
        { val: 0xf905f8f2, state: [0x53bc2e37, 0x13e9d21c, 0xf767814f, 0x14057b7e] }, // 27
        { val: 0x1f4eb731, state: [0x446be9fa, 0xe23b9dee, 0xf767814f, 0x14057b7e] }, // 28
        { val: 0x774ac144, state: [0xedf4a841, 0xedebb789, 0xf767814f, 0x14057b7e] }, // 29
        { val: 0xeb8cf305, state: [0x64b653bc, 0x355ed490, 0xf767814f, 0x14057b7e] }, // 30
        { val: 0xeaaf6ce3, state: [0xab6a7d5b, 0xb16d21dd, 0xf767814f, 0x14057b7e] }, // 31
        { val: 0x86c370b6, state: [0xe746af4e, 0x7fe78eb0, 0xf767814f, 0x14057b7e] }, // 32
        { val: 0x5241f9e4, state: [0xe0320405, 0x4f541438, 0xf767814f, 0x14057b7e] }, // 33
        { val: 0xde75407e, state: [0x0319b130, 0x75b30fe6, 0xf767814f, 0x14057b7e] }, // 34
        { val: 0x4562d989, state: [0xa2c276bf, 0xbbc3b675, 0xf767814f, 0x14057b7e] }, // 35
        { val: 0xe62152f0, state: [0xddaa21e2, 0x7b864bed, 0xf767814f, 0x14057b7e] }, // 36
        { val: 0x4312e195, state: [0x25a89409, 0xc141b815, 0xf767814f, 0x14057b7e] }, // 37
        { val: 0x3108a928, state: [0x0cb6fde4, 0x4cf5e58b, 0xf767814f, 0x14057b7e] }, // 38
        { val: 0x674f5f6b, state: [0x713a3e63, 0xd51f7b34, 0xf767814f, 0x14057b7e] }, // 39
        { val: 0xfa739d68, state: [0x773695b6, 0x9fd6acb5, 0xf767814f, 0x14057b7e] }, // 40
        { val: 0x2d037f5a, state: [0x2b331c4d, 0xfb523dbe, 0xf767814f, 0x14057b7e] }, // 41
        { val: 0xd480daa8, state: [0x3f3eadd8, 0x2df05c0a, 0xf767814f, 0x14057b7e] }, // 42
        { val: 0x2df05776, state: [0x7c623847, 0x1eba98bb, 0xf767814f, 0x14057b7e] }, // 43
        { val: 0x7aea7c57, state: [0x63e99eca, 0x4c027583, 0xf767814f, 0x14057b7e] }, // 44
        { val: 0x3fc02668, state: [0xd0d0a0d1, 0xf93645c7, 0xf767814f, 0x14057b7e] }, // 45
        { val: 0x4d9ee290, state: [0xd180750c, 0x068cd21e, 0xf767814f, 0x14057b7e] }, // 46
        { val: 0xd19a77bc, state: [0x3509086b, 0xf515ca78, 0xf767814f, 0x14057b7e] }, // 47
        { val: 0x8afb9ea2, state: [0x6f72111e, 0xe078b880, 0xf767814f, 0x14057b7e] }, // 48
        { val: 0xf1013c80, state: [0x03686595, 0xfa77f61b, 0xf767814f, 0x14057b7e] }, // 49
        { val: 0x9df221be, state: [0xb6df4780, 0x573ffe0b, 0xf767814f, 0x14057b7e] }, // 50
        { val: 0x2279ff5e, state: [0x7e9f92cf, 0x154e3df5, 0xf767814f, 0x14057b7e] }, // 51
        { val: 0xaa71c537, state: [0x49c400b2, 0x8a765650, 0xf767814f, 0x14057b7e] }, // 52
        { val: 0x4cdda767, state: [0x6acdee99, 0x62b562c7, 0xf767814f, 0x14057b7e] }, // 53
        { val: 0xd4656af4, state: [0x32055934, 0x3fb4d81f, 0xf767814f, 0x14057b7e] }, // 54
        { val: 0x81ed35fc, state: [0xc4dcfb73, 0x0872e487, 0xf767814f, 0x14057b7e] }, // 55
        { val: 0x872e69b7, state: [0xb0ecc186, 0x32f30081, 0xf767814f, 0x14057b7e] }, // 56
        { val: 0xb979861e, state: [0xf004ffdd, 0x6f76e8de, 0xf767814f, 0x14057b7e] }, // 57
        { val: 0x034f76f3, state: [0x2ad81e28, 0x4422d079, 0xf767814f, 0x14057b7e] }, // 58
        { val: 0x3384582e, state: [0x23a2a657, 0x7231c2d2, 0xf767814f, 0x14057b7e] }, // 59
        { val: 0x2f2918ef, state: [0x9026e79a, 0x70f72a74, 0xf767814f, 0x14057b7e] }, // 60
        { val: 0x24ac7b9b, state: [0x1fc59d61, 0x817ab6f8, 0xf767814f, 0x14057b7e] }, // 61
        { val: 0xd4d62f52, state: [0xfbac4a5c, 0xf2a403a9, 0xf767814f, 0x14057b7e] }, // 62
        { val: 0x521f807d, state: [0x4520377b, 0x4c96d7c1, 0xf767814f, 0x14057b7e] }, // 63
        { val: 0x4f496c4e, state: [0xe82e46ee, 0x050b129a, 0xf767814f, 0x14057b7e] }, // 64
        { val: 0xa1627b05, state: [0xad400b25, 0x7354c9bc, 0xf767814f, 0x14057b7e] }, // 65
        { val: 0xb4cdaa6a, state: [0xa9b9d1d0, 0x95d79eb2, 0xf767814f, 0x14057b7e] }, // 66
        { val: 0xde3a6ebd, state: [0xda3792df, 0x9f7b181a, 0xf767814f, 0x14057b7e] }, // 67
        { val: 0xff107dec, state: [0x94d3f382, 0xa257e99e, 0xf767814f, 0x14057b7e] }, // 68
        { val: 0x8216d4af, state: [0x9920cd29, 0x315679b5, 0xf767814f, 0x14057b7e] }, // 69
        { val: 0x00ab3af0, state: [0xbccfe884, 0x9709f896, 0xf767814f, 0x14057b7e] }, // 70
        { val: 0xeaa6384e, state: [0xd120dc83, 0x4ed042e6, 0xf767814f, 0x14057b7e] }, // 71
        { val: 0x2c6d0515, state: [0x43d24156, 0x98a5d86f, 0xf767814f, 0x14057b7e] }, // 72
        { val: 0xf918c297, state: [0xc0d4a76d, 0xbee21296, 0xf767814f, 0x14057b7e] }, // 73
        { val: 0x8f4b91b8, state: [0x2a490278, 0x626b394b, 0xf767814f, 0x14057b7e] }, // 74
        { val: 0xa3c4d643, state: [0xae4e7867, 0x48bff001, 0xf767814f, 0x14057b7e] }, // 75
        { val: 0xe50bfe22, state: [0x30e0c46a, 0x35b196c9, 0xf767814f, 0x14057b7e] }, // 76
        { val: 0xaad8cdd2, state: [0xda0c9df1, 0x83e887df, 0xf767814f, 0x14057b7e] }, // 77
        { val: 0xe4bf7d14, state: [0x073ed3ac, 0x55558a9d, 0xf767814f, 0x14057b7e] }, // 78
        { val: 0x432aacfe, state: [0xab910a8b, 0x1095c355, 0xf767814f, 0x14057b7e] }, // 79
        { val: 0xc4ae3b86, state: [0x7b0850be, 0xee9292a6, 0xf767814f, 0x14057b7e] }, // 80
        { val: 0x92a902de, state: [0x1e81f4b5, 0xeb7f3701, 0xf767814f, 0x14057b7e] }, // 81
        { val: 0x7f0dded3, state: [0xf5fe5020, 0xcdba92ed, 0xf767814f, 0x14057b7e] }, // 82
        { val: 0xaa18355b, state: [0x817b76ef, 0xf26f9eca, 0xf767814f, 0x14057b7e] }, // 83
        { val: 0x37d128b1, state: [0x2736fa52, 0xd5679382, 0xf767814f, 0x14057b7e] }, // 84
        { val: 0x3d36de2b, state: [0x2bfa2fb9, 0x26ff488e, 0xf767814f, 0x14057b7e] }, // 85
        { val: 0xfdfe8263, state: [0x82bbabd4, 0xe5b15a9b, 0xf767814f, 0x14057b7e] }, // 86
        { val: 0x62c7efab, state: [0xff06e193, 0x704fa131, 0xf767814f, 0x14057b7e] }, // 87
        { val: 0x910827de, state: [0x24141526, 0x4784db9d, 0xf767814f, 0x14057b7e] }, // 88
        { val: 0x82f0994f, state: [0xdc8b12fd, 0x4534f0a9, 0xf767814f, 0x14057b7e] }, // 89
        { val: 0x9ca69c3c, state: [0xe3865ac8, 0x4ea72ed1, 0xf767814f, 0x14057b7e] }, // 90
        { val: 0x82ea73d7, state: [0xd376ae77, 0xedc4bb91, 0xf767814f, 0x14057b7e] }, // 91
        { val: 0xc480e0fd, state: [0xe314353a, 0x551c32d2, 0xf767814f, 0x14057b7e] }, // 92
        { val: 0xaf68e13c, state: [0x1b1ea281, 0x2bfbd6fa, 0xf767814f, 0x14057b7e] }, // 93
        { val: 0xebfbdc04, state: [0xcf7d10fc, 0xd8a5bea9, 0xf767814f, 0x14057b7e] }, // 94
        { val: 0x96220282, state: [0x2e7c819b, 0x72154e69, 0xf767814f, 0x14057b7e] }, // 95
        { val: 0x763d0aa9, state: [0x5acd2e8e, 0xb224fb3c, 0xf767814f, 0x14057b7e] }, // 96
        { val: 0x6bdab112, state: [0xf8372245, 0xf39ce05a, 0xf767814f, 0x14057b7e] }, // 97
        { val: 0xce6e5ee1, state: [0x6141c270, 0x0eb8ad04, 0xf767814f, 0x14057b7e] }, // 98
        { val: 0xeb8aeaa4, state: [0x1a9c3eff, 0x140f2033, 0xf767814f, 0x14057b7e] }, // 99
    ]
},  {
    name: 'expected values for seed and inc (seed = 0xcafe_beef_f00b_abcd, inc = 0xfedc_ba98_7654_3210)',
    create: function() { return new PcgRandom(0xf00babcd, 0xcafebeef, 0x76543210, 0xfedcba98); },
    initState: [0xf9bc42f7, 0x05c07ad2, 0xeca86421, 0xfdb97530],
    sequence: [
        { val: 0xb80f745c, state: [0x85bbb28c, 0x0a7f260a, 0xeca86421, 0xfdb97530] }, // 0
        { val: 0xa7f24954, state: [0x07b63abd, 0x343dbf3f, 0xeca86421, 0xfdb97530] }, // 1
        { val: 0x361ed918, state: [0xfad57a5a, 0x6d3f65d1, 0xeca86421, 0xfdb97530] }, // 2
        { val: 0x9e253f7e, state: [0xda438bf3, 0x75ae2eee, 0xeca86421, 0xfdb97530] }, // 3
        { val: 0xc2aad719, state: [0x65648ad8, 0xdf978008, 0xeca86421, 0xfdb97530] }, // 4
        { val: 0x5edfb61e, state: [0x8fedf419, 0x4c3645ac, 0xeca86421, 0xfdb97530] }, // 5
        { val: 0x11c3656a, state: [0xc421b386, 0x05637648, 0xeca86421, 0xfdb97530] }, // 6
        { val: 0xac6ee203, state: [0x63a26caf, 0x30e5c8bf, 0xeca86421, 0xfdb97530] }, // 7
        { val: 0x0872e243, state: [0x39fb4fe4, 0x1c30cdd3, 0xeca86421, 0xfdb97530] }, // 8
        { val: 0x30c32b7c, state: [0xfa2b8b35, 0x0a072326, 0xeca86421, 0xfdb97530] }, // 9
        { val: 0x20721a73, state: [0x42382772, 0x117a7e23, 0xeca86421, 0xfdb97530] }, // 10
        { val: 0xcbd3d3ee, state: [0x3972e12b, 0x8b8cecac, 0xeca86421, 0xfdb97530] }, // 11
        { val: 0xe4f038cc, state: [0xd5954db0, 0xee9d9b3b, 0xeca86421, 0xfdb97530] }, // 12
        { val: 0x9da09cb6, state: [0x00e15c11, 0x2aa67891, 0xeca86421, 0xfdb97530] }, // 13
        { val: 0x9aa67238, state: [0x82d7021e, 0x3833639a, 0xeca86421, 0xfdb97530] }, // 14
        { val: 0x960cdb65, state: [0xb9f6a567, 0x1e3f914d, 0xeca86421, 0xfdb97530] }, // 15
        { val: 0x78fe5b09, state: [0xd204903c, 0x010643df, 0xeca86421, 0xfdb97530] }, // 16
        { val: 0x20c873c8, state: [0xddef82ad, 0xc2608ebe, 0xeca86421, 0xfdb97530] }, // 17
        { val: 0x17c4df4c, state: [0x2c472f8a, 0xeae16073, 0xeca86421, 0xfdb97530] }, // 18
        { val: 0xe15acb72, state: [0xa9133563, 0x86db5734, 0xeca86421, 0xfdb97530] }, // 19
        { val: 0xd04fdb6e, state: [0xa323e388, 0xd9f8c3c1, 0xeca86421, 0xfdb97530] }, // 20
        { val: 0xe3d6fe47, state: [0x35ffdb09, 0xc3e82881, 0xeca86421, 0xfdb97530] }, // 21
        { val: 0x030f677d, state: [0x80885bb6, 0x49742537, 0xeca86421, 0xfdb97530] }, // 22
        { val: 0xa8974376, state: [0x930dcd1f, 0xcd086a4b, 0xeca86421, 0xfdb97530] }, // 23
        { val: 0x859098d0, state: [0x35e2d394, 0x1251ecce, 0xeca86421, 0xfdb97530] }, // 24
        { val: 0x528f42d2, state: [0x01a20125, 0x62fb5705, 0xeca86421, 0xfdb97530] }, // 25
        { val: 0x77a5f69f, state: [0x3b3cf2a2, 0xfdbfc004, 0xeca86421, 0xfdb97530] }, // 26
        { val: 0x6fffdaf3, state: [0xe307689b, 0xb2f7f04d, 0xeca86421, 0xfdb97530] }, // 27
        { val: 0xee780d7b, state: [0x6811ac60, 0xc94ccc1f, 0xeca86421, 0xfdb97530] }, // 28
        { val: 0xcfe4c594, state: [0xd0275101, 0x487089ac, 0xeca86421, 0xfdb97530] }, // 29
        { val: 0x0f0709bb, state: [0x7656204e, 0x069e67f0, 0xeca86421, 0xfdb97530] }, // 30
        { val: 0xd3cccafd, state: [0x6938c3d7, 0x8bd47c98, 0xeca86421, 0xfdb97530] }, // 31
        { val: 0xe6d73d45, state: [0x64ed79ec, 0x387f6927, 0xeca86421, 0xfdb97530] }, // 32
        { val: 0x2e1fd9ce, state: [0x803ee69d, 0xd0cd1915, 0xeca86421, 0xfdb97530] }, // 33
        { val: 0x69693606, state: [0x817fd0ba, 0xdb580743, 0xeca86421, 0xfdb97530] }, // 34
        { val: 0x60c6560d, state: [0xccee5ad3, 0x0dcc835a, 0xeca86421, 0xfdb97530] }, // 35
        { val: 0xdcc8029e, state: [0xb26c0838, 0xc1c0b499, 0xeca86421, 0xfdb97530] }, // 36
        { val: 0x109d3338, state: [0x4a519df9, 0x932930e2, 0xeca86421, 0xfdb97530] }, // 37
        { val: 0xa1401948, state: [0x584cafe6, 0x5bafe502, 0xeca86421, 0xfdb97530] }, // 38
        { val: 0xa68ebfcf, state: [0x2644698f, 0xafbd2cb1, 0xeca86421, 0xfdb97530] }, // 39
        { val: 0x075e6fbd, state: [0x7b47e344, 0xd27fa19b, 0xeca86421, 0xfdb97530] }, // 40
        { val: 0xfca82493, state: [0xb89e1315, 0x0030daf1, 0xeca86421, 0xfdb97530] }, // 41
        { val: 0x061b5fb1, state: [0x232229d2, 0xd40b9ca1, 0xeca86421, 0xfdb97530] }, // 42
        { val: 0x5d4d1e20, state: [0xbba2ec0b, 0x2eff0728, 0xeca86421, 0xfdb97530] }, // 43
        { val: 0x7eff0c97, state: [0x61cc5710, 0xc39d7a45, 0xeca86421, 0xfdb97530] }, // 44
        { val: 0xa9544773, state: [0xe914a1f1, 0x4371827e, 0xeca86421, 0xfdb97530] }, // 45
        { val: 0x516e3254, state: [0xeee46a7e, 0x81b54f93, 0xeca86421, 0xfdb97530] }, // 46
        { val: 0xffd736ad, state: [0x9ef99e47, 0xae9d806a, 0xeca86421, 0xfdb97530] }, // 47
        { val: 0xabcdfe9d, state: [0xe7616f9c, 0x90920d8d, 0xeca86421, 0xfdb97530] }, // 48
        { val: 0x4d4b0491, state: [0x34f3668d, 0x5b452430, 0xeca86421, 0xfdb97530] }, // 49
        { val: 0x85ed14cb, state: [0x87625dea, 0xecc03ad4, 0xeca86421, 0xfdb97530] }, // 50
        { val: 0xc001e48c, state: [0xa6bbfc43, 0x036ec5fa, 0xeca86421, 0xfdb97530] }, // 51
        { val: 0x6dd8a422, state: [0x34d7f8e8, 0x857aa90c, 0xeca86421, 0xfdb97530] }, // 52
        { val: 0x0a53af51, state: [0x1a223ce9, 0xf68cfaee, 0xeca86421, 0xfdb97530] }, // 53
        { val: 0x4663a693, state: [0x2081b016, 0x9920d8fa, 0xeca86421, 0xfdb97530] }, // 54
        { val: 0xfac84483, state: [0xfe9d41ff, 0x58f606e8, 0xeca86421, 0xfdb97530] }, // 55
        { val: 0x55e3d843, state: [0xcf757ef4, 0x0dd3c967, 0xeca86421, 0xfdb97530] }, // 56
        { val: 0xdd3ca133, state: [0x024ec105, 0x07bcde53, 0xeca86421, 0xfdb97530] }, // 57
        { val: 0xf79bf786, state: [0x3a2acd02, 0x599d22f2, 0xeca86421, 0xfdb97530] }, // 58
        { val: 0x55c674d2, state: [0x4c0c6b7b, 0x857d45c0, 0xeca86421, 0xfdb97530] }, // 59
        { val: 0x93e3afac, state: [0x86c04dc0, 0xc864317a, 0xeca86421, 0xfdb97530] }, // 60
        { val: 0x40363886, state: [0x43c84ee1, 0xabdc2056, 0xeca86421, 0xfdb97530] }, // 61
        { val: 0x0aa14bdc, state: [0xeaf4e0ae, 0xf8602c88, 0xeca86421, 0xfdb97530] }, // 62
        { val: 0x1804a438, state: [0x227034b7, 0x8869ffa2, 0xeca86421, 0xfdb97530] }, // 63
        { val: 0xdb85869d, state: [0xa70b714c, 0x0fa2dee6, 0xeca86421, 0xfdb97530] }, // 64
        { val: 0x7a2dd0e1, state: [0x781c027d, 0xfdd10a42, 0xeca86421, 0xfdb97530] }, // 65
        { val: 0x744d4d8f, state: [0x7d91d71a, 0x94c00979, 0xeca86421, 0xfdb97530] }, // 66
        { val: 0x624be601, state: [0x432319b3, 0x100d5e27, 0xeca86421, 0xfdb97530] }, // 67
        { val: 0x806ad120, state: [0x3cc2b598, 0xd1de1bec, 0xeca86421, 0xfdb97530] }, // 68
        { val: 0xf17cddce, state: [0x0470b7d9, 0x6c8e86d1, 0xeca86421, 0xfdb97530] }, // 69
        { val: 0xf2a48e9d, state: [0x0cfa5c46, 0x47560a77, 0xeca86421, 0xfdb97530] }, // 70
        { val: 0x51eac374, state: [0xe52f566f, 0xd04a2cf8, 0xeca86421, 0xfdb97530] }, // 71
        { val: 0x50c75342, state: [0xf476a6a4, 0x60cd465c, 0xeca86421, 0xfdb97530] }, // 72
        { val: 0xdf419abc, state: [0x6fa30af5, 0x8df80e2a, 0xeca86421, 0xfdb97530] }, // 73
        { val: 0xd546df82, state: [0x8b59dc32, 0x8ed1d23f, 0xeca86421, 0xfdb97530] }, // 74
        { val: 0x18bfed1f, state: [0x00cae6eb, 0x6cc115f4, 0xeca86421, 0xfdb97530] }, // 75
        { val: 0xc444c10e, state: [0xe3a89070, 0x7ceca36e, 0xeca86421, 0xfdb97530] }, // 76
        { val: 0x15733b2f, state: [0xe22157d1, 0x4542e24c, 0xeca86421, 0xfdb97530] }, // 77
        { val: 0x8ba85e63, state: [0x5fba82de, 0x0b51881a, 0xeca86421, 0xfdb97530] }, // 78
        { val: 0xb518ace3, state: [0x5a938727, 0xca1b26bf, 0xeca86421, 0xfdb97530] }, // 79
        { val: 0xb1439921, state: [0x46567efc, 0x0d12a49b, 0xeca86421, 0xfdb97530] }, // 80
        { val: 0xd12a7dfe, state: [0xeb87ba6d, 0x0ce38cb7, 0xeca86421, 0xfdb97530] }, // 81
        { val: 0xce38f8f0, state: [0x86713c4a, 0xde8979de, 0xeca86421, 0xfdb97530] }, // 82
        { val: 0x2539f37a, state: [0xca8ab323, 0x608f44d0, 0xeca86421, 0xfdb97530] }, // 83
        { val: 0xe6311eb9, state: [0xfd473e48, 0x96e50b6e, 0xeca86421, 0xfdb97530] }, // 84
        { val: 0x76bdf729, state: [0x69fc0ec9, 0xa11daaf6, 0xeca86421, 0xfdb97530] }, // 85
        { val: 0x0562023b, state: [0xe049b476, 0x55a27282, 0xeca86421, 0xfdb97530] }, // 86
        { val: 0x53ed133f, state: [0xfad1a6df, 0x792420ad, 0xeca86421, 0xfdb97530] }, // 87
        { val: 0xb93c490f, state: [0x59165a54, 0x3f789df7, 0xeca86421, 0xfdb97530] }, // 88
        { val: 0x5fde248a, state: [0x2f49f0e5, 0xc74e5c75, 0xeca86421, 0xfdb97530] }, // 89
        { val: 0xcdb4d7e9, state: [0x1c725762, 0x3aaaee0e, 0xeca86421, 0xfdb97530] }, // 90
        { val: 0x28aab829, state: [0x9a255e5b, 0x29eb9280, 0xeca86421, 0xfdb97530] }, // 91
        { val: 0x79eb98fa, state: [0x7e001f20, 0x85b82406, 0xeca86421, 0xfdb97530] }, // 92
        { val: 0xad0eb700, state: [0xbfbebcc1, 0xdaf65ac6, 0xeca86421, 0xfdb97530] }, // 93
        { val: 0xd9b1ecab, state: [0x6928510e, 0x1a2a5f3a, 0xeca86421, 0xfdb97530] }, // 94
        { val: 0xe8a966c3, state: [0xbe1a9597, 0xbf66f09d, 0xeca86421, 0xfdb97530] }, // 95
        { val: 0xb7d101d9, state: [0x6c6d98ac, 0x9276c3a7, 0xeca86421, 0xfdb97530] }, // 96
        { val: 0x39d6d3b7, state: [0x46c58e5d, 0x2f8053c2, 0xeca86421, 0xfdb97530] }, // 97
        { val: 0x57805822, state: [0xd7238d7a, 0x2dc3110b, 0xeca86421, 0xfdb97530] }, // 98
        { val: 0x15c31a7b, state: [0xf119c893, 0xa5ed4023, 0xeca86421, 0xfdb97530] }, // 99
    ]
}];

for (var fixtureIdx = 0; fixtureIdx < fixtures.length; ++fixtureIdx) {
    (function(fixture) {
        test('normal: ' + fixture.name, function(t) {
            var pcg = fixture.create();
            t.deepEqual(fixture.initState.slice(0, 2), pcg.getState().slice(0, 2), 'Initial pcg state');
            t.deepEqual(fixture.initState.slice(2, 4), pcg.getState().slice(2, 4), 'Initial pcg increment');
            for (var i = 0; i < fixture.sequence.length; ++i) {
                var entry = fixture.sequence[i];
                var generated = pcg.next32();
                t.equal(generated, entry.val, 'Generated value (iteration ' + i + ')');
                t.deepEqual(entry.state.slice(0, 2), pcg.getState().slice(0, 2), '`state` after iteration ' + i);
                t.deepEqual(entry.state.slice(2, 4), pcg.getState().slice(2, 4), '`increment` after iteration ' + i);
            }
            t.end();
        });

        test('setState: ' + fixture.name, function(t) {
            var pcg = new PcgRandom();
            pcg.setState(fixture.initState);
            t.deepEqual(pcg.getState(), fixture.initState, "Initial state");
            for (var i = 0; i < fixture.sequence.length; ++i) {
                var entry = fixture.sequence[i];
                var generated = pcg.next32();
                t.equal(generated, entry.val, 'Generated value (iteration ' + i + ')');
                t.deepEqual(entry.state.slice(0, 2), pcg.getState().slice(0, 2), '`state` after iteration ' + i);
                t.deepEqual(entry.state.slice(2, 4), pcg.getState().slice(2, 4), '`increment` after iteration ' + i);
            }
            t.end();
        });
    }(fixtures[fixtureIdx]));
}
