import {Subscriber} from "./help";
import {Maybe} from "./core";

export type UnsubFn = () => void;
export type PubFn<Output> = (data?: Output) => void;
export type GetFn<Output> = () => Maybe<Output>;
export type EndFn = () => void;

export type OnPubFn<Output> = (callback: Subscriber<Output>) => UnsubFn;
export type OnErrFn = (callback: Subscriber<string>) => UnsubFn;
export type OnEndFn = (callback: Subscriber<undefined>) => UnsubFn;

export type Pub<Output> = { pub: PubFn<Output> };
export type Get<Output> = { get: GetFn<Output> };
export type End<Output> = { end: EndFn };

export type OnPub<Output> = { onPub: OnPubFn<Output> };
export type OnErr = { onErr: OnErrFn };
export type OnEnd = { onEnd: OnEndFn };
