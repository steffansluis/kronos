import Thenable from './thenable';

function Kronos<V>(obj: V | Promise<V>): Promise<V> {
  return Kronos.create(obj);
}

module Kronos {
  export var create = <V>(obj: V | Promise<V>): Promise<V>  => {
    var promise: Promise<V> = (obj instanceof Promise ? obj : Promise.resolve(obj));
    var res: Promise<V> = Object.create(promise);

    res.then = <W>( fn: ( value: V ) => W | Promise<W>): Promise<W> => {
      return Kronos.create(promise.then(fn));
    }

    res.catch = ( fn: ( reason: any ) => V | Promise<V>): Promise<V> => {
      return Kronos.create(promise.catch(fn));
    }

    Object.keys(Kronos).forEach( (key) => {
      res[key] = (...args: any[]) => Kronos.create(Kronos[key](promise, ...args));
    });

    return res;
  }

  export var zip = <V,W>(promise: Promise<V>, otherPromise: Promise<W>): Promise<[V,W]> => {
    return promise.then((value: V) => {
      return otherPromise.then((otherValue: W) => {
        return [value, otherValue];
      })
    })
  }
  
  export var map = <V,W>(promise: Promise<V>, mapFn: (value: V) => W | Promise<W>): Promise<W> => {
    return promise.then(mapFn);
  }
}

declare var module: any;
module.exports = Kronos;
