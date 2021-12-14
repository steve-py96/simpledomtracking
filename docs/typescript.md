# typescript

this library is written in typescript, therefore there should also be an example of how to use provided in typescript! <br />
simply picking up the one from the `README` "focusing" on the JSX-one

```ts
// usually it's enough to use the implied types, but...
// you might also use explicit types, it'd be used like trackingFactory<'keyForTracking' | 'otherKeyForTracking'>
const simpleTracker = trackingFactory(
  {
    keyForTracking: 'keyInDOM',
    otherKeyForTracking: 'otherKeyInDOM',
  },
  keys => keys.keyForTracking
)

// implicit JSX type
function Component() {
  return (
    <div
      id="the_button"
      {...simpleTracker.create(keys => ({
        [keys.keyForTracking]: 'button click',
        [keys.otherKeyForTracking]: 'really!!!!',
      }))}
    />
  )
}

// somewhere in a submit f.e.
if (simpleTracker.isTracking(element)) yourTracking(simpleTracker.getTrackingData(element))
```
