export declare module Schedulers {
    function schedule<V>(fn: (...args: any[]) => V): (...args: any[]) => Promise<V>;
    function sync<T>(fn: (...args: any[]) => T | Promise<T>): Promise<T>;
}
export default Schedulers;
