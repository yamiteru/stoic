import {Stream} from "../types/primitives";
import {EndSubscribers, ErrSubscribers, PubSubscribers} from "../types/help";
import sub from "../help/sub";
import pub from "../help/pub";
import end from "../help/end";

const stream = <T>(): Stream<T> => {
    const pubSubscribers: PubSubscribers<T> = new Set();
    const errSubscribers: ErrSubscribers = new Set();
    const endSubscribers: EndSubscribers = new Set();

    return {
        pub: pub(pubSubscribers),
        end: end<T>(pubSubscribers, errSubscribers, endSubscribers),
        onPub: sub<T>(pubSubscribers),
        onErr: sub<string>(errSubscribers),
        onEnd: sub<undefined>(endSubscribers),
    };
};

export default stream;