import {End, Get, OnEnd, OnErr, OnPub, Pub} from "./methods";

export type Observable<T> = OnPub<T> & OnErr & OnEnd & End<T>;

export type Publishable<T> = Pub<T> & Observable<T>;

export type Stream<T> = Publishable<T>;

export type DerivedStream<T> = Observable<T>;

export type Value<T> = Get<T> & Publishable<T>;

export type DerivedValue<T> = Get<T> & Observable<T>;