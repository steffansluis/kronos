function isPromise(object: any) {
  return 'then' in object;
}

class SynchronousPromise<V> implements Promise<V> {
  [Symbol.toStringTag]: string;
  [Symbol.species]: Function;


  protected _fn: (...args: any[]) => V | Promise<V>;
  protected _value: V | Promise<V>;
  protected _reason: any;
  protected _status = "pending";

  constructor(fn: (...args: any[]) => V | PromiseLike<V>) {
    try {
      this._value = this._fn();
      this._status = "resolved";
    } catch (e) {
      this._reason = e;
      this._status = "rejected";
    }
  }

  then<W>(onfulfilled?: (value: V) => W | Promise<W>, onrejected?: (reason: any) => W | PromiseLike<W>): Promise<W> {
    if(this._status == "resolved" && onfulfilled != null) {
      if(isPromise(this._value)) return (<Promise<V>> this._value).then(onfulfilled);
      return new SynchronousPromise(() => onfulfilled(<V> this._value));
    }

    if(this._status == "rejected" && onrejected != null) {
      return new SynchronousPromise(() => onrejected(this._reason))
    }

    return new SynchronousPromise((): any => this)
  }

  catch<W>(onrejected: (reason: any) => W | PromiseLike<W>): SynchronousPromise<W> {
    if(this._status == "rejected" && onrejected != null) {
      return new SynchronousPromise(() => onrejected(this._reason))
    }
  }

  static new <V>(executor: (resolve: (value?: V | PromiseLike<V>) => void, reject: (reason?: any) => void) => void): Promise<V> {
    var resolve: (value?: V | PromiseLike<V>) => void,
      reject: (reason?: any) => void;
    executor
    return new SynchronousPromise(resolve).catch(reject);
  };

  static resolve<V>(value?: V | PromiseLike<V>): Promise<void | V> {
    if (value != undefined) return new SynchronousPromise(() => value);
    else return new SynchronousPromise<void>(() => {})
  }

  static reject<V>(reason: any): Promise<void | V> {
    return new SynchronousPromise(() => {throw reason});
  }

  // static reject<V>(reason: any):
}

export module Schedulers {
  export function schedule<V>( fn: (...args: any[]) => V ): (...args: any[]) => Promise<V> {
    return (...args: any[] ) => new SynchronousPromise(fn)
  }
  export function sync<T>(fn: (...args: any[]) => T | Promise<T>): Promise<T> {
    return new SynchronousPromise(fn);
  }
}

export default Schedulers;
