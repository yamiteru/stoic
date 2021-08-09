import {NONE} from "../constants";
import {Computation, Source} from "../types/help";
import {EndFn, PubFn} from "../types/methods";

const endDerived = <Input, Output>(source: Source<Input>, callback: Computation<Input, Output>, pub: PubFn<Output>, end: EndFn) => {
    const unOnPub = source.onPub((value) => {
        const res = callback(value);
        res !== NONE && pub(res as Output);
    });

    return () => (unOnPub(), end());
};

export default endDerived;