import {NONE} from "./constants";
import stream from "./primitives/stream";
import derivedStream from "./primitives/derivedStream";
import value from "./primitives/value";
import derivedValue from "./primitives/derivedValue";

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