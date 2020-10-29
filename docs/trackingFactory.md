# trackingFactory(obj, options)

typed

```ts
trackingFactory = <T extends string>(
  obj: Record<T, string>,
  { detectionKey, customPrefix }: TrackingFactoryOptions<T>
) => {
  create: (callback: (param: Record<T, string>) => StringDict) => StringDict
  isTracking: (element: HTMLElement) => boolean
  getTrackingData: (element: HTMLElement) => StringDict
}
```

or simple js

```js
trackingFactory = (obj, { detectionKey, customPrefix })
=>
{
  create(callback)
  isTracking(element)
  getTrackingData(element)
}
```

<br />

# parameter definitions

## obj

your object literally, it should have the following look

```js
{
  myTrackingKey: myDOMKey
}
```

the `trackingKey` is kept in JS and only important for your tracking backend/third party tracking army (f.e. google analytics) while the `DOMKey` is injected into the DOM to be caught via event delegation and about to be more specified per injection **later**

## options ({ detectionKey, customPrefix })

the supported options with definitions:

- `detectionKey`: a required string which is equal to one `trackingKey` above to detect whether a DOM-element contains the tracking data, f.e. category, id or similar are recommended to use
- `customPrefix`: an optional string for a custom prefix for the DOMKey when being injected, default is "track" (results in data-track-DOMKey)

<br />

# returns

the factory returns some functions

## create(callback)

create wants a callback which gives you 1 parameter to use, an object containing all of your keys, and returns you an object of data-attributes for your element

```js
myTracker.create(keys => ({ [keys.myTrackingKey]: 'any value' }))
```

<br />

## isTracking(element)

this function takes an element (created via mock or an HTML element) and checks if it's tracked (it looks at the previously provided `detectionKey` here) <br />
this function should be a must use before using `getTrackingData` to prevent misfunctional/buggy tracking

```js
if (!myTracker.isTracking(event.target)) {
  return console.log('this element is not tracked')
}
```

<br />

## getTrackingData(element)

the last step before sending the track data is of course to collect it again, therefore this function collects all of your, via `create`, set data of the given element and returns it in the `trackingFactory` defined tracking format

```js
// imaginary google analytics init happened
if (myTracker.isTracking(event.target)) {
  dataLayer.push(Object.assign({ someOtherStuff: 1 }, myTracker.getTrackingData(event.target)))
}
```
