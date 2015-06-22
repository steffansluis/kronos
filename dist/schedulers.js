function isPromise(object) {
    return 'then' in object;
}
class SynchronousPromise {
    constructor(fn) {
        this._status = "pending";
        try {
            this._value = this._fn();
            this._status = "resolved";
        }
        catch (e) {
            this._reason = e;
            this._status = "rejected";
        }
    }
    then(onfulfilled, onrejected) {
        if (this._status == "resolved" && onfulfilled != null) {
            if (isPromise(this._value))
                return this._value.then(onfulfilled);
            return new SynchronousPromise(() => onfulfilled(this._value));
        }
        if (this._status == "rejected" && onrejected != null) {
            return new SynchronousPromise(() => onrejected(this._reason));
        }
        return new SynchronousPromise(() => this);
    }
    catch(onrejected) {
        if (this._status == "rejected" && onrejected != null) {
            return new SynchronousPromise(() => onrejected(this._reason));
        }
    }
    static new(executor) {
        var resolve, reject;
        executor;
        return new SynchronousPromise(resolve).catch(reject);
    }
    ;
    static resolve(value) {
        if (value != undefined)
            return new SynchronousPromise(() => value);
        else
            return new SynchronousPromise(() => { });
    }
    static reject(reason) {
        return new SynchronousPromise(() => { throw reason; });
    }
}
export var Schedulers;
(function (Schedulers) {
    function schedule(fn) {
        return (...args) => new SynchronousPromise(fn);
    }
    Schedulers.schedule = schedule;
    function sync(fn) {
        return new SynchronousPromise(fn);
    }
    Schedulers.sync = sync;
})(Schedulers || (Schedulers = {}));
export default Schedulers;
