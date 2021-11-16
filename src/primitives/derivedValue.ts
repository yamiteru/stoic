import { value } from ".";
import derivedAny from "../help/derivedAny";
import { Map, Maybe, Observable, ObservableOutputs, Some, Subs, Value } from "../types";

export const derivedValue = <
    O extends Some,
    A extends Observable<any, any>[] = Observable<any, any>[],
    I extends ObservableOutputs<A> = ObservableOutputs<A>,
>(...props: [
    initial: O,
    observables: [...A],
    map: Map<I, O, O>,
    subs?: Maybe<Subs<O>>
]) => derivedAny<O, A, I, Value>(
    value, 
    ...props
);
