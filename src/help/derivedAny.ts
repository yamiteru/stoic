import { 
    Map, 
    Maybe,
    Noop,
    Observable, 
    ObservableOutputs, 
    Some, 
    Stream, 
    Subs, 
    Value 
} from "../types";

export default <
    O extends Some,
    A extends Observable<any, any>[],
    I extends ObservableOutputs<A>,
>(
    primitive: Value | Stream,
    initial: O | undefined,
    observables: [...A],
    map: Map<I, O, O> | Map<I, O, undefined>,
    subs?: Maybe<Subs<O>>
) => {
    const l = observables.length;
    const primitive$ = initial === undefined 
        ? (primitive as Stream)<I, O>(map as any, subs)
        : (primitive as Value)<I, O>(initial as any, map as any, subs);
    const { next, ...withoutNext } = primitive$;
    const values = [] as unknown as I;
    const unsubs = [] as unknown as Noop[];

    let i = -1;
    while(++i < l) {
        const o$ = observables[i];
        if(o$?.get) values[i] = o$?.get();

        unsubs[i] = o$.onNext((v) => {
            values[i] = v;
            !values.includes(undefined) && next(values);
        })
    }

    return {
        ...withoutNext,
        end: () => {            
            let i = -1;
            while(++i < l) unsubs[i]();

            primitive$.end();
        }
    };
};
