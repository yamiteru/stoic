import {Current} from "../types/help";

const get = <Output>(currentValue: Current<Output>) => () => currentValue._;

export default get;