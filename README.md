# tiny-eventemitter

<a href="https://nodei.co/npm/tiny-eventemitter/"><img src="https://nodei.co/npm/tiny-eventemitter.png"></a>

[![Build Status](https://travis-ci.org/joaquimserafim/tiny-eventemitter.png?branch=master)](https://travis-ci.org/joaquimserafim/tiny-eventemitter)

[![browser support](https://ci.testling.com/joaquimserafim/tiny-eventemitter.png)](https://ci.testling.com/joaquimserafim/tiny-eventemitter)


Tiny and very simple eventemitter that can be used in Node.js and the browser.

**V1.2**

##Desc
    
    
    methods:
        emit('event', [arg1], [arg2], [...])
        deferEmit('event', [arg1], [arg2], [...])
        on('event', callback([arg1], [arg2], [...]))
        once('event', callback([arg1], [arg2], [...])) // run once
        remove([event])                                // remove one or all events
        listeners()                                    // return active events
        
        
  

##Example
    
    
    
    var EventEmitter = require('tiny-eventemitter');
    
    var em = new EventEmitter();
    
    em.on('hello', function (arg1, arg2) {
        console.log(arg1 + ' ' + arg2);
    });

    em.emit('hello', 'Hello', 'World');

    em.remove('hello');
    
    
    
    
    // Inherit from tiny-eventemitter
    
    var inherits = require('util').inherits;   
    var EventEmitter = require('tiny-eventemitter');
    
    
    
    function DummyTest () {
      EventEmitter.call(this);
    }
    
    inherits(DummyTest, EventEmitter);
    
    DummyTest.prototype.write = function (client, msg) {
      this.emit('msg', client, msg);
    };
    
    
    var dummy = new DummyTest();
    
    console.log(dummy instanceof EventEmitter);
    console.log(DummyTest.super_ === EventEmitter);
    
    
    dummy.on('msg', function (client, msg) {
      console.log(client + ': ' + msg);
    });
    
    dummy.write(12, 'Hello World!!!');
    
    
    
    
    // using an defer emitter
    
    var em = new EventEmitter();

    em.on('hello', function (arg) {
        console.log(arg);
    });
    
    process.nextTick(function () {
      console.log('nextTick => will call after "first" & "second" emits but before the "end" emitter');
    });
    
    // note: in this example put "process.nextTick" before purposely
    // deferEmit must be declare/write/emit after "process.nextTick"
    em.deferEmit('hello', 'this will be emit in end');
    
    em.emit('hello', 'this will emit first');
    em.emit('hello', 'this will emit in second');
      
      
    
