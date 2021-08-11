import {Comparator, Current} from "../types/help";
import {PubRequiredFn} from "../types/methods";

const pubValue = <Output>(
    current: Current<Output>,
    pub: PubRequiredFn<Output>,
    comparator: Comparator = (a, b) => a !== b
) => (data: Output) =>
    comparator(current._, data) && pub(current._ = data);

export default pubValue;
