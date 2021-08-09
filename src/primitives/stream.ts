import {Stream} from "../types/primitives";
import {EndSubscribers, ErrSubscribers, PubSubscribers} from "../types/help";
import sub from "../help/sub";
import pub from "../help/pub";
import end from "../help/end";

const stream = <Output>(): Stream<Output> => {
    const pubSubscribers: PubSubscribers<Output> = new Set();
    const errSubscribers: ErrSubscribers = new Set();
    const endSubscribers: EndSubscribers = new Set();

    return {
        pub: pub(pubSubscribers, errSubscribers),
        end: end<Output>(pubSubscribers, errSubscribers, endSubscribers),
        onPub: sub<Output>(pubSubscribers),
        onErr: sub<string>(errSubscribers),
        onEnd: sub<undefined>(endSubscribers),
    };
};

export default stream;