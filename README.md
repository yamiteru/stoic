# Stoic
_This library is in Alpha right now._

A general purpose synchronous (functional) reactive library with a simple and open API, tiny size (< 1Kb) and (hopefully) unmatched performance.

## Example
```typescript
// Stream
const clickOnPrice$ = stream<number>();
const clickedPriceWithVat$ = derivedStream<number>(
    (n: number) => n > 0 ? Math.round(n * 1.21): NONE,
    clickOnPrice$
);

// Value
const numberOfClicks$ = value<number>(0);
const priceTooltip$ = derivedValue<string>(
    (value: number) => `This product costs ${value}Kč with 21% VAT.`,
    clickedPriceWithVat$
);

// Subscribe
clickOnPrice$.sub(() =>
    numberOfClicks$.pub((numberOfClicks$.get() || 0) + 1)
);

// This could also be written like this:
// const priceTooltipUnsubscribe = priceTooltip$.sub(console.log);
// This allows for unsubscribing individual subscribers
// as opposed to .del which unsubscribes all subscribers
priceTooltip$.sub(console.log);

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

// Unsubscribe
clickOnPrice$.del();
clickedPriceWithVat$.del();
numberOfClicks$.del();
priceTooltip$.del();

// Console
// This product costs 1209Kč with 21% VAT.
// This product costs 59Kč with 21% VAT.
// This product costs 434Kč with 21% VAT.
// Number of clicks: 5
// Last tooltip: "This product costs 434Kč with 21% VAT."
```

## Todo
- [X] `stream`
- [X] `derivedStream`
- [X] `value`
- [X] `derivedValue`
- [ ] ?? `effect`
- [ ] ?? Allow derivation from multiple sources
- [ ] `sub` on pub/err/end
- [ ] Better types and type names
- [ ] Tests
- [ ] Optimization
- [ ] Benchmarks
- [ ] Docs
- [ ] In-code Docs for better intellisense
- [ ] Examples
- [ ] Publish on NPM

___

Every help and/or idea is very welcomed 🙏