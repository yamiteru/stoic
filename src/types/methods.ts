import {Maybe} from "./core";
import {Subscriber} from "./help";

export type UnsubFn = () => void;
export type PubFn<T> = (value?: Maybe<T>) => void;
export type GetFn<T> = () => Maybe<T>;
export type EndFn = () => void;

export type OnPubFn<T> = (callback: Subscriber<T>) => UnsubFn;
export type OnErrFn = (callback: Subscriber<string>) => UnsubFn;
export type OnEndFn = (callback: Subscriber<undefined>) => UnsubFn;

export type Pub<T> = { pub: PubFn<T> };
export type Get<T> = { get: GetFn<T> };
export type End<T> = { end: EndFn };

export type OnPub<T> = { onPub: OnPubFn<T> };
export type OnErr = { onErr: OnErrFn };
export type OnEnd = { onEnd: OnEndFn };
