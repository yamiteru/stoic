import {CurrentValue} from "../types/help";

const getSimple = <T>(currentValue: CurrentValue<T>) => () => currentValue._;

export default getSimple;