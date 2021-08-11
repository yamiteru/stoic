import {Stream} from "../types/primitives";
import {EndSubscribers, ErrSubscribers, PubRequiredSubscribers} from "../types/help";
import sub from "../help/sub";
import pub from "../help/pub";
import end from "../help/end";

export const stream = <Output>(): Stream<Output> => {
    const pubSubscribers: PubRequiredSubscribers<Output> = new Set();
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
