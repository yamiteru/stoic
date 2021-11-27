import { ObservableInstance } from "../../src/types";

export default <I, O>(observable$: ObservableInstance<I, O>, methods: string[]) => {
  it("has all methods", () => {
    const hasAllMethods = !methods
      .map((k) => k in observable$)
      .includes(false);
  
    expect(hasAllMethods).toBe(true);
  })
};
