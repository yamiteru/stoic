import {SubscriberSet} from "../types/help";
import {Maybe} from "../types/core";

const pubSimple = <T>(subscribers: SubscriberSet<T>) => (value?: Maybe<T>) => {
    for (const callback of subscribers) callback(value);
};

export default pubSimple;