var test = require('tape');
var Audio = require('..');

test('writing audio', function(t) {
  // Mono
  var mono = new Audio({
    source: new Buffer([0, 50, 100, 50]),
    bitDepth: 8,
    channels: 1
  });
  var monoWrite = mono.write(10, 1);
  t.is(mono.read(1), 10, 'mono write');
  t.is(monoWrite, 2, 'mono write position');

  // Stereo
  var stereo = new Audio({
    source: new Buffer([0, 50, 100, 50]),
    bitDepth: 8,
    channels: 2
  });
  var stereoWrite = stereo.write(10, 1, 2);
  t.is(stereo.read(1, 2), 10, 'stereo write');
  t.is(stereoWrite, 4, 'stereo write position');

  // 4 channels
  var four = new Audio({
    source: new Buffer([0, 50, 100, 50, 0, 50, 100, 50]),
    bitDepth: 8,
    channels: 4
  });
  t.is(four.read(0, 1), 0, 'four first channel');
  t.is(four.read(1, 2), 50, 'four second channel');
  t.is(four.read(0, 3), 100, 'four third channel');
  t.is(four.read(1, 4), 50, 'four fourth channel');

  // Stereo 16-bit
  var st = new Audio({
    source: new Buffer([0, 50, 100, 50, 0, 50, 100, 50]),
    bitDepth: 16,
    channels: 2
  });
  t.is(st.read(0, 1), 12800, 'stereo 16-bit left');
  t.is(st.read(0, 2), 12900, 'stereo 16-bit right');

  t.end();
});
