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
Derived primitive takes a list of observables from which it gets a list of their current data and passes it through a user defined mapper. It caches the last data of the observables passed into it and doesn't take action unless all of them are valid meaning `data !== undefined`. The mapper has to return data back which is then passed to all the primitive's subscribers.

Derived primitive is curried (mainly because TS doesn't have partial type inference). In the first call you define the list of observables. In the second call you define the mapper. This let's you omit the type of either the observables or output and infer the type from usage.

The types of observables and hence the types of arguments in the map are inferred automatically.

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
const cartItem$ = derivedStream(addToCart$)<CartItem>(
    (product) => ({
        id: uuid(),
        name: product.name,
        price: product.price,
        quantity: 1,
    }));
```

#### value
Returns `pub`, `get`, `end`, `onPub`, `onErr`, `onEnd`.

``` typescript
const cartSumPrice$ = value<number>(0);
```

#### derivedValue
Returns `get`, `end`, `onPub`, `onErr`, `onEnd`.

``` typescript
const cartFreeShipping$ = derivedValue(cartSumPrice$, vatPercentage$)<boolean>(
    (price, vat) => (price * (1 + vat)) > 1000);
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
There are several inner events you can subscribe to inside a primitive. Every subscription returns a function which lets you unsubscribe the subscription. 

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
- [X] Derive from multiple observables
- [ ] Accumulate data over time
- [ ] Tests
- [ ] Optimization
- [ ] Benchmarks
- [ ] In-code Docs for better intellisense
- [ ] Examples
- [ ] Publish on NPM


___


Oh is this library still too big and complex for you? Do you want the absolute core of this library in just 90 bytes? Sure, [there you go](https://gist.github.com/the-yamiteru/fee294c163f1128d15b37edcd04a4902).


___


Every idea, issue or discussion is welcomed 🙏 
