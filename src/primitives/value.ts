import { stream } from ".";
import { Map, Maybe, Some, Subs } from "../types";

export const value = <I extends Some, O extends Some = I>(initial: O, map?: Maybe<Map<I, O, O>>, subs?: Maybe<Subs<O>>) => {
    let latest: O = initial;
    const stream$ = stream<I, O>(map ? (next) => map(next, latest): null, {
        ...subs,
        next: (v) => {
            latest = v;
            subs?.next && subs.next(latest);
        }
    });

    return {
        ...stream$,
        get: () => latest
    };
};