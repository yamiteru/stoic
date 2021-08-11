import {NONE} from "../constants";
import {MapCallback} from "../types/help";
import {PubRequiredFn} from "../types/methods";

const pubIfNotNone = <Inputs extends any[], Output>(
  values: Inputs,
  map: MapCallback<Inputs, Output>,
  pub: PubRequiredFn<Output>
) => {
  if(!values.includes(undefined)) {
    const res = map(...values);
    res !== NONE && pub(res as Output);
  }
};

export default pubIfNotNone;
