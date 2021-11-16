import { stream } from "./primitives/stream";
import { value } from "./primitives/value";

export type Maybe<T> = T | null;
export type Some = string | number | boolean | symbol | object | null;
export type Noop = () => void;

export type Value = typeof value;
export type Stream = typeof stream;

export type Map<I extends Some, O extends Some, T> = (next: I, latest: T) => O | undefined;
export type Callback<T, O = void> = (value: T) => O;

export type Observable<I, O = I> = {
    onNext: (cb: Callback<O, void>) => Noop,
    onError: (cb: Callback<string, void>) => Noop,
    onEnd: (cb: Callback<void, void>) => Noop,
    get?: () => O,
};

export type ObservableOutputs<T extends Observable<any, any>[]> = {
    [K in keyof T]: T[K] extends Observable<any, infer O> ? O : never
};

export type Subs<T> = Partial<{
    next: Callback<T>,
    error: Callback<string>,
    end: Callback<void>,
}>;

export type SubType = keyof Subs<any>;