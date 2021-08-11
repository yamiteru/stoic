import {stream} from "./stream";
import {DerivedStream} from "../types/primitives";
import {MapCallback, Source, SourceTypes} from "../types/help";
import derive from "../help/derive";
import endDerived from "../help/endDerived";

export const derivedStream = <Inputs extends Source<any>[]>(...inputs: Inputs) =>
  <Output>(map: MapCallback<SourceTypes<Inputs>, Output>): DerivedStream<Output> => {
    const { pub, end, onPub, onErr, onEnd } = stream<Output>();
    const { unsubs } = derive<Inputs, Output>(inputs, map, pub);

    return {
      end: endDerived(unsubs, end),
      onPub, onErr, onEnd,
    };
  };
