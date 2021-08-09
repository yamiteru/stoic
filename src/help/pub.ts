import {ErrSubscribers, Subscribers} from "../types/help";
import {Maybe} from "../types/core";

const pub = <Output>(subscribers: Subscribers<any>, errSubscribers?: ErrSubscribers) => (data?: Output) => {
    for (const callback of subscribers) try {
        callback(data);
    } catch ({ message }) {
        if(errSubscribers) pub(errSubscribers)(message);
        else throw new Error(message);
    }
};

export default pub;