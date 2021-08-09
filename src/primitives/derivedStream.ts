import {stream} from "./stream";
import endDerived from "../help/endDerived";
import {DerivedStream} from "../types/primitives";
import {Computation, Source} from "../types/help";

export const derivedStream = <Input>(source: Source<Input>) => <Output>(callback: Computation<Input, Output>): DerivedStream<Output> => {
    const { pub, end, onPub, onErr, onEnd } = stream<Output>();

    return {
        end: endDerived<Input, Output>(source, callback, pub, end),
        onPub, onErr, onEnd,
    };
};