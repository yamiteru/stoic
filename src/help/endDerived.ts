import {NONE} from "../constants";
import {Computation, Source} from "../types/help";
import {EndFn, PubFn} from "../types/methods";

const endDerived = <T>(source: Source<any>, callback: Computation<any, T>, pub: PubFn<T>, end: EndFn) => {
    const unsub = source.onPub((value) => {
        const res = callback(value);
        res !== NONE && pub(res as T);
    });

    return () => (unsub(), end());
};

export default endDerived;