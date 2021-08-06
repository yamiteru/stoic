import {Maybe, Option} from "./core";
import {GetFn, SubFn} from "./methods";

export type Subscriber<T> = (value?: Maybe<T>) => void;
export type SubscriberSet<T> = Set<Subscriber<T>>;

export type Comparator = (a: any, b: any) => boolean;
export type Computation<T> = (value?: any) => Option<Maybe<T>>;

export type CurrentValue<T> = { _: Maybe<T> };

export type Source = {
    sub: SubFn<any>;
    get?: GetFn<any>;
};