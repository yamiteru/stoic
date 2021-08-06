import {Maybe} from "./core";
import {Comparator, Computation, Source} from "./help";
import {Del, Get, Pub, Sub} from "./methods";

export type Stream<T> = Sub<T> & Pub<T> & Del<T>;
declare function stream<T = any>(): Stream<T>;

export type DerivedStream<T> = Sub<T> & Del<T>;
declare function derivedStream<T = any>(callback: Computation<T>, source: Source): DerivedStream<T>;

export type Value<T> = Sub<T> & Pub<T> & Get<T> & Del<T>;
declare function value<T = any>(initialValue?: Maybe<T>, comparator?: Comparator): Value<T>;

export type DerivedValue<T> = Sub<T> & Get<T> & Del<T>;
declare function derivedValue<T = any>(callback: Computation<T>, source: Source, comparator?: Comparator): DerivedValue<T>;