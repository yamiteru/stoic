import { ObservableInstance } from '../../src/types';
import { ERROR } from "./constants";

export default <I, O>(observbale$: ObservableInstance<I, O>) => {
  it("executes error subscribers", () => {
    let res = null;
    
    observbale$.onError((e) => res = e);
    observbale$.error(ERROR);

    expect(res).toBe(ERROR);
  });
};
