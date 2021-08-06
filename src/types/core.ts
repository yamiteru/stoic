import {NONE} from "../constants";

export type Some<T> = T;
export type None = typeof NONE;
export type Option<T> = Some<T> | None;
export type Maybe<T> = T | null | undefined;
