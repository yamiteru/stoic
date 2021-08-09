import {value} from "./value";
import {NONE} from "../constants";
import endDerived from "../help/endDerived";
import {DerivedValue} from "../types/primitives";
import {Comparator, Computation, Source} from "../types/help";
import {Maybe} from "../types/core";

export const derivedValue = <Input, Output>(source: Source<Input>, callback: Computation<Input, Output>, isDifferent?: Comparator): DerivedValue<Output> => {
    const initialData = source.get && callback(source.get());
    const { pub, get, end, onPub, onErr, onEnd } = value<Output>(initialData !== NONE ? initialData as Maybe<Output>: null, isDifferent);

    return {
        get,
        end: endDerived<Input, Output>(source, callback, pub, end),
        onPub, onErr, onEnd
    };
};