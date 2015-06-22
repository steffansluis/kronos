// export interface IThenable<V> {
//   then<W>( fn: (value: V) => W | Promise<W>): Promise<W>;
// }
var x: typeof Promise;
export class Thenable<V> implements Promise<V> {
  [Symbol.toStringTag]: string;
  // public prototype: Promise<V>;

  // protected _promise: Promise<V>;

  constructor(obj: V | Promise<V>) {
    if (!(obj instanceof Promise)) obj = Promise.resolve(obj);

    // this.constructor.prototype = <Promise<V>>obj;
    // this._promise = Promise.resolve(obj);
  }

  then: <W>( fn: ( value: V ) => W | Promise<W>) => Promise<W>; // {
  //   return new Thenable(this._promise.then(fn));
  // }
  //
  catch: ( fn: () => V | Promise<V>) => Promise<V>; // {
  //   return this._promise.catch(fn);
  // }
  // static lift<V,W>(promise: Promise<V>, fn: (value: V) => W | Promise<W>): Promise<W> {
  //   return promise.then
  // };

  zip<W>(otherPromise: Promise<W>): Promise<[V,W]> {
    return Thenable.zip(this, otherPromise);
  }

  static create = <V>(promise: Promise<V>): Thenable<V>  => {
    if (promise instanceof Promise) {
      return new Thenable(promise);
    }
  }

  static zip = <V,W>(promise: Promise<V>, otherPromise: Promise<W>): Promise<[V,W]> => {
    return promise.then((value: V) => {
      return otherPromise.then((otherValue: W) => {
        return [value, otherValue];
      })
    })
  }
  static map = <V,W>(promise: Promise<V>, mapFn: (value: V) => W | Promise<W>): Promise<W> => {
    return promise.then(mapFn);
  }

  // export var delay = <V,W>(promise: Promise<V>, mapFn: (value: V) => W | Promise<W>): Promise<W> => {
  // }
}

export default Thenable;

var a = Promise.resolve(1);
var b = <typeof a>Object.create(a);
// var a: Promise<number>;
// var b = Promise.lift(a, (x: number) => x.toString())
