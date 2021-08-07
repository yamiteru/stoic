import stream from "./stream";
import pubValue from "../help/pubValue";
import {Comparator, CurrentValue} from "../types/help";
import {Value} from "../types/primitives";
import get from "../help/get";
import {Maybe} from "../types/core";

const value = <T>(initialValue: Maybe<T>, comparator?: Comparator): Value<T> => {
    const currentValue: CurrentValue<T> = Object.seal({ _: initialValue });
    const { pub, end, onPub, onErr, onEnd } = stream<T>();

    return {
        pub: pubValue<T>(currentValue, pub, comparator),
        get: get<T>(currentValue),
        end,
        onPub, onErr, onEnd
    };
};

export default value;