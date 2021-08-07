import {Maybe, Option} from "./core";
import {Observable} from "./primitives";
import {GetFn} from "./methods";

export type Subscriber<T> = (value?: T) => void;
export type Subscribers<T> = Set<Subscriber<T>>;

export type PubSubscribers<T> = Subscribers<T>;
export type ErrSubscribers = Subscribers<string>;
export type EndSubscribers = Subscribers<undefined>;

export type Comparator = (a: any, b: any) => boolean;
export type Computation<I, O> = (value?: I) => Option<O>;

export type CurrentValue<T> = { _: Maybe<T> };

export type Source<T> = Observable<T> & {
    get?: GetFn<T>;
};