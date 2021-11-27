import { ObservableInstance } from "../../src/types";

export default <O>(observbale$: ObservableInstance<number, O>) => {
  it("passes data without transformation", () => {
    let res = null;
    
    observbale$.onNext((v) => res = v);
    observbale$.next(2);

    expect(res).toBe(2);
  });
};
