export declare class Thenable<V> implements Promise<V> {
    [Symbol.toStringTag]: string;
    constructor(obj: V | Promise<V>);
    then: <W>(fn: (value: V) => W | Promise<W>) => Promise<W>;
    catch: (fn: () => V | Promise<V>) => Promise<V>;
    zip<W>(otherPromise: Promise<W>): Promise<[V, W]>;
    static create: <V>(promise: Promise<V>) => Thenable<V>;
    static zip: <V, W>(promise: Promise<V>, otherPromise: Promise<W>) => Promise<[V, W]>;
    static map: <V, W>(promise: Promise<V>, mapFn: (value: V) => W | Promise<W>) => Promise<W>;
}
export default Thenable;
