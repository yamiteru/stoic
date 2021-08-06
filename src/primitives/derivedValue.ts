import value from "./value";
import {NONE} from "../constants";
import delDerived from "../help/delDerived";
import {DerivedValue} from "../types/primitives";
import {Comparator, Computation, Source} from "../types/help";
import {Maybe} from "../types/core";

const derivedValue = <T>(callback: Computation<T>, source: Source, comparator?: Comparator): DerivedValue<T> => {
    const initialValue = source.get && callback(source.get());
    const { sub, pub, get, del } = value<T>(initialValue !== NONE ? initialValue as Maybe<T>: null, comparator);

    return {
        sub,
        get,
        del: delDerived<T>(source, callback, pub, del)
    };
};

export default derivedValue;