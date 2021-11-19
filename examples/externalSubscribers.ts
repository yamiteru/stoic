import { stream } from '../src/primitives/stream';

const price$ = stream<number>();
const logger$ = stream<string>();

logger$.onEnd(() => console.log("LOGGER end"));
logger$.onNext((v) => console.log(Date.now(), v));
price$.onNext((v) => logger$.next(`PRICE: ${v}`));
price$.onError((e) => console.log("ERROR", e));
price$.onEnd(() => {
  console.log("PRICE end");
  logger$.end();
});

price$.next(1000);
price$.next(2000);
price$.next(3000);
price$.error("no more prices");

// 1637351471731 PRICE: 1000
// 1637351471734 PRICE: 2000
// 1637351471734 PRICE: 3000
// ERROR no more prices
// PRICE end
// LOGGER end
