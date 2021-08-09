import {Subscriber, Subscribers} from "../types/help";
import {UnsubFn} from "../types/methods";

const sub = <Output>(set: Subscribers<Output>) => (callback: Subscriber<Output>): UnsubFn =>
    (set.add(callback), () => set.delete(callback));

export default sub;