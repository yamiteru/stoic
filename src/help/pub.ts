import {Subscribers} from "../types/help";
import {Maybe} from "../types/core";

const pub = <T>(subscribers: Subscribers<any>) => (value?: Maybe<T>) => {
    for (const callback of subscribers) callback(value);
};

export default pub;