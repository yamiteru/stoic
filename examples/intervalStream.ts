import { stream } from '../src/primitives/stream';

let _interval: any;
  
const interval$ = stream<number>(null, {
  end: () => clearInterval(_interval)
});

_interval = setInterval(() => interval$.next(Date.now()), 1000);

const randomNumberEachSecond$ = stream<number, [number, number]>(
  (v) => [v, Math.random()], 
  { next: ([timestamp, random]) => console.log(timestamp, random) }
);

interval$.onNext((timestamp) => randomNumberEachSecond$.next(timestamp));
interval$.onEnd(() => randomNumberEachSecond$.end());

setTimeout(() => {
  interval$.end();
}, 5000);

// 1637352552536 0.4521641711492992
// 1637352553538 0.7881675096541736
// 1637352554538 0.7895062491754079
// 1637352555539 0.7031340263071886
