Kronos
=====

Kronos is about time, and as we all know: time flows. Luckily, flow control already exists in Javascript, as well as a lot of things that have something to do with time. Kronos tries to implement a particular set of conventions.

# How it works

Kronos is built on the principle of Spatial and Temporal data. To get an idea of what that means, a lot of inspiration was drawn from [here][1]. The concept is as follows:

```
var foo = {bar: 1};
while(foo.bar < 10) {
    foo.bar++;
    if (foo.bar % 2) console.log('Bar is uneven:', foo.bar);
}

```

This is the normal way of controlling program flow, which we will call spatial flow control. With Kronos, you can do the following:
```
var foo = {bar: 1};
var voo = Kronos(foo).until({bar: 10}).when(function(foo) {return foo.bar%2;});
voo.do(function(foo) {console.log('Bar is uneven:', foo.bar);});
```
In our philosophy, this is temporal flow control. Notice that this doesn't do anything. That is because `foo.bar` isn't being incremented, or in other words, there is no flow to control. In order to have it do something, we need to add the following:
```
while(foo.bar < 10) {
  foo.bar++;
}
```
At first sight, this might look like code duplication, since we've already given a stop condition as the argument for the until function. However, that stop condition is for the flow control, not for the flow. So now, as `foo.bar` flows from 1 to 10, when it is uneven, it will do something. Once it hits 10, Kronos will no longer care about the value of `bar`.

Kronos can also generate flow:
```
var foo = {bar: 1};
var voo = Kronos(foo);

voo.do( function(foo) {
  foo.bar++;
  return foo.bar < 10;
}).when(function(foo) {return foo.bar%2;}).with('bar').do( console.log );
```

Since the first function will return false when `bar` hits 10, the handler will be removed.

# Signals

The way Kronos implements temporal triggers is using the `Signal` class. A signal takes any object and observes it using `Object.observe` (ES6 only). Calling `do(fn)` on an instance of `Signal` calls `fn` with the value of the signal and then triggers any handlers. This is repeated until `fn` returns a falsy value.  There is a flow of the value from `fn` to the handlers, but this flow can be interupted by the handler function by returning a falsy value. A signal can do the following things:
```
var foo = {bar: 1};
var voo = Kronos(foo);

voo.value() # Returns foo

voo.until(fn) # Adds a handler that returns false when fn return true
voo.when(fn) # Adds a handler that returns fn(foo)
voo.do(fn) # Executes fn(foo) and triggers any handlers, then repeats until fn(foo) is falsy

voo.every(fn) # Adds a handler that gets removed if fn(foo) is falsy. Does not affect flow

voo.with('bar') # Creates a new Signal, dependent on the bar property of foo

```

  [1]: https://github.com/kriskowal/gtor
