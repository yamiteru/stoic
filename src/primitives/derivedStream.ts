import stream from "./stream";
import delDerived from "../help/delDerived";
import {DerivedStream} from "../types/primitives";
import {Computation, Source} from "../types/help";

const derivedStream = <T>(callback: Computation<T>, source: Source): DerivedStream<T> => {
    const { sub, pub, del } = stream<T>();

    return {
        sub,
        del: delDerived<T>(source, callback, pub, del)
    };
};

export default derivedStream;