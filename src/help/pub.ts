import {ErrSubscribers, Subscribers} from "../types/help";
import {Maybe} from "../types/core";

const pub = <T>(subscribers: Subscribers<any>, errSubscribers?: ErrSubscribers) => (value?: Maybe<T>) => {
    for (const callback of subscribers) try {
        callback(value);
    } catch ({ message }) {
        if(errSubscribers) pub(errSubscribers)(message);
        else throw new Error(message);
    }
};

export default pub;