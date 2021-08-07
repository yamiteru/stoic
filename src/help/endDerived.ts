import {NONE} from "../constants";
import {Computation, Source} from "../types/help";
import {EndFn, PubFn} from "../types/methods";
import {Maybe} from "../types/core";

const endDerived = <T>(source: Source, callback: Computation<T>, pub: PubFn<T>, end: EndFn) => {
    const unsub = source.onPub((value) => {
        const res = callback(value);
        res !== NONE && pub(res as Maybe<T>);
    });

    return () => (unsub(), end());
};

export default endDerived;