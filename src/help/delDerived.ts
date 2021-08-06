import {NONE} from "../constants";
import {Computation, Source} from "../types/help";
import {DelFn, PubFn} from "../types/methods";
import {Maybe} from "../types/core";

const delDerived = <T>(source: Source, callback: Computation<T>, pub: PubFn<T>, del: DelFn<T>) => {
    const unsub = source.sub((value) => {
        const res = callback(value);
        res !== NONE && pub(res as Maybe<T>);
    });

    return () => (unsub(), del());
};

export default delDerived;