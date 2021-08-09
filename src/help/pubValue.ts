import {Comparator, Current} from "../types/help";
import {PubFn} from "../types/methods";

const pubValue = <Output>(
    current: Current<Output>,
    pub: PubFn<Output>,
    comparator: Comparator = (a, b) => a !== b
) => (data?: Output) =>
    comparator(current._, data) && pub(current._ = data);

export default pubValue;