import {CurrentValue} from "../types/help";

const get = <T>(currentValue: CurrentValue<T>) => () => currentValue._;

export default get;