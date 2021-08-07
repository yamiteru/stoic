import value from "./value";
import {NONE} from "../constants";
import endDerived from "../help/endDerived";
import {DerivedValue} from "../types/primitives";
import {Comparator, Computation, Source} from "../types/help";
import {Maybe} from "../types/core";

const derivedValue = <T>(source: Source<any>, callback: Computation<any, T>, comparator?: Comparator): DerivedValue<T> => {
    const initialValue = source.get && callback(source.get());
    const { pub, get, end, onPub, onErr, onEnd } = value<T>(initialValue !== NONE ? initialValue as Maybe<T>: null, comparator);

    return {
        get,
        end: endDerived<T>(source, callback, pub, end),
        onPub, onErr, onEnd
    };
};

export default derivedValue;