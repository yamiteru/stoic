import { ObservableInstance } from "../../src/types";
import { ERROR } from "./constants";

export default <O>(observbale$: ObservableInstance<number, O>) => {
  it("removes next/error subscribers", () => {
    let res: boolean | string = true;
    
    observbale$.onNext(() => res = false);
    observbale$.onError((e) => res = e);

    observbale$.end();

    observbale$.next(2);
    observbale$.error(ERROR);

    expect(res).toBe(true);
  });
};
