import { Callback, Some } from "../types";

export default <T extends Some | void>(listeners: any[]) => {
    const set = new Set<Callback<T>>(listeners);
    
    return {
        pub: (v: T) => set.forEach((cb) => cb(v)),
        sub: (cb: Callback<T>) => (set.add(cb), (() => set.delete(cb))),
        end: () => set.clear(),
    };
};