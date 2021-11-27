import { ObservableInstance } from "../../src/types";

export default <I, O>(observbale$: ObservableInstance<I, O>) => {
  it("executes end subscribers", () => {
    let res = null;
    
    observbale$.onEnd(() => res = true);
    observbale$.end();

    expect(res).toBe(true);
  });
};
