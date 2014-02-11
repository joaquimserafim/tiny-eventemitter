module.exports = EventEmitter;

function EventEmitter () {
  if (!(this instanceof EventEmitter)) return new EventEmitter();
  EventEmitter.init.call(this);
}

EventEmitter.init = function () {
  this._listeners = {};
};

EventEmitter.prototype._addListenner = function (type, listener, once) {
  if (typeof listener !== 'function')
    throw TypeError('listener must be a function');

  if (!this._listeners[type])
    this._listeners[type] = {
      once: once,
      fn: function () {
        return listener.apply(this, arguments);
      }
    };

  return this;
};

EventEmitter.prototype.listeners = function () {
  return Object.keys(this._listeners);
};

EventEmitter.prototype.on = function (type, listener) {
  return this._addListenner(type, listener, 0);
};

EventEmitter.prototype.once = function (type, listener) {
  return this._addListenner(type, listener, 1);
};

EventEmitter.prototype.remove = function (type) {
  if (type) {
    delete this._listeners[type];
    return this;
  }

  for (var e in this._listeners) delete this._listeners[e];

  return this;
};

EventEmitter.prototype.emit = function (type) {
  if (!this._listeners[type])
    throw new Error('Event "' + type + '" don\'t exists');

  var args = Array.prototype.slice.call(arguments, 1);

  // exec event
  this._listeners[type].fn.apply(this, args);

  // remove events that run only once
  if (this._listeners[type].once) this.remove(type);
  
  return this;
};