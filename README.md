# Stoic
_This library is in Alpha right now._

A general purpose synchronous (functional) reactive library with a simple and open API, tiny size (< 1Kb) and (hopefully) unmatched performance.

## Example
```typescript
// Stream
const clickOnPrice$ = stream<number>();
const clickedPriceWithVat$ = derivedStream<number>(
    clickOnPrice$,
    (n) => n > 0 ? Math.round(n * 1.21): NONE
);

// Value
const numberOfClicks$ = value<number>(0);
const priceTooltip$ = derivedValue<string>(
    clickedPriceWithVat$,
    (value: number) => `This product costs ${value}Kč with 21% VAT.`
);

// Subscribe
clickOnPrice$.onPub((n) => {
    numberOfClicks$.pub((numberOfClicks$.get() || 0) + 1);

    // Manually simulate an error in a subscriber
    if(n && n <= 0) throw new Error("ERROR: Number should be > 0");
});

clickOnPrice$.onEnd(() =>
    console.log("You can no more click on price")
);

clickOnPrice$.onErr(console.log);

// This could also be written like this:
// const priceTooltipUnsubscribe = priceTooltip$.onPub(console.log);
// This allows for unsubscribing individual subscribers
// as opposed to .del which unsubscribes all subscribers
priceTooltip$.onPub(console.log);

// Publish
clickOnPrice$.pub(999);
clickOnPrice$.pub(-1259);
clickOnPrice$.pub(49);
clickOnPrice$.pub(-1);
clickOnPrice$.pub(359);

// Get
setTimeout(() => {
    console.log(`Number of clicks: ${numberOfClicks$.get()}`);
    console.log(`Last tooltip: "${priceTooltip$.get()}"`);
},100);

// End
clickOnPrice$.end();
clickedPriceWithVat$.end();
numberOfClicks$.end();
priceTooltip$.end();

// Console
// This product costs 1209Kč with 21% VAT.
// ERROR: Number should be > 0
// This product costs 59Kč with 21% VAT.
// ERROR: Number should be > 0
// This product costs 434Kč with 21% VAT.
// You can no more click on price
// Number of clicks: 5
// Last tooltip: "This product costs 434Kč with 21% VAT."
```

## Todo
- [X] `stream`
- [X] `derivedStream`
- [X] `value`
- [X] `derivedValue`
- [X] `sub` on pub/err/end
- [X] Better types and type names
- [ ] Docs
- [ ] Tests
- [ ] Optimization
- [ ] Benchmarks
- [ ] In-code Docs for better intellisense
- [ ] Examples
- [ ] Publish on NPM

___

Every help and/or idea is very welcomed 🙏
