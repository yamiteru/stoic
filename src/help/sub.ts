import {SubscriberRequired, SubscribersRequired} from "../types/help";
import {UnsubFn} from "../types/methods";

const sub = <Output>(set: SubscribersRequired<Output>) => (callback: SubscriberRequired<Output>): UnsubFn =>
    (set.add(callback), () => set.delete(callback));

export default sub;
