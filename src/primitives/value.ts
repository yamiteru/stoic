import stream from "./stream";
import pubValue from "../help/pubValue";
import {Comparator, Current} from "../types/help";
import {Value} from "../types/primitives";
import get from "../help/get";
import {Maybe} from "../types/core";

const value = <Output>(initialData: Maybe<Output>, isDifferent?: Comparator): Value<Output> => {
    const current: Current<Output> = Object.seal({ _: initialData });
    const { pub, end, onPub, onErr, onEnd } = stream<Output>();

    return {
        pub: pubValue<Output>(current, pub, isDifferent),
        get: get<Output>(current),
        end,
        onPub, onErr, onEnd
    };
};

export default value;