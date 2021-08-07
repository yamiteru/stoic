import {Comparator, CurrentValue} from "../types/help";
import {PubFn} from "../types/methods";

const pubValue = <T>(
    currentValue: CurrentValue<T>,
    pub: PubFn<T>,
    comparator: Comparator = (a, b) => a !== b
) => (value?: T) =>
    comparator(currentValue._, value) && pub(currentValue._ = value);

export default pubValue;