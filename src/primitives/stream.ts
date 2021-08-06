import subSimple from "../help/subSimple";
import pubSimple from "../help/pubSimple";
import delSimple from "../help/delSimple";
import {Stream} from "../types/primitives";
import {SubscriberSet} from "../types/help";

const stream = <T>(): Stream<T> => {
    const subscribers: SubscriberSet<T> = new Set();

    return {
        sub: subSimple<T>(subscribers),
        pub: pubSimple<T>(subscribers),
        del: delSimple<T>(subscribers)
    };
};

export default stream;