import {SubscriberOptional, SubscriberRequired} from "./help";
import {Maybe} from "./core";

export type UnsubFn = () => void;
export type PubRequiredFn<Output> = (data: Output) => void;
export type GetFn<Output> = () => Maybe<Output>;
export type EndFn = () => void;

export type OnPubFn<Output> = (callback: SubscriberRequired<Output>) => UnsubFn;
export type OnErrFn = (callback: SubscriberOptional<string>) => UnsubFn;
export type OnEndFn = (callback: SubscriberOptional<undefined>) => UnsubFn;

export type PubRequired<Output> = { pub: PubRequiredFn<Output> };
export type Get<Output> = { get: GetFn<Output> };
export type End<Output> = { end: EndFn };

export type OnPub<Output> = { onPub: OnPubFn<Output> };
export type OnErr = { onErr: OnErrFn };
export type OnEnd = { onEnd: OnEndFn };
