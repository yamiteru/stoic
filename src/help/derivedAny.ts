import {
  Map,
  Maybe,
  Noop,
  Observable,
  ObservableOutputs,
  Some,
  Stream, StreamInstance,
  Subs,
  Value, ValueInstance,
} from "../types";

export default <
    O extends Some,
    A extends Observable<any, any>[],
    I extends ObservableOutputs<A>,
    P extends Value | Stream,
>(
    primitive: P,
    initial: P extends Value ? O : undefined,
    observables: [...A],
    map: P extends Value ? Map<I, O, O> : Map<I, O, undefined>,
    subs?: Maybe<Subs<O>>
) => {
    const l = observables.length;
    const primitive$ = initial === undefined
        ? (primitive as Stream)<I, O>(map as any, subs) as StreamInstance<I, O>
        : (primitive as Value)<I, O>(initial as any, map as any, subs) as ValueInstance<I, O>;
    const { next, ...withoutNext } = primitive$;
    const values = [] as unknown as I;
    const unsubs = [] as unknown as Noop[];

    for(let i = 0; i < l; ++i) {
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
            for(let i = 0; i < l; ++i) unsubs[i]();

            primitive$.end();
        }
    } as P extends Value
      ? ValueInstance<I, O>
      : StreamInstance<I, O>;
};
