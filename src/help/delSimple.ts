import {SubscriberSet} from "../types/help";

const delSimple = <T>(subscribers: SubscriberSet<T>) => () => subscribers.clear();

export default delSimple;