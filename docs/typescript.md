# typescript

this library is written in typescript, therefore there should also be an example of how to use provided in typescript! <br />
simply picking up the one from the `README` "focusing" on the JSX-one

```ts
type TrackingKey =
  | 'keyForTracking'
  | 'otherKeyForTracking'



const simpleTracker = trackingFactory<TrackingKey>(
  {
    keyForTracking: 'keyInDOM',
    otherKeyForTracking: 'otherKeyInDOM',
  },
  { detectionKey: 'keyForTracking' }
)


// implicit JSX type
function Component() {
  return (
    <div
      id="the_button"
      {
        simpleTracker.create(keys => ({
          [keys.keyForTracking]: 'button click',
          [keys.otherKeyForTracking]: 'really!!!!'
        }))
      }
    />
  )
}


// somewhere in a submit
if (simpleTracker.isTracking(element)) {
  yourTracking(
    simpleTracker.getTrackingData(element)
  )
}
```
