function Kronos(obj) {
    return Kronos.create(obj);
}
var Kronos;
(function (Kronos) {
    Kronos.create = (obj) => {
        var promise = (obj instanceof Promise ? obj : Promise.resolve(obj));
        var res = Object.create(promise);
        res.then = (fn) => {
            return Kronos.create(promise.then(fn));
        };
        res.catch = (fn) => {
            return Kronos.create(promise.catch(fn));
        };
        Object.keys(Kronos).forEach((key) => {
            res[key] = (...args) => Kronos.create(Kronos[key](promise, ...args));
        });
        return res;
    };
    Kronos.zip = (promise, otherPromise) => {
        return promise.then((value) => {
            return otherPromise.then((otherValue) => {
                return [value, otherValue];
            });
        });
    };
    Kronos.map = (promise, mapFn) => {
        return promise.then(mapFn);
    };
})(Kronos || (Kronos = {}));
module.exports = Kronos;
