import {Subscriber, Subscribers} from "../types/help";
import {UnsubFn} from "../types/methods";

const sub = <T>(set: Subscribers<T>) => (callback: Subscriber<T>): UnsubFn =>
    (set.add(callback), () => set.delete(callback));

export default sub;