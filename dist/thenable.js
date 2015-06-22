// export interface IThenable<V> {
//   then<W>( fn: (value: V) => W | Promise<W>): Promise<W>;
// }
var x;
export class Thenable {
    // public prototype: Promise<V>;
    // protected _promise: Promise<V>;
    constructor(obj) {
        if (!(obj instanceof Promise))
            obj = Promise.resolve(obj);
        // this.constructor.prototype = <Promise<V>>obj;
        // this._promise = Promise.resolve(obj);
    }
    //   return this._promise.catch(fn);
    // }
    // static lift<V,W>(promise: Promise<V>, fn: (value: V) => W | Promise<W>): Promise<W> {
    //   return promise.then
    // };
    zip(otherPromise) {
        return Thenable.zip(this, otherPromise);
    }
}
Thenable.create = (promise) => {
    if (promise instanceof Promise) {
        return new Thenable(promise);
    }
};
Thenable.zip = (promise, otherPromise) => {
    return promise.then((value) => {
        return otherPromise.then((otherValue) => {
            return [value, otherValue];
        });
    });
};
Thenable.map = (promise, mapFn) => {
    return promise.then(mapFn);
};
export default Thenable;
var a = Promise.resolve(1);
var b = Object.create(a);
// var a: Promise<number>;
// var b = Promise.lift(a, (x: number) => x.toString())
