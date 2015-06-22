// export interface IThenable<V> {
//   then<W>( fn: (value: V) => W | Promise<W>): Promise<W>;
// }
export class Thenable {
    constructor(obj) {
        this._promise = Promise.resolve(obj);
    }
    then(fn) {
        return this._promise.then(fn);
    }
    catch(fn) {
        return this._promise.catch(fn);
    }
}
export default Thenable;
// var a: Promise<number>;
// var b = Promise.lift(a, (x: number) => x.toString())
