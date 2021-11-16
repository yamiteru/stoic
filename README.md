# Stoic
Tiny, fast and simple TypeScript functional reactive library. 



## Concepts

### Observable
Something that emits values over time to which you can listen to. It starts its life once it's created and ends either by `error` or `end`. 

There are 3 types of events to which you can listen to: 
1. `onNext` listens to new values
2. `onError` listens to errors
3. `onEnd` listens to the end of the observable

There are 2 core types of observables:
1. `stream` doesn't remember the latest value
2. `value` does remember the latest value

### Value mapping
Every observable has some sort of input and output value. Their shapes can be completely different and for that there is a map.

It accepts input value and outputs either output value or undefined. Undefined is used to stop the propagation of the output value to subscribers. 

### Derivation
Each observable type has its derived version. Derived observables derive their input value from an array of output values of other observables.

Derived observables are updated internally by an array of observables so there is no `next` method for manually passing input values into them.



___



## API

### Observables

#### Stream 
``` typescript
const simpleLogger$ = stream<[type: string, message: any]>(null, {
  next: ([type, message]) => console.log(type.toUpperCase(), message)
});
```

#### derivedStream
``` typescript
const squidStats$ = derivedStream([players$, reward$], ([players, reward]) => [
  `${players.length} 염`,
  `₩ ${reward.toWon()}`
]);
```

#### value
``` typescript
const price$ = value<number>(0, isPositive);
const count$ = value<number>(0, isPositive);
```

#### derivedValue
``` typescript
const sum$ = derivedValue([price$, count$], ([price, count]) => price * count);
```



___



## Future
- Tests
- Benchmarks
- `pipe` (once it's possible to define types that would support an **unlimited** number of functions)
- React hooks



___

Have a beautiful day 🍀 
