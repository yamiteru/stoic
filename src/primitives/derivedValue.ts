import {value} from "./value";
import endDerived from "../help/endDerived";
import {DerivedValue} from "../types/primitives";
import {Comparator, MapCallback, Source, SourceTypes} from "../types/help";
import derive from "../help/derive";
import pubIfNotNone from "../help/pubIfNotNone";

export const derivedValue = <Inputs extends Source<any>[]>(...inputs: Inputs) =>
  <Output>(map: MapCallback<SourceTypes<Inputs>, Output>, isDifferent?: Comparator): DerivedValue<Output> => {
    const { pub, get, end, onPub, onErr, onEnd } = value<Output>(null, isDifferent);
    const { values, unsubs } = derive<Inputs, Output>(inputs, map, pub);

    pubIfNotNone<SourceTypes<Inputs>, Output>(values, map, pub);

    return {
        get,
        end: endDerived(unsubs, end),
        onPub, onErr, onEnd
    };
};
