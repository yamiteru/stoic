import {Maybe, Option} from "./core";
import {Observable} from "./primitives";
import {GetFn} from "./methods";

export type Subscriber<Output> = (data?: Output) => void;
export type Subscribers<Output> = Set<Subscriber<Output>>;

export type PubSubscribers<Output> = Subscribers<Output>;
export type ErrSubscribers = Subscribers<string>;
export type EndSubscribers = Subscribers<undefined>;

export type Comparator = (a: any, b: any) => boolean;
export type Computation<Input, Output> = (value?: Maybe<Input>) => Option<Output>;

export type Current<Output> = { _: Maybe<Output> };

export type Source<Output> = Observable<Output> & {
    get?: GetFn<Output>;
};