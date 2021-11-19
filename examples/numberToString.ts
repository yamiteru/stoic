import { stream } from '../src/primitives/stream';

const counter$ = stream<number, string>(
  (v) => `COUNT: ${v}`,
  { next: console.log }
);

counter$.next(0);
counter$.next(1);
counter$.next(2);
counter$.next(3);

// COUNT: 0
// COUNT: 1
// COUNT: 2
// COUNT: 3
