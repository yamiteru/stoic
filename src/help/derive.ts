import {PubRequiredFn, UnsubFn} from "../types/methods";
import {MapCallback, Source, SourceTypes} from "../types/help";
import pubIfNotNone from "./pubIfNotNone";

const derive = <Inputs extends Source<any>[], Output>(
  inputs: Inputs,
  map: MapCallback<SourceTypes<Inputs>, Output>,
  pub: PubRequiredFn<Output>
) => {
  const inputsLength = inputs.length;
  const values = Array(inputsLength) as SourceTypes<Inputs>;
  const unsubs = Array(inputsLength) as UnsubFn[];

  inputs.forEach((input, i) => {
    input?.get && (values[i] = input.get());

    unsubs.push(input.onPub((v) => {
      values[i] = v;

      pubIfNotNone<SourceTypes<Inputs>, Output>(values, map, pub);
    }));
  });

  return {
    values, unsubs
  };
};

export default derive;
