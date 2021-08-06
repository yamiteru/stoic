import stream from "./stream";
import pubValue from "../help/pubValue";
import getSimple from "../help/getSimple";
import {Value} from "../types/primitives";
import {Maybe} from "../types/core";
import {Comparator, CurrentValue} from "../types/help";

const value = <T>(initialValue: Maybe<T> = null, comparator?: Comparator): Value<T> => {
    const currentValue: CurrentValue<T> = Object.seal({ _: initialValue });
    const { sub, pub, del } = stream<T>();

    return {
        sub,
        pub: pubValue<T>(currentValue, pub, comparator),
        get: getSimple<T>(currentValue),
        del
    };
};

export default value;