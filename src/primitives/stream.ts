import observableChannels from "../help/observableChannels";
import { Map, Maybe, Some, Subs } from "../types";

export const stream = <I extends Some, O extends Some = I>(map?: Maybe<Map<I, O, undefined>>, subs?: Maybe<Subs<O>>) => {
    const [ onNextSet, onErrorSet, onEndSet] = observableChannels<O>(subs);
    const end = () => {
        onEndSet.pub();
        onNextSet.end();
        onErrorSet.end();
        onEndSet.end();
    }
    const error = (v: string) => {
        onErrorSet.pub(v);
        end();
    };

    return {
        next: (v: I) => {
            try {
                const next = map ? map(v, undefined): v;
                next !== undefined && onNextSet.pub(next as O);
            } catch (e: any) {
                error(e.message);
            }
        },
        onNext: onNextSet.sub,
        error,
        onError: onErrorSet.sub,
        end,
        onEnd: onEndSet.sub,
    };
};