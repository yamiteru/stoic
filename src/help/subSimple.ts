import {Subscriber, SubscriberSet} from "../types/help";

const subSimple = <T>(subscribers: SubscriberSet<T>) =>
    (callback: Subscriber<T>) => (subscribers.add(callback), () => subscribers.delete(callback));

export default subSimple;