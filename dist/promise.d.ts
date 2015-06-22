export declare class Thenable<V> implements Promise<V> {
    [Symbol.toStringTag]: string;
    protected _promise: Promise<V>;
    constructor(obj: V | Promise<V>);
    then<W>(fn: (value: V) => W | Promise<W>): Promise<W>;
    catch(fn: () => V | Promise<V>): Promise<V>;
}
export default Thenable;
