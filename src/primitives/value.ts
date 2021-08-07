import stream from "./stream";
import pubValue from "../help/pubValue";
import {Maybe} from "../types/core";
import {Comparator, CurrentValue} from "../types/help";
import {Value} from "../types/primitives";
import get from "../help/get";

const value = <T>(initialValue: Maybe<T> = null, comparator?: Comparator): Value<T> => {
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