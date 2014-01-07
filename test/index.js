var test = require('tape');

var EventEmitter = require('../');

test('eventemitter', function (t) {
  t.plan(6);

  var em = new EventEmitter();

  em.on('hello', function (args) {
    // 3 arguments
    t.deepEqual(args.length, 3, '"hello" event say and have 3 arguments "' + args + '"');
  });

  em.emit('hello', 'Hello', ' ', 'World');

  em.remove('hello');

  // removed event, must enter inside catch

  try {
    em.emit('hello', 'Hello', ' ', 'World');
    t.fail('event was removed must not exist');
  } catch (err) {
    t.ok(err, err);
  }

  em.on('tx', function (args) {
    t.deepEqual(args.length, 0, '"tx" event does not have arguments');
  });

  em.emit('tx');

  em.remove();// remove all listeners

  t.deepEqual(em.listeners().length, 0 , 'all listeners were removed!!!');

  em.once('only_once', function () {
    t.pass('call only once');
  });

  em.emit('only_once');

  t.deepEqual(em.listeners().length, 0 , 'once_only emites "once" and voilá does not have any listener!!!');

});