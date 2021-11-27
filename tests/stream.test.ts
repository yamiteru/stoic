import { stream } from '../src/primitives/stream';
import causesObservableEnd from './help/causesObservableEnd';
import { ERROR } from './help/constants';
import executesEndSubscribers from './help/executesEndSubscribers';
import executesErrorSubscribers from './help/executesErrorSubscribers';
import hasAllMethods from './help/hasAllMethods';
import passesDataWithoutTransformation from './help/passesDataWithoutTransformation';
import removesNextErrorSubscribers from './help/removesNextErrorSubscribers';

describe("stream", () => {
  hasAllMethods(stream(), ["next", "onNext", "error", "onError", "end", "onEnd"]);

  // NEXT
  describe("next/onNext", () => {
    passesDataWithoutTransformation(stream());

    it("passes data with valid transformation", () => {
      let res = null;
      const stream$ = stream<number>((n) => n * 2);
      
      stream$.onNext((v) => res = v);
      stream$.next(2);

      expect(res).toBe(4);
    });

    it("passes data with invalid transformation", () => {
      let res = null;
      const stream$ = stream<number>(
        (n) => n <= 0 ? undefined: n * 2
      );
      
      stream$.onNext((v) => res = v);
      stream$.next(-2);

      expect(res).toBe(null);
    });

    it("executes internal subscribers", () => {
      let res = null;
      const stream$ = stream<number>(null, {
        next: (v) => res = v 
      });

      stream$.next(2);

      expect(res).toBe(2);
    });

    it("unsubscribes", () => {
      let res = true;
      const stream$ = stream<number>();
      const unsub = stream$.onNext(() => res = false);

      unsub();
      stream$.next(2);

      expect(res).toBe(true);
    });
  });

  // ERROR
  describe("error/onError", () => {
    executesErrorSubscribers(stream());
    causesObservableEnd(stream());

    it("executes internal subscribers", () => {
      let res = null;
      const stream$ = stream(null, {
        error: (e) => res = e
      });

      stream$.error(ERROR);

      expect(res).toBe(ERROR);
    });

    it("unsubscribes", () => {
      let res: boolean | string = true;
      const stream$ = stream();
      const unsub = stream$.onError((e) => res = e);

      unsub();
      stream$.error(ERROR);

      expect(res).toBe(true);
    });
  });

  // END
  describe("end/onEnd", () => {
    executesEndSubscribers(stream());
    removesNextErrorSubscribers(stream())

    it("executes internal subscribers", () => {
      let res = null;
      const stream$ = stream(null, {
        end: () => res = true
      });

      stream$.end();

      expect(res).toBe(true);
    });

    it("unsubscribes", () => {
      let res = true;
      const stream$ = stream();
      const unsub = stream$.onEnd(() => res = false);

      unsub();
      stream$.end();

      expect(res).toBe(true);
    });
  });
});
