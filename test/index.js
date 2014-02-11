var test = require('tape');
var inherits = require('util').inherits;   

var EventEmitter = require('../');




test('tiny-eventemitter - simples', function (t) {
  t.plan(6);

  var em = new EventEmitter();

  em.on('hello', function (arg1, arg2) {
    // 3 arguments
    t.ok(arg1 && arg2, arg1 + ' ' + arg2);
  });

  em.emit('hello', 'Hello', 'World');

  em.remove('hello');

  // removed event, must enter inside catch

  try {
    em.emit('hello', 'Hello', 'World');
    t.fail('event was removed must not exist');
  } catch (err) {
    t.ok(err, err);
  }

  em.on('tx', function () {
    t.pass('"tx" event does not have arguments');
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


test('tiny-eventemitter - inherit', function (t) {
  t.plan(3);

  function DummyTest () {
    EventEmitter.call(this);
  }

  inherits(DummyTest, EventEmitter);

  DummyTest.prototype.write = function (client, msg) {
    this.emit('msg', client, msg);
  };


  var dummy = new DummyTest();

  t.deepEqual(dummy instanceof EventEmitter, true, 'object "dummy instanceof EventEmitter"');
  t.deepEqual(DummyTest.super_, EventEmitter, 'DummyTest.super_ === EventEmitter');


  dummy.on('msg', function (client, msg) {
    t.pass(client + ': ' + msg);
  });

  dummy.write('127.0.0.1', 'Hello World!!!');
});


