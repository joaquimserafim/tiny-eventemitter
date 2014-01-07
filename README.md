# tiny-eventemitter

<a href="https://nodei.co/npm/tiny-eventemitter/"><img src="https://nodei.co/npm/tiny-eventemitter.png"></a>

[![Build Status](https://travis-ci.org/joaquimserafim/tiny-eventemitter.png?branch=master)](https://travis-ci.org/joaquimserafim/tiny-eventemitter)


Tiny and very simples eventemitter that can be used in Node.js but the major target is to use the browser.


##Desc
    
    EventEmitter
    
    mehtods:
        emit('event', [arg1], [arg2], [...])
        on('event', callback(*))
        once('event', callback(*)) // run once
        remove([event])            // remove one or all listeners
        listeners()                // return activ events
        
        
    * An Array-like object corresponding to the arguments passed to a function. 



##Usage
    
    
    
      var EventEmitter = require('tiny-eventemitter');
      
      var em = new EventEmitter();
      
      em.on('hello', function (args) {
        console.log(ars);// arguments array
      });

      em.emit('hello', 'Hello', ' ', 'World');
      // will be ['Hello', ' ', 'World']

      em.remove('hello');
      
      
    
