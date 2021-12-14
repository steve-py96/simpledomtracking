# trackingFactory(obj, detectionKeyCallback, options)

typed

```ts
trackingFactory = <T extends string>(
  obj: Record<T, string>,
  detectionKeyCallback: (keys: Record<T, string>) => string
  { prefix }: TrackingFactoryOptions<T>
) => {
  create: (callback: (param: Record<T, string>) => StringDict) => StringDict
  isTracking: (element: HTMLElement) => boolean
  getTrackingData: (element: HTMLElement) => StringDict
}
```

or simple js

```js
trackingFactory = (obj, detectionKeyCallback, { prefix })
=> // returns
{
  create(callback)
  isTracking(element)
  getTrackingData(element)
}
```

<br />

# parameter definitions

## obj

your tracking configuration literally, it should have the following look

```js
{
  myTrackingKey: myDOMKey
}
```

the `trackingKey` is kept in JS and only important for your tracking backend/third party tracking army which you handle via code (f.e. google analytics) while the `DOMKey` is injected into the DOM and can be caught via event delegation (or be injected in a way which is trackable for some other script)

## detectionKeyCallback

the detection callback is a callback which provides all the configured keys and lets you pick one of them as identifier of tracked objects, f.e.

```js
trackingFactory(
  {
    keyA: 'domKeyA',
    keyB: 'domKeyB',
  },
  keys => keys.keyA
) // keys is { keyA, keyB }, which one is/should be mandatory for a tracked element?
```

## options ({ prefix })

the supported options with definitions:

- `prefix`: an optional string for a custom prefix for the DOMKey when being injected, default is "track" (results in `data-track-DOMKey`)

<br />

# returns

the factory returns the following functions

## create(callback)

create takes a callback which gives you 1 parameter to use - an object containing all of your configured keys - and returns you an object of data-attributes for your element, usage be like:

```js
myTracker.create(keys => ({ [keys.keyA]: 'any value' })) // creates { 'data-track-domKeyA': 'any value' }
```

<br />

## isTracking(element)

this function takes an element (created via mock or an actual HTML element) and checks if it's tracked (it looks at the previously provided `detectionKey` (return value of the `detectionKeyCallback`) here) <br />
this function should be a must use before using `getTrackingData` to prevent misfunctional/buggy tracking

```js
// early returns are lovely 8)
if (!myTracker.isTracking(event.target)) return console.log('this element is not tracked')
```

<br />

## getTrackingData(element)

the last step before sending the track data is of course to recollect the correct one again, therefore this function collects all of your set data of a provided element and returns it in the `trackingFactory` defined tracking format

```js
// imaginary google analytics init happened
if (myTracker.isTracking(event.target))
  dataLayer.push(
    Object.assign(
      { someOtherStuff: 1 },
      myTracker.getTrackingData(event.target) // all tracking data registered in the factory is bundled here
    )
  )
```
