import { stream } from '../src/primitives/stream';

const logger$ = stream<string>(null, {
  next: console.log,
  error: (e) => console.log(e),
  end: () => console.log("byee"),
});

logger$.next("hello world");
logger$.error("user does not exist");

// hello world
// user does not exist
// byee
