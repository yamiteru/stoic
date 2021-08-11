import {ErrSubscribers, SubscribersRequired} from "../types/help";

const pub = <Output>(subscribers: SubscribersRequired<any>, errSubscribers?: ErrSubscribers) => (data: Output) => {
    for (const callback of subscribers) try {
        callback(data);
    } catch ({ message }) {
        if(errSubscribers) pub(errSubscribers)(message);
        else throw new Error(message);
    }
};

export default pub;
