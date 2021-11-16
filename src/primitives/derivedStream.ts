import { stream } from ".";
import derivedAny from "../help/derivedAny";
import { Map, Maybe, Observable, ObservableOutputs, Some, Stream, Subs } from "../types";

export const derivedStream = <
    O extends Some,
    A extends Observable<any, any>[] = Observable<any, any>[],
    I extends ObservableOutputs<A> = ObservableOutputs<A>,
>(...props: [
    observables: [...A],
    map: Map<I, O, undefined>,
    subs?: Maybe<Subs<O>>
]) => derivedAny<O, A, I, Stream>(
    stream, 
    undefined,
    ...props
);
