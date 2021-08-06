import {Maybe} from "./core";
import {Subscriber} from "./help";

export type UnsubFn = () => void;
export type SubFn<T> = (callback: Subscriber<T>) => UnsubFn;
export type PubFn<T> = (value?: Maybe<T>) => void;
export type GetFn<T> = () => Maybe<T>;
export type DelFn<T> = () => void;

export type Sub<T> = { sub: SubFn<T> };
export type Pub<T> = { pub: PubFn<T> };
export type Get<T> = { get: GetFn<T> };
export type Del<T> = { del: DelFn<T> };