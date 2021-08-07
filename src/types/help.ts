import {Maybe, Option} from "./core";
import {Observable} from "./primitives";
import {GetFn} from "./methods";

export type Subscriber<T> = (value?: Maybe<T>) => void;
export type Subscribers<T> = Set<Subscriber<T>>;

export type PubSubscribers<T> = Subscribers<T>;
export type ErrSubscribers = Subscribers<string>;
export type EndSubscribers = Subscribers<undefined>;

export type Comparator = (a: any, b: any) => boolean;
export type Computation<T> = (value?: any) => Option<Maybe<T>>;

export type CurrentValue<T> = { _: Maybe<T> };

export type Source = Observable<any> & {
    get?: GetFn<any>;
};