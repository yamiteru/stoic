import {End, Get, OnEnd, OnErr, OnPub, PubRequired} from "./methods";

export type Observable<Output> = OnPub<Output> & OnErr & OnEnd & End<Output>;

export type Publishable<Output> = PubRequired<Output> & Observable<Output>;

export type Stream<Output> = Publishable<Output>;

export type DerivedStream<Output> = Observable<Output>;

export type Value<Output> = Get<Output> & Publishable<Output>;

export type DerivedValue<Output> = Get<Output> & Observable<Output>;
