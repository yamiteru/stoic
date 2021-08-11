import {EndFn, UnsubFn} from "../types/methods";

const endDerived = (unsubs: UnsubFn[], end: EndFn) =>
  () => (unsubs.forEach((unsub) => unsub()), end());

export default endDerived;
