import { stream } from "../src";

const counter$ = stream<number>(
  (v) => v % 2 === 0 ? v : undefined,
  { next: console.log }
);

counter$.next(1);
counter$.next(2);
counter$.next(3);
counter$.next(4);
counter$.next(5);
counter$.next(6);
counter$.next(7);
counter$.next(8);
counter$.next(9);

// 2
// 4
// 6
// 8
