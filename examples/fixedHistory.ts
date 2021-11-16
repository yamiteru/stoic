import { derivedValue, stream } from "../src";

const maxHistorySize = 4;

const price$ = stream<number>();
const priceHistory$ = derivedValue<number[]>([], [price$], ([price], latest) => 
  [...latest.slice(-(maxHistorySize - 1)), price]);

price$.next(1000);
price$.next(2000);
price$.next(3000);
price$.next(4000);
price$.next(5000);
price$.next(6000);
price$.next(7000);
price$.next(8000);
price$.next(9000);

console.log(priceHistory$.get());
// [ 6000, 7000, 8000, 9000 ]
