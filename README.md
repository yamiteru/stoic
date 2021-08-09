# Stoic
Tiny, fast, simple and strictly typed low-level TypeScript functional reactive library. 



## Concepts

### Observable
Every reactive primitive is in an essence an Observable. Observable lets you listen to its events. In another words when you subscribe to an observable you can then react when something happens and/or changes inside of that very observable.

Every observable in Stoic has `onPub`, `onErr` and `onEnd` subscribe methods.

### Lifecycle
A Life of a reactive primitive starts once the primitive is created or after ending its previous life by calling `end` method. When a primitive reaches its end all subscribers that has been added to it in its previous life are removed. It essentially works as a reset. Or a reincarnation. Pick your poison. 

### Stream
Stream acts a stateless proxy which passes data to all its subscribers. Data gets passed to the subscribers by calling `pub` method with the data that you want to pass. 

Since stream is stateless you can access the current data only inside a subscriber. 

### Value
Value is a stateful stream which takes an initial data and caches the last data every time the data changes. You can get the last data anywhere in the code by calling `get` method. 

Value also takes an optional comparator as the last argument which checks if the new data is different from the last data. If they are same then no new data gets passed through. This means that subscribers are called only when the new and last data are different.

Default comparator is `(a, b) => a !== b`.

### Derivation
Derived primitive takes an observable from which it gets the current data and passes it through a user defined computation. The computation can then transform the data. It has to return data back which is then passed to all its subscribers.

Derived primitive takes its input by subscribing to the observable. The computation is basically just a subscriber passed to `onPub` of the observable with the only difference that it has to return data matching the type of the derived primitive.

Derived primitive is curried (mainly because TS doesn't have partial type inference). In the first call you define the source observable. In the second call you define the computation. This let's you omit the type of either input or output and infer the type from usage.

___


## API

### Primitives

#### Stream 
Returns `pub`, `end`, `onPub`, `onErr`, `onEnd`.

``` typescript
const addToCart$ = stream<Product>();
```

#### derivedStream
Returns `end`, `onPub`, `onErr`, `onEnd`.

``` typescript
const cartItem$ = derivedStream<Product>(addToCart$)<CartItem>(
    (product) => ({
        id: uuid(),
        name: product.name,
        price: product.price,
        quantity: 1,
    }));
```

Or a simpler version where input gets inferred from the observable passed into the first curried function:

``` typescript
const cartItem$ = derivedStream(addToCart$)<CartItem>(
    (product) => ({
        id: uuid(),
        name: product.name,
        price: product.price,
        quantity: 1,
    }));
```

This also applies to `derivedValue`.

#### value
Returns `pub`, `get`, `end`, `onPub`, `onErr`, `onEnd`.

``` typescript
const cartSumPrice$ = value<number>(0);
```

#### derivedValue
Returns `get`, `end`, `onPub`, `onErr`, `onEnd`.

``` typescript
const cartFreeShipping$ = derivedValue<number>(cartSumPrice$)<boolean>(
    (price) => price > 1000);
```

### Actions

#### pub
Publishes data to all `onPub` subscribers.

``` typescript
addToCart$.pub({
    name: "The Clean Code",
    price: 350,
});
```

#### get
Returns the last cached data.

``` typescript
const sumPrice = cartSumPrice$.get();
```

#### end
Ends the current life of a primitive.

``` typescript
cartFreeShipping$.end();
```

### Subscribers
There are several inner events you can subscribe to inside a primitive. Every subscribtion returns a function which lets you unsubscribe the subscription. 

All errors thrown in subscribers will be passed to `onErr` meaning they will not terminate the process. 

#### onPub
Subscribes to the data passed in `pub` action.

``` typescript
const unOnPub = addToCart$.onPub((product) => {
    slideCartIntoView();
});
```

#### onErr
Subscribes to errors thrown in other subscribers. Note that an error thrown in `onErr` will terminate the process.

``` typescript
const unOnErr = addToCart$.onErr((message) => {
    showErrorMessage(message); 
});
```

#### onEnd
Subscribes to the end of the current life of a primitive triggered by `end` action.

``` typescript
const unOnEnd = primitive$.onEnd(() => {
    unOnPub();
    unOnErr();
    unOnEnd();
});
```


___


## Todo
- [X] `stream`
- [X] `derivedStream`
- [X] `value`
- [X] `derivedValue`
- [X] `sub` on pub/err/end
- [X] Better types and type names
- [X] Docs
- [ ] Tests
- [ ] Optimization
- [ ] Benchmarks
- [ ] In-code Docs for better intellisense
- [ ] Examples
- [ ] Publish on NPM


___


Every idea, issue or discussion is welcomed 🙏 
