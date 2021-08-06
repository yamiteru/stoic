import {Comparator, CurrentValue} from "../types/help";
import {PubFn} from "../types/methods";
import {Maybe} from "../types/core";

const pubValue = <T>(currentValue: CurrentValue<T>, pub: PubFn<T>, comparator: Comparator = (a, b) => a !== b) =>
    (value?: Maybe<T>) => comparator(currentValue._, value) && pub(currentValue._ = value);

export default pubValue;