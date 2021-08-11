import {Maybe, Option} from "./core";
import {Observable} from "./primitives";
import {Get} from "./methods";

export type Source<Output> = Observable<Output> & Partial<Get<Output>>;
export type SourceType<T> = T extends Source<infer U> ? U: never;
export type SourceTypes<T extends [...any[]]> = {
  [I in keyof T]: SourceType<T[I]>;
};

export type MapCallback<Values extends any[], Output> =
  (...values: Values) => Option<Output>;

export type SubscriberOptional<Output> = (data?: Output) => void;
export type SubscriberRequired<Output> = (data: Output) => void;
export type SubscribersRequired<Output> = Set<SubscriberRequired<Output>>;

export type PubRequiredSubscribers<Output> = SubscribersRequired<Output>;
export type ErrSubscribers = SubscribersRequired<string>;
export type EndSubscribers = SubscribersRequired<undefined>;

export type Comparator = (a: any, b: any) => boolean;
export type Current<Output> = { _: Maybe<Output> };
