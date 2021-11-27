import { ObservableInstance } from "../../src/types";
import { ERROR } from "./constants";

export default <I, O>(observbale$: ObservableInstance<I, O>) => {
  it("causes observable end", () => {
    let res = null;

    observbale$.onEnd(() => res = true);
    observbale$.error(ERROR);

    expect(res).toBe(true);
  });
};
