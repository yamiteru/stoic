import { stream } from ".";
import derivedAny from "../help/derivedAny";
import { Map, Maybe, Observable, ObservableOutputs, Some, Subs } from "../types";

export const derivedStream = <
    O extends Some,
    A extends Observable<any, any>[],
    I extends ObservableOutputs<A>,
>(...props: [
    observables: [...A],
    map: Map<I, O, undefined>,
    subs?: Maybe<Subs<O>>
]) => derivedAny<O, A, I>(
    stream, 
    undefined,
    ...props
);